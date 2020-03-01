import { SpriteTextures } from "../types/states";
import * as PIXI from 'pixi.js';
import { Sprite } from "./sprite";

export class Enemy extends Sprite{
    constructor(loader: PIXI.Loader){
        // x, y, widht, height, xVEl, yVel
        super(loader, 0, 0, 0, 0, 0, 0);
    }
}

export class Kobold extends Enemy {
    constructor(loader: PIXI.Loader){
        super(loader);
    }

    initializeTextures(): SpriteTextures{
        return {
            standingRight: this.loader.resources["kobold_sm_left.png"].texture,
            standingLeft: this.loader.resources["kobold_sm_left.png"].texture,
            walkingLeft: this.loader.resources["kobold_sm_left.png"].texture,
            walkingRight: this.loader.resources["kobold_sm_left.png"].texture, //TODO: Update with correct texture
            jumpingLeft: this.loader.resources["kobold_sm_left.png"].texture,
            jumpingRight: this.loader.resources["kobold_sm_left.png"].texture,
            fallingLeft: this.loader.resources["kobold_sm_left.png"].texture,
            fallingRight: this.loader.resources["kobold_sm_left.png"].texture,
        } as SpriteTextures;
    }
}
