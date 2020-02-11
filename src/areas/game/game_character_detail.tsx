
import React from 'react';
import { Stage } from '../../classes/game_classes';

export interface GameCharacterDetailProps {
    stage: Stage;
}

export class GameCharacterDetail extends React.Component<GameCharacterDetailProps, {}> {
        
    render(){
        if (this.props.stage){
            const player = this.props.stage.player
            return (
                <React.Fragment>
                    <div className="col-6">
                        <div> x: {Math.round(player.x)}</div>
                    </div>
                    <div className="col-6">
                        <div> y: {Math.round(player.y)}</div>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <div>Game char Detail</div>
        )
    }

}