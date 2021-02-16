import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';
import { Armor,
    KnightHeadArmor1,
    KnightHeadArmor2,
    KnightBodyArmor1,
    KnightLegsArmor1, 
    KoboldHeadArmor1, 
    KoboldHeadArmor2,
    KoboldHeadArmor3,
    KoboldBodyArmor1,
    KoboldBodyArmor2,
    KoboldLegsArmor1, 
    OrcHeadArmor1,
    OrcHeadArmor2, 
    OrcLegsArmor1, 
    OrcBodyArmor1, 
    KnightLegsArmor2,
    KnightLegsArmor3,
    KnightBodyArmor2,
    KnightBodyArmor3,
    KnightHeadArmor3
} from '../armor';
import { Stage } from '../stage/stage';
export class ArmorTreasure extends Treasure {

    armor: Armor;
    
    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = {} as Armor;
        // this.amount = 0;
    }

    apply(player: Player){
        super.apply(player);
        this.armor.apply(player);
        player.armors.push(this.armor);
    }

    initTextures(){
        this.treasureBodyTexture = this.loader.resources['treasure-base'].texture;
        this.treasureIconTexture = this.armor.texture;
    }
}

// ==================================================================================================

// Knight ==================================================================================================

export class KnightHeadArmor1Treasure extends ArmorTreasure {

    static imageUrl = "/images/knight/head/head_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightHeadArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KnightHeadArmor2Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/head/head_armor2.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightHeadArmor2(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KnightHeadArmor3Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/head/head_armor3.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightHeadArmor3(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}


export class KnightBodyArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/body/body_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightBodyArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KnightBodyArmor2Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/body/body_armor2.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightBodyArmor2(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KnightBodyArmor3Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/body/body_armor3.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightBodyArmor3(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}


export class KnightLegsArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/legs/legs_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightLegsArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KnightLegsArmor2Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/legs/legs_armor2.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightLegsArmor2(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KnightLegsArmor3Treasure extends ArmorTreasure {
    static imageUrl = "/images/knight/legs/legs_armor3.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KnightLegsArmor3(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}
// ==================================================================================================
// Kobold ==================================================================================================

export class KoboldHeadArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/kobold/head/head_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KoboldHeadArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KoboldHeadArmor2Treasure extends ArmorTreasure {
    static imageUrl = "/images/kobold/head/head_armor2.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KoboldHeadArmor2(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }

}

export class KoboldHeadArmor3Treasure extends ArmorTreasure {
    static imageUrl = "/images/kobold/head/head_armor3.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KoboldHeadArmor3(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KoboldBodyArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/kobold/body/body_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KoboldBodyArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KoboldBodyArmor2Treasure extends ArmorTreasure {
    static imageUrl = "/images/kobold/body/body_armor2.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KoboldBodyArmor2(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class KoboldLegsArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/kobold/legs/legs_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new KoboldLegsArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

// ==================================================================================================
// Orc ==================================================================================================

export class OrcHeadArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/orc/head/head_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new OrcHeadArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class OrcHeadArmor2Treasure extends ArmorTreasure {
    static imageUrl = "/images/orc/head/head_armor2.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new OrcHeadArmor2(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class OrcLegsArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/orc/legs/legs_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new OrcLegsArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}

export class OrcBodyArmor1Treasure extends ArmorTreasure {
    static imageUrl = "/images/orc/body/body_armor1.png";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.armor = new OrcBodyArmor1(loader);
        this.name = this.armor.name;
        this.initTextures();
        this.initSpriteParts();
    }
}
