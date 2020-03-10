

import * as PIXI from "pixi.js";




export class Sprite {
    x: number;
    y: number;
    width: number;
    height: number;
    xVelocity: number;
    yVelocity: number;
    loader: PIXI.Loader;

    
    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number, xVelocity: number, yVelocity: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.loader = loader;
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
}