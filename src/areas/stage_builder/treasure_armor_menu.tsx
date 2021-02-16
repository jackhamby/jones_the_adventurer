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
import { PlayerNames, UnitArmorNames, UnitPartNames } from '../../types/enums';
// import { TreasureArmorOptionNames } from '../../types/enums';
import { stageBuilderKeyboard } from './stage_builder_wrapper';


// export enum TreasureArmorMenuOptionNames {
//     knightHeadArmor1 = "knightHeadArmor1",
// }

// export type TreasureArmorMenuOptionTypes = {
//     [key in TreasureArmorMenuOptionNames] : typeof ArmorTreasure; 
// }   

interface TreasureSelect {
    part: UnitPartNames;
    armorName: UnitArmorNames;
}

export interface TreasureArmorMenuState {
    selectedTreasure: TreasureSelect;
}

export interface TreasureArmorMenuProps {
    controller: StageBuilderController;
}

interface TreasureOption {
    armorName: UnitArmorNames;
    part: UnitPartNames;
}

const options = {
    
}

// UnitArmorNames.ARMOR2;
// UnitPartNames.HEAD;

export class TreasureArmorMenu extends React.Component<TreasureArmorMenuProps, TreasureArmorMenuState > {

    constructor(props){
        super(props);
        this.state = {
            selectedTreasure: null,
        }
    }

    addToStage = (x: number, y: number, treasureType: typeof ArmorTreasure) => {
        this.props.controller.addTreasure(x, y, treasureType);
    }

    isSelected = (partName: UnitPartNames, armorName: UnitArmorNames) => {
        if (!this.state.selectedTreasure){
            return false;
        }
        return (partName === this.state.selectedTreasure.part) && (armorName === this.state.selectedTreasure.armorName);
    }
    
    render(){
        return (
            <>
                <label style={{fontSize: '12px'}}> armor treasures</label>
                <hr className="mt-0"/>
                <div>
                    {Object.keys(UnitPartNames).map((partName: UnitPartNames) => {
                        return (
                            <>
                                {UnitPartNames[partName]}
                                <div className="row" style={{overflow: "scroll"}}> 
                                    {Object.keys(UnitArmorNames).map((armorName: UnitArmorNames) => {
                                        if (UnitArmorNames[armorName] === UnitArmorNames.DEFAULT){
                                            return null;
                                        }

                                        // Need to get the string value of the enum
                                        // to properly index TREASURE_ARMOR_OPTIONS
                                        const pName = UnitPartNames[partName]
                                        const aName = UnitArmorNames[armorName]
                                        const knightTreasure = TREASURE_ARMOR_OPTIONS[PlayerNames.KNIGHT][pName][aName];
                                        const isSelected = this.isSelected(partName, armorName);
                                        return (
                                            <img width="50"className={`p-1 ${isSelected ? "border" : ""}`}alt={armorName} src={knightTreasure?.imageUrl} onClick={() => {
                                                this.setState({ selectedTreasure: {
                                                    part: partName,
                                                    armorName: armorName,
                                                }});
                                                // this.props.controller.add
                                            
                                                // this.setState({selectedPlatform: key})
                                                this.props.controller.viewport.off("clicked");
                                                this.props.controller.viewport.on("clicked", (data: ClickEventData) => {
                                                    this.addToStage(data.world.x, data.world.y, knightTreasure);
                                                });
                                            }}/>
                                        )
                                    })}
                                </div>
                            </>
                        );
                    })}
                    {/* {Object.keys(TREASURE_ARMOR_OPTIONS).map((key: TreasureArmorOptionNames) => {
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
                    })}  */}
                </div>
            </>   
        );
    }

}