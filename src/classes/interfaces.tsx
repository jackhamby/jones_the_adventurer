import { PlayerAttributeNames } from "../types/states";
import { PlayerPartNames, PlayerArmorNames } from "../types/enums";

export interface SpritePart {
    offSetX: number;
    offSetY: number;
    sprite: PIXI.Sprite;
    
}

export interface Effect {
    attribute: PlayerAttributeNames;
    value: number;
    textureEffect?: {
        bodyPart: PlayerPartNames;
        armorType: PlayerArmorNames;
    }
}

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