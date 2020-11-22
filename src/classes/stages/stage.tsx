

import { Enemy } from "../enemies/enemy";
import { Platform } from "../platform";
import { KeyOptions } from "../../types/states";
import { Player } from "../players/player";
import { Treasure } from "../treasures/treasure";
import { Viewport } from "pixi-viewport";
import { Projectile } from "../projectiles/projectile";
import { FloatingText } from "../floating_text";
import { Timer } from "../timer";
import { StageManager } from "./stage_manager";
import { SpritePart, Container } from "../interfaces";
import { UnitStateNames, ProjectileStateNames } from "../../types/enums";
import { Unit } from "../unit";
import { Sprite } from "../sprite";
import { Arrow } from "../projectiles/arrow";
import { Rock } from "../projectiles/rock";
import { Axe } from "../projectiles/axe";
import { FireBall } from "../projectiles/fire_ball";
import { FireBallMedium } from "../spells/projectile_spell";
import { Buff } from "../buffs/buff";

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

    // TODO: main references
    viewport: Viewport;
    player: Player;
    stageManager: StageManager;
    
    // this will hold the treasures the player starts with
    // on a given stage. will be used in player.revive()
    startingTreasures: Treasure[]


    needsRestart: boolean;


    constructor(level: number, name: string, enemies: Enemy[], platforms: Platform[], treasures: Treasure[], player: Player, viewport: Viewport, stageManager: StageManager){
        this.level = level;
        this.name = name;
        this.enemies = enemies;
        this.platforms = platforms;
        this.projectiles = [];
        this.currentKeys = {} as KeyOptions;
        this.player = player;
        this.treasures = treasures;
        this.viewport = viewport;
        this.floatingTexts = [];
        this.timer = new Timer(this, 100, 100);
        this.isCleared = false;
        this.stageManager = stageManager;
        this.startingTreasures = [];
        this.needsRestart = false;
    }

    restart(){
        this.needsRestart = true;
    }

    update(keys: KeyOptions){
        this.currentKeys = keys;
        this.checkIfStageCleared();
        this.updateAllSpriteStates();
        this.updateAllSpritePositions();
        this.timer.update();
    }

    load(){
        this.enemies.forEach((enemy: Enemy) => {
            enemy.add();
        });

        this.platforms.forEach((platform: Platform) => platform.add());

        this.treasures.forEach((treasure: Treasure) => {
            // this.viewport.addChild(...treasure.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
            treasure.add();
        })

        this.viewport.addChild(this.timer.displayObject);
        this.player.add();
    }

    clear(){
        this.viewport.removeChildren(0, this.viewport.children.length);
    }

    // ================================== private methods ===========================================================
    // ===============================================================================================================  

    // TODO: this should be else where
    // private removeTreasure(treasureToRemove: Treasure){
    //     this.treasures = this.treasures.filter((treasure: Treasure) => treasure != treasureToRemove);

    //     treasureToRemove.spriteParts.forEach((spritePart: SpritePart) => {
    //         this.viewport.removeChild(spritePart.sprite);
    //     })
    // }
    

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
            this.checkProjectileXCollisions(projectile);
            projectile.updateY(projectile.yVelocity);
            this.checkProjectileYCollisions(projectile);
        })
    }
    
    private updatePlayerPosition(){
        this.player.updateX(this.player.xVelocity);
        this.checkPlayerXCollisions();
        this.player.updateY(this.player.yVelocity);
        this.checkPlayerYCollisions();
        this.player.hpBar.clear();
        this.player.drawHpBar();
        this.player.drawEffects();
    }

    private updateEnemyPositions(){
        this.enemies.forEach((enemy: Enemy) => {
            enemy.updateX(enemy.xVelocity);
            this.checkEnemyXCollisions(enemy);
            enemy.updateY(enemy.yVelocity);
            this.checkEnemyYCollisions(enemy)
            enemy.hpBar.clear();
            enemy.drawHpBar()
            
        })
    }

    // ================================== Player collisions ===========================================================
    // ================================================================================================================
    private checkPlayerXCollisions() {
        if(this.player.state === UnitStateNames.DEAD){
            return;
        }
        const collidePlatform = this.collideAny(this.player, this.platforms);
        const collideTreasures = this.collideAny(this.player, this.treasures);
        const collideEnemies = this.collideAny(this.player, this.enemies);

        if (collideEnemies){
            this.handlePlayerEnemyCollisionX(this.player, collideEnemies);
        }
         
        if (collideTreasures){
            this.handlePlayerTreasureCollisionX(this.player, collideTreasures);
        }
        if (collidePlatform){
            this.handlePlayerPlatformCollisionX(this.player, collidePlatform);
        }
    }

    private checkPlayerYCollisions(){
        if(this.player.state === UnitStateNames.DEAD){
            return;
        }
        const collidePlatform = this.collideAny(this.player, this.platforms); 
        const collideTreasures = this.collideAny(this.player, this.treasures);
        const collideEnemies = this.collideAny(this.player, this.enemies);

        if (collideEnemies){
            this.handlePlayerEnemyCollisionY(this.player, collideEnemies);
        }

        if (collidePlatform){
            this.handlePlayerPlatformCollisionY(this.player, collidePlatform);
        }

        if (collideTreasures){
            this.handlePlayerTreasureCollisionY(this.player, collideTreasures);
        }

        if (this.isFalling(this.player)){
            this.player.setState(UnitStateNames.FALLING);
        }
        else if (this.player.state === UnitStateNames.FALLING){
            this.player.setState(UnitStateNames.STANDING);
        }
    }

    private handlePlayerTreasureCollisionX(player: Player, treasure: Treasure){
        // store.dispatch(applyTreasure(treasure) as ControlAction);
        player.pickupTreasure(treasure);
        // this.removeTreasure(treasure);
        treasure.remove();
    }

    private handlePlayerTreasureCollisionY(player: Player, treasure: Treasure){
        // store.dispatch(applyTreasure(treasure) as ControlAction);
        player.pickupTreasure(treasure);
        // this.removeTreasure(treasure);
        treasure.remove();
    }

    private handlePlayerEnemyCollisionX(player: Unit, collider: Enemy){
        if (collider.state === UnitStateNames.DEAD){
            return;
        }
        player.yVelocity = -3;
        // Set knockback right
        if (collider.xVelocity > 0){
            player.xVelocity = 3;
            // player.yVelocity = -3;
        }
        // Set kockback left
        if (collider.xVelocity < 0){
            player.xVelocity = -3;
            // player.yVelocity = -3;
        }
        collider.dealDamage(player, collider.projectile);
        player.inKnockBack =  true;
    }

    private handlePlayerEnemyCollisionY(player: Unit, collider: Enemy){
        // if (collider.state === UnitStateNames.DEAD){
        //     return;
        // }
        // player.yVelocity = -3;
        // // Set knockback right
        // if (collider.xVelocity > 0){
        //     player.xVelocity = 3;
        //     // player.yVelocity = -3;
        // }
        // // Set kockback left
        // if (collider.xVelocity < 0){
        //     player.xVelocity = -3;
        //     // player.yVelocity = -3;
        // }
        // collider.dealDamage(player);
        // player.inKnockBack =  true;
    }


    private handlePlayerPlatformCollisionY(player: Unit, collider: Sprite){
        if (player.yVelocity > 0){
            player.setY(collider.top() - player.height);
        }
        else if(player.yVelocity < 0){
            player.setY(collider.bottom());
        }
        player.yVelocity = 0;
    }

    private handlePlayerPlatformCollisionX(player: Unit, collider: Sprite){
        if (player.xVelocity > 0){
            player.setX(collider.left() - player.width);
        }
        else if (player.xVelocity < 0){
            player.setX(collider.right());
        }
        player.xVelocity = 0;
    }

    // ================================== Enemy collisions ===========================================================
    // ===============================================================================================================
    private checkEnemyXCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.platforms);

        if (collidePlatform){
            this.handleEnemyPlatformCollisionX(enemy, collidePlatform);
        }
    }

    private checkEnemyYCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.platforms); 

        if (collidePlatform){
            this.handleEnemyPlatformCollisionY(enemy, collidePlatform);
        }

        if (this.isFallingEnemy(enemy)){
            enemy.setState(UnitStateNames.FALLING);
        }
        else if (enemy.state == UnitStateNames.FALLING){
            enemy.setState(UnitStateNames.WALKING);
        }
    }

    private handleEnemyPlatformCollisionY(enemy: Enemy, collider: Sprite){
        // Set at the top
        if (enemy.yVelocity > 0){
            
            enemy.setY(collider.top() - enemy.height);
        }
        else if(enemy.yVelocity < 0){
            enemy.setY(collider.bottom());
        }
        enemy.yVelocity = 0;
    }

    private handleEnemyPlatformCollisionX(enemy: Enemy, collider: Sprite){
        if (enemy.xVelocity > 0){
            enemy.setX(collider.left() - enemy.width);
        }
        else if (enemy.xVelocity < 0){
            enemy.setX(collider.right());
        }

        if (enemy.state === UnitStateNames.PATROLLING){
            enemy.xVelocity *= -1;

        } else {
            enemy.xVelocity = 0;
        }
    }

    // ================================== Projectile collisions ===========================================================
    // ====================================================================================================================
    private checkProjectileXCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.platforms);
        const collideEnemy = this.collideAny(projectile, this.enemies);
        const collidePlayer = this.collide(projectile, this.player);

        if (collidePlatform){
            this.handleProjectilePlatformCollisionX(projectile, collidePlatform);
        }
        if (collideEnemy){
            this.handleProjectileEnemyCollisionX(projectile, collideEnemy)
        }
        if (collidePlayer){
            this.handleProjectilePlayerCollisionX(projectile, this.player);
        }

        else if(projectile.state === ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
        }
    }

    private checkProjectileYCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.platforms);
        const collideEnemy = this.collideAny(projectile, this.enemies);
        const collidePlayer = this.collide(projectile, this.player);

        if (collidePlatform){
            var t = projectile;
            var b = collidePlatform;
            this.handleProjectilePlatformCollisionY(projectile, collidePlatform);
        }
        if (collideEnemy){
            this.handleProjectileEnemyCollisionY(projectile, collideEnemy);
        }
        if (collidePlayer){
            this.handleProjectilePlayerCollisionY(projectile, this.player);
        }

        if (projectile.state !== ProjectileStateNames.STANDING && this.isFallingProjectile(projectile) ) {
            projectile.setState(ProjectileStateNames.FALLING);
        }
        else if(projectile.state === ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
        }
    }

    private handleProjectilePlatformCollisionY(projectile: Projectile, collider: Sprite){
        if (projectile.destroyOnContact){
            projectile.remove();
            return
        }
        if (projectile.yVelocity > 0){
            projectile.setY(collider.top() - projectile.height);
        }

        else if (projectile.yVelocity < 0){
            projectile.setY(collider.bottom());
        }

        if (projectile.sticky){
            projectile.setState(ProjectileStateNames.STANDING);
        }
        projectile.yVelocity = 0;
    }

    private handleProjectilePlatformCollisionX(projectile: Projectile, collider: Sprite){
        if (projectile.destroyOnContact){
            projectile.remove();
            return
        }

        if (projectile.xVelocity < 0){
            projectile.setX(collider.right());
        }

        if (projectile.xVelocity > 0){
            projectile.setX(collider.left() - projectile.width)
        }

        if (projectile.sticky){
            projectile.setState(ProjectileStateNames.STANDING);
        }
        if (projectile.xVelocity < 0){
            projectile.xVelocity = projectile.xVelocity * -1;
        }
        else if (projectile.xVelocity > 0){
            projectile.xVelocity = projectile.xVelocity * -1;
        }
    }

    private handleProjectileEnemyCollisionY(projectile: Projectile, enemy: Unit){
        // cant be damaged by other enemies
        if (projectile.unit instanceof Enemy){
            return;
        }
        // cant be damaged by itself
        if (projectile.unit === enemy){
            return;
        }
        
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            enemy.state !== UnitStateNames.DEAD){
                projectile.buffs.forEach((buff: typeof Buff) => {
                    // buff.activate(enemy);
                })
                projectile.remove();   
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(enemy, projectile.unit.projectile);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    private handleProjectileEnemyCollisionX(projectile: Projectile, enemy: Unit){
        // cant be damaged by other enemies
        if (projectile.unit instanceof Enemy){
            return;
        }
        // cant be damaged by itself
        if (projectile.unit === enemy){
            return;
        }
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            enemy.state !== UnitStateNames.DEAD){    
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(enemy, projectile.constructor as typeof Projectile);
                    projectile.hasDealtDamage = true;
                }
        }
    }

    // private getProjectileType(projectile: Projectile): typeof Projectile{
    //     switch(projectile.constructor){
    //         case(Arrow):
    //             return Arrow;
    //         case(Rock):
    //             return Rock;
    //         case(Axe):
    //             return Axe;
    //         case(FireBall):
    //             return FireBall;
    //         case(FireBallMedium):
    //             return FireBa
    //         default: 
    //             throw(new Error(`Missing projectile type ${typeof projectile}`));
    //     }
    // }



    private handleProjectilePlayerCollisionY(projectile: Projectile, player: Unit){
        if (projectile.unit === player){
            return;
        }
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            player.state !== UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(player, projectile.constructor as typeof Projectile);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    private handleProjectilePlayerCollisionX(projectile: Projectile, player: Unit){
        if (projectile.unit === player){
            return;
        }
        if ((projectile.state === ProjectileStateNames.FLYING ||
            projectile.state === ProjectileStateNames.FALLING) && 
            player.state !== UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(player, projectile.constructor as typeof Projectile);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    // ================================== util ===========================================================
    // =================================================================================================== 

    private isFalling(player: Unit){
        player.updateY(1);
        const platformCollision = this.collideAny(player, this.platforms);
        
        // ontop of some platform or jumping
        if (platformCollision || player.state === UnitStateNames.JUMPING){
            player.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }

    private isFallingEnemy(enemy: Enemy){
        enemy.updateY(1);

        const platformCollision = this.collideAny(enemy, this.platforms);
        // ontop of some platform or jumping
        if (platformCollision || enemy.state === UnitStateNames.JUMPING){
            enemy.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }

    private isFallingProjectile(projectile: Projectile){
        projectile.updateY(1);
        
        const platformCollision = this.collideAny(projectile, this.platforms);
        // ontop of some platform or jumping
        if (platformCollision){
            projectile.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }

    private collide(sprite1: Sprite, sprite2: Sprite){
        if (sprite2.left() >= sprite1.right() ||
            sprite2.right() <= sprite1.left() ||
            sprite2.bottom() <= sprite1.top() ||
            sprite2.top() >= sprite1.bottom()){
                return false;
            }
        return true;
    }

    private collideAny(target: Sprite, spriteGroup: Sprite[]){
        let collidedSprite;
        spriteGroup.forEach((sprite: Sprite) => {
            if (this.collide(target, sprite)){
                collidedSprite = sprite;
            }
        })
        return collidedSprite;
    }
}
