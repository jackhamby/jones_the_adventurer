import * as React from 'react';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { ArmorTreasure } from '../../classes/treasures/armor_treasure';
import { makeid } from '../../helpers/util';
import { TREASURE_ARMOR_OPTIONS } from '../../types/constants';
import { PlayerNames, UnitArmorNames, UnitPartNames } from '../../types/enums';
import { BuilderMenuButton } from './builder_menu_button';

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

    renderPartSections = () => {
        return (
            <>
                {Object.keys(UnitPartNames).map((partName: UnitPartNames) => {
                    return (
                        <>
                            {UnitPartNames[partName]}
                            <div key={makeid()} className="row" style={{overflow: "scroll"}}> 
                                {this.renderPartArmors(partName)}
                            </div>
                        </>
                    );
                })}
            </>
        )
    }

    renderPartArmors = (partName: UnitPartNames) => {
        return (
            <>
                {Object.keys(UnitArmorNames).map((armorName: UnitArmorNames) => {
                    if (UnitArmorNames[armorName] === UnitArmorNames.DEFAULT){
                        return null;
                    }

                    // Need to get the string value of the enum
                    // to properly index TREASURE_ARMOR_OPTIONS
                    const unitPartName = UnitPartNames[partName]
                    const unitArmorName = UnitArmorNames[armorName]
                    const knightTreasure = TREASURE_ARMOR_OPTIONS[PlayerNames.KNIGHT][unitPartName][unitArmorName];
                    const isSelected = this.isSelected(partName, armorName);
                    return (
                        <BuilderMenuButton
                            isSelected={isSelected}
                            alt={armorName}
                            src={knightTreasure?.imageUrl}
                            controller={this.props.controller}
                            width={50}
                            addToStage={(x: number, y: number) => {
                                this.props.controller.addTreasure(x, y, knightTreasure);
                            }}
                            onSelect={() => {
                                this.setState({ selectedTreasure: {
                                    part: partName,
                                    armorName: armorName,
                                }});
                            }}
                        />);
                })}
            </>
        )
    }
    
    render(){
        return (
            <>
                <label style={{fontSize: '12px'}}> armor treasures</label>
                <hr className="mt-0"/>
                <div>
                    {this.renderPartSections()}
                </div>
            </>   
        );
    }

}