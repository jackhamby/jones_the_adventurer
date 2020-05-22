


import { ControlAction, UPDATE_SCREEN, UPDATE_CHARACTER, KEY_PRESS, KEY_RELEASE, CHANGE_STAGE, SETUP_GAME, APPLY_TREASURE, UPDATE_STATS} from '../actions/control_actions';
import { AppState, ControlState, PlayerState, Character, KeyOptions, GameState } from '../../types/states';
import { Treasure } from '../../classes/treasure';
import { PlayerOptionNames } from '../../types/enums';
import { PlayerOptions } from '../../types/types';
import { Kobold } from '../../classes/kobold';
import { Knight } from '../../classes/knight';

export const PLAYER_OPTIONS = {
    knight: Knight,
    kobold: Kobold,
} as PlayerOptions;


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
            break;
        case 'ArrowRight':
            newKeyOptions.attackRight = toggle;
            break;
        case 'ArrowLeft':
            newKeyOptions.attackLeft = toggle;
            break;
        case 'ArrowUp':
            newKeyOptions.attackUp = toggle;
            break;

        case 'ArrowDown':
            newKeyOptions.attackDown = toggle;
            break;
        default:
            // unhandled key action
            break;
    }
    return newKeyOptions

}

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


        case APPLY_TREASURE:
            // player.attributes[this.effect.attribute] += this.effect.value;
            // if (this.effect.textureEffect){
            //     const affectedBodyPart = this.effect.textureEffect.bodyPart;
            //     const newArmorType = this.effect.textureEffect.armorType;
            //     const newTexture = player.textures[affectedBodyPart][newArmorType][player.typedState];
            //     const spritePart = player.spriteParts[affectedBodyPart].sprite;
            //     spritePart.texture = newTexture;
            // }
            // player.treasures.push(this);
            // typedState.gameState.currentStage.player.treasures = []
            // typedState.gameState.currentStage.player.treasures.push(action.payload.)
            // debugger;
            const player = typedState.gameState.currentStage.player;
            Treasure.apply(player, action.payload.treasure);
            // debugger;

            
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
        case KEY_PRESS:
            console.log('still here')
            return {
                ...typedState,
                controlState: {
                    ...typedState.controlState,
                    currentKeys: mapKeys(action.payload.key, typedState.controlState.currentKeys, true)
                } as ControlState
            }
        case KEY_RELEASE:
            return {
                ...typedState,
                controlState: {
                    ...typedState.controlState,
                    currentKeys: mapKeys(action.payload.key, typedState.controlState.currentKeys, false)
                } as ControlState
            }
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