import { Kobold } from "../enemies/kobold";

export enum EnemyTypes {
    KOBOLD = "kobold"
}
export interface EnemyTemplate {
}

export interface PlatformTemplate {

}

export interface StageTemplate {
    enemies: EnemyTemplate[];
    platforms: PlatformTemplate[];
}