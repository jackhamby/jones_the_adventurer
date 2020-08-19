import * as PIXI from 'pixi.js';
import * as React from 'react';
import { Sprite } from '../sprite';
import { SpritePart } from '../interfaces';
import { Player } from '../players/player';
import { FloatingText } from '../floating_text';

export class Treasure extends Sprite {
    treasureIconTexture: PIXI.Texture;
    treasureBodyTexture?: PIXI.Texture;
    spriteParts: SpritePart[];
    name: string;
    iconOffsetX: number;
    iconOffsetY: number;


    constructor(loader: PIXI.Loader, x: number, y: number){
        // For now treasure sizes are hard coded to 15, 15
        super(loader, x, y, 15, 15, 0, 0);
        this.treasureIconTexture = {} as PIXI.Texture;
        this.treasureBodyTexture = undefined;
        this.spriteParts = [];
        this.name = "";
        this.iconOffsetX = 0;
        this.iconOffsetY = 0;
    
        
    }

    apply(player: Player){
        player.treasures.push(this);
    }

    initTextures(): void{
        throw(`treasure ${this.name} needs to overload initTextures()`);
    }

    initSpriteParts(): void{
        const spriteParts = [];
        if (this.treasureBodyTexture){
            const baseIcon = new PIXI.Sprite(this.treasureBodyTexture);
            this.iconOffsetX = baseIcon.width / 4;
            this.iconOffsetY = -baseIcon.height / 4;
            baseIcon.x = this.x + this.iconOffsetX;
            baseIcon.y = this.y + this.iconOffsetY;

            const baseSpritePart = {
                offSetX: this.iconOffsetX,
                offSetY: this.iconOffsetY,
                sprite: baseIcon
            } as SpritePart;
            spriteParts.push(baseSpritePart);
        }



        const icon = new PIXI.Sprite(this.treasureIconTexture);
        const iconOffSetX = 0;
        const iconOffSetY = 0;
        icon.x = this.x + iconOffSetX;
        icon.y = this.y + iconOffSetY
        const iconSpritePart = {
            offSetX: iconOffSetX,
            offSetY: iconOffSetY,
            sprite: icon,
        }
        spriteParts.push(iconSpritePart);
        this.spriteParts = spriteParts;
    }
}
