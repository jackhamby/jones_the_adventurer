import React from 'react';
import { PlayerOptionButton } from './player_option_button';
import { Player } from '../../classes/players/player';
import { Knight } from '../../classes/players/knight';
import { Kobold } from '../../classes/players/kobold';
import { Orc } from '../../classes/players/orc';

interface PlayerSelectProps {
    changePlayer: (player: typeof Player) => void
}

export class PlayerSelect extends React.Component<PlayerSelectProps, {}> {

    render(){
        return (
            <React.Fragment>
                <div className="row mt-5 ml-5" style={{height: "100%"}}> 
                    <PlayerOptionButton player={Knight} changePlayer={this.props.changePlayer}/>
                    <PlayerOptionButton player={Kobold} changePlayer={this.props.changePlayer}/>
                    <PlayerOptionButton player={Orc} changePlayer={this.props.changePlayer}/>
                </div>
            </React.Fragment>
        );
    }
}
