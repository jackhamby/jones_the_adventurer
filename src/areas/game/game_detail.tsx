
import React from 'react';
import * as PIXI from 'pixi.js';
import { Stage } from '../../classes/game_classes';
import './game_detail.css'

export interface GameDetailProps {
    stage: Stage;
}

export class GameDetail extends React.Component<GameDetailProps, {}> {

    render(){
        if (this.props.stage){
            return (
                <div className="col-12">
                    <h2>
                        Stage: {this.props.stage.level}
                    </h2>
                    <h4 className="stage-name-text">
                        {this.props.stage.name }
                    </h4>
                </div>
                // <React.Fragment>
                //     <div> Stage {this.props.stage.level}</div>
                //     <div> {this.props.stage.name }</div>
                // </React.Fragment>
            )
        }
        return (
            <div>Game Details</div>
        )
    }

}