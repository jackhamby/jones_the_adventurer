import * as React from 'react';
import { Player } from '../../../classes/players/player';
import { CustomizeModal } from '../../../components/modals/customize_modal/customize_modal';
import { GameController } from '../../../classes/game_controller';
import { TabOptions } from '../../../types/enums';
import { Cooldown } from './cooldown';
interface CharacterSpellsProps {
    player: Player;
    controller: GameController;
}

export class CharacterSpells extends React.Component<CharacterSpellsProps> {

    renderSpell(spellNumber: number): JSX.Element{
        let spell;
        switch(spellNumber){
            case(1):
                spell = this.props.player.spells[0];

                // Ready spell
                if (spell && !spell.onCooldown){
                    return (
                        <div>
                            {spell.name}
                        </div>
                    )
                }

                // Spell on cooldown
                else if (spell && spell.onCooldown){
                    return (
                        <Cooldown spell={this.props.player.spells[0]}/>
                    )
                }

                break;
            case(2):
                spell = this.props.player.spells[1];

                // Ready spell
                if (spell && !spell.onCooldown){
                    return (
                        <div>
                            {spell.name}
                        </div>
                    )
                }

                // Spell on cooldown
                else if (spell && spell.onCooldown){
                    return (
                        <Cooldown spell={this.props.player.spells[1]}/>
                    )
                }
                break;
            case(3):
                spell = this.props.player.spells[2];

                // Ready spell
                if (spell && !spell.onCooldown){
                    return (
                        <div>
                            {spell.name}
                        </div>
                    )
                }

                // Spell on cooldown
                else if (spell && spell.onCooldown){
                    return (
                        <Cooldown spell={this.props.player.spells[2]}/>
                    )
                }
                break;
        }
        return null;
    }

    renderSpells = (): JSX.Element => {
        return (
            <div className="row">
                <div className="p-1 font-size-sm text-align-center" style={{width: "28%", margin: "2%",  border: '1px solid black'}}> 
                    <span> 
                        Q
                    </span>
                    {this.renderSpell(1)}
                </div>
                <div className="p-1 font-size-sm text-align-center" style={{width: "28%", margin: "2%",  border: '1px solid black'}}> 
                    <span> 
                        E
                    </span>
                    <div>
                        {this.renderSpell(2)}
                    </div>
                
                </div>
                <div className="p-1 font-size-sm text-align-center" style={{width: "28%", margin: "2%",  border: '1px solid black'}}> 
                    <span> 
                        R
                    </span>
                    <div>
                    {this.renderSpell(3)}
                    </div>
                
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className="col-3 h-100" style={{fontSize: "10px", fontWeight: "bold"}}>
                spell data
                <div className="pt-1" >
                    <CustomizeModal 
                        player={this.props.player} 
                        control={this.props.controller} 
                        selectedTab={TabOptions.spells}
                        link={<button> spell select </button>}
                    />
                </div>
                {this.renderSpells()}
            </div>
        );
    }
    
}