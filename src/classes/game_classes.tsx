import * as PIXI from 'pixi.js';
import { KeyOptions, IStage } from '../types/states';
import { EnemyStateNames, ProjectileStateNames, UnitPartNames, UnitStateNames } from '../types/enums';
import { Platform, DefaultPlatform } from './platform';
import { STAGE1_LAYOUT, STAGE2_LAYOUT, STAGE3_LAYOUT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';
import { Enemy, Kobold } from './enemy';
import {store} from '../state_management/store';
import { ControlAction, applyTreasure } from '../state_management/actions/control_actions';
import { act } from 'react-dom/test-utils';
// import { Player } from './player';
import { getCanvasDimensions } from '../helpers/util';
import { Sprite } from './sprite';
import { Treasure, Armor1Helmet, Armor1Body, Armor1Legs } from './treasure';
import { SpritePart } from './interfaces';
import { Viewport } from 'pixi-viewport';
import { Projectile } from './projectile';
import { Player } from './player';
import { Unit } from './unit';




export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class StageManager {

    loader: PIXI.Loader;
    player: Player;
    viewport: Viewport;

    constructor(loader: PIXI.Loader, player: Player, viewport: Viewport){
        this.loader = loader;
        this.player  = player;
        this.viewport = viewport;
    }

    // Get a stage by its level
    getStage(level: number){
        switch(level) {
            case(1):
                return this.buildStageOne();
            case(2):
                return this.buildStageTwo();
            default:
                throw "no stage"
        }
    }

    loadStage(stage: Stage){
        const platforms = stage.platforms;
        const newplayer = stage.player;
        const treasures = stage.treasures;
        const enemies = stage.enemies;

        enemies.forEach((enemy: Enemy) => this.viewport.addChild(enemy.sprite));

        platforms.forEach((platform: Platform) => this.viewport.addChild(platform.pixiSprite));

        treasures.forEach((treasure: Treasure) => {
            this.viewport.addChild(...treasure.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        })
        this.viewport.addChild(...Object.keys(newplayer.spriteParts).map((key: string) => {
            const playerPartName = key as UnitPartNames;
            return newplayer.spriteParts[playerPartName].sprite
        }))
        this.viewport.addChild(this.player.hpBar);
    }

    clearStage(){
        this.viewport.removeChildren(0, this.viewport.children.length);
    }



    // Stage 1
    private buildStageOne(): Stage{
        const level = 1;
        const name = "beginners luck";
        const enemies = [ new Kobold(this.loader, this.player) ];
        const platforms = this.generatePlatforms(STAGE3_LAYOUT);
        // loader, x, y
        const tempTreasure = new Armor1Helmet(this.loader, 300, 200);
        const tempTreasure2 = new Armor1Legs(this.loader, 500, 200)
        const tempTreasure3 = new Armor1Legs(this.loader, 250, 150)
        const tempTreasure5 = new Armor1Legs(this.loader, 120, 120)
        const tempTreasure9 = new Armor1Legs(this.loader, 120, 120)
        const tempTreasure10 = new Armor1Legs(this.loader, 120, 120)
        const tempTreasure11 = new Armor1Legs(this.loader, 120, 120)

        const tempTreasur6 = new Armor1Legs(this.loader, 90, 90)
        const tempTreasure7 = new Armor1Legs(this.loader, 130, 130)
        const tempTreasure8 = new Armor1Legs(this.loader, 140, 140)

        const treasures = [ new Armor1Body(this.loader, 100, 100), tempTreasure, tempTreasure2, tempTreasure5, tempTreasure3, tempTreasur6, tempTreasure7, tempTreasure8, tempTreasure9, tempTreasure10, tempTreasure11 ]
        return new Stage(
            level,
            name,
            enemies,
            platforms,
            treasures,
            this.player,
            this.viewport
        )
    }

    private buildStageTwo(): Stage{
        const level = 1;
        const name = "beginners luck";
        const enemies = [ new Kobold(this.loader, this.player) ];
        // const platforms = [ new Platform(sprite) ] // TODO: pass platform sprite
        const platforms = this.generatePlatforms(STAGE3_LAYOUT);
        const treasures = [ new Armor1Body(this.loader, 100, 200) ]
        return new Stage(
            level,
            name,
            enemies,
            platforms,
            treasures,
            this.player,
            this.viewport
        )
    }

    // TODO
    // Other stages


    // Generate and return a set of platform defined by the 
    // layout string.
    private generatePlatforms(layout: string): Platform[]{
        const platforms = [] as Platform[];
        const lines = layout.split('\n');
        const measurements = lines[0].split(' ');
        const width = parseInt(measurements[0]);
        const height = parseInt(measurements[1]);
        let x = 0;
        let y = 0;
        const canvasDimensions = getCanvasDimensions();
        const xIncrement = canvasDimensions.width / 20;
        const yIncrement = canvasDimensions.height / 20;
        // const xIncrement = 25;
        // const yIncrement = 25;
        // loop height
        for(var i = 1; i < height + 1; ++i){
            x = 0;
            // loop width
            for(var k = 0; k < width; ++k){
                const platformDelimeter = lines[i][k]
                if (platformDelimeter === "0") {
                    x += xIncrement
                    continue;
                };
                platforms.push(this.createPlatform(platformDelimeter, x, y, xIncrement, yIncrement));
                x += xIncrement;
            }
            y += yIncrement;
        }
        return platforms;
    }

    // Return a Platform object with given x, y coords and given width and height
    // Platform type returned is based on delimter passed in
    private createPlatform(delimeter: string, x: number, y: number, width: number, height: number): Platform {
        let platform: Platform;
        switch(delimeter){
            case("1"):
                platform = new DefaultPlatform(this.loader, x, y, width, height);
                break;
            default:
                throw('unhandled delimter in stage manager');
        }
        return platform;
    }


}


































// Wrapper for all items on the screen
// handle collisions
export class Stage implements IStage{

    name: string;
    level: number;
    enemies: Enemy[];
    platforms: Platform[];
    currentKeys: KeyOptions;
    player: Player;
    treasures: Treasure[];
    viewport: Viewport;
    projectiles: Projectile[];


    constructor(level: number, name: string, enemies: Enemy[], platforms: Platform[], treasures: Treasure[], player: Player, viewport: Viewport){
        this.level = level;
        this.name = name;
        this.enemies = enemies;
        this.platforms = platforms;
        this.projectiles = [];
        this.currentKeys = {} as KeyOptions;
        this.player = player;
        this.treasures = treasures;
        this.viewport = viewport;
    }

    removeTreasure(treasureToRemove: Treasure){
        this.treasures = this.treasures.filter((treasure: Treasure) => treasure != treasureToRemove);

        treasureToRemove.spriteParts.forEach((spritePart: SpritePart) => {
            this.viewport.removeChild(spritePart.sprite);
        })
    }

    removeProjectile(projectileToRemove: Projectile){
        this.projectiles = this.projectiles.filter((projectile: Projectile) => projectile != projectileToRemove);
        this.viewport.removeChild(projectileToRemove.sprite);
    }

    update(keys: KeyOptions){
        this.currentKeys = keys;
        this.updateViewport();
        this.updateAllSpriteStates();
        this.updateAllSpritePositions();
    }

    // TODO: call this once
    // 
    private updateViewport(){
        const viewportCenter = this.viewport.center;
        this.viewport.follow(this.player.spriteParts[UnitPartNames.HEAD].sprite);
    }

    // Update state of the sprite
    private updateAllSpriteStates(){
        this.player.update(this.currentKeys)
        this.enemies.forEach((enemy: Enemy) => {
            enemy.update();
        })
        this.projectiles.forEach((projectile: Projectile) => {
            projectile.update();
            if (projectile.decay <= 0) {
                this.removeProjectile(projectile);
            }
        })
    }

    // Update all sprite positions
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
    }

    private updateEnemyPositions(){
        this.enemies.forEach((enemy: Enemy) => {
            enemy.updateX(enemy.xVelocity);
            this.checkEnemyXCollisions(enemy);
            enemy.updateY(enemy.yVelocity);
            this.checkEnemyYCollisions(enemy)
        })
    }








    private checkEnemyXCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.platforms);

        if (collidePlatform){
            this.handleEnemyPlatformCollisionX(enemy, collidePlatform);
        }
    }

    private checkPlayerXCollisions() {
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
            console.log('collided in x with platform')
        }
    }


    private checkProjectileXCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.platforms);

        if (collidePlatform){
            this.handleProjectilePlatformCollisionX(projectile, collidePlatform);
        }

        else if(projectile.state == ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
            // projectile.setState(ProjectileStateNames.STANDING);
        }


    }









    private checkPlayerYCollisions(){
        const collidePlatform = this.collideAny(this.player, this.platforms); 
        const collideTreasures = this.collideAny(this.player, this.treasures)

        if (collidePlatform){
            this.handlePlayerPlatformCollisionY(this.player, collidePlatform);
        }

        if (collideTreasures){
            this.handlePlayerTreasureCollisionY(this.player, collideTreasures);
        }

        if (this.isFalling(this.player)){
            this.player.setState(UnitStateNames.FALLING);
        }
        else if (this.player.state == UnitStateNames.FALLING){
            this.player.setState(UnitStateNames.STANDING);
        }
    }

    private checkEnemyYCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.platforms); 

        if (collidePlatform){
            this.handleEnemyPlatformCollisionY(enemy, collidePlatform);
        }

        if (this.isFallingEnemy(enemy)){
            enemy.setState(EnemyStateNames.FALLING);
        }
        else if (enemy.state == EnemyStateNames.FALLING){
            enemy.setState(EnemyStateNames.WALKING);
        }
    }

    private checkProjectileYCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.platforms);

        if (collidePlatform){
            this.handleProjectilePlatformCollisionY(projectile, collidePlatform);
        }

        if (projectile.state != ProjectileStateNames.STANDING && this.isFallingProjectile(projectile) ) {
            projectile.setState(ProjectileStateNames.FALLING);
        }
        else if(projectile.state == ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
            // projectile.setState(ProjectileStateNames.STANDING);
        }

    }









    private handlePlayerTreasureCollisionX(player: Unit, treasure: Treasure){
        store.dispatch(applyTreasure(treasure) as ControlAction);
        this.removeTreasure(treasure);
    }

    private handlePlayerTreasureCollisionY(player: Unit, treasure: Treasure){
        store.dispatch(applyTreasure(treasure) as ControlAction);
        this.removeTreasure(treasure);
    }
    





    private handlePlayerEnemyCollisionX(player: Unit, collider: Sprite){
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

        player.inKnockBack =  true;
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


    private handleProjectilePlatformCollisionY(projectile: Projectile, collider: Sprite){
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
        // projectile.xVelocity = 0;
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

    private handleEnemyPlatformCollisionX(enemy: Enemy, collider: Sprite){
        if (enemy.xVelocity > 0){
            enemy.setX(collider.left() - enemy.width);
        }
        else if (enemy.xVelocity < 0){
            enemy.setX(collider.right());
        }
        enemy.xVelocity = 0;
    }


    private handleProjectilePlatformCollisionX(projectile: Projectile, collider: Sprite){
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
            projectile.xVelocity = -projectile.xVelocity;
        }
    
        // projectile.xVelocity = 0;
    }


    







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
        if (platformCollision || enemy.state === EnemyStateNames.JUMPING){
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


    private contain(player: Unit, container: Container){
        // contain right side of container
        if (player.left() < container.x){
            player.setX(container.x + 1);
        }
        // contain left side of container
        if (player.right() > (container.x + container.width)){
            player.setX( (container.x + container.width) - player.width)
        }
        // contain top of container
        if (player.top() < container.y){
            player.setY(container.y + 1)

        }
        // contain bottom of container
        if (player.bottom() > (container.y + container.height)){
            player.setY((container.y + container.height) - player.height)
            player.yVelocity = 0;
            if (this.player.state == UnitStateNames.FALLING){
                player.setState(UnitStateNames.WALKING);
            }

        }

    }


}







