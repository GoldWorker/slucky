import React from 'react';

interface DetailsProps {
    summary: string | number,
    children: JSX.Element,
    open: boolean
}

export default function Details(props: DetailsProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);
    return (
        <div className="details-normalize">
            <div className="d-f ac p-r">
                <label htmlFor={id} className="cp p-a d-f ac" style={{ right: '100%' }}>
                    <img className="icon fs20" src={require('../icons/right.svg')} alt="" />
                </label>
                <div>{props.summary || ''}</div>
            </div>
            <input className="details-trigger d-n" id={id} type="checkbox" defaultChecked={!props.open} />
            <div className="details-content pl20">
                {props.children || ''}
            </div>
        </div>
    );
}
