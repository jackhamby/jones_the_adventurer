import React, { RefObject, createRef, Dispatch } from 'react';
import * as PIXI from 'pixi.js';
import { KeyOptions, Character, AppState } from '../../types/states';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
// import { createPlayer } from '../../state_management/actions/control_actions';
import { Stage } from '../../classes/game_classes';
import { Platform } from '../../classes/platform';
import { Enemy } from '../../classes/enemy';
import { SpritePart } from '../../classes/player';
import './game_display.css'
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
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.props.pixiApplication.view);
        const containerHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight : 1;
        const containerWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth : 1;
        this.props.pixiApplication.renderer.resize(containerWidth, containerHeight);
        this.setState({isStarted: false})
    }

    componentDidUpdate(){
        if (!this.props.isReady || this.state.isStarted) return;
        this.props.pixiApplication.renderer.backgroundColor = 0xadd8e6;  

        const stage = this.props.pixiApplication.stage;
        const enemies = this.props.currentStage.enemies;
        const platforms = this.props.currentStage.platforms;
        // const player = this.props.currentStage.player;
        const newplayer = this.props.currentStage.player;
        // stage.addChild(player.pixiSprite);
        enemies.map((enemy: Enemy) => stage.addChild(enemy.pixiSprite));
        platforms.map((platform: Platform) => stage.addChild(platform.pixiSprite));
        this.props.pixiApplication.ticker.add(delta => this.gameLoop(delta));
        this.setState({ isStarted: true })


        stage.addChild(...newplayer.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        // newplayer.spriteParts.map((sprite: PIXI.Sprite) => {
        //     stage.add
        // })



        // .add("images/knight/head/head_default_standing.png")
        // .add("images/knight/body/body_default_standing.png")
        // .add("images/knight/legs/legs_default_standing.png")
        // playground 
        // const head = new PIXI.Sprite(this.props.pixiApplication.loader.resources['images/knight/head/head_helmet1_standing.png'].texture)
        // const body = new PIXI.Sprite(this.props.pixiApplication.loader.resources['images/knight/body/body_default_standing.png'].texture)
        // const legs = new PIXI.Sprite(this.props.pixiApplication.loader.resources['images/knight/legs/legs_default_standing.png'].texture)
        // head.x = 500;
        // head.y = 500;
        // body.x = head.x - (body.width / 6)
        // body.y = head.y + head.height;
        // legs.x = body.x;
        // legs.y = body.y + body.height;
        // stage.addChild(body)
        // stage.addChild(head)
        // stage.addChild(legs)




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
            // dispatch(createPlayer(sprite))
        }
    }
}


export const ConnectedGameDisplay = connect(mapStateToProps, mapDispatchToProps)(GameDisplay);


