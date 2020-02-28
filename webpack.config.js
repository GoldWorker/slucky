const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: getEntryConfig(),
    output: {
        filename: (chunkData) => {
            let filePath = chunkData.chunk.name;
            const filename = filePath.replace('.jsx', '.js');
            return filename;
        },
        path: __dirname + '/lib',
        libraryTarget: 'umd'
    },
    externals: [
        function(context, request, callback) {
            // 允许编译以下后缀文件
            if (/.jsx|.jpg|.png|.gif|.svg|.jpeg$/g.test(request)) {
                return callback();
            }
            callback(null, request);
        }
    ],
    resolve: {
        extensions: ['.js', '.css', '.json', '.jsx']
    },
    module: {
        rules: [{
            test: /.jsx|.js$/,
            loader: 'babel-loader',
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

function getFileCollection() {
    const globPath = './src/**/*.*(jsx|js)';
    const files = glob.sync(globPath);
    return files;
}

function getEntryConfig() {
    let entryObj = {};
    getFileCollection().forEach(item => {
        const filePath = item.replace('./src', '');
        entryObj[filePath] = path.resolve(__dirname, item);
    });
    console.log(entryObj);
    return entryObj;
}
