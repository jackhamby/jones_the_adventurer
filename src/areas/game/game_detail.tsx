

import React from 'react';
import * as PIXI from 'pixi.js';
import './game_detail.css'
import { UnitStatistics } from '../../types/types';
import { UnitStatisticNames, UnitAttributeNames } from '../../types/enums';
import { GameController } from '../../classes/game_controller';
import { Stage } from '../../classes/stages/stage';
import { Player } from '../../classes/players/player';
import { DebuggerModal } from '../../components/modals/debugger_modal';

export interface GameDetailProps {
    player?: Player;
    // stage: Stage;
    // statistics: UnitStatistics;
    gameController: GameController;

}

export class GameDetail extends React.Component<GameDetailProps, {}> {


    renderStatistics(): JSX.Element {
        const tableRows: JSX.Element[] = [];
        if (!this.props.player){
            return <></>;
        }
        Object.keys(this.props.player.statistics).forEach((statisticName: string) => {
            const test = statisticName as UnitStatisticNames
            const stat = this.props.player?.statistics[statisticName as UnitStatisticNames];
            const row = (<tr>
                <td>
                    {test}:
                </td>
                <td className='ml-2'>
                    {stat}
                </td>
            </tr>)
            tableRows.push(row);
        })
        return (
            <table className="p-3">
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        );
    }

    render(){
        if (this.props.player){
            return (
                <>
                    <div className="col-12">
                        <h2>
                            stage: {this.props.player.currentStage.level}
                        </h2>
                        <h4 className="stage-name-text">
                            {this.props.player.currentStage.name }
                        </h4>
                        <div>
                            {this.renderStatistics()}
                        </div>
                    </div>
                    <div className="ml-3 mt-5">
                        <DebuggerModal control={this.props.gameController}/>
                    </div>
                </>
            )
        }
        return (
            <div>Game Details</div>
        )
    }

}