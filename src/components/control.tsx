
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps
  } from "react-router-dom";
import { mapKeys } from '../helpers/util';
import './global.css';
import { GameWrapper } from '../areas/game/game_wrapper';
import { Player } from '../classes/players/player';
import { PlayerSelectWrapper } from '../areas/player_select/player_select_wrapper';
import { MainMenu } from '../areas/main_menu/main_menu';
import { StageBuilderWrapper } from '../areas/stage_builder/stage_builder_wrapper';
import { Kobold } from '../classes/players/kobold';
import { KeyOptions } from '../types/interfaces';
import { StageList } from '../areas/stage_select/stage_list';

export const keyboard = {

} as KeyOptions;

interface ControlState {
    selectedPlayer: typeof Player;
}

export class Control extends React.Component<RouteComponentProps, ControlState> {

    constructor(props){
        super(props);
        this.state = {
            selectedPlayer: Kobold,
        }
    }

    changePlayer = (player: typeof Player) => {
        this.setState({ selectedPlayer: player });
    }

    componentDidMount(){
        this.handleKeyEvents();
    }

    renderState = () => {
        return (
            <Router>
                <Route exact path="/">
                    <MainMenu />
                </Route>
                <Route path="/player-select">
                    <PlayerSelectWrapper
                        // updateScreen={this.updateScreen} 
                        changePlayer={this.changePlayer}
                        selectedPlayer={this.state.selectedPlayer}
                    />
                </Route>
                <Route path="/game">
                    <GameWrapper
                        selectedPlayer={this.state.selectedPlayer}
                    />
                </Route>
                <Route path="/stage-builder">
                    <StageBuilderWrapper />
                </Route>
                <Route path="/stages">
                    <StageList />
                </Route>
            </Router>
        );
    }

    handleKeyEvents = () => {
        document.addEventListener("keydown", (event: any) => {
            if (event.repeat){
                return
            }
            mapKeys(event.key, keyboard, true)
        } )
        document.addEventListener("keyup", (event: any) => {
            mapKeys(event.key, keyboard, false)
        } )
    }


    render(){
        return (
            <div style={{height: "100%", paddingRight: "0px", paddingLeft: "0px"}}>
                {this.renderState()}
            </div>
        )
    }
}
