import * as React from 'react';
import { CharacterIcon } from './character_icon';
import { Player } from '../../../classes/players/player';
import { CustomizeModal } from '../../../components/modals/customize_modal/customize_modal';
import { GameController } from '../../../classes/game_controller';
import { TabOptions } from '../../../types/enums';
import { TreasureDetail } from '../../../components/modals/customize_modal/treasure_detail';

interface CharacterArmorProps {
    player: Player;
    controller: GameController;
}

export class CharacterArmors extends React.Component<CharacterArmorProps> {

    render(){
        return (
            <div className="col-3 h-100" style={{fontSize: "10px", fontWeight: "bold", overflow: "scroll"}}>
            treasures:   
            <div className="pt-1" >
               <CustomizeModal 
                   player={this.props.player} 
                   control={this.props.controller} 
                   selectedTab={TabOptions.armor}
                   link={<button> armor select </button>}
               />
           </div>
           <div className="row">
               {this.props.player.treasures.map(treasure => <TreasureDetail treasure={treasure}/>)}
           </div>
       </div>
        );
    }
}