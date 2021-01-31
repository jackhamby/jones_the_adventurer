import { UnitStateNames, UnitArmorNames, UnitPartNames, UnitStatisticNames, UnitAttributeNames, ProjectileAttributeNames, ProjectileNames, PlatformOptionNames, EnemyOptionNames, TreasureArmorOptionNames, PlayerAttributeNames } from "./enums";
import { Part } from "../classes/part";
import { Projectile } from "../classes/projectiles/projectile";

import { Armor } from "../classes/armor"
import { Platform } from "../classes/platform";
import { Enemy } from "../classes/enemies/enemy";
import { ArmorTreasure } from "../classes/treasures/armor_treasure";

export type PlayerAttributes = {
    [key in PlayerAttributeNames]: any;
}

export type UnitStates = {
    [key in UnitStateNames]: any;
}

export type UnitArmors = {
    [key in UnitArmorNames]: any;
}

export type UnitParts = {
    [key in UnitPartNames]: UnitArmors;
}

export type UnitSpriteParts = {
    [key in UnitPartNames] : PIXI.Sprite;
}

export type SpriteArmors = {
    [key in UnitPartNames] : Armor | null;
}

export type SpriteParts = {
    [key in UnitPartNames]: Part;
}

export type UnitStatistics = {
    [key in UnitStatisticNames]: any;
}

export type UnitAttributes = {
    [key in UnitAttributeNames]: any;
}

export type ProjectileAttributes = {
    [key in ProjectileAttributeNames]: any;
}

export type ProjectileTypes = {
    [key in ProjectileNames] : Projectile;
}

export type PlatformOptionTypes = {
    [key in PlatformOptionNames] : typeof Platform; 
}

export type EnemyOptionTypes = {
    [key in EnemyOptionNames] : typeof Enemy; 
}

export type TreasureArmorOptionTypes = {
    [key in TreasureArmorOptionNames] : typeof ArmorTreasure; 
}   

