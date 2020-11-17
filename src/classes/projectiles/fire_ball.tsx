import { Projectile } from "./projectile";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js'


export class FireBall extends Projectile {

    static baseAttributes = {
        damage: 1000,
        speed: 50,
        loft: 0,
    }

    static width = 13;
    static height = 5;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['fire_ball'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.destroyOnContact = true;
        this.attributes = FireBall.baseAttributes
        this.width = FireBall.width;
        this.height = FireBall.height;
        this.name = "arrow";
    }
}

