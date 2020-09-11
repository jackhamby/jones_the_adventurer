import { Effect } from "./effect";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js';
import { GlowFilter } from 'pixi-filters';

export class GlowEffect extends Effect {

    color: number;

    constructor(unit: Unit, color: number){
        super(unit);
        this.color = color;
    }

    draw(){
        const rectX = this.unit.x + (this.unit.width / 2);
        this.graphics.clear();
        this.graphics.beginFill(this.color);
        this.graphics.drawRect(rectX, this.unit.y, this.unit.width / 2, this.unit.height);
        this.graphics.filters = [  new GlowFilter({ distance: 15, outerStrength: 2, color: this.color })]
        this.graphics.zIndex = -1; // TODO: handle zIndex for multiple effects
    }
}