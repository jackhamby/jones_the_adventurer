
import React from 'react';
import { CharacterIcon } from './character_icon';
import './game_character_detail.css';
import { Player } from '../../classes/players/player';
import { TreasureDetail } from './treasure_detail';
import { ArmorSelectModal } from '../../components/modals/armor_select_modal';
import { GameController } from '../../classes/game_controller';

interface GameCharacterDetailProps {
    player?: Player;
    gameController: GameController;
}

export class GameCharacterDetail extends React.Component<GameCharacterDetailProps, {}> {
        
    render(){
        if (this.props.player){
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
                                        <img className="pr-1" src="images/attributes/heart.png" alt="health"/>
                                        health
                                    </td>
                                    <td> {this.props.player.attributes.HEALTH} </td>
                                </tr>
                                <tr>
                                    <td> 
                                        <img  className="pr-1" src="images/attributes/armor.png" alt="armor"/>
                                        armor
                                        </td>
                                    <td> {this.props.player.attributes.ARMOR} </td>
                                </tr>
                                <tr>
                                    <td> 
                                        <img className="pr-1" src="images/attributes/speed.png" alt="speed"/>
                                        speed
                                    </td>
                                    <td> {this.props.player.attributes.SPEED} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className="pr-1" src="images/attributes/sword.png" alt="attack"/>
                                        attack
                                    </td>
                                    <td> {this.props.player.attributes.ATTACK} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className="pr-1" src="images/attributes/gold.png" alt="gold"/>
                                        gold
                                    </td>
                                    <td> {this.props.player.currentGold} </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="col-5 h-100" style={{overflow: "scroll"}}>
                        <div className="pt-1" >
                            <ArmorSelectModal player={this.props.player} control={this.props.gameController}/>
                        </div>
                         treasures:   
                        <div className="row">
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