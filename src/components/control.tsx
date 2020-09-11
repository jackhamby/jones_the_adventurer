
import React from 'react';
import { ScreenOptions } from '../types/enums';
import { AppState, KeyOptions } from '../types/states';
import { mapKeys, getCanvasDimensions } from '../helpers/util';
import './global.css';
import { GameWrapper } from '../areas/game/game_wrapper';
import { Player } from '../classes/players/player';
import { PlayerSelectWrapper } from '../areas/player_select/player_select_wrapper';
import { MainMenu } from '../areas/main_menu/main_menu';

export const keyboard = {

} as KeyOptions;


interface ControlProps {
    initialState: AppState
}

interface ControlState {
    currentScreen: ScreenOptions;
    selectedPlayer: typeof Player;
}


export class Control extends React.Component<ControlProps, ControlState> {

    constructor(props: ControlProps){
        super(props);
        this.state = {
            currentScreen: props.initialState.controlState.currentScreen,
            selectedPlayer: props.initialState.playerState.player,
        }
    }

    updateScreen = (screen: ScreenOptions) => {
        this.setState({currentScreen: screen})
    }

    changePlayer = (player: typeof Player) => {
        this.setState({ selectedPlayer: player });
    }

    componentDidMount(){
        this.handleKeyEvents();
        this.handleResizeEvents();
    }

    renderState = () => {
        const props = {} as any;
        switch(this.state.currentScreen){
            // case(ScreenOptions.MAIN_MENU):
            //     return <MainMenu updateScreen={this.updateScreen}/>;
            // case(ScreenOptions.CHARACTER_SELECT):
            //     return <PlayerSelectWrapper
            //                 updateScreen={this.updateScreen} 
            //                 changePlayer={this.changePlayer}
            //                 selectedPlayer={this.state.selectedPlayer}
            //             />
            // case(ScreenOptions.GAME):
            //     return <GameWrapper
            //                 pixiApplication={this.props.initialState.gameState.pixiApplication}
            //                 selectedPlayer={this.state.selectedPlayer}
            //             />
            // default:
            //     return (<div> There was an error </div>);
            default: 
                return <GameWrapper
                            pixiApplication={this.props.initialState.gameState.pixiApplication}
                            selectedPlayer={this.state.selectedPlayer}
                        />
        }
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

    handleResizeEvents = () => {
        window.addEventListener('resize', (event) => {
            const canvasDimensions = getCanvasDimensions();
            this.props.initialState.gameState.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height);
        })
    }

    render(){
        return (
            <div className="container" style={{height: "100%", paddingRight: "0px", paddingLeft: "0px"}}>
                {this.renderState()}
            </div>
        )
    }
}
