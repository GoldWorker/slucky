import React, { useState } from 'react';

interface LrchangeProps {
    optionList: [any],
    children: JSX.Element,
    onChange: (item: any, index: number) => void
}

export default function Lrchange(props: LrchangeProps): JSX.Element {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickLeft = (): void => {
        if (currentIndex > 0) {
            const resIndex = currentIndex - 1;
            setCurrentIndex(resIndex);
            props.onChange && props.onChange(props.optionList[resIndex], resIndex);
        }
    };

    const handleClickRight = (): void => {
        if (currentIndex < props.optionList.length - 1) {
            const resIndex = currentIndex + 1;
            setCurrentIndex(resIndex);
            props.onChange && props.onChange(props.optionList[resIndex], resIndex);
        }
    };

    return (
        <div className="d-f">
            <button className="s0 btn tp plr16" onClick={handleClickLeft}>
                <img src={require('../icons/arrowLeft.svg')} alt="" />
            </button>
            <div className="flex1 d-f jc">
                {
                    props.children || null
                }
            </div>
            <button className="s0 btn tp plr16" onClick={handleClickRight}>
                <img src={require('../icons/arrowRight.svg')} alt="" />
            </button>
        </div>
    );
}
