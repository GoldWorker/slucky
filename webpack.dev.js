const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 2000, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1 //每秒询问的文件变更的次数
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            verbose: false,
            watch: true,
            exclude: ['.git', '.npmignore', 'package.json', 'README.md']
        }),
        new CopyPlugin([{
            from: './sass',
            to: './sass'
        }, {
            from: './src/icons',
            to: './icons'
        }, {
            from: './src',
            to: '../es'
        }])
    ]
};
