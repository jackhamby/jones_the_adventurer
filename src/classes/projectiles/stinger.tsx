import { Projectile } from "./projectile";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js'

export class Stinger extends Projectile {

    static baseAttributes = {
        damage: 20,
        speed: 20,
        loft: 0,
    }

    static width = 13;
    static height = 5;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['stinger'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.attributes = Stinger.baseAttributes
        this.width = Stinger.width;
        this.height = Stinger.height;
    }
}


