// https://zhuanlan.zhihu.com/p/35227004

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom';

enum ToastItemClass {
    success = 'c-success',
    warn = 'c-warn',
    fail = 'c-fail'
}

enum ToastItemStatus {
    success = 'success',
    warn = 'warn',
    fail = 'fail'
}

interface ToastItem {
    content: JSX.Element,
    title?: string,
    status?: ToastItemStatus
}

interface ToastProps {
    ref?: any
}

interface ToastState {
    list: any[],
    toggle: boolean
}

export default class Toast extends Component<ToastProps, ToastState>{

    static add: ({ title, content, status }: ToastItem) => void
    static success: (content: JSX.Element) => void
    static error: (content: JSX.Element) => void
    static warn: (content: JSX.Element) => void
    static stop: () => void
    static goon: () => void

    public readonly state: Readonly<ToastState> = {
        list: [],
        toggle: false
    }

    timer: ReturnType<typeof setTimeout> | undefined;
    isStop: boolean
    node: HTMLDivElement

    constructor(props: ToastProps) {
        super(props);
        this.timer = undefined;
        this.isStop = false;
        this.node = document.createElement('div');
        document.body
            .appendChild(this.node);
    }

    componentWillUnmount() {
        this.clearPortalContainer();
    }

    stop = (): void => {
        this.isStop = true;
    }

    goon = (): void => {
        this.isStop = false;
    }

    addMsg = ({ title, content, status }: ToastItem): void => {
        //超过5个就弹出一个
        if (this.state.list.length > 5) {
            const data = this.state.list;
            data.shift();
            this.setState({ list: data });
        }
        if (!this.timer) {
            this.timer = setInterval(() => {
                const data = this.state.list;
                data.shift();
                this.setState({ list: data });

                if (!data.length) {
                    this.timer && clearInterval(this.timer);
                }
            }, 3000);
        }
        if (!this.isStop) {
            this.setState({
                list: [
                    ...this.state.list, {
                        title,
                        content,
                        status
                    }
                ]
            });
        }
    }

    handleClose = (index: number): void => {
        const data = this.state.list;
        data.splice(index, 1);
        this.setState({ list: data });
    }

    clearPortalContainer = (): void => {
        window
            .document
            .body
            .removeChild(this.node);
    }

    handleMapStatus = (status = 'success'): ToastItemClass => {
        switch (status) {
            case 'success':
                return ToastItemClass.success;
            case 'warn':
                return ToastItemClass.warn;
            case 'fail':
                return ToastItemClass.fail;
            default:
                return ToastItemClass.success;
        }
    };

    handleMapTitle = (status = 'success'): string => {
        switch (status) {
            case 'success':
                return '成功';
            case 'warn':
                return '警告';
            case 'fail':
                return '重试';
            default:
                return '';
        }
    };

    render() {
        return createPortal(
            <div className="toastlists-normalize-box">
                {this
                    .state
                    .list
                    .map((item, index) => {
                        return (
                            <div className="toastlist" key={index}>
                                <div className="toast-item paper p-r">
                                    <span onClick={(): void => this.handleClose(index)} className="p-a" style={{ top: 4, right: 8 + 'px', cursor: 'pointer' }}>x</span>
                                    <div className={['pb8', this.handleMapStatus(item.status)].join(' ')} style={{ minWidth: 256 + 'px' }}>{item.title || this.handleMapTitle(item.status)}</div>
                                    <div className="">{item.content}</div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            , this.node);
    }
}

// Toast.toastRef = React.createRef();
let toastRef: any = null;

Toast.add = ({ title, content, status }: ToastItem): void => {
    //保持一个实例
    if (!document.getElementById('slucky_toast')) {
        toastRef = React.createRef();
        const component = <Toast ref={toastRef} />;
        const div = document.createElement('div');
        div.id = 'slucky_toast';
        document.body.append(div);
        ReactDOM.render(component, div);
    }
    toastRef.current.addMsg({ title, content, status });
};

Toast.success = (content: JSX.Element): void => {
    Toast.add({ title: '成功', content, status: ToastItemStatus.success });
};

Toast.error = (content: JSX.Element): void => {
    Toast.add({ title: '错误', content, status: ToastItemStatus.fail });
};

Toast.warn = (content: JSX.Element): void => {
    Toast.add({ title: '提示', content, status: ToastItemStatus.warn });
};

Toast.stop = (): void => {
    toastRef.current.stop();
};

Toast.goon = (): void => {
    toastRef.current.goon();
};

