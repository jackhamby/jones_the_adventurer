import { Player, SpritePart } from "./player";
import * as PIXI from "pixi.js";

export interface KnightTextures {
    body: {
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
        },
        armor1: {
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
            body: {
                default: {
                    standing: this.loader.resources['knight-body-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-body-default-standing'].texture,
                    jumping: this.loader.resources['knight-body-default-standing'].texture,
                },
                armor1: {
                    standing: this.loader.resources['knight-body-armor1-standing'].texture,
                    falling: this.loader.resources['knight-body-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-body-armor1-standing'].texture,
                }
            },
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
            },
            legs: {
                default: {
                    standing: this.loader.resources['knight-legs-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-legs-default-standing'].texture,
                    jumping: this.loader.resources['knight-legs-default-standing'].texture,
                },
                armor1: {
                    standing: this.loader.resources['knight-legs-armor1-standing'].texture,
                    falling: this.loader.resources['knight-legs-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-legs-armor1-standing'].texture,
                }
            },
        } as KnightTextures
    }

    private initSpriteParts(): SpritePart[] {
        // head

        const headSprite = new PIXI.Sprite(this.textures.head.default.standing);
        const headOffsetX = 0;
        const headOffSetY = 0;
        headSprite.x = this.x + headOffsetX;
        headSprite.y = this.y + headOffSetY;
 

        const headSpritePart = {
            offSetX: headOffsetX,
            offSetY: headOffSetY,
            sprite: headSprite,
        } as SpritePart


        const bodySprite = new PIXI.Sprite(this.textures.body.default.standing);
        const bodyOffsetX = 0;
        const bodyOffsetY = headSprite.height;
        bodySprite.x = this.x + bodyOffsetX;
        bodySprite.y = this.y + bodyOffsetY;
        const bodySpritePart = {
            offSetX: bodyOffsetX,
            offSetY: bodyOffsetY,
            sprite: bodySprite
        }

        const legsSprite = new PIXI.Sprite(this.textures.legs.default.standing);
        const legsOffsetX = 0;
        const legsOffsetY = bodySprite.height + headSprite.height;
        legsSprite.x = this.x + legsOffsetX;
        legsSprite.y = this.y + legsOffsetY;
        const legspritePart = {
            offSetX: legsOffsetX,
            offSetY: legsOffsetY,
            sprite: legsSprite
        }
        







        return [ headSpritePart, bodySpritePart, legspritePart ];
    }

}