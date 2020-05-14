import React, { Component, ChangeEvent, useState, useEffect } from 'react';

interface SwitchProps {
    leftlabel?: any,
    rightlabel?: any,
    defaultChecked?: boolean,
    checked?: boolean,
    onChange?: (switchState: boolean) => void
}

export default function Switch(props: SwitchProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const [on, setOn] = useState(props.checked || props.defaultChecked || false);

    useEffect(() => {
        setOn(props.checked || false);
    }, [props.checked]);

    const handleChangeSwitch = (e: ChangeEvent<HTMLInputElement>): void => {
        const { checked } = e.target;
        setOn(checked);
        props.onChange && props.onChange(checked);
    };

    const handleClickSwitch = (): void => {
        setOn(props.checked || false);
        props.onChange && props.onChange(!props.checked);
    };

    const handleControlRender = (props: SwitchProps): JSX.Element => {
        if (props.checked === undefined) {
            return (
                <input
                    type="checkbox"
                    id={id}
                    defaultChecked={props.defaultChecked}
                    onChange={handleChangeSwitch} />
            );
        }
        return (
            <input
                type="checkbox"
                id={id}
                defaultChecked={props.defaultChecked}
                checked={on}
                onClick={handleClickSwitch} />
        );
    };

    return (
        <div className="mb32 d-f ac">
            {
                props.leftlabel ? <span className='pr8'>{props.leftlabel}</span> : null
            }
            <div className="switch-box-normalize">
                <label htmlFor={id} className="switch-mark-click"></label>
                {
                    handleControlRender(props)
                }
                <div>
                    <i className="switch-move"></i>
                    <span className="switch-horizon"></span>
                </div>
            </div>
            {
                props.rightlabel ? <span className='pl8'>{props.rightlabel}</span> : null
            }
        </div>
    );
}

// export default class Switch extends Component<IProps>{
//     id: string
//     constructor(props: IProps) {
//         super(props);
//         this.id = Math.random().toString(36).substring(2);
//     }
//     render() {
//         return (
//             <div className="mb32 d-f ac">
//                 <span className='pr8'>{this.props.leftlabel || ''}</span>
//                 <div className="switch-box-normalize">
//                     <label htmlFor={this.id} className="switch-mark-click"></label>
//                     <input
//                         type="checkbox"
//                         id={this.id}
//                         defaultChecked={this.props.defaultChecked}

//                         onChange={(e) => this.props.onChange(e)} />
//                     <div>
//                         <i className="switch-move"></i>
//                         <span className="switch-horizon"></span>
//                     </div>
//                 </div>
//                 <span className='pl8'>{this.props.rightlabel || ''}</span>
//             </div>
//         );
//     }
// }
