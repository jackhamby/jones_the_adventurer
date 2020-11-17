import * as React from 'react';
import { Player } from '../../../classes/players/player';
import { CustomizeModal } from '../../../components/modals/customize_modal/customize_modal';
import { TabOptions } from '../../../types/enums';
import { GameController } from '../../../classes/game_controller';

interface CharacterProjectileProps {
    player: Player;
    controller: GameController
}

export class CharacterProjectile extends React.Component<CharacterProjectileProps> {

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
        return (
            <div className="col-2 h-100" style={{fontSize: "10px", fontWeight: "bold"}}>
            projectile
            <div className="pt-1" >
                <CustomizeModal 
                    player={this.props.player} 
                    control={this.props.controller} 
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
        );
    }
    
}