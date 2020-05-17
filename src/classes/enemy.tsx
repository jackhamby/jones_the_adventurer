import * as PIXI from 'pixi.js';
import { UnitStateNames, UnitPartNames } from "../types/enums";
import { Unit } from './unit';
import { Stage } from './game_classes';
import { UnitParts, SpriteParts, UnitAttributes } from '../types/types';
import { Part } from './part';
import { SpritePart } from './interfaces';
import { KeyOptions } from '../types/states';


export class Enemy extends Unit {

    isPlayerInRange: boolean;
    patrolRadius: number;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, currentStage, initialAttributes, width, height, x, y);
        this.isPlayerInRange = false;
        this.patrolRadius = 100;
    }

    // Handle enemy specific states here
    handleState(){
        super.handleState();
        switch(this.state){
            case (UnitStateNames.ATTACKING):
                this.attacking();
                break;
            case(UnitStateNames.PATROLLING):
                this.patrolling();
                break;
            case(UnitStateNames.DEAD):
                this.dying();
                break;
            default:
                break;
        }
    }

    update(keyboard: KeyOptions){
        super.update(keyboard);
        // this.flipSpriteParts();
    }

    checkIfPlayerInAttackRange(){
        return this.isInsideRadius(this.currentStage.player, this.patrolRadius);
    }

    remove(){
        super.remove()
        Object.keys(this.spriteParts).forEach((partName: string) => {
            const tempPartName: UnitPartNames = partName as UnitPartNames;
            const part: SpritePart = this.spriteParts[tempPartName];
            this.currentStage.viewport.removeChild(part.sprite);
        })
        this.currentStage.enemies = this.currentStage.enemies.filter(enemy => enemy != this);
    }

    standing(){
        this.setState(UnitStateNames.PATROLLING);
    }

    walking(){
        this.setState(UnitStateNames.PATROLLING);
    }

    attacking(){
        if (this.x < this.currentStage.player.x){
            this.xVelocity = 1;
        }
        // walk left
        else if (this.x > this.currentStage.player.x){
            this.xVelocity = -1;
        }
        if (this.checkIfPlayerInAttackRange()){
            this.setState(UnitStateNames.ATTACKING);
        }
        else{
            this.setState(UnitStateNames.PATROLLING);
        }
    }

    patrolling(){

        // If enemy not moving, start them moving right
        if (this.xVelocity == 0){
            this.xVelocity = 1;
        }
        if (this.checkIfPlayerInAttackRange()){
            this.setState(UnitStateNames.ATTACKING);
        }
        else{
            this.setState(UnitStateNames.PATROLLING);
        }
    }

    falling(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }

    jumping(){
        const gravity = 0.5;
        this.yVelocity += gravity;
    }

    dying(){
        super.dying();  
    }
}





export class Man extends Enemy {

    static baseAttributes = {
        attack: 3,
        attack_speed: 5,
        health: 100,
        speed: 10,
        jump_height: 3,
        jump_count: 1,
        armor: 2,
    } as UnitAttributes

    static width = 20;
    static height = 30;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, x: number, y: number){
        super(loader, currentStage, Man.baseAttributes, Man.width, Man.height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.createSpriteParts();
    }

    initializeTextures(): UnitParts {
        return {
            body:{
                armor1: this.loader.resources['knight-body-armor1-standing'].texture,
                armor2: this.loader.resources['knight-head-armor2-standing'].texture,
                default: this.loader.resources['knight-body-default-standing'].texture,

            },
            head: {
                default: this.loader.resources['knight-head-default-standing'].texture,
                armor2: this.loader.resources['knight-head-armor2-standing'].texture,
                armor1: this.loader.resources['knight-head-armor1-standing'].texture,
            },
            legs: {
                default: this.loader.resources['knight-legs-default-standing'].texture,
                armor2: this.loader.resources['knight-head-armor2-standing'].texture,
                armor1: this.loader.resources['knight-legs-armor1-standing'].texture,
            }
        }
    }

    createSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = -5;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height + headOffSetY;
        const body = new Part(this.textures.body.default, bodyOffsetX, bodyOffsetY, this);

        const legsOffsetX = 0;
        const legsOffsetY = body.sprite.height + bodyOffsetY;
        const legs = new Part(this.textures.legs.default, legsOffsetX, legsOffsetY, this);;
        return {
            head,
            body,
            legs
        };
    }

    
}




export class Kobold2 extends Enemy {

    static baseAttributes = {
        attack: 5,
        attack_speed: 5,
        health: 100,
        speed: 10,
        jump_height: 3,
        jump_count: 1,
        armor: 2
    } as UnitAttributes

    static width = 15;
    static height = 20;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, x: number, y: number){
        super(loader, currentStage, Kobold2.baseAttributes, Kobold2.width, Kobold2.height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.createSpriteParts();
        this.facingRight = true;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.anchor.x = 1;
            sprite.scale.x = -1;
            
        })
    }

    initializeTextures(): UnitParts {
        return {
            body:{
                armor1: this.loader.resources['kobold-body-default'].texture,
                armor2: this.loader.resources['kobold-body-default'].texture,
                default: this.loader.resources['kobold-body-default'].texture,

            },
            head: {
                default: this.loader.resources['kobold-head-default'].texture,
                armor2: this.loader.resources['kobold-head-default'].texture,
                armor1: this.loader.resources['kobold-head-default'].texture,
            },
            legs: {
                default: this.loader.resources['kobold-legs-default'].texture,
                armor2: this.loader.resources['kobold-legs-default'].texture,
                armor1: this.loader.resources['kobold-legs-default'].texture,
            }
        }
    }

    createSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = -7;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);
        head.sprite.zIndex = 99999999999;

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height + headOffSetY - 3;
        const body = new Part(this.textures.body.default, bodyOffsetX, bodyOffsetY, this);

        const legsOffsetX = 0;
        const legsOffsetY = body.sprite.height + bodyOffsetY;
        const legs = new Part(this.textures.legs.default, legsOffsetX, legsOffsetY, this);

        return {
            head,
            body,
            legs
        };
    }

    flipSpriteParts(){
        if (this.xVelocity > 0){
            this.facingRight = false;
        } else {
            this.facingRight = true;
        }
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            if (this.facingRight){
                sprite.anchor.x = 0;
                sprite.scale.x = 1;
            }
            else{
                sprite.anchor.x = 1;
                sprite.scale.x = -1;
            }
        })


        if (this.state === UnitStateNames.DEAD){
            this.y = this.y + (this.height - this.width)
            this.width = this.height;
            this.height = this.width;
            this.xVelocity = 0;
            this.yVelocity = 0;
            // this.setState(UnitStateNames.DEAD)
            Object.keys(this.spriteParts).forEach((key: string) => {
                const partName = key as UnitPartNames;
                const spritePart = this.spriteParts[partName];
                spritePart.sprite.rotation = -1.5708; // 90degress in rads
            })

            // TODO remove this fro here and in Kobold in enemy.tsx
            const head = this.spriteParts.head;
            const headOffsetX =  0
            const headOffsetY = head.sprite.height/4;
            head.offSetX = headOffsetX;
            head.offSetY = headOffsetY;
            head.sprite.x = this.x + headOffsetX;
            head.sprite.y = (this.y + this.height) + headOffsetY;

            const body = this.spriteParts.body;
            const bodyOffsetX = head.sprite.height;;
            const bodyOffsetY = 0;
            body.offSetX = bodyOffsetX;
            body.offSetY = bodyOffsetY;
            body.sprite.x = this.x + bodyOffsetX;
            body.sprite.y = (this.y + this.height) + bodyOffsetY;

            const legs = this.spriteParts.legs;
            const legsOffsetX = head.sprite.height + body.sprite.height;
            const legsOffsetY = 0;
            legs.offSetX = legsOffsetX;
            legs.offSetY = legsOffsetY;
            legs.sprite.x = this.x + legsOffsetX;
            legs.sprite.y = ( this.y + this.height)  + legsOffsetY;
        }
    }
}