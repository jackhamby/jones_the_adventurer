import React, { RefObject, createRef, Dispatch } from 'react';
import * as PIXI from 'pixi.js';
import { KeyOptions, Character, AppState } from '../../types/states';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
// import { createPlayer } from '../../state_management/actions/control_actions';
import { Stage, StageManager } from '../../classes/game_classes';
import './game_display.css'
import { store } from '../../state_management/store';
import { changeStage } from '../../state_management/actions/control_actions';


export interface GameDisplayStateProps { 
    pixiApplication: PIXI.Application;
    keyboard: KeyOptions;
    currentStage: Stage;
    isReady: boolean;
}

export interface GameDisplayOwnProps {
    stageManager: StageManager;
}

export interface GameDisplayDispatchProps {
    changeStage: (stage: Stage) => void; 
}

export interface GameDisplayState {
    isStarted: boolean; 
    keepPlaying: boolean;
 }




export type GameDisplayProps = GameDisplayDispatchProps & GameDisplayStateProps & GameDisplayOwnProps;

export class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    private canvasRef = createRef<HTMLDivElement>();

    // TODO REMOVE
    testOnClick(){
        const state = store.getState() as AppState;
        console.log(`x: ${state.gameState.currentStage.player.x}`)
        console.log(`y: ${state.gameState.currentStage.player.y}`)

        // state.gameState.currentStage.player.currentAttributes.jump += 5;
    }

    toggleMusic(){
        const music = document.getElementById("music") as HTMLAudioElement;
        const speakerImage = document.getElementById("speakerImage") as HTMLImageElement;
        if(music && speakerImage){
            if(music.paused){
                speakerImage.src = 'images/audio/audioOn.png';
                music.play();                
            }else{
                speakerImage.src = 'images/audio/audioOff.png'
                music.pause();                
            }               
        }
    }

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.props.pixiApplication.view);
        const containerHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight : 1;
        const containerWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth : 1;
        this.props.pixiApplication.renderer.resize(containerWidth, containerHeight);
        this.setState({isStarted: false, keepPlaying: false})
    }

    componentDidUpdate(){
        if (!this.props.isReady || this.state.isStarted) return;

        // Set stage background color
        this.props.pixiApplication.renderer.backgroundColor = 0xadd8e6;  

        // Add sprites to canvas
        this.props.stageManager.loadStage(this.props.currentStage);

        // Start game
        this.props.pixiApplication.ticker.add(delta => this.gameLoop(delta));
        this.setState({ isStarted: true })
    }

    gameLoop = (delta: any) => {
        this.props.currentStage.update(this.props.keyboard);
        if (this.props.currentStage.isCleared && !this.state.keepPlaying){
            // TODO clean this up into another method
            const response: boolean = window.confirm(`nice work cheeseman, you beat stage ${this.props.currentStage.level} in ${this.props.currentStage.timer.timerText}. continue to the next stage?`);
            if (response){
                this.props.stageManager.clearStage();
                const nextStage = this.props.stageManager.getStage(this.props.currentStage.level + 1);
                this.props.currentStage.player.currentStage = nextStage;
                this.props.stageManager.loadStage(nextStage);
                this.props.changeStage(nextStage);
            } else {
                this.setState({...this.setState, keepPlaying: true})
            }
        }

    }

    render(){
            return (
                <>
                    <button style={{position: "absolute"}} onClick={this.testOnClick}>TEST BUTTON</button>
                    {/* <button style={{position:"absolute",left:"69%", }} onClick={this.toggleMusic}><img id={"speakerImage"} src={"images/audio/audioOff.png"}/></button>
                    <audio src={"audio/music/game.mp3"} id={"music"} loop/> */}
                    <div className="game-container" id="canvas-container" ref={this.canvasRef}>

                    </div>
                </>
        
            )
    }
} 

const mapStateToProps = (state: AppState): GameDisplayStateProps => {
    // debugger;
    return {
        pixiApplication: state.gameState.pixiApplication,
        keyboard: state.controlState.currentKeys,
        currentStage: state.gameState.currentStage,
        isReady: state.gameState.gameReady,
    } 
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): GameDisplayDispatchProps => {
    return {
        changeStage: (stage: Stage) => { 
            dispatch(changeStage(stage));
        }
    }
}


export const ConnectedGameDisplay = connect(mapStateToProps, mapDispatchToProps)(GameDisplay);


