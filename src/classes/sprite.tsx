

import * as PIXI from "pixi.js";
import { SpritePart } from './interfaces';




export class Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    xVelocity: number;
    yVelocity: number;
    loader: PIXI.Loader;
    // textures: any;
    // spriteParts: SpritePart[];

    
    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number, xVelocity: number, yVelocity: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.loader = loader;
        // this.textures = this.initTextures();
        // this.spriteParts = this.initSpriteParts();
    }


    top(){
        return this.y;
    }
    bottom(){
        return this.y + this.height;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.width;
    }

    // initSpriteParts(): SpritePart[]{
    //     throw("intitialze sprite parts")
    // }

    // initTextures(){
    //     throw("intitialze textures ")
    // }
}