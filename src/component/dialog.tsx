import React, { MouseEvent, useState } from 'react';
import ReactDOM from 'react-dom';

interface DialogProps {
    open: boolean,
    maskClosable?: boolean,
    width?: string,
    children: JSX.Element,
    onClose: () => void
}

interface DialogTemplateProps {
    id: string,
    width?: string,
    handleClickMask: (e: MouseEvent<HTMLDivElement>) => void,
    children: JSX.Element,
    handleClose: () => void
}

interface FastModel {
    title: string | number,
    content: JSX.Element | number | string,
    footer: JSX.Element,
    width?: string,
    onOk: () => void
}

function DialogTemplate(props: DialogTemplateProps): JSX.Element {
    return (
        <div className="fadeIn p-r z10">
            <div className="dialog-mark d-f ac jc" id={props.id} onClick={props.handleClickMask}>
                <div className="dialog paper fade-scale mlr64">
                    <div className="ta-r">
                        <div className="mt4 mr4 pt4 plr8 ta-r">
                            <div
                                className="d-il"
                                onClick={props.handleClose}
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
        </div>
    );
}

function DialogBottomTemplate(props: DialogTemplateProps): JSX.Element {
    const [isShrink, setIsShrink] = useState(false);

    const handleShrink = (): void => {
        setIsShrink(true);
    };

    const handleMaximum = (): void => {
        setIsShrink(false);
    };

    return (
        <div className="fadeIn p-r z10">
            <div className="p-f w-full" style={{ bottom: isShrink ? 'unset' : '0', top: isShrink ? 'calc(100% - 36px)' : 'unset' }} id={props.id} onClick={props.handleClickMask}>
                <div className="paper fade-scale p-r" style={{ width: props.width ? props.width : '80%', margin: '0 auto' }} >
                    <div className="ta-r p-a t0 r0">
                        <div className="mt4 mr4 pt4 plr8 ta-r">
                            {
                                isShrink ?
                                    <div
                                        className="d-il mr16"
                                        onClick={handleMaximum}
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        <img src={require('../icons/maximum.svg')} alt="" />
                                    </div>
                                    :
                                    <div
                                        className="d-il mr16"
                                        onClick={handleShrink}
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        <img src={require('../icons/shrink.svg')} alt="" />
                                    </div>
                            }
                            <div
                                className="d-il"
                                onClick={props.handleClose}
                                style={{
                                    cursor: 'pointer'
                                }}>
                                <img src={require('../icons/close.svg')} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="dialog-content ta-l">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DialogContainer(Component: any): (props: DialogProps) => JSX.Element {
    return (props: DialogProps): JSX.Element => {
        const id = Math.random().toString(36).substring(2);

        const handleClickMask = (e: MouseEvent<HTMLDivElement>): void => {
            e.currentTarget.id === id && (props.maskClosable || false) && props.onClose();
        };

        const handleClose = (): void => {
            props.onClose && props.onClose();
        };

        const handleProtal = (isOpen: boolean): JSX.Element | null => {
            const res = isOpen ? <Component
                width={props.width}
                id={id}
                handleClickMask={handleClickMask}
                handleClose={handleClose}
            >{props.children}</Component> : null;
            return res;
        };
        return (
            ReactDOM.createPortal(handleProtal(props.open), document.body)
        );
    };
}

export default function Dialog(props: DialogProps): JSX.Element {
    const D = DialogContainer(DialogTemplate);
    return <D {...props} />;
}

Dialog.model = ({ content, onOk, title, footer }: FastModel): void => {
    const div = document.createElement('div');
    const closeDialog = (onOk: () => void, component: JSX.Element): void => {
        onOk && onOk();
        ReactDOM.render(React.cloneElement(component, { open: false }), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
    };
    const component = <Dialog open={true} onClose={() => closeDialog(() => { return; }, component)}>
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

const ButtomDialogTemplate = DialogContainer(DialogBottomTemplate);

Dialog.bottomModelClose = (): void => {
    const oldDialog = document.getElementById('slucky_bottomModel');
    if (oldDialog) {
        oldDialog.remove();
        ReactDOM.unmountComponentAtNode(oldDialog);
    }
};

Dialog.bottomModel = ({ content, onOk, title, footer, width }: FastModel): void => {
    const oldDialog = document.getElementById('slucky_bottomModel');
    if (oldDialog) {
        oldDialog.remove();
        ReactDOM.unmountComponentAtNode(oldDialog);
    }

    const div = document.createElement('div');
    div.id = 'slucky_bottomModel';
    const closeDialog = (onOk: () => void, component: JSX.Element): void => {
        onOk && onOk();
        ReactDOM.render(React.cloneElement(component, { open: false }), div);
        ReactDOM.unmountComponentAtNode(div);
        div.remove();
    };

    const component = <ButtomDialogTemplate width={width} open={true} onClose={(): void => closeDialog(() => { return; }, component)}>
        <div>
            {
                title && <p>{title}</p>
            }
            <div>{content}</div>
            {
                !footer &&
                <div className="ta-r pt8">
                    {
                        onOk && <button className="tag-text ptb6 plr16" onClick={(): void => closeDialog(onOk, component)}>确认</button>
                    }
                </div>
            }
        </div>
    </ButtomDialogTemplate>;

    closeDialog(() => { return; }, component);
    document.body.append(div);
    ReactDOM.render(component, div);
};
