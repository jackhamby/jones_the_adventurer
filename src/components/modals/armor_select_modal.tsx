import * as React from 'react';
import { Modal } from './modal';
import { Player } from '../../classes/players/player';
import { Treasure } from '../../classes/treasures/treasure';
import { ArmorTreasure } from '../../classes/treasures/armor_treasure';
import { UnitPartNames, UnitAttributeNames } from '../../types/enums';
import './armor_select_modal.css';
import { Armor } from '../../classes/armor';
import { GameController } from '../../classes/game_controller';

interface ArmorSelectModalProps {
    control: GameController;
    player: Player;
}

interface ArmorSelectModalState {
    selectedArmor?: Armor;
}
export class ArmorSelectModal extends React.Component<ArmorSelectModalProps, ArmorSelectModalState> {

    constructor(props: ArmorSelectModalProps){
        super(props);
        this.state = {
            selectedArmor: null,
        }
    }


    getHeader = () => {
        return 'armor select'
    }

    setArmor = (armor: Armor) => {
        armor.apply(this.props.player);
        this.setState( { selectedArmor: armor} )
        this.props.control.updateView();
    }

    removeArmor = (part: UnitPartNames) => {
        // TODO this functio
        const armorToRemove = this.props.player.currentArmorSet[part];
        if (armorToRemove){
            armorToRemove.remove(this.props.player);
        }
        this.props.control.updateView();
    }

    getContent = () => {
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
        const partTreasures = this.getPartTreasures(part);
        const partTreasuresDom = [];
        partTreasuresDom.push(
            <div className="mb-2 armor-icon-image" onClick={() => { this.removeArmor(part) }}>
                <img src={'/images/treasures/no_treasure.png'} alt="remove armor" className="pt-1"/>
            </div>
        )
        partTreasuresDom.push(...partTreasures.map((partTreasure: ArmorTreasure) => {
            const url = partTreasure.treasureIconTexture.textureCacheIds[1];
            return (
                <div className="mb-2 armor-icon-image" onClick={() => { this.setArmor(partTreasure.armor)}}>
                    <img src={url} alt={`${partTreasure.armor.name}`}/>
                </div>
            );
        }));
        return partTreasuresDom;
    }

    getPartTreasures = (part: UnitPartNames): ArmorTreasure[] => {
        const partTreasures: Treasure[] = this.props.player.treasures.filter((treasure: Treasure) => {
            if (treasure instanceof ArmorTreasure) {
                const armorTreasure = treasure as ArmorTreasure;
                if (armorTreasure.armor.part === part) {
                    return treasure;
                }
            }
        })
        return partTreasures as ArmorTreasure[];
    }

    renderAttribute = (attributeName: UnitAttributeNames) => {
        if (this.state.selectedArmor.attributes[attributeName] > 0){
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

    render() {
        return (
            <Modal
                content={this.getContent()}
                header={this.getHeader()}
                link={<button>armor select</button>}
                onModalShow={this.props.control.stop}
                onModalHide={this.props.control.start}
            />
        );
    }

}