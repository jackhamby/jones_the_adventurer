import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Modal } from './modal';
import { Player } from '../../classes/players/player';
import { Treasure } from '../../classes/treasures/treasure';
import { ArmorTreasure } from '../../classes/treasures/armor_treasure';
import { UnitArmorNames, UnitPartNames } from '../../types/enums';
import './armor_select_modal.css';
import { Armor } from '../../classes/armor';

export interface ArmorSelectModalProps {
    player: Player;
}


export class ArmorSelectModal extends React.Component<ArmorSelectModalProps, {}> {

    getHeader = () => {
        return 'armor select'
    }

    setArmor = (armor: Armor) => {
        armor.apply(this.props.player);
        this.props.player.treasures = [];
        // this.props.player.currentStage = { ...this.props.player.currentStage } as Stage;
        // this.props.player.currentArmorSet = {...this.props.player.currentArmorSet}
    }

    getContent = () => {
        return (
            <div className="row">
                <div className="col-4 p-2">
                    {this.renderCurrentArmor()}
                </div>
                <div className="col-8 p-2">
                    <div className="mb-2 armor-icon-container" >
                        {this.renderHeadTreasures()}
                    </div>
                    <div className="mb-2 armor-icon-container" >

                    </div>
                    <div className="mb-2 armor-icon-container">

                    </div>
                </div>
            </div>
        );
    }

    renderCurrentArmor = (): JSX.Element => {
        // Grab currentArmorSet image, if missing grab default texture
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
                    <img src={currentHeadUrl} />
                </div>
                <div className="mb-2 selected-icon-image">
                    <img src={currentBodyUrl} />
                </div>
                <div className="mb-2 selected-icon-image">
                    <img src={currentLegsHeadUrl} />
                </div>
            </>
        )
    }

    renderHeadTreasures = (): JSX.Element[] => {
        const headTreasures = this.getHeadTreasures();
        const headTreasuresDom = headTreasures.map((headTreasure: ArmorTreasure) => {
            const url = headTreasure.treasureIconTexture.textureCacheIds[1];
            return (
                <div className="mb-2 armor-icon-image" onClick={() => { this.setArmor(headTreasure.armor)}}>
                    <img src={url}/>
                </div>
            );
        });
        return headTreasuresDom;
    }

    // TODO this should return armor treasure
    getHeadTreasures = (): ArmorTreasure[] => {
        const headTreasures = this.props.player.treasures.filter((treasure: Treasure) => {
            var x = typeof treasure;
            if (treasure instanceof ArmorTreasure) {
                const armorTreasure = treasure as ArmorTreasure; //TODO: temp  hack , do we need to do all this filtering? update unit class to have better treasure storage
                if (armorTreasure.armor.part === UnitPartNames.HEAD) {
                    return treasure;
                }
            }
        })
        return headTreasures as ArmorTreasure[]; // TODO: i dont like this casting
    }

    render() {
        return (
            <Modal
                content={this.getContent()}
                header={this.getHeader()}
                link={<button>armor select</button>}
                onModalShow={() => { }}
                onModalHide={() => { }}
            />
        )

    }



}