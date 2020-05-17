
import * as PIXI from 'pixi.js';
import { controlReducer, PLAYER_OPTIONS } from './reducers/control_reducer';
import { createStore } from 'redux'
import { create } from 'istanbul-reports';
import { AppState, ControlState, PlayerState, Character, KeyOptions } from '../types/states';
import { ScreenOptions, PlayerOptionNames } from '../types/enums';
import { SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';
import { Kobold2 } from '../classes/enemy';



const initialState = {
    controlState: {
        currentScreen: ScreenOptions.MAIN_MENU,
        currentKeys: {} as KeyOptions
    } as ControlState,
    playerState: {
        // default charater
        // character: {
        //     name: PlayerOptionNames.KOBOLD,  // Default to kobold 
        //     attributes: PLAYER_OPTIONS[PlayerOptionNames.KOBOLD].baseAttributes,
        // } as Character
        character: {
            name: PlayerOptionNames.KNIGHT,  // Default to kobold 
            attributes: PLAYER_OPTIONS[PlayerOptionNames.KNIGHT].baseAttributes,
        } as Character
    } as PlayerState,
    gameState: {
        pixiApplication: new PIXI.Application({ 
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,               
            antialias: true, 
            transparent: false, 
            resolution: 1
        })
    }
} as AppState;

export const store = createStore(controlReducer, initialState, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
