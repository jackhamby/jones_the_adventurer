import { TEXT_FADE_TIME } from "../types/constants";
import * as PIXI from "pixi.js";
import { Stage } from "./stage/stage";


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

    update() {
        this.y -= 1;
        this.displayObject.y = this.y;
        this.displayObject.alpha -= 1 / TEXT_FADE_TIME;  
        if (this.displayObject.alpha <= 0){
            this.remove();
        }  
    }

    add(){
        this.currentStage.floatingTexts.push(this);
        this.currentStage.viewport.addChild(this.displayObject);
    }

    remove(){
        this.currentStage.viewport.removeChild(this.displayObject);
    }

    // ================================ private  ==================================== 
    // ==============================================================================

    protected initializeText(): PIXI.DisplayObject{
        const displayObject =  new PIXI.Text(this.text, this.style);
        displayObject.x = this.x;
        displayObject.y = this.y;
        return displayObject;
    }

}
