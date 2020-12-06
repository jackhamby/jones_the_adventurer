import * as React from 'react';
import { BuilderMenuOption } from './builder_menu_option';
import './stage_builder.css';




export class BuilderMenu extends React.Component {

    render(){
        return (
            <div className="row m-2" style={{border: "1px solid black"}}>
                <BuilderMenuOption title="platforms"/>
                <BuilderMenuOption title="enemies"/>
                <BuilderMenuOption title="treasures"/>

                {/* <div className="col-12 builder-option" style={{border: '1px solid black'}}>
                    Platorms
                    <span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                    <i className="arrow down"/>
                </div> 

                <div className="col-12 builder-option " style={{border: '1px solid black'}}>
                    Enemies
                    <i className="arrow down"/>
                </div> 

                <div className="col-12 builder-option" style={{border: '1px solid black'}}>
                    Treasures
                    <i className="arrow down float-right"/>
                </div>  */}


            </div>
        )
    }

}