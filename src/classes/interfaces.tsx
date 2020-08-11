
import { PlayerAttributeNames } from "../types/states";
import { UnitArmorNames, UnitPartNames, UnitAttributeNames, ProjectileNames } from "../types/enums";
import { Projectile } from "./projectile";

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
    },
    goldEffect?: {
        amount: number;
    },
    projectileEffect?: {
        projectileType: typeof Projectile,
    }
}

export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
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