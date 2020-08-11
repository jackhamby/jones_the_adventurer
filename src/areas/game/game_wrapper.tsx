import React from "react";
import { StageManager } from "../../classes/stages/stage_manager";
import { GameDisplay } from "./game_display";
import { KeyOptions } from "../../types/states";
import { Stage } from "../../classes/stages/stage";
import { GameController } from "../../classes/game_controller";
import { Player } from "../../classes/players/player";
import { UnitAttributes, UnitStatistics } from "../../types/types";
import { GameCharacterDetail } from "./game_character_detail";
import './game_wrapper.css';
import { GameDetail } from "./game_detail";
import { UnitStatisticNames } from "../../types/enums";



// import React from 'react'; 
// import { AppState, KeyOptions, Character, PlayerAttributes, GameState } from '../../types/states';
// import { Dispatch, AnyAction } from 'redux';
// import { connect } from 'react-redux';
// import { GameDetail } from './game_detail';
// import { GameCharacterDetail } from './game_character_detail';
// import { ConnectedGameDisplay } from './game_display';
// import * as PIXI from 'pixi.js'; 
// import { setupGame } from '../../state_management/actions/control_actions';
// import { Stage, StageManager } from '../../classes/game_classes';
// import { UnitPartNames, PlayerOptionNames } from '../../types/enums';
// import { Knight } from '../../classes/players/knight';
// import { Kobold } from '../../classes/players/kobold';
// import { Viewport } from 'pixi-viewport'
// import { getCanvasDimensions } from '../../helpers/util';
// import { Treasure } from '../../classes/treasures/treasure';
// import { Player } from '../../classes/players/player';
// import { UnitStatistics, UnitAttributes } from '../../types/types';
// import { GameController } from '../../classes/game_controller';
// // import { Modal } from '../../components/modals/modal';
// // import { DebuggerModal } from '../../components/modals/debugger_modal';

// export interface GameStateProps {
//     character: Character;
//     pixiApplication: PIXI.Application;
//     currentStage: Stage;
//     collectedTreasures: Treasure[];
//     statistics: UnitStatistics;
// }

// export interface GameDispatchProps {
//     setupGame: (startingStage: Stage) => void;
// }

// export type GameProps = GameStateProps & GameDispatchProps;

interface GameWrapperProps {
    pixiApplication: PIXI.Application;
    selectedPlayer: typeof Player;
    // keyboard: KeyOptions;
    // currentStage: Stage;
    // isReady: boolean;
}

interface GameWrapperState {
    // isReady: boolean;
    playerAttributes: UnitAttributes;
    playerStatistics: UnitStatistics;
    player?: Player;
}


let count: number = 1;
export class GameWrapper extends React.Component<GameWrapperProps, GameWrapperState> {
    private gameController: GameController;

    constructor(props: any){
        super(props);
        this.gameController = new GameController(this.props.pixiApplication, this.startGame);
        // this.state.player = this.gameController.player
        this.state = {
            player: undefined,
            // isReady: false,
            playerAttributes: this.props.selectedPlayer.baseAttributes,
            playerStatistics: {
                projectiles: 0,
                damage: 0,
                enemies: 0,
            } 
        }
    }

    componentDidUpdate(){
        if (this.state.player){
            // this.gameController.player = this.state.player
            this.state.player.canAttack()
            // this.gameController.updatePlayerReference(this.state.player);
        }
    }

    componentDidMount(){
        // this.gameController.startGame(this.props.selectedPlayer);
        this.gameController.setupAndStartGame(this.props.selectedPlayer);
    }

    startGame = (): void => {
        // this.gameController.player.updatePlayer = this.updatePlayer;
        this.gameController.player.updateStatistics = this.updatePlayerStatistics;
        this.setState({player: this.gameController.player});
    }

    // updatePlayer = (): void => {
    //     if (!this.state.player){
    //         return;
    //     }
    //     this.setState(
    //         { 
    //             player: {
    //                 ...this.state.player,
    //                 _id: count,
    //             } as Player,
    //         }
    //     );
    //     ++ count;
    // }

    updatePlayerStatistics = (): void => {
        debugger;
        this.setState({
            ...this.state,
            playerStatistics: {
                ...this.state.playerStatistics
            }
        })
    }

    updatePlayerAttributes(){

    }



    
    render(){
        return (
            <div className="container" style={{height: "100%"}}>
                <div className="row game-header p-2">
                    jones the adventurer
                </div>
                <div className="row game-body">
                    <div className="game">
                        <GameDisplay
                            pixiApplication={this.props.pixiApplication}
                            // selectedPlayer={this.props.selectedPlayer}
                            // keyboard={this.props.keyboard}
                            // currentStage={this.props.currentStage}
                            // isReady={this.props.isReady}
                        />
                    </div>
                    <div className="game-detail">
                        {/* <GameDetail gameController={this.gameController} stage={this.props} statistics={this.props.currentStage?.player.statistics}/>     */}
                        {/* gameController is only used for debugger modal. TODO: remove gameController as prop */}
                        <GameDetail player={this.state.player} />    

                    </div>
                </div>
                <div className="row game-footer">
                    {/* <GameCharacterDetail stage={this.props.currentStage} /> */}
                    <GameCharacterDetail player={this.state.player} />
                </div>
            </div>
        )
    }
}


// export const mapStateToProps = (state: AppState): GameStateProps => {
//     return {
//         character: state.playerState.character,
//         pixiApplication: state.gameState.pixiApplication,
//         currentStage: state.gameState.currentStage,
//         collectedTreasures: state.gameState.currentStage ? state.gameState.currentStage.player.treasures : [],
//         statistics: state.gameState.currentStage ? state.gameState.currentStage.player.statistics : {} as UnitStatistics,
//     };
// }


// export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): GameDispatchProps => {
//     return {
//         setupGame: (startingStage: Stage) => {
//             dispatch(setupGame(startingStage));
//         }
//     }
// }


// export const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(GameWrapper)