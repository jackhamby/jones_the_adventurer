import * as React from 'react';
import * as PIXI from 'pixi.js';
import { createRef } from 'react';
import { DirtPlatform } from '../../classes/platform';
import { Stage } from '../../classes/stages/stage';
import { loadTextures } from '../../helpers/util';
import { ClickEventData, Viewport } from 'pixi-viewport';
import { BuilderMenu } from './builder_menu';

const width = 800;
const height = 800;

const gridWidth = 15;
const gridHeight = 15;

const worldHeight = 10000;
const worldWidth = 10000;

export class Tile {
    x: number;
    y: number;
    width: number;
    height: number;
    
    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class StageBuilderWrapper extends React.Component {

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
    private stage = new Stage(0, "", [], [], [], null, null, null);

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.pixiApplication.view);
        this.viewport.sortableChildren = true;

        this.viewport.drag();
        this.viewport.pinch();

        this.viewport.on("clicked", (data: ClickEventData) => {
            const xTileIndex = Math.floor(data.world.x / gridWidth)
            const yTileIndex = Math.floor(data.world.y / gridHeight);
            const tile = this.tiles[yTileIndex][xTileIndex];
            this.viewport.addChild(new DirtPlatform(this.pixiApplication.loader, this.stage, tile.x, tile.y, 15, 15).pixiSprite);
        });

        this.pixiApplication.stage.addChild(this.viewport);
        this.viewport.moveCenter(worldWidth / 2, worldHeight / 2);
        // this.viewport.zoom(-500)

        loadTextures(this.pixiApplication, this.onLoad);   

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
        this.viewport.addChild(new DirtPlatform(this.pixiApplication.loader, this.stage, 500, 500, 15, 15).pixiSprite);
        this.drawGrid();
    }

    render(){
        return (
            <div className="row">
                <div className="col-7 pl-2" ref={this.canvasRef}>

                </div>
                <div className="col-5">
                    <BuilderMenu/>
                </div>
            </div>
        )
    }
}