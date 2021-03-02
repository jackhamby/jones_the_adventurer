import * as React from 'react';
import { StageTemplate } from '../../types/interfaces';

interface StageListLinkProps {
    template: StageTemplate;
}

export const StageListLink = (props: StageListLinkProps) => {

    return (
        <div className="row">
            <div className="col-3">
                {props.template.name}
            </div>
            <div className="col-3">
                <a href="#"> try it out</a>
            </div>
            <div className="col-6"></div>
        </div>
    );
}