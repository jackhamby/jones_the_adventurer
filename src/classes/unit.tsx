import { Sprite } from './sprite';
import { Treasure } from './treasure';
import { Stage } from './game_classes';
import { KeyOptions } from '../types/states';
import { Rock } from './projectile';
import * as PIXI from 'pixi.js';
import { UnitAttributes, UnitStatistics, SpriteParts, UnitParts } from '../types/types';
import { UnitStateNames, UnitPartNames } from '../types/enums';
import { SpritePart } from './interfaces';
import { SPRITE_DECAY_FADE_TIME } from '../constants';

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

    // Debugging
    debugPartLocation: boolean;
    debugUnitRadius: boolean;
    debugGraphics: PIXI.Graphics;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){    
        // x, y, width, height, xVel, yVel
        super(loader, x, y, width, height, 0, 0);    
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

        // Debuggin
        this.debugGraphics = new PIXI.Graphics();
        this.debugPartLocation = false;
        this.debugUnitRadius = false;
    }

    update(keyboard: KeyOptions){
        this.currentKeys = keyboard;
        this.handleState();
        this.updateCooldowns();
        this.flipSpriteParts();
        if (this.decay <= 0) {
            this.remove();
        };

        this.debugging();

        var tSprite = new PIXI.Sprite(this.loader.resources['kobold-head-default'].texture)
        tSprite.x = 280;
        tSprite.y = 130;
        this.currentStage.viewport.addChild(tSprite)
    }

    isInsideRadius(sprite: Sprite, radius: number): boolean {
        const targetCenterX = sprite.x + (sprite.width / 2);
        const targetCenterY = sprite.y + (sprite.height / 2);

        const circleCenterX = this.x + (this.width / 2);
        const circleCenterY = this.y + (this.height / 2);

        if ( ( Math.pow((targetCenterX - circleCenterX), 2) + Math.pow((targetCenterY - circleCenterY), 2) )  < Math.pow(radius, 2) ){
            return true;
        }

        return false;
    }

    debugging(){
        this.debugGraphics.clear()
        // this.debugGraphics.beginFill(0xFFFF00);
        this.debugGraphics.lineStyle(5, 0xFF0000);
        if (this.debugPartLocation){
            this.currentStage.viewport.removeChild(this.debugGraphics);
            this.debugGraphics.lineStyle(5, 0xFF0000);
            // Object.keys(this.spriteParts).forEach((key: string) => {
            //     const partName = key as UnitPartNames;
            //     const part = this.spriteParts[partName];
            //     this.debugGraphics.drawRect(part.sprite.x, part.sprite.y , part.sprite.width + part.offSetX, part.sprite.height + part.offSetY);

            // })
            const part = this.spriteParts[UnitPartNames.HEAD];
            this.debugGraphics.drawRect(part.sprite.x + part.offSetX, part.sprite.y + part.offSetX, part.sprite.width - part.offSetX, part.sprite.height - part.offSetY);
            // this.currentStage.viewport.addChild(this.debugGraphics);
        }

        if (this.debugUnitRadius){
            const centerX = this.x + (this.width / 2);
            const centerY = this.y + (this.height / 2);
            this.debugGraphics.drawCircle(centerX, centerY, 100);
        }

        this.currentStage.viewport.addChild(this.debugGraphics);
    }

    remove(){
        this.currentStage.viewport.removeChild(this.hpBar);
    }

    getSprites(){
        const unitBodyParts = Object.keys(this.spriteParts).map((key: string) => {
            const partName = key as UnitPartNames;
            return this.spriteParts[partName].sprite
        })
        return [ ...unitBodyParts, this.hpBar ];
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

    applyDamage(value: number){
        this.currentAttributes.health -= value;
        if (this.currentAttributes.health <= 0){
            this.setState(UnitStateNames.DEAD);
        }
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
            case (UnitStateNames.DEAD):
                this.dying()
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
        if (this.xVelocity > 0){
            this.facingRight = true;
        } else {
            this.facingRight = false;
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
            this.setState(UnitStateNames.DEAD)
            Object.keys(this.spriteParts).forEach((key: string) => {
                const partName = key as UnitPartNames;
                const spritePart = this.spriteParts[partName];
                spritePart.sprite.rotation = -1.5708; // 90degress in rads
            })

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
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10, this)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.xVelocity = 15;
            projectile.yVelocity = 0;
        }
        else if (this.currentKeys.attackLeft){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10, this)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.xVelocity = -15;
            projectile.yVelocity = 0;

        }
        else if(this.currentKeys.attackDown){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10, this)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.yVelocity = 15;        
        }
        else if(this.currentKeys.attackUp){
            // const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            // store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 10, 10, this)
            
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

    dying(){
        this.decay -= 1;
   
        if (this.decay < SPRITE_DECAY_FADE_TIME){
            Object.keys(this.spriteParts).forEach((partName: string) => {
                const tempPartName: UnitPartNames = partName as UnitPartNames;
                const part: SpritePart = this.spriteParts[tempPartName];
                part.sprite.alpha -= 1 / SPRITE_DECAY_FADE_TIME;    
            })
        }
    }
}