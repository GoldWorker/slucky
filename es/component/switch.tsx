import React, { Component, ChangeEvent } from 'react';

interface IProps {
    leftlabel: any,
    rightlabel: any,
    defaultChecked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default class Switch extends Component<IProps>{
    id: string
    constructor(props: IProps) {
        super(props);
        this.id = Math.random().toString(36).substring(2);
    }
    render() {
        return (
            <div className="mb32 d-f ac">
                <span className='pr8'>{this.props.leftlabel || '@123'}</span>
                <div className="switch-box-normalize">
                    <label htmlFor={this.id} className="switch-mark-click"></label>
                    <input
                        type="checkbox"
                        id={this.id}
                        defaultChecked={this.props.defaultChecked}
                        onChange={(e) => this.props.onChange(e)} />
                    <div>
                        <i className="switch-move"></i>
                        <span className="switch-horizon"></span>
                    </div>
                </div>
                <span className='pl8'>{this.props.rightlabel || ''}</span>
            </div>
        );
    }
}
