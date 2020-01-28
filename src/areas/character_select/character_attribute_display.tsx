import React from 'react';

export interface CharacterAttributeDisplayProps {
    attribute: string;
    value: any;
    maxValue: any;
    tooltip?: string;
}

export class CharacterAttributeDisplay extends React.Component<CharacterAttributeDisplayProps, {}> {

    render(){
        const progressBarWidth = ((this.props.value / this.props.maxValue) * 100).toString();
        return (            
            <div className="col-12">
                <span>{this.props.attribute}: {this.props.value}</span>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuemax={this.props.maxValue} aria-valuenow={this.props.value} aria-valuemin={0} style={{width: `${progressBarWidth}%` }}></div>
                </div>
            </div>
        )
    }
}

export default CharacterAttributeDisplay;