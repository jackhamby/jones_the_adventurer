import React, { createRef } from 'react';
import * as PIXI from 'pixi.js';
import './game_display.css';

interface GameDisplayProps {
    pixiApplication: PIXI.Application;
}

export class GameDisplay extends React.Component<GameDisplayProps> {

    private canvasRef = createRef<HTMLDivElement>();

    toggleMusic(){
        const music = document.getElementById("music") as HTMLAudioElement;
        const speakerImage = document.getElementById("speakerImage") as HTMLImageElement;
        if(music && speakerImage){
            if(music.paused){
                speakerImage.src = 'images/audio/audioOn.png';
                music.play();                
            }else{
                speakerImage.src = 'images/audio/audioOff.png'
                music.pause();                
            }               
        }
    }

    componentDidMount(){
        const canvasHtmlElement = this.canvasRef.current;
        canvasHtmlElement?.appendChild(this.props.pixiApplication.view);
        const containerHeight = canvasHtmlElement ? canvasHtmlElement.clientHeight : 1;
        const containerWidth = canvasHtmlElement ? canvasHtmlElement.clientWidth : 1;
        this.props.pixiApplication.renderer.resize(containerWidth, containerHeight);        
    }

 
    render(){
        return (
            <>
            {/* TODO clean up this css */}
                <button style={{position:"absolute", top: '13%', left: '15%' }} onClick={this.toggleMusic}><img id={"speakerImage"} src={"images/audio/audioOff.png"}/></button>
                <audio src={"audio/music/game.mp3"} id={"music"} loop/>
                <div className="game-container" id="canvas-container" ref={this.canvasRef}>

                </div>
            </>
        )
    }
} 
