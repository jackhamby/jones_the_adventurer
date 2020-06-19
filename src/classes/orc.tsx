import * as PIXI from "pixi.js";
import { Stage } from "./game_classes";
import { Player } from "./player";
import { UnitParts, SpriteParts, UnitAttributes } from "../types/types";
import { Part } from "./part";
import { UnitPartNames, UnitStateNames } from "../types/enums";
import { Rock } from "./projectile";


export class Orc extends Player {
    
    static width = 20;
    static height = 30;

    static baseAttributes = {
        health: 120,
        speed: 2,
        armor: 10,
        attack: 8,
        jump_height: 10,
        jump_count: 2,
        attack_speed: 12
    }

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: UnitAttributes, x: number, y: number){
        super(loader, stage, initialAttributes, Orc.width, Orc.height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.initSpriteParts();
        this.attributes = initialAttributes;
        this.projectile = Rock;
    }

    initializeTextures(): UnitParts {
        return {
            body:{
                armor1: undefined,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['orc-body-default'].texture,

            },
            head: {
                armor1: undefined,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['orc-head-default'].texture,
            },
            legs: {
                armor1: undefined,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['orc-legs-default'].texture,
            }
        }
    }

    initSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = 0;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);
        head.sprite.zIndex = 999999;

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height - 4;
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