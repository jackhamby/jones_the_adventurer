import { Effect } from "../effects/effect";
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

    activate(unit?: Unit){
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

    deactivate(){
        this.effect.remove();
        this.unit.currentAttributes.ATTACK_SPEED = this.unit.attributes.ATTACK_SPEED;
        this.unit.projectileCooldown = this.unit.attributes.ATTACK_SPEED;  
    }

    activate(){
        this.effect.add();
        this.unit.currentAttributes.ATTACK_SPEED = this.unit.currentAttributes.ATTACK_SPEED / 2;
        this.unit.projectileCooldown = this.unit.currentAttributes.ATTACK_SPEED;
        this.currentActiveTime = this.activeTime;
    }
    
}

export class FireDot extends Buff {
    constructor(unit: Unit){
        super(unit);
        this.name = "fire over time";
        this.activeTime = 200;
        // this.effect = new GlowEffect(this.unit, 0xFF0000);

    }

    update(){
        super.update();
        this.unit.takeDamage(5);
    }

    deactivate(){
        super.deactivate();
        // // this.effect.remove();
        // this.unit.currentAttributes.ATTACK_SPEED = this.unit.attributes.ATTACK_SPEED;
        // this.unit.projectileCooldown = this.unit.attributes.ATTACK_SPEED;  
    }

    
}