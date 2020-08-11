
import React from 'react';
// import { Stage } from '../../classes/game_classes';
import { CharacterIcon } from './character_icon';
import './game_character_detail.css';
// import { TreasureDetail } from './treasure_detail';
// import { ArmorSelectModal } from '../../components/modals/armor_select_modal';
import { Player } from '../../classes/players/player';
import { TreasureDetail } from './treasure_detail';
export interface GameCharacterDetailProps {
    // stage: Stage;
    player?: Player;
}

export class GameCharacterDetail extends React.Component<GameCharacterDetailProps, {}> {
        
    render(){
        if (this.props.player){
            // const player = this.props.stage.player;
            // const treasures = this.props.stage.player.treasures;
            return (
                <React.Fragment>
                    <div className="col-2 h-100 p-0">
                        <CharacterIcon player={this.props.player} imagePath="fuck"/>
                    </div>
                    <div className="col-5 h-100">
                        <table className="attribute-table">
                            <thead>
                                <tr>
                                    <th> player attributes </th>    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>                     
                                        <img className="pr-1" src="images/attributes/heart.png"/>
                                        health
                                    </td>
                                    <td> {this.props.player.attributes.HEALTH} </td>
                                </tr>
                                <tr>
                                    <td> 
                                        <img  className="pr-1" src="images/attributes/armor.png"/>
                                        armor
                                        </td>
                                    <td> {this.props.player.attributes.ARMOR} </td>
                                </tr>
                                <tr>
                                    <td> 
                                        <img className="pr-1" src="images/attributes/speed.png"/>
                                        speed
                                    </td>
                                    <td> {this.props.player.attributes.SPEED} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className="pr-1" src="images/attributes/sword.png"/>
                                        attack
                                    </td>
                                    <td> {this.props.player.attributes.ATTACK} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className="pr-1" src="images/attributes/gold.png"/>
                                        gold
                                    </td>
                                    <td> {this.props.player.currentGold} </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="col-5 h-100" style={{overflow: "scroll"}}>
                        <div>
                            {/* <ArmorSelectModal player={this.props.stage.player}/> */}
                        </div>
                         treasures:   
                        <div className="row" style={{overflow: "scroll"}}>
                            {this.props.player.treasures.map(treasure => <TreasureDetail treasure={treasure}/>)}
                        </div>
                       
                    </div>

                </React.Fragment>
         
                    
            )
        }
        return (
            <div>Game char Detail</div>
        )
    }

}