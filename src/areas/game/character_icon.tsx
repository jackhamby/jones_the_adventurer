

import React, { createRef } from 'react';
import * as PIXI from 'pixi.js';
import { Player, PlayerParts } from '../../classes/player';
import { PlayerPartNames } from '../../types/enums';


interface CharacterIconProps {
    imagePath: string;
    player: Player;
}


type TOCHANGE = {
    [key in PlayerPartNames] : PIXI.Sprite;
}

export class CharacterIcon extends React.Component<CharacterIconProps, {}>{

    private canvasRef = createRef<HTMLDivElement>();
    app: PIXI.Application;
    appWidth: number;
    appHeight: number;
    spriteParts: TOCHANGE;

    constructor(props: CharacterIconProps){
        super(props)
        this.app = new PIXI.Application({

        })
        this.appWidth = 1;
        this.appHeight = 1;
        this.spriteParts = {} as TOCHANGE;
    }


    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.app.view);
        this.app.renderer.backgroundColor = 0xFFFFFF;
        this.appHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight - (canvasHtmlElement.clientHeight * .2) : 1;
        this.appWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth - (canvasHtmlElement.clientWidth * .1) : 1;
        this.resize(this.appWidth, this.appHeight);
        this.updateIconImage()
    }

    componentDidUpdate(){
        this.updateIconImage()
    }


    clearStage(){
        this.app.stage.removeChildren(0, this.app.stage.children.length);
        const borders = this.createBorder();
        this.app.stage.addChild(borders);
    }

    updateIconImage(){
        this.clearStage()

        // Need to copy the sprite parts so we dont share sprite on 2 canvas
        this.spriteParts = this.copySpriteParts();
        let x = (this.appWidth / 2) - (this.props.player.width / 2);
        let y = (this.appHeight / 2) -  (this.props.player.height / 2);

        const hs = this.spriteParts[PlayerPartNames.HEAD];
        hs.x = x;
        hs.y = y;

        const bs = this.spriteParts[PlayerPartNames.BODY];
        bs.x = x + this.props.player.spriteParts[PlayerPartNames.BODY].offSetX;
        bs.y = y + this.props.player.spriteParts[PlayerPartNames.BODY].offSetY;


        const ls = this.spriteParts[PlayerPartNames.LEGS];
        ls.x = x + this.props.player.spriteParts[PlayerPartNames.LEGS].offSetX;
        ls.y = y + this.props.player.spriteParts[PlayerPartNames.LEGS].offSetY;


        this.app.stage.addChild(...Object.keys(this.spriteParts).map((key: string) => {
            const playerPartName = key as PlayerPartNames;
            return this.spriteParts[playerPartName];
        }))
    }






    resize(width: number, height: number){
        this.app.renderer.resize(width, height)
    }

    copySpriteParts(){
        let newParts = {} as any;


        

        Object.keys(this.props.player.spriteParts).map((key: string) => {
            const playerPartName = key as PlayerPartNames;
            const spritePart = this.props.player.spriteParts[playerPartName];
            const copySprite = new PIXI.Sprite(spritePart.sprite.texture);
            newParts[playerPartName] =  copySprite;            
        })

        return newParts;


    }


    createBorder(): PIXI.Graphics{
        var graphics = new PIXI.Graphics();
        const margin = 5;
        graphics.beginFill(0x000000);

        // set the line style to have a width of 5 and set the color to red
        graphics.lineStyle(5, 0x000000);

        // draw a rectangle
        graphics.drawRect(0, 0, this.appWidth, margin);
        graphics.drawRect(this.appWidth - margin, 0, margin, this.appHeight);
        graphics.drawRect(0, 0, margin, this.appHeight)
        graphics.drawRect(0, this.appHeight - margin, this.appWidth, margin);

        return graphics;
    }

    render(){

        return (
            <React.Fragment>
                <div className="h-100 p-1"ref={this.canvasRef}>

                </div>
            </React.Fragment>   
        )
    };


}