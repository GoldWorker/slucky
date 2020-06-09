// https://zhuanlan.zhihu.com/p/35227004

import React, { Component, useState } from 'react';
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

export default function Toast(props: ToastProps): JSX.Element {

    const [list, setList] = useState<ToastItem[]>([]);

    const doc = window.document;
    const node = doc.createElement('div');
    doc
        .body
        .appendChild(node);

    let isStop: boolean, timer: ReturnType<typeof setTimeout>;


    const handleClose = (index: number): void => {
        const data = [...list];
        data.splice(index, 1);
        setList(data);
    };

    const stop = (): void => {
        isStop = true;
    };

    const goon = (): void => {
        isStop = false;
    };

    const add = ({ title, content, status }: ToastItem): void => {
        //超过5个就弹出一个
        if (list.length > 5) {
            const data = [...list];
            data.shift();
            setList(data);
        }
        if (!timer) {
            timer = setInterval(() => {
                const data = [...list];
                data.shift();
                setList(data);

                if (!data.length) {
                    clearInterval(timer);
                }
            }, 3000);
        }
        if (!isStop) {
            setList([
                ...list, {
                    title,
                    content,
                    status
                }
            ]);
        }
    };

    const handleMapStatus = (status = 'success'): ToastItemClass => {
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

    const handleMapTitle = (status = 'success'): string => {
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

    return (
        createPortal(
            <div className="toastlists-normalize-box">
                {list
                    .map((item, index) => {
                        return (
                            <div className="toastlist" key={index}>
                                <div className="toast-item paper p-r">
                                    <span onClick={() => handleClose(index)} className="p-a" style={{ top: 4, right: 8 + 'px', cursor: 'pointer' }}>x</span>
                                    <div className={['pb8', handleMapStatus(item.status)].join(' ')} style={{ minWidth: 256 + 'px' }}>{item.title || handleMapTitle(item.status)}</div>
                                    <div className="">{item.content}</div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            , node)
    );
}


// const toastRef = '';
// export class Toast1 extends React.Component {
//     constructor() {
//         super(...arguments);
//         this.state = {
//             list: [],
//             toggle: false
//         };
//         this.createPortalContainer();
//         this.timer = undefined;
//         this.isStop = false;
//     }

//     stop() {
//         this.isStop = true;
//     }

//     goon() {
//         this.isStop = false;
//     }

//     add = ({ title, content, status }) => {
//         //超过5个就弹出一个
//         if (this.state.list.length > 5) {
//             const data = this.state.list;
//             data.shift();
//             this.setState({ list: data });
//         }
//         if (!this.timer) {
//             // console.log(this.timer,'timer');
//             this.timer = setInterval(() => {
//                 const data = this.state.list;
//                 data.shift();
//                 this.setState({ list: data });

//                 if (!data.length) {
//                     this.timer = clearInterval(this.timer);
//                 }
//             }, 3000);
//         }
//         if (!this.isStop) {
//             this.setState({
//                 list: [
//                     ...this.state.list, {
//                         title,
//                         content,
//                         status
//                     }
//                 ]
//             });
//         }
//     }

//     handleClose(index) {
//         const data = this.state.list;
//         data.splice(index, 1);
//         this.setState({ list: data });
//     }

//     createPortalContainer() {
//         const doc = window.document;
//         this.node = doc.createElement('div');
//         doc
//             .body
//             .appendChild(this.node);
//     }

//     clearPortalContainer() {
//         window
//             .document
//             .body
//             .removeChild(this.node);
//     }

//     handleMapStatus(status = 'success') {
//         switch (status) {
//             case 'success':
//                 return 'c-success';
//             case 'warn':
//                 return 'c-warn';
//             case 'fail':
//                 return 'c-fail';
//             default:
//                 return 'c-success';
//         }
//     }

//     handleMapTitle(status = 'success') {
//         switch (status) {
//             case 'success':
//                 return '成功';
//             case 'warn':
//                 return '警告';
//             case 'fail':
//                 return '重试';
//             default:
//                 return false;
//         }
//     }

//     render() {
//         // console.log(this.props.toggle, this.state.list, this.node);

//         return createPortal(
//             <div className="toastlists-normalize-box">
//                 {this
//                     .state
//                     .list
//                     .map((item, index) => {
//                         return (
//                             <div className="toastlist" key={index}>
//                                 <div className="toast-item paper p-r">
//                                     <span onClick={() => this.handleClose(index)} className="p-a" style={{ top: 4, right: 8 + 'px', cursor: 'pointer' }}>x</span>
//                                     <div className={['pb8', this.handleMapStatus(item.status)].join(' ')} style={{ minWidth: 256 + 'px' }}>{item.title || this.handleMapTitle(item.status)}</div>
//                                     <div className="">{item.content}</div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//             </div>
//             , this.node);
//     }

//     componentWillUnmount() {
//         this.clearPortalContainer();
//     }
// }

// Toast.toastRef = React.createRef();

let toastRef: any | null = null;

Toast.add = ({ title, content, status }: ToastItem): void => {
    //保持一个实例
    if (!document.getElementById('slucky_toast')) {
        const component = <Toast ref={(tRef: any): void => { 
            toastRef = tRef; 
            toastRef.current.add({ title, content, status });
        }} />;
        const div = document.createElement('div');
        div.id = 'slucky_toast';
        document.body.append(div);
        ReactDOM.render(component, div);
    }else{
        toastRef.current.add({ title, content, status });
    }
    // toastRef.current.add({ title, content, status });
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

