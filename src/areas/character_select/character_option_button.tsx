
import React from 'react';
import './character_option_button.css';
import { PlayerOptionNames } from '../../types/enums';
import { Player } from '../../classes/players/player';


export interface CharacterOptionButtonProps {
    character: PlayerOptionNames;
    changeCharacter: (character: PlayerOptionNames) => void;
}

export class CharacterOptionButton extends React.Component<CharacterOptionButtonProps, {}> {

    // TODO: safely grab image
    onClick = (event: any) => {
        this.props.changeCharacter(this.props.character);
    }

    renderCharacterImage(): JSX.Element{
        let src = "";
        switch(this.props.character){
            case(PlayerOptionNames.KNIGHT):
                src = '/images/knight/knight_sm.png'
                break;
            case(PlayerOptionNames.KOBOLD):
                src = '/images/kobold/kobold_sm.png'
                break;
            case(PlayerOptionNames.ORC):
                src = '/images/orc/orc_sm.png'
                break;
        }
        return <input type="image" src={src}></input>;
    }

    
    
    render(){
        return(
            <React.Fragment>
                <div className="col-4" style={{maxHeight: '100px'}}>
                    <button className='option-button' onClick={this.onClick}>
                        {this.renderCharacterImage()}
                        {/* <input type="image" src={`${this.props.character}_sm.png`}></input>  */}
                    </button>
                    <span className="option-label">{`${this.props.character}`}</span>
                </div>
        
            </React.Fragment>

        )
    }
}

export default CharacterOptionButton;