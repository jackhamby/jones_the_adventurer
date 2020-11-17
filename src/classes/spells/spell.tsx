import { Unit } from "../unit";
import * as PIXI from 'pixi.js';
import { Effect } from "../effects/effect";
import { GlowEffect } from "../effects/glow_effect";
import { Player } from "../players/player";
import { Projectile } from "../projectiles/projectile";
import { Arrow } from "../projectiles/arrow";

export class Spell {
    unit: Unit;
    cooldown: number;
    currentCooldown: number;
    onCooldown: boolean;
    name: string;

    constructor(unit: Unit){
        this.unit = unit;
        this.cooldown = 1000000;
        this.currentCooldown = 0;
        this.onCooldown = false;
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
}






