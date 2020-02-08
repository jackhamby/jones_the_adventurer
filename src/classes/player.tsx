import { PlayerStates } from "../types/enums";
import { KeyOptions } from "../types/states";


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
        this.width = 30;
        this.height = 30;

        this.spriteParts = [];
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

    }


    // flipSprite(){
    //     switch(this.state){
    //         case(PlayerStates.WALKING):
    //             if (this.facingRight){
    //                 this.pixiSprite.texture = this.textures.walkingRight;
    //                 return;
    //             }
    //             this.pixiSprite.texture = this.textures.walkingLeft;
    //             break;
    //         case(PlayerStates.STANDING):
    //             if (this.facingRight){
    //                 this.pixiSprite.texture = this.textures.standingRight;
    //                 return;
    //             }
    //             this.pixiSprite.texture = this.textures.standingLeft;
    //             break;
    //         case(PlayerStates.FALLING):
    //             if (this.facingRight){
    //                 this.pixiSprite.texture = this.textures.fallingRight;
    //                 return;
    //             }
    //             this.pixiSprite.texture = this.textures.fallingLeft;
    //             break;
    //     }
    // }



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