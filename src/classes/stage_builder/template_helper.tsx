
import { Viewport } from "pixi-viewport";
import { ENEMY_OPTIONS, PLATFORM_OPTIONS, TREASURE_ARMOR_OPTIONS } from "../../types/constants";
import { EnemyOptionNames, PlatformOptionNames, PlayerNames } from "../../types/enums";
import { ArmorTreasureTemplate, EnemyTemplate, PlatformTemplate, StageTemplate } from "../../types/interfaces";
import { Enemy } from "../enemies/enemy";
import { Man } from "../enemies/man";
import { Manticore } from "../enemies/manticore";
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from "../platform";
import { Knight } from "../players/knight";
import { Kobold } from "../players/kobold";
import { Orc } from "../players/orc";
import { Player } from "../players/player";
import { Stage } from "../stage/stage";
import { ArmorTreasure } from "../treasures/armor_treasure";
import { Treasure } from "../treasures/treasure";

export class TemplateHelper {

    template: StageTemplate;

    constructor(template?: StageTemplate){  
        this.template = template 
            ? template 
            : {
                platforms: [],
                enemies: [],
                armorTreasures: [],
            } as StageTemplate;
    }

    getPlatformType = (platform: Platform): PlatformOptionNames => {   
        if (platform instanceof DirtPlatform){
            return PlatformOptionNames.DIRT;
        }
        if (platform instanceof GrassPlatform){
            return PlatformOptionNames.GRASS;
        }
        if (platform instanceof SandRockPlatform){
            return PlatformOptionNames.SANDROCK;
        }
        if (platform instanceof RedGrassPlatform){
            return PlatformOptionNames.REDGRASS;
        }
        if (platform instanceof DefaultPlatform){
            return PlatformOptionNames.DEFAULT;
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

    getPlayerType = (player: Player) => {
        if (player instanceof Knight){
            return PlayerNames.KNIGHT;
        }
        if (player instanceof Kobold){
            return PlayerNames.KOBOLD;
        }
        if (player instanceof Orc){
            return PlayerNames.ORC;
        }
    }

    addPlatform = (platform: Platform) => {
        const platformTemplate: PlatformTemplate = {
            x: platform.x,
            y: platform.y,
            type: this.getPlatformType(platform)
        };
        this.template.platforms.push(platformTemplate);
    }

    addEnemy = (enemy: Enemy) => {
        const enemyTemplate: EnemyTemplate = {
            x: enemy.x,
            y: enemy.y,
            type: this.getEnemyType(enemy)
        }
        this.template.enemies.push(enemyTemplate);
    }

    addArmorTreasure = (treasure: ArmorTreasure) => {
        const armorTreasureTemplate: ArmorTreasureTemplate = {
            x: treasure.x,
            y: treasure.y,
            armorName: treasure.armor.type,
            part: treasure.armor.part,
        }
        this.template.armorTreasures.push(armorTreasureTemplate);
    }

    setSpawn = (x: number, y: number) => {
        this.template.spawnX = x;
        this.template.spawnY = y;
    }

    setName = (name: string) => {
        this.template.name = name;
    }

    setLevel = (level: number) => {
        this.template.level = level;
    }

    loadTemplate = (viewport: Viewport, loader: PIXI.Loader, player: Player, template?: StageTemplate): Stage => {
        const _template = template ? template : this.template;
        const stage =  new Stage(template.level, template.name , player, viewport, null, _template);

        // Load enemies
        _template.enemies?.forEach((enemyTemplate: EnemyTemplate) => {
            const enemyType = ENEMY_OPTIONS[enemyTemplate.type];
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
        _template.platforms?.forEach((platformTemplate: PlatformTemplate) => {
            const platformType = PLATFORM_OPTIONS[platformTemplate.type];
            const platform = new platformType(loader, stage, platformTemplate.x, platformTemplate.y, 25, 25);
            stage.platforms.push(platform);
        });


        const playerName: PlayerNames = this.getPlayerType(player);
        // Load armor treasures
        _template.armorTreasures?.forEach((armorTemplate: ArmorTreasureTemplate) => {
            const treasureType = TREASURE_ARMOR_OPTIONS[playerName][armorTemplate.part][armorTemplate.armorName];
            if (!treasureType){
                console.warn(`no ${armorTemplate.armorName} for ${playerName} ${armorTemplate.part}`);
                return;
            }
            const armorTreasure = new treasureType(loader, stage, armorTemplate.x, armorTemplate.y);
            stage.treasures.push(armorTreasure);
        })

        stage.spawnX = _template.spawnX;
        stage.spawnY = _template.spawnY;
        stage.name = _template.name;
        stage.level = _template.level;

        return stage;
    }

}
