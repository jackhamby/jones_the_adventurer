import * as React from 'react';
import { Modal } from '../modal';
import { Player } from '../../../classes/players/player';
import './customize_modal.css';
import { GameController } from '../../../classes/game_controller';
import { ArmorSelect } from './armor_select';
import { TabOptions, ProjectileNames } from '../../../types/enums';
import { ProjectileSelect } from './projectile_select';

interface CustomizeModalProps {
    control: GameController;
    player: Player;
    selectedTab?: TabOptions;
    link?: JSX.Element;
}

interface CustomizeModalState {
    // selectedArmor?: Armor;
    selectedTab: TabOptions;
}
export class CustomizeModal extends React.Component<CustomizeModalProps, CustomizeModalState> {

    constructor(props: CustomizeModalProps){
        super(props);
        this.state = {
            // selectedArmor: null,
            selectedTab: props.selectedTab 
                ? props.selectedTab
                : TabOptions.armor,
        }
    }

    getHeader = () => {
        switch(this.state.selectedTab){
            case(TabOptions.armor):
                return "armor select";
            case(TabOptions.projectiles):
                return "projectile select";
            case(TabOptions.spells):
                return "spell select";
            default:
                return "select modal";
        }
    }

    isTabActive = (tabOption: TabOptions): boolean => {
        if (this.state.selectedTab === tabOption){
            return true;
        }
        return false;
    }

    setSelectedTab = (tabOption: TabOptions): void => {
        this.setState( { selectedTab: tabOption})
    }

    getContent = () => {
        let mainContent = null;
        switch(this.state.selectedTab){
            case(TabOptions.armor):
                mainContent =  <ArmorSelect player={this.props.player} control={this.props.control}/>
                break;
            case(TabOptions.projectiles):
                mainContent = <ProjectileSelect player={this.props.player} control={this.props.control}/>
                break;
            case(TabOptions.spells):
                break;
        }
        return (
            <>
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={() => this.setSelectedTab(TabOptions.armor)} style={{cursor: "pointer"}}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={`nav-link ${this.state.selectedTab === TabOptions.armor ? "active" : "disabled"}`}>
                        armor
                    </a>                
                </li>
                <li className="nav-item" onClick={() => this.setSelectedTab(TabOptions.spells)} style={{cursor: "pointer"}}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={`nav-link ${this.state.selectedTab === TabOptions.spells ? "active" : "disabled"}`}>
                        spells
                    </a>                
                </li>
                <li className="nav-item" onClick={() => this.setSelectedTab(TabOptions.projectiles)} style={{cursor: "pointer"}}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={`nav-link ${this.state.selectedTab === TabOptions.projectiles ? "active" : "disabled"}`}>
                        projectiles
                    </a>
                </li>
            </ul>
            {mainContent}
            </>
        )
    }
  
    render() {
        return (
            <Modal
                content={this.getContent()}
                header={this.getHeader()}
                // link={<button> armor select </button>}
                link={ this.props.link 
                    ? this.props.link
                    : <button> armor select </button>}
                onModalShow={this.props.control.stop}
                onModalHide={this.props.control.start}
            />
        );
    }

}