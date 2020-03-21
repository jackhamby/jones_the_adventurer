
import React from 'react';
import { Treasure } from '../../classes/treasure';


export interface TreasureDetailProps {
    treasure: Treasure;
}

export class TreasureDetail extends React.Component<TreasureDetailProps, {}>{


    render(){
        return (
            <div style={{width: "28%", margin: "2%", backgroundColor: "red"}}> {this.props.treasure.name} </div>
        )
    }






}