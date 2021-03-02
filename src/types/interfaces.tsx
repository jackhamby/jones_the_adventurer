import { Player } from "../classes/players/player";
import { Stage } from "../classes/stage/stage";
import { EnemyOptionNames, PlatformOptionNames, UnitArmorNames, UnitPartNames } from "./enums";

export interface EnemyTemplate {
    type: EnemyOptionNames;
    x: number;
    y: number;
}

export interface PlatformTemplate {
    type: PlatformOptionNames;
    x: number;
    y: number;
}

export interface StageTemplate {
    spawnX: number;
    spawnY: number;
    level: number;
    name: string;
    enemies: EnemyTemplate[];
    platforms: PlatformTemplate[];
    armorTreasures: ArmorTreasureTemplate[];
}

export interface ArmorTreasureTemplate {
    x: number;
    y: number;
    part: UnitPartNames;
    armorName: UnitArmorNames;
}

export interface SpritePart {
    offSetX: number;
    offSetY: number;
    sprite: PIXI.Sprite;
}

export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
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
    texturesLoaded: boolean;
    currentKeys: KeyOptions;
}
