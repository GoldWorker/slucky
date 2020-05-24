import React, { useState, ChangeEvent } from 'react';

interface SearchProps {
    labelName: string,
    width: string,
    placeholder: string,
    maxLength: number,
    // 配置提示列表
    option: string[],
    // 当配置value时，即为可控组件
    value: string,
    // 按回车时回调
    onSearch: (value: string) => void,
    // 输入字符、按下回车时回调
    onChange: (value: string) => void
}

export default function Search(props: SearchProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const [dataCache, setDataCache] = useState<string[]>(props.option || []);
    const [value, setValue] = useState(props.value || '');

    const handleChange = (value: string): void => {
        const dataFilter = props.option.filter(item => {
            return item.indexOf(value) !== -1;
        });

        setDataCache(dataFilter);
        setValue(value);

        props.onChange && props.onChange(value);
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        // 回车
        if (e.nativeEvent.keyCode === 13) {
            props.onSearch && props.onSearch(e.currentTarget.value);
        }
    };

    return (
        <div className="select-down-modern">
            {
                props.labelName ? <label htmlFor={id} className="pb4 mb0 fs12 d-b">{props.labelName}</label> : null
            }
            <div className="input-normal p-r d-f ac" style={{ width: props.width || 196 + 'px' }}>
                <img className="icon logo-search mr8 s0" src={require('../icons/search.svg')} alt="" onClick={(): void => props.onSearch && props.onSearch(value)} />
                <input
                    id={id}
                    type="search"
                    className="input-ghost w-full"
                    placeholder={props.placeholder || ''}
                    maxLength={props.maxLength || 50}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => handleChange(e.target.value)}
                    onKeyPress={handleEnterKey}
                    value={value} />
            </div>
            {
                // 输入提示
                props.option ? <ul className="select-option paper" scrollbar='normal'>
                    {
                        dataCache.map((item, index) => {
                            return <li onMouseDown={(): void => handleChange(item)} key={index}>{item}</li>;
                        })
                    }
                </ul> : null
            }
        </div>
    );
}
