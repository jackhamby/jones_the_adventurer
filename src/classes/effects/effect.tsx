import { Unit } from "../unit";
import * as PIXI from 'pixi.js';

export class Effect {
    graphics: PIXI.Graphics;
    unit: Unit;

    constructor(unit: Unit){
        this.graphics = new PIXI.Graphics();
        this.unit = unit;
    }

    draw(){
   
    }

    add(){
        this.unit.effects.push(this);
        this.unit.currentStage.viewport.addChild(this.graphics);
    }

    remove(){
        this.unit.currentStage.viewport.removeChild(this.graphics);
        this.unit.effects = this.unit.effects.filter((effect: Effect) => {
            return effect !== this;
        })
    }
}


