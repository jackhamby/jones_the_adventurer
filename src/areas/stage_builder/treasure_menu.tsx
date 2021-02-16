import * as React from 'react';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { Treasure } from '../../classes/treasures/treasure';
import { TreasureArmorMenu } from './treasure_armor_menu';


export interface TreasureMenuProps {
    controller: StageBuilderController;
    // setAddCallback: ( callBack: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => void;
}
// export interface TreasureMenuState {
//     selectedTreasure: TreasureMenuOptionNames;
// }


// TODO: This component and enemy_menu and platform_menu should use a shared component
// to manage shared func
export class TreasureMenu extends React.Component<TreasureMenuProps> {

    constructor(props){
        super(props);
        this.state = {
            selectedTreasure: null,
        }
    }

    addToStage = (x: number, y: number, enemyType: typeof Treasure) => {
        // this.props.controller.(x, y, enemyType);
        
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