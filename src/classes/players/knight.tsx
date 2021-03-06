import { Player } from "./player";
import { UnitAttributes, UnitParts, SpriteParts } from "../../types/types";
import { Stage } from "../stage/stage";
import { Part } from "../part";

export class Knight extends Player{
    
    static width = 20;
    static height = 30;

    static baseAttributes: UnitAttributes = {
        HEALTH: 100,
        SPEED: 3,
        ARMOR: 4,
        ATTACK: 99999999, // TODO REMOVE THIS
        JUMP_HEIGHT: 10,
        JUMP_COUNT: 2,
        ATTACK_SPEED: 50,
    };

    static _name: string = "knight";

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: UnitAttributes, width: number, height: number,  x: number, y: number){
        super(loader, stage, initialAttributes, width, height, x, y);
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }

    initTextures(): UnitParts {  
        return {
            body:{
                armor1: this.loader.resources['knight-body-armor1'].texture,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['knight-body-default'].texture,

            },
            head: {
                armor1: this.loader.resources['knight-head-armor1'].texture,
                armor2: this.loader.resources['knight-head-armor2'].texture,
                armor3: undefined,
                default: this.loader.resources['knight-head-default'].texture,
            
            },
            legs: {
                armor1: this.loader.resources['knight-legs-armor1'].texture,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['knight-legs-default'].texture,

            }
        }
    }

    initSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = -5;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height + headOffSetY;
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
}