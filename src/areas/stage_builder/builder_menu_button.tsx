import { ClickEventData } from 'pixi-viewport';
import * as React from 'react';
import { Sprite } from '../../classes/sprite';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { makeid } from '../../helpers/util';

export interface BuilderMenuButtonProps {
    isSelected: boolean;
    alt: string;
    src: string;
    controller: StageBuilderController;
    width?: number;
    height?:number;
    onSelect: () => void;
    addToStage: (x: number, y: number) => void;
}

export class BuilderMenuButton extends React.Component<BuilderMenuButtonProps> {
    
    render() {
        const width = this.props.width || 30;
        return (
            <img key={makeid()} width={width} height={this.props.height} className={`p-1 ${this.props.isSelected ? "border" : ""}`} alt={this.props.alt} src={this.props.src} onClick={() => {
                this.props.onSelect();
                this.props.controller.viewport.off("clicked");
                this.props.controller.viewport.on("clicked", (data: ClickEventData) => {
                    this.props.addToStage(data.world.x, data.world.y);
                });
            }}/>
        );
    }

}