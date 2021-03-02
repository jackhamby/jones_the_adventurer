import { Viewport } from "pixi-viewport";
import { Tile } from "../../areas/stage_builder/stage_builder_wrapper";
import { Player } from "../players/player";
import { Stage } from "../stage/stage";
import * as PIXI from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH, STAGE_BUILDER_WORLD_HEIGHT, STAGE_BUILDER_WORLD_WIDTH } from "../../types/constants";
import { Knight } from "../players/knight";
import { UnitPartNames } from "../../types/enums";
import { keyboard } from "../../components/control";
import { TemplateHelper } from "./template_helper";
import { Platform } from "../platform";
import { Enemy } from "../enemies/enemy";
import { Treasure } from "../treasures/treasure";
import { Sprite } from "../sprite";
import { ArmorTreasure } from "../treasures/armor_treasure";
import { getStages } from "../../api/stages";

export class StageBuilderController {

    tiles: Tile[][];
    stage: Stage;
    player: Player;
    pixiApplication: PIXI.Application;
    viewport: Viewport;

    lastClickedX: number;
    lastClickedY: number;

    spawnGraphics: PIXI.Graphics;
    gridGraphics: PIXI.Graphics;
    highlightGraphics: PIXI.Graphics;

    isSelectingSpawn: boolean;

    templateHelper: TemplateHelper;

    constructor(application: PIXI.Application){
        this.tiles = [];
        this.viewport = new Viewport();
        this.templateHelper = new TemplateHelper();
        this.stage = new Stage(0, "", null, this.viewport, null, this.templateHelper.template);

        // Create spawn/grid graphics
        this.spawnGraphics = new PIXI.Graphics();
        this.gridGraphics = new PIXI.Graphics();
        this.highlightGraphics = new PIXI.Graphics();
        this.highlightGraphics.zIndex = 2;
        this.gridGraphics.zIndex = 1;

        // Setup default spawn
        this.stage.spawnX = STAGE_BUILDER_WORLD_WIDTH / 2;
        this.stage.spawnY = STAGE_BUILDER_WORLD_HEIGHT / 2;
        this.templateHelper.setSpawn(this.stage.spawnX, this.stage.spawnY);

        // Setup viewport
        this.viewport.sortableChildren = true;
        this.viewport.drag();
        this.viewport.pinch();
        this.viewport.moveCenter(STAGE_BUILDER_WORLD_WIDTH / 2, STAGE_BUILDER_WORLD_HEIGHT / 2);

        // Setup applicaiton
        this.pixiApplication = application;
        this.pixiApplication.stage.addChild(this.viewport);

        // draw grid and spawn
        this.drawGrid();
        this.drawSpawnIcon();
        this.viewport.addChild(this.spawnGraphics);
        this.viewport.addChild(this.gridGraphics);
        this.viewport.addChild(this.highlightGraphics);

        getStages();
    }

    setSpawn = (x: number, y: number) => {
        this.stage.spawnX = x;
        this.stage.spawnY = y;
        this.templateHelper.setSpawn(x, y);
    }

    setName = (name: string) => {
        this.stage.name = name;
        this.templateHelper.setName(name);
    }

    setLevel = (level: number) => {
        this.stage.level = level;
        this.templateHelper.setLevel(level);
    }

    playTest = () => {
        // Create player to test with
        this.player = new Knight(
            this.pixiApplication.loader,
            this.stage,
            Knight.baseAttributes,
            Knight.width,
            Knight.height,
            this.stage.spawnX,
            this.stage.spawnY
        );
        this.stage.player = this.player;

        // Follow player
        this.viewport.follow(this.player.spriteParts[UnitPartNames.HEAD].sprite);

        // Add player and start game loop
        this.player.add();
        this.pixiApplication.ticker.add(this.update);
    }

    stopPlayTest = () => {
        // Stop game loop
        this.pixiApplication.ticker.remove(this.update);

        // Clear and rebuild stage based on stage template
        this.stage.clear();
        this.stage = this.templateHelper.loadTemplate(
            this.viewport,
            this.pixiApplication.loader,
            this.player,
            this.stage.template);

        // Load stage
        this.stage.load();

        // Remove the player and stop following
        this.player.remove();
        this.viewport.plugins.remove("follow");

        // Add grid and spawn point back in
        this.viewport.addChild(this.spawnGraphics);
        this.viewport.addChild(this.gridGraphics);

        // Center camera
        this.viewport.moveCenter(this.stage.spawnX, this.stage.spawnY);
    }

    update = (delta) => {
        this.stage.update(keyboard);   
    }

    drawSpawnIcon = () => {
        this.spawnGraphics.clear();
        this.spawnGraphics.beginFill(0xFF0000);
        this.spawnGraphics.drawCircle(this.stage.spawnX, this.stage.spawnY, 5);
    }

    drawHighlight = (sprite: Sprite) => {
        this.highlightGraphics.clear();
        const margin = 2;

        this.highlightGraphics.lineStyle(2, 0xFFFF00)
            .moveTo(sprite.x, sprite.y + margin)
            // .moveTo(0, 0)
            .lineTo(sprite.x + sprite.width, sprite.y + margin)
            .lineTo(sprite.x + sprite.width, sprite.y + sprite.height)
            .lineTo(sprite.x, sprite.y + sprite.height)
            .lineTo(sprite.x, sprite.y);
    }

    drawGrid = () => {
        this.gridGraphics.position.set(0, 0);

        for(let i = 0; i < STAGE_BUILDER_WORLD_HEIGHT; i += GRID_HEIGHT){
            const row = [];
            for(let k = 0; k < STAGE_BUILDER_WORLD_WIDTH; k += GRID_HEIGHT){
                row.push(new Tile(k, i, GRID_WIDTH, GRID_HEIGHT));
            }
            this.tiles.push(row);
        }

        this.gridGraphics.position.set(0, 0);
        for (let y = 0; y < STAGE_BUILDER_WORLD_HEIGHT; y += GRID_HEIGHT){
            this.gridGraphics.lineStyle(1, 0xffffff)
                .moveTo(0, y)
                .lineTo(STAGE_BUILDER_WORLD_WIDTH, y);
        }
        for (let x = 0; x < STAGE_BUILDER_WORLD_WIDTH; x += GRID_WIDTH){
            this.gridGraphics.lineStyle(1, 0xffffff)
                .moveTo(x, 0)
                .lineTo(x, STAGE_BUILDER_WORLD_HEIGHT);
        }
    }

    addPlatform = (x: number, y: number, platformType: typeof Platform) => {
        this.lastClickedX = x;
        this.lastClickedY = y;
    
        const xTileIndex = Math.floor(x / GRID_WIDTH)
        const yTileIndex = Math.floor(y / GRID_HEIGHT);
        const tile = this.tiles[yTileIndex][xTileIndex];
        if (tile.occupiedWith){
            this.drawHighlight(tile.occupiedWith);
            return;
        }
        const platform = new platformType(this.pixiApplication.loader, this.stage, tile.x, tile.y, 25, 25);
        tile.occupiedWith = platform;

        platform.add();
        this.stage.platforms.push(platform);
        this.templateHelper.addPlatform(platform);
    }

    addTreasure = (x: number, y: number, treasureType: typeof ArmorTreasure) => {
        this.lastClickedX = x;
        this.lastClickedY = y;
        // console.log(`add treasure at ${x}, ${y}`);
    
        const xTileIndex = Math.floor(x / GRID_WIDTH)
        const yTileIndex = Math.floor(y / GRID_HEIGHT);
        const tile = this.tiles[yTileIndex][xTileIndex];
        if (tile.occupiedWith){
            this.drawHighlight(tile.occupiedWith);

            return;
        }
        const treasure = new treasureType(this.pixiApplication.loader, this.stage, tile.x, tile.y);
        tile.occupiedWith = treasure;

        treasure.add();
        this.stage.treasures.push(treasure);
        this.templateHelper.addArmorTreasure(treasure);
    }

    addEnemy = (x: number, y: number, enemyType: typeof Enemy) => {
        this.lastClickedX = x;
        this.lastClickedY = y;
    
        const xTileIndex = Math.floor(x / GRID_WIDTH)
        const yTileIndex = Math.floor(y / GRID_HEIGHT);
        const tile = this.tiles[yTileIndex][xTileIndex];
        if (tile.occupiedWith){
            this.drawHighlight(tile.occupiedWith);
            return;
        }
        
        const enemyX = tile.x - enemyType.width / 2;
        const enemyY = tile.y - enemyType.height / 2;

        const enemy = new enemyType(this.pixiApplication.loader, this.stage, enemyType.baseAttributes, enemyType.width, enemyType.height, enemyX, enemyY);

        tile.occupiedWith = enemy;

        enemy.add();
        this.stage.enemies.push(enemy);
        this.templateHelper.addEnemy(enemy);
    }

}