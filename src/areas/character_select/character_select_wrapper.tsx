import React, { Dispatch } from 'react';
import './character_select_wrapper.css';
import { CharacterDisplay } from './character_display';
import { AppState, Character } from '../../types/states';
import { AnyAction } from 'redux';
import { changeCharacter, updateScreen } from '../../state_management/actions/control_actions';
import { ScreenOptions, PlayerOptionNames } from '../../types/enums';
import { connect } from 'react-redux';
import { ConnectedCharacterSelect } from './character_select';

export interface CharacterSelectStateProps { 
    currentCharacter: Character;
};
export interface CharacterSelectDispatchProps { 
    changeCharacter: (character: PlayerOptionNames) => void
    updateScreen: (screenName: ScreenOptions) => void;


};
export type CharacterSelectProps =  CharacterSelectDispatchProps & CharacterSelectStateProps;

export class CharacterSelectWrapper extends React.Component<CharacterSelectProps, {}> {

    setupGame = () => {
        this.props.updateScreen(ScreenOptions.GAME);
    }

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
                        <CharacterDisplay character={this.props.currentCharacter} />
                    </div>
                    <div className="col-7 offset-1 character-select-container">
                        <ConnectedCharacterSelect/>
                    </div>
                </div>
                <div className="row bottom-container">
                    <div className="col-10"></div>
                    <div className="col-2 mt-2 mb-1">
                        <button className="btn-block float-right" onClick={this.setupGame}>Start</button>
                    </div>
                </div>  


            </div>
        )
    }
}

export const mapStateToProps = (appState: AppState): CharacterSelectStateProps => {
    return {
        currentCharacter: appState.playerState.character,
    } as CharacterSelectStateProps;
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        changeCharacter: (character: PlayerOptionNames) => {
            dispatch(changeCharacter(character));
        },
        updateScreen: (screenName: ScreenOptions) => {
            dispatch(updateScreen(screenName));
        }
        
    } as CharacterSelectDispatchProps
}

export const ConnectedCharacterSelectWrapper = connect(mapStateToProps, mapDispatchToProps)(CharacterSelectWrapper);