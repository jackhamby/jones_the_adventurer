
import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Modal } from './modal';
import { Player } from '../../classes/players/player';

export interface ArmorSelectModalProps {
    player: Player;
}


export class ArmorSelectModal extends React.Component<ArmorSelectModalProps, {}> {

    getHeader = () => {
        return 'armor select'
    }

    getContent = () => {
        const url1: string = this.props.player.textures.head.default.textureCacheIds[1];
        const url2: string = this.props.player.textures.body.default.textureCacheIds[1];

        const url3: string = this.props.player.textures.legs.default.textureCacheIds[1];

        // const url: string = this.props.treasure.treasureIconTexture.textureCacheIds[1];

        return (
            <div className="row">
                <div className="col-4 p-2">
                    <div className="mb-2" style={{width: '50px', height: '50px', border: '1px solid black', margin: 'auto', textAlign: 'center'}}>
                        <img src={url1}/>

                    </div>
                    <div className="mb-2" style={{width: '50px', height: '50px', border: '1px solid black', margin: 'auto', textAlign: 'center' }}>
                        <img src={url2}/>

                    </div>
                    <div className="mb-2" style={{width: '50px', height: '50px', border: '1px solid black', margin: 'auto', textAlign: 'center'}}>
                        <img src={url3}/>
                    </div>
                </div>
                <div className="col-8 p-2">
                    <div className="mb-2" style={{width: '100%', height: '50px', border: '1px solid black', margin: 'auto'}}>

                    </div>
                    <div className="mb-2" style={{width: '100%', height: '50px', border: '1px solid black', margin: 'auto'}}>

                    </div>
                    <div className="mb-2" style={{width: '100%', height: '50px', border: '1px solid black', margin: 'auto'}}>

                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <Modal
                content={this.getContent()}
                header={this.getHeader()}
                link={<button>armor select</button>}
                onModalShow={() => {}}
                onModalHide={() => {}}
            />
        )

    }



}