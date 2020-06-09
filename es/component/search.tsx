import React, { useState, ChangeEvent, useEffect } from 'react';

interface SearchProps {
    labelName: string,
    width: string,
    placeholder: string,
    maxLength: number,
    maxHeight: number,
    loading: boolean | JSX.Element,
    // 配置提示列表
    option: string[],
    // 当配置value时，即为可控组件
    value: string,
    // 按回车时回调
    onSearch: (value: string) => void,
    // 输入字符、按下回车时回调
    onChange: (value: string) => void,
    // 点击option中的item
    onClick: (value: string) => void
}

export default function Search(props: SearchProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const [dataCache, setDataCache] = useState<string[]>(props.option || []);
    const [value, setValue] = useState(props.value || '');

    useEffect(() => {
        const dataFilter = props.option.filter(item => {
            return item.indexOf(value) !== -1;
        });
        setDataCache(dataFilter);
    }, [props.option]);

    const handleChange = (value: string): void => {
        setValue(value);
        props.onChange && props.onChange(value);
    };

    const handleClick = (value: string): void => {
        handleChange(value);
        props.onClick && props.onClick(value);
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        // 回车
        if (e.nativeEvent.keyCode === 13) {
            props.onSearch && props.onSearch(e.currentTarget.value);
        }
    };

    const highlightKeyWord = (item: string): JSX.Element => {
        const keyWord = value;
        const index = item.indexOf(value);
        if (index === -1) {
            return <span>{item}</span>;
        }
        const preStr = item.substring(0, index);
        const nextStr = item.substring(index + value.length);
        return <span>{preStr}<span className="highlight">{keyWord}</span>{nextStr}</span>;
    };

    return (
        <div className="select-down-modern">
            {
                props.labelName ? <label htmlFor={id} className="pb4 mb0 fs12 d-b">{props.labelName}</label> : null
            }
            <div className="input-normal p-r d-f ac" style={{ width: props.width || 196 + 'px' }}>
                <input
                    id={id}
                    type="search"
                    className="input-ghost w-full"
                    placeholder={props.placeholder || ''}
                    maxLength={props.maxLength || 50}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => handleChange(e.target.value)}
                    onKeyPress={handleEnterKey}
                    value={value} />
                <img className="icon logo-search mr8 s0" src={require('../icons/search.svg')} alt="" onClick={(): void => props.onSearch && props.onSearch(value)} />
            </div>
            {
                // 输入提示
                dataCache.length ? <ul className="select-option" style={{ 'maxHeight': `${props.maxHeight}px` }} loader-inline={props.loading ? 'circle' : ''} scrollbar='normal'>
                    {
                        dataCache.map((item, index) => {
                            return <li className="ellip1" onMouseDown={(): void => handleClick(item)} key={index}>{highlightKeyWord(item)}</li>;
                        })
                    }
                </ul> : <ul className="select-option">
                    <div className="ptb32 ta-c">
                        暂无数据
                    </div>
                </ul>
            }
        </div>
    );
}
