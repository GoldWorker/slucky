const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

function getFileCollection() {
    const globPath = './src/**/*.*(jsx|js|ts|tsx)';
    const files = glob.sync(globPath);
    return files;
}

function getEntryConfig() {
    const entryObj = {};
    getFileCollection().forEach(item => {
        const filePath = item.replace('./src', '');
        entryObj[filePath] = path.resolve(__dirname, item);
    });
    console.log(entryObj);
    return entryObj;
}

module.exports = {
    entry: getEntryConfig(),
    output: {
        filename: (chunkData) => {
            const filePath = chunkData.chunk.name;
            const filename = filePath.replace(/\.(jsx|ts|tsx)$/, '.js');
            return filename;
        },
        path: __dirname + '/lib',
        libraryTarget: 'umd'
    },
    externals: [
        function (context, request, callback) {
            // 允许编译以下后缀文件
            if (/\.(jsx|ts|tsx|jpg|png|gif|svg|jpeg)$/g.test(request)) {
                console.log(request);
                return callback();
            }
            callback(null, request);
        }
    ],
    resolve: {
        extensions: ['.js', '.css', '.json', '.jsx', '.tsx', '.ts']
    },
    module: {
        rules: [{
            test: /.jsx|.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.tsx|.ts$/,
            use: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(jpg|png|gif|svg|jpeg)$/,
            loader: 'url-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            logLevel: 'info'
        }),
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
