import { Sprite } from './sprite';
import { SpriteParts } from './player';





// enum UnitStateNames {
    // WALKING = "walking",
    // JUMPING = "jumping",
    // FALLING = "falling",
    // STANDING = "standing",
    // KNOCKBACK = "knockback"
// }

// export enum PlayerAttributeNames {
//     HEALTH = "health",
//     SPEED = "speed",
//     ARMOR = "armor",
//     ATTACK = "attack",
//     JUMP = "jump",
//     ATTACK_SPEED = "attack_speed"
// }




class UnitAttributes {
    health: number;
    speed: number;
    armor: number;

    constructor(health: number, speed: number, armor: number){
        this.health = health;
        this.speed = speed;
        this.armor = armor;
    }
}

class UnitStateNames {
    static WALKING = "walking";
}


var t = UnitStateNames["WALKING"];

export class Unit {

    state: UnitStateNames;
    allowJump: boolean;
    facingRight: boolean;
    attributes: UnitAttributes;
    currentAttributes: UnitAttributes;
    textures: SpriteParts;
    // attributes: PlayerAttributes;

    // state: PlayerStateNames;
    // spriteParts: SpriteParts;
    // currentAttributes: PlayerAttributes;
    // textures: PlayerParts;
    // currentStage: Stage;
    // hpBar: PIXI.Graphics;
    // treasures: Treasure[];
    // statistics: PlayerStatistics;
    // timeSinceLastProjectileFired: number;
    // projectileCooldown: number;
    // inKnockBack: boolean;


        constructor(){
            
            this.state = {} as UnitStateNames;
            this.allowJump = true;
            this.facingRight = false;
            this.attributes = {} as UnitAttributes;
            this.currentAttributes = {} as UnitAttributes;
            this.textures = {} as SpriteParts;
            // super(new PIXI.Loader(), )
            
        }

        setState(){

        }

        setY(){

        }

        setX(){

        }

        updateY(){
            
        }

        updateX(){
        
        }

        drawHpBar(){
            
        }
}