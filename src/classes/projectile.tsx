import React from 'react';
import { Sprite } from './sprite';
import * as PIXI from 'pixi.js';


export class Projectile extends Sprite {

    sprite: PIXI.Sprite;


    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        // x, y, width, height, xVel, yVel
        super(loader, x, y, width, height, 0, 0);

        this.sprite = {} as PIXI.Sprite;
    }


    updateX(value: number){
        this.x += value;
        this.sprite.x += value;
    }

    updateY(value: number){
        this.y += value;
        this.sprite.y += value;
    }

}






export class Rock extends Projectile {

    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        super(loader, x, y, width, height);
        // console.log('building rock');
        this.sprite = this.createSprite();
    }


    createSprite(){
        const sprite = new PIXI.Sprite(this.loader.resources['kobold-standing'].texture);
        sprite.x = this.x;
        sprite.y = this.y;
        console.log(`craete sprite at ${this.x}, ${this.y}`)
        // TODO: use right sprite
        return sprite;
    }

}



