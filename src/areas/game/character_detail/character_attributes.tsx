import * as React from 'react';
import { CharacterIcon } from './character_icon';
import { Player } from '../../../classes/players/player';

interface CharacterAttributesProps {
    player: Player;
}

export class CharacterAttributes extends React.Component<CharacterAttributesProps> {

    render(){
        return (
            <>
                <div className="col-2 h-100 p-0">
                    <CharacterIcon player={this.props.player} imagePath="fuck"/>
                </div>
                <div className="col-2 h-100">
                    <table className="attribute-table" >
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
            </>
        )
    }
    
}