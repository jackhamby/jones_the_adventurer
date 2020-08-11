import * as PIXI from 'pixi.js';
import { ScreenOptions, Attributes, PlayerOptionNames } from '../types/enums';
// import { Stage } from '../classes/game_classes';
import { Platform } from '../classes/platform';
import { Player } from '../classes/players/player';
import { Stage } from '../classes/stages/stage';
// import { Enemy } from '../classes/enemy';
// import { UnitAttributes } from './types';

export interface AppState {
    controlState: ControlState;
    playerState: PlayerState;
    gameState: GameState;
}

export interface PlayerState {
    player: typeof Player;
}

export interface GameState {
    pixiApplication: PIXI.Application;
    textureLoaded: boolean;
    currentStage: Stage;
    gameReady: boolean;
}

export interface ControlState {
    currentScreen:  ScreenOptions;
    texturesLoaded: boolean;
    currentKeys: KeyOptions;
}




export interface IStage {
    name: string;
    level: number;
    // enemies: Enemy[];
    platforms: Platform[];
}

// export interface Character {
//     name: PlayerOptionNames;
//     attributes: UnitAttributes;
// }

export enum PlayerAttributeNames {
    HEALTH = "health",
    SPEED = "speed",
    ARMOR = "armor",
    ATTACK = "attack",
    JUMP = "jump",
    ATTACK_SPEED = "attack_speed"
}

export type PlayerAttributes = {
    [key in PlayerAttributeNames]: any;
}

export interface KeyOptions {
    attackRight: boolean;
    attackLeft: boolean;
    attackUp: boolean;
    attackDown: boolean;
    moveRight: boolean;
    moveLeft: boolean;
    moveUp: boolean;
    moveDown: boolean;
    jump: boolean;
}

