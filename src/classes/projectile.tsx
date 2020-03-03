import React from 'react';
import { Sprite } from './sprite';
import * as PIXI from 'pixi.js';


export class Projectile extends Sprite {

    sprite: PIXI.Sprite;


    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        // x, y, width, height, xVel, yVel
        super(loader, 200, 200, 20, 30, 0, 0);

        this.sprite = {} as PIXI.Sprite;
    }

}






export class Rock extends Projectile {


    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        super(loader, x, y, width, height);
        console.log('building rock');
        this.sprite = this.createSprite();
    }


    createSprite(){
        // TODO: use right sprite
        return new PIXI.Sprite(this.loader.resources['kobold-standing'].texture);
        
    }

}



