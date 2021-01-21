import { Enemy } from "./enemy";
import { UnitAttributes, UnitParts, SpriteParts } from "../../types/types";
import { Stage } from "../stages/stage";
import { Arrow } from "../projectiles/arrow";
import { Part } from "../part";


export class Man extends Enemy {
    static imageUrl = "/images/knight/knight_sm.png";

    static baseAttributes = {
        ATTACK: 3,
        ATTACK_SPEED: 50,
        HEALTH: 100,
        SPEED: 1,
        JUMP_HEIGHT: 3,
        JUMP_COUNT: 1,
        ARMOR: 2,
    } as UnitAttributes

    static width = 20;
    static height = 30;

    constructor(loader: PIXI.Loader, currentStage: Stage, initialAttributes: UnitAttributes, width: number, height: number, x: number, y: number){
        super(loader, currentStage, initialAttributes, width, height, x, y);
        this.textures = this.initializeTextures();
        this.spriteParts = this.createSpriteParts();
        this.projectile = Arrow;

    }

    initializeTextures(): UnitParts {
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

    createSpriteParts(): SpriteParts {
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


