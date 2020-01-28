import { Sprite } from "./sprite";
import { SpriteTextures } from "../types/states";
import * as PIXI from 'pixi.js';

export class Enemy extends Sprite{
    constructor(loader: PIXI.Loader){
        super(loader);
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

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.standingLeft); // Default to standing left
    }


}
