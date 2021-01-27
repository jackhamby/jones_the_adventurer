import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';
import { Stage } from '../stage/stage';
import { Spell } from '../spells/spell';
import { FireBall, FireBallMedium } from '../spells/projectile_spell';
import { FastFire } from '../spells/buff_spell';

export class SpellTreasure extends Treasure {

    spell: typeof Spell;

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        
        super(loader, stage, x, y);
        this.spell = FireBall;
    }

    apply(player: Player){
        super.apply(player);
        player.spells.push(new this.spell(player))
    }

    initTextures(){
        this.treasureBodyTexture = this.loader.resources['treasure-base'].texture;
    }

}


export class FireBallTreasure extends SpellTreasure {

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.initTextures();
        this.initSpriteParts();
        this.name = "small fireball";
        this.spell = FireBall;
    }

    initTextures(){
        super.initTextures()
        this.treasureIconTexture = this.loader.resources['fire_ball'].texture;
    }
}


export class FireBallMediumTreasure extends SpellTreasure {

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.initTextures();
        this.initSpriteParts();
        this.name = "medium fireball";
        this.spell = FireBallMedium;
    }

    initTextures(){
        super.initTextures()
        this.treasureIconTexture = this.loader.resources['fire_ball_md'].texture;
    }
}

export class FastFireTreasure extends SpellTreasure {

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.initTextures();
        this.initSpriteParts();
        this.name = "quick fire";
        this.spell = FastFire;
    }

    initTextures(){
        super.initTextures()
        this.treasureIconTexture = this.loader.resources['speed'].texture;
    }
}



