import { Kobold } from "../classes/enemies/kobold";
import { Man } from "../classes/enemies/man";
import { Manticore } from "../classes/enemies/manticore";
import { DefaultPlatform, DirtPlatform, GrassPlatform, RedGrassPlatform, SandRockPlatform } from "../classes/platform";
import { KnightBodyArmor1Treasure, KnightBodyArmor2Treasure, KnightBodyArmor3Treasure, KnightHeadArmor1Treasure, KnightHeadArmor2Treasure, KnightHeadArmor3Treasure, KnightLegsArmor1Treasure, KnightLegsArmor2Treasure, KnightLegsArmor3Treasure, KoboldBodyArmor1Treasure, KoboldBodyArmor2Treasure, KoboldHeadArmor1Treasure, KoboldHeadArmor2Treasure, KoboldHeadArmor3Treasure, KoboldLegsArmor1Treasure, OrcBodyArmor1Treasure, OrcHeadArmor1Treasure, OrcHeadArmor2Treasure, OrcLegsArmor1Treasure } from "../classes/treasures/armor_treasure";
import { ArmorTreasures, EnemyOptionTypes, PlatformOptionTypes, PlayerArmorTreasures, UnitAttributes } from "./types";

export const SCREEN_HEIGHT = window.screen.width * .4;
export const SCREEN_WIDTH = window.screen.height;

export const PLAYER_STARTING_X = 120;
export const PLAYER_STARTING_Y = 120;

export const GRID_WIDTH = 25;
export const GRID_HEIGHT = 25;

export const STAGE_BUILDER_WORLD_HEIGHT = 10000;
export const STAGE_BUILDER_WORLD_WIDTH = 10000;

export const SPRITE_DECAY = 1000;
export const SPRITE_DECAY_FADE_TIME =  150;

export const TEXT_FADE_TIME = 100;

export const MAX_ATTRIBUTES = {
    HEALTH: 140,
    SPEED: 15,
    ARMOR: 10,
    ATTACK: 20,
    ATTACK_SPEED: 150,
    JUMP_HEIGHT: 50,
    JUMP_COUNT: 6,
} as UnitAttributes;

export const PLATFORM_OPTIONS: PlatformOptionTypes = {
    default: DefaultPlatform,
    dirt: DirtPlatform,
    grass: GrassPlatform,
    redgrass: RedGrassPlatform,
    sandrock: SandRockPlatform,
}

export const ENEMY_OPTIONS: EnemyOptionTypes = {
    man: Man,
    kobold: Kobold,
    manticore: Manticore,
}

export const TREASURE_ARMOR_OPTIONS: PlayerArmorTreasures = {
    knight: {
        head: {
            armor1: KnightHeadArmor1Treasure,
            armor2: KnightHeadArmor2Treasure,
            armor3: KnightHeadArmor3Treasure,
        } as ArmorTreasures,
        body: {
            armor1: KnightBodyArmor1Treasure,
            armor2: KnightBodyArmor2Treasure,
            armor3: KnightBodyArmor3Treasure,
        } as ArmorTreasures,
        legs: {
            armor1: KnightLegsArmor1Treasure,
            armor2: KnightLegsArmor2Treasure,
            armor3: KnightLegsArmor3Treasure,
        } as ArmorTreasures
    },
    kobold: {
        head: {
            armor1: KoboldHeadArmor1Treasure,
            armor2: KoboldHeadArmor2Treasure,
            armor3: KoboldHeadArmor3Treasure,
        } as ArmorTreasures,
        body: {
            armor1: KoboldBodyArmor1Treasure,
            armor2: KoboldBodyArmor2Treasure,
            armor3: null,
        } as ArmorTreasures,
        legs: {
            armor1: KoboldLegsArmor1Treasure,
            armor2: null,
            armor3: null,
        } as ArmorTreasures
    },
    orc: {
        head: {
            armor1: OrcHeadArmor1Treasure,
            armor2: OrcHeadArmor2Treasure,
            armor3: null,
        } as ArmorTreasures,
        body: {
            armor1: OrcBodyArmor1Treasure,
            armor2: null,
            armor3: null,
        } as ArmorTreasures,
        legs: {
            armor1: OrcLegsArmor1Treasure,
            armor2: null,
            armor3: null,
        } as ArmorTreasures
    }
}