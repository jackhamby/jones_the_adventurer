import { platform } from 'os';
import { ClickEventData, Viewport } from 'pixi-viewport';
import * as React from 'react';
import { Enemy } from '../../classes/enemies/enemy';
import { Kobold } from '../../classes/enemies/kobold';
import { Man } from '../../classes/enemies/man';
import { Manticore } from '../../classes/enemies/manticore';
import { DefaultPlatform, DirtPlatform, GrassPlatform, Platform, RedGrassPlatform, SandRockPlatform } from '../../classes/platform';
import { Sprite } from '../../classes/sprite';
import { Stage } from '../../classes/stages/stage';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { GRID_HEIGHT, GRID_WIDTH } from '../../types/constants';
import { stageBuilderKeyboard } from './stage_builder_wrapper';

export enum EnemyMenuOptionName {
    kobold = "kobold",
    man = "man",
    manticore = "manticore",
}

export type EnemyMenuOptionTypes = {
    [key in EnemyMenuOptionName] : typeof Enemy; 
}   

export interface EnemyMenuProps {
    controller: StageBuilderController;
    // setAddCallback: ( callBack: (loader: PIXI.Loader, stage: Stage, viewport: Viewport, x: number, y: number) => Sprite) => void;
}
export interface EnemyMenuState {
    selectedEnemy: EnemyMenuOptionName;
}




// TODO: This component and enemy_menu and treasure_menu should use a shared component
// to manage shared func
export class EnemyMenu extends React.Component<EnemyMenuProps, EnemyMenuState> {

    constructor(props){
        super(props);
        this.state = {
            selectedEnemy: null,
        }
    }

    private enemyMenuOptions: EnemyMenuOptionTypes = {
        man: Man,
        kobold: Kobold,
        manticore: Manticore,
    }

    addToStage = (x: number, y: number, enemyType: typeof Enemy) => {
        const loader = this.props.controller.pixiApplication.loader;
        const stage = this.props.controller.stage;
        if (!loader || !stage){
            return;
        }
        this.props.controller.lastClickedX = x;
        this.props.controller.lastClickedY = y;
    
        const xTileIndex = Math.floor(x / GRID_WIDTH)
        const yTileIndex = Math.floor(y / GRID_HEIGHT);
        const tile = this.props.controller.tiles[yTileIndex][xTileIndex];
        if (tile.occupiedWith){
            console.log('occupied, skipping');
            return;
        }
        const enemy = new enemyType(loader, stage, enemyType.baseAttributes, 15, 15, tile.x, tile.y);

        tile.occupiedWith = enemy;

        enemy.add();
        stage.enemies.push(enemy);
        console.log(`Stage:
            Enemies: ${this.props.controller.stage.enemies.length}
            Treasures: ${this.props.controller.stage.treasures.length}
            Platforms: ${this.props.controller.stage.platforms.length}`);
    }
    
    render(){
        return (
            <div>
                {Object.keys(this.enemyMenuOptions).map((key: EnemyMenuOptionName) => {
                    const enemyType = this.enemyMenuOptions[key];
                    const isSelected = this.state.selectedEnemy === key;
                    return (
                        <img width="30" height="30" alt="dirt" className={`p-1 ${isSelected ? "border" : ""}`} src={enemyType.imageUrl} onClick={() => {
                            this.setState({selectedEnemy: key})
                            this.props.controller.viewport.off("clicked");
                            this.props.controller.viewport.on("clicked", (data: ClickEventData) => {
                                this.addToStage(data.world.x, data.world.y, enemyType);
                            });
                        }}/>
                    )
                })}                
            </div>
        );
    }

}