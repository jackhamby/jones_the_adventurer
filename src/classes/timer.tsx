import { TEXT_FADE_TIME } from "../types/constants";
import * as PIXI from "pixi.js";
import { Stage } from "./stages/stage";


export class Timer {
    currentStage: Stage;
    x: number;
    y: number;
    timerText: string;
    timerValue: number;
    style?: PIXI.TextStyle;
    displayObject: PIXI.Text;
    ticker: PIXI.Ticker;

    constructor(currentStage: Stage, x: number, y: number, style?: PIXI.TextStyle){
        this.currentStage = currentStage;
        this.x = x;
        this.y = y;
        this.timerText = "0.0s";
        this.timerValue = 0;
        this.style = style 
            ? style 
            : {
                fontSize: '16px',
                fill: '#000000',
            } as PIXI.TextStyle
        this.displayObject = this.initializeText();
        this.ticker = new PIXI.Ticker()
        this.ticker.start()
    }

    initializeText(): PIXI.Text{
        const displayObject =  new PIXI.Text(this.timerText, this.style);
        displayObject.x = this.x;
        displayObject.y = this.y;
        return displayObject;
    }

    update() {
        this.x = this.currentStage.viewport.corner.x + 20;
        this.y = this.currentStage.viewport.corner.y + 20;
        this.displayObject.x = this.x;
        this.displayObject.y = this.y;
        const milliSecondsSinceLastFrame = this.ticker.elapsedMS;
        this.timerValue += milliSecondsSinceLastFrame / 1000;
        this.timerText = this.timerValue.toFixed(1);
        this.displayObject.text = this.timerText; 
    }

    remove(){
        this.currentStage.viewport.removeChild(this.displayObject);
    }

}

