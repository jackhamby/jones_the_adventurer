import { AttackSpeed, Buff } from "../buffs/buff";
import { Unit } from "../unit";
import { Spell } from "./spell";

export class BuffSpell extends Spell {
    buff: Buff;

    constructor(unit: Unit){
        super(unit);
        this.name = "buff spell";
        this.buff = null;
    }
}

export class FastFire extends BuffSpell {

    constructor(unit: Unit){
        super(unit);
        this.cooldown = 600;
        this.buff = new AttackSpeed(unit);
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