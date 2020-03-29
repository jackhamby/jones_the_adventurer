import * as PIXI from "pixi.js";
import { PlayerAttributes } from "../types/states";
import { Stage } from "./game_classes";
import { Player } from "./player";
import { UnitParts, SpriteParts } from "../types/types";
import { Part } from "./part";


export class Knight extends Player {

    constructor(loader: PIXI.Loader, stage: Stage, initialAttributes: PlayerAttributes){
        super(loader, stage, initialAttributes);
        this.textures = this.initTexturesII();
        this.spriteParts = this.initSpriteParts();
        this.attributes = initialAttributes;
    }


    initTexturesII(): UnitParts {  
        return {
            body:{
                armor1: {
                    standing: this.loader.resources['knight-body-armor1-standing'].texture, // TODO update these to use corrct state
                    falling: this.loader.resources['knight-body-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-body-armor1-standing'].texture,
                    walking: this.loader.resources['knight-body-armor1-standing'].texture,
                    knockback: this.loader.resources['knight-body-armor1-standing'].texture
                },
                default: {
                    standing:this.loader.resources['knight-body-default-standing'].texture,
                    falling: this.loader.resources['knight-body-default-standing'].texture,
                    jumping: this.loader.resources['knight-body-default-standing'].texture,
                    walking: this.loader.resources['knight-body-default-standing'].texture,
                    knockback: this.loader.resources['knight-body-default-standing'].texture
                }
            },
            head: {
                default: {
                    standing: this.loader.resources['knight-head-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-head-default-standing'].texture,
                    jumping: this.loader.resources['knight-head-default-standing'].texture,
                    walking: this.loader.resources['knight-head-default-standing'].texture,
                    knockback: this.loader.resources['knight-head-default-standing'].texture

                },
                armor1: {
                    standing: this.loader.resources['knight-head-armor1-standing'].texture,
                    falling: this.loader.resources['knight-head-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-head-armor1-standing'].texture,
                    walking: this.loader.resources['knight-head-armor1-standing'].texture,
                    knockback: this.loader.resources['knight-head-armor1-standing'].texture

                }
            },
            legs: {
                default: {
                    standing: this.loader.resources['knight-legs-default-standing'].texture, // TODO update to use correct state
                    falling: this.loader.resources['knight-legs-default-standing'].texture,
                    jumping: this.loader.resources['knight-legs-default-standing'].texture,
                    walking: this.loader.resources['knight-legs-default-standing'].texture,
                    knockback: this.loader.resources['knight-legs-default-standing'].texture
                },
                armor1: {
                    standing: this.loader.resources['knight-legs-armor1-standing'].texture,
                    falling: this.loader.resources['knight-legs-armor1-standing'].texture,
                    jumping: this.loader.resources['knight-legs-armor1-standing'].texture,
                    walking: this.loader.resources['knight-legs-armor1-standing'].texture,
                    knockback: this.loader.resources['knight-legs-armor1-standing'].texture
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

}