const common = require('./webpack.common');
const devConfig = require('./webpack.dev');
//webpack性能分析工具
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin({
    outputFormat: 'human'
});

module.exports = function (env, arg) {
    console.log('环境', env, '打包模式', arg.mode);
    switch (env) {
        case 'pro':
            return smp.wrap(Object.assign({}, common));
        default:
            return Object.assign({}, common, devConfig);
    }
};
