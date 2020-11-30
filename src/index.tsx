
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { store } from './state_management/store';
import { Control } from './components/control';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from 'react-redux'
import { ControlState, KeyOptions, PlayerState, AppState } from './types/states';
import { ScreenOptions, PlayerOptionNames } from './types/enums';
// import { SCREEN_WIDTH, SCREEN_HEIGHT, PLAYER_OPTIONS } from './types/constants';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './types/constants';

import * as PIXI from 'pixi.js'
import { Kobold } from './classes/players/kobold';
import { Knight } from './classes/players/knight';
import { Orc } from './classes/players/orc';
// import { Player } from './classes/players/player';
// import { Kobold } from './classes/players/kobold';
// import { Orc } from './classes/players/orc';
// import { Unit } from './classes/unit';
// import { Kobold } from './classes/players/kobold';
// import { Orc } from './classes/players/orc';
// import { Knight } from './classes/players/knight';
// import { PlayerOptions } from './types/types';

// export const PLAYER_OPTIONS = {
//     knight: Knight,
//     kobold: Kobold,
//     orc: Orc,
// } as PlayerOptions;
// var dd = Unit;
// var t = Player;
// var p = Kobold;
// var j = Orc;

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
        // character: {
        //     name: PlayerOptionNames.ORC,  // Default to kobold 
        //     attributes: PLAYER_OPTIONS[PlayerOptionNames.ORC].baseAttributes,
        // } as Character
        player:  Kobold,
        // character: {
        //     name: PlayerOptionNames.KNIGHT,  // Default to knight 
        //     // attributes: PLAYER_OPTIONS[PlayerOptionNames.KNIGHT].baseAttributes,
        // } as Character
    } as PlayerState,
    gameState: {
        pixiApplication: new PIXI.Application({ 
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,               
            antialias: true, 
            transparent: false, 
            resolution: 1
        }),
    }
} as AppState;


ReactDOM.render(
    // <Provider store={store}>
        <Control initialState={initialState}/>
    // </Provider>
, document.getElementById('root'));

