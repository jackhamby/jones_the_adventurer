import { Enemy } from "./enemy";
import { UnitAttributes, UnitParts, SpriteParts } from "../../types/types";
import { Stinger } from "../projectiles/stinger";
import { Stage } from "../stages/stage";
import { KeyOptions } from "../../types/states";
import { Part } from "../part";
import { UnitPartNames } from "../../types/enums";
import { Projectile } from "../projectiles/projectile";

export class Manticore extends Enemy {
    static imageUrl = "/images/manticore/manticore_sm.png";

    static baseAttributes = {
        ATTACK: 6,
        ATTACK_SPEED: 100,
        HEALTH: 500,
        SPEED: 10,
        JUMP_HEIGHT: 3,
        JUMP_COUNT: 1,
        ARMOR: 2
    } as UnitAttributes

    static width = 90;
    static height = 85;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, currentStage, initialAttributes, width, height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.createSpriteParts();
        this.patrolRadius = 300;
        this.projectile = Stinger;
    }
    
    initializeTextures(): UnitParts {
        return {
            body:{
                armor1: undefined,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['manticore-body-default'].texture,

            },
            head: {
                armor1: undefined,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['manticore-head-default'].texture,
            },
            // Legs for this creature is its tail
            legs: {
                armor1: undefined,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['manticore-legs-default'].texture,
            }
        }
    }

    createSpriteParts(): SpriteParts {
        const legsOffsetX = 0;
        const legsOffsetY = 0;
        const legs = new Part(this.textures.legs.default, legsOffsetX, legsOffsetY, this);

        const headOffsetX = 0;
        const headOffSetY = legs.sprite.height / 2;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);
        head.sprite.zIndex = 99999999999;

        const bodyOffsetX = 0;
        const bodyOffsetY = legs.sprite.height / 2;
        const body = new Part(this.textures.body.default, bodyOffsetX, bodyOffsetY, this);

        return {
            head,
            body,
            legs
        };
    }

      // over loaded for manticores special attack
      fireProjectile(projectileType: typeof Projectile, xVelocity: number, yVelocity: number){
        this.timeSinceLastProjectileFired = this.projectileCooldown;
        const projectile = new projectileType(this.loader, this.x, this.y, this, xVelocity, yVelocity);
        const projectile2 = new projectileType(this.loader, this.x, this.y, this, xVelocity / 2, yVelocity / 2);
        const projectile3 = new projectileType(this.loader, this.x, this.y, this, xVelocity * 2, yVelocity * 2);

        this.currentStage.viewport.addChild(projectile.sprite);
        this.currentStage.projectiles.push(projectile);

        var millisecondsToWait = 500;
        var that = this;

        setTimeout(function() {
            that.currentStage.viewport.addChild(projectile2.sprite);
            that.currentStage.projectiles.push(projectile2);
        }, millisecondsToWait);
        setTimeout(function() {
            that.currentStage.viewport.addChild(projectile3.sprite);
            that.currentStage.projectiles.push(projectile3);
        }, millisecondsToWait);
    }

    tryAttack(){
        if (!this.canAttack()){
            return;
        }
        let projectileXVelocity = 0;
        if (this.x < this.currentStage.player.x){
            projectileXVelocity = this.projectile.baseAttributes.speed;
        }
        // walk left
        else if (this.x > this.currentStage.player.x){
            projectileXVelocity = -this.projectile.baseAttributes.speed;
        }
        
        this.fireProjectile(this.projectile, projectileXVelocity, 0)

    }

    // TODO: flip sprites in .pngs correclty so this can be removed
    // this is overloaded because sprites are reversed
    flipSpriteParts(){
        let isFacingRight = false;
        if (this.xVelocity > 0){
            isFacingRight = true;
        } else {
            isFacingRight = false;
        }

        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as UnitPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            // switch to face right
            if (!this.facingRight && isFacingRight){
                sprite.anchor.x = 1;
                sprite.scale.x = -1;
            }
            // switch to face left
            else if (this.facingRight && !isFacingRight){
                sprite.anchor.x = 0;
                sprite.scale.x = 1;
            }

        })

        this.facingRight = isFacingRight;
    }
    
}