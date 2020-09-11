// export const x = 2;

// import * as PIXI from "pixi.js";
// import { Stage } from "../game_classes";
import { Player } from "./player";
import { Stage } from "../stages/stage";
import { UnitAttributes, UnitParts, SpriteParts } from "../../types/types";
import { Rock } from "../projectiles/rock";
import { Part } from "../part";
// import { UnitParts, SpriteParts, UnitAttributes } from "../../types/types";
// import { Part } from "../part";
// import { UnitPartNames, UnitStateNames } from "../../types/enums";
// import { Rock } from "../projectile";



export class Kobold extends Player {

    static baseAttributes = {
        HEALTH: 80,
        SPEED: 4,
        ARMOR: 2,
        ATTACK: 10,
        JUMP_HEIGHT: 10,
        JUMP_COUNT: 3,
        ATTACK_SPEED: 60
    } as UnitAttributes;

    static _name: string = "kobold";
    
    static width = 15;
    static height = 20;

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, stage, initialAttributes, width, height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.initSpriteParts();
        this.projectile = Rock;
    }

    initializeTextures(): UnitParts {
        return {
            body:{
                armor1: this.loader.resources['kobold-body-armor1'].texture, 
                armor2: this.loader.resources['kobold-body-armor2'].texture,
                armor3: undefined,
                default: this.loader.resources['kobold-body-default'].texture,
            },
            head: {
                armor1: this.loader.resources['kobold-head-armor1'].texture,
                armor2: this.loader.resources['kobold-head-armor2'].texture,
                armor3: this.loader.resources['kobold-head-armor3'].texture,
                default: this.loader.resources['kobold-head-default'].texture,
            },
            legs: {
                armor1: this.loader.resources['kobold-legs-armor1'].texture,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['kobold-legs-default'].texture,
            }
        }
    }

    initSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = -7;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);
        head.sprite.zIndex = 999999;

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height + headOffSetY - 4;
        const body = new Part(this.textures.body.default, bodyOffsetX, bodyOffsetY, this);

        const legsOffsetX = 0;
        const legsOffsetY = body.sprite.height + bodyOffsetY;
        const legs = new Part(this.textures.legs.default, legsOffsetX, legsOffsetY, this);

        return {
            head,
            body,
            legs
        };
    }

    // flipSpriteParts(){
    //     if (this.xVelocity > 0){
    //         this.facingRight = false;
    //     } else {
    //         this.facingRight = true;
    //     }
    //     Object.keys(this.spriteParts).forEach((key) => {
    //         const playerPartName = key as UnitPartNames;
    //         const sprite = this.spriteParts[playerPartName].sprite;
    //         if (this.facingRight){
    //             sprite.anchor.x = 0;
    //             sprite.scale.x = 1;
    //         }
    //         else{
    //             sprite.anchor.x = 1;
    //             sprite.scale.x = -1;
    //         }
    //     })


    //     if (this.state === UnitStateNames.DEAD){
    //         this.y = this.y + (this.height - this.width)
    //         this.width = this.height;
    //         this.height = this.width;
    //         this.xVelocity = 0;
    //         this.yVelocity = 0;
    //         // this.setState(UnitStateNames.DEAD)
    //         Object.keys(this.spriteParts).forEach((key: string) => {
    //             const partName = key as UnitPartNames;
    //             const spritePart = this.spriteParts[partName];
    //             spritePart.sprite.rotation = -1.5708; // 90degress in rads
    //         })

    //         // TODO remove this fro here and in Kobold in enemy.tsx
    //         const head = this.spriteParts.head;
    //         const headOffsetX =  0
    //         const headOffsetY = head.sprite.height/4;
    //         head.offSetX = headOffsetX;
    //         head.offSetY = headOffsetY;
    //         head.sprite.x = this.x + headOffsetX;
    //         head.sprite.y = (this.y + this.height) + headOffsetY;

    //         const body = this.spriteParts.body;
    //         const bodyOffsetX = head.sprite.height;;
    //         const bodyOffsetY = 0;
    //         body.offSetX = bodyOffsetX;
    //         body.offSetY = bodyOffsetY;
    //         body.sprite.x = this.x + bodyOffsetX;
    //         body.sprite.y = (this.y + this.height) + bodyOffsetY;

    //         const legs = this.spriteParts.legs;
    //         const legsOffsetX = head.sprite.height + body.sprite.height;
    //         const legsOffsetY = 0;
    //         legs.offSetX = legsOffsetX;
    //         legs.offSetY = legsOffsetY;
    //         legs.sprite.x = this.x + legsOffsetX;
    //         legs.sprite.y = ( this.y + this.height)  + legsOffsetY;
    //     }
    // }

}