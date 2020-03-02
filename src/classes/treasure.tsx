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


export interface TreasureOptions {
    iconOffsetX: number;
    iconOffsetY: number;
    x: number;
    y: number;
}

// Wrapper class for PIXI.Sprite will be extended
// upon by all sprites in applicaton
export class Treasure extends Sprite {
    textures: TreasureTextures;
    spriteParts: SpritePart[];
    effect: Effect;
    iconOffsetX: number;
    iconOffsetY: number;

    constructor(loader: PIXI.Loader, options: TreasureOptions) {
        // x, y, width, height, xVelaa, yVel
        
        super(loader, options.x, options.y, 15, 15, 0, 0);
        this.x = options.x;
        this.y = options.y;
        this.iconOffsetX = options.iconOffsetX;
        this.iconOffsetY = options.iconOffsetY;
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
        this.effect = {} as Effect;
  
    }

    initTextures(): TreasureTextures{
        return {} as TreasureTextures
    }

    initSpriteParts(): SpritePart[]{
        const baseIcon = new PIXI.Sprite(this.textures.treasureBody);
        baseIcon.x = this.x + this.iconOffsetX;
        baseIcon.y = this.y + this.iconOffsetY

        const baseSpritePart = {
            offSetX: this.iconOffsetX,
            offSetY: this.iconOffsetY,
            sprite: baseIcon
        } as SpritePart;


        const icon = new PIXI.Sprite(this.textures.treasureIcon);
        const iconOffSetX = 0;
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
            // console.log(newArmorType)
            // console.log(affectedBodyPart)
            const spritePart = player.spriteParts[affectedBodyPart].sprite;
            spritePart.texture = newTexture;
        }
    }
}














export class Armor1Helmet extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, {x, y, iconOffsetX: 5, iconOffsetY: -5});
        this.effect = {
            attribute: PlayerAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: PlayerArmorNames.ARMOR1,
                bodyPart: PlayerPartNames.HEAD,
            }
        } as Effect;
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-head-armor1-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}













export class Armor1Body extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, {x, y, iconOffsetX: 5, iconOffsetY: -5});
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



export class Armor1Legs extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, {x, y, iconOffsetX: 5, iconOffsetY: -5});
        this.effect = {
            attribute: PlayerAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: PlayerArmorNames.ARMOR1,
                bodyPart: PlayerPartNames.LEGS,
                
            }
        } as Effect;
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-legs-armor1-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}
