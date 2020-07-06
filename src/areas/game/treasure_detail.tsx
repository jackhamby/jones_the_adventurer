
import React from 'react';
import * as PIXI from 'pixi.js';
import { Treasure } from '../../classes/treasures/treasure';


export interface TreasureDetailProps {
    treasure: Treasure;
}

export class TreasureDetail extends React.Component<TreasureDetailProps, {}>{


    render(){
        // the original url for the image is stored here on the PIXI.BaseTexture
        const url: string = this.props.treasure.treasureIconTexture.textureCacheIds[1];
        return (
            <div className="p-1 font-size-sm text-align-center" style={{width: "28%", margin: "2%",  border: '1px solid black'}}> 
                <span> 
                    {this.props.treasure.name} 
                </span>
                <div>
                    <img src={url}/>
                </div>
                
            </div>

        )
    }






}