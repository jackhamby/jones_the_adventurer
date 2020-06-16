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
    texture: PIXI.Texture;
    
    static width = 10;
    static height = 10;

    static baseAttributes = {
        damage: 1,
        speed: 1,
        loft: 0,
    }
    
    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        // x, y, width, height, xVel, yVel
        super(loader, x, y, Projectile.width, Projectile.height, 0, 0);
        this.state = ProjectileStateNames.FLYING;
        this.sprite = {} as PIXI.Sprite;
        this.sticky = false;
        this.unit = unit;
        this.currentStage = unit.currentStage;
        this.attributes = {} as ProjectileAttributes;
        this.hasDealtDamage = false;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.texture = {} as PIXI.Texture;
    }

    createSprite(){
        const sprite = new PIXI.Sprite(this.texture);
        sprite.x = this.x;
        sprite.y = this.y;
        return sprite;
    }

    setXVelocity(velocity: number){
        this.xVelocity = velocity;
    }

    setYVelocity(velocity: number){
        this.yVelocity = velocity;
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
        this.flipSprite(this.sprite)
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

    flipSprite(sprite: PIXI.Sprite){
        if (this.xVelocity === 0 && this.yVelocity === 0){
            return; // leave sprite as is
        }
        if (this.xVelocity > 0){
            // flip sprite 180
            sprite.rotation = 3.14159;
            sprite.anchor.x = 1;
            sprite.anchor.y = 1;

        } else if (this.xVelocity < 0) {
            // leave as is
        }
        else if (this.yVelocity > 0){
            sprite.rotation = -1.5708;
        } else {
            sprite.rotation = 1.5708;
        }
    }
}






export class Rock extends Projectile {

    static baseAttributes = {
        damage: 40,
        speed: 17,
        loft: -3,
    }

    static width = 10;
    static height = 10;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['rock'].texture;
        this.sprite = this.createSprite();
        this.sticky = false;
        this.attributes = Rock.baseAttributes;
        this.width = Rock.width;
        this.height = Rock.height;
    }
}






export class Arrow extends Projectile {

    static baseAttributes = {
        damage: 25,
        speed: 20,
        loft: 0,
    }

    static width = 13;
    static height = 5;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['arrow'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.attributes = Arrow.baseAttributes
        this.width = Arrow.width;
        this.height = Arrow.height;
    }
}



export class Stinger extends Projectile {

    static baseAttributes = {
        damage: 20,
        speed: 20,
        loft: 0,
    }

    static width = 13;
    static height = 5;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['stinger'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.attributes = Arrow.baseAttributes
        this.width = Arrow.width;
        this.height = Arrow.height;
    }
}



