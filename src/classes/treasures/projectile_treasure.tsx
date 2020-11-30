import * as PIXI from 'pixi.js';
import { Treasure } from './treasure';
import { Player } from '../players/player';
import {Arrow } from '../projectiles/arrow';
import { Projectile } from '../projectiles/projectile';
import { Stage } from '../stages/stage';

export class ProjectileTreasure extends Treasure {

    projectile: typeof Projectile;
    name = "projectile";

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
        // this.amount = 0;
        this.projectile = {} as typeof Projectile;
    }

    apply(player: Player){
        super.apply(player);
        // player.currentGold += this.amount;
        player.projectile = this.projectile;
        player.projectiles.push(this.projectile);
    }

    initTextures(){
        this.treasureBodyTexture = this.loader.resources['treasure-base'].texture;
        // this.treasureIconTexture = this.projectile.texture;
    }

}


export class ArrowTreasure extends ProjectileTreasure {

    name = "arrow";
    
    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        super(loader, stage, x, y);
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