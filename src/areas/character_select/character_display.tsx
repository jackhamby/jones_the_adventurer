
import React from 'react';
import './character_display.css';
import { CharacterOptions } from '../../types/enums';
import { CharacterAttributeDisplay } from './character_attribute_display';
import { Character } from '../../types/states';
import { MAX_ATTRIBUTES } from '../../constants';

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

    render(){
        return (   
        <React.Fragment>
            <div className="row icon-contianer">
                <img  style={{maxHeight: "100%", maxWidth: "100%"}} src={`${this.props.character.name}_lg.png`}></img>
            </div>
            <div className="row stats-container">
                {this.renderAttributes()}
            </div>
        </React.Fragment>
        )
    }
}

export default CharacterDisplay;