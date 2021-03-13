import * as React from 'react';
import { useEffect, useState } from 'react';
import { getStages } from '../../api/stages';
import { StageTemplate } from '../../types/interfaces';
import { StageListLink } from './stage_list_link';

interface StageListProps {
    changeStage: (stage: StageTemplate) => void;
}

export const StageList = (props: StageListProps) => {

    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [searchText, setSearchText] = useState<string>();

    const fetchStages = async (stageName: string = null) => {
        setLoading(true);
        try {
            const response = await getStages(stageName);
            setStages(response);
            setLoading(false);
        }
        catch {
            setLoading(false);
            setError("Could not connect to the stages server");
        }
    }

    const renderLoading = () => {
        if (loading){
            return (<div>
                Loading stages...
            </div>);
        }
    }

    useEffect(() => {
        fetchStages()
    }, [])


    if (error){
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
                    <input name="search" type="text" placeholder="stage name" value={searchText} onChange={(event) => {
                        setSearchText(event.target.value)
                        fetchStages(event.target.value);
                    }}></input>
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
            {renderLoading()}
            {stages?.map((stage: StageTemplate) => {
                return (
                    <StageListLink
                        template={stage}
                        changeStage={props.changeStage}
                    />
                )
            })}
       
        </div>
    )
}