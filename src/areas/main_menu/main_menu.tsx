import React from 'react';
import { Link } from 'react-router-dom'

export class MainMenu extends React.Component {

    render(){
        return(
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
                            <Link to="/player-select">

                                <button 
                                    className="btn-block"
                                    >
                                1 player
                                </button>
                            </Link>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <Link to="/stages">
                                    <button 
                                        className="btn-block"
                                        >
                                    play test stages
                                    </button>
                                </Link>
                            </div>
                            <div className="col-12 mt-3 text-center">
                                <Link to="/stage-builder">
                                    <button 
                                        className="btn-block"
                                        >
                                    stage builder
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'></div>
                </div> 
            </div>
        );
    }
}