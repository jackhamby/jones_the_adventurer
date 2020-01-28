import * as PIXI from 'pixi.js';
import { ScreenOptions, CharacterOptions, Attributes } from '../types/enums';
import { Stage } from '../classes/game_classes';
import { Player } from '../classes/player';
import { Platform } from '../classes/platform';
import { Enemy } from '../classes/enemy';

export interface AppState {
    controlState: ControlState;
    playerState: PlayerState;
    gameState: GameState;
}




export interface PlayerState {
    character: Character;
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






export interface SpriteTextures {
    standingRight: PIXI.Texture;
    standingLeft: PIXI.Texture;
    walkingRight: PIXI.Texture;
    walkingLeft: PIXI.Texture;
    jumpingLeft: PIXI.Texture;
    jumpingRight: PIXI.Texture;
    fallingRight: PIXI.Texture;
    fallingLeft: PIXI.Texture;
}

export interface IStage {
    name: string;
    level: number;
    enemies: Enemy[];
    platforms: Platform[];
    player: Player;
}

export interface Character {
    name: CharacterOptions;
    attributes: CharacterAttributes;
}

export interface CharacterAttributes {
    health: number;
    speed: number;
}

export interface KeyOptions {
    attackRight: boolean;
    attackLeft: boolean;
    attackUp: boolean;
    attackDowh: boolean;
    moveRight: boolean;
    moveLeft: boolean;
    moveUp: boolean;
    moveDown: boolean;
    jump: boolean;
}

