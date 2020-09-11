import * as React from 'react';
import { Projectile } from '../../../classes/projectiles/projectile';

interface ProjectileDetailProps {
    projectile: Projectile;
    projectileType: typeof Projectile;
    selectProjectile: (projectile: typeof Projectile) => void;
}

export class ProjectileDetail extends React.Component<ProjectileDetailProps, {}>{

    render(){
        // the original url for the image is stored here on the PIXI.BaseTexture
        const url: string = this.props.projectile.sprite.texture.textureCacheIds[1];
        return (
            <div className="armor-icon-image" onClick={() => this.props.selectProjectile(this.props.projectileType)}>
                <div>
                    <img src={url} alt="projectile"/>
                </div>
                <span> {this.props.projectile.name}</span>
            </div>
        )
    }
}