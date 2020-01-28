


import { ControlAction, UPDATE_SCREEN, UPDATE_CHARACTER, KEY_PRESS, KEY_RELEASE, CHANGE_STAGE, SETUP_GAME} from '../actions/control_actions';
import { AppState, ControlState, PlayerState, Character, KeyOptions, GameState } from '../../types/states';
import {CHARACTER_ATTRIBUTES} from '../../constants';
import { Player } from '../../classes/player';




const mapKeys = (key: string, prevKeyOptions: KeyOptions, toggle: boolean): KeyOptions => {
    const newKeyOptions = {...prevKeyOptions};
    switch(key){
        case 'a':
            newKeyOptions.moveLeft = toggle;
            break;
        case 'd':
            newKeyOptions.moveRight = toggle;
            break;
        case 'w':
            newKeyOptions.moveUp = toggle;
            break;
        case 's': 
            newKeyOptions.moveDown = toggle;
            break;
        case ' ':
            newKeyOptions.jump = toggle;
        default:
            // unhandled key action
            break;
    }
    return newKeyOptions

}

export const controlReducer = (state: any, action: ControlAction): any => {
    switch(action.type){
        case UPDATE_SCREEN:
            return { 
                ...state,
                controlState: {
                    ...state.controlState,
                    currentScreen: action.payload.newScreen
                } as ControlState
            };
        case UPDATE_CHARACTER:
            return {
                ...state,
                playerState: {
                    character: {
                        name: action.payload.newCharacter,
                        attributes: CHARACTER_ATTRIBUTES[action.payload.newCharacter]
                    } as Character
                } as PlayerState
            };
        case KEY_PRESS:
            return {
                ...state,
                controlState: {
                    ...state.controlState,
                    currentKeys: mapKeys(action.payload.key, state.controlState.currentKeys, true)
                } as ControlState
            }
        case KEY_RELEASE:
            return {
                ...state,
                controlState: {
                    ...state.controlState,
                    currentKeys: mapKeys(action.payload.key, state.controlState.currentKeys, false)
                } as ControlState
            }
        // case CREATE_PLAYER:
        //     var action = action;
        //     return {
        //         ...state,
        //         gameState: {
        //             ...state.gameState,
        //             player: new Player(action.payload.loader)
        //         } as GameState
        //     }
        case CHANGE_STAGE:
            return {
                ...state,
                gameState : {
                    ...state.gameState,
                    currentStage: action.payload.stage
                } as GameState
            } 

        case SETUP_GAME:
            
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    gameReady: true,
                    currentStage: action.payload.startingStage,
                } as GameState
            }
        default:
            return state;
    }
}