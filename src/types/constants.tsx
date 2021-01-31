import { Kobold } from "../classes/enemies/kobold";
import { Man } from "../classes/enemies/man";
import { Manticore } from "../classes/enemies/manticore";
import { DefaultPlatform, DirtPlatform, GrassPlatform, RedGrassPlatform, SandRockPlatform } from "../classes/platform";
import { KnightHeadArmor1Treasure } from "../classes/treasures/armor_treasure";
import { EnemyOptionTypes, PlatformOptionTypes, TreasureArmorOptionTypes, UnitAttributes } from "./types";

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

export const TREASURE_ARMOR_OPTIONS: TreasureArmorOptionTypes = {
    knightHeadArmor1: KnightHeadArmor1Treasure
}