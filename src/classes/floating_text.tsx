import { TEXT_FADE_TIME } from "../types/constants";
import * as PIXI from "pixi.js";
import { Stage } from "./stages/stage";


export class FloatingText {
    currentStage: Stage;
    x: number;
    y: number;
    text: string;
    style?: PIXI.TextStyle;
    displayObject: PIXI.DisplayObject;


    constructor(currentStage: Stage, x: number, y: number, text: string, style?: PIXI.TextStyle){
        this.currentStage = currentStage;
        this.x = x;
        this.y = y;
        this.text = text;
        this.style = style 
            ? style 
            : {
                fontSize: '12px',
                fill: '#FF0000',
            } as PIXI.TextStyle
        this.displayObject = this.initializeText();

    }

    initializeText(): PIXI.DisplayObject{
        const displayObject =  new PIXI.Text(this.text, this.style);
        displayObject.x = this.x;
        displayObject.y = this.y;
        return displayObject;
    }

    update() {
        this.y -= 1;
        this.displayObject.y = this.y;
        this.displayObject.alpha -= 1 / TEXT_FADE_TIME;  
        if (this.displayObject.alpha <= 0){
            this.remove();
        }  
    }

    remove(){
        this.currentStage.viewport.removeChild(this.displayObject);
    }



}

// var test = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
