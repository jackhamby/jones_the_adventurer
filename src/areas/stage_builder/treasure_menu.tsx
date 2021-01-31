import { platform } from 'os';
import { ClickEventData, Viewport } from 'pixi-viewport';
import * as React from 'react';
import { Enemy } from '../../classes/enemies/enemy';
import { Kobold } from '../../classes/enemies/kobold';
import { Man } from '../../classes/enemies/man';
import { Manticore } from '../../classes/enemies/manticore';
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from '../../classes/platform';
import { Sprite } from '../../classes/sprite';
import { Stage } from '../../classes/stage/stage';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { KnightHeadArmor1Treasure } from '../../classes/treasures/armor_treasure';
import { Treasure } from '../../classes/treasures/treasure';
import { GRID_HEIGHT, GRID_WIDTH } from '../../types/constants';
import { stageBuilderKeyboard } from './stage_builder_wrapper';
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