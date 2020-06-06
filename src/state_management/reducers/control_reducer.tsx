


import { ControlAction, UPDATE_SCREEN, UPDATE_CHARACTER, CHANGE_STAGE, SETUP_GAME, APPLY_TREASURE, UPDATE_STATS, UPDATE_STATS_FULL} from '../actions/control_actions';
import { AppState, ControlState, PlayerState, Character, KeyOptions, GameState } from '../../types/states';
import { Treasure } from '../../classes/treasure';
import { PlayerOptions } from '../../types/types';
import { Kobold } from '../../classes/kobold';
import { Knight } from '../../classes/knight';

export const PLAYER_OPTIONS = {
    knight: Knight,
    kobold: Kobold,
} as PlayerOptions;

export const controlReducer = (state: any, action: ControlAction): any => {
    const typedState = state as AppState;
    switch(action.type){

        case UPDATE_STATS:
            const newStatstics = {
                ...typedState.gameState.currentStage.player.statistics,
            }
            newStatstics[action.payload.statistic] = action.payload.value;
            typedState.gameState.currentStage.player.statistics = newStatstics;
            return {
                ...typedState,
                
            } as AppState;

        case UPDATE_STATS_FULL:
            typedState.gameState.currentStage.player.statistics = {
                ...action.payload.stats
            };
            return {
                ...typedState
            }

        case APPLY_TREASURE:
            const player = typedState.gameState.currentStage.player;
            Treasure.apply(player, action.payload.treasure);

            
            return {
                ...typedState,
                gameState: {
                    ...typedState.gameState
                }
            };

        case UPDATE_SCREEN:
            return { 
                ...typedState,
                controlState: {
                    ...typedState.controlState,
                    currentScreen: action.payload.newScreen
                } as ControlState
            };
        case UPDATE_CHARACTER:
            return {
                ...typedState,
                playerState: {
                    character: {
                        name: action.payload.newCharacter,
                        attributes: PLAYER_OPTIONS[action.payload.newCharacter].baseAttributes,
                    } as Character
                } as PlayerState
            };
        case CHANGE_STAGE:
            return {
                ...typedState,
                gameState : {
                    ...typedState.gameState,
                    currentStage: action.payload.stage
                } as GameState
            } 
        case SETUP_GAME:
            
            return {
                ...typedState,
                gameState: {
                    ...typedState.gameState,
                    gameReady: true,
                    currentStage: action.payload.startingStage,
                } as GameState
            }
        default:
            return typedState;
    }
}