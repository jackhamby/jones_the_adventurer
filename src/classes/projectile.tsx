import * as React from 'react';
import { Sprite } from './sprite';
import * as PIXI from 'pixi.js';
import { ProjectileStateNames } from '../types/enums';
import { Unit } from './unit';
import { Stage } from './game_classes';
import { ProjectileAttributes } from '../types/types';
import { SPRITE_DECAY_FADE_TIME } from '../constants';


export class Projectile extends Sprite {

    sprite: PIXI.Sprite;
    state: ProjectileStateNames;
    sticky: boolean;
    unit: Unit;
    currentStage: Stage;
    attributes: ProjectileAttributes;
    hasDealtDamage: boolean;
    
    static width = 10;
    static height = 10;

    static baseAttributes = {
        damage: 1,
        speed: 1
    }
    

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit){
        // x, y, width, height, xVel, yVel
        super(loader, x, y, Projectile.width, Projectile.height, 0, 0);
        this.state = ProjectileStateNames.FLYING;
        this.sprite = {} as PIXI.Sprite;
        this.sticky = false;
        this.unit = unit;
        this.currentStage = unit.currentStage;
        this.attributes = {} as ProjectileAttributes;
        this.hasDealtDamage = false;
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

    remove(){        
        this.currentStage.viewport.removeChild(this.sprite);
        this.currentStage.projectiles = this.currentStage.projectiles.filter(projectile => projectile != this)
    }

    update(){
        this.handleState();
        if (this.decay <= 0) {
            this.remove();
        };
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
        else{
            this.setState(ProjectileStateNames.STANDING);
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
        if (this.decay < SPRITE_DECAY_FADE_TIME){
            this.sprite.alpha -= 1 / SPRITE_DECAY_FADE_TIME;    
        }
    }

    falling(){
        if (this.xVelocity > 0){
            this.xVelocity += -.25;
        }
        else if (this.xVelocity < 0){
            this.xVelocity += .25;
        }
        const gravity = 0.5;
        this.yVelocity += gravity;
    }
}






export class Rock extends Projectile {

    static baseAttributes = {
        damage: 5,
        speed: 15
    }

    static width = 10;
    static height = 10;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit){
        super(loader, x, y, unit);
        this.sprite = this.createSprite();
        this.sticky = false;
        this.attributes = Rock.baseAttributes;
        this.width = Rock.width;
        this.height = Rock.height;
    }

    createSprite(){
        const sprite = new PIXI.Sprite(this.loader.resources['rock'].texture);
        sprite.x = this.x;
        sprite.y = this.y;
        // TODO: use right sprite
        return sprite;
    }

}






export class Arrow extends Projectile {

    static baseAttributes = {
        damage: 30,
        speed: 15
    }

    static width = 13;
    static height = 5;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit){
        super(loader, x, y, unit);
        this.sprite = this.createSprite();
        this.sticky = true;
        this.attributes = Arrow.baseAttributes
        this.width = Arrow.width;
        this.height = Arrow.height;
    }

    createSprite(){
        const sprite = new PIXI.Sprite(this.loader.resources['arrow'].texture);
        // sprite.rotation = -0.436332;
        sprite.x = this.x;
        sprite.y = this.y;
        // TODO: use right sprite
        return sprite;
    }

}



