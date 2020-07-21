import React, { Component, ChangeEvent, useState, useEffect } from 'react';

enum InputType {
    text = 'test',
    number = 'number',
    password = 'password'
}

enum InputState {
    normal = '',
    error = 'error',
    warn = 'warn'
}

interface InputProps {
    value?: string | number,
    defaultValue?: string | number,
    placeholder?: string,
    maxLength?: number,
    labelName?: string | number,
    width?: string,
    labelWidth?: string,
    type?: InputType,
    state?: InputState,
    disabled?: boolean,
    readOnly?: boolean,
    onChange?: (value: string) => void
}

interface InputNumberProps extends InputProps {
    value?: number,
    max?: number,
    min?: number,
    step?: number,
}

export default function Input(props: InputProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        props.onChange && props.onChange(value);
    };

    const handleState = (type: InputState | undefined): string => {
        switch (type) {
            case 'error':
                return InputState.error;
            case 'warn':
                return InputState.warn;
            default:
                return InputState.normal;
        }
    };

    return (
        <div className="d-f ac" style={{ width: props.width || 384 + 'px' }}>
            {
                props.labelName ? <div className="s0" style={{ width: props.labelWidth || 96 + 'px' }}>
                    <label htmlFor={id}>{props.labelName}</label>
                </div> : null
            }
            {
                props.value === undefined ?
                    <div style={{ width: props.width || 384 + 'px' }}>
                        <input
                            id={id}
                            defaultValue={props.defaultValue || ''}
                            onChange={onChange}
                            style={{ width: props.width || 384 + 'px' }}
                            placeholder={props.placeholder || ''}
                            type={props.type || InputType.text}
                            disabled={props.disabled || false}
                            readOnly={props.readOnly || false}
                            className={['input-normal', handleState(props.state)].join(' ')}
                            maxLength={props.maxLength || 100} />
                    </div> : <div style={{ width: props.width || 384 + 'px' }}>
                        <input
                            id={id}
                            onChange={onChange}
                            style={{ width: props.width || 384 + 'px' }}
                            value={props.value}
                            placeholder={props.placeholder || ''}
                            type={props.type || InputType.text}
                            disabled={props.disabled || false}
                            readOnly={props.readOnly || false}
                            className={['input-normal', handleState(props.state)].join(' ')}
                            maxLength={props.maxLength || 100} />
                    </div>
            }
        </div>
    );
}

export function InputMoney(props: InputProps): JSX.Element {

    const [value, setValue] = useState<string | number>('');

    const toThousands = (tar: string | number): string => {
        let num = (tar || '').toString(), result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
    };

    const onChange = (value: string | number): void => {
        value = (value || '').toString().replace(/\D/g, '');
        setValue(toThousands(value));
        props.onChange && props.onChange(value);
    };

    useEffect(() => {
        setValue(toThousands(props.value || ''));
    }, []);

    return <Input {...{
        value: value,
        onChange: onChange
    }} />;
}

export function InputNumber(props: InputNumberProps): JSX.Element {

    const [value, setValue] = useState<number>(props.value || 0);

    const handleChange = (val: string): void => {
        setValue(Number(val));
    };

    const handleClickCtrlUp = (): void => {
        const max = props.max || Infinity;
        const step = props.step || 1;
        let result: number;
        if (value + step < max) {
            result = value + step;
        } else {
            result = max;
        }
        setValue(result);
        props.onChange && props.onChange(result.toString());
    };

    const handleClickCtrlDown = (): void => {
        const min = props.min || 0;
        const step = props.step || 1;
        let result: number;
        if (value - step > min) {
            result = value - step;
        } else {
            result = min;
        }
        setValue(result);
        props.onChange && props.onChange(result.toString());
    };

    return <div className="d-il input-number p-r">
        <Input type={InputType.number} onChange={handleChange} value={value} width={props.width || 128 + 'px'} />
        <div className="d-il input-ctrl t0 r0 p-a">
            <div className="ctrl-up" onClick={handleClickCtrlUp}></div>
            <div className="ctrl-down" onClick={handleClickCtrlDown}></div>
        </div>
    </div>;
}

Input.Money = InputMoney;
Input.Number = InputNumber;
