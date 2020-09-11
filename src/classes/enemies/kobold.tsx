
import { Enemy } from "./enemy";
import { UnitAttributes, UnitParts, SpriteParts } from "../../types/types";
import { Stage } from "../stages/stage";
import { Arrow } from "../projectiles/arrow";
import { Part } from "../part";

export class Kobold extends Enemy {

    static baseAttributes: UnitAttributes = {
        ATTACK: 5,
        ATTACK_SPEED: 50,
        HEALTH: 100,
        SPEED: 10,
        JUMP_HEIGHT: 3,
        JUMP_COUNT: 1,
        ARMOR: 2,
    };

    static width = 15;
    static height = 20;

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, stage, initialAttributes, width, height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.createSpriteParts();
        this.facingRight = true;
        this.projectile = Arrow;
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
                armor1: this.loader.resources['kobold-legs-default'].texture,
                armor2: undefined,
                armor3: undefined,
                default: this.loader.resources['kobold-legs-default'].texture,
            }
        }
    }

    createSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = -7;
        const head = new Part(this.textures.head.default, headOffsetX, headOffSetY, this);
        head.sprite.zIndex = 99999999999;

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height + headOffSetY - 3;
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

