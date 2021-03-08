import * as React from 'react';
import { useState } from 'react';
import { StageTemplate } from '../../types/interfaces';
import { Redirect } from 'react-router-dom';
import { PlayerSelectWrapper } from '../player_select/player_select_wrapper';
import { Player } from '../../classes/players/player';

interface StageListLinkProps {
    template: StageTemplate;
    // changePlayer: (player: typeof Player) => void;
    changeStage: (stage: StageTemplate) => void;
    // selectedPlayer: typeof Player;
}

export const StageListLink = (props: StageListLinkProps) => {

    const [playTesting, setPlayTesting] = useState(false);

    const playTestStage = () => {
        props.changeStage(props.template);
        setPlayTesting(true);
    }

    if (playTesting){
        return (
            <Redirect to="player-select"/>
        );
    }

    return (
        <div className="row p-2">
            <div className="col-3">
                {props.template.name}
            </div>
            <div className="col-3">
                <button onClick={playTestStage}>try it out</button>
            </div>
            <div className="col-6"></div>
        </div>
    );

    
}