import * as React from 'react';

export interface BuilderMenuOptionProps {
    title: string;
}

export interface BuilderMenuOptionState {
    selected: boolean;
}

export class BuilderMenuOption extends React.Component<BuilderMenuOptionProps, BuilderMenuOptionState> {

    constructor(props){
        super(props);
        this.state = {
            selected: true,
        }
    }

    renderContent = () => {
        if (this.state.selected){
            return (
                <div className="col-12 p-3">
                    {this.props.children}
                </div>
            );
        }
        return null;
    }



    render(){
        return (
            <>
                <div className="col-12 builder-option" style={{border: '1px solid black'}} onClick={() => this.setState({selected: !this.state.selected})}>
                    {this.props.title}
                    <i className="arrow down float-right mt-1"/>
                </div> 
                {this.renderContent()}
            </> 
        )
    }

}