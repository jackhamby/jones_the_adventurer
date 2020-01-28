
import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '../classes/sprite';
import { SpriteTextures } from '../types/states';

export class Platform extends Sprite{
    constructor(loader: PIXI.Loader, x: number, y:number, width: number, height: number){
        super(loader);
        this.pixiSprite.x = x;
        this.pixiSprite.y = y;
        this.pixiSprite.width = width;
        this.pixiSprite.height = height;
    }
}



export class DefaultPlatform extends Platform {
    constructor(loader: PIXI.Loader, x: number, y:number, width: number, height: number){
        super(loader, x, y, width, height);
    }

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.standingLeft); // Default to standing left
    }

    initializeTextures(): SpriteTextures{
        return {
            standingLeft: this.loader.resources["platform1.png"].texture,
        } as SpriteTextures;
    }
}

