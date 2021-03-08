
import * as PIXI from 'pixi.js';
import { UnitArmorNames, UnitPartNames, UnitAttributeNames } from '../types/enums';
import { UnitAttributes } from '../types/types';
import { Unit } from './unit';

export class Armor {
    type: UnitArmorNames;
    part: UnitPartNames;
    name: string;
    attributes: UnitAttributes;
    texture: PIXI.Texture;
    loader: PIXI.Loader;
    
    constructor(loader: PIXI.Loader){
        this.type = UnitArmorNames.DEFAULT;
        this.part = UnitPartNames.HEAD;
        this.loader = loader;
        this.name = "";
        this.attributes = {
            HEALTH: 0,
            ATTACK: 0,
            ATTACK_SPEED: 0,
            JUMP_COUNT: 0,
            JUMP_HEIGHT: 0,
            SPEED: 0,
            ARMOR: 0,
        };
        this.texture = {} as PIXI.Texture;
    }

    apply(player: Unit){
        if (player.currentArmorSet[this.part]){
            player.currentArmorSet[this.part]?.remove(player);
        }
        Object.keys(this.attributes).forEach((key: string) => {
            const attributeName = key as UnitAttributeNames;
            player.attributes[attributeName] += this.attributes[attributeName];
            player.currentAttributes[attributeName] += this.attributes[attributeName];
        });
        const spritePart = player.spriteParts[this.part].sprite;
        spritePart.texture = this.texture;

        player.currentArmorSet[this.part] = this;
    }

    remove(player: Unit){
        Object.keys(this.attributes).forEach((key: string) => {
            const attributeName = key as UnitAttributeNames;
            player.attributes[attributeName] -= this.attributes[attributeName];
            player.currentAttributes[attributeName] -= this.attributes[attributeName];
        });
        // Remove from current armorset
        player.currentArmorSet[this.part] = null;

        // Set sprite texture back to default texture
        player.spriteParts[this.part].sprite.texture = player.textures[this.part][UnitArmorNames.DEFAULT];
    }
}

// ========================================================================================================
// Knight ==================================================================================================

export class KnightHeadArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.name = "iron helmet";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.HEAD;
        this.texture = this.loader.resources['knight-head-armor1'].texture
        this.attributes.ARMOR = 5;
    }
}

export class KnightHeadArmor2 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "a hat";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;
        this.texture = this.loader.resources['knight-head-armor2'].texture;
        this.attributes.ARMOR = 10;
    }
}

export class KnightHeadArmor3 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "a 70s style";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;
        this.texture = this.loader.resources['knight-head-armor3'].texture;
        this.attributes.ARMOR = 20;
    }
}

export class KnightBodyArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "iron breast plate";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.BODY;
        this.texture = this.loader.resources['knight-body-armor1'].texture;
        this.attributes.ARMOR = 7;

    }
}

export class KnightBodyArmor2 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "chainmail";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.BODY;
        this.texture = this.loader.resources['knight-body-armor2'].texture;
        this.attributes.ARMOR = 10;

    }
}

export class KnightBodyArmor3 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "reinforced breast plate";
        this.type = UnitArmorNames.ARMOR3;
        this.part = UnitPartNames.BODY;
        this.texture = this.loader.resources['knight-body-armor3'].texture;
        this.attributes.ARMOR = 15;

    }
}

export class KnightLegsArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "iron plate legs";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.LEGS;
        this.texture = this.loader.resources['knight-legs-armor1'].texture;
        this.attributes.ARMOR = 6;
    }
}

export class KnightLegsArmor2 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "enforced plate legs";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.LEGS;
        this.texture = this.loader.resources['knight-legs-armor2'].texture;
        this.attributes.ARMOR = 8;
    }
}

export class KnightLegsArmor3 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "gold legs";
        this.type = UnitArmorNames.ARMOR3;
        this.part = UnitPartNames.LEGS;
        this.texture = this.loader.resources['knight-legs-armor3'].texture;
        this.attributes.ARMOR = 12;
    }
}


// ==================================================================================================
// Orc ==================================================================================================


export class OrcHeadArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "cool hair";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['orc-head-armor1'].texture;
        this.attributes.ARMOR = 5;
    }
}


export class OrcHeadArmor2 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "ninja hood";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['orc-head-armor2'].texture;
        this.attributes.ARMOR = 10;

    }
}

export class OrcLegsArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "jorts";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.LEGS;

        this.texture = this.loader.resources['orc-legs-armor1'].texture;
        this.attributes.ARMOR = 10;

    }
}

export class OrcBodyArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "crop top";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.BODY;

        this.texture = this.loader.resources['orc-body-armor1'].texture;
        this.attributes.ARMOR = 10;
    }
}

// ==================================================================================================
// Kobold ==================================================================================================

export class KoboldHeadArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "iron helmet";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['kobold-head-armor1'].texture;
        this.attributes.ARMOR = 5;
    }
}


export class KoboldHeadArmor2 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "wooden helmet";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['kobold-head-armor2'].texture;
        this.attributes.ARMOR = 10;
    }
}


export class KoboldHeadArmor3 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "wooden mask";
        this.type = UnitArmorNames.ARMOR3;
        this.part = UnitPartNames.HEAD;

        this.texture = this.loader.resources['kobold-head-armor3'].texture;
        this.attributes.ARMOR = 15;
    }
}

export class KoboldBodyArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "chainmail";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.BODY;

        this.texture = this.loader.resources['kobold-body-armor1'].texture;
        this.attributes.ARMOR = 10;
    }
}

export class KoboldBodyArmor2 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "platemail";
        this.type = UnitArmorNames.ARMOR2;
        this.part = UnitPartNames.BODY;

        this.texture = this.loader.resources['kobold-body-armor2'].texture;
        this.attributes.ARMOR = 14;
    }
}

export class KoboldLegsArmor1 extends Armor {
    constructor(loader: PIXI.Loader){
        super(loader);
        this.loader = loader;
        this.name = "chainmail";
        this.type = UnitArmorNames.ARMOR1;
        this.part = UnitPartNames.LEGS;

        this.texture = this.loader.resources['kobold-legs-armor1'].texture;
        this.attributes.ARMOR = 8;
    }
}