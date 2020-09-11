import { Projectile } from "./projectile";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js'

export class Rock extends Projectile {

    static baseAttributes = {
        damage: 15,
        speed: 17,
        loft: -3,
    }

    static width = 10;
    static height = 10;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['rock'].texture;
        this.sprite = this.createSprite();
        this.sticky = false;
        this.attributes = Rock.baseAttributes;
        this.width = Rock.width;
        this.height = Rock.height;
        this.name = "rock";
    }
}

