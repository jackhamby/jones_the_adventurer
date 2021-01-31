import * as React from 'react';
import './cooldown.css';
import { Spell } from '../../../classes/spells/spell';

interface CooldownProps {
    spell: Spell;
}

interface CooldownState {
    cooldown: number;
}

export class Cooldown extends React.Component<CooldownProps, CooldownState> {

    interval: NodeJS.Timeout;

    constructor(props: CooldownProps){
        super(props);
        this.state = {
            cooldown: +(props.spell.cooldown / 60).toFixed(1),
        };
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({ cooldown: +(this.state.cooldown - .1).toFixed(1)});
        }, 100);
    }


    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const cooldownInSeconds = this.props.spell.cooldown / 60; // Assume 60 fps
        return (
            <div id="cooldown">
                <div id="cooldown-number"> {this.state.cooldown} </div>
                <svg>
                    <circle style={{animation: `countdown ${cooldownInSeconds}s linear forwards`}} r="18" cx="20" cy="20"></circle>
                </svg>
            </div>
        );
    }
}