import { PlayerStates } from "../types/enums";
import { KeyOptions, AppState } from "../types/states";
import * as PIXI from "pixi.js";
// TODO remove this
import { store } from "../state_management/store";

export interface SpritePart {
    offSetX: number;
    offSetY: number;
    sprite: PIXI.Sprite;
    
}

export class Player  {

    state: PlayerStates;
    currentKeys: KeyOptions;
    allowJump: boolean;
    facingRight: boolean;
    loader: PIXI.Loader;

    xVelocity: number;
    yVelocity: number;
    x: number;
    y: number;
    width: number;
    height: number;

    spriteParts: SpritePart[];
    
    // TODO remove this
    graphics?: PIXI.Graphics;

    constructor(loader: PIXI.Loader){
        this.state = PlayerStates.STANDING;
        this.currentKeys = {} as KeyOptions;
        this.allowJump = true;
        this.facingRight = false;
        this.loader = loader;

        // Default attributes
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.x = 200;
        this.y = 500;
        this.width = 20;
        this.height = 30;

        this.spriteParts = [];

        // TODO remove this
        this.graphics = undefined;
        

    }


    updateX(value: number){
        this.x += value;
        this.spriteParts.map((spritePart: SpritePart) => {
            spritePart.sprite.x += value;
        })
    }

    updateY(value: number){
        this.y += value;
        this.spriteParts.map((spritePart: SpritePart) => {
            spritePart.sprite.y += value;
        })
    }

    setX(value: number){
        this.x = value;
        this.spriteParts.map((spritePart: SpritePart) => {
            spritePart.sprite.x = value + spritePart.offSetX;
        })
    } 

    setY(value: number){
        this.y = value;
        this.spriteParts.map((spritePart: SpritePart) => {
            spritePart.sprite.y = value + spritePart.offSetY;
        })
    } 

    setState(state: PlayerStates){
        this.state = state;
    }


    top(){
        return this.y;
    }
    bottom(){
        return this.y + this.height;
    }
    left(){
        return this.x;
    }
    right(){
        return this.x + this.width;
    }


    // Called on each game tick
    // Update player state and velocities
    update(keyboard: KeyOptions){
        this.currentKeys = keyboard;
        this.handleState();
        // console.log(`xVel: ${this.xVelocity}, yVel ${this.yVelocity}`)
        // console.log(`state ${PlayerStates[this.state]}`)
        this.flipSpriteParts();
        // temporary hack to fly
        // if (this.currentKeys.moveDown){
        //     this.pixiSprite.y += 1;
        // }
        // if (this.currentKeys.moveUp){
        //     this.pixiSprite.y -= 1;
        // }
    }


    flipSpriteParts(){

        // const state = store.getState() as AppState;
        // const newgraphic = new PIXI.Graphics();

        // newgraphic.beginFill(0xFFFF00);

        // // // set the line style to have a width of 5 and set the color to red
        // newgraphic.lineStyle(5, 0xFF0000);

        // // // draw a rectangle
        // newgraphic.drawRect(this.x, this.y, 5, 5);
        // newgraphic.drawRect(this.x + this.width, this.y, 5, 5);


        // if (this.graphics){
        //     console.log('removeing graphics')
        //     state.gameState.pixiApplication.stage.removeChild(this.graphics);
        // }
        // this.graphics = newgraphic;

        // state.gameState.pixiApplication.stage.addChild(newgraphic);
        // // stage.addChild(graphics);
        // // var rect = new PIXI.Rectangle(this.x, this.y, 5, 5);




        this.spriteParts.forEach((spritePart: SpritePart) => {
            
            if (this.facingRight){
                spritePart.sprite.anchor.x = 0;
                spritePart.sprite.scale.x = 1;
            }
            else{
                spritePart.sprite.anchor.x = 1;
                spritePart.sprite.scale.x = -1;
            }
        });
    }

    falling(){
        const gravity = 0.5;
        this.yVelocity += gravity;
          // TODO REMOVE THIS TO PREVENT INFINITE JUMP
          if (this.currentKeys.jump){
            this.state = PlayerStates.JUMPING;  
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
        // console.log('calling jumping in player.tsx')
        const gravity = 0.5;
        this.yVelocity += gravity;

        // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        if (this.currentKeys.jump){
            this.state = PlayerStates.JUMPING;  
            this.yVelocity = -10
        }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;



        // Reached maximum height of jump, start falling
        if (this.yVelocity > 0){
            // debugger;
            // console.log('tippng pont')
            this.state = PlayerStates.FALLING;
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
        // must be faling
        // if (!this.currentKeys.jump){
        //     this.state = PlayerStates.FALLING;
        // }

    }

    // Called when player in walking state
    walking(){
        // console.log('walking')
        if (this.currentKeys.jump){
            this.state = PlayerStates.JUMPING;  
            this.yVelocity = -10
        }
        // Move right
        else if (this.currentKeys.moveRight){
            // debugger;
            this.facingRight = true;
            this.xVelocity = 3;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            // debugger
            this.facingRight = false;
            this.xVelocity = -3;
        }

        // doing nothing
        else {
            this.state = PlayerStates.STANDING;
            this.facingRight = true;
            this.xVelocity = 0;
        }

    }

    // Called when player in standing state
    standing(){
        if (this.currentKeys.jump){
            this.state = PlayerStates.JUMPING;
            this.yVelocity = -10;
        }

        if (this.currentKeys.moveRight){
            this.state = PlayerStates.WALKING;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.state = PlayerStates.WALKING;
        }

        else {
            this.state = PlayerStates.STANDING
        }
    }

    // Handle player state
    handleState(){
        switch(this.state){
            case(PlayerStates.STANDING):
                this.standing();
                break;
            case(PlayerStates.WALKING):
                this.walking()
                // this.pixiSprite.x += this.xVelocity
                break;
            case(PlayerStates.FALLING):
            this.falling()
                break;
            case(PlayerStates.JUMPING):
            this.jumping()
                break;
            default:
                break;
        }
    }

}