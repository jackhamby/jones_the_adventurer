import { Enemy } from "../enemies/enemy";
import { Kobold } from "../enemies/kobold";
import { Platform } from "../platform";

// Enemy
// export enum EnemyOptionNames {
//     KOBOLD = "kobold"
// }

// export type EnemyTypes = {
//     [key in EnemyOptionNames]: typeof Enemy
// }

// export const EnemyOptions: EnemyTypes = {
//     kobold: Kobold,
// }

export interface EnemyTemplate {
    type: string;
    x: number;
    y: number;
}

// Platform
// export enum PlatformOptionNames {
//     DIRT = "dirt"
// }

// export type PlatformTypes = {
//     [key in PlatformOptionNames]: typeof Platform
// }

export interface PlatformTemplate {
    type: string;
    x: number;
    y: number;
}


export interface StageTemplate {
    enemies: EnemyTemplate[];
    platforms: PlatformTemplate[];
}