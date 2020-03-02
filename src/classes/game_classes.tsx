import * as PIXI from 'pixi.js';
import { KeyOptions, IStage } from '../types/states';
import { PlayerStateNames, PlayerPartNames, EnemyStateNames } from '../types/enums';
import { Platform, DefaultPlatform } from './platform';
import { STAGE1_LAYOUT, STAGE2_LAYOUT, STAGE3_LAYOUT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';
import { Enemy, Kobold } from './enemy';
import {store} from '../state_management/store';
import { updatePlayerPosition, ControlAction, applyTreasure } from '../state_management/actions/control_actions';
import { act } from 'react-dom/test-utils';
import { Player } from './player';
import { getCanvasDimensions } from '../helpers/util';
import { Sprite } from './sprite';
import { Treasure, Armor1Helmet, Armor1Body, Armor1Legs } from './treasure';
import { SpritePart } from './interfaces';
import { Viewport } from 'pixi-viewport';




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
            const playerPartName = key as PlayerPartNames;
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
        const treasures = [ new Armor1Body(this.loader, 100, 100), tempTreasure, tempTreasure2 ]
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


    constructor(level: number, name: string, enemies: Enemy[], platforms: Platform[], treasures: Treasure[], player: Player, viewport: Viewport){
        this.level = level;
        this.name = name;
        this.enemies = enemies;
        this.platforms = platforms;
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

    update(keys: KeyOptions){
        this.currentKeys = keys;
        this.updateViewport();
        this.updateAllSpriteStates();
        this.updateAllSpritePositions();

    }


    private updateViewport(){
        const viewportCenter = this.viewport.center;
        this.viewport.follow(this.player.spriteParts[PlayerPartNames.HEAD].sprite);
    }

    // Update state of the sprite
    private updateAllSpriteStates(){
        this.player.update(this.currentKeys)
        this.enemies.forEach((enemy: Enemy) => {
            enemy.update();
        })
    }

    // Update all sprite positions
    private updateAllSpritePositions(){
        this.updatePlayerPosition()
        this.updateEnemyPositions();
    }


    private updatePlayerPosition(){
        this.player.updateX(this.player.xVelocity);
        this.checkPlayerXCollisions();
        this.player.updateY(this.player.yVelocity);
        this.checkPlayerYCollisions();

        const action = updatePlayerPosition(this.player.x, this.player.y) as ControlAction;
        store.dispatch(action);
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
        const collideTreasures = this.collideAny(this.player, this.treasures)

        if (collideTreasures){
            this.handlePlayerTreasureCollisionX(this.player, collideTreasures);
        }
        if (collidePlatform){
            this.handlePlayerPlatformCollisionX(this.player, collidePlatform);
        }
    }








    private checkPlayerYCollisions(){
        const collidePlatform = this.collideAny(this.player, this.platforms); 

        if (collidePlatform){
            this.handlePlayerPlatformCollisionY(this.player, collidePlatform);
        }

        if (this.isFalling(this.player)){
            this.player.setState(PlayerStateNames.FALLING);
        }
        else if (this.player.state == PlayerStateNames.FALLING){
            this.player.setState(PlayerStateNames.WALKING);
        }
    }

    private checkEnemyYCollisions(enemy: Enemy){
        const collidePlatform = this.collideAny(enemy, this.platforms); 

        if (collidePlatform){
            this.handleEnemyPlatformCollisionY(enemy, collidePlatform);
        }

        if (this.isFallingEnemy(enemy)){
            // console.log('enemy is falling');
            enemy.setState(EnemyStateNames.FALLING);
        }
        else if (enemy.state == EnemyStateNames.FALLING){
            enemy.setState(EnemyStateNames.WALKING);
        }
    }







    

    private handlePlayerTreasureCollisionX(player: Player, treasure: Treasure){
        store.dispatch(applyTreasure(treasure.effect) as ControlAction);
        treasure.apply(player);
        this.removeTreasure(treasure);
    }

    private handlePlayerTreasureCollisionY(player: Player, treasure: Treasure){
        treasure.apply(player);

        treasure.spriteParts.map( (spritePart: SpritePart) => {
            this.viewport.removeChild(spritePart.sprite);
        })
    }
    













    private handlePlayerPlatformCollisionY(player: Player, collider: Sprite){
        if (player.yVelocity > 0){
            player.setY(collider.top() - player.height);
        }
        else if(player.yVelocity < 0){
            player.setY(collider.bottom());
        }
        player.yVelocity = 0;
    }


    private handleEnemyPlatformCollisionY(enemy: Enemy, collider: Sprite){
        // console.log('enemy collided platform')
        // console.log(enemy.yVelocity)
        // console.log(enemy.state)
        // Set at the top
        if (enemy.yVelocity > 0){
            // console.log('set at top')
            // console.log('asdasd')
            enemy.setY(collider.top() - enemy.height);
        }
        else if(enemy.yVelocity < 0){
            enemy.setY(collider.bottom());
        }
        enemy.yVelocity = 0;
    }







    private handlePlayerPlatformCollisionX(player: Player, collider: Sprite){
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



    







    private isFalling(player: Player){
        player.updateY(1);
        const platformCollision = this.collideAny(player, this.platforms);
        
        // ontop of some platform or jumping
        if (platformCollision || player.state === PlayerStateNames.JUMPING){
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
        // console.log(platformCollision)
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


    private contain(player: Player, container: Container){
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
            if (this.player.state == PlayerStateNames.FALLING){
                player.setState(PlayerStateNames.WALKING);
            }

        }

    }


}







