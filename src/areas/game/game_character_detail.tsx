
import React from 'react';
import { CharacterIcon } from './character_icon';
import './game_character_detail.css';
import { Player } from '../../classes/players/player';
import { TreasureDetail } from '../../components/modals/customize_modal/treasure_detail';
import { GameController } from '../../classes/game_controller';
import { CustomizeModal } from '../../components/modals/customize_modal/customize_modal';
import { TabOptions } from '../../types/enums';

interface GameCharacterDetailProps {
    player?: Player;
    gameController: GameController;
}

export class GameCharacterDetail extends React.Component<GameCharacterDetailProps, {}> {
        

    renderProjectile = (): JSX.Element => {
        const player = this.props.player;
        
        // TODO: i dont like the idea of instantiating a projectile 
        // just to grab the texturecacheid.
        // can this be a static property or is that crazy

        const projectile = new player.projectile(player.loader, 0, 0, player, 0, 0);

        const url = projectile.sprite.texture.textureCacheIds[1];

        return (
            <img src={url} className="m-auto" alt="projectile"/>
        );
    }


    render(){
        if (this.props.player){
            return (
                <React.Fragment>
                    <div className="col-2 h-100 p-0">
                        <CharacterIcon player={this.props.player} imagePath="fuck"/>
                    </div>
                    <div className="col-2 h-100">

                        {/* TODO make this a component */}
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

                    {/* TODO: make this a components */}
                    <div className="col-2 h-100" style={{fontSize: "10px", fontWeight: "bold"}}>
                        projectile
                        <div className="pt-1" >
                            <CustomizeModal 
                                player={this.props.player} 
                                control={this.props.gameController} 
                                selectedTab={TabOptions.projectiles}
                                link={<button> projectile select </button>}
                            />
                        </div>
                        <div className="p-1 font-size-sm text-align-center" style={{width: "100%", margin: "2%",  border: '1px solid black'}}> 
                        <div className="row">
                                {this.renderProjectile()}
                        </div>
                        <span> 
                            {this.props.player.projectile.name}
                        </span>
                        </div>

                    </div>

                    {/* TODO: make this a commponent */}
                    <div className="col-3 h-100" style={{fontSize: "10px", fontWeight: "bold"}}>
                        spell data
                        <div className="pt-1" >
                            <CustomizeModal 
                                player={this.props.player} 
                                control={this.props.gameController} 
                                selectedTab={TabOptions.spells}
                                link={<button> spell select </button>}
                            />
                        </div>
                    </div>

                    {/* TODO make this a component */}
                    <div className="col-3 h-100" style={{fontSize: "10px", fontWeight: "bold", overflow: "scroll"}}>
                         treasures:   
                         <div className="pt-1" >
                            <CustomizeModal 
                                player={this.props.player} 
                                control={this.props.gameController} 
                                selectedTab={TabOptions.armor}
                                link={<button> armor select </button>}
                            />
                        </div>
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