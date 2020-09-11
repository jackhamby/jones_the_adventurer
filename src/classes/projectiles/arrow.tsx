import { Projectile } from "./projectile";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js'


export class Arrow extends Projectile {

    static baseAttributes = {
        damage: 25,
        speed: 20,
        loft: 0,
    }

    static width = 13;
    static height = 5;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['arrow'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.attributes = Arrow.baseAttributes
        this.width = Arrow.width;
        this.height = Arrow.height;
        this.name = "arrow";
    }
}

