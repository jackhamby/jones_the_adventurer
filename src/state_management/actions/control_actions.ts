import { ScreenOptions, PlayerOptionNames, UnitStatisticNames } from "../../types/enums";
import { Stage } from "../../classes/game_classes";
import { Effect } from "../../classes/interfaces";
import { Treasure } from "../../classes/treasure";

// export const TEXTURES_LOADED = 'UPDATE_TEXTURES_LOADED';
export const UPDATE_SCREEN: string = 'UPDATE_SCREEN'
export const UPDATE_CHARACTER: string = 'UPDATE_CHARACTER';
export const KEY_RELEASE: string = 'KEY_RELEASE';
export const KEY_PRESS: string = 'KEY_PRESS'
// export const CREATE_PLAYER: string = 'CREATE_PLAYER';
export const CHANGE_STAGE: string = 'CREATE_STAGE';
export const SETUP_GAME: string = 'SETUP_GAME';
export const APPLY_TREASURE: string = "APPLY_TREASURE";
export const UPDATE_STATS: string = "UPDATE_STATISTICS";



interface UpdateStatisticPayload {
    statistic: UnitStatisticNames;
    value: number;
}

interface ApplyTreasurePayload {
    treasure: Treasure;
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
    newCharacter: PlayerOptionNames;
}
interface ScreenResizePayload {
    height: number;
    width: number;
}




interface UpdateStatisticAction {
    type: typeof UPDATE_STATS;
    payload: UpdateStatisticPayload;
}

interface ApplyTreasureAction {
    type: typeof APPLY_TREASURE;
    payload: ApplyTreasurePayload;
}

interface StartGameAction {
    type: typeof SETUP_GAME;
    payload: StartGamePayload;
}

interface ChangeStageAction {
    type: typeof CHANGE_STAGE;
    payload: ChangeStagePayload;
}

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



export const updateStatistic = (statistic: UnitStatisticNames, value: number): UpdateStatisticAction => {
    return {
        type: UPDATE_STATS,
        payload: {
            statistic,
            value
        } as UpdateStatisticPayload
    }
}

export const applyTreasure = (treasure: Treasure): ApplyTreasureAction => {
    return {
        type: APPLY_TREASURE,
        payload: {
            treasure,
        }
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

export const updateScreen = (nextScreen: ScreenOptions): UpdateScreenAction => {
    return {
        type: UPDATE_SCREEN,
        payload: {
            newScreen: nextScreen
        }
    };
}

export const changeCharacter = (nextCharacter: PlayerOptionNames): ChangeCharacterAction => {
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
export type ControlAction = UpdateScreenAction & ChangeCharacterAction & UpdateKeyPressedAction & UpdateKeyReleasedAction & ChangeStageAction & StartGameAction  & ApplyTreasureAction & UpdateStatisticAction