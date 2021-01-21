import { ClickEventData, Viewport } from "pixi-viewport";
import { Tile } from "../../areas/stage_builder/stage_builder_wrapper";
import { Player } from "../players/player";
import { Stage } from "../stages/stage";
import * as PIXI from "pixi.js";
import { GRID_HEIGHT, GRID_WIDTH, STAGE_BUILDER_WORLD_HEIGHT, STAGE_BUILDER_WORLD_WIDTH } from "../../types/constants";
import { Knight } from "../players/knight";
import { UnitPartNames } from "../../types/enums";
import { keyboard } from "../../components/control";
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

    constructor(application: PIXI.Application){
        this.tiles = [];
        this.viewport = new Viewport();
        this.stage = new Stage(0, "", [], [], [], null, this.viewport, null);
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

    update = (delta) => {
        this.stage.update(keyboard);   
    }

    stopPlayTest = () => {
        this.pixiApplication.ticker.remove(this.update);
        this.viewport.plugins.remove("follow");
        this.player.hide();
        this.stage.enemies.forEach((enemy: Enemy) => {
            enemy.hide();
        });

        // this.stage.clear();
    

        // this.stage.load();
        
        // this.drawGrid();
        // this.drawSpawnIcon();
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
}