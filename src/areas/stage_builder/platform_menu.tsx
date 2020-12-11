import { Viewport } from 'pixi-viewport';
import * as React from 'react';
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from '../../classes/platform';
import { Sprite } from '../../classes/sprite';
import { Stage } from '../../classes/stages/stage';

export enum PlatformMenuOptionNames {
    default = "default",
    dirt = "dirt",
    grass = "grass",
    redGrass = "redGrass",
    sandRock = "sandRock"
}

export type PlatformMenuOptionTypes = {
    [key in PlatformMenuOptionNames] : typeof Platform; 
}   

export type TestType = {
    [key: string] : typeof Platform;
}

export interface PlatformMenuProps {
    setAddCallback: ( callBack: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => void;
}

export class PlatformMenu extends React.Component<PlatformMenuProps> {
    private platformMenuOptions: PlatformMenuOptionTypes = {
        default: DefaultPlatform,
        dirt: DirtPlatform,
        grass: GrassPlatform,
        redGrass: RedGrassPlatform,
        sandRock: SandRockPlatform,
    }
    
    render(){
        return (
            <div>
                {Object.keys(this.platformMenuOptions).map((key: PlatformMenuOptionNames) => {
                    const platformType = this.platformMenuOptions[key];
                    return (
                        <img width="30" height="30" alt="dirt" className="p-1" src={platformType.imageUrl} onClick={() => {
                            this.props.setAddCallback(
                                (loader: PIXI.Loader,
                                stage: Stage,
                                viewport: Viewport,
                                x: number,
                                y: number) => {
                                    const platform = new platformType(loader, stage, x, y, 15, 15);
                                    stage.platforms.push(platform);
                                    viewport.addChild(platform.pixiSprite);
                                    return platform;    
                                }
                            );
                        }}/>
                    )
                })}                
            </div>
        );
    }

}