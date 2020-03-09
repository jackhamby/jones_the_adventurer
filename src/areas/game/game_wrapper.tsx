import React from 'react'; 
import { AppState, KeyOptions, Character, PlayerAttributes, GameState } from '../../types/states';
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
import { Viewport } from 'pixi-viewport'
import { getCanvasDimensions } from '../../helpers/util';
import { Treasure } from '../../classes/treasure';

export interface GameStateProps {
    character: Character;
    pixiApplication: PIXI.Application;
    currentStage: Stage;
    collectedTreasures: Treasure[];
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
            .add('knight-head-armor1-standing', "images/knight/head/head_armor1_standing.png")
            .add('knight-head-default-standing', "images/knight/head/head_default_standing.png")
            // Add body textures
            .add('knight-body-default-standing', "images/knight/body/body_default_standing.png")
            .add('knight-body-armor1-standing', "images/knight/body/body_armor1_standing.png")

            // Add leg textures
            .add('knight-legs-default-standing', "images/knight/legs/legs_default_standing.png")
            .add('knight-legs-armor1-standing', "images/knight/legs/legs_armor1_standing.png")

            // Add treasures images
            .add('treasure-base', "images/treasures/treasure_base.png")

            // Add enemy images
            .add('kobold-standing', "images/enemies/kobold/kobold_standing.png")


            // Once textures have loaded, fire this method
            .load(() => {
                this.setupGame();
            });
    }



    setupGame = () => {
        const dimensions = getCanvasDimensions()
        const viewport = new Viewport({
            screenWidth: dimensions.width,
            screenHeight: dimensions.height
        })

        this.props.pixiApplication.stage.addChild(viewport);

        viewport
            .drag()

        viewport.on('clicked', (e) => {
            window.alert(`x: ${e.screen.x} y: ${e.screen.y}`)
        })



        const player = this.createPlayer();

        // Create a stage manager using the now ready pixi.loader and new playe
        this.stageManager = new StageManager(this.props.pixiApplication.loader, player, viewport);
        
        // Get stage one
        const stageOne = this.stageManager.getStage(1);

        // DISPATCH ACTION to set currentStage
        this.props.setupGame(stageOne);  


        player.currentStage = stageOne;
    }


    // Creates a player on the given viewport
    createPlayer(){
        let player: Player;
        let attributes: PlayerAttributes;
        const loader = this.props.pixiApplication.loader;

        switch(this.props.character.name){
            case(CharacterOptions.KNIGHT):
                attributes = this.props.character.attributes;
                player = new Knight(loader, {} as Stage, attributes);
                break;
            default:
                throw "cant handle kbold yet bitch"
        }
        return player
    }

    render(){
        // console.log('rendering')
        return (
            <div className="container" style={{height: "100%"}}>
                <div className="row game-header">
                    header
                </div>
                <div className="row game-body">
                    <div className="game">
                        <ConnectedGameDisplay stageManager={this.stageManager} />
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
        // gameState: state.gameState,
        // currentKeys: state.controlState.currentKeys,
        character: state.playerState.character,
        pixiApplication: state.gameState.pixiApplication,
        currentStage: state.gameState.currentStage,
        // TODO: we should init player in the store to have intial stage defined
        collectedTreasures: state.gameState.currentStage ? state.gameState.currentStage.player.treasures : [],
        // x: state.gameState.currentStage ? state.gameState.currentStage.player.x : 1,
        // y: state.gameState.currentStage ? state.gameState.currentStage.player.y : 1,
        // playerAttributes: state.gameState.currentStage ? state.gameState.currentStage.player.attributes : {} as PlayerAttributes,
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