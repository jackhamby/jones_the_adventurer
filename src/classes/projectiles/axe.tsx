import { Projectile } from "./projectile";
import { Unit } from "../unit";
import { toDegrees } from "../../helpers/util";
import * as PIXI from 'pixi.js'

export class Axe extends Projectile {

    static baseAttributes = {
        damage: 40,
        speed: 20,
        loft: -3,
    }

    static width = 13;
    static height = 13;

    constructor(loader: PIXI.Loader, x: number, y: number, unit: Unit, xVelocity: number, yVelocity: number){
        super(loader, x, y, unit, xVelocity, yVelocity);
        this.texture = this.loader.resources['axe'].texture;
        this.sprite = this.createSprite();
        this.sticky = true;
        this.attributes = Axe.baseAttributes
        this.width = Axe.width;
        this.height = Axe.height;
        this.name = "axe";
    }


    flipSprite(sprite: PIXI.Sprite){
        if (this.xVelocity === 0 && this.yVelocity === 0){
            return; // leave sprite as is
        }

        // TODO: there is often space between the rotated axe
        // and its collision platform. this has to do with the space
        // in the axe image itself and the rotation we are perfoming.
        // for now, always rotate around center point
        this.sprite.anchor.set(0.5);
        this.sprite.rotation = this.sprite.rotation + 1
        if (this.sprite.rotation > (2 * Math.PI)){
            this.sprite.rotation = 0;
        }
    }
}



