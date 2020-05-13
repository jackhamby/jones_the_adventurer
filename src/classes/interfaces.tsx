import { PlayerAttributeNames } from "../types/states";
import { UnitArmorNames, UnitPartNames, UnitAttributeNames } from "../types/enums";

export interface SpritePart {
    offSetX: number;
    offSetY: number;
    sprite: PIXI.Sprite;
}

export interface Effect {
    attribute: UnitAttributeNames;
    value: number;
    textureEffect?: {
        bodyPart: UnitPartNames;
        armorType: UnitArmorNames;
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