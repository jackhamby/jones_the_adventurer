
import { Viewport } from "pixi-viewport";
import { Enemy } from "../enemies/enemy";
import { Kobold } from "../enemies/kobold";
import { Man } from "../enemies/man";
import { Manticore } from "../enemies/manticore";
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from "../platform";
import { Player } from "../players/player";
import { Stage } from "../stages/stage";

// Enemy
export enum EnemyOptionNames {
    KOBOLD = "kobold",
    MAN = "man",
    MANTICORE = "manticore"
}

export type EnemyTypes = {
    [key in EnemyOptionNames]: typeof Enemy
}

export const EnemyOptions: EnemyTypes = {
    kobold: Kobold,
    man: Man,
    manticore: Manticore,
}

export interface EnemyTemplate {
    type: EnemyOptionNames;
    x: number;
    y: number;
}

// Platforms
export enum PlatformOptionNames {
    DEFAULT = "default",
    DIRT = "dirt",
    GRASS = "grass",
    SANDROCK = "sandrock",
    REDGRASS = "redgrass"
}

export type PlatformTypes = {
    [key in PlatformOptionNames]: typeof Platform
}

export const PlatformOptions: PlatformTypes = {
    default: DefaultPlatform,
    dirt: DirtPlatform,
    grass: GrassPlatform,
    sandrock: SandRockPlatform,
    redgrass: RedGrassPlatform,
}

export interface PlatformTemplate {
    type: PlatformOptionNames;
    x: number;
    y: number;
}

export interface StageTemplate {
    spawnX: number;
    spawnY: number;
    enemies: EnemyTemplate[];
    platforms: PlatformTemplate[];
}





export class TemplateHelper {

    template: StageTemplate;

    constructor(template?: StageTemplate){  
        this.template = template 
            ? template 
            : {
                platforms: [],
                enemies: []
            } as StageTemplate;
    }

    getPlatformType = (platform: Platform) => {   
        if (platform instanceof DirtPlatform){
            return PlatformOptionNames.DIRT;
        }
        if (platform instanceof GrassPlatform){
            return PlatformOptionNames.GRASS
        }
        if (platform instanceof SandRockPlatform){
            return PlatformOptionNames.SANDROCK
        }
        if (platform instanceof RedGrassPlatform){
            return PlatformOptionNames.REDGRASS;
        }
        if (platform instanceof DefaultPlatform){
            return PlatformOptionNames.DEFAULT
        }

        return PlatformOptionNames.DEFAULT;
    }

    getEnemyType = (enemy: Enemy) => {
        if (enemy instanceof Kobold){
            return EnemyOptionNames.KOBOLD;
        }
        if (enemy instanceof Man){
            return EnemyOptionNames.MAN
        }
        if (enemy instanceof Manticore){
            return EnemyOptionNames.MANTICORE
        }

        return EnemyOptionNames.KOBOLD;
    }

    addPlatform = (platform: Platform) => {
        const platformTemplate: PlatformTemplate = {
            x: platform.x,
            y: platform.y,
            type: this.getPlatformType(platform)
        };
        this.template.platforms.push(platformTemplate);
        console.log(this.template);
    }

    addEnemy = (enemy: Enemy) => {
        const enemyTemplate: EnemyTemplate = {
            x: enemy.x,
            y: enemy.y,
            type: this.getEnemyType(enemy)
        }
        this.template.enemies.push(enemyTemplate);
        console.log(this.template);
    }

    setSpawn = (x: number, y: number) => {
        this.template.spawnX = x;
        this.template.spawnY = y;
    }

    loadTemplate = (viewport: Viewport, loader: PIXI.Loader, player: Player, template?: StageTemplate): Stage => {
        const stage =  new Stage(0, "", player, viewport, null);
        const _template = template ? template : this.template;

        // Load enemies
        _template.enemies.forEach((enemyTemplate: EnemyTemplate) => {
            const enemyType = EnemyOptions[enemyTemplate.type];
            const enemy = new enemyType(
                loader, 
                stage, 
                enemyType.baseAttributes, 
                enemyType.width, 
                enemyType.height,
                enemyTemplate.x,
                enemyTemplate.y);
            stage.enemies.push(enemy);
        });

        // Load platforms
        _template.platforms.forEach((platformTemplate: PlatformTemplate) => {
            const platformType = PlatformOptions[platformTemplate.type];
            const platform = new platformType(loader, stage, platformTemplate.x, platformTemplate.y, 25, 25);
            stage.platforms.push(platform);
        });

        stage.spawnX = _template.spawnX;
        stage.spawnY = _template.spawnY;

        return stage;
    }

}
