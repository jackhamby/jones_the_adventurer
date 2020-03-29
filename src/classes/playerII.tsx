import { Unit, UnitAttributes, UnitStateNames } from "./unit";
import { Stage } from "./game_classes";


export class PlayerII extends Unit {
    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes){
        // x, y, width, height, xVel, yVel
        super(loader, currentStage, initialAttributes);
    };

    falling(){
        this.fireProjectile();

        const gravity = 0.5;
        this.yVelocity += gravity;

        // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        if (this.currentKeys.jump){
            this.state = UnitStateNames.JUMPING;  
            this.yVelocity = -this.currentAttributes.jump;
        }

        if (this.inKnockBack){
            return;
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

        // Prevent movement if in knockback
        if (this.inKnockBack){
            // return;
            this.inKnockBack = false;
        }
        // TODO REMOVE THIS TO PREVENT INFINITE JUMP
        if (this.currentKeys.jump){
            this.state = UnitStateNames.JUMPING;  
            this.yVelocity = -this.currentAttributes.jump
        }
        // TODO UNCOMMENT THIS
        // this.allowJump = false;



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
        this.fireProjectile();

        if (this.currentKeys.jump){
            this.state = UnitStateNames.JUMPING;  
            this.yVelocity = this.currentAttributes.jump
        }

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
        this.fireProjectile();

        this.inKnockBack =  false;

        if (this.currentKeys.jump){
            this.state = UnitStateNames.JUMPING;
            this.yVelocity = -this.currentAttributes.jump;
        }

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