
import * as PIXI from 'pixi.js';
import { UnitArmorNames, UnitPartNames, UnitAttributeNames } from '../types/enums';
import { Player } from './players/player';

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

// ==================================================================================================


// Knight ==================================================================================================

export class KnightHeadArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "iron helmet";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.HEAD;
        this.texture = this.loader.resources['knight-head-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
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
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;
        this.texture = this.loader.resources['knight-head-armor2'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 10,
            }
        ]
    }
}

export class KnightBodyArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "iron breast plate";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.BODY;
        this.texture = this.loader.resources['knight-body-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 7,
            }
        ]
    }
}

export class KnightLegsArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "iron plate legs";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.LEGS;
        this.texture = this.loader.resources['knight-legs-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 6,
            }
        ]
    }
}

// ==================================================================================================




// Orc ==================================================================================================


export class OrcHeadArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "cool hair";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['orc-head-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 5,
            }
        ]
    }
}


export class OrcHeadArmor2 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "ninja hood";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['orc-head-armor2'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 5,
            }
        ]
    }
}

export class OrcLegsArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "jorts";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.LEGS;

        this.texture = this.loader.resources['orc-legs-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 8,
            }
        ]
    }
}

export class OrcBodyArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "crop top";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.BODY;

        this.texture = this.loader.resources['orc-body-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 10,
            }
        ]
    }
}

// ==================================================================================================

// Kobold ==================================================================================================

export class KoboldHeadArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "iron helmet";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['kobold-head-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 5,
            }
        ]
    }
}


export class KoboldHeadArmor2 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "wooden helmet";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['kobold-head-armor2'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 10,
            }
        ]
    }
}


export class KoboldHeadArmor3 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "wooden mask";
        this.type = UnitArmorNames.ARMOR3;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['kobold-head-armor3'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 15,
            }
        ]
    }
}

export class KoboldBodyArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "chainmail";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.BODY;

        this.texture = this.loader.resources['kobold-body-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 10,
            }
        ]
    }
}

export class KoboldBodyArmor2 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "platemail";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.BODY;

        this.texture = this.loader.resources['kobold-body-armor2'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 14,
            }
        ]
    }
}


export class KoboldLegsArmor1 extends Armor {
    loader: PIXI.Loader;

    constructor(loader: PIXI.Loader){
        super();
        this.loader = loader;
        this.name = "chainmail";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.LEGS;

        this.texture = this.loader.resources['kobold-legs-armor1'].texture;
        this.attributes = [
            {
                attribute: UnitAttributeNames.armor,
                amount: 8,
            }
        ]
    }
}