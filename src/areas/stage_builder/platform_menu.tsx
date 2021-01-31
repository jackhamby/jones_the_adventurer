import { platform } from 'os';
import { ClickEventData, Viewport } from 'pixi-viewport';
import * as React from 'react';
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from '../../classes/platform';
import { Sprite } from '../../classes/sprite';
import { Stage } from '../../classes/stage/stage';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { GRID_HEIGHT, GRID_WIDTH, PLATFORM_OPTIONS } from '../../types/constants';
import { PlatformOptionNames } from '../../types/enums';
import { stageBuilderKeyboard } from './stage_builder_wrapper';

// export enum PlatformMenuOptionNames {
//     default = "default",
//     dirt = "dirt",
//     grass = "grass",
//     redGrass = "redGrass",
//     sandRock = "sandRock"
// }
// export type PlatformMenuOptionTypes = {
//     [key in PlatformMenuOptionNames] : typeof Platform; 
// }   

export interface PlatformMenuProps {
    controller: StageBuilderController;
    // setAddCallback: ( callBack: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => void;
}

export interface PlatformMenuState {
    selectedPlatform: PlatformOptionNames;
}

// TODO: This component and enemy_menu and treasure_menu should use a shared component
// to manage shared func
export class PlatformMenu extends React.Component<PlatformMenuProps, PlatformMenuState> {
    // private platformMenuOptions: PlatformMenuOptionTypes = {
    //     default: DefaultPlatform,
    //     dirt: DirtPlatform,
    //     grass: GrassPlatform,
    //     redGrass: RedGrassPlatform,
    //     sandRock: SandRockPlatform,
    // }

    constructor(props){
        super(props);
        this.state = {
            selectedPlatform: null,
        }
    }

    addToStage = (x: number, y: number, platformType: typeof Platform) => {
        this.props.controller.addPlatform(x, y, platformType);
    }
    
    render(){
        return (
            <div>
                {Object.keys(PLATFORM_OPTIONS).map((key: PlatformOptionNames) => {
                    const platformType = PLATFORM_OPTIONS[key];
                    const isSelected = this.state.selectedPlatform === key;
                    return (
                        <img width="30" height="30" alt="dirt" className={`p-1 ${isSelected ? "border" : ""}`} src={platformType.imageUrl} onClick={() => {
                            this.setState({selectedPlatform: key})
                            this.props.controller.viewport.off("clicked");
                            this.props.controller.viewport.on("clicked", (data: ClickEventData) => {
                                this.addToStage(data.world.x, data.world.y, platformType);
                            });
                        }}/>
                    );
                })}                
            </div>
        );
    }

}