import { Unit } from "../unit";
import * as PIXI from 'pixi.js';
import { Effect } from "../effects/effect";
import { GlowEffect } from "../effects/glow_effect";

export class Spell {
    unit: Unit;
    cooldown: number;
    currentCooldown: number;
    onCooldown: boolean;
    effect?: Effect;

    constructor(unit: Unit){
        this.unit = unit;
        this.cooldown = 600;
        this.currentCooldown = 0;
        this.onCooldown = false;
        this.effect = null;
    }

    update(){
        if (this.currentCooldown > 0){
            this.currentCooldown -= 1;
            this.onCooldown = true;
        } else {
            this.onCooldown = false;
        }
    }

    cast(){
        this.currentCooldown = this.cooldown;
        console.log('casting')
    }
}


export class FastFire extends Spell {

    active: boolean;
    activeTime: number;
    currentActiveTime: number;

    constructor(unit: Unit){
        super(unit);
        this.active = false;
        this.activeTime = 200;
        this.currentActiveTime = 0;
        this.effect = new GlowEffect(this.unit, 0xFF0000);
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