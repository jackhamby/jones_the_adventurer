import React, { Dispatch } from 'react';
import { AppState } from '../../types/states';
import { AnyAction } from 'redux';
import { updateScreen } from '../../state_management/actions/control_actions';
import { connect } from 'react-redux';
import { ScreenOptions } from '../../types/enums';

export interface MainMenuStateProps { };
export interface MainMenuDispatchProps {
    updateScreen: (screenName: ScreenOptions) => void;
}

export type MainMenuProps = MainMenuDispatchProps & MainMenuDispatchProps;

export class MainMenuWrapper extends React.Component<MainMenuProps, {}> {

    render(){
        let x: number = 3;
        return(
            // <div> main menu </div>
            <div>
                <div className="row">
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <div className="row mt-5 justify-content-md-center">
                            <div className="col-12 text-center">
                                <h3>Jones the Adventuer</h3>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'></div>
                </div>
                <div className="row mb-5 mt-1">
                    <div className="col-12">
                        <hr></hr>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <div className="row mt-5 justify-content-md-center">
                            <div className="col-12 text-center">
                                <button 
                                    className="btn-block"
                                    onClick={() => {
                                        this.props.updateScreen(ScreenOptions.CHARACTER_SELECT)
                                    }}
                                    >
                                1 Player
                                </button>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <button className="btn-block" disabled> 2 Player</button>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <button className="btn-block" disabled> Online </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'></div>
                </div> 
            </div>
        )
    }
}

export const mapStateToProps = (state: AppState): MainMenuStateProps => {
    return {} as MainMenuStateProps;
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): MainMenuDispatchProps => {
    return { 
        updateScreen: (nextScreen: ScreenOptions) => {
            dispatch(updateScreen(nextScreen))
        }
    } as MainMenuDispatchProps;
}

export const ConnectedMainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenuWrapper);