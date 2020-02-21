
import * as React from 'react';
import * as PIXI from 'pixi.js';
import { SpriteTextures } from '../types/states';
import { Sprite } from './sprite';


export interface PlatformTextures {
    [key: string]: PIXI.Texture;
}

export class Platform extends Sprite{
    pixiSprite: PIXI.Sprite;
    textures: PlatformTextures;



    constructor(loader: PIXI.Loader, x: number, y:number, width: number, height: number){
        // x, y, width, height, xVel, yVel
        super(loader ,x, y, width, height, 0, 0)
        this.loader = loader;
        this.textures = this.initializeTextures();
        this.pixiSprite = this.createPixiSprite();
        this.pixiSprite.x = x;
        this.pixiSprite.y = y;
        this.pixiSprite.width = width;
        this.pixiSprite.height = height;
    }

    createPixiSprite(): PIXI.Sprite {
        return {} as PIXI.Sprite;
    }

    initializeTextures(): PlatformTextures {
        return {} as PlatformTextures;
    }
}



export class DefaultPlatform extends Platform {
    constructor(loader: PIXI.Loader, x: number, y:number, width: number, height: number){
        super(loader, x, y, width, height);
    }

    createPixiSprite(): PIXI.Sprite {
        return new PIXI.Sprite(this.textures.default); 
    }

    initializeTextures(): PlatformTextures{
        return {
            default: this.loader.resources["platform1.png"].texture,
        } as PlatformTextures;
    }
}

