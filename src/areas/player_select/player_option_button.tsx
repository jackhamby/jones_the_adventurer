
import React from 'react';
import './player_option_button.css';
import { Player } from '../../classes/players/player';
import { Knight } from '../../classes/players/knight';
import { Kobold } from '../../classes/players/kobold';
import { Orc } from '../../classes/players/orc';


interface PlayerOptionButtonProps {
    player: typeof Player;
    changePlayer: (player: typeof Player) => void;
}

export class PlayerOptionButton extends React.Component<PlayerOptionButtonProps, {}> {

    // TODO: safely grab image
    onClick = (event: any) => {
        this.props.changePlayer(this.props.player);
    }

    renderCharacterImage(): JSX.Element{
        let src = "";
        switch(this.props.player){
            case(Knight):
                src = '/images/knight/knight_sm.png';
                break;
            case(Kobold):
                src = '/images/kobold/kobold_sm.png';
                break;
            case(Orc):
                src = '/images/orc/orc_sm.png';
                break;
        }
        return <input type="image" src={src} alt="character icon"></input>;
    }

    
    
    render(){
        return (
            <React.Fragment>
                <div className="col-4" style={{maxHeight: '100px'}}>
                    <button className='option-button' onClick={this.onClick}>
                        {this.renderCharacterImage()}
                    </button>
                    <span className="option-label">{`${this.props.player._name}`}</span>
                </div>
            </React.Fragment>
        );
    }
}
