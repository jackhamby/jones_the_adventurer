import * as PIXI from "pixi.js";
import { SPRITE_DECAY } from "../types/constants";

export class Sprite {
    x: number;
    y: number;
    spawnX: number;
    spawnY: number;
    width: number;
    height: number;
    xVelocity: number;
    yVelocity: number;
    loader: PIXI.Loader;
    decay: number;

    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number, xVelocity: number, yVelocity: number){
        this.x = x;
        this.x = x;
        this.spawnX = x;
        this.spawnY = y;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.loader = loader;
        this.decay = SPRITE_DECAY;
    }

    reset(){
        this.x = this.spawnX;
        this.y = this.spawnY;
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