
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { ScreenOptions } from '../types/enums';
import { AppState, KeyOptions } from '../types/states';
import { updateScreen } from '../state_management/actions/control_actions';
import { AnyAction } from 'redux';
import { ConnectedGame } from '../areas/game/game_wrapper';
import { getCanvasDimensions, mapKeys } from '../helpers/util';
import './global.css';
import { SinglePlayerMenuWrapper } from '../areas/single_player_menu/single_player_menu_wrapper';
import { ConnectedCharacterSelectWrapper } from '../areas/character_select/character_select_wrapper';
import { ConnectedMainMenu } from '../areas/main_menu/main_menu_wrapper';

export interface ControlStateProps {
    currentScreen: ScreenOptions;
    pixiApplication: PIXI.Application;
 };

export const keyboard = {

} as KeyOptions;

export interface ControlDispatchProps { 
    updateScreen: (nextScreen: ScreenOptions) => void;
    updateKeyPress: (key: string) => void;
    updateKeyRelease: (key: string) => void;
};

export type ControlProps = ControlDispatchProps & ControlStateProps;

export class Control extends React.Component<ControlProps, {}> {

    componentDidMount(){
        this.handleKeyEvents();
        this.handleResizeEvents();
    }

    renderState = () => {
        const props = {} as any;
        switch(this.props.currentScreen){
            // case(ScreenOptions.MAIN_MENU):
            //     return <ConnectedMainMenu/>
            // case(ScreenOptions.CHARACTER_SELECT):
            //     return <ConnectedCharacterSelectWrapper {...props}/>
            // case(ScreenOptions.SINGLE_PLAYER_MENU):
            //     return <SinglePlayerMenuWrapper/>
            // case(ScreenOptions.GAME):
            //     return <ConnectedGame/>
            // default:
            //     return (<div> There was an error </div>)
            default:
                return (<ConnectedGame/>)
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
            this.props.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height)
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


export const mapStateToProps = (state: AppState): ControlStateProps => {
    return {
        currentScreen: state.controlState.currentScreen,
        pixiApplication: state.gameState.pixiApplication,
    } as ControlStateProps;

}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ControlDispatchProps => {
    return { 
        updateScreen: (nextScreen: ScreenOptions) => {
            dispatch(updateScreen(nextScreen));
        }
    } as ControlDispatchProps;
}

export const ConnectedControl = connect(mapStateToProps, mapDispatchToProps)(Control);