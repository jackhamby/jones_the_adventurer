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
import { Modal } from '../../components/modal';

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
    }

    render(){
        return (
            <div className="container" style={{height: "100%"}}>
                {/* debugger modal */}
                <Modal/>
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
        character: state.playerState.character,
        pixiApplication: state.gameState.pixiApplication,
        currentStage: state.gameState.currentStage,
        collectedTreasures: state.gameState.currentStage ? state.gameState.currentStage.player.treasures : [],
        statistics: state.gameState.currentStage ? state.gameState.currentStage.player.statistics : {} as UnitStatistics,
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