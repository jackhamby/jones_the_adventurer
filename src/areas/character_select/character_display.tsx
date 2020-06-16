
import React from 'react';
import './character_display.css';
import { CharacterAttributeDisplay } from './character_attribute_display';
import { Character } from '../../types/states';
import { MAX_ATTRIBUTES } from '../../constants';
import { PlayerOptionNames } from '../../types/enums';

export interface CharacterDisplayProps {
    character: Character;
}

export class CharacterDisplay extends React.Component<CharacterDisplayProps, {}> {

    componentWillMount(){

    }

    renderAttributes = () => {
        const attributes = this.props.character.attributes;
        return (
            <React.Fragment>
                <CharacterAttributeDisplay  attribute="health" value={attributes.health} maxValue={MAX_ATTRIBUTES.health} tooltip="tooltip" />
                <CharacterAttributeDisplay attribute="speed" value={attributes.speed} maxValue={MAX_ATTRIBUTES.speed}  tooltip="tooltip" />
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
        switch(this.props.character.name){
            case(PlayerOptionNames.KNIGHT):
                src = '/images/knight/knight_lg.png'
                break;
            case(PlayerOptionNames.KOBOLD):
                src = '/images/kobold/kobold_lg.png'
                break;
            case(PlayerOptionNames.ORC):
                src = '/images/orc/orc_lg.png'
                break;
        }
        return <input type="image" src={src}></input>;
    }

    render(){
        return (   
        <React.Fragment>
            <div className="row icon-contianer">
                {this.renderCharacterImage()}
            </div>
            <div className="row stats-container">
                {this.renderAttributes()}
            </div>
        </React.Fragment>
        )
    }
}



export default CharacterDisplay;