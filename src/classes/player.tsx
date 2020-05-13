import { Unit,} from "./unit";
import { Stage } from "./game_classes";
import { UnitStateNames } from "../types/enums";
import { UnitAttributes } from "../types/types";
import { KeyOptions } from "../types/states";


export class Player extends Unit {

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, currentStage, initialAttributes, width, height, x, y);
    };

    update(keyboard: KeyOptions){
        super.update(keyboard);
        console.log(`current jumps ${this.currentJumps}`);
    }

    handleState(){
        super.handleState();
    }


    falling(){
        this.tryAttack();
        this.tryJump();
        const gravity = 0.5;
        this.yVelocity += gravity;

        if (this.inKnockBack){
            return;
       }

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
        this.tryAttack();
        this.tryJump();

        const gravity = 0.5;
        this.yVelocity += gravity;

        if (this.inKnockBack){
            // return;
            this.inKnockBack = false;
        }

        // Reached maximum height of jump, start falling
        if (this.yVelocity > 0){
            this.state = UnitStateNames.FALLING;
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
        this.currentJumps = this.maxJumps;
        this.tryAttack();
        this.tryJump();

        // Prevent movement if in knockback
        if (this.inKnockBack){
            return;
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
            this.state = UnitStateNames.STANDING;
            this.xVelocity = 0;
        }

    }

    // Called when player in standing state
    standing(){
        this.inKnockBack =  false;
        this.currentJumps = this.maxJumps;

        this.tryAttack();
        this.tryJump();

        // Prevent movement if in knockback
        if (this.inKnockBack){
            return;
        }

        if (this.currentKeys.moveRight){
            this.state = UnitStateNames.WALKING;
        }

        // Move left
        else if (this.currentKeys.moveLeft){
            this.state = UnitStateNames.WALKING;
        }

        else {
            this.state = UnitStateNames.STANDING
        }
        this.xVelocity = 0;
    }


}