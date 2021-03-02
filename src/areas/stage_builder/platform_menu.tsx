import * as React from 'react';
import { Platform } from '../../classes/platform';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { PLATFORM_OPTIONS } from '../../types/constants';
import { PlatformOptionNames } from '../../types/enums';
import { BuilderMenuButton } from './builder_menu_button';

export interface PlatformMenuProps {
    controller: StageBuilderController;
}

export interface PlatformMenuState {
    selectedPlatform: PlatformOptionNames;
}

export class PlatformMenu extends React.Component<PlatformMenuProps, PlatformMenuState> {

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
                        <BuilderMenuButton
                            isSelected={isSelected}
                            alt={key}
                            src={platformType.imageUrl}
                            controller={this.props.controller}
                            addToStage={(x: number, y: number) => {
                                this.props.controller.addPlatform(x, y, platformType);
                            }}
                            onSelect={() => {
                                this.setState({selectedPlatform: key})
                            }}
                        />
                    );
                })}                
            </div>
        );
    }

}