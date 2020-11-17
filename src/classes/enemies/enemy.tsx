
import * as PIXI from 'pixi.js';
import { UnitStateNames } from "../../types/enums";
import { Unit } from '../unit';
import { UnitAttributes } from '../../types/types';
import { SpritePart } from '../interfaces';
import { KeyOptions } from '../../types/states';
import { SmallCoins } from '../treasures/coin_treasure';
import { Stage } from '../stages/stage';



// Base class for all enemeis
export class Enemy extends Unit {

    isPlayerInRange: boolean;
    hasDroppedTreasure: boolean;
    patrolRadius: number;


    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, currentStage, initialAttributes, width, height, x, y);
        this.isPlayerInRange = false;
        this.hasDroppedTreasure = false;
        this.patrolRadius = 100;
    }


    remove(){
        super.remove()
        this.currentStage.enemies = this.currentStage.enemies.filter(enemy => enemy != this);
    }
    // ================================== protected ===========================================================
    // ========================================================================================================

    // Handle enemy specific states here
    protected handleState(){
        super.handleState();
        switch(this.state){
            case (UnitStateNames.ATTACKING):
                this.attacking();
                break;
            case(UnitStateNames.PATROLLING):
                this.patrolling();
                break;
            case(UnitStateNames.DEAD):
                this.dying();
                break;
            default:
                break;
        }
    }

    protected checkIfPlayerInAttackRange(){
        return this.isInsideSemiCircle(this.currentStage.player, this.patrolRadius);
    }

    protected tryAttack(){
        if (!this.canAttack()){
            return;
        }
        let projectileXVelocity = 0;
        // walk right
        if (this.x < this.currentStage.player.x){
            projectileXVelocity = this.projectile.baseAttributes.speed;
        }
        // walk left
        else if (this.x > this.currentStage.player.x){
            projectileXVelocity = -this.projectile.baseAttributes.speed;
        }
        
        this.fireProjectile(this.projectile, projectileXVelocity, 0)
    }

    protected standing(){
        this.setState(UnitStateNames.PATROLLING);
    }

    protected walking(){
        this.setState(UnitStateNames.PATROLLING);
    }

    private attacking(){
        this.tryAttack()
        // walk right
        if (this.x < this.currentStage.player.x){
            this.xVelocity = 1;
        }
        // walk left
        else if (this.x > this.currentStage.player.x){
            this.xVelocity = -1;
        }
        if (this.checkIfPlayerInAttackRange()){
            this.setState(UnitStateNames.ATTACKING);
        }
        else{
            this.setState(UnitStateNames.PATROLLING);
        }
    }

    protected patrolling(){
        // If enemy not moving, start them moving right
        if (this.xVelocity === 0){
            this.xVelocity = 1;
        }
        if (this.checkIfPlayerInAttackRange()){
            this.setState(UnitStateNames.ATTACKING);
        }
        else{
            this.setState(UnitStateNames.PATROLLING);
        }
    }

    protected falling(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }

    protected jumping(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }

    protected dying(){
        super.dying();  
        if (!this.hasDroppedTreasure){
            // spawn coins 
            const coins = new SmallCoins(this.loader, this.currentStage, this.x, this.y - 30)
            this.currentStage.treasures.push(coins);
            this.currentStage.viewport.addChild(...coins.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
            this.hasDroppedTreasure = true;
        }
    }
    
}
