import * as React from 'react';
import { Armor } from '../../../classes/armor';
import { UnitPartNames, UnitAttributeNames } from '../../../types/enums';
import { Player } from '../../../classes/players/player';
import { GameController } from '../../../classes/game_controller';

interface ArmorSelectProps {
    player: Player;
    control: GameController;
}

interface ArmorSelectState {
    selectedArmor: Armor;
}

export class ArmorSelect extends React.Component<ArmorSelectProps, ArmorSelectState>{
    
    constructor(props: ArmorSelectProps){
        super(props);
        this.state = {
            selectedArmor: null,
        }
    }

    setArmor = (armor: Armor) => {
        armor.apply(this.props.player);
        this.setState( { selectedArmor: armor} )
        this.props.control.updateView();
    }
    removeArmor = (part: UnitPartNames) => {
        // TODO this function
        const armorToRemove = this.props.player.currentArmorSet[part];
        if (armorToRemove){
            armorToRemove.remove(this.props.player);
        }
        this.props.control.updateView();
    }

    renderCurrentArmor = (): JSX.Element => {
        // Grab currentArmorSet image, if missing grab default texture
        // TODO: is there a better way to do this 
        const currentHeadUrl = this.props.player.currentArmorSet.head
            ? this.props.player.currentArmorSet.head?.texture.textureCacheIds[1] 
            : this.props.player.textures.head.default.textureCacheIds[1];
        const currentBodyUrl = this.props.player.currentArmorSet.body
            ? this.props.player.currentArmorSet.body?.texture.textureCacheIds[1]
            : this.props.player.textures.body.default.textureCacheIds[1];
        const currentLegsHeadUrl = this.props.player.currentArmorSet.legs
            ? this.props.player.currentArmorSet.legs?.texture.textureCacheIds[1]
            : this.props.player.textures.legs.default.textureCacheIds[1];

        return (
            <>
                <div className="mb-2 selected-icon-image" >
                    <img src={currentHeadUrl} alt="default head"/>
                </div>
                <div className="mb-2 selected-icon-image">
                    <img src={currentBodyUrl} alt="default body"/>
                </div>
                <div className="mb-2 selected-icon-image">
                    <img src={currentLegsHeadUrl} alt="default legs"/>
                </div>
            </>
        )
    }

    renderPartTreasures = (part: UnitPartNames): JSX.Element[] => {
        const partTreasuresDom = [];
        partTreasuresDom.push(
            <div className="mb-2 armor-icon-image" onClick={() => { this.removeArmor(part) }}>
                <img src={'/images/treasures/no_treasure.png'} alt="remove armor" className="pt-1"/>
            </div>
        )

        partTreasuresDom.push(...this.props.player.armors.map((armor: Armor) => {
            if (armor.part === part) {
                const url = armor.texture.textureCacheIds[1];
                return (
                    <div className="mb-2 armor-icon-image" onClick={() => { this.setArmor(armor)}}>
                        <img src={url} alt={`${armor.name}`}/>
                    </div>
                );            
            }
        }));
        return partTreasuresDom;
    }

    renderAttribute = (attributeName: UnitAttributeNames) => {
        if (this.state.selectedArmor &&
            this.state.selectedArmor.attributes &&
            this.state.selectedArmor.attributes[attributeName] > 0){
            return (
                <td style={{color: 'darkgreen'}}>  +{this.state.selectedArmor.attributes[attributeName]} </td>
            )
        }
        if (this.state.selectedArmor.attributes[attributeName] < 0){
            return (
                <td style={{color: 'darkred'}}>  -{Math.abs(this.state.selectedArmor.attributes[attributeName])} </td>
            )
        }
        return (
            <td style={{color: 'darkgray'}}>  {this.state.selectedArmor.attributes[attributeName]} </td>
        )
    }


    renderAttributes = (): JSX.Element => {
        if (!this.state.selectedArmor){
            return null;
        }

        return (
            <table style={{fontSize: "10px"}}>
                <tbody>
                    <tr>
                        <td>                     
                            <img className="pr-1" src="images/attributes/heart.png" alt="health"/>
                            health
                        </td>
                        {this.renderAttribute(UnitAttributeNames.health)}
                    </tr>
                    <tr>
                        <td> 
                            <img  className="pr-1" src="images/attributes/armor.png" alt="armor"/>
                                armor
                            </td>
                            {this.renderAttribute(UnitAttributeNames.armor)}
                        </tr>
                    <tr>
                        <td> 
                            <img className="pr-1" src="images/attributes/speed.png" alt="speed"/>
                            speed
                        </td>
                        {this.renderAttribute(UnitAttributeNames.speed)}
                    </tr>
                    <tr>
                        <td>
                            <img className="pr-1" src="images/attributes/sword.png" alt="attack"/>
                            attack
                        </td>
                        {this.renderAttribute(UnitAttributeNames.attack)}
                    </tr>
                </tbody>
            </table>
        )
    }

    render(): JSX.Element {
        return (
            <>
                <div className="row">
                    <div className="col-4 p-2">
                        {this.renderCurrentArmor()}
                    </div>
                    <div className="col-8 p-2">
                        <div className="mb-2 armor-icon-container" >
                            {this.renderPartTreasures(UnitPartNames.HEAD)}
                        </div>
                        <div className="mb-2 armor-icon-container" >
                            {this.renderPartTreasures(UnitPartNames.BODY)}
                        </div>
                        <div className="mb-2 armor-icon-container">
                            {this.renderPartTreasures(UnitPartNames.LEGS)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        Attriubtes:
                        {this.renderAttributes()}
                    </div>
                    <div className="col-4">
                        {this.state.selectedArmor ? this.state.selectedArmor.name : 'not defined'}
                    </div>
                </div>
            </>
        );
    }



}