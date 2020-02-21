import React, { RefObject, createRef, Dispatch } from 'react';
import * as PIXI from 'pixi.js';
import { KeyOptions, Character, AppState } from '../../types/states';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
// import { createPlayer } from '../../state_management/actions/control_actions';
import { Stage, StageManager } from '../../classes/game_classes';
import { Platform } from '../../classes/platform';
import { Enemy } from '../../classes/enemy';
import { SpritePart } from '../../classes/interfaces';
import './game_display.css'
import { Treasure } from '../../classes/treasure';
import { Viewport } from 'pixi-viewport';


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
    createPlayer: (sprite: PIXI.Sprite) => void;
}

export interface GameDisplayState {
    isStarted: boolean; 
 }

 export const viewport = new Viewport({
    screenWidth: 1000,
    screenHeight: 500
    // interaction: this.props.pixiApplication.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
})


export type GameDisplayProps = GameDisplayDispatchProps & GameDisplayStateProps & GameDisplayOwnProps;

export class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    private canvasRef = createRef<HTMLDivElement>();

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.props.pixiApplication.view);
        const containerHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight : 1;
        const containerWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth : 1;
        this.props.pixiApplication.renderer.resize(containerWidth, containerHeight);
        this.setState({isStarted: false})
    }

    componentDidUpdate(){
        if (!this.props.isReady || this.state.isStarted) return;

        // Set stage background color
        this.props.pixiApplication.renderer.backgroundColor = 0xadd8e6;  


        this.props.pixiApplication.stage.addChild(viewport);

        viewport
            .drag()
            // .pinch()
            // .wheel()
            // .decelerate()

        viewport.on('clicked', (e) => {
            console.log(e)
        })

        viewport.on('wheel-scroll', (e) => {
            console.log('scroll')
        })

        viewport.zoom(0)

        // Add sprites to canvas
        this.props.stageManager.loadStage(this.props.currentStage);


        // Start game
        this.props.pixiApplication.ticker.add(delta => this.gameLoop(delta));
        this.setState({ isStarted: true })
    }

    gameLoop = (delta: any) => {
        this.props.currentStage.update(this.props.keyboard);
    }

    render(){
            return (
                <div className="game-container"  id="canvas-container" ref={this.canvasRef}>

                </div>
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
        createPlayer: (sprite: PIXI.Sprite) => {
            // dispatch(createPlayer( sprite))
        }
    }
}


export const ConnectedGameDisplay = connect(mapStateToProps, mapDispatchToProps)(GameDisplay);


