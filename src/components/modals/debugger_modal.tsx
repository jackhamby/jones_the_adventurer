import * as React from 'react';
import { Modal } from '../modal';
import { GameController } from '../../classes/game_controller';

interface DebuggerModalProps {
    control: GameController;
}


export class DebuggerModal extends React.Component<DebuggerModalProps, {}> {

    getHeader = () => {
        return 'debugging menu'
    }

    getContent = () => {

        return (
            <div>
                <div className="row">
                    <button onClick={this.props.control.advanceStage}> advance stage </button>
                </div>
                <div className="row">
                    <button onClick={this.godMode}>god mode</button>
                </div>
                <div className="row">
                    <button onClick={this.restoreAllHp}> restore hp </button>
                </div>
                <div className="row">
                    <button onClick={this.completeImmunity}>immunity </button>
                </div>
                <div className="row">
                    <button onClick={this.infiniteJumps}>infinite jump </button>
                </div>

            </div>

        );
    }

    godMode = () => {
        this.restoreAllHp();
        this.completeImmunity();
        this.infiniteJumps();
    }



    restoreAllHp = () => {
        this.props.control.player.currentAttributes.health = this.props.control.player.attributes.health;
    }

    completeImmunity = () => {
        this.props.control.player.isImmune = true;
        this.props.control.player.maxImmuneTime = 9999999999999999;
    }

    infiniteJumps = () => {
        this.props.control.player.attributes.jump_count = 99999999999999;
    }


    render(){

        return (
            <Modal
                content={this.getContent()}
                header={this.getHeader()}
                link={<button>debug</button>}
                onModalShow={this.props.control.stop}
                onModalHide={this.props.control.start}
            />
        )

    }
}