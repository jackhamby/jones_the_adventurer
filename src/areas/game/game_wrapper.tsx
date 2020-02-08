import React from 'react'; 
import { AppState, KeyOptions, Character } from '../../types/states';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { GameDetail } from './game_detail';
import { GameCharacterDetail } from './game_character_detail';
import { GameDisplay, ConnectedGameDisplay } from './game_display';
import * as PIXI from 'pixi.js'; 
import './game_wrapper.css';
import { changeStage, setupGame } from '../../state_management/actions/control_actions';
import { Stage, StageManager } from '../../classes/game_classes';
import { CharacterOptions } from '../../types/enums';
import { Player } from '../../classes/player';
import { Knight } from '../../classes/knight';


export interface GameStateProps {
    currentKeys: KeyOptions;
    character: Character;
    pixiApplication: PIXI.Application;
    currentStage: Stage;
    // x: number;
    // y: number;
}

export interface GameDispatchProps {
    setupGame: (startingStage: Stage) => void;
}

export type GameProps = GameStateProps & GameDispatchProps;

export class GameWrapper extends React.Component<GameProps, {}> {
    stageManager: StageManager;

    constructor(props: any){
        super(props);
        this.stageManager = {} as StageManager;
    }

    componentDidMount(){

        this.props.pixiApplication.loader
            .add("knight_sm.png")
            .add("knight_sm_left.png")
            .add("knight_sm_right.png")
            .add("kobold_sm_left.png")
            .add("kobold_sm.png")
            .add("platform1.png")
            // Add head textures
            .add('knight-head-armor1-standing', "images/knight/head/head_helmet1_standing.png")
            .add('knight-head-default-standing', "images/knight/head/head_default_standing.png")
            // Add body textures
            .add('knight-body-default-standing', "images/knight/body/body_default_standing.png")
            // Add leg textures
            .add('knight-legs-default-standing', "images/knight/legs/legs_default_standing.png")

            // Once textures have loaded, fire this method
            .load(() => {
                this.setupGame();
            });
    }



    setupGame = () => {
        const loader = this.props.pixiApplication.loader;

        // Create player sprite, update state
        // const sprite = new PIXI.Sprite(this.props.pixiApplication.loader.resources["knight_sm.png"].texture);
        // const player = new Player(loader);


        const newPlayer = this.createPlayer();
        // console.log('new player')
        // console.log(newPlayer);
        // console.log(this.props.character);

        // Create a stage manager using the now ready pixi.loader and new playe
        this.stageManager = new StageManager(this.props.pixiApplication.loader, newPlayer);

        // Get stage one
        const stageOne = this.stageManager.getStage(1);

        // DISPATCH ACTION to set currentStage
        this.props.setupGame(stageOne);


    
    }


    createPlayer(){
        let player: Player;
        const loader = this.props.pixiApplication.loader;

        switch(this.props.character.name){
            case(CharacterOptions.KNIGHT):
                player = new Knight(loader);
                break;
            default:
                throw "cant handle kbold yet bitch"
        }
        return player
    }

    render(){
        return (
            <div className="container" style={{height: "100%"}}>
                <div className="row game-header">
                    header
                </div>
                <div className="row game-body">
                    <div className="game">
                        <ConnectedGameDisplay />
                    </div>
                    <div className="game-detail">
                        <GameDetail stage={this.props.currentStage}/>    
                    </div>
                </div>
                <div className="row game-footer">
                    <GameCharacterDetail stage={this.props.currentStage} />
                </div>
            </div>
        )
    }
}


export const mapStateToProps = (state: AppState): GameStateProps => {
    return {
        currentKeys: state.controlState.currentKeys,
        character: state.playerState.character,
        pixiApplication: state.gameState.pixiApplication,
        currentStage: state.gameState.currentStage,
        // x: state.gameState.currentStage ? state.gameState.currentStage.player.pixiSprite.x : 1,
        // y: state.gameState.currentStage ? state.gameState.currentStage.player.pixiSprite.y : 1,
    };
}


export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): GameDispatchProps => {
    return {
        setupGame: (startingStage: Stage) => {
            dispatch(setupGame(startingStage));
        }
    }
}


export const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(GameWrapper)