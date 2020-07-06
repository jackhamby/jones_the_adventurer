import { Unit} from "../unit";
import { Stage } from "../game_classes";
import { UnitStateNames, UnitPartNames, UnitStatisticNames } from "../../types/enums";
import { UnitAttributes } from "../../types/types";
import { KeyOptions } from "../../types/states";
import { SpritePart } from "../interfaces";
import * as PIXI from 'pixi.js';
import { updateStatistic, ControlAction, updateStatistics } from "../../state_management/actions/control_actions";
import { store } from "../../state_management/store";
import { Treasure } from "../treasures/treasure";


export class Player extends Unit {

    currentGold: number;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, currentStage, initialAttributes, width, height, x, y);
        this.currentGold = 0;
    };

    update(keyboard: KeyOptions){
        super.update(keyboard);
    }

    handleState(){
        super.handleState();
    }

    drawHpBar(){
        super.drawHpBar();
    }

    clearStats(){
        super.clearStats();
        const updateStatsAction = updateStatistics(this.statistics);
        store.dispatch(updateStatsAction as ControlAction);
    }

    takeDamage(value: number): number{
        const damageTaken = super.takeDamage(value);
        this.isImmune = true;
        return damageTaken;
    }

    dealDamage(target: Unit): number{
        // deal damage via parent class
        const damageDealt = super.dealDamage(target);

        // update player statistics
        const updateStatsAction = updateStatistic(UnitStatisticNames.DAMAGE_DEALT, this.statistics.damage + damageDealt)
        store.dispatch(updateStatsAction as ControlAction);
        if (target.state === UnitStateNames.DEAD){
            this.statistics.damage += damageDealt;
            const updateStatsAction = updateStatistics(this.statistics);
            store.dispatch(updateStatsAction as ControlAction);
        }
        return damageDealt;
    }


    fireProjectile(xVelocity: number, yVelocity: number){
        super.fireProjectile(xVelocity, yVelocity);
        this.statistics.projectiles += 1;
        const updateStatsAction = updateStatistics(this.statistics);
        store.dispatch(updateStatsAction as ControlAction);
    }

    tryAttack(){

        const projectileVelocity = this.projectile.baseAttributes.speed;
        if (!this.canAttack()){
            return;
        }
        if (this.currentKeys.attackRight){
            // Loft creates creates an angle for the projectile
            this.fireProjectile(projectileVelocity, this.projectile.baseAttributes.loft);
        }
        else if (this.currentKeys.attackLeft){
            this.fireProjectile(-projectileVelocity,  this.projectile.baseAttributes.loft);
        }
        else if(this.currentKeys.attackDown){  
            this.fireProjectile(0, projectileVelocity);
        }
        else if(this.currentKeys.attackUp){
            this.fireProjectile(0, -projectileVelocity);  
        }
    }

    falling(){
        this.tryAttack();
        this.tryJump();
        const gravity = 0.5;
        this.yVelocity += gravity;

        if (this.inKnockBack){
            return;
       }

        // Move right while fallig
        if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = this.currentAttributes.speed;
        }
        // Move left while falling
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -this.currentAttributes.speed;
        }
    }

    jumping(){
        this.tryAttack();
        this.tryJump();

        const gravity = 0.5;
        this.yVelocity += gravity;

        if (this.inKnockBack){
            // return;
            this.inKnockBack = false;
        }

        // Reached maximum height of jump, start falling
        if (this.yVelocity > 0){
            this.state = UnitStateNames.FALLING;
        }

        // Move right while jumping
        if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = this.currentAttributes.speed;
        }
        // Move left while jumping
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -this.currentAttributes.speed;
        }

    }

    // Called when player in walking state
    walking(){
        this.currentJumps = this.attributes.jump_count;
        this.tryAttack();
        this.tryJump();

        // Prevent movement if in knockback
        if (this.inKnockBack){
            return;
        }

        // Move right
        else if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = this.currentAttributes.speed;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -this.currentAttributes.speed;
        }

        // doing nothing
        else {
            this.state = UnitStateNames.STANDING;
            this.xVelocity = 0;
        }

    }

    // Called when player in standing state
    standing(){
        this.inKnockBack =  false;
        this.currentJumps = this.attributes.jump_count;

        this.tryAttack();
        this.tryJump();

        // Prevent movement if in knockback
        if (this.inKnockBack){
            return;
        }

        if (this.currentKeys.moveRight){
            this.state = UnitStateNames.WALKING;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.state = UnitStateNames.WALKING;
        }

        else {
            this.state = UnitStateNames.STANDING
        }
        this.xVelocity = 0;
    }

    revive(){
        this.attributes = { ...this.baseAttributes };
        this.currentAttributes = { ...this.baseAttributes };
        this.setState(UnitStateNames.STANDING);
        this.fallingTimer = 0;
        this.timeSinceLastProjectileFired = 0;
            
        this.remove();

        this.spriteParts = this.initSpriteParts();
        this.hpBar = new PIXI.Graphics();

        this.clearStats();

        // TODO move this into method
        this.currentKeys.attackRight = false;
        this.currentKeys.attackLeft = false;
        this.currentKeys.attackUp = false;
        this.currentKeys.attackDown = false;
        this.currentKeys.moveRight = false;
        this.currentKeys.moveLeft = false;
        this.currentKeys.moveUp = false;
        this.currentKeys.moveDown = false;
        this.currentKeys.jump = false;

        // we flipped the parts 90 degrees on death, lets flip them back
        const oldWidth = this.width;
        this.width = this.height;
        this.treasures = [];
        this.currentStage.startingTreasures.forEach((treasure: Treasure) => {
            // Treasure.apply(this, treasure);
            treasure.apply(this);
        })

        this.height = oldWidth;
        this.currentStage.viewport.addChild(...this.getSprites())
        this.currentStage.viewport.follow(this.spriteParts.head.sprite);
    }


    dying(){
        super.dying();
        const resp = window.confirm('sorry you suck. restart?')
        if (resp){
            this.currentStage.restart();
            this.currentStage.player.setX(100);
            this.currentStage.player.setY(100);
            this.currentStage.player.revive();
        } else {
            window.location.reload();
        }
    }


}