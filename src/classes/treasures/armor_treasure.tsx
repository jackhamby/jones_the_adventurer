import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';
import { Armor, KnightHeadArmor1, KnightHeadArmor2 } from '../armor';



export class ArmorTreasure extends Treasure {

    armor: Armor;
    
    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.armor = {} as Armor;
        // this.amount = 0;
    }

    apply(player: Player){
        // const affectedBodyPart = this.armor.part;
        // const newArmorType = this.armor.type;
        // const newTexture = player.textures[affectedBodyPart][newArmorType];
        // const spritePart = player.spriteParts[affectedBodyPart].sprite;
        // // if (player.currentArmorSet[affectedBodyPart]){

        // // }
        // spritePart.texture = newTexture;
        // player.currentArmorSet[affectedBodyPart] = newArmorType;
        this.armor.apply(player)
        player.treasures = [...player.treasures, this];

        // debugger;
        // player.currentGold += this.amount;
    }

    initTextures(){
        this.treasureBodyTexture = this.loader.resources['treasure-base'].texture;
        this.treasureIconTexture = this.armor.texture;
    }
}

export class KnightHeadArmor1Treasure extends ArmorTreasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.armor = new KnightHeadArmor1(loader);
        this.initTextures();
        this.initSpriteParts();
    }

    initTextures(){
        super.initTextures();
    }
}


export class KnightHeadArmor2Treasure extends ArmorTreasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.armor = new KnightHeadArmor2(loader);
        this.initTextures();
        this.initSpriteParts();
    }

    initTextures(){
        super.initTextures();
    }
}