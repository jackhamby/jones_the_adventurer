import { Effect } from "./effect";
import { GlowFilter } from 'pixi-filters';

export class FireEffect extends Effect {

    draw(){
        const rectX = this.unit.x + (this.unit.width / 2);
        this.graphics.clear();
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(rectX, this.unit.y, this.unit.width / 2, this.unit.height);
        this.graphics.filters = [ 
            new GlowFilter({ distance: 10, outerStrength: 5, innerStrength: 0, color: 0xFFFF00}), // Yellow
            new GlowFilter({ distance: 5, outerStrength: 5, innerStrength: 0, color: 0xFF0000}) // REd
        ];
        this.graphics.zIndex = -1; // TODO: handle zIndex for multiple effects
    }
}