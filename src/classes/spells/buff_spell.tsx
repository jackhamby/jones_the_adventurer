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
        this.buff.apply();
    }

    deactivate(){
        this.buff.deactivate();
        this.unit.temporaryBuffs = this.unit.temporaryBuffs.filter((buff: Buff) => {
            return buff !== this.buff;
        });
    }
}