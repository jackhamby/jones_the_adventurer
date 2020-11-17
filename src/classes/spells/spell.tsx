import { Unit } from "../unit";
import * as PIXI from 'pixi.js';
import { Effect } from "../effects/effect";
import { GlowEffect } from "../effects/glow_effect";
import { Player } from "../players/player";
import { Projectile } from "../projectiles/projectile";
import { Arrow } from "../projectiles/arrow";
import { FireBall as FireBallProjectile } from "../projectiles/fire_ball";

export class Spell {
    unit: Unit;
    cooldown: number;
    currentCooldown: number;
    onCooldown: boolean;
    effect?: Effect;
    name: string;

    constructor(unit: Unit){
        this.unit = unit;
        this.cooldown = 1000000;
        this.currentCooldown = 0;
        this.onCooldown = false;
        this.effect = null;
        this.name = "spell";
        
    }

    update(){
        if (this.currentCooldown > 0){
            this.currentCooldown -= 1;
            this.onCooldown = true;
            

            if (this.currentCooldown === 0){
                this.onCooldown = false;
                
                // TODO can we do this a better way
                // This is to make the cooldown timer 
                // disappear
                const temp = this.unit as Player;
                temp.updateView();
            };
        } 
    }

    cast(){
        this.onCooldown = true;
        this.currentCooldown = this.cooldown;
    }

    fireCast(xVelocity: number, yVelocity: number){
        
    }
}


export class FireBall extends Spell {

    projectile: typeof Projectile;
    
    constructor(unit: Unit){
        super(unit);
        this.effect = null;
        this.cooldown = 400;
        this.projectile = FireBallProjectile;
        this.name = "fireball";
    }

    cast(){
        
        if (!this.isSpellQueued()){
            super.cast();
            this.unit.queuedSpells.push(this);
        }

        

        // this.unit.currentAttributes.ATTACK_SPEED = this.unit.currentAttributes.ATTACK_SPEED / 2;
        // this.unit.projectileCooldown = this.unit.currentAttributes.ATTACK_SPEED;
        // this.currentActiveTime = this.activeTime;
        // this.effect.add();
    }

    update(){
        super.update();
        // if (this.activeTime > 0){
        //     this.currentActiveTime -= 1;
        //     if (this.currentActiveTime === 0){
        //         this.deactivate();
        //     }
        // }
    }

    deactivate(){
        // this.unit.currentAttributes.ATTACK_SPEED = this.unit.attributes.ATTACK_SPEED;
        // this.unit.projectileCooldown = this.unit.attributes.ATTACK_SPEED;  
        // this.effect.remove();
    }

    isSpellQueued(): boolean{
        return this.unit.queuedSpells.some((spell: Spell) => {
            if (spell instanceof FireBall){
                return true;
            }
            return false;
        })
    }


    fireCast(xVelocity: number, yVelocity: number){
        // this.timeSinceLastProjectileFired = this.projectileCooldown;
        const projectile = new this.projectile(this.unit.loader, this.unit.x, this.unit.y, this.unit, xVelocity, yVelocity)
        projectile.add();
        this.unit.currentStage.projectiles.push(projectile);
    }

}


export class FastFire extends Spell {

    active: boolean;
    activeTime: number;
    currentActiveTime: number;

    constructor(unit: Unit){
        super(unit);
        this.active = false;
        this.cooldown = 600;
        this.activeTime = 200;
        this.currentActiveTime = 0;
        this.effect = new GlowEffect(this.unit, 0xFF0000);
        this.name = "fast fire";
    }

    cast(){
        super.cast();
        this.unit.currentAttributes.ATTACK_SPEED = this.unit.currentAttributes.ATTACK_SPEED / 2;
        this.unit.projectileCooldown = this.unit.currentAttributes.ATTACK_SPEED;
        this.currentActiveTime = this.activeTime;
        this.effect.add();
    }

    update(){
        super.update();
        if (this.activeTime > 0){
            this.currentActiveTime -= 1;
            if (this.currentActiveTime === 0){
                this.deactivate();
            }
        }
    }

    deactivate(){
        this.unit.currentAttributes.ATTACK_SPEED = this.unit.attributes.ATTACK_SPEED;
        this.unit.projectileCooldown = this.unit.attributes.ATTACK_SPEED;  
        this.effect.remove();
    }
}