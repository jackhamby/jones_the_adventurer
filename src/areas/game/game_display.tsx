import React, { RefObject, createRef, Dispatch } from 'react';
import * as PIXI from 'pixi.js';
import { KeyOptions, Character, AppState } from '../../types/states';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
// import { createPlayer } from '../../state_management/actions/control_actions';
import { Player } from '../../classes/player';
import { Stage } from '../../classes/game_classes';
import { Platform } from '../../classes/platform';
import { Enemy } from '../../classes/enemy';

export interface GameDisplayStateProps { 
    pixiApplication: PIXI.Application;
    keyboard: KeyOptions;
    currentStage: Stage;
    isReady: boolean;
}

export interface GameDisplayDispatchProps {
    createPlayer: (sprite: PIXI.Sprite) => void;
}

export interface GameDisplayState {
    isStarted: boolean; 
 }


export type GameDisplayProps = GameDisplayDispatchProps & GameDisplayStateProps;

export class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    private canvasRef = createRef<HTMLDivElement>();

    componentDidMount(){
        this.canvasRef.current?.appendChild(this.props.pixiApplication.view);
        this.setState({isStarted: false})
    }

    componentDidUpdate(){
        if (!this.props.isReady || this.state.isStarted) return;
        this.props.pixiApplication.renderer.backgroundColor = 0xadd8e6;  

        const stage = this.props.pixiApplication.stage;
        const enemies = this.props.currentStage.enemies;
        const platforms = this.props.currentStage.platforms;
        const player = this.props.currentStage.player;
        stage.addChild(player.pixiSprite);
        enemies.map((enemy: Enemy) => stage.addChild(enemy.pixiSprite));
        platforms.map((platform: Platform) => stage.addChild(platform.pixiSprite));
        this.props.pixiApplication.ticker.add(delta => this.gameLoop(delta));
        // platforms.map((plat) => {
        //     var graphics = new PIXI.Graphics();

        //     graphics.beginFill(0xFFFF00);

        //     // set the line style to have a width of 5 and set the color to red
        //     graphics.lineStyle(5, 0xFF0000);

        //     // draw a rectangle
        //     graphics.drawRect(plat.pixiSprite.x, plat.pixiSprite.y, plat.pixiSprite.width, plat.pixiSprite.height);

        //     stage.addChild(graphics);
        // })
        this.setState({ isStarted: true })
    }

    gameLoop = (delta: any) => {
        this.props.currentStage.update(this.props.keyboard);
    }

    render(){
            return (
                <div ref={this.canvasRef}>

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
            // dispatch(createPlayer(sprite))
        }
    }
}


export const ConnectedGameDisplay = connect(mapStateToProps, mapDispatchToProps)(GameDisplay);


