import React from 'react';
import { Sprite } from './sprite';
import * as PIXI from 'pixi.js';
import { ProjectileStateNames } from '../types/enums';


export class Projectile extends Sprite {

    sprite: PIXI.Sprite;
    state: ProjectileStateNames;

    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        // x, y, width, height, xVel, yVel
        super(loader, x, y, width, height, 0, 0);
        this.state = ProjectileStateNames.FLYING;
        this.sprite = {} as PIXI.Sprite;
    }

    setState(state: ProjectileStateNames){
        this.state = state;
    }


    updateX(value: number){
        this.x += value;
        this.sprite.x += value;
    }

    updateY(value: number){
        this.y += value;
        this.sprite.y += value;
    }

    setX(value: number){
        this.x = value;
        this.sprite.x = value;
    } 

    setY(value: number){
        this.y = value;
        this.sprite.y = value;        
    } 

    update(){
        this.handleState();
        // console.log(this.state)
        // console.log(`xVel: ${this.xVelocity}, yVel: ${this.yVelocity}`);
    }

    handleState(){
        switch(this.state){
            case ProjectileStateNames.FLYING:
                // console.log('flying')
                this.flying();
                break;
            case ProjectileStateNames.FALLING:
                this.falling();
                // console.log('falling');
                break;
            case ProjectileStateNames.STANDING:
                this.standing();
                // console.log('standing')
                break;
        }
    }

    flying(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }

    standing(){

    }

    falling(){
        const gravity = 0.5;
        this.yVelocity += gravity;
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
        // TODO: use right sprite
        return sprite;
    }

}



