import * as React from 'react';
import * as PIXI from 'pixi.js';
import { createRef } from 'react';
import { DirtPlatform } from '../../classes/platform';
import { Stage } from '../../classes/stage/stage';
import { getCanvasDimensions, loadTextures, mapStageBuilderKeys } from '../../helpers/util';
import { ClickEventData, Viewport } from 'pixi-viewport';
import { BuilderMenu } from './builder_menu';
import { Sprite } from '../../classes/sprite';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { StageBuilderKeyOptions } from '../../types/interfaces';

const width = 800;
const height = 800;


export const stageBuilderKeyboard = {

} as StageBuilderKeyOptions;

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
    isSelectingSpawn: boolean;
    isPlaying: boolean;
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
    private controller = new StageBuilderController(this.pixiApplication);
    
    constructor(props){
        super(props);
        this.state = {
            isSelectingSpawn: false,
            isPlaying: false,
        }
    }

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.pixiApplication.view);

        canvasHtmlElement?.appendChild(this.pixiApplication.view);
        const containerHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight : 1;
        const containerWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth : 1;
        this.pixiApplication.renderer.resize(containerWidth, containerHeight);  
 
        loadTextures(this.pixiApplication, () => {}); 
        this.handleResizeEvents();
        this.handleKeyEvents();
    }

    handleResizeEvents = () => {
        window.addEventListener('resize', (event) => {
            const canvasDimensions = getCanvasDimensions();
            this.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height);
        });
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

    renderPlayTest = (): JSX.Element => {
        if (this.state.isPlaying){
            return (
                <button className="btn-danger" onClick={
                    () => {
                        this.controller.stopPlayTest();
                        this.setState({ isPlaying: false })
                    }
                }>
                    stop play test
                </button>
            );  
        }
        else {
            return (
                <button className="btn-primary" onClick={() => {
                    this.controller.playTest();
                    this.setState({ isPlaying: true });
                }}>
                    play test
                </button>
            );
            
        }
    }

    render(){
        return (
            <div className="row">
                <div className="col-7 pl-2" ref={this.canvasRef} id="canvas-container">

                </div>
                <div className="col-5">
                    <BuilderMenu controller={this.controller} />

                    {/* TODO can we abstract these buttons out */}
                    <div className="col-12 pt-4">
                        <label className="col-2 pr-1"> level</label>
                        <input className="col-5" type="number" placeholder="1" onChange={(event) => {
                            this.controller.setLevel(parseInt(event.target.value));
                        }}>

                        </input>
                    </div>
                    <div className="col-12 pt-4">
                        <label className="col-2 pr-1">name</label>
                        <input className="col-5" type="text" placeholder="stage name" onChange={(event) => {
                            this.controller.setName(event.target.value);
                        }}>
                        </input>
                    </div>
                    <div className="col-12 pt-4">
                        <button disabled={this.state.isSelectingSpawn} onClick={() => {
                            this.controller.isSelectingSpawn = !this.state.isSelectingSpawn;
                            this.controller.viewport.off("clicked");
                            this.controller.viewport.on("clicked", (data: ClickEventData) => {
                                this.controller.setSpawn(data.world.x, data.world.y)
                                this.controller.drawSpawnIcon();
                                this.setState({isSelectingSpawn: false})
                            });

                            this.setState({isSelectingSpawn: !this.state.isSelectingSpawn});
                        }} >
                            
                            select spawn
                        </button>
                    </div>
                    <div className="col-12 pt-4">
                        {this.renderPlayTest()}
                    </div>
                    <div className="col-12 pt-4">
                        <button onClick={() => {
                                const stageStr = JSON.stringify(this.controller.templateHelper.template);
                                navigator.clipboard.writeText(stageStr);
                                window.alert("copied to clipboard!")
                        }} >
                            copy json
                        </button>
                    </div>
                    

                </div>

            </div>
        )
    }
}