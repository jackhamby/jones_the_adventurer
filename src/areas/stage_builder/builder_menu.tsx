import * as React from 'react';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { BuilderMenuOption } from './builder_menu_option';
import { EnemyMenu } from './enemy_menu';
import { PlatformMenu } from './platform_menu';
import './stage_builder.css';
import { TreasureMenu } from './treasure_menu';

export interface BuilderMenuProps {
    controller: StageBuilderController;
    validate: () => void; // Validate is needed to validate parent form
}

export enum SpriteTypes {
    platforms = "platforms",
    treasures = "treasures",
    enemies = "enemies"
}

export class BuilderMenu extends React.Component<BuilderMenuProps> {
    render(){
        return (
            <div className="row m-2" style={{border: "1px solid black"}}>
                <BuilderMenuOption title="platforms">
                    <PlatformMenu controller={this.props.controller}/>
                </BuilderMenuOption>
                <BuilderMenuOption title="treasures">
                    <TreasureMenu controller={this.props.controller} />
                </BuilderMenuOption>
                <BuilderMenuOption title="enemies">
                    <EnemyMenu controller={this.props.controller} validate={this.props.validate}/>
                </BuilderMenuOption>
            </div>
        );
    }
}