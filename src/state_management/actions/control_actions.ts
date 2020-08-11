export const x = 2;

// import { ScreenOptions, PlayerOptionNames, UnitStatisticNames } from "../../types/enums";
// import { Stage } from "../../classes/game_classes";
// import { Effect } from "../../classes/interfaces";
// import { Treasure } from "../../classes/treasures/treasure";
// import { UnitStatistics } from "../../types/types";
// import { Armor } from "../../classes/armor";

// export const UPDATE_SCREEN: string = 'UPDATE_SCREEN'
// export const UPDATE_CHARACTER: string = 'UPDATE_CHARACTER';
// export const CHANGE_STAGE: string = 'CREATE_STAGE';
// export const SETUP_GAME: string = 'SETUP_GAME';
// export const APPLY_TREASURE: string = "APPLY_TREASURE";
// export const UPDATE_STATS: string = "UPDATE_STATISTICS";
// export const UPDATE_STATS_FULL: string = "UPDATE_STATISTICS_FULL";

// export const APPLY_ARMOR: string = "APPLY_ARMOR";


// interface ApplyArmorPayload {
//     armor: Armor;
// }

// interface UpdateStatisticsFullPayload {
//     stats: UnitStatistics;
// }

// interface UpdateStatisticPayload {
//     statistic: UnitStatisticNames;
//     value: number;
// }

// interface ApplyTreasurePayload {
//     treasure: Treasure;
// }

// interface StartGamePayload {
//     startingStage: Stage;
// }

// interface ChangeStagePayload {
//     stage: Stage;
// }
// interface UpdateKeyPressedPayload {
//     key: string;
// }
// interface UpdateScreenPayload {
//     newScreen: ScreenOptions;
// }
// interface ChangeCharacterPayload {
//     newCharacter: PlayerOptionNames;
// }




// interface ApplyArmorAction {
//     type: typeof APPLY_ARMOR;
//     payload: ApplyArmorPayload;
// }

// interface UpdateStatisticsFullAction {
//     type: typeof UPDATE_STATS_FULL,
//     payload: UpdateStatisticsFullPayload;
// }

// interface UpdateStatisticAction {
//     type: typeof UPDATE_STATS;
//     payload: UpdateStatisticPayload;
// }

// interface ApplyTreasureAction {
//     type: typeof APPLY_TREASURE;
//     payload: ApplyTreasurePayload;
// }

// interface StartGameAction {
//     type: typeof SETUP_GAME;
//     payload: StartGamePayload;
// }

// interface ChangeStageAction {
//     type: typeof CHANGE_STAGE;
//     payload: ChangeStagePayload;
// }

// interface ChangeCharacterAction {
//     type: typeof UPDATE_CHARACTER;
//     payload: ChangeCharacterPayload;
// }
// interface UpdateScreenAction {
//   type: typeof UPDATE_SCREEN;
//   payload: UpdateScreenPayload;
// }


// // export const 

// export  const updateStatistics = (stats: UnitStatistics): UpdateStatisticsFullAction => {
//     return {
//         type: UPDATE_STATS_FULL,
//         payload: {
//             stats,
//         } as UpdateStatisticsFullPayload
//     }
// }

// export const updateStatistic = (statistic: UnitStatisticNames, value: number): UpdateStatisticAction => {
//     return {
//         type: UPDATE_STATS,
//         payload: {
//             statistic,
//             value
//         } as UpdateStatisticPayload
//     }
// }

// export const applyTreasure = (treasure: Treasure): ApplyTreasureAction => {
//     return {
//         type: APPLY_TREASURE,
//         payload: {
//             treasure,
//         }
//     } 
// }


// // export const applyArmor = (armor: Armor): 

// export const setupGame = (stage: Stage) => {
//     return {
//         type: SETUP_GAME,
//         payload: {
//             startingStage: stage,
//         } as StartGamePayload
//     }
// }

// export const changeStage = (stage: Stage): ChangeStageAction => {
//     return {
//         type: CHANGE_STAGE,
//         payload: {
//             stage
//         }
//     }
// }

// export const updateScreen = (nextScreen: ScreenOptions): UpdateScreenAction => {
//     return {
//         type: UPDATE_SCREEN,
//         payload: {
//             newScreen: nextScreen
//         }
//     };
// }

// export const changeCharacter = (nextCharacter: PlayerOptionNames): ChangeCharacterAction => {
//     return {
//         type: UPDATE_CHARACTER,
//         payload: {
//             newCharacter: nextCharacter,
//         }
//     }
// }


// export type ControlAction = UpdateScreenAction & ChangeCharacterAction  & ChangeStageAction & StartGameAction  & ApplyTreasureAction & UpdateStatisticAction & UpdateStatisticsFullAction;