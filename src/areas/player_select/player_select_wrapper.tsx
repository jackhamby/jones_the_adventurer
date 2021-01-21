
import React from 'react';
import './player_select_wrapper.css';
import { ScreenOptions } from '../../types/enums';
import { PlayerSelect } from './player_select';
import { PlayerDisplay } from './player_display';
import { Player } from '../../classes/players/player';

interface PlayerSelectWrapperProps {
    updateScreen: (screenName: ScreenOptions) => void;
    changePlayer: (player: typeof Player) => void;
    selectedPlayer: typeof Player;
}


export class PlayerSelectWrapper extends React.Component<PlayerSelectWrapperProps, {}> {
    render(){
        return(
            <div className="container" style={{height: "100%"}}>

                <div className="row top-container">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <h3> Choose your character </h3>
                    </div>
                    <div className="col-1"></div>

                </div>
                <div className="row body-container" >
                    <div className="col-4 character-display-container">
                        <PlayerDisplay player={this.props.selectedPlayer} />
                    </div>
                    <div className="col-7 offset-1 character-select-container">
                        <PlayerSelect changePlayer={ this.props.changePlayer }/>
                    </div>
                </div>
                <div className="row bottom-container">
                    <div className="col-10"></div>
                    <div className="col-2 mt-2 mb-1">
                        <button className="btn-block float-right" onClick={() => { this.props.updateScreen(ScreenOptions.GAME) }}>Start</button>
                    </div>
                </div>  
            </div>
        );
    }
}
