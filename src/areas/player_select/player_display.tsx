import React from 'react';
import './player_display.css';
import { PlayerAttributeDisplay } from './player_attribute_display';
import { MAX_ATTRIBUTES } from '../../types/constants';
import { Kobold } from '../../classes/players/kobold';
import { Player } from '../../classes/players/player';
import { Knight } from '../../classes/players/knight';
import { Orc } from '../../classes/players/orc';

interface PlayerDisplayProps {
    player: typeof Player;
}

export class PlayerDisplay extends React.Component<PlayerDisplayProps, {}> {

    componentWillMount(){
        var j = this.props.player.baseAttributes;
    }

    renderAttributes = () => {
        return (
            <React.Fragment>
                <PlayerAttributeDisplay  attribute="health" value={this.props.player.baseAttributes.HEALTH} maxValue={MAX_ATTRIBUTES.HEALTH} tooltip="tooltip" />
                <PlayerAttributeDisplay attribute="speed" value={this.props.player.baseAttributes.SPEED} maxValue={MAX_ATTRIBUTES.SPEED}  tooltip="tooltip" />
                <div className="col-12"></div> 
                <div className="col-12"></div>
                <div className="col-12"></div>
                <div className="col-12"></div>
                <div className="col-12"></div>
                <div className="col-12"></div>
            </React.Fragment>
        )
    }

    renderCharacterImage = () => {
        let src = "";
        switch(this.props.player){
            case(Knight):
                src = '/images/knight/knight_lg.png'
                break;
            case(Kobold):
                src = '/images/kobold/kobold_lg.png'
                break;
            case(Orc):
                src = '/images/orc/orc_lg.png'
                break;
            default: 
                break;
        }
        return <input type="image" src={src} width={250} height={300} className="pt-1"></input>;
    }

    render(){
        return (   
        <React.Fragment>
            <div className="row icon-contianer m-auto">
                {this.renderCharacterImage()}
            </div>
            <div className="row stats-container">
                {this.renderAttributes()}
            </div>
        </React.Fragment>
        )
    }
}
