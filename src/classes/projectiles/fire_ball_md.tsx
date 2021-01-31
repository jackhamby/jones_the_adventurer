import { Projectile } from "./projectile";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js'

export class FireBallMedium extends Projectile {

    static baseAttributes = {
        damage: 60,
        speed: 33,
        loft: -1,
    }

    static width = 17;
    static height = 15;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['fire_ball_md'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.destroyOnContact = true;
        this.attributes = FireBallMedium.baseAttributes
        this.width = FireBallMedium.width;
        this.height = FireBallMedium.height;
        this.name = "medium fireball";
    }
}

