import { Sprite } from './sprite';
import { Treasure } from './treasure';
import { Stage } from './game_classes';
import { KeyOptions } from '../types/states';
import { Rock } from './projectile';
import * as PIXI from 'pixi.js';
import { UnitAttributes, UnitStatistics, SpriteParts, UnitParts } from '../types/types';
import { UnitStateNames, UnitPartNames } from '../types/enums';

export class Unit extends Sprite{
    // Player attributes/data
    attributes: UnitAttributes;
    currentAttributes: UnitAttributes;
    treasures: Treasure[];
    statistics: UnitStatistics;

    // Sprite management
    state: UnitStateNames;
    allowJump: boolean;
    facingRight: boolean;
    inKnockBack: boolean;
    timeSinceLastProjectileFired: number;
    projectileCooldown: number;

    // Textures/sprites
    textures: UnitParts;
    spriteParts: SpriteParts;
    hpBar: PIXI.Graphics;

    // Stage
    currentStage: Stage;
    currentKeys: KeyOptions;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes){    
        // x, y, width, height, xVel, yVel
        super(loader, 200, 200, 20, 30, 0, 0);    
        this.attributes = initialAttributes;
        this.currentAttributes = {
            ...initialAttributes            
        };
        this.treasures = [];
        this.statistics = {} as UnitStatistics;

        this.state = {} as UnitStateNames;
        this.allowJump = true;
        this.facingRight = false;
        this.inKnockBack = false;
        this.timeSinceLastProjectileFired = 0;
        this.projectileCooldown = 10 * this.attributes.attack_speed;
        
        this.textures = {} as UnitParts;
        this.spriteParts = {} as SpriteParts;
        this.hpBar = new PIXI.Graphics();

        this.currentStage = currentStage;
        this.currentKeys = {} as KeyOptions;
    }

    update(keyboard: KeyOptions){
        this.currentKeys = keyboard;
        // console.log(this.state)
        console.log(`x: ${this.x}, y: ${this.y}`)
        console.log(`xVel: ${this.xVelocity}, yVel: ${this.yVelocity}`)
        this.handleState();
        this.updateCooldowns();
        this.flipSpriteParts();
    }

    setState(state: UnitStateNames){
        this.state = state;
    }

    setY(value: number){
        this.y = value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.y = value + this.spriteParts[playerPartName].offSetY;
        })
    }

    setX(value: number){
        console.log(`setting x ${value}`)
        this.x = value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.x = value + this.spriteParts[playerPartName].offSetX;
        })
    }

    updateY(value: number){
        this.y += value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.y += value;
        })
    }

    updateX(value: number){
        this.x += value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.x += value;
        })
    }

    // Handle unit state
    handleState(){
        switch(this.state){
            case(UnitStateNames.STANDING):
                this.standing();
                break;
            case(UnitStateNames.WALKING):
                this.walking()
                break;
            case(UnitStateNames.FALLING):
                this.falling()
                break;
            case(UnitStateNames.JUMPING):
                this.jumping()
                break;
            default:
                break;
        }
    }

    updateCooldowns(){
        if (this.timeSinceLastProjectileFired > 0){
            this.timeSinceLastProjectileFired -= 1;
            return;
        }
    }

    flipSpriteParts(){
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
    }

    drawHpBar(){
        const marginX = 2;
        const marginY = -10;
        this.hpBar = new PIXI.Graphics();
        const hpBarHeight = this.height / 9;
        const hpBarWidth = this.width;

        this.currentStage.viewport.addChild(this.hpBar);

        this.hpBar.beginFill(0x00FF00);
        const greenPercent = this.currentAttributes.health / this.attributes.health;
        const redPercent = 1.0 - greenPercent;

        this.hpBar.drawRect(this.x + marginX, this.y + marginY, hpBarWidth * greenPercent, hpBarHeight);

        this.hpBar.beginFill(0xFF0000);
        this.hpBar.drawRect(this.x + marginX + (greenPercent * hpBarWidth), this.y + marginY, hpBarWidth * redPercent, hpBarHeight);
    }

    fireProjectile(){
        // TODO, cleanup this whole method
        if (this.currentKeys.attackDown ||
            this.currentKeys.attackLeft ||
            this.currentKeys.attackUp || 
            this.currentKeys.attackRight){
                if (this.timeSinceLastProjectileFired > 0){
                    return;
                }
                this.timeSinceLastProjectileFired = this.projectileCooldown;
            }

        if (this.currentKeys.attackRight){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.xVelocity = 15;
            projectile.yVelocity = 0;
        }
        else if (this.currentKeys.attackLeft){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.xVelocity = -15;
            projectile.yVelocity = 0;

        }
        else if(this.currentKeys.attackDown){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.yVelocity = 15;        
        }
        else if(this.currentKeys.attackUp){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            // projectile.yVelocity = 15; 
            projectile.yVelocity = -5

            if (this.facingRight){
                projectile.xVelocity = 15;
            }   
            else {
                projectile.xVelocity = -15;
            }    
        }

    }

    // These need to be overloaded
    standing(){

    }

    walking(){

    }

    jumping(){

    }

    falling(){

    }
}