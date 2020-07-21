import React, { CSSProperties } from 'react';

const handleStatus = (status: string): string => {
    switch (status) {
        case 'success':
            return 'c-success';
        case 'warn':
            return 'c-warn';
        case 'fail':
            return 'c-fail';
        default:
            return 'c-theme';
    }
};

interface Progress {
    percent: number,
    status: string,
    width: string,
    content: JSX.Element
}
interface ProgressCircleProps {
    percent: number,
    radius: string,
    isPie: boolean,
    content: JSX.Element,
    status: string
}

export default function Progress(props: Progress): JSX.Element {
    return (
        <div className="d-il">
            <progress max="100" value={props.percent} className={['progress-loading', handleStatus(props.status || 'theme')].join(' ')} style={{ width: props.width || 128 + 'px' }}></progress>
            {
                props.content ? props.content : <span className="d-il ml12">{props.percent || 0}%</span>
            }
        </div>
    );
}

export function ProgressCircle(props: ProgressCircleProps): JSX.Element {
    const progressStyles = {
        '--percent': props.percent || 0,
        width: props.radius || 64 + 'px',
        height: props.radius || 64 + 'px'
    } as CSSProperties;
    return (
        <div className="progress-pie" style={progressStyles}>
            <div className="pip-content d-f ac jc" style={props.isPie ? { backgroundColor: 'transparent' } : {}}>
                {
                    props.content ? props.content : <span>{props.percent || 0}%</span>
                }
            </div>
            <div className={['pie-left', handleStatus(props.status || 'theme')].join(' ')}></div>
            <div className={['pie-right', handleStatus(props.status || 'theme')].join(' ')}></div>
        </div>
    );
}

export function ProgressPie(props: ProgressCircleProps): JSX.Element {
    return (
        <ProgressCircle isPie={true} radius={props.radius} percent={props.percent} status={props.status} content={props.content} />
    );
}

export function ProgressWave(props: ProgressCircleProps): JSX.Element {
    const progressStyles = {
        '--radius': props.radius || 96 + 'px',
        '--percent': 100 + (props.percent || 0) + '%'
    } as CSSProperties;
    return (
        <div className="wave-box">
            <div className="wave" style={progressStyles}>
                <div className="pip-content d-f ac jc">
                    {
                        props.content ? props.content : <span>{props.percent || 0}%</span>
                    }
                </div>
            </div>
        </div>
    );
}

Progress.circle = ProgressCircle;
Progress.pie = ProgressPie;
Progress.wave = ProgressWave;
