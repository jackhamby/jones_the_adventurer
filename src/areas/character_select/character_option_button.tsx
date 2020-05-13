
import React from 'react';
import { CharacterOptions } from '../../types/enums';
import './character_option_button.css';


export interface CharacterOptionButtonProps {
    character: CharacterOptions;
    changeCharacter: (character: CharacterOptions) => void;
}

export class CharacterOptionButton extends React.Component<CharacterOptionButtonProps, {}> {

    // TODO: safely grab image
    onClick = (event: any) => {
        this.props.changeCharacter(this.props.character);
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="col-4" style={{maxHeight: '100px'}}>
                    <button className='option-button' onClick={this.onClick}>
                        <input type="image" src={`${this.props.character}_sm.png`}></input> 
                    </button>
                    <span className="option-label">{`${this.props.character}`}</span>
                </div>
        
            </React.Fragment>

        )
    }
}

export default CharacterOptionButton;