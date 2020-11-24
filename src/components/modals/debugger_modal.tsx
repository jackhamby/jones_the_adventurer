
import * as React from 'react';
import { Modal } from './modal';
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
                <div className="row mb-2">
                    <button onClick={this.props.control.advanceStage}> advance stage </button>
                </div>
                <div className="row mb-2">
                    <button onClick={this.godMode}>god mode</button>
                </div>
                <div className="row mb-2">
                    <button onClick={this.restoreAllHp}> restore hp </button>
                </div>
                <div className="row mb-2">
                    <button onClick={this.completeImmunity}>immunity </button>
                </div>
                <div className="row mb-2">
                    <button onClick={this.infiniteJumps}>infinite jump </button>
                </div>

            </div>

        );
    }

    godMode = () => {
        this.restoreAllHp();
        this.completeImmunity();
        this.infiniteJumps();
        this.veryFast();
        this.props.control.player.attributes.ATTACK = 99999999999999;
        this.props.control.player.currentAttributes.ATTACK = 99999999999999;
        this.setState({closeModal: true})
    }


    veryFast = () => {
        this.props.control.player.attributes.SPEED = 7;
        this.props.control.player.currentAttributes.SPEED = 7;
    }

    restoreAllHp = () => {
        this.props.control.player.currentAttributes.HEALTH = this.props.control.player.attributes.HEALTH;
    }

    completeImmunity = () => {
        this.props.control.player.isImmune = true;
        this.props.control.player.maxImmuneTime = 9999999999999999;
    }

    infiniteJumps = () => {
        this.props.control.player.attributes.JUMP_COUNT = 99999999999999;
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