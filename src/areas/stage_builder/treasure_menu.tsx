import * as React from 'react';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { TreasureArmorMenu } from './treasure_armor_menu';

export interface TreasureMenuProps {
    controller: StageBuilderController;
}

export class TreasureMenu extends React.Component<TreasureMenuProps> {

    constructor(props){
        super(props);
        this.state = {
            selectedTreasure: null,
        }
    }

    render(){
        return (
            <div>
                <div>
                    <TreasureArmorMenu controller={this.props.controller}/>
                </div>

                <div>

                </div>
            </div>
        );
    }

}