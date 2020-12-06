import * as React from 'react';
import * as PIXI from 'pixi.js';
import { createRef } from 'react';
import { DirtPlatform } from '../../classes/platform';
import { Stage } from '../../classes/stages/stage';
import { loadTextures } from '../../helpers/util';
import { ClickEventData, Viewport } from 'pixi-viewport';


const width = 1000;
const height = 1000;

const markerWidth = 20;
const markerHeight = 20;

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
    private viewport = new Viewport({
        // screenWidth: worldWidth,
        // screenHeight: worldHeight,
        // worldHeight,
        // worldWidth,
    });
    private stage = new Stage(0, "", [], [], [], null, null, null);

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.pixiApplication.view);
        this.viewport.sortableChildren = true;

        this.viewport.drag();
        this.viewport.pinch();

        this.viewport.on("clicked", (data: ClickEventData) => {
            // console.log(data);
            const xTileIndex = Math.floor(data.world.x / gridWidth)
            const yTileIndex = Math.floor(data.world.y / gridHeight);
            const tile = this.tiles[yTileIndex][xTileIndex];
            this.viewport.addChild(new DirtPlatform(this.pixiApplication.loader, this.stage, tile.x, tile.y, 15, 15).pixiSprite);

        })

        // this.viewport.on("drag-start", (data: any) => {
        //     console.log(data)
        // })

        this.pixiApplication.stage.addChild(this.viewport);
        this.viewport.moveCenter(worldWidth / 2, worldHeight / 2);
        this.viewport.zoom(-500)

        loadTextures(this.pixiApplication, this.onLoad);   

    }

    drawMargins = () => {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);

        graphics.drawRect(0 - (markerWidth / 2), 0 - (markerHeight / 2), markerWidth, markerHeight); // Center
        graphics.drawRect(0 + width - (markerWidth / 2), 0 - (markerHeight / 2), markerWidth, markerHeight); //  Right
        graphics.drawRect(0 - width - (markerWidth / 2), 0 - (markerHeight / 2), markerWidth, markerHeight); //  Left
        graphics.drawRect(0 - (markerWidth / 2), 0 - height - (markerHeight / 2), markerWidth, markerHeight); //  Top
        graphics.drawRect(0 - (markerWidth / 2), 0 + height - (markerHeight / 2), markerWidth, markerHeight); //  Bottom

        graphics.position.set(0, 0);

        graphics.lineStyle(5, 0xffffff)
            .moveTo(0, 0)
            .lineTo(10000, 0)
            .moveTo(0,0)
            .lineTo(0, height)
            .moveTo(0,0)
            .lineTo(-10000, 0)
            .moveTo(0,0)
            .lineTo(0, -height)


        this.viewport.addChild(graphics);
    }

    drawGrid = () => {
        const graphics = new PIXI.Graphics();
        // graphics.beginFill(0xFFFFFF);

        // graphics.lineStyle(5, 0xffffff)
        // .moveTo(0, 0)
        // .lineTo(10000, 0)
        // .moveTo(0,0)
        // .lineTo(0, height)
        // .moveTo(0,0)
        // .lineTo(-10000, 0)
        // .moveTo(0,0)
        // .lineTo(0, -height)

        graphics.position.set(0, 0);
        // for (let i = 0; i < 500; i += gridHeight){
        //     graphics.lineStyle(5, 0xffffff)
        //         .moveTo(0, i)
        //         .lineTo(500, i);
        // }

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
        // this.drawMargins();
        this.drawGrid();
    }



 
    render(){
        return (
            <>
                <div ref={this.canvasRef}>

                </div>
            </>
        )
    }
}