import { ClickEventData, Viewport } from 'pixi-viewport';
import * as React from 'react';
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from '../../classes/platform';
import { Sprite } from '../../classes/sprite';
import { Stage } from '../../classes/stages/stage';
import { gameBuilderContext } from './stage_builder_wrapper';

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
    // setAddCallback: ( callBack: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => void;
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
                            const loader = gameBuilderContext.loader;
                            const stage = gameBuilderContext.stage;
                            if (!loader || !stage){
                                return;
                            }
                            stage.viewport.on("clicked", (data: ClickEventData) => {
                                gameBuilderContext.lastClickedX = data.world.x;
                                gameBuilderContext.lastClickedY = data.world.y;
                                // if (stageBuilderKeyboard.shift){
                                //     // TODO delete
                                //     return;
                                // }
                                // const xTileIndex = Math.floor(data.world.x / gridWidth)
                                // const yTileIndex = Math.floor(data.world.y / gridHeight);
                                // const tile = this.tiles[yTileIndex][xTileIndex];
                                // if (tile.occupiedWith){
                                //     console.log('occupied, skipping')
                                //     return;
                                // }
                                // const spriteAdded = this.addToStage(tile.x, tile.y);
                                // tile.occupiedWith = spriteAdded;
                                    const platform = new platformType(loader, stage, gameBuilderContext.lastClickedX, gameBuilderContext.lastClickedY, 15, 15);
                                    platform.add();
                            });
                            // const platform = new platformType(loader, stage, gameBuilderContext.lastClickedX, gameBuilderContext.lastClickedY, 15, 15);
                            // platform.add();
                            // return platform;   
                        }}/>
                    )
                })}                
            </div>
        );
    }

}