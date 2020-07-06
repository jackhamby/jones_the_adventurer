import * as PIXI from 'pixi.js';
import { UnitArmorNames, UnitPartNames, UnitAttributeNames } from '../types/enums';
import { Player } from './players/player';
import { ArmorTreasure } from './treasures/armor_treasure';

interface AttributeUpdate {
    attribute: UnitAttributeNames;
    amount: number;
}

export class Armor {

    type: UnitArmorNames;
    part: UnitPartNames;
    name: string;
    attributes: AttributeUpdate[];
    texture: PIXI.Texture;
    
    constructor(){
        // TODO: is this okay? if these are not assigned by inherting class
        // it may be hard to debug
        this.type = UnitArmorNames.DEFAULT;
        this.part = UnitPartNames.HEAD;
        this.name = "";
        this.attributes = [];
        this.texture = {} as PIXI.Texture;
    }

    apply(player: Player){
        if (player.currentArmorSet[this.part]){
            player.currentArmorSet[this.part]?.remove(player);
        }
        this.attributes.forEach((attributeUpdate: AttributeUpdate) => {
            player.attributes[attributeUpdate.attribute] += attributeUpdate.amount;
        });
        // const affectedBodyPart = this.part;
        // const newArmorType = this.type;
        // const newTexture = player.textures[affectedBodyPart][newArmorType];
        // if (player.sprit){
        //     // player.spriteParts[this.part]
        //     player
        // }
        const spritePart = player.spriteParts[this.part].sprite;
        spritePart.texture = this.texture;

        player.currentArmorSet[this.part] = this;
    }

    remove(player: Player){
        this.attributes.forEach((attributeUpdate: AttributeUpdate) => {
            player.attributes[attributeUpdate.attribute] -= attributeUpdate.amount;
        });
        player.currentArmorSet[this.part] = null;
    }
}


// How do we load the texture for this
// export const KnightHeadArmor1 = new Armor(
//     UnitArmorNames.ARMOR1,
//     UnitPartNames.HEAD, 
//     "iron helmet", 
//     [
//         { attribute: UnitAttributeNames.ARMOR, amount: 5 }
//     ],
//     {} as PIXI.Texture
// );

export class KnightHeadArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "iron helmet";
        this.texture = this.loader.resources['knight-head-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.ARMOR,
                amount: 5,
            }
        ]
    }

    
}

export class KnightHeadArmor2 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "a hat";
        this.texture = this.loader.resources['knight-head-armor2'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.ARMOR,
                amount: 10,
            }
        ]
    }
}






