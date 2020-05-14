import React, { useState, useEffect } from 'react';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        scrollbar?: string;
    }
}

interface Selectitem {
    label: string | number,
    value: any
}

interface SelectProps {
    option: Selectitem[],
    onChange: (selectedValue: string | number, selectItem: Selectitem) => void
    labelName?: string,
    placeholder?: string,
    width?: string,
    value?: string | number,
    defaultValue?: string | number,
}

export default function Select(props: SelectProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);
    const [selectedValue, setSelectValue] = useState<string | number>(props.value || props.defaultValue || '');

    const getLabel = (): string | number => {
        let initLabel: string | number = '';
        if (props.option && props.option.length > 0) {
            const [st] = props.option;
            initLabel = st.label;
        }
        if (props.value || props.defaultValue) {
            const value = props.value || props.defaultValue;
            const [target] = props.option.filter(item => {
                return item.value == value;
            });
            if (target) {
                initLabel = target.label;
            }
        }
        return initLabel;
    };

    const [selectedLabel, setSelectLabel] = useState(getLabel());

    useEffect(() => {
        setSelectValue(props.value || '');
        setSelectLabel(getLabel());
    }, [props.value]);

    const handleClickSelected = (label: string | number, value: any): void => {
        setSelectValue(value);
        setSelectLabel(label);
        props.onChange && props.onChange(value, {
            label,
            value
        });
    };

    return (
        <div className="select-down-modern">
            {
                props.labelName ? <label htmlFor={id} className="pb4 mb0 fs12 d-b">{props.labelName}</label> : null
            }
            <input
                id={id}
                type="text"
                className="input-normal"
                style={{ width: props.width || 384 + 'px' }}
                placeholder={props.placeholder || ''}
                value={selectedLabel}
            />
            <div className="select-down-icon d-f jc fd-c">
                <div className="tri-down"></div>
            </div>
            <ul className="select-option paper" scrollbar='normal'>
                {
                    props.option ? props.option.map((item, index) => {
                        return <li onMouseDown={() => handleClickSelected(item.label, item.value)} key={index}>{item.label}</li>;
                    }) : null
                }
            </ul>
        </div>
    );
}
