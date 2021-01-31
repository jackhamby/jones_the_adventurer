import { Projectile } from "./projectile";
import { Unit } from "../unit";
import * as PIXI from 'pixi.js'
import { FireDot } from "../buffs/buff";

export class FireBall extends Projectile {

    static baseAttributes = {
        damage: 40,
        speed: 30,
        loft: 0,
    }

    static width = 13;
    static height = 10;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['fire_ball'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.destroyOnContact = true;
        this.attributes = FireBall.baseAttributes
        this.width = FireBall.width;
        this.height = FireBall.height;
        this.name = "fireball";
        this.buffs = [ FireDot ]
    }
}

