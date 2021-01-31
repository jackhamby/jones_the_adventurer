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
import { ArmorTreasure, KnightHeadArmor1Treasure } from '../../classes/treasures/armor_treasure';
import { Treasure } from '../../classes/treasures/treasure';
import { GRID_HEIGHT, GRID_WIDTH, TREASURE_ARMOR_OPTIONS } from '../../types/constants';
import { TreasureArmorOptionNames } from '../../types/enums';
import { stageBuilderKeyboard } from './stage_builder_wrapper';


// export enum TreasureArmorMenuOptionNames {
//     knightHeadArmor1 = "knightHeadArmor1",
// }

// export type TreasureArmorMenuOptionTypes = {
//     [key in TreasureArmorMenuOptionNames] : typeof ArmorTreasure; 
// }   

export interface TreasureArmorMenuState {
    selectedTreasure: TreasureArmorOptionNames;
}

export interface TreasureArmorMenuProps {
    controller: StageBuilderController;
}

export class TreasureArmorMenu extends React.Component<TreasureArmorMenuProps, TreasureArmorMenuState > {

    constructor(props){
        super(props);
        this.state = {
            selectedTreasure: null,
        }
    }

    // private treasureMenuOptions: TreasureArmorMenuOptionTypes = {
    //     knightHeadArmor1: KnightHeadArmor1Treasure
    // }

    addToStage = (x: number, y: number, enemyType: typeof Treasure) => {
        // this.props.controller.(x, y, enemyType);
    }
    
    render(){
        return (
            <>
                <label style={{fontSize: '12px'}}> armor treasures</label>
                <hr className="mt-0"/>
                <div>
                    {Object.keys(TREASURE_ARMOR_OPTIONS).map((key: TreasureArmorOptionNames) => {
                        const treasureType = TREASURE_ARMOR_OPTIONS[key];
                        const isSelected = this.state.selectedTreasure === key;
                        return (
                            <img width="30" height="30" alt="dirt" className={`p-1 ${isSelected ? "border" : ""}`} src={treasureType.imageUrl} onClick={() => {
                                this.setState({selectedTreasure: key})
                                this.props.controller.viewport.off("clicked");
                                this.props.controller.viewport.on("clicked", (data: ClickEventData) => {
                                    this.addToStage(data.world.x, data.world.y, treasureType);
                                });
                            }}/>
                        )
                    })} 
                </div>
            </>   
        );
    }

}