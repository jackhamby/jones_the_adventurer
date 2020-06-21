import { KeyOptions } from "../types/states";

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

export const mapKeys = (key: string, prevKeyOptions: KeyOptions, toggle: boolean): KeyOptions => {
    switch(key){
        case 'a':
            prevKeyOptions.moveLeft = toggle;
            break;
        case 'd':
            prevKeyOptions.moveRight = toggle;
            break;
        case 'w':
            prevKeyOptions.moveUp = toggle;
            break;
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
        default:
            // unhandled key action
            break;
    }
    return prevKeyOptions
}