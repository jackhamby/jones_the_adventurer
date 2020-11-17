import React from 'react';
import './character_detail.css';
import { Player } from '../../../classes/players/player';
import { GameController } from '../../../classes/game_controller';
import { CharacterAttributes } from './character_attributes';
import { CharacterProjectile } from './character_projectiles';
import { CharacterSpells } from './character_spells';
import { CharacterArmors } from './character_armors';

interface CharacterDetailProps {
    player?: Player;
    controller: GameController;
}

export class CharacterDetail extends React.Component<CharacterDetailProps, {}> {
        
    render(){
        if (this.props.player){
            return (
                <React.Fragment>
                   <CharacterAttributes player={this.props.player}/>

                    <CharacterProjectile player={this.props.player} controller={this.props.controller}/>

                    <CharacterSpells player={this.props.player} controller={this.props.controller}/>

                    <CharacterArmors player={this.props.player} controller={this.props.controller}/>
                </React.Fragment>  
            )
        }
        return (
            <div>Game char Detail</div>
        )
    }

}