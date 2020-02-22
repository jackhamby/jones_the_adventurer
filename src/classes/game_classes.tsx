import * as PIXI from 'pixi.js';
import { KeyOptions, IStage } from '../types/states';
import { PlayerStateNames, PlayerPartNames } from '../types/enums';
import { Platform, DefaultPlatform } from './platform';
import { STAGE1_LAYOUT, STAGE2_LAYOUT, STAGE3_LAYOUT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';
import { Enemy, Kobold } from './enemy';
import {store} from '../state_management/store';
import { updatePlayerPosition, ControlAction } from '../state_management/actions/control_actions';
import { act } from 'react-dom/test-utils';
import { Player } from './player';
import { getCanvasDimensions } from '../helpers/util';
import { Sprite } from './sprite';
import { Treasure, Armor1Helmet, Armor1Body } from './treasure';
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


        // this.clearStage()


        platforms.map((platform: Platform) => this.viewport.addChild(platform.pixiSprite));

        treasures.map((treasure: Treasure) => {
            this.viewport.addChild(...treasure.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        })
 
        // this.viewport.addChild(...newplayer.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        this.viewport.addChild(...Object.keys(newplayer.spriteParts).map((key: string) => {
            const playerPartName = key as PlayerPartNames;
            return newplayer.spriteParts[playerPartName].sprite
        }))





        // platforms.map((platform: Platform) => this.viewport.addChild(platform.pixiSprite));

        // treasures.map((treasure: Treasure) => {
        //     this.viewport.addChild(...treasure.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        // })
 
        // // this.viewport.addChild(...newplayer.spriteParts.map((spritePart: SpritePart) => spritePart.sprite));
        // this.viewport.addChild(...Object.keys(newplayer.spriteParts).map((key: string) => {
        //     const playerPartName = key as PlayerPartNames;
        //     return newplayer.spriteParts[playerPartName].sprite
        // }))
    }

    clearStage(){
        this.viewport.removeChildren(0, this.viewport.children.length);
    }


    // Stage 1
    private buildStageOne(): Stage{
        const level = 1;
        const name = "beginners luck";
        const enemies = [ new Kobold(this.loader) ];
        // const platforms = [ new Platform(sprite) ] // TODO: pass platform sprite
        const platforms = this.generatePlatforms(STAGE3_LAYOUT);
        const tempTreasure = new Armor1Helmet(this.loader);
        tempTreasure.spriteParts[0].sprite.x = 313;
        tempTreasure.x = 313;
        const treasures = [ new Armor1Body(this.loader) ]
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
        const enemies = [ new Kobold(this.loader) ];
        // const platforms = [ new Platform(sprite) ] // TODO: pass platform sprite
        const platforms = this.generatePlatforms(STAGE3_LAYOUT);
        const treasures = [ new Armor1Body(this.loader) ]
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
        // const xIncrement = canvasDimensions.width / width;
        // const yIncrement = canvasDimensions.height / height;
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
    // player: Player;
    currentKeys: KeyOptions;
    player: Player;
    treasures: Treasure[];
    viewport: Viewport;


    constructor(level: number, name: string, enemies: Enemy[], platforms: Platform[], treasures: Treasure[], player: Player, viewport: Viewport){
        this.level = level;
        this.name = name;
        this.enemies = enemies;
        this.platforms = platforms;
        // this.player = player;
        this.currentKeys = {} as KeyOptions;
        this.player = player;
        this.treasures = treasures;
        this.viewport = viewport;
    }


    removeTreasure(treasureToRemove: Treasure){
        // console.log(JSON.stringify(this.treasures))
        this.treasures = this.treasures.filter((treasure: Treasure) => treasure != treasureToRemove);
        // console.log(JSON.stringify(this.treasures))

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
        console.log(this.viewport.left)
        console.log(this.viewport.right)
        const viewportCenter = this.viewport.center;
        this.viewport.follow(this.player.spriteParts[PlayerPartNames.HEAD].sprite);
        // const fakeDisplayObj = {
        //     x: this.player.spriteParts[PlayerPartNames.HEAD].sprite.x,
        //     y: this.player.spriteParts[PlayerPartNames.HEAD].sprite.y - 150,
        // } as PIXI.DisplayObject
        // this.viewport.follow(fakeDisplayObj);



        // if (this.player.x > viewportCenter.x){
        //     console.log('shift view port right')
        // }
        // else if (this.player.x < viewportCenter.x){
        //     console.log('shift viewport left')
        //     this.viewport.
        // }
        // else{
        //     console.log('middle')
        // }
    }

    // Update state of the sprite
    private updateAllSpriteStates(){
        // this.enemies.forEach((enemy: Enemy) => {
        //     enemy.update(this.currentKeys);
        // })
        // this.platforms.forEach((platform: Platform) => {
        //     platform.update(this.currentKeys);
        // })

        // New stuff
        this.player.update(this.currentKeys)
        // console.log(PlayerStateNames[this.player.state])
        // console.log(this.player.y)
        // console.log(this.player.attributes);
    }

    // Update all sprite positions
    private updateAllSpritePositions(){
        this.updatePlayerPosition()
        this.updateEnemyPositions();
    }

    private updatePlayerPosition(){

        // New stuff
        this.player.updateX(this.player.xVelocity);
        this.checkPlayerXCollisions();
        this.player.updateY(this.player.yVelocity);
        this.checkPlayerYCollisions();
        const canvasDimensions = getCanvasDimensions();
        // this.contain(this.player, {
        //     x: 0,
        //     y: 0,
        //     width: canvasDimensions.width,
        //     height: canvasDimensions.height,
        // } as Container)

        const action = updatePlayerPosition(this.player.x, this.player.y) as ControlAction;
        store.dispatch(action);
    }

    private updateEnemyPositions(){

    }


    private collideAny(player: Player, spriteGroup: Sprite[]){
        let collidedSprite;
        spriteGroup.forEach((sprite: Sprite) => {
            if (this.collide(player, sprite)){
                collidedSprite = sprite;
            }
        })
        return collidedSprite;
    }

    private checkPlayerXCollisions() {
        // const collideEnemy = this.collideAny(this.player, this.enemies);
        const collidePlatform = this.collideAny(this.player, this.platforms);

        const collideTreasures = this.collideAny(this.player, this.treasures)
        // console.log(collideTreasures)

        // if (collideEnemy){
        //     // handle enemy collision
        //     // console.log('collided with enemy in x');
        // }


        if (collideTreasures){
            this.handlePlayerTreasureCollisionX(this.player, collideTreasures);
        }
        if (collidePlatform){
            this.handlePlayerPlatformCollisionX(this.player, collidePlatform);

            // console.log('collided with paltform in x')
        }
    }


    private checkPlayerYCollisions(){
        // const collideEnemy = this.collideAny(this.player, this.enemies);
        const collidePlatform = this.collideAny(this.player, this.platforms); 
        
        // if (collideEnemy){
        //     // handle enemy collision
        // }

        if (collidePlatform){
            // handle platform collision
            this.handlePlayerPlatformCollisionY(this.player, collidePlatform);
            // console.log('collided with paltform in y')
        }

        if (this.isFalling(this.player)){
            this.player.setState(PlayerStateNames.FALLING);
        }
        else if (this.player.state == PlayerStateNames.FALLING){
            this.player.setState(PlayerStateNames.WALKING);
        }
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

    private isFalling(player: Player){
        // sprite.pixiSprite.y += 1;
        player.updateY(1);
        const platformCollision = this.collideAny(player, this.platforms);
        
        // ontop of some platform or jumping
        if (platformCollision || player.state === PlayerStateNames.JUMPING){
            // sprite.pixiSprite.y -= 1;
            player.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }






    

    private handlePlayerTreasureCollisionX(player: Player, treasure: Treasure){
        // console.log(treasure.x)
        // console.log(treasure.y)
        // console.log(this.treasures);
        // console.log(treasure);
        // console.log(treasure.spriteParts);
        // console.log(treasure.spriteParts[0].sprite.x)
        // console.log(treasure.spriteParts[1].sprite)
        treasure.apply(player);
        // this.viewport.removeChild(treasure.)s
        this.removeTreasure(treasure);
        // treasure.spriteParts.map( (spritePart: SpritePart) => {
        //     this.viewport.removeChild(spritePart.sprite);
        // })
    }

    private handlePlayerTreasureCollisionY(player: Player, treasure: Treasure){
        treasure.apply(player);

        treasure.spriteParts.map( (spritePart: SpritePart) => {
            this.viewport.removeChild(spritePart.sprite);
        })

        // this.treasures.map((mTreasure: Treasure) => {
        //     if (mTreasure === treasure){
        //         //  console.log('fi=uc off')
        //     }
        // })
        

    }

    private handlePlayerPlatformCollisionY(player: Player, collider: Sprite){

        if (player.yVelocity > 0){
            // player.pixiSprite.y = collider.top() - player.pixiSprite.height;
            player.setY(collider.top() - player.height);
        }
        else if(player.yVelocity < 0){
            // player.pixiSprite.y = collider.bottom();
            player.setY(collider.bottom());
        }

        player.yVelocity = 0;
    }

    private handlePlayerPlatformCollisionX(player: Player, collider: Sprite){
        // console.log('handling x collision')
        if (player.xVelocity > 0){
            player.setX(collider.left() - player.width);
            // player.x = collider.left() - player.width
        }
        else if (player.xVelocity < 0){
            // player.x = collider.right();
            player.setX(collider.right());
        }
        player.xVelocity = 0;
    }

    private collide(player: Player, sprite2: Sprite){
        // console.log('collide ')
        // console.log(player.left())
        if (sprite2.left() >= player.right() ||
            sprite2.right() <= player.left() ||
            sprite2.bottom() <= player.top() ||
            sprite2.top() >= player.bottom()){
                // console.log('no collide')
                return false;
            }
        return true;
    }

}







