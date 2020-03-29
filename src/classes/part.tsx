import * as PIXI from "pixi.js";
import { Sprite } from "./sprite";

export class Part {
    texture: PIXI.Texture;
    offSetX: number;
    offSetY: number;
    sprite: PIXI.Sprite;
    parentSprite: Sprite;



    constructor(texture: PIXI.Texture, offSetX: number, offSetY: number, parentSprite: Sprite){
        this.texture = texture;
        this.offSetX = offSetX;
        this.offSetY = offSetY;
        this.parentSprite = parentSprite;
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.x = this.parentSprite.x + this.offSetX;
        this.sprite.y = this.parentSprite.y + this.offSetY;
    }

    setSprite(newTexture: PIXI.Texture){
        this.sprite.texture = newTexture;
    }

}
