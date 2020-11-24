import { Effect } from "./effect";
import { GlowFilter } from 'pixi-filters';

export class FireEffect extends Effect {

    draw(){
        const rectX = this.unit.x + (this.unit.width / 2);
        this.graphics.clear();
        this.graphics.beginFill(0xffa500);
        this.graphics.drawRect(rectX, this.unit.y, this.unit.width / 2, this.unit.height);
        this.graphics.filters = [  new GlowFilter({ distance: 20, outerStrength: 100, color: 0xffa500, innerStrength: 100 })]
        this.graphics.zIndex = -1; // TODO: handle zIndex for multiple effects
    }
}