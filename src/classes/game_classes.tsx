import * as PIXI from 'pixi.js';
import { KeyOptions, IStage } from '../types/states';
import { ProjectileStateNames, UnitPartNames, UnitStateNames, UnitArmorNames } from '../types/enums';
import { Platform, DefaultPlatform, GrassPlatform, DirtPlatform, RedGrassPlatform, SandRockPlatform } from './platform';
import { STAGE1_LAYOUT, SCREEN_WIDTH, SCREEN_HEIGHT, STAGE2_LAYOUT } from '../constants';
import { Enemy, Man, Kobold2, Manticore } from './enemy';
import {store} from '../state_management/store';
import { ControlAction, applyTreasure, changeStage } from '../state_management/actions/control_actions';
import { act } from 'react-dom/test-utils';
// import { Player } from './player';
import { getCanvasDimensions } from '../helpers/util';
import { Sprite } from './sprite';
import { Treasure, Armor1Helmet, Armor1Body, Armor1Legs, Armor2Helmet, KoboldArmor1, SmallCoins, KoboldArmorLegs1, KoboldBodyArmor1, KoboldHeadArmor2, KoboldBodyArmor2, KoboldHeadArmor3 } from './treasure';
import { SpritePart } from './interfaces';
import { Viewport } from 'pixi-viewport';
import { Projectile } from './projectile';
import { Player } from './player';
import { Unit } from './unit';
import { UnitAttributes } from '../types/types';
import { Knight } from './knight';
import { Kobold } from './kobold';
import { FloatingText } from './floating_text';
import { Timer } from './timer';


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
                // return this.buildStageTwo();
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
        
        enemies.forEach((enemy: Enemy) => {
            this.viewport.addChild(...enemy.getSprites());
        });

        platforms.forEach((platform: Platform) => this.viewport.addChild(platform.pixiSprite));

        treasures.forEach((treasure: Treasure) => {
            this.viewport.addChild(...treasure.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        })

        this.viewport.addChild(stage.timer.displayObject);
        this.viewport.addChild(...newplayer.getSprites())
    }

    clearStage(){
        this.viewport.removeChildren(0, this.viewport.children.length);
    }



    // =================================== Stage contruction ================================================= //
    // ======================================================================================================= //
    private buildStageOne(): Stage{
        const level = 1;
        const name = "beginners luck";
        const platforms = this.generatePlatforms(STAGE1_LAYOUT);
        const treasures = this.generateTreasures(level);
        const stage = new Stage(
            level,
            name,
            [],
            platforms,
            treasures,
            this.player,
            this.viewport,
            this,
        );
        // const enemies = [new Kobold2(this.loader, stage, {} as UnitAttributes, 200, 200), new Man(this.loader, stage, {} as UnitAttributes, 789, 554), new Kobold2(this.loader, stage, {} as UnitAttributes, 83, 700)];
        const enemies = [new Kobold2(this.loader, stage, {} as UnitAttributes, 200, 200)]

        stage.enemies = enemies;
        return stage;
    }

    private buildStageTwo(): Stage{
        const level = 2;
        const name = "stage fucking 2";
        const platforms = this.generatePlatforms(STAGE2_LAYOUT);
        const treasures = this.generateTreasures(level)
        const stage =  new Stage(
            level,
            name,
            [],
            platforms,
            treasures,
            this.player,
            this.viewport,
            this,
        )

        // TODO: temp hack to see how we can apply armor to enemies
        // abstract this out
        const armoredKobold = new Man(this.loader, stage, {} as UnitAttributes, 895, 405);

        const affectedBodyPart = UnitPartNames.HEAD;
        const newArmorType = UnitArmorNames.ARMOR2;
        const newTexture = armoredKobold.textures[affectedBodyPart][newArmorType];
        const spritePart = armoredKobold.spriteParts[affectedBodyPart].sprite;
        spritePart.texture = newTexture;
        armoredKobold.currentArmorSet[affectedBodyPart] = newArmorType;


        stage.enemies.push(armoredKobold);
        stage.enemies.push(new Manticore(this.loader, stage, {} as UnitAttributes, 462, 540), new Man(this.loader, stage, {} as UnitAttributes, 127, 427.5), new Man(this.loader, stage, {} as UnitAttributes, 403, 427.5));
        return stage;

    }




    // =================================== Treasure generation =============================================== //
    // ======================================================================================================= //
    private generateTreasures(level: number): Treasure[]{
        let treasures: Treasure[] = this.generateGenericTreasures(level);

        switch(this.player.constructor){
            case(Knight):
                treasures.push(...this.generateRandomKnightTreasures(level));
                break;
            case(Kobold):
                treasures.push(...this.generateRandomKoboldTreasures(level));
                break;
            default: 
                break;
        }
        return treasures;
    }

    private generateGenericTreasures(stage: number): Treasure[] {
        const genericTreasures: Treasure[] = [];
        switch(stage){
            case(1):
                genericTreasures.push(new SmallCoins(this.loader, 536, 805, 4));
                break;
            case(2):
                genericTreasures.push(new SmallCoins(this.loader, 1214, 517.5, 4));
                break;
            default:
                break;
        }
        return genericTreasures;
    }


    private generateStage1Treasures(treasure1Type: typeof Treasure, treasure2Type: typeof Treasure): Treasure[]{
        const treasures = [];

        const treasure1X =  334;
        const treasure1Y =  1045;

        const treasure2X = 223;
        const treasure2Y = 70;

        treasures.push(new treasure1Type(this.loader, treasure1X, treasure1Y))
        treasures.push(new treasure2Type(this.loader, treasure2X, treasure2Y))

        return treasures;
    }

    private generateStage2Treasures(treasure1Type: typeof Treasure, treasure2Type: typeof Treasure): Treasure[] {
        const treasures = [] as Treasure[];

        const treasure1X = 1915;
        const treasure1Y = 327.5;

        const treasure2X = 1265;
        const treasure2Y = 652;

        treasures.push(new treasure1Type(this.loader, treasure1X, treasure1Y))
        treasures.push(new treasure2Type(this.loader, treasure2X, treasure2Y))

        return treasures;
    }

    private generateRandomKnightTreasures(stage: number): Treasure[]{
        const knightTreasures: Treasure[] = [];
        let treasureOptions = [] as  typeof Treasure[];
        let randomTreasureTypes = [] as typeof Treasure[]

        switch(stage){
            case(1):
                treasureOptions = [Armor2Helmet, Armor1Helmet, Armor1Legs, Armor1Body];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                knightTreasures.push(...this.generateStage1Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            case(2):   
                treasureOptions = [Armor2Helmet, Armor1Helmet, Armor1Legs, Armor1Body];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                knightTreasures.push(...this.generateStage2Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            default:
                break;
        }
        return knightTreasures;
    }


    private generateRandomKoboldTreasures(stage: number): Treasure[]{
        const koboldTreasures: Treasure[] = [];
        let treasureOptions = [] as  typeof Treasure[];
        let randomTreasureTypes = [] as typeof Treasure[]
        switch(stage){
            case(1):
                treasureOptions = [KoboldArmor1, KoboldArmorLegs1];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                koboldTreasures.push(...this.generateStage1Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            case(2):
                treasureOptions = [KoboldBodyArmor1, KoboldHeadArmor2, KoboldHeadArmor3, KoboldBodyArmor2];
                randomTreasureTypes = this.getRandomTreaureTypes(treasureOptions, 2);
                koboldTreasures.push(...this.generateStage2Treasures(randomTreasureTypes[0], randomTreasureTypes[1]));
                break;
            default: 
                break;  
        }
        return koboldTreasures;
    }



    // =================================== Utility methods ================================================= //
    // ======================================================================================================= //



    // Returns list of treasure types equal to the <count> passed in
    // treasure types wil be randomly picked from the <options> passed
    // in.
    private getRandomTreaureTypes(options: typeof Treasure[], count: number): typeof Treasure[]{
        if (count > options.length){
            throw "not enough unique treasures in getRandomTreasureTypes";
        }
        const randomTreasureTypes = [] as typeof Treasure[];
        for (let i = 0; i < count; ++i){
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomTreasureType = options[randomIndex];
            randomTreasureTypes.push(randomTreasureType);
            options = options.filter(option => option != randomTreasureType);
        }
        return randomTreasureTypes;
    }

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
        const xIncrement = 25;
        const yIncrement = 25;
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
            case("G"):
                platform = new GrassPlatform(this.loader, x, y, width, height);
                break;
            case("D"):
                platform = new DirtPlatform(this.loader, x, y, width, height);
                break;
            case("R"):
                platform = new RedGrassPlatform(this.loader, x, y, width, height);
                break;
            case("S"):
                platform = new SandRockPlatform(this.loader, x, y, width, height);
                break;
            default:
                throw('unhandled delimter in stage manager');
        }
        return platform;
    }


}


















// Wrapper for all items on the screen
//
// handles collisions
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
    floatingTexts: FloatingText[];
    timer: Timer;
    isCleared: boolean;
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

    removeTreasure(treasureToRemove: Treasure){
        this.treasures = this.treasures.filter((treasure: Treasure) => treasure != treasureToRemove);

        treasureToRemove.spriteParts.forEach((spritePart: SpritePart) => {
            this.viewport.removeChild(spritePart.sprite);
        })
    }

    update(keys: KeyOptions){
        this.currentKeys = keys;
        this.checkIfStageCleared();
        this.updateAllSpriteStates();
        this.updateAllSpritePositions();
        this.timer.update();
    }

    private checkIfStageCleared(){
        if (this.enemies.length == 0){
            this.isCleared = true;
        }
    }

    // Update state of the sprite
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
            enemy.hpBar.clear();
            enemy.drawHpBar()
        })
    }






    // ================================== Player collisions ===========================================================
    // ===============================================================================================================   
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
        else if (this.player.state == UnitStateNames.FALLING){
            this.player.setState(UnitStateNames.STANDING);
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
        collider.dealDamage(player);
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

        else if(projectile.state == ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
        }
    }

    private checkProjectileYCollisions(projectile: Projectile){
        const collidePlatform = this.collideAny(projectile, this.platforms);
        const collideEnemy = this.collideAny(projectile, this.enemies);
        const collidePlayer = this.collide(projectile, this.player);

        if (collidePlatform){
            this.handleProjectilePlatformCollisionY(projectile, collidePlatform);
        }
        if (collideEnemy){
            this.handleProjectileEnemyCollisionY(projectile, collideEnemy);
        }
        if (collidePlayer){
            this.handleProjectilePlayerCollisionY(projectile, this.player);
        }

        if (projectile.state != ProjectileStateNames.STANDING && this.isFallingProjectile(projectile) ) {
            projectile.setState(ProjectileStateNames.FALLING);
        }
        else if(projectile.state == ProjectileStateNames.FALLING){
            projectile.setState(ProjectileStateNames.ROLLING)
        }
    }

    private handleProjectilePlatformCollisionY(projectile: Projectile, collider: Sprite){
        if (projectile.yVelocity > 0){
            // debugger;
            projectile.setY(collider.top() - projectile.height);
        }

        else if (projectile.yVelocity < 0){
            projectile.setY(collider.bottom());
        }

        if (projectile.sticky){
            projectile.setState(ProjectileStateNames.STANDING);
        }
        projectile.yVelocity = 0;


        // if (projectile.yVelocity < 0){
        //     projectile.yVelocity = projectile.yVelocity * -1;
        // }
        // else if (projectile.yVelocity > 0){
        //     projectile.yVelocity = projectile.yVelocity * -1;
        // }
        // projectile.yVelocity = 0;
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
            projectile.xVelocity = projectile.xVelocity * -1;
        }
    }

    private handleProjectileEnemyCollisionY(projectile: Projectile, enemy: Unit){
        if (projectile.unit === enemy){
            return;
        }
        if ((projectile.state == ProjectileStateNames.FLYING ||
            projectile.state == ProjectileStateNames.FALLING) && 
            enemy.state != UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(enemy);  
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
        if ((projectile.state == ProjectileStateNames.FLYING ||
            projectile.state == ProjectileStateNames.FALLING) && 
            enemy.state != UnitStateNames.DEAD){    
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(enemy);
                    projectile.hasDealtDamage = true;
                }
        }
    }


    private handleProjectilePlayerCollisionY(projectile: Projectile, player: Unit){
        if (projectile.unit === player){
            return;
        }
        if ((projectile.state == ProjectileStateNames.FLYING ||
            projectile.state == ProjectileStateNames.FALLING) && 
            player.state != UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(player);  
                    projectile.hasDealtDamage = true;
                }
        }
    }

    private handleProjectilePlayerCollisionX(projectile: Projectile, player: Unit){
        if (projectile.unit === player){
            return;
        }
        if ((projectile.state == ProjectileStateNames.FLYING ||
            projectile.state == ProjectileStateNames.FALLING) && 
            player.state != UnitStateNames.DEAD){
                projectile.remove();
                if (!projectile.hasDealtDamage){
                    projectile.unit.dealDamage(player);  
                    projectile.hasDealtDamage = true;
                }
        }
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







