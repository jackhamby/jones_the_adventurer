
import React from 'react';
import * as PIXI from 'pixi.js';
import { Stage } from '../../classes/game_classes';
import './game_detail.css'
import { UnitStatistics } from '../../types/types';

export interface GameDetailProps {
    stage: Stage;
    statistics: UnitStatistics;
}

export class GameDetail extends React.Component<GameDetailProps, {}> {


    renderStatistics(): JSX.Element {
        return <></>;
    }

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

                    <div>
                        <ul>
                            <li>
                               damage dealt: {this.props.statistics.damage}
                            </li>
                            <li>
                               projectiles fired: {this.props.statistics.projectiles}
                            </li>
                            <li>
                               enemies slain: {this.props.statistics.killed}
                            </li>
                        </ul>


                    </div>
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