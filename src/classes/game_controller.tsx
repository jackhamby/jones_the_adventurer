import { getCanvasDimensions, loadTextures } from "../helpers/util";
import { Viewport } from "pixi-viewport";
import * as PIXI from 'pixi.js';
import { Player } from "./players/player";
import { UnitPartNames } from "../types/enums";
import { keyboard } from "../components/control";
import * as Constants from '../types/constants';
import * as Stages from '../types/stages';
import { Stage } from "./stage/stage";
import { Spell } from "./spells/spell";
import { FireBall, FireBallMedium } from "./spells/projectile_spell";
import { FastFire } from "./spells/buff_spell";
import { Unit } from "./unit";
import { DirtPlatform } from "./platform";
import { Kobold } from "./enemies/kobold";
import { StageManager } from "./stage/stage_manager";


// Initialize game data
// Main game loop
// Stage management
export class GameController {

    pixiApplication: PIXI.Application;
    viewport: Viewport;
    player: Player;
    currentStage: Stage;
    stageManager: StageManager;

    // game_wrapper call backs
    startGame: Function;
    updateView: Function;

    // User actions
    keepPlaying: boolean;

    constructor(startGame: Function){
        this.pixiApplication = new PIXI.Application({ 
            width: Constants.SCREEN_WIDTH,
            height: Constants.SCREEN_HEIGHT,             
            antialias: true, 
            transparent: false, 
            resolution: 1
        });
        this.viewport = this.createViewport();
        this.player = {} as Player;
        this.currentStage = {} as Stage;
        this.keepPlaying = false;
        this.startGame = startGame;
        this.updateView = () => {
            console.warn('updateView has not been defined')
        }
    }

    start = () => {
        this.pixiApplication.ticker.start();
    }

    stop = () => {
        this.pixiApplication.ticker.stop();
    }

    setupAndStartGame(startingPlayer: typeof Player){
        this.load(startingPlayer);        
    }

    changeStage(level: number){
        // // Remove sprites from view port
        this.currentStage.clear();

        // Get next stage
        const nextStage = this.stageManager.getStage(level);
        nextStage.startingTreasures = this.currentStage.player.treasures;
        this.player.currentStage = nextStage;
        this.currentStage = nextStage;

        this.player.setX(Constants.PLAYER_STARTING_X);
        this.player.setY(Constants.PLAYER_STARTING_Y);

        // Load stage
        this.currentStage.load();
        // window.alert('chamge stage')
    }

    advanceStage = () => {
        const nextLevel = this.currentStage.level + 1;
        this.changeStage(nextLevel);
    }

    restartStage(level: number){
        // window.alert('restarted stage')
        // // Set stage with players current treasures
        const startingTreasures = this.player.currentStage.startingTreasures;

        // recreate restarted stage
        const restartedStage = this.stageManager.getStage(level);
        this.player.currentStage = restartedStage;
        restartedStage.startingTreasures = startingTreasures;
        this.currentStage = restartedStage;

        // clear and load stage
        this.currentStage.clear();
        this.currentStage.load();
    }

    // ================================== private methods ===========================================================
    // ===============================================================================================================  
    private setupGame(startingPlayer: typeof Player){
        // Create player
        this.setupPlayer(startingPlayer)

        // Allow player to update the view
        this.player.updateView = this.updateView;

        this.stageManager = new StageManager(this.viewport, this.player, this.pixiApplication.loader);
        const stage1 = this.stageManager.getStage(1);
        this.player.currentStage = stage1;
        this.currentStage = stage1;
        this.currentStage.load();

        // Start game loop
        this.pixiApplication.ticker.add(delta => this.gameLoop(delta));

        this.startGame();
    }

    private update(delta: number){
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

    private gameLoop(delta: number): void {
        this.update(delta);
    }

    private createViewport(): Viewport{ 
        const dimensions = getCanvasDimensions()
        const viewport = new Viewport({
            screenWidth: dimensions.width,
            screenHeight: dimensions.height,
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
        const loader = this.pixiApplication.loader;
        newPlayer = new initialPlayer(loader, {} as Stage, initialPlayer.baseAttributes, initialPlayer.width, initialPlayer.height, Constants.PLAYER_STARTING_X, Constants.PLAYER_STARTING_Y);
        newPlayer.spells.push(this.getRandomSpell(newPlayer));
        return newPlayer
    }

    private getRandomSpell(unit: Unit): Spell {
        const spellOptions = [FireBall, FireBallMedium, FastFire];
        const randomIndex = Math.floor(Math.random() * 10) % (spellOptions.length - 1);
        const randomSpell = spellOptions[randomIndex];

        return new randomSpell(unit);
    }

    private handleResizeEvents = () => {
        window.addEventListener('resize', (event) => {
            const canvasDimensions = getCanvasDimensions();
            this.pixiApplication.renderer.resize(canvasDimensions.width, canvasDimensions.height);
        })
    }

    private load(player: typeof Player){
        // this.pixiApplication
        loadTextures(this.pixiApplication, () => {
            this.setupGame(player);
        })
        this.handleResizeEvents();
    }
}