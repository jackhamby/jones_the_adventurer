import { Player, SpritePart } from "./player";
import * as PIXI from "pixi.js";

export interface KnightTextures {
    body: {
        default: {
            standing: PIXI.Texture,
            falling: PIXI.Texture,
            jumping: PIXI.Texture,
        }
    },
    head: {
        default: {
            standing: PIXI.Texture,
            falling: PIXI.Texture,
            jumping: PIXI.Texture,
        },
        armor1: {
            standing: PIXI.Texture,
            falling: PIXI.Texture,
            jumping: PIXI.Texture,
        }
    },
    legs: {
        default: {
            standing: PIXI.Texture,
            falling: PIXI.Texture,
            jumping: PIXI.Texture,
        }
    }
}






export class Knight extends Player {

    textures: KnightTextures;

    constructor(loader: PIXI.Loader){
        super(loader)
        this.textures = this.initTextures();
        this.spriteParts = this.initSpriteParts(); 
    }


    private initTextures(): KnightTextures {
        console.log('loading textures')
        return {
            body: {} as any,
            head: {
                default: {
                    standing: this.loader.resources['knight-head-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-head-default-standing'].texture,
                    jumping: this.loader.resources['knight-head-default-standing'].texture,
                },
                armor1: {
                    standing: this.loader.resources['knight-head-armor1-standing'].texture,
                    falling: this.loader.resources['knight-head-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-head-armor1-standing'].texture,
                }
            } as any,
            legs: {} as any,
        }
    }

    private initSpriteParts(): SpritePart[] {
        // head
        const headSprite = new PIXI.Sprite(this.textures.head.default.standing);
        const headOffsetX = 0;
        const headOffSetY = 0;
        headSprite.x = this.x + headOffsetX;
        headSprite.y = this.y + headOffSetY;
        const spritePart = {
            offSetX: headOffsetX,
            offSetY: headOffSetY,
            sprite: headSprite,
        } as SpritePart




        return [ spritePart ];
    }

}