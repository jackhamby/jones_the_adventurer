import React, { useState } from 'react';
import './player_select_wrapper.css';
import { PlayerSelect } from './player_select';
import { PlayerDisplay } from './player_display';
import { Player } from '../../classes/players/player';
import { Link } from 'react-router-dom';
import { StageTemplate } from '../../types/interfaces';
import { Redirect } from 'react-router-dom';
import { GameWrapper } from '../game/game_wrapper';

interface PlayerSelectWrapperProps {
    changePlayer: (player: typeof Player) => void;
    selectedPlayer: typeof Player;
    // template?: StageTemplate;
}

export const PlayerSelectWrapper = (props: PlayerSelectWrapperProps) => {

        const [startingGame, setStartingGame] = useState(false);

        if (startingGame){
            return (
                <Redirect to="/game"/>
            );
        }
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
                        <PlayerDisplay player={props.selectedPlayer} />
                    </div>
                    <div className="col-7 offset-1 character-select-container">
                        <PlayerSelect changePlayer={props.changePlayer }/>
                    </div>
                </div>
                <div className="row bottom-container">
                    <div className="col-10"></div>
                    <div className="col-2 mt-2 mb-1">
                        {/* <Link to="/game"> */}
                            <button onClick={() => setStartingGame(true)} className="btn-block float-right">Start</button>
                        {/* </Link> */}
                    </div>
                </div>  
            </div>
        );
}
