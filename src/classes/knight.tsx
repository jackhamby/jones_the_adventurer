import * as PIXI from "pixi.js";
import { PlayerAttributes } from "../types/states";
import { Stage } from "./game_classes";
import { Player } from "./player";
import { UnitParts, SpriteParts, UnitAttributes } from "../types/types";
import { Part } from "./part";


export class Knight extends Player {

    static width = 20;
    static height = 30;

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: UnitAttributes, x: number, y: number){
        super(loader, stage, initialAttributes, Knight.width, Knight.height, x, y);
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
        this.attributes = initialAttributes;
    }


    initTextures(): UnitParts {  
        return {
            body:{
                armor1: this.loader.resources['knight-body-armor1-standing'].texture,
                default: this.loader.resources['knight-body-default-standing'].texture,
                armor2: this.loader.resources['knight-head-armor2-standing'].texture,

            },
            head: {
                default: this.loader.resources['knight-head-default-standing'].texture,
                armor1: this.loader.resources['knight-head-armor1-standing'].texture,
                armor2: this.loader.resources['knight-head-armor2-standing'].texture,
            },
            legs: {
                default: this.loader.resources['knight-legs-default-standing'].texture,
                armor1: this.loader.resources['knight-legs-armor1-standing'].texture,
                armor2: this.loader.resources['knight-head-armor2-standing'].texture,
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
        const legs = new Part(this.textures.legs.default, legsOffsetX, legsOffsetY, this);;
        return {
            head,
            body,
            legs
        };
    }

}