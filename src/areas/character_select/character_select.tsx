import React from 'react';
import { PlayerOptionNames, ScreenOptions } from '../../types/enums';
import { AppState } from '../../types/states';
import { CharacterOptionButton } from './character_option_button';
import { AnyAction, Dispatch } from 'redux';
import { changeCharacter } from '../../state_management/actions/control_actions';
import { connect } from 'react-redux';

export interface CharacterSelectStateProps {
    currentCharacter: PlayerOptionNames;
}
export interface CharacterSelectDispatchProps {
    changeCharacter: (character: PlayerOptionNames) => void;
}

export type CharacterSelectProps = CharacterSelectStateProps & CharacterSelectDispatchProps;

export class CharacterSelect extends React.Component<CharacterSelectProps, {}> {

    render(){

        return (
            <React.Fragment>
                <div className="row mt-5 ml-5" style={{height: "100%"}}> 
                    <CharacterOptionButton character={PlayerOptionNames.KNIGHT} changeCharacter={this.props.changeCharacter}/>
                    <CharacterOptionButton character={PlayerOptionNames.KOBOLD} changeCharacter={this.props.changeCharacter}/>
                    <CharacterOptionButton character={PlayerOptionNames.ORC} changeCharacter={this.props.changeCharacter}/>
                </div>
            </React.Fragment>
            
        )

    }
}

export const mapStateToProps = (state: AppState): CharacterSelectStateProps => {
    return {
        currentCharacter: state.playerState.character.name
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): CharacterSelectDispatchProps=> {
    return {
        changeCharacter: (character: PlayerOptionNames) => {dispatch(changeCharacter(character))}
    }
}

export const ConnectedCharacterSelect = connect(mapStateToProps, mapDispatchToProps)(CharacterSelect);
export default ConnectedCharacterSelect;