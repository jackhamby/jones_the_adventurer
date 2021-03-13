import { Player } from "./player";
import { Stage } from "../stage/stage";
import { UnitAttributes, UnitParts, SpriteParts } from "../../types/types";
import { Rock } from "../projectiles/rock";
import { Part } from "../part";


export class Orc extends Player {
    static baseAttributes: UnitAttributes = {
        HEALTH: 120,
        SPEED: 2,
        ARMOR: 10,
        ATTACK: 20,
        JUMP_HEIGHT: 10,
        JUMP_COUNT: 2,
        ATTACK_SPEED: 120
    };

    static _name: string = "orc";
    static width = 20;
    static height = 30;

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, stage, initialAttributes, width, height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.initSpriteParts();
        this.projectile = Rock;
    }

    initializeTextures(): UnitParts {
        return {
            body:{
                armor1:  this.loader.resources['orc-body-armor1'].texture,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['orc-body-default'].texture,

            },
            head: {
                armor1:  this.loader.resources['orc-head-armor1'].texture,
                armor2:  this.loader.resources['orc-head-armor2'].texture,
                armor3: undefined,
                default: this.loader.resources['orc-head-default'].texture,
            },
            legs: {
                armor1:  this.loader.resources['orc-legs-armor1'].texture,
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