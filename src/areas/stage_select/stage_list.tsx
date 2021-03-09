import * as React from 'react';
import { useEffect, useState } from 'react';
import { getStages } from '../../api/stages';
import { Player } from '../../classes/players/player';
import { StageTemplate } from '../../types/interfaces';
import { StageListLink } from './stage_list_link';

interface StageListProps {
    // changePlayer: (player: typeof Player) => void;
    changeStage: (stage: StageTemplate) => void;
    // selectedPlayer: typeof Player;
}

export const StageList = (props: StageListProps) => {

    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchStages = async () => {
        setLoading(true);
        try {
            const response = await getStages();
            setStages(response);
            setLoading(false);
        }
        catch {
            setLoading(false);
            setError("Could not connect to the stages server");
        }
    }

    useEffect(() => {
        fetchStages()
    }, [])

    if (loading){
        return (<div>
            Loading stages...
        </div>);
    }
    else if (error){
        return <div>
            {error}
        </div>
    }
    return (
        <div className="container"> 
            <h3>
                <b>play a stage</b>
            </h3>
            <hr/>
            <div className="row">
                <div className="col-3">
                    <label htmlFor="search">search</label>
                    <input name="search" type="text" placeholder="stage name"></input>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col-3">
                    <b>stage name</b>
                </div>
                <div className="col-3">
                </div>
                <div className="col-6"></div>
            </div>
            {stages.map((stage: StageTemplate) => {
                return (
                    <StageListLink
                        template={stage}
                        // selectedPlayer={props.selectedPlayer} 
                        changeStage={props.changeStage}
                        // changePlayer={props.changePlayer}  
                    />
                )
            })}
       
        </div>
    )
}