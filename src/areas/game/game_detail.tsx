
import React from 'react';
import * as PIXI from 'pixi.js';
import { Stage } from '../../classes/game_classes';
import './game_detail.css'
import { UnitStatistics } from '../../types/types';
import { UnitStatisticNames } from '../../types/enums';
import { DebuggerModal } from '../../components/modals/debugger_modal';
import { GameController } from '../../classes/game_controller';

export interface GameDetailProps {
    stage: Stage;
    statistics: UnitStatistics;
    gameController: GameController;

}

export class GameDetail extends React.Component<GameDetailProps, {}> {


    renderStatistics(): JSX.Element {
        const tableRows: JSX.Element[] = [];
        Object.keys(this.props.statistics).forEach((statisticName: string) => {
            const stat = this.props.statistics[statisticName as UnitStatisticNames];
            const row = (<tr>
                <td>
                    {statisticName}:
                </td>
                <td className='ml-2'>
                    {stat}
                </td>
            </tr>)
            tableRows.push(row);
        })
        return (<table className="p-3">
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>);
    }

    render(){
        if (this.props.stage){
            return (
                <>
                    <div className="col-12">
                        <h2>
                            stage: {this.props.stage.level}
                        </h2>
                        <h4 className="stage-name-text">
                            {this.props.stage.name }
                        </h4>
                        <div>
                            {this.renderStatistics()}
                        </div>
                    </div>
                    <DebuggerModal control={this.props.gameController}/>
                </>
            )
        }
        return (
            <div>Game Details</div>
        )
    }

}