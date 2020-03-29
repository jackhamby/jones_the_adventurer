


import { ControlAction, UPDATE_SCREEN, UPDATE_CHARACTER, KEY_PRESS, KEY_RELEASE, CHANGE_STAGE, SETUP_GAME, APPLY_TREASURE, UPDATE_STATS} from '../actions/control_actions';
import { AppState, ControlState, PlayerState, Character, KeyOptions, GameState } from '../../types/states';
import {CHARACTER_ATTRIBUTES} from '../../constants';
import { Treasure } from '../../classes/treasure';


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
    const temp = state as AppState;
    switch(action.type){

        case UPDATE_STATS:
            return {
                ...temp
            };


        case APPLY_TREASURE:
            // player.attributes[this.effect.attribute] += this.effect.value;
            // if (this.effect.textureEffect){
            //     const affectedBodyPart = this.effect.textureEffect.bodyPart;
            //     const newArmorType = this.effect.textureEffect.armorType;
            //     const newTexture = player.textures[affectedBodyPart][newArmorType][player.state];
            //     const spritePart = player.spriteParts[affectedBodyPart].sprite;
            //     spritePart.texture = newTexture;
            // }
            // player.treasures.push(this);
            // temp.gameState.currentStage.player.treasures = []
            // temp.gameState.currentStage.player.treasures.push(action.payload.)

            const player = temp.gameState.currentStage.player;
            Treasure.apply(player, action.payload.treasure);

            
            return {
                ...state,
                gameState: {
                    ...temp.gameState
                }
            };

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