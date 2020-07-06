

import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';
import { Projectile, Arrow } from '../projectile';

export class ProjectileTreasure extends Treasure {

    projectile: typeof Projectile;

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        // this.amount = 0;
        this.projectile = {} as typeof Projectile;
    }

    apply(player: Player){
        // player.currentGold += this.amount;
        player.projectile = this.projectile;
    }

    initTextures(){
        this.treasureBodyTexture = this.loader.resources['treasure-base'].texture;
        // this.treasureIconTexture = this.projectile.texture;
    }

}


export class ArrowTreasure extends ProjectileTreasure {

    constructor(loader: PIXI.Loader, x: number, y: number){
        super(loader, x, y);
        this.projectile = Arrow;
        this.iconOffsetX = -5;
        this.iconOffsetY = -8;
        this.initTextures();
        this.initSpriteParts();
    }

    initTextures(){
        super.initTextures();
        this.treasureIconTexture = this.loader.resources['arrow'].texture;
    }

}