import { PlayerStateNames, PlayerArmorNames, PlayerPartNames, PlayerStatisticNames } from "../types/enums";
import { KeyOptions, AppState, PlayerAttributes } from "../types/states";
import { Sprite } from "./sprite";
import * as PIXI from "pixi.js";
// TODO remove this
import { store } from "../state_management/store";
import { SpritePart } from "./interfaces";
import { Projectile, Rock } from "./projectile";
import { Stage } from "./game_classes";
import { Treasure } from "./treasure";
import { updateStatistic, ControlAction } from "../state_management/actions/control_actions";



export class Part {
    texture: PIXI.Texture;
    offSetX: number;
    offSetY: number;
    sprite: PIXI.Sprite;
    parentSprite: Sprite;



    constructor(texture: PIXI.Texture, offSetX: number, offSetY: number, parentSprite: Sprite){
        this.texture = texture;
        this.offSetX = offSetX;
        this.offSetY = offSetY;
        // this.sprite = { } as PIXI.Sprite;
        this.parentSprite = parentSprite;
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.x = this.parentSprite.x + this.offSetX;
        this.sprite.y = this.parentSprite.y + this.offSetY;
    }

    setSprite(newTexture: PIXI.Texture){
        this.sprite.texture = newTexture;
    }

}

export type PlayerStates = {
    [key in PlayerStateNames]: any;
}

export type PlayerArmors = {
    [key in PlayerArmorNames]: PlayerStates;
}

export type PlayerParts = {
    [key in PlayerPartNames]: PlayerArmors;
}

export type SpriteParts = {
    [key in PlayerPartNames]: Part;
}

export type PlayerStatistics = {
    [key in PlayerStatisticNames]: any;
}

export class Player extends Sprite  {

    // Player shared attributes
    state: PlayerStateNames;
    currentKeys: KeyOptions;
    allowJump: boolean;
    facingRight: boolean;
    spriteParts: SpriteParts;
    attributes: PlayerAttributes;
    currentAttributes: PlayerAttributes;
    textures: PlayerParts;
    hpBar: PIXI.Graphics;
    currentStage: Stage;

    // Game stats
    treasures: Treasure[];
    statistics: PlayerStatistics;

    //temp 
    timeSinceLastProjectileFired: number;
    projectileCooldown: number;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: PlayerAttributes){
        // x, y, width, height, xVel, yVel
        super(loader, 200, 200, 20, 30, 0, 0);
        this.state = PlayerStateNames.STANDING;
        this.attributes = initialAttributes;
        this.currentAttributes = {
            ...initialAttributes
        };
        this.currentAttributes.health -= 50;
        this.currentKeys = {} as KeyOptions;
        this.allowJump = true;
        this.facingRight = false;
        this.spriteParts = {} as SpriteParts;
        this.textures = {} as PlayerParts;
        this.hpBar = new PIXI.Graphics();
        this.currentStage = currentStage;

        // Game stats
        this.treasures = [];
        this.statistics = {} as PlayerStatistics;
        
        // temp
        this.timeSinceLastProjectileFired = 0;
        this.projectileCooldown = 10 * this.attributes.attack_speed;

    }


    updateX(value: number){
        this.x += value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as PlayerPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.x += value;
        })
    }

    updateY(value: number){
        this.y += value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as PlayerPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.y += value;
        })
    }

    setX(value: number){
        this.x = value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as PlayerPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.x = value + this.spriteParts[playerPartName].offSetX;
        })
    } 

    setY(value: number){
        this.y = value;
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as PlayerPartNames;
            const sprite = this.spriteParts[playerPartName].sprite;
            sprite.y = value + this.spriteParts[playerPartName].offSetY;
        })
        
    } 

    setState(state: PlayerStateNames){
        this.state = state;
    }


    // Called on each game tick
    // Update player state and velocities
    update(keyboard: KeyOptions){
        console.log(this.timeSinceLastProjectileFired)
        this.currentKeys = keyboard;
        this.handleState();
        this.updateCooldowns();
        // this.hpBar.clear();
        // this.drawHpBar();
        this.flipSpriteParts();
    }

    updateCooldowns(){
        if (this.timeSinceLastProjectileFired > 0){
            this.timeSinceLastProjectileFired -= 1;
            return;
        }
    }

    // createHpBar(): PIXI.Graphics {
    //     var graphics = new PIXI.Graphics();
    //     const marginX = 0;
    //     const marginY = 5;
    //     const hpBarHeight = this.height / 10;
    //     const hpBarWidth = this.width;
    //     // Fill bar green
    //     graphics.beginFill(0x00FF00);

    //     // draw a rectangle
    //     graphics.drawRect(this.x + marginX, this.y + marginY, hpBarWidth, hpBarHeight);

    //     return graphics;

    //     // stage.addChild(graphics);
    // }

    drawHpBar(){
        const marginX = 2;
        const marginY = -10;
        this.hpBar = new PIXI.Graphics();
        const hpBarHeight = this.height / 9;
        const hpBarWidth = this.width;

        // console.log(this.x);
        // console.log(this.y);

        this.currentStage.viewport.addChild(this.hpBar);


        this.hpBar.beginFill(0x00FF00);
        const greenPercent = this.currentAttributes.health / this.attributes.health;
        const redPercent = 1.0 - greenPercent;

        this.hpBar.drawRect(this.x + marginX, this.y + marginY, hpBarWidth * greenPercent, hpBarHeight);

        this.hpBar.beginFill(0xFF0000);
        this.hpBar.drawRect(this.x + marginX + (greenPercent * hpBarWidth), this.y + marginY, hpBarWidth * redPercent, hpBarHeight);


    }




    flipSpriteParts(){
        Object.keys(this.spriteParts).forEach((key) => {
            const playerPartName = key as PlayerPartNames;
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

    falling(){
        this.fireProjectile();

        const gravity = 0.5;
        this.yVelocity += gravity;
          // TODO REMOVE THIS TO PREVENT INFINITE JUMP
          if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;  
            this.yVelocity = -this.currentAttributes.jump;
        }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;

        // Move right while fallig
        if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = this.currentAttributes.speed;
        }
        // Move left while falling
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -this.currentAttributes.speed;
        }


    }

    jumping(){
        this.fireProjectile();

        const gravity = 0.5;
        this.yVelocity += gravity;

        // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;  
            this.yVelocity = -this.currentAttributes.jump
        }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;



        // Reached maximum height of jump, start falling
        if (this.yVelocity > 0){
            this.state = PlayerStateNames.FALLING;
        }

        // Move right while jumping
        if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = this.currentAttributes.speed;
        }
        // Move left while jumping
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -this.currentAttributes.speed;
        }

    }

    // Called when player in walking state
    walking(){
        this.fireProjectile();

        if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;  
            this.yVelocity = this.currentAttributes.jump
        }
        // Move right
        else if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = this.currentAttributes.speed;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -this.currentAttributes.speed;
        }

        // doing nothing
        else {
            this.state = PlayerStateNames.STANDING;
            this.xVelocity = 0;
        }

    }

    // Called when player in standing state
    standing(){
        this.fireProjectile();
        if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;
            this.yVelocity = -this.currentAttributes.jump;
        }

        if (this.currentKeys.moveRight){
            this.state = PlayerStateNames.WALKING;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.state = PlayerStateNames.WALKING;
        }

        else {
            this.state = PlayerStateNames.STANDING
        }
        this.xVelocity = 0;
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
            const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 15, 15)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.xVelocity = 15;
        }
        else if (this.currentKeys.attackLeft){
            const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 15, 15)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.xVelocity = -15;
        }
        else if(this.currentKeys.attackDown){
            const test = updateStatistic(PlayerStatisticNames.PROJECTILES_FIRED, 1);
            store.dispatch(test as ControlAction);
            const projectile = new Rock(this.loader, this.x, this.y, 15, 15)
            
            this.currentStage.viewport.addChild(projectile.sprite);
            this.currentStage.projectiles.push(projectile);
            projectile.yVelocity = 15;
            
        }

    }

    // Handle player state
    handleState(){

        switch(this.state){
            case(PlayerStateNames.STANDING):
                this.standing();
                break;
            case(PlayerStateNames.WALKING):
                this.walking()
                break;
            case(PlayerStateNames.FALLING):
            this.falling()
                break;
            case(PlayerStateNames.JUMPING):
            this.jumping()
                break;
            default:
                break;
        }
    }

}