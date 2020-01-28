
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
                <div className="row">
                    <div className="col-6">
                <div> x: {player.pixiSprite.x}</div>

                    </div>
                    <div className="col-6">
                                     <div> y: {player.pixiSprite.y}</div>
   
                    </div>

                </div>


            )
        }
        return (
            <div>Game char Detail</div>
        )
    }

}