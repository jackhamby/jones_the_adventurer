import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';
import { Stage } from '../stages/stage';

export class CoinTreasure extends Treasure {

    amount: number;

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        
        super(loader, stage, x, y);
        this.amount = 0;
    }

    apply(player: Player){
        super.apply(player)
        player.currentGold += this.amount;
    }

    initTextures(){
        this.treasureBodyTexture = undefined;
    }

}


export class SmallCoins extends CoinTreasure {

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        this.amount = Math.ceil(Math.random() * 10);
        this.initTextures();
        this.initSpriteParts();
        this.name = "small coins"
    }

    initTextures(){
        super.initTextures()
        this.treasureIconTexture = this.loader.resources['coins-small'].texture;
    }
}


