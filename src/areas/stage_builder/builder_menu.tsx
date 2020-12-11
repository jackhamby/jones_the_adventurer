import { Viewport } from 'pixi-viewport';
import * as React from 'react';
import { Sprite } from '../../classes/sprite';
import { Stage } from '../../classes/stages/stage';
import { BuilderMenuOption } from './builder_menu_option';
import { PlatformMenu } from './platform_menu';
import './stage_builder.css';

export interface BuilderMenuProps {
    setAddCallback: ( callBack: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => void;
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
                <BuilderMenuOption
                    title="platforms">
                        <PlatformMenu setAddCallback={this.props.setAddCallback}/>
                </BuilderMenuOption>
                <BuilderMenuOption 
                    title="treasures"
                >
                    todo
                </BuilderMenuOption>
                <BuilderMenuOption
                    title="enemies"
                >
                    todo
                </BuilderMenuOption>
            </div>
        );
    }

}