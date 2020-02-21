import * as PIXI from 'pixi.js';
import { KeyOptions, SpriteTextures, PlayerState, PlayerAttributeNames } from '../types/states';
import { PlayerStateNames, PlayerArmorNames, PlayerPartNames } from '../types/enums';
import { Sprite } from './sprite';
import { SpritePart, Effect } from './interfaces';
import { Player } from './player';


export interface TreasureTextures {
    treasureBody: PIXI.Texture;
    treasureIcon: PIXI.Texture;
}


// Wrapper class for PIXI.Sprite will be extended
// upon by all sprites in applicaton

export class Treasure extends Sprite {
    textures: TreasureTextures;
    spriteParts: SpritePart[];
    effect: Effect;

    constructor(loader: PIXI.Loader){
        // x, y, width, height, xVel, yVel
        super(loader, 100, 100, 15, 15, 0, 0);
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
        this.effect = {} as Effect;
    }

    initTextures(): TreasureTextures{
        return {} as TreasureTextures
    }

    initSpriteParts(): SpritePart[]{
        // return []
        const baseIcon = new PIXI.Sprite(this.textures.treasureBody);
        const baseOffSetX = 0;
        const baseOffSetY = 0;
        baseIcon.x = this.x + baseOffSetX;
        baseIcon.y = this.y + baseOffSetY

        const baseSpritePart = {
            offSetX: baseOffSetX,
            offSetY: baseOffSetY,
            sprite: baseIcon
        } as SpritePart;


        const icon = new PIXI.Sprite(this.textures.treasureIcon);
        const iconOffSetX = -5;
        const iconOffSetY = 0;
        icon.x = this.x + iconOffSetX;
        icon.y = this.y + iconOffSetY
        const iconSpritePart = {
            offSetX: iconOffSetX,
            offSetY: iconOffSetY,
            sprite: icon,
        }
        return [ baseSpritePart, iconSpritePart ];
    }


    apply(player: Player): void {
        player.attributes[this.effect.attribute] += this.effect.value;
        if (this.effect.textureEffect){
            const affectedBodyPart = this.effect.textureEffect.bodyPart;
            const newArmorType = this.effect.textureEffect.armorType;
            const newTexture = player.textures[affectedBodyPart][newArmorType][player.state];
            
            const spritePart = player.spriteParts[affectedBodyPart].sprite;
            spritePart.texture = newTexture;
        }
    }
}








export class Armor1Helmet extends Treasure {

    constructor(loader: PIXI.Loader){
        super(loader);
        this.effect = {
            attribute: PlayerAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: PlayerArmorNames.ARMOR1,
                bodyPart: PlayerPartNames.HEAD,
                
            }
        } as Effect
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-head-armor1-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}


export class Armor1Body extends Treasure {

    constructor(loader: PIXI.Loader){
        super(loader);
        this.effect = {
            attribute: PlayerAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: PlayerArmorNames.ARMOR1,
                bodyPart: PlayerPartNames.BODY,
                
            }
        } as Effect
    }

    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-body-armor1-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}
