
import React from 'react';
import { ScreenOptions, PlayerOptionNames } from '../types/enums';
import { AppState, KeyOptions } from '../types/states';
// import { updateScreen } from '../state_management/actions/control_actions';
// import { ConnectedGame } from '../areas/game/game_wrapper';
import { mapKeys } from '../helpers/util';
import './global.css';
import { MainMenu } from '../areas/main_menu/main_menu';
import { PlayerSelectWrapper }  from '../areas/player_select/player_select_wrapper';
import { SinglePlayerMenuWrapper } from '../areas/single_player_menu/single_player_menu_wrapper';
import { GameWrapper } from '../areas/game/game_wrapper';
import { Player } from '../classes/players/player';
// import { SinglePlayerMenuWrapper } from '../areas/single_player_menu/single_player_menu_wrapper';
// import { ConnectedCharacterSelectWrapper } from '../areas/character_select/character_select_wrapper';
// import { ConnectedMainMenu } from '../areas/main_menu/main_menu_wrapper';

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
            //                 // keyboard={this.props.initialState.controlState.currentKeys}
            //                 selectedPlayer={this.state.selectedPlayer}
            //                 // currentStage={this.props.initialState.gameState.currentStage}
            //                 // isReady={this.props.initialState.gameState.gameReady}
            //             />
            // default:
            //     return (<div> There was an error </div>);
            default: 
                return <GameWrapper
                            pixiApplication={this.props.initialState.gameState.pixiApplication}
                            // keyboard={this.props.initialState.controlState.currentKeys}
                            selectedPlayer={this.state.selectedPlayer}
                            // currentStage={this.props.initialState.gameState.currentStage}
                            // isReady={this.props.initialState.gameState.gameReady}
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
        // window.addEventListener('resize', (event) => {
        //     const canvasDimensions = getCanvasDimensions();
        //     this.props.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height)
        // })
    }

    render(){
        return (
            <div className="container" style={{height: "100%", paddingRight: "0px", paddingLeft: "0px"}}>
                {this.renderState()}
            </div>
        )
    }
}


// export const mapStateToProps = (state: AppState): ControlStateProps => {
//     return {
//         currentScreen: state.controlState.currentScreen,
//         pixiApplication: state.gameState.pixiApplication,
//     } as ControlStateProps;

// }

// export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ControlDispatchProps => {
//     return { 
//         updateScreen: (nextScreen: ScreenOptions) => {
//             dispatch(updateScreen(nextScreen));
//         }
//     } as ControlDispatchProps;
// }

// export const ConnectedControl = connect(mapStateToProps, mapDispatchToProps)(Control);