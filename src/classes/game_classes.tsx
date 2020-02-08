import * as PIXI from 'pixi.js';
import { KeyOptions, IStage } from '../types/states';
import { PlayerStates } from '../types/enums';
import { Platform, DefaultPlatform } from './platform';
import { Sprite } from './sprite'
import { STAGE1_LAYOUT, STAGE2_LAYOUT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';
import { Enemy, Kobold } from './enemy';
import {store} from '../state_management/store';
import { updatePlayerPosition, ControlAction } from '../state_management/actions/control_actions';
import { act } from 'react-dom/test-utils';
import { Player } from './player';


export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
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
    newPlayer: Player;


    constructor(level: number, name: string, enemies: Enemy[], platforms: Platform[], newPlayer: Player){
        this.level = level;
        this.name = name;
        this.enemies = enemies;
        this.platforms = platforms;
        // this.player = player;
        this.currentKeys = {} as KeyOptions;
        this.newPlayer = newPlayer;
    }


    update(keys: KeyOptions){
        this.currentKeys = keys;
        this.updateAllSpriteStates();
        this.updateAllSpritePositions();

    }

    // Update state of the sprite
    private updateAllSpriteStates(){
        // this.player.update(this.currentKeys);
        this.enemies.forEach((enemy: Enemy) => {
            enemy.update(this.currentKeys);
        })
        this.platforms.forEach((platform: Platform) => {
            platform.update(this.currentKeys);
        })

        // New stuff
        this.newPlayer.update(this.currentKeys)
        console.log(PlayerStates[this.newPlayer.state])
    }

    // Update all sprite positions
    private updateAllSpritePositions(){
        this.updatePlayerPosition()
        this.updateEnemyPositions();
    }

    private updatePlayerPosition(){
        // this.player.pixiSprite.x += this.player.xVelocity;        
        // this.checkPlayerXCollisions();
        // this.player.pixiSprite.y += this.player.yVelocity;
        // this.checkPlayerYCollisions();
        // this.contain(this.player, {
        //     x: 0,
        //     y: 0,
        //     width: SCREEN_WIDTH,
        //     height: SCREEN_HEIGHT,
        // } as Container)

        
        // const action = updatePlayerPosition(this.player.pixiSprite.x, this.player.pixiSprite.y) as ControlAction;
        // store.dispatch(action);

        // New stuff
        this.newPlayer.updateX(this.newPlayer.xVelocity);
        this.checkPlayerXCollisions();
        this.newPlayer.updateY(this.newPlayer.yVelocity);
        this.checkPlayerYCollisions();

        const action = updatePlayerPosition(this.newPlayer.x, this.newPlayer.y) as ControlAction;
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
        const collideEnemy = this.collideAny(this.newPlayer, this.enemies);
        const collidePlatform = this.collideAny(this.newPlayer, this.platforms);

        if (collideEnemy){
            // handle enemy collision
            // console.log('collided with enemy in x');
        }

        if (collidePlatform){
            this.handlePlayerCollisionX(this.newPlayer, collidePlatform);

            // console.log('collided with paltform in x')
        }
    }


    private checkPlayerYCollisions(){
        const collideEnemy = this.collideAny(this.newPlayer, this.enemies);
        const collidePlatform = this.collideAny(this.newPlayer, this.platforms); 
        
        if (collideEnemy){
            // handle enemy collision
        }

        if (collidePlatform){
            // handle platform collision
            this.handlePlayerCollisionY(this.newPlayer, collidePlatform);
            // console.log('collided with paltform in y')
        }

        if (this.isFalling(this.newPlayer)){
            this.newPlayer.setState(PlayerStates.FALLING);
        }
        else if (this.newPlayer.state == PlayerStates.FALLING){
            this.newPlayer.setState(PlayerStates.WALKING);
        }
    }

    private handlePlayerCollisionY(player: Player, collider: Sprite){
        // console.log('handleing y collision')

        if (player.yVelocity > 0){
            // player.pixiSprite.y = collider.top() - player.pixiSprite.height;
            this.newPlayer.setY(collider.top() - player.height);
        }
        else if(player.yVelocity < 0){
            // player.pixiSprite.y = collider.bottom();
            this.newPlayer.setY(collider.bottom());
        }

        player.yVelocity = 0;
    }


    private contain(sprite: Sprite, container: Container){
        // contain right side of container
        if (sprite.left() < container.x){
            sprite.pixiSprite.x = container.x + 1;
        }
        // contain left side of container
        if (sprite.right() > (container.x + container.width)){
            sprite.pixiSprite.x = (container.x + container.width) - sprite.pixiSprite.width
        }
        // contain top of container
        if (sprite.top() < container.y){
            sprite.pixiSprite.y = container.y + 1;
        }
        if (sprite.bottom() > (container.y + container.height)){
            sprite.pixiSprite.y = (container.y + container.height) - sprite.pixiSprite.height;
        }

    }

    private isFalling(player: Player){
        // sprite.pixiSprite.y += 1;
        player.updateY(1);
        const platformCollision = this.collideAny(player, this.platforms);
        
        // ontop of some platform or jumping
        if (platformCollision || player.state === PlayerStates.JUMPING){
            // sprite.pixiSprite.y -= 1;
            player.updateY(-1);
            return false;
        }
        // falling
        else{
            return true;
        }
    }





    private handlePlayerCollisionX(player: Player, collider: Sprite){
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


export class StageManager {

    loader: PIXI.Loader;
    newPlayer: Player;

    constructor(loader: PIXI.Loader, newPlayer: Player){
        this.loader = loader;
        this.newPlayer  = newPlayer;
    }

    // Get a stage by its level
    getStage(level: number){
        switch(level) {
            case(1):
                return this.buildStageOne();
            default:
                throw "no stage"
        }
    }


    // Stage 1
    private buildStageOne(){
        const level = 1;
        const name = "beginners luck";
        const enemies = [ new Kobold(this.loader) ];
        // const platforms = [ new Platform(sprite) ] // TODO: pass platform sprite
        const platforms = this.generatePlatforms(STAGE2_LAYOUT);
        return new Stage(
            level,
            name,
            enemies,
            platforms,
            this.newPlayer,
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
        const xIncrement = SCREEN_WIDTH / width;
        const yIncrement = SCREEN_HEIGHT / height;

        // loop height
        for(var i = 1; i < height + 1; ++i){
            const row = lines[i];
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




