import * as React from 'react';
import { FloatingText } from '../floating_text';
import { Stage } from '../stage/stage';

export class IncreaseText extends FloatingText {

    constructor(currentStage: Stage, x: number, y: number, text: string, style?: PIXI.TextStyle){
        super(currentStage, x, y, text, style);
        this.currentStage = currentStage;
        this.x = x;
        this.y = y;
        this.text = text;
        this.style = style 
            ? style 
            : {
                fontSize: '12px',
                fill: '#006400',
            } as PIXI.TextStyle
        this.displayObject = this.initializeText();
    }

    render(){
        return new FloatingText(this.currentStage, this.x, this.y, `+${this.text}`);
    }

}