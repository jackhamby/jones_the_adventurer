import React from 'react';
import { Sprite } from './sprite';
import * as PIXI from 'pixi.js';
import { ProjectileStateNames } from '../types/enums';


export class Projectile extends Sprite {

    sprite: PIXI.Sprite;
    state: ProjectileStateNames;
    sticky: boolean;
    

    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        // x, y, width, height, xVel, yVel
        super(loader, x, y, width, height, 0, 0);
        this.state = ProjectileStateNames.FLYING;
        this.sprite = {} as PIXI.Sprite;
        this.sticky = false;
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
        console.log(this.state)
        console.log(this.xVelocity)
        // debugger;
    }

    handleState(){
        switch(this.state){
            case ProjectileStateNames.FLYING:
                this.flying();
                break;
            case ProjectileStateNames.FALLING:
                this.falling();
                break;
            case ProjectileStateNames.STANDING:
                this.standing();
                break;
            case ProjectileStateNames.ROLLING:
                this.rolling();
                break;
        }
    }

    rolling(){
        if (this.xVelocity < 0){
            this.xVelocity += .25;
        }
        else if (this.xVelocity > 0){
            this.xVelocity -= .25;
        }

    }

    flying(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }

    standing(){
        // Projectile is stuck 
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.decay -= 1;
    }

    falling(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }
}






export class Rock extends Projectile {

    constructor(loader: PIXI.Loader, x: number, y: number, width: number, height: number){
        super(loader, x, y, width, height);
        this.sprite = this.createSprite();
        this.sticky = false;
    }


    createSprite(){
        const sprite = new PIXI.Sprite(this.loader.resources['rock'].texture);
        sprite.x = this.x;
        sprite.y = this.y;
        // TODO: use right sprite
        return sprite;
    }

}



