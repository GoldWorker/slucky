import React, { useState } from 'react';

interface GuideProps {
    option: GiodeItem[],
    className: string,
    isClose: boolean,
    containerId?: string
    onFinish?: () => void
}

interface GiodeItem {
    maskType: MaskType,
    tipPosition: TipPosition,
    tipAlign: TipAlign,
    maskDisplay: boolean,
    content: JSX.Element | string | number,
    targetId: string,
}

export enum MaskType {
    circle = 'circle',
    rect = 'rect'
}

export enum TipPosition {
    top = 'top',
    left = 'left',
    right = 'right',
    bottom = 'bottom'
}

export enum TipAlign {
    center = 'center',
    left = 'left',
    right = 'right',
}

export default function Guide(props: GuideProps): JSX.Element {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(true);

    const handleTargetPosition = (id: string): {
        width?: string,
        height?: string,
        borderWidth?: string,
        display?: string
    } => {
        const doc = document.documentElement;
        const body = document.body;

        const target = document.getElementById(id);
        const container = document.getElementById(props.containerId || '');
        if (target) {
            if (container && target.getBoundingClientRect().top + target.getBoundingClientRect().height > container.clientHeight) {
                console.log('target', target, target.getBoundingClientRect(), target.getBoundingClientRect().top + target.getBoundingClientRect().height, container.clientHeight);
                container.scrollTop = target.getBoundingClientRect().top + target.getBoundingClientRect().height - container.clientHeight;
            }

            console.log(target);
            const targetWidth = target.getBoundingClientRect().width;
            const targetHeight = target.getBoundingClientRect().height;
            // page size
            const pageHeight = doc.scrollHeight;
            const pageWidth = doc.scrollWidth;

            // offset of target    
            const offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop);
            const offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft);

            console.log(`${offsetTop}px ${pageWidth - targetWidth - offsetLeft}px ${pageHeight - targetHeight - offsetTop}px ${offsetLeft}px`);

            // set size and border-width
            const style = {
                width: targetWidth + 'px',
                height: targetHeight + 'px',
                borderWidth: `${offsetTop}px ${pageWidth - targetWidth - offsetLeft}px ${pageHeight - targetHeight - offsetTop}px ${offsetLeft}px`
            };
            return style;
        }
        return {
            display: 'none'
        };
    };

    const handleNextStep = (index: number): void => {
        if (index + 1 === props.option.length) {
            props.onFinish && props.onFinish();
            setIsOpen(false);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSkipStep = (): void => {
        setIsOpen(false);
    };

    const handleTipPosition = (tipPosition: TipPosition): {
        top?: string,
        left?: string,
        bottom?: string,
        right?: string
    } => {
        switch (tipPosition) {
            case TipPosition.bottom:
                return {
                    top: 'calc(100% + 15px)'
                };
            case TipPosition.top:
                return {
                    bottom: 'calc(100% + 15px)'
                };
            case TipPosition.left:
                return {
                    right: 'calc(100% + 15px)'
                };
            case TipPosition.right:
                return {
                    left: 'calc(100% + 15px)'
                };
            default:
                return {
                    top: 'calc(100% + 15px)'
                };
        }
    };

    const handleTipAlign = (tipAlign: TipAlign): {
        position: any,
        right?: number,
        left?: number
    } => {
        switch (tipAlign) {
            case TipAlign.center:
                return {
                    position: 'relative'
                };
            case TipAlign.left:
                return {
                    position: 'absolute',
                    left: 0
                };
            case TipAlign.right:
                return {
                    position: 'absolute',
                    right: 0
                };
            default:
                return {
                    position: 'relative'
                };
        }
    };

    const handleTipArrow = (tipPosition: TipPosition, tipAlign: TipAlign): {
        bottom?: string,
        top?: string,
        left?: string,
        right?: string,
        borderColor: string,
        margin: string
    } => {
        const handleTipAlign = (tipAlign: TipAlign): string => {
            switch (tipAlign) {
                case TipAlign.center:
                    return '0 auto';
                case TipAlign.left:
                    return '0 auto 0 16px';
                case TipAlign.right:
                    return '0 16px 0 auto';
                default:
                    return '0 auto';
            }
        };

        switch (tipPosition) {
            case TipPosition.bottom:
                return {
                    bottom: '100%',
                    borderColor: 'transparent transparent #272A33 transparent',
                    margin: handleTipAlign(tipAlign)
                };
            case TipPosition.top:
                return {
                    top: '100%',
                    borderColor: '#272A33 transparent transparent transparent',
                    margin: handleTipAlign(tipAlign)
                };
            case TipPosition.left:
                return {
                    left: '100%',
                    borderColor: 'transparent transparent transparent #272A33',
                    margin: handleTipAlign(tipAlign)
                };
            case TipPosition.right:
                return {
                    right: '100%',
                    borderColor: 'transparent #272A33 transparent transparent',
                    margin: handleTipAlign(tipAlign)
                };
            default:
                return {
                    bottom: '100%',
                    borderColor: 'transparent transparent #272A33 transparent',
                    margin: handleTipAlign(tipAlign)
                };
        }
    };

    return <div>
        {
            !props.isClose && isOpen ? [props.option[currentIndex]].map((item) => {
                // index === currentIndex ? '' : 'd-n'
                return <div className={[props.className].join(' ')} key={item.targetId}>
                    <div className="guide-cover" style={handleTargetPosition(item.targetId)}>
                        <div className="guide-tip-container" style={handleTipPosition(item.tipPosition)}>
                            <div className="d-il guide-tip" style={handleTipAlign(item.tipAlign)}>
                                <div className="guide-arrow" style={handleTipArrow(item.tipPosition, item.tipAlign)}></div>
                                <div>
                                    {item.content}
                                </div>
                                <div className="fs12 pt16 d-f jc-b">
                                    <span className="pr16 c-hint-b">{`${currentIndex + 1} / ${props.option.length}`}</span>
                                    <div>
                                        <button className="btn tp c-hint-b" onClick={handleSkipStep}>跳过指引</button>
                                        <button className="btn tp c-theme" onClick={(): void => handleNextStep(currentIndex)}>{currentIndex + 1 === props.option.length ? '完成' : '知道了'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            }) : null
        }
    </div>;
}
