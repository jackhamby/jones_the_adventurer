import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';



export class AttributeTreasure extends Treasure {

    // amount: number;

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);

        // this.amount = 0;
    }

    apply(player: Player){
        // player.currentGold += this.amount;

        
    }

}