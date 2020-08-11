// import { StageManager, Stage } from "./game_classes";
import { getCanvasDimensions } from "../helpers/util";
import { Viewport } from "pixi-viewport";
import * as PIXI from 'pixi.js';
import { Player } from "./players/player";
import { UnitAttributes } from "../types/types";
// import { Character } from "../types/states";
import { PlayerOptionNames, UnitPartNames } from "../types/enums";
import { Knight } from "./players/knight";
import { Kobold } from "./players/kobold";
// import { store } from "../state_management/store";
// import { setupGame, ControlAction, changeStage } from "../state_management/actions/control_actions";
import { keyboard } from "../components/control";
import * as Constants from '../types/constants';
import { Orc } from "./players/orc";
import { StageManager } from "./stages/stage_manager";
import { Stage } from "./stages/stage";

export class GameController {

    pixiApplication: PIXI.Application;
    viewport: Viewport;
    player: Player;
    stageManager: StageManager;
    currentStage: Stage;

    // game_wrapper call backs
    startGame: Function;

    // User actions
    keepPlaying: boolean;

    constructor(pixiApplication: PIXI.Application, startGame: Function){
        this.pixiApplication = pixiApplication;
        this.viewport = this.createViewport();
        this.player = {} as Player;
        this.stageManager = {} as StageManager;
        this.currentStage = {} as Stage;
        this.keepPlaying = false;
        this.startGame = startGame;
    }

    // updatePlayerReference = (newPlayerReference: Player) => {
    //     this.player = newPlayerReference;
    //     this.stageManager.player = newPlayerReference;
    //     this.currentStage.player = newPlayerReference;
    // }

    start = () => {
        this.pixiApplication.ticker.start();
    }

    stop = () => {
        this.pixiApplication.ticker.stop();
    }

    setupAndStartGame(startingPlayer: typeof Player){
        this.loadTextures(startingPlayer);        
    }

    update(delta: number){
        if (this.currentStage.needsRestart){
            this.restartStage(this.currentStage.level);
        }
        this.currentStage.update(keyboard);
        if (this.currentStage.isCleared && !this.keepPlaying){
            const response: boolean = window.confirm(`nice work cheeseman, you beat stage ${this.currentStage.level} in ${this.currentStage.timer.timerText}. continue to the next stage?`);
            if (response){
                this.advanceStage();
            } else {
                this.keepPlaying = true;
            }
        }
    }

    setupGame(startingPlayer: typeof Player){
        // Create player
        this.setupPlayer(startingPlayer)

        // Create stage manager
        this.stageManager = new StageManager(this.pixiApplication.loader, this.player, this.viewport);

        // Create first stage
        const stageOne = this.stageManager.getStage(1);
        this.player.currentStage = stageOne;
        this.currentStage = stageOne;
        this.stageManager.loadStage(stageOne);

        // Start game loop
        this.pixiApplication.ticker.add(delta => this.gameLoop(delta));

        this.startGame();
        // Update redux to show gameState.gameReady as true
        // const setupGameAction = setupGame(stageOne);
        // store.dispatch(setupGameAction as ControlAction);
    }

    changeStage(level: number){
        // Remove sprites from view port
        this.stageManager.clearStage();

        // Get next stage
        const nextStage = this.stageManager.getStage(level);
        nextStage.startingTreasures = this.currentStage.player.treasures;
        this.player.currentStage = nextStage;
        this.currentStage = nextStage;

        this.player.setX(Constants.PLAYER_STARTING_X);
        this.player.setY(Constants.PLAYER_STARTING_Y);

        // Load stage
        this.stageManager.loadStage(nextStage);
    }

    advanceStage = () => {
        const nextLevel = this.currentStage.level + 1;
        this.changeStage(nextLevel);
    }

    restartStage(level: number){
        // Set stage with players current treasures
        const startingTreasures = this.player.currentStage.startingTreasures;

        // recreate restarted stage
        const restartedStage = this.stageManager.getStage(level);
        this.player.currentStage = restartedStage;
        restartedStage.startingTreasures = startingTreasures;
        this.currentStage = restartedStage;

        // clear and load stage
        this.stageManager.clearStage();
        this.stageManager.loadStage(restartedStage);

        // Update redux to show gameState.gameReady as true
        // const changeStageAction = changeStage(restartedStage);
        // store.dispatch(changeStageAction as ControlAction);
    }

    private gameLoop(delta: number): void {
        this.update(delta);
        // this.updatePlayerStatistics();
    }

    private createViewport(): Viewport{ 
        const dimensions = getCanvasDimensions()
        const viewport = new Viewport({
            screenWidth: dimensions.width,
            screenHeight: dimensions.height
        })
        viewport.sortableChildren = true;
        this.pixiApplication.renderer.backgroundColor = 0xadd8e6;  
        this.pixiApplication.stage.addChild(viewport);
        return viewport;
    }

    private setupPlayer(initialPlayer: typeof Player){
        const player = this.createPlayer(initialPlayer);
        this.player = player;
        this.viewport.follow(player.spriteParts[UnitPartNames.HEAD].sprite);
    }

    private createPlayer(initialPlayer: typeof Player): Player{
        let newPlayer: Player;
        let attributes: UnitAttributes;
        const loader = this.pixiApplication.loader;
        newPlayer = new initialPlayer(loader, {} as Stage, initialPlayer.baseAttributes, initialPlayer.width, initialPlayer.height, Constants.PLAYER_STARTING_X, Constants.PLAYER_STARTING_Y);
        // switch(character.name){
        //     case(PlayerOptionNames.KNIGHT):
        //         attributes = character.attributes;
        //         newPlayer = new Knight(loader, {} as Stage, attributes, 100, 100);
        //         break;
        //     case(PlayerOptionNames.KOBOLD):
        //         attributes = character.attributes;
        //         newPlayer = new Kobold(loader, {} as Stage, attributes, 100, 100);
        //         break;
        //     case(PlayerOptionNames.ORC):
        //         attributes = character.attributes;
        //         newPlayer = new Orc(loader, {} as Stage, attributes, 100, 100);
        //         break;
        //     default:
        //         throw "unknown character name";
        // }
        return newPlayer
    }

    private loadTextures(player: typeof Player){
        this.pixiApplication.loader

            // add platform tetures
            .add('default-platform', 'images/platforms/platform1.png')
            .add('dirt-platform', 'images/platforms/dirt.png')
            .add('grass-platform', 'images/platforms/grass.png')
            .add('red-grass-platform', 'images/platforms/red_grass.png')
            .add('sand-rock-platform', 'images/platforms/sand_rock.png')


            // coin textures
            .add('coins-small', 'images/coins/coins.png')

            // Knight
            .add('knight-head-default', "images/knight/head/head_default.png")
            .add('knight-head-armor1', "images/knight/head/head_armor1.png")
            .add('knight-head-armor2', "images/knight/head/head_armor2.png")

            // Add body textures
            .add('knight-body-default', "images/knight/body/body_default.png")
            .add('knight-body-armor1', "images/knight/body/body_armor1.png")

            // Add leg textures
            .add('knight-legs-default', "images/knight/legs/legs_default.png")
            .add('knight-legs-armor1', "images/knight/legs/legs_armor1.png")

            // Add treasures images
            .add('treasure-base', "images/treasures/treasure_base.png")

            // Add enemy images
            .add('kobold-standing', "images/enemies/kobold/kobold_standing.png")

            // Add projectile images2
            .add('rock', 'images/projectiles/rock.png')
            .add('arrow', 'images/projectiles/dart.png')
            .add('stinger', 'images/projectiles/stinger.png')
            .add('axe', 'images/projectiles/axe.png')

            // Kobold
            .add('kobold-legs-default', "images/kobold/legs/legs_default.png")
            .add('kobold-legs-armor1', "images/kobold/legs/legs_armor1.png")

            .add('kobold-head-default', "images/kobold/head/head_default.png")
            .add('kobold-head-armor1', "images/kobold/head/head_armor1.png")
            .add('kobold-head-armor2', "images/kobold/head/head_armor2.png")
            .add('kobold-head-armor3', "images/kobold/head/head_armor3.png")

            .add('kobold-body-default', "images/kobold/body/body_default.png")
            .add('kobold-body-armor1', "images/kobold/body/body_armor1.png")
            .add('kobold-body-armor2', "images/kobold/body/body_armor2.png")

            // Orc
            .add('orc-legs-default', "images/orc/legs/legs_default.png")
            .add('orc-legs-armor1', "images/orc/legs/legs_armor1.png")

            .add('orc-body-default', "images/orc/body/body_default.png")
            .add('orc-body-armor1', "images/orc/body/body_armor1.png")

            .add('orc-head-default', "images/orc/head/head_default.png")
            .add('orc-head-armor1', "images/orc/head/head_armor1.png")
            .add('orc-head-armor2', "images/orc/head/head_armor2.png")

            // Manticore 
            .add('manticore-legs-default', "images/manticore/legs/legs_default.png")
            .add('manticore-body-default', "images/manticore/body/body_default.png")
            .add('manticore-head-default', "images/manticore/head/head_default.png")

            // Once textures have loaded, fire this method
            .load(() => {
                this.setupGame(player);
            });
    }
}