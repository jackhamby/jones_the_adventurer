import React from "react";
import { GameDisplay } from "./game_display";
import { GameController } from "../../classes/game_controller";
import { Player } from "../../classes/players/player";
import { UnitAttributes, UnitStatistics } from "../../types/types";
import { CharacterDetail } from "./character_detail/character_detail";
import './game_wrapper.css';
import { GameDetail } from "./game_detail";

interface GameWrapperProps {
    pixiApplication: PIXI.Application;
    selectedPlayer: typeof Player;
}

interface GameWrapperState {
    playerAttributes: UnitAttributes;
    playerStatistics: UnitStatistics;
    player?: Player;
}


export class GameWrapper extends React.Component<GameWrapperProps, GameWrapperState> {
    private controller: GameController;

    constructor(props: any){
        super(props);
        this.controller = new GameController(this.props.pixiApplication, this.startGame);
        this.state = {
            player: undefined,
            playerAttributes: this.props.selectedPlayer.baseAttributes,
            playerStatistics: {
                projectiles: 0,
                damage: 0,
                enemies: 0,
            } 
        }
    }

    componentDidMount(){
        this.controller.updateView = this.updateView;
        this.controller.setupAndStartGame(this.props.selectedPlayer);
    }

    startGame = (): void => {
        this.setState({player: this.controller.player});
    }

    updateView = (): void => {
        this.forceUpdate();
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
                        />
                    </div>
                    <div className="game-detail">
                        <GameDetail player={this.state.player} gameController={this.controller} />    
                    </div>
                </div>
                <div className="row game-footer">
                    <CharacterDetail player={this.state.player} controller={this.controller} />
                </div>
            </div>
        )
    }
}
