import { AttackSpeed, Buff } from "../buffs/buff";
import { Effect } from "../effects/effect";
import { GlowEffect } from "../effects/glow_effect";
import { Unit } from "../unit";
import { Spell } from "./spell";

export class BuffSpell extends Spell {
    // active: boolean;
    // activeTime: number;
    // currentActiveTime: number;
    // effect?: Effect;
    buff: Buff;

    constructor(unit: Unit){
        super(unit);
        // this.active = false;
        // this.activeTime = -1;
        // this.currentActiveTime = 0;
        // this.effect = null;
        this.name = "buff spell";
        this.buff = null;
    }

    

    // TODO: abstract spell buff cast() and update() into single shared

}


export class FastFire extends BuffSpell {

    constructor(unit: Unit){
        super(unit);
        // this.active = false;
        this.cooldown = 600;
        this.buff = new AttackSpeed(unit);
        // this.activeTime = 200;
        // this.effect = new GlowEffect(this.unit, 0xFF0000);
        this.name = "fast fire";
    }

    cast(){
        super.cast();
        this.buff.activate();
        // this.unit.temporaryBuffs.push(this.buff);
        // this.unit.currentAttributes.ATTACK_SPEED = this.unit.currentAttributes.ATTACK_SPEED / 2;
        // this.unit.projectileCooldown = this.unit.currentAttributes.ATTACK_SPEED;
        // this.currentActiveTime = this.activeTime;
        // this.effect.add();
    }

    // update(){
    //     super.update();
    //     // this.buff.update();
    //     // if (this.activeTime > 0){
    //     //     this.currentActiveTime -= 1;
    //     //     if (this.currentActiveTime === 0){
    //     //         this.deactivate();
    //     //     }
    //     // }
    // }

    deactivate(){
        this.buff.deactivate();
        this.unit.temporaryBuffs = this.unit.temporaryBuffs.filter((buff: Buff) => {
            return buff !== this.buff;
        })
        // this.unit.currentAttributes.ATTACK_SPEED = this.unit.attributes.ATTACK_SPEED;
        // this.unit.projectileCooldown = this.unit.attributes.ATTACK_SPEED;  
        // this.effect.remove();
    }
}