

import { Enemy } from "../enemies/enemy";
import { Platform } from "../platform";
import { Player } from "../players/player";
import { Treasure } from "../treasures/treasure";
import { Viewport } from "pixi-viewport";
import { Projectile } from "../projectiles/projectile";
import { FloatingText } from "../floating_text";
import { Timer } from "../timer";
import { StageManager } from "./stage_manager";
import { CollisionHelper } from "./collision_helper";
import { KeyOptions, StageTemplate } from "../../types/interfaces";

// Wrapper for all items on the screen
// Handles sprite movement and collisions
export class Stage{

    name: string;
    level: number;
    enemies: Enemy[];
    platforms: Platform[];
    currentKeys: KeyOptions;
    treasures: Treasure[];
    projectiles: Projectile[];
    floatingTexts: FloatingText[];
    timer: Timer;
    isCleared: boolean;

    spawnX: number;
    spawnY: number;

    viewport: Viewport;
    player: Player;
    stageManager: StageManager;
    
    // this will hold the treasures the player starts with
    // on a given stage. will be used in player.revive()
    startingTreasures: Treasure[]

    // needsRestart: boolean;
    collisionHelper: CollisionHelper;
    template: StageTemplate;

    constructor(level: number,
                name: string,
                player: Player, 
                viewport: Viewport, 
                stageManager: StageManager,
                template: StageTemplate){
        this.spawnX = 100;
        this.spawnY = 100;
        this.level = level;
        this.name = name;
        this.template = template;

        this.enemies = [];
        this.platforms = [];
        this.projectiles = [];
        this.treasures = [];
        this.player = player;

        this.currentKeys = {} as KeyOptions;
        this.viewport = viewport;
        this.floatingTexts = [];
        this.timer = new Timer(this, 100, 100);
        this.isCleared = false;
        this.stageManager = stageManager;
        this.startingTreasures = [];
        this.collisionHelper = new CollisionHelper(this);
    }

    restart(){
        // // Set stage with players current treasures
        const startingTreasures = this.player.currentStage.startingTreasures;

        // recreate restarted stage
        this.player.currentStage = this;
        this.startingTreasures = startingTreasures;

        // clear and load stage
        this.clear();
        this.load();
    }

    // Load all game components into the viewport
    load(){
        this.enemies.forEach((enemy: Enemy) => {
            enemy.add();
        });

        this.platforms.forEach((platform: Platform) => platform.add());

        this.treasures.forEach((treasure: Treasure) => {
            treasure.add();
        });

        this.viewport.addChild(this.timer.displayObject);

        // Player will NOT exist in stage for when
        // we are loading in stage builder
        this.player?.setX (this.spawnX);
        this.player?.setY(this.spawnY);
        this.player?.add();
    }


    update(keys: KeyOptions){
        this.currentKeys = keys;
        this.checkIfStageCleared();
        this.updateAllSpriteStates();
        this.updateAllSpritePositions();
        this.timer.update();
    }

    clear(){
        this.viewport.removeChildren(0, this.viewport.children.length);
    }

    // ================================== private methods ===========================================================
    // ===============================================================================================================  
    private checkIfStageCleared(){
        if (this.enemies.length === 0){
            this.isCleared = true;
        }
    }

    // ================================== Update sprite states ===========================================================
    // =================================================================================================================== 

    private updateAllSpriteStates(){
        this.player.update(this.currentKeys)
        this.enemies.forEach((enemy: Enemy) => {
            enemy.update(this.currentKeys);
        })
        this.projectiles.forEach((projectile: Projectile) => {
            projectile.update();
        })
        this.floatingTexts.forEach((text: FloatingText) => {
            text.update();
        })
    }

    // ================================== Update sprite positions ===========================================================
    // ======================================================================================================================  

    private updateAllSpritePositions(){
        this.updatePlayerPosition()
        this.updateEnemyPositions();
        this.updateProjectilePositions();
    }

    private updateProjectilePositions(){
        this.projectiles.forEach((projectile: Projectile) => {
            projectile.updateX(projectile.xVelocity);
            this.collisionHelper.checkProjectileXCollisions(projectile);
            projectile.updateY(projectile.yVelocity);
            this.collisionHelper.checkProjectileYCollisions(projectile);
        })
    }
    
    private updatePlayerPosition(){
        this.player.updateX(this.player.xVelocity);
        this.collisionHelper.checkPlayerXCollisions();
        this.player.updateY(this.player.yVelocity);
        this.collisionHelper.checkPlayerYCollisions();
        this.player.hpBar.clear();
        this.player.drawHpBar();
        this.player.drawEffects();
    }

    private updateEnemyPositions(){
        this.enemies.forEach((enemy: Enemy) => {
            enemy.updateX(enemy.xVelocity);
            this.collisionHelper.checkEnemyXCollisions(enemy);
            enemy.updateY(enemy.yVelocity);
            this.collisionHelper.checkEnemyYCollisions(enemy)
            enemy.hpBar.clear();
            enemy.drawHpBar()
            enemy.drawEffects();
        })
    }
}
