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
import { saveStage } from '../../api/stages';

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
    isSaving: boolean;
    errors: string[];
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
            isSaving: false,
            errors: null
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
        this.validate();
    }

    handleResizeEvents = () => {
        window.addEventListener('resize', (event) => {
            const canvasDimensions = getCanvasDimensions();
            this.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height);
        });
    }

    saveStage = async () => {
        this.setState({isSaving: true})
        var result = await saveStage(this.controller.templateHelper.template);
        this.setState({isSaving: false})
        if (result){
            this.setState({errors: null})
            window.alert("saved!")
        } else{
            this.setState({errors: ["there as an issue saving"]})
        }
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
                <button style={{minWidth: "40%"}} className="btn-danger" onClick={
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
                <button style={{minWidth: "40%"}} onClick={() => {
                    this.controller.playTest();
                    this.setState({ isPlaying: true });
                }}>
                    play test
                </button>
            );
            
        }
    }

    validate = (): void => {
        const errors = [];
        if (!this.controller.templateHelper.template.name){
            errors.push("'name' is required");
        }
        if (this.controller.templateHelper.template.level === null){
            errors.push("'level' is required");
        }
        else if (isNaN(this.controller.templateHelper.template.level)){
            errors.push("'level' must be a number");
        }
        if (!this.controller.templateHelper.template.enemies ||
            this.controller.templateHelper.template.enemies.length === 0){
            errors.push("at least one enemy is required");
        }
        this.setState({ errors })
    }

    canSave = (): boolean => {
        return !(this.state.errors && this.state.errors.length > 0);
    }

    renderSave = () => {

        if (this.state.isSaving){
            return (
                <button style={{minWidth: "40%"}} className="btn-success" disabled={true}>
                    saving...
                </button>
            );
        }
        else {
            const canSave = this.canSave();
            return (
                <button
                    disabled={!canSave}
                    style={{minWidth: "40%"}} 
                    className={`btn-success ${canSave ? "" : "disabled"}`} 
                    onClick={this.saveStage}>
                    save
                </button>
            );
        }
    }

    renderError = () => {
        if (this.state.errors && this.state.errors.length > 0){
            return this.state.errors.map((error: string) => {
                return <p style={{color: 'red'}}>{error}</p>
            })
        }
    }

    render(){
        return (
            <div className="row">
                <div className="col-7 pl-2" ref={this.canvasRef} id="canvas-container">

                </div>
                <div className="col-5">
                    <BuilderMenu controller={this.controller} validate={this.validate}/>

                    {/* TODO can we abstract these buttons out */}
                    <div className="col-12 pt-4">
                        <label className="pr-3"> level</label>
                        <input type="number" placeholder="1" onChange={(event) => {
                            this.controller.setLevel(parseInt(event.target.value));
                            this.validate();
                        }}>

                        </input>
                    </div>
                    <div className="col-12 pt-4">
                        <label className="pr-3">name</label>
                        <input type="text" placeholder="stage name" onChange={(event) => {
                            this.controller.setName(event.target.value);
                            this.validate();
                        }}>
                        </input>
                    </div>
                    <div className="col-12 pt-4">
                        <button style={{minWidth: "40%"}} disabled={this.state.isSelectingSpawn} onClick={() => {
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
                    <div className="col-12 pt-4" >
                        {this.renderSave()}
                        {/* <button style={{minWidth: "40%"}} className="btn-success" onClick={() => {
                                // this.setState({isSaving: true})
                                // var result = saveStage(this.controller.templateHelper.template);
                                // const stageStr = JSON.stringify(this.controller.templateHelper.template);
                                // navigator.clipboard.writeText(stageStr);
                                // window.alert("saving!")
                                saveStage();
                        }} >
                            save
                        </button> */}
                    </div>
                    <div className="col-12 pt-4">
                        {this.renderError()}
                    </div>

                    

                </div>

            </div>
        )
    }
}