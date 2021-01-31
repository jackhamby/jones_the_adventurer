import { Effect } from "../effects/effect";
import { FireEffect } from "../effects/fire_effect";
import { GlowEffect } from "../effects/glow_effect";
import { Unit } from "../unit";

export class Buff {
    unit: Unit;
    active: boolean;
    activeTime: number;
    currentActiveTime: number;
    effect?: Effect;
    name: string;

    constructor(unit: Unit){
        this.unit = unit;
        this.active = false;
        this.activeTime = 0;
        this.currentActiveTime = 0;
        this.name = "buff";
        this.effect = null;
    }

    update(){
        if (this.activeTime > 0){
            this.currentActiveTime -= 1;
            if (this.currentActiveTime === 0){
                this.deactivate();
            }
        }
    }

    apply(unit?: Unit){
        this.currentActiveTime = this.activeTime;
        if (unit){
            unit.temporaryBuffs.push(this);
        }
        else {
            this.unit.temporaryBuffs.push(this);
        }
        if (this.effect) this.effect.add(); 
    }

    deactivate(){
        this.unit.temporaryBuffs = this.unit.temporaryBuffs.filter((buff: Buff) => {
            return buff !== this;
        });
        if (this.effect) this.effect.remove();
    }

}


export class AttackSpeed extends Buff {
    constructor(unit: Unit){
        super(unit);
        this.name = "attack speed buff";
        this.activeTime = 200;
        this.effect = new GlowEffect(this.unit, 0xFF0000);
    }

    update(){
        super.update();
    }

    deactivate(){
        super.deactivate();
        this.unit.currentAttributes.ATTACK_SPEED = this.unit.attributes.ATTACK_SPEED;
        this.unit.projectileCooldown = this.unit.attributes.ATTACK_SPEED;  
    }

    apply(){
        super.apply();
        this.unit.currentAttributes.ATTACK_SPEED = this.unit.currentAttributes.ATTACK_SPEED / 2;
        this.unit.projectileCooldown = this.unit.currentAttributes.ATTACK_SPEED;
    }
}







export class FireDot extends Buff {
    constructor(unit: Unit){
        super(unit);
        this.name = "fire over time";
        this.activeTime = 200;
        this.effect = new FireEffect(this.unit);
    }

    update(){
        super.update();
        if (this.currentActiveTime % 25 === 0){
            this.unit.takeDamage(5);
        }
    }    
}