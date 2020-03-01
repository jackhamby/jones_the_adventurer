import { PlayerStateNames, PlayerArmorNames, PlayerPartNames } from "../types/enums";
import { KeyOptions, AppState, PlayerAttributes } from "../types/states";
import { Sprite } from "./sprite";
import * as PIXI from "pixi.js";
// TODO remove this
import { store } from "../state_management/store";
import { SpritePart } from "./interfaces";



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




export interface testtreasure {
    part: PlayerPartNames;
    armor: PlayerArmorNames;
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

export class Player extends Sprite  {

    // Player shared attributes
    state: PlayerStateNames;
    currentKeys: KeyOptions;
    allowJump: boolean;
    facingRight: boolean;
    spriteParts: SpriteParts;
    attributes: PlayerAttributes;
    textures: PlayerParts;

    constructor(loader: PIXI.Loader, initialAttributes: PlayerAttributes){
        // x, y, width, height, xVel, yVel
        super(loader ,200, 200, 20, 30, 0, 0);
        this.state = PlayerStateNames.STANDING;
        this.attributes = initialAttributes;
        this.currentKeys = {} as KeyOptions;
        this.allowJump = true;
        this.facingRight = false;
        this.spriteParts = {} as SpriteParts;
        this.textures = {} as PlayerParts;
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
        this.currentKeys = keyboard;
        this.handleState();
        this.flipSpriteParts();
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
        const gravity = 0.5;
        this.yVelocity += gravity;
          // TODO REMOVE THIS TO PREVENT INFINITE JUMP
          if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;  
            this.yVelocity = -10
        }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;

        // Move right while fallig
        if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = 3;
        }
        // Move left while falling
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -3;
        }


    }

    jumping(){
        const gravity = 0.5;
        this.yVelocity += gravity;

        // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;  
            this.yVelocity = -10
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
            this.xVelocity = 3;
        }
        // Move left while jumping
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -3;
        }

    }

    // Called when player in walking state
    walking(){
        if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;  
            this.yVelocity = -10
        }
        // Move right
        else if (this.currentKeys.moveRight){
            this.facingRight = true;
            this.xVelocity = 3;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.facingRight = false;
            this.xVelocity = -3;
        }

        // doing nothing
        else {
            this.state = PlayerStateNames.STANDING;
            this.xVelocity = 0;
        }

    }

    // Called when player in standing state
    standing(){
        if (this.currentKeys.jump){
            this.state = PlayerStateNames.JUMPING;
            this.yVelocity = -10;
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