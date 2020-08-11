import React from 'react';
import { ScreenOptions } from '../../types/enums';

export interface MainMenuProps {
    updateScreen: (screenName: ScreenOptions) => void;
}


export class MainMenu extends React.Component<MainMenuProps, {}> {

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