import React, { ChangeEvent } from 'react';

interface RadioProps {
    checked: boolean,
    defaultChecked: boolean,
    label: string,
    name: string,
    value: string | number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Radio(props: RadioProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        props.onChange && props.onChange(e);
    };

    return (
        <div className="radio-box-normalize d-il pr16">
            {
                props.checked === undefined ? <input
                    id={id}
                    name={props.name}
                    value={props.value}
                    defaultChecked={props.defaultChecked}
                    onChange={onChange}
                    type="radio"
                    className="d-n" /> : <input
                    id={id}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                    onChange={onChange}
                    type="radio"
                    className="d-n" />
            }
            <label className="m0" htmlFor={id}>
                <div className="radio-out">
                    <i className="radio-in"></i>
                </div>
                <span className="pl8">{props.label || ''}</span>
            </label>
        </div>
    );
}

export function RadioBorder(props: RadioProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        props.onChange && props.onChange(e);
    };

    return (
        <div className="trigger-box-border d-il mr16 mb8">
            {
                props.checked === undefined ? <input
                    trigger="core"
                    id={id}
                    name={props.name}
                    value={props.value}
                    defaultChecked={props.defaultChecked}
                    onChange={onChange}
                    type="radio"
                    className="d-n" /> : <input
                    trigger="core"
                    id={id}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                    onChange={onChange}
                    type="radio"
                    className="d-n" />
            }
            <label
                htmlFor={id}
                className="trigger-border mb0"
            >
                {/* <span className="fontstyle-sign">✓</span> */}
                <span className="m0">{props.label || ''}</span>
            </label>
        </div>
    );
}

interface GroupProps {
    defaultValue: string | number,
    value: string | number,
    className: string,
    children: JSX.Element,
    option: Array<{
        label: string,
        value: string | number
    }>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const GroupContainer = (Component: any) => function Group(props: GroupProps): JSX.Element {
    const name = Math.random().toString(36).substring(2);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        props.onChange && props.onChange(e);
    };

    const isEqual = (a: string | number, b: string | number): boolean | undefined => {
        if (props.value === undefined) {
            return undefined;
        }
        return a === b;
    };

    return (
        <div className={props.className || ''}>
            {
                props.children ? null : props.option.map((item, index) => {
                    const componentProps = {
                        defaultChecked: props.defaultValue === item.value,
                        checked: isEqual(props.value, item.value),
                        name,
                        label: item.label,
                        value: item.value,
                        onChange: onChange
                    };
                    return <Component {...componentProps} key={index} />;
                })
            }
        </div>
    );
};

Radio.Group = GroupContainer(Radio);
Radio.GroupBorder = GroupContainer(RadioBorder);
