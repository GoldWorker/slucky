import React, { Component, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

interface DialogProps {
    open: boolean,
    maskClosable?: boolean,
    children: JSX.Element,
    onClose: () => void
}

export default function Dialog(props: DialogProps): JSX.Element {
    const id = Math.random().toString(36).substring(2);

    const handleClickMask = (e: MouseEvent<HTMLDivElement>): void => {
        e.currentTarget.id === id && (props.maskClosable || false) && props.onClose();
    };

    const handleClose = (): void => {
        props.onClose && props.onClose();
    };

    const handleProtal = (isOpen: boolean): JSX.Element | null => {
        const res = isOpen ? <div className="fadeIn p-r z10">
            <div className="dialog-mark d-f ac jc" id={id} onClick={handleClickMask}>
                <div className="dialog paper fade-scale mlr64">
                    <div className="ta-r">
                        <div className="mt4 mr4 pt4 plr8 ta-r">
                            <div
                                className="d-il"
                                onClick={handleClose}
                                style={{
                                    cursor: 'pointer'
                                }}>X</div>
                        </div>
                    </div>
                    <div>
                        <div className="dialog-content ta-l">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;
        return res;
    };
    return (
        ReactDOM.createPortal(handleProtal(props.open), document.body)
    );
}

interface FastModel {
    title: string | number,
    content: JSX.Element | number | string,
    footer: JSX.Element,
    onOk: () => void
}

Dialog.model = ({ content, onOk, title, footer }: FastModel): void => {
    const div = document.createElement('div');
    const closeDialog = (onOk: () => void, component: JSX.Element): void => {
        onOk && onOk();
        ReactDOM.render(React.cloneElement(component, { open: false }), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
    };
    const component = <Dialog open={true} onClose={() => closeDialog(()=>{return;}, component)}>
        <div>
            {
                title && <p>{title}</p>
            }
            <div>{content}</div>
            {
                !footer &&
                <div className="ta-r pt8">
                    <button className="tag-text ptb6 plr16" onClick={() => closeDialog(() => { return; }, component)}>取消</button>
                    {
                        onOk && <button className="tag-text ptb6 plr16" onClick={() => closeDialog(onOk, component)}>确认</button>
                    }
                </div>
            }
        </div>
    </Dialog>;
    document.body.append(div);
    ReactDOM.render(component, div);
};
