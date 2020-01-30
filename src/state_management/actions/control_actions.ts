import { ScreenOptions, CharacterOptions } from "../../types/enums";
import { Stage } from "../../classes/game_classes";
import { Player } from "../../classes/player";

// export const TEXTURES_LOADED = 'UPDATE_TEXTURES_LOADED';
export const UPDATE_SCREEN: string = 'UPDATE_SCREEN'
export const UPDATE_CHARACTER: string = 'UPDATE_CHARACTER';
export const KEY_RELEASE: string = 'KEY_RELEASE';
export const KEY_PRESS: string = 'KEY_PRESS'
// export const CREATE_PLAYER: string = 'CREATE_PLAYER';
export const CHANGE_STAGE: string = 'CREATE_STAGE';
export const SETUP_GAME: string = 'SETUP_GAME';
export const UPDATE_PLAYER_POSITION: string = 'UPDATE_PLAYER_POSITION';

interface UpdatePlayerPositionPayload {
    x: number;
    y: number;
}

interface StartGamePayload {
    startingStage: Stage;
}

interface ChangeStagePayload {
    stage: Stage;
}
interface UpdateKeyPressedPayload {
    key: string;
}
interface UpdateKeyReleasedPayload {
    key: string;
}
interface UpdateScreenPayload {
    newScreen: ScreenOptions;
}
interface ChangeCharacterPayload {
    newCharacter: CharacterOptions;
}
// interface CreatePlayerPayload {
//     sprite: PIXI.Sprite;
// }




interface UpdatePlayerPositionAction {
    type: typeof UPDATE_PLAYER_POSITION
    payload: UpdatePlayerPositionPayload;
}

interface StartGameAction {
    type: typeof SETUP_GAME;
    payload: StartGamePayload;
}

interface ChangeStageAction {
    type: typeof CHANGE_STAGE;
    payload: ChangeStagePayload;
}

// interface CreatePlayerAction {
//     type: typeof CREATE_PLAYER
//     payload: CreatePlayerPayload;
// }
interface ChangeCharacterAction {
    type: typeof UPDATE_CHARACTER;
    payload: ChangeCharacterPayload;
}
interface UpdateScreenAction {
  type: typeof UPDATE_SCREEN;
  payload: UpdateScreenPayload;
}
interface UpdateKeyPressedAction {
    type: typeof KEY_PRESS;
    payload: UpdateKeyPressedPayload;
}
interface UpdateKeyReleasedAction {
    type: typeof KEY_RELEASE;
    payload: UpdateKeyPressedPayload;
}
// interface TexturesLoadedAction {
//     type: typeof TEXTURES_LOADED;

// }


export const updatePlayerPosition = (x: number, y: number): UpdatePlayerPositionAction => {
    return {
        type: UPDATE_PLAYER_POSITION,
        payload: {
            x,
            y
        } as UpdatePlayerPositionPayload
    }
}

export const setupGame = (stage: Stage) => {
    return {
        type: SETUP_GAME,
        payload: {
            startingStage: stage,
        } as StartGamePayload
    }
}

export const changeStage = (stage: Stage): ChangeStageAction => {
    return {
        type: CHANGE_STAGE,
        payload: {
            stage
        }
    }
}

// export const createPlayer = (loader: PIXI.Sprite): CreatePlayerAction => {
//     return {
//         type: CREATE_PLAYER,
//         payload: {
//             loader,
//         }
//     };
// }

export const updateScreen = (nextScreen: ScreenOptions): UpdateScreenAction => {
    return {
        type: UPDATE_SCREEN,
        payload: {
            newScreen: nextScreen
        }
    };
}

// export const texturesLoaded = (): TexturesLoadedAction => {
//     return {
//         type: TEXTURES_LOADED,
//     }
// }

export const changeCharacter = (nextCharacter: CharacterOptions): ChangeCharacterAction => {
    return {
        type: UPDATE_CHARACTER,
        payload: {
            newCharacter: nextCharacter,
        }
    }
}

export const updateKeyPressed = (key: string): UpdateKeyPressedAction => {
    return {
        type: KEY_PRESS,
        payload: {
            key,
        }
    }
}


export const updateKeyReleased = (key: string): UpdateKeyReleasedAction => {
    return {
        type: KEY_RELEASE,
        payload: {
            key,
        }
    }
}
export type ControlAction = UpdateScreenAction & ChangeCharacterAction & UpdateKeyPressedAction & UpdateKeyReleasedAction & ChangeStageAction & StartGameAction & UpdatePlayerPositionAction;