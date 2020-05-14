import React, { Component } from 'react';

interface IProps {
    value: any
}

interface ThousandsProps {
    value: number
}

export default class Text extends Component<IProps> {
    static Thousands: any

    render() {
        return (
            <div>
                {this.props.value}
            </div>
        );
    }
}

class Thousands extends Component<ThousandsProps>{
    toThousands = (number: number): string => {
        if (Object.prototype.toString.call(number) !== '[object Number]') { return '0'; }

        let num = number.toString();
        let result = '';
        let decimals = '';
        if (num.split('.')[1]) {
            decimals = num.split('.')[1];
            num = num.replace(/\.\d*/, '');
        }

        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }

        result = num + result;

        if (decimals) {
            return result + '.' + decimals;
        }
        return result;
    }
    render() {
        return (
            <div className="d-il test2thousands">
                {this.toThousands(this.props.value)}
            </div>
        );
    }
}

Text.Thousands = Thousands;
