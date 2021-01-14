import * as React from 'react';
import * as PIXI from 'pixi.js';
import { createRef } from 'react';
import { DirtPlatform } from '../../classes/platform';
import { Stage } from '../../classes/stages/stage';
import { getCanvasDimensions, loadTextures, mapStageBuilderKeys } from '../../helpers/util';
import { ClickEventData, Viewport } from 'pixi-viewport';
import { BuilderMenu } from './builder_menu';
import { KeyOptions, StageBuilderKeyOptions } from '../../types/states';
import { Sprite } from '../../classes/sprite';

const width = 800;
const height = 800;

const gridWidth = 15;
const gridHeight = 15;

const worldHeight = 10000;
const worldWidth = 10000;


export const stageBuilderKeyboard = {

} as StageBuilderKeyOptions;


export interface GameBuilderContext {
    loader: PIXI.Loader;
    stage: Stage;
    lastClickedX: number;
    lastClickedY: number;
}

export const gameBuilderContext: GameBuilderContext  = {
    loader: null,
    stage: null,
    lastClickedX: 0,
    lastClickedY: 0,
}

export class Tile {
    x: number;
    y: number;
    width: number;
    height: number;
    occupiedWith: Sprite;
    
    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}


export interface StageBuilderWrapperState {
    addCallback: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite
}

export class StageBuilderWrapper extends React.Component<{}, StageBuilderWrapperState> {

    private canvasRef = createRef<HTMLDivElement>();
    private pixiApplication = new PIXI.Application({ 
        width: width,
        height: height,               
        antialias: true, 
        transparent: false, 
        resolution: 1
    });
    private tiles: Tile[][] = [];
    private viewport = new Viewport();
    private stage = new Stage(0, "", [], [], [], null, this.viewport, null);
    

    constructor(props){
        super(props);
        this.state = {
            addCallback: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => {
                const platform = new DirtPlatform(loader, stage, x, y, 15, 15);
                viewport.addChild(platform.pixiSprite);
                return platform;
            }
        }
    }

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.pixiApplication.view);

        canvasHtmlElement?.appendChild(this.pixiApplication.view);
        const containerHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight : 1;
        const containerWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth : 1;
        this.pixiApplication.renderer.resize(containerWidth, containerHeight);  
        this.viewport.sortableChildren = true;

        this.viewport.drag();
        this.viewport.pinch();



        // this.viewport.on("clicked", (data: ClickEventData) => {
        //     gameBuilderContext.lastClickedX = data.world.x;
        //     gameBuilderContext.lastClickedY = data.world.y;
        //     if (stageBuilderKeyboard.shift){
        //         // TODO delete
        //         return;
        //     }
        //     const xTileIndex = Math.floor(data.world.x / gridWidth)
        //     const yTileIndex = Math.floor(data.world.y / gridHeight);
        //     const tile = this.tiles[yTileIndex][xTileIndex];
        //     if (tile.occupiedWith){
        //         console.log('occupied, skipping')
        //         return;
        //     }
        //     const spriteAdded = this.addToStage(tile.x, tile.y);
        //     tile.occupiedWith = spriteAdded;
        // });


        this.pixiApplication.stage.addChild(this.viewport);
        this.viewport.moveCenter(worldWidth / 2, worldHeight / 2);
        // this.viewport.zoom(-500)
        loadTextures(this.pixiApplication, this.onLoad); 
        gameBuilderContext.stage = this.stage;
        gameBuilderContext.loader = this.pixiApplication.loader;  
        this.handleResizeEvents();
        this.handleKeyEvents();
    }


    handleResizeEvents = () => {
        window.addEventListener('resize', (event) => {
            const canvasDimensions = getCanvasDimensions();
            this.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height);
        });
    }

    addToStage = (x: number, y: number): Sprite => {
        return this.state.addCallback(this.pixiApplication.loader, this.stage, this.viewport, x, y);
    }

    handleKeyEvents = () => {
        document.addEventListener("keydown", (event: any) => {
            if (event.repeat){
                return
            }
            mapStageBuilderKeys(event.key, stageBuilderKeyboard, true)
        } )
        document.addEventListener("keyup", (event: any) => {
            mapStageBuilderKeys(event.key, stageBuilderKeyboard, false)
        } )
    }

    setAddCallback = (callback: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => {
        this.setState({ addCallback: callback });
    }

    drawGrid = () => {
        const graphics = new PIXI.Graphics();
        graphics.position.set(0, 0);

        for(let i = 0; i < worldHeight; i += gridHeight){
            const row = [];
            for(let k = 0; k < worldWidth; k += gridWidth){
                row.push(new Tile(k, i, gridWidth, gridHeight));
            }
            this.tiles.push(row);
        }

        graphics.position.set(0, 0);
        for (let y = 0; y < worldHeight; y += gridHeight){
            graphics.lineStyle(1, 0xffffff)
                .moveTo(0, y)
                .lineTo(worldWidth, y);
        }
        for (let x = 0; x < worldWidth; x += gridWidth){
            graphics.lineStyle(1, 0xffffff)
                .moveTo(x, 0)
                .lineTo(x, worldHeight);
        }

        this.viewport.addChild(graphics);
    }

    onLoad = () => {
        // this.viewport.addChild(new DirtPlatform(this.pixiApplication.loader, this.stage, 500, 500, 15, 15).pixiSprite);
        this.drawGrid();
    }

    render(){
        return (
            <div className="row">
                <div className="col-7 pl-2" ref={this.canvasRef} id="canvas-container">

                </div>
                <div className="col-5">
                    {/* <BuilderMenu setAddCallback={this.setAddCallback}/> */}
                    <BuilderMenu />
                </div>
            </div>
        )
    }
}