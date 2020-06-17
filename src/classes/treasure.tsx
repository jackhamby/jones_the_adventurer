import * as PIXI from 'pixi.js';
import { PlayerAttributeNames } from '../types/states';
import { Sprite } from './sprite';
import { SpritePart, Effect } from './interfaces';
// import { Player } from './player';
import { Player } from './player';
import { UnitArmorNames, UnitPartNames, UnitAttributeNames } from '../types/enums';

export interface TreasureTextures {
    treasureBody?: PIXI.Texture;
    treasureIcon: PIXI.Texture;
}

// Wrapper class for PIXI.Sprite will be extended
// upon by all sprites in applicaton
export class Treasure extends Sprite {
    textures: TreasureTextures;
    spriteParts: SpritePart[];
    effect: Effect;
    iconOffsetX: number;
    iconOffsetY: number;
    name: string;

    constructor(loader: PIXI.Loader, x: number, y: number ) {        
        super(loader, x, y, 15, 15, 0, 0);
        this.x = x;
        this.y = y;
        this.iconOffsetX = 0;
        this.iconOffsetY = 0;
        this.textures = {} as TreasureTextures;
        this.spriteParts = [];
        this.effect = {} as Effect;
        this.name = "";
  
    }

    initTextures(): TreasureTextures{
        return {} as TreasureTextures
    }

    initSpriteParts(): SpritePart[]{
        const spriteParts = [];
        if (this.textures.treasureBody){
            const baseIcon = new PIXI.Sprite(this.textures.treasureBody);
            baseIcon.x = this.x + this.iconOffsetX;
            baseIcon.y = this.y + this.iconOffsetY
            const baseSpritePart = {
                offSetX: this.iconOffsetX,
                offSetY: this.iconOffsetY,
                sprite: baseIcon
            } as SpritePart;
            spriteParts.push(baseSpritePart);
        }

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
        spriteParts.push(iconSpritePart);
        return spriteParts;
    }

    static apply(player: Player, treasure: Treasure): void {
        if (treasure.effect.textureEffect){
            player.attributes[treasure.effect.attribute] += treasure.effect.value;
            player.currentAttributes[treasure.effect.attribute] += treasure.effect.value;

            if (treasure.effect.textureEffect){
                const affectedBodyPart = treasure.effect.textureEffect.bodyPart;
                const newArmorType = treasure.effect.textureEffect.armorType;
                const newTexture = player.textures[affectedBodyPart][newArmorType];
                const spritePart = player.spriteParts[affectedBodyPart].sprite;
                spritePart.texture = newTexture;
                player.currentArmorSet[affectedBodyPart] = newArmorType;
            }
        }
        if (treasure.effect.goldEffect){
            player.currentGold += treasure.effect.goldEffect.amount;
        }
        player.treasures = [...player.treasures, treasure];
    }
}







// ================================ Generic treasures ======================================//
// =========================================================================================//

export class SmallCoins extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number, amount: number){
        super(loader, x, y);
        this.iconOffsetX = 5;
        this.iconOffsetY = -5;
        this.effect = {
            goldEffect: {
                amount,
            }
     
        } as Effect;
        this.name = "small coin"
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }

    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['coins-small'].texture,
            treasureBody: undefined,
        }
    }

}




// ================================ Kobold treasures ======================================//
// =========================================================================================//

export class KoboldArmor1 extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = -6;
        this.iconOffsetY = 0;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR1,
                bodyPart: UnitPartNames.HEAD,
            }
        } as Effect;
        this.name = "iron helmet";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['kobold-head-armor1'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}

export class KoboldHeadArmor2 extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = -6;
        this.iconOffsetY = 0;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 10,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR2,
                bodyPart: UnitPartNames.HEAD,
            }
        } as Effect;
        this.name = "wooden helm";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['kobold-head-armor2'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}


export class KoboldHeadArmor3 extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = -6;
        this.iconOffsetY = 0;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 10,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR3,
                bodyPart: UnitPartNames.HEAD,
            }
        } as Effect;
        this.name = "wooden mask";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['kobold-head-armor3'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}

export class KoboldBodyArmor1 extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = 3;
        this.iconOffsetY = -5;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 10,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR1,
                bodyPart: UnitPartNames.BODY,
            }
        } as Effect;
        this.name = "chainmail";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['kobold-body-armor1'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}


export class KoboldBodyArmor2 extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = 3;
        this.iconOffsetY = -5;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 10,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR2,
                bodyPart: UnitPartNames.BODY,
            }
        } as Effect;
        this.name = "plate mail";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['kobold-body-armor2'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}




export class KoboldArmorLegs1 extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = -6;
        this.iconOffsetY = -10;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR1,
                bodyPart: UnitPartNames.LEGS,
            }
        } as Effect;
        this.name = "loin cloth";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['kobold-legs-armor1'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}










// ================================ Knight treasures ======================================//
// =========================================================================================//


export class Armor1Helmet extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = 5;
        this.iconOffsetY = -5;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR1,
                bodyPart: UnitPartNames.HEAD,
            }
        } as Effect;
        this.name = "iron helmet";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-head-armor1-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}


export class Armor2Helmet extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = 5;
        this.iconOffsetY = -5;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR2,
                bodyPart: UnitPartNames.HEAD,
            }
        } as Effect;
        this.name = "a hat";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();
    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-head-armor2-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}





export class Armor1Body extends Treasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.iconOffsetX = 5;
        this.iconOffsetY = -5;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR1,
                bodyPart: UnitPartNames.BODY,
                
            }
        } as Effect
        this.name = "iron breast plate";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();

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
        super(loader, x, y);
        this.iconOffsetX = 5;
        this.iconOffsetY = -5;
        this.effect = {
            attribute: UnitAttributeNames.ARMOR,
            value: 5,
            textureEffect: {
                armorType: UnitArmorNames.ARMOR1,
                bodyPart: UnitPartNames.LEGS,
                
            }
        } as Effect;
        this.name = "iron plate legs";
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts();

    }


    initTextures(): TreasureTextures {
        return {
            treasureIcon: this.loader.resources['knight-legs-armor1-standing'].texture,
            treasureBody: this.loader.resources['treasure-base'].texture,
        }
    }
}
