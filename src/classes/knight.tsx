import { Player, PlayerParts, SpriteParts, Part } from "./player";
import * as PIXI from "pixi.js";
import { KnightTextures, SpritePart } from "./interfaces";
import { PlayerAttributes } from "../types/states";




export class Knight extends Player {


    constructor(loader: PIXI.Loader, initialAttributes: PlayerAttributes){
        super(loader, initialAttributes);
        this.textures = this.initTexturesII();
        // this.spriteParts = this.initSpriteParts();
        this.spriteParts = this.initSpriteParts();
    }


    initTexturesII(): PlayerParts {
        return {
            body:{
                armor1: {
                    standing: this.loader.resources['knight-body-armor1-standing'].texture, // TODO update these to use corrct state
                    falling: this.loader.resources['knight-body-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-body-armor1-standing'].texture,
                    walking: this.loader.resources['knight-body-armor1-standing'].texture
                },
                default: {
                    standing:this.loader.resources['knight-body-default-standing'].texture,
                    falling: this.loader.resources['knight-body-default-standing'].texture,
                    jumping: this.loader.resources['knight-body-default-standing'].texture,
                    walking: this.loader.resources['knight-body-default-standing'].texture
                }
            },
            head: {
                default: {
                    standing: this.loader.resources['knight-head-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-head-default-standing'].texture,
                    jumping: this.loader.resources['knight-head-default-standing'].texture,
                    walking: this.loader.resources['knight-head-default-standing'].texture,
                },
                armor1: {
                    standing: this.loader.resources['knight-head-armor1-standing'].texture,
                    falling: this.loader.resources['knight-head-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-head-armor1-standing'].texture,
                    walking: this.loader.resources['knight-head-armor1-standing'].texture,
                }
            },
            legs: {
                default: {
                    standing: this.loader.resources['knight-legs-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-legs-default-standing'].texture,
                    jumping: this.loader.resources['knight-legs-default-standing'].texture,
                    walking: this.loader.resources['knight-legs-default-standing'].texture,
                },
                armor1: {
                    standing: this.loader.resources['knight-legs-armor1-standing'].texture,
                    falling: this.loader.resources['knight-legs-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-legs-armor1-standing'].texture,
                    walking: this.loader.resources['knight-legs-armor1-standing'].texture,
                }
            }
        }
    }


    initSpriteParts(): SpriteParts {
        const headOffsetX = 0;
        const headOffSetY = 0;
        const head = new Part(this.textures.head.default.standing, headOffsetX, headOffSetY, this);

        const bodyOffsetX = 0;
        const bodyOffsetY = head.sprite.height;
        const body = new Part(this.textures.body.default.standing, bodyOffsetX, bodyOffsetY, this);

        const legsOffsetX = 0;
        const legsOffsetY = body.sprite.height + head.sprite.height;
        const legs = new Part(this.textures.legs.default.standing, legsOffsetX, legsOffsetY, this);;


        return {
            head,
            body,
            legs
        };
    }

    // initSpriteParts(): SpritePart[] {
    //     // head

    //     const headSprite = new PIXI.Sprite(this.textures.head.default.standing);
    //     const headOffsetX = 0;
    //     const headOffSetY = 0;
    //     headSprite.x = this.x + headOffsetX;
    //     headSprite.y = this.y + headOffSetY;
 

    //     const headSpritePart = {
    //         offSetX: headOffsetX,
    //         offSetY: headOffSetY,
    //         sprite: headSprite,
    //     } as SpritePart


    //     const bodySprite = new PIXI.Sprite(this.textures.body.default.standing);
    //     const bodyOffsetX = 0;
    //     const bodyOffsetY = headSprite.height;
    //     bodySprite.x = this.x + bodyOffsetX;
    //     bodySprite.y = this.y + bodyOffsetY;
    //     const bodySpritePart = {
    //         offSetX: bodyOffsetX,
    //         offSetY: bodyOffsetY,
    //         sprite: bodySprite
    //     }

    //     const legsSprite = new PIXI.Sprite(this.textures.legs.default.standing);
    //     const legsOffsetX = 0;
    //     const legsOffsetY = bodySprite.height + headSprite.height;
    //     legsSprite.x = this.x + legsOffsetX;
    //     legsSprite.y = this.y + legsOffsetY;
    //     const legspritePart = {
    //         offSetX: legsOffsetX,
    //         offSetY: legsOffsetY,
    //         sprite: legsSprite
    //     }

    //     return [ headSpritePart, bodySpritePart, legspritePart ];
    // }

}