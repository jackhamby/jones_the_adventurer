import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';



export class CoinTreasure extends Treasure {

    amount: number;

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.amount = 0;
    }

    apply(player: Player){
        player.currentGold += this.amount;
        player.treasures = [...player.treasures, this];
    }

    initTextures(){
        this.treasureBodyTexture = undefined;
    }

}


export class SmallCoins extends CoinTreasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.amount = Math.floor(Math.random() * 10);
        this.initTextures();
        this.initSpriteParts();
    }

    initTextures(){
        super.initTextures()
        this.treasureIconTexture = this.loader.resources['coins-small'].texture;
    }
}


