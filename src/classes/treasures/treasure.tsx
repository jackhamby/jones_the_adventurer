import * as PIXI from 'pixi.js';
import * as React from 'react';
import { Sprite } from '../sprite';
import { Player } from '../players/player';
import { FloatingText } from '../floating_text';
import { Stage } from '../stage/stage';
import { SpritePart } from '../../types/interfaces';

export class Treasure extends Sprite {
    static imageUrl = '';
    
    treasureIconTexture: PIXI.Texture;
    treasureBodyTexture?: PIXI.Texture;
    spriteParts: SpritePart[];
    name: string;
    iconOffsetX: number;
    iconOffsetY: number;
    currentStage: Stage;

    constructor(loader: PIXI.Loader, stage: Stage, x: number, y: number){
        //TODO: For now treasure sizes are hard coded to 15, 15
        super(loader, x, y, 15, 15, 0, 0);
        this.treasureIconTexture = {} as PIXI.Texture;
        this.currentStage = stage;
        this.treasureBodyTexture = undefined;
        this.spriteParts = [];
        this.name = "";
        this.iconOffsetX = 0;
        this.iconOffsetY = 0;
    }

    apply(player: Player){
        player.treasures.push(this);
    }

    add(): void {
        this.currentStage.viewport.addChild(...this.spriteParts.map((spritePart: SpritePart) => spritePart.sprite))
    }

    remove(): void {
        this.currentStage.treasures = this.currentStage.treasures.filter((treasure: Treasure) => treasure !== this);

        this.spriteParts.forEach((spritePart: SpritePart) => {
            this.currentStage.viewport.removeChild(spritePart.sprite);
        })
    }

    // ================================ protected =================================== 
    // ==============================================================================

    protected initTextures(): void{
        throw(`treasure ${this.name} needs to overload initTextures()`);
    }

    protected initSpriteParts(): void{
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
