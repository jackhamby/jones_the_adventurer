import * as PIXI from 'pixi.js';
import { KeyOptions, SpriteTextures } from '../types/states';
import { PlayerStates } from '../types/enums';
import { Sprite } from '../classes/sprite';


export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;

}

export class Player extends Sprite {

    state: PlayerStates;
    currentKeys: KeyOptions;
    allowJump: boolean;

    constructor(loader: PIXI.Loader){
        super(loader);
        this.state = PlayerStates.STANDING;
        this.currentKeys = {} as KeyOptions;
        this.allowJump = true;
    }

    initializeTextures(): SpriteTextures{
        return {
            standingRight: this.loader.resources["knight_sm_right.png"].texture,
            standingLeft: this.loader.resources["knight_sm_left.png"].texture,
            walkingLeft: this.loader.resources["knight_sm_left.png"].texture,
            walkingRight: this.loader.resources["knight_sm_right.png"].texture, //TODO: Update with correct texture
            jumpingLeft: this.loader.resources["knight_sm_left.png"].texture,
            jumpingRight: this.loader.resources["knight_sm_right.png"].texture,
            fallingLeft: this.loader.resources["knight_sm_left.png"].texture,
            fallingRight: this.loader.resources["knight_sm_right.png"].texture,
        } as SpriteTextures;
    }

    createPixiSprite(): PIXI.Sprite {
        const sprite =  new PIXI.Sprite(this.textures.standingLeft); // Default to standing left
        sprite.x = 300;
        return sprite;
    }


    // Called on each game tick
    // Update player state and velocities
    update(keyboard: KeyOptions){
        this.currentKeys = keyboard;
        this.handleState();
        console.log(`xVel: ${this.xVelocity}, yVel ${this.yVelocity}`)
        // console.log(`state ${PlayerStates[this.state]}`)
        this.flipSprite();
        // temporary hack to fly
        // if (this.currentKeys.moveDown){
        //     this.pixiSprite.y += 1;
        // }
        // if (this.currentKeys.moveUp){
        //     this.pixiSprite.y -= 1;
        // }
    }


    flipSprite(){
        switch(this.state){
            case(PlayerStates.WALKING):
                if (this.facingRight){
                    this.pixiSprite.texture = this.textures.walkingRight;
                    return;
                }
                this.pixiSprite.texture = this.textures.walkingLeft;
                break;
            case(PlayerStates.STANDING):
                if (this.facingRight){
                    this.pixiSprite.texture = this.textures.standingRight;
                    return;
                }
                this.pixiSprite.texture = this.textures.standingLeft;
                break;
            case(PlayerStates.FALLING):
                if (this.facingRight){
                    this.pixiSprite.texture = this.textures.fallingRight;
                    return;
                }
                this.pixiSprite.texture = this.textures.fallingLeft;
                break;
        }
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
            console.log('tippng pont')
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
