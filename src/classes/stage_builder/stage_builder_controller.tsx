import { Viewport } from "pixi-viewport";
import { Tile } from "../../areas/stage_builder/stage_builder_wrapper";
import { Player } from "../players/player";
import { Stage } from "../stages/stage";
import * as PIXI from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH, STAGE_BUILDER_WORLD_HEIGHT, STAGE_BUILDER_WORLD_WIDTH } from "../../types/constants";
import { Knight } from "../players/knight";
import { UnitPartNames } from "../../types/enums";
import { keyboard } from "../../components/control";
import { StageTemplate } from "./stage_template";
import { TemplateHelper } from "./template_helper";
import { Platform } from "../platform";
import { Enemy } from "../enemies/enemy";

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

    isSelectingSpawn: boolean;

    templateHelper: TemplateHelper;

    constructor(application: PIXI.Application){
        this.tiles = [];
        this.viewport = new Viewport();
        this.stage = new Stage(0, "", [], [], [], null, this.viewport, null);
        this.templateHelper = new TemplateHelper();

        // Create spawn/grid graphics
        this.spawnGraphics = new PIXI.Graphics();
        this.gridGraphics = new PIXI.Graphics();
        this.gridGraphics.zIndex = 1;

        // Setup default spawn
        this.stage.spawnX = STAGE_BUILDER_WORLD_WIDTH / 2;
        this.stage.spawnY = STAGE_BUILDER_WORLD_HEIGHT / 2;

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
    }

    setSpawn = (x: number, y: number) => {
        this.stage.spawnX = x;
        this.stage.spawnY = y;
    }

    playTest = () => {
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
        this.viewport.follow(this.player.spriteParts[UnitPartNames.HEAD].sprite);

        this.stage.player.currentStage = this.stage;
        this.stage.load();
        this.pixiApplication.ticker.add(this.update);
    }

    stopPlayTest = () => {
        this.pixiApplication.ticker.remove(this.update);
        this.stage.reset();
        this.viewport.plugins.remove("follow");
        this.player.hide();
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

        this.viewport.addChild(this.gridGraphics);
    }

    addPlatform = (x: number, y: number, platformType: typeof Platform) => {
        this.lastClickedX = x;
        this.lastClickedY = y;
    
        const xTileIndex = Math.floor(x / GRID_WIDTH)
        const yTileIndex = Math.floor(y / GRID_HEIGHT);
        const tile = this.tiles[yTileIndex][xTileIndex];
        if (tile.occupiedWith){
            console.log('occupied, skipping');
            return;
        }
        const platform = new platformType(this.pixiApplication.loader, this.stage, tile.x, tile.y, 15, 15);
        console.log(platform);
        console.log(platformType)
        tile.occupiedWith = platform;

        platform.add();
        this.stage.platforms.push(platform);
        this.templateHelper.addPlatform(platform);
    }

    addEnemy = (x: number, y: number, enemyType: typeof Enemy) => {
        this.lastClickedX = x;
        this.lastClickedY = y;
    
        const xTileIndex = Math.floor(x / GRID_WIDTH)
        const yTileIndex = Math.floor(y / GRID_HEIGHT);
        const tile = this.tiles[yTileIndex][xTileIndex];
        if (tile.occupiedWith){
            console.log('occupied, skipping');
            return;
        }
        
        const enemyX = tile.x - enemyType.width / 2;
        const enemyY = tile.y - enemyType.height / 2;

        const enemy = new enemyType(this.pixiApplication.loader, this.stage, enemyType.baseAttributes, enemyType.width, enemyType.height, enemyX, enemyY);

        tile.occupiedWith = enemy;

        enemy.add();
        this.stage.enemies.push(enemy);
    }

}