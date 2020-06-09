/**
 * 工具类
 *
 * @export
 * @class Lib
 */
export default class Lib {
    /**
     * 英制，千分，逗号
     *  
     * @static
     * @memberof Lib
     */
    static n2Money: (number: number | string) => string

    /**
     * 单位转化
     *
     * @static
     * @memberof Lib
     */
    static intWithUtil: (value: number) => string
    static byteWithUtil: (value: number) => string
    static moneyWithUtil: (value: number) => string

    static getPastTime: (value: number) => string
}

Lib.n2Money = (number: number | string): string => {
    let num = (number || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
};

Lib.intWithUtil = (value: number): string => {
    if (Object.prototype.toString.call(value) !== '[object Number]') { return '-'; }
    if (value < 0.1 && value > 0) { return value.toFixed(4); }

    const _UNIT = ['', '万', '亿'];
    const _CARRY = 10000;
    let index = 0;
    let con = value;
    // 是否大于零
    const isPositive = con >= 0;
    if (!isPositive) {
        con = con * -1;
    }
    while (con >= _CARRY && index < _UNIT.length - 1) {
        con = con / _CARRY;
        index++;
    }
    if (!isPositive) {
        con = con * -1;
    }
    return con.toFixed(0) + _UNIT[index];
};

Lib.byteWithUtil = (value: number): string => {
    if (Object.prototype.toString.call(value) !== '[object Number]') { return '-'; }
    if (value > 0 && value < 1) { return '-'; }

    const _UNIT = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const _CARRY = 1024;
    let index = 0;
    let con = value;
    // 是否大于零
    const isPositive = con >= 0;
    if (!isPositive) {
        con = con * -1;
    }
    while (con >= _CARRY && index < _UNIT.length - 1) {
        con = con / _CARRY;
        index++;
    }
    if (!isPositive) {
        con = con * -1;
    }
    return con.toFixed(0) + _UNIT[index];
};

Lib.moneyWithUtil = (value: number): string => {
    if (Object.prototype.toString.call(value) !== '[object Number]') { return '-'; }

    const _UNIT = ['元', '元', '百元', '千元', '万元', '百万元', '千万元', '亿元', '十亿元', '百亿元', '千亿元', '万亿元'];
    const _CARRY = 10;
    let index = 0;
    let con = value;
    // 是否大于零
    const isPositive = con >= 0;
    if (!isPositive) {
        con = con * -1;
    }
    while (con >= _CARRY && index < _UNIT.length - 1) {
        con = con / _CARRY;
        index++;
    }
    if (!isPositive) {
        con = con * -1;
    }
    return con.toFixed(0) + _UNIT[index];
};


Lib.getPastTime = (value: number): string => {
    //获取当前时间戳
    function getUnix() {
        const ts = Math.round(new Date().getTime() / 1000);
        return ts;
    }
    //获取今天0点0分0秒的时间戳
    function getTodayUnix() {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }
    //获取今年1月1日0点0分0秒的时间戳
    function getYearUnix() {
        const date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }
    //获取标准年月日
    function getLastDate(time: number): string {
        const date = new Date(time);
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    }
    //转换时间
    if (value) {
        const now = getUnix(); // 当前时间戳
        const today = getTodayUnix(); // 今天0点的时间戳
        const year = getYearUnix(); // 今年0点的时间戳
        const timer = now - value; // 转换为秒级时间戳
        let tip = '';
        if (timer <= 0) {
            tip = '刚刚';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && value - today >= 0) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else if (timer / 86400 >= 31) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else {
            tip = getLastDate(value);
        }
        return tip;
    }
    return '-';
};

