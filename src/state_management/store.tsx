
import * as PIXI from 'pixi.js';
import { controlReducer } from './reducers/control_reducer';
import { createStore } from 'redux'
import { create } from 'istanbul-reports';
import { AppState, ControlState, PlayerState, Character, KeyOptions } from '../types/states';
import { ScreenOptions, CharacterOptions } from '../types/enums';
import { CHARACTER_ATTRIBUTES, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants';



const initialState = {
    controlState: {
        currentScreen: ScreenOptions.MAIN_MENU,
        currentKeys: {} as KeyOptions
    } as ControlState,
    playerState: {
        character: {
            name: CharacterOptions.KOBOLD,
            attributes: CHARACTER_ATTRIBUTES[CharacterOptions.KOBOLD]
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
