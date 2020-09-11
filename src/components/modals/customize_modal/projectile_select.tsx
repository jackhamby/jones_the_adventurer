import * as React from 'react';
import { Player } from '../../../classes/players/player';
import { GameController } from '../../../classes/game_controller';
import { ProjectileDetail } from './projectile_detail';
import { Projectile } from '../../../classes/projectiles/projectile';

interface ProjectileSelectProps {
    player: Player;
    control: GameController;
}

interface ProjectileSelectState {
    selectedProjectile: typeof Projectile;
}

export class ProjectileSelect extends React.Component<ProjectileSelectProps, ProjectileSelectState> {

    constructor(props){
        super(props);
        this.state = {
            selectedProjectile: null,
        }
    }

    selectProjectile = (projectile: typeof Projectile): void => {
        this.props.player.projectile = projectile;
        this.setState({ selectedProjectile: projectile})
        this.props.control.updateView();
    }

    renderProjectile = (): JSX.Element => {
        const player = this.props.player;
        
        // TODO: i dont like the idea of instantiating a projectile 
        // just to grab the texturecacheid.
        // can this be a static property or is that crazy

        const projectile = new player.projectile(player.loader, 0, 0, player, 0, 0);

        const url = projectile.sprite.texture.textureCacheIds[1];

        return (
            <img src={url} className="m-auto pt-4 " alt="projectile"/>
        );
    }

    renderProjectiles = (): JSX.Element[] => {
        return this.props.player.projectiles.map((projectileType: typeof Projectile) => {
            const projectile = new projectileType(this.props.player.loader, 0, 0, this.props.player, 0, 0);
            return <ProjectileDetail projectile={projectile} projectileType={projectileType} selectProjectile={this.selectProjectile}/>;
        });
    }

    renderProjectileDetails = (): JSX.Element => {
        if (!this.state.selectedProjectile){
            return null;
        }
        return <div> {this.state.selectedProjectile.name} </div>
    }

    render(): JSX.Element{
        return (
            <>
                <div className="row p-2">
                    <div className="col-4">
                        <div className="mb-2 armor-icon-container text-center" >
                            {this.renderProjectile()}
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            {this.renderProjectiles()}
                        </div>
                    </div>
                </div>
                <div className="row p-1">
                    <div className="col-12">
                        {this.renderProjectileDetails()}
                    </div>
                </div>
            </>
        );
    }

}