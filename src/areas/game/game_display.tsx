import React, { RefObject, createRef, Dispatch } from 'react';
import * as PIXI from 'pixi.js';
import { KeyOptions, AppState } from '../../types/states';
// import { createPlayer } from '../../state_management/actions/control_actions';
import './game_display.css'
import { Stage } from '../../classes/stages/stage';
import { StageManager } from '../../classes/stages/stage_manager';
import { Player } from '../../classes/players/player';
// import { store } from '../../state_management/store';
// import { changeStage } from '../../state_management/actions/control_actions';
// import { keyboard } from '../../components/control';

// export interface GameDisplayStateProps { 
//     pixiApplication: PIXI.Application;
//     // keyboard: KeyOptions;
//     currentStage: Stage;
//     isReady: boolean;
// }

// export interface GameDisplayOwnProps {
//     stageManager: StageManager;
// }

// export interface GameDisplayDispatchProps {
//     changeStage: (stage: Stage) => void; 
// }

interface GameDisplayState {
    // isStarted: boolean; 
    // keepPlaying: boolean;
 }

 interface GameDisplayProps {
    pixiApplication: PIXI.Application;
    // selectedPlayer: typeof Player;
    // keyboard: KeyOptions;
    // currentStage: Stage;
    // isReady: boolean;
 }




export class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    private canvasRef = createRef<HTMLDivElement>();

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
    }

 
    render(){
        return (
            <>
            {/* TODO clean up this css */}
                <button style={{position:"absolute", top: '13%', left: '15%' }} onClick={this.toggleMusic}><img id={"speakerImage"} src={"images/audio/audioOff.png"}/></button>
                <audio src={"audio/music/game.mp3"} id={"music"} loop/>
                <div className="game-container" id="canvas-container" ref={this.canvasRef}>

                </div>
            </>
        )
    }
} 

// const mapStateToProps = (state: AppState): GameDisplayStateProps => {
//     return {
//         pixiApplication: state.gameState.pixiApplication,
//         currentStage: state.gameState.currentStage,
//         isReady: state.gameState.gameReady,
//     } 
// }

// const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): GameDisplayDispatchProps => {
//     return {
//         changeStage: (stage: Stage) => { 
//             dispatch(changeStage(stage));
//         }
//     }
// }


// export const ConnectedGameDisplay = connect(mapStateToProps, mapDispatchToProps)(GameDisplay);


