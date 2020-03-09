import * as PIXI from 'pixi.js';
import { Sprite } from "./sprite";
import { EnemyStateNames } from "../types/enums";
import { Player } from "./player";

export type EnemyTextures = {
    [key in EnemyStateNames]: PIXI.Texture;
}

export class Enemy extends Sprite {

    sprite: PIXI.Sprite;
    state: EnemyStateNames;
    textures: EnemyTextures;
    player: Player;

    constructor(loader: PIXI.Loader, width: number, height: number, player: Player){
        // x, y, widht, height, xVEl, yVel
        super(loader, 200, 300, width, height, 0, 0);
        this.textures = {} as EnemyTextures;
        this.state = EnemyStateNames.STANDING;
        this.sprite = {} as PIXI.Sprite;
        this.player = player;
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

    update(){
        // console.log(this.state)
        this.handleState();
        this.flipSpriteParts();
    }

    setState(state: EnemyStateNames){
        this.state = state;
    }


    handleState(){
        switch(this.state){
            case(EnemyStateNames.STANDING):
            this.standing();
            break;
        case(EnemyStateNames.WALKING):
            this.walking()
            break;
        case(EnemyStateNames.FALLING):
            this.falling()
            break;
        case(EnemyStateNames.JUMPING):
            this.jumping()
            break;
        default:
            break;
        }
    }


    standing(){
        // console.log()
        // Need to start to walk right 
        if (this.x < this.player.x){
            this.setState(EnemyStateNames.WALKING);
        }
        // Need to start to walk left
        else if (this.x > this.player.x){
            this.setState(EnemyStateNames.WALKING);
        }
        // Matching x coord
        else {
            // Do nothing
            // this.state = EnemyStateNames.STANDING;
            this.xVelocity = 0;
        }
        

        // if (this.currentKeys.jump){
        //     this.state = PlayerStateNames.JUMPING;
        //     this.yVelocity = -10;
        // }

        // if (this.currentKeys.moveRight){
        //     this.state = PlayerStateNames.WALKING;
        // }

        // // Move left
        // else if (this.currentKeys.moveLeft){
        //     this.state = PlayerStateNames.WALKING;
        // }

        // else {
        //     this.state = PlayerStateNames.STANDING
        // }

    }

    walking(){
        // Walk right
        if (this.x < this.player.x){
            // this.setState(EnemyStateNames.WALKING);
            this.xVelocity = 1;
        }
        // walk left
        else if (this.x > this.player.x){
            this.xVelocity = -1;
            // this.setState(EnemyStateNames.WALKING);
        }
        // Matching x coord
        else {
            // Do nothing
            this.state = EnemyStateNames.STANDING;
            this.xVelocity = 0;
        }
        // if (this.currentKeys.jump){
        //     this.state = PlayerStateNames.JUMPING;  
        //     this.yVelocity = -10
        // }
        // // Move right
        // else if (this.currentKeys.moveRight){
        //     this.facingRight = true;
        //     this.xVelocity = 3;
        // }

        // // Move left
        // else if (this.currentKeys.moveLeft){
        //     this.facingRight = false;
        //     this.xVelocity = -3;
        // }

        // // doing nothing
        // else {
       
        // }
    }

    falling(){
        const gravity = 0.5;
        this.yVelocity += gravity;
          // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        //   if (this.currentKeys.jump){
        //     this.state = PlayerStateNames.JUMPING;  
        //     this.yVelocity = -10
        // }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;

        // Move right while fallig
        // if (this.currentKeys.moveRight){
        //     this.facingRight = true;
        //     this.xVelocity = 3;
        // }
        // // Move left while falling
        // else if (this.currentKeys.moveLeft){
        //     this.facingRight = false;
        //     this.xVelocity = -3;
        // }
        // if (this.yVelocity == 0){
        //     this.state = EnemyStateNames.STANDING;
        // }
    }

    jumping(){
        const gravity = 0.5;
        this.yVelocity += gravity;

        // // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        // if (this.currentKeys.jump){
        //     this.state = PlayerStateNames.JUMPING;  
        //     this.yVelocity = -10
        // }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;



        // Reached maximum height of jump, start falling
        // if (this.yVelocity > 0){
        //     this.state = PlayerStateNames.FALLING;
        // }

        // Move right while jumping
        // if (this.currentKeys.moveRight){
        //     this.facingRight = true;
        //     this.xVelocity = 3;
        // }
        // // Move left while jumping
        // else if (this.currentKeys.moveLeft){
        //     this.facingRight = false;
        //     this.xVelocity = -3;
        // }
    }

    flipSpriteParts(){

    }


}





export class Kobold extends Enemy {
    constructor(loader: PIXI.Loader, player: Player){
        super(loader, 20, 20, player);
        this.textures = this.initializeTextures();
        this.sprite = this.createSprite();
    }

    initializeTextures(): EnemyTextures {
        return {
            standing: this.loader.resources['kobold-standing'].texture, // TODO: use actual state textures
            walking: this.loader.resources['kobold-standing'].texture,
            falling: this.loader.resources['kobold-standing'].texture,
            jumping: this.loader.resources['kobold-standing'].texture
        } as EnemyTextures
    }

    createSprite(): PIXI.Sprite {
        const sprite = new PIXI.Sprite(this.textures.standing);
        sprite.x = this.x;
        sprite.y = this.y;
        return sprite;
    }

}
