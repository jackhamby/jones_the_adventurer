import * as PIXI from 'pixi.js';
import { ScreenOptions } from '../types/enums';
import { Player } from '../classes/players/player';
import { Stage } from '../classes/stages/stage';

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
    spell1: boolean;
    spell2: boolean;
    spell3: boolean;
}

export interface StageBuilderKeyOptions {
    control: boolean;
    shift: boolean;
}

