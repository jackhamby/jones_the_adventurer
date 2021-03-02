import * as React from 'react';
import { Enemy } from '../../classes/enemies/enemy';
import { StageBuilderController } from '../../classes/stage_builder/stage_builder_controller';
import { ENEMY_OPTIONS } from '../../types/constants';
import { EnemyOptionNames } from '../../types/enums';
import { BuilderMenuButton } from './builder_menu_button';

export interface EnemyMenuProps {
    controller: StageBuilderController;
}
export interface EnemyMenuState {
    selectedEnemy: EnemyOptionNames;
}

export class EnemyMenu extends React.Component<EnemyMenuProps, EnemyMenuState> {

    constructor(props){
        super(props);
        this.state = {
            selectedEnemy: null,
        }
    }

    addToStage = (x: number, y: number, enemyType: typeof Enemy) => {
        this.props.controller.addEnemy(x, y, enemyType);
    }
    
    render(){
        return (
            <div>
                {Object.keys(ENEMY_OPTIONS).map((key: EnemyOptionNames) => {
                    const enemyType = ENEMY_OPTIONS[key];
                    const isSelected = this.state.selectedEnemy === key;
                    return (
                        <BuilderMenuButton
                            isSelected={isSelected}
                            alt={key}
                            src={enemyType.imageUrl}
                            controller={this.props.controller}
                            height={30}
                            width={30}
                            addToStage={(x: number, y: number) => {
                                this.props.controller.addEnemy(x, y, enemyType);
                            }}
                            onSelect={() => {
                                this.setState({selectedEnemy: key})
                            }}
                        />);
                })}                
            </div>
        );
    }

}