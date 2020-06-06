import React from 'react'; 
import { AppState, KeyOptions, Character, PlayerAttributes, GameState } from '../../types/states';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { GameDetail } from './game_detail';
import { GameCharacterDetail } from './game_character_detail';
import { ConnectedGameDisplay } from './game_display';
import * as PIXI from 'pixi.js'; 
import './game_wrapper.css';
import { setupGame } from '../../state_management/actions/control_actions';
import { Stage, StageManager } from '../../classes/game_classes';
import { UnitPartNames, PlayerOptionNames } from '../../types/enums';
import { Knight } from '../../classes/knight';
import { Kobold } from '../../classes/kobold';
import { Viewport } from 'pixi-viewport'
import { getCanvasDimensions } from '../../helpers/util';
import { Treasure } from '../../classes/treasure';
import { Player } from '../../classes/player';
import { UnitStatistics, UnitAttributes } from '../../types/types';
import { GameController } from '../../classes/game_controller';

export interface GameStateProps {
    character: Character;
    pixiApplication: PIXI.Application;
    currentStage: Stage;
    collectedTreasures: Treasure[];
    statistics: UnitStatistics;
}

export interface GameDispatchProps {
    setupGame: (startingStage: Stage) => void;
}

export type GameProps = GameStateProps & GameDispatchProps;

export class GameWrapper extends React.Component<GameProps, {}> {
    stageManager: StageManager;
    gameController: GameController;

    constructor(props: any){
        super(props);
        this.stageManager = {} as StageManager;
        this.gameController = new GameController(this.props.pixiApplication);
    }

    componentDidMount(){
        this.gameController.startGame2(this.props.character);
        // this.gameController.startGame(this.props.character);

        // this.props.pixiApplication.loader
        //     // add platform tetures
        //     .add('default-platform', 'images/platforms/platform1.png')
        //     .add('dirt-platform', 'images/platforms/dirt.png')
        //     .add('grass-platform', 'images/platforms/grass.png')
        //     .add('red-grass-platform', 'images/platforms/red_grass.png')
        //     .add('sand-rock-platform', 'images/platforms/sand_rock.png')


        //     // coin textures
        //     .add('coins-small', 'images/coins/coins.png')

        //     // Add head textures
        //     .add('knight-head-armor1-standing', "images/knight/head/head_armor1_standing.png")
        //     .add('knight-head-default-standing', "images/knight/head/head_default_standing.png")
        //     .add('knight-head-armor2-standing', "images/knight/head/head_armor2.png")

        //     // Add body textures
        //     .add('knight-body-default-standing', "images/knight/body/body_default_standing.png")
        //     .add('knight-body-armor1-standing', "images/knight/body/body_armor1_standing.png")

        //     // Add leg textures
        //     .add('knight-legs-default-standing', "images/knight/legs/legs_default_standing.png")
        //     .add('knight-legs-armor1-standing', "images/knight/legs/legs_armor1_standing.png")

        //     // Add treasures images
        //     .add('treasure-base', "images/treasures/treasure_base.png")

        //     // Add enemy images
        //     .add('kobold-standing', "images/enemies/kobold/kobold_standing.png")

        //     // Add projectile images
        //     .add('rock', 'images/projectiles/rock.png')
        //     .add('arrow', 'images/projectiles/dart.png')
        //     .add('stinger', 'images/projectiles/stinger.png')

        //     // Kobold
        //     .add('kobold-legs-default', "images/kobold/legs/legs_default.png")
        //     .add('kobold-legs-armor1', "images/kobold/legs/legs_armor1.png")
        //     .add('kobold-body-default', "images/kobold/body/body_default.png")
        //     .add('kobold-head-default', "images/kobold/head/head_default.png")
        //     .add('kobold-head-armor1', "images/kobold/head/head_armor1.png")

        //     // Manticore 
        //     .add('manticore-legs-default', "images/manticore/legs/manticore_legs_default.png")
        //     .add('manticore-body-default', "images/manticore/body/manticore_body_default.png")
        //     .add('manticore-head-default', "images/manticore/head/manticore_head_default.png")



        //     // Once textures have loaded, fire this method
        //     .load(() => {
        //         this.setupGame();
        //     });
    }



    setupGame = () => {
        // const dimensions = getCanvasDimensions()
        // const viewport = new Viewport({
        //     screenWidth: dimensions.width,
        //     screenHeight: dimensions.height
        // })

        // this.props.pixiApplication.stage.addChild(viewport);

        // viewport.sortableChildren = true;

        // viewport
        //     .drag()

        // // viewport.on('clicked', (e) => {
        // //     window.alert(`x: ${e.screen.x} y: ${e.screen.y}`)
        // // })

        // const player = this.createPlayer();

        // viewport.follow(player.spriteParts[UnitPartNames.HEAD].sprite);
        
        // // Create a stage manager using the now ready pixi.loader and new playe
        // this.stageManager = new StageManager(this.props.pixiApplication.loader, player, viewport);
        
        // // Get stage one
        // const stageOne = this.stageManager.getStage(1);

        // // DISPATCH ACTION to set currentStage
        // this.props.setupGame(stageOne);  


        // player.currentStage = stageOne;
    }


    // Creates a player on the given viewport
    createPlayer(){
        // // let player: Player;
        // let newPlayer: Player;
        // let attributes: UnitAttributes;
        // const loader = this.props.pixiApplication.loader;

        // switch(this.props.character.name){
        //     case(PlayerOptionNames.KNIGHT):
        //         attributes = this.props.character.attributes;
        //         newPlayer = new Knight(loader, {} as Stage, attributes, 100, 100);
        //         break;
        //     case(PlayerOptionNames.KOBOLD):
        //         attributes = this.props.character.attributes;
        //         newPlayer = new Kobold(loader, {} as Stage, attributes, 100, 100);
        //         break;
        //     default:
        //         throw "cant handle kbold yet bitch"
        // }
        // return newPlayer
    }

    render(){
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
                        <GameDetail stage={this.props.currentStage} statistics={this.props.currentStage?.player.statistics}/>    
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
        statistics: state.gameState.currentStage ? state.gameState.currentStage.player.statistics : {} as UnitStatistics,
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