import { KeyOptions, StageBuilderKeyOptions } from "../types/states";

export const getCanvasDimensions = () => {
    const element = document.getElementById('canvas-container')
    const width = element ? element.clientWidth : 500;
    const height = element ? element.clientHeight : 500;
    return {
        width,
        height
    }
}

export const toDegrees = (radians:number): number => {
    const degrees = (radians * 180) / Math.PI;
    return degrees;
}

export const toRadians = (degrees: number): number => {
    const radians = (degrees * Math.PI) / 180;
    return radians;
}


export const mapStageBuilderKeys = (key: string, prevKeyOptions: StageBuilderKeyOptions, toggle: boolean): StageBuilderKeyOptions => {
    switch(key){
        case "Control":
            prevKeyOptions.control = toggle;
            break;
        case "Shift":
            prevKeyOptions.shift = toggle;
            break;
        default:
            break;
    }

    return null;
} 

export const mapKeys = (key: string, prevKeyOptions: KeyOptions, toggle: boolean): KeyOptions => {
    switch(key){
        case 'A':
        case 'a':
            prevKeyOptions.moveLeft = toggle;
            break;
        case 'D':
        case 'd':
            prevKeyOptions.moveRight = toggle;
            break;
        case 'W':
        case 'w':
            prevKeyOptions.moveUp = toggle;
            break;
        case 'S':
        case 's': 
            prevKeyOptions.moveDown = toggle;
            break;
        case ' ':
            prevKeyOptions.jump = toggle;
            break;
        case 'ArrowRight':
            prevKeyOptions.attackRight = toggle;
            break;
        case 'ArrowLeft':
            prevKeyOptions.attackLeft = toggle;
            break;
        case 'ArrowUp':
            prevKeyOptions.attackUp = toggle;
            break;
        case 'ArrowDown':
            prevKeyOptions.attackDown = toggle;
            break;
        case 'Q':
        case 'q':
            prevKeyOptions.spell1 = toggle;
            break;
        case 'E':
        case 'e':
            prevKeyOptions.spell2 = toggle;
            break;
        case 'R':
        case 'r':
            prevKeyOptions.spell3 = toggle;
            break;
        default:
            // unhandled key action
            break;
    }
    return prevKeyOptions
}


export const loadTextures = (pixiApplication: PIXI.Application, callBack: Function) => {
    pixiApplication.loader

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

        // Add projectile images
        .add('rock', 'images/projectiles/rock.png')
        .add('arrow', 'images/projectiles/dart.png')
        .add('stinger', 'images/projectiles/stinger.png')
        .add('axe', 'images/projectiles/axe.png')
        .add('fire_ball', 'images/projectiles/fire_ball.png')
        .add('fire_ball_md', 'images/projectiles/fire_ball_md.png')

        // Add attribute images
        .add('speed', 'images/attributes/speed.png')

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
            callBack();
        });
}