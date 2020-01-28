import * as PIXI from 'pixi.js';
import { KeyOptions, SpriteTextures, PlayerState } from '../types/states';
import { PlayerStates } from '../types/enums';

// Wrapper class for PIXI.Sprite will be extended
// upon by all sprites in applicaton
export class Sprite{
    loader: PIXI.Loader;
    pixiSprite: PIXI.Sprite;
    xVelocity: number;
    yVelocity: number;
    facingRight: boolean;
    textures: SpriteTextures;
    state: PlayerStates;

    constructor(loader: PIXI.Loader){
        // this.pixiSprite = sprite;
        this.loader = loader;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.facingRight = true;
        this.textures = this.initializeTextures();
        this.pixiSprite = this.createPixiSprite();
        this.state = {} as PlayerStates;
        
    }

    createPixiSprite(): PIXI.Sprite {
        return {} as PIXI.Sprite;
    }

    initializeTextures(): SpriteTextures{
        return {} as SpriteTextures;
    }

    update(keyboard: KeyOptions){

    }

    top(){
        return this.pixiSprite.y;
    }
    bottom(){
        return this.pixiSprite.y + this.pixiSprite.height;
    }
    left(){
        return this.pixiSprite.x;
    }
    right(){
        return this.pixiSprite.x + this.pixiSprite.width;
    }

}
