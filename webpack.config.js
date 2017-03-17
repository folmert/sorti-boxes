var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
    var distPathSave = path.resolve('./dist/');
    var distPathLoad = 'dist/';

    console.log('Running with NODE_ENV: ' + process.env.NODE_ENV);

    return {
        cache:   false,
        devtool: 'source-map',
        module:  {
            loaders: [
                {
                    test:   /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test:   /\.pcss$/,
                    loader: (process.env.NODE_ENV == 'test' ?
                        ['style-loader', 'css-loader', 'postcss-loader?config=./']
                        : ExtractTextPlugin.extract({
                        loader: ['css-loader?sourceMap', 'postcss-loader?sourceMap&config=./']
                    }))
                },
                {
                    test:   /\.css$/,
                    loader: ['style-loader', 'css-loader']
                },
                {
                    test:    /\.js$/,
                    exclude: /node_modules/,
                    loader:  'babel-loader',
                    query:   {
                        presets: [require('babel-preset-es2015')],
                        plugins: (process.env.NODE_ENV == 'test' ? ['istanbul'] : [])
                    }
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve('./node_modules/')
            ]
        },
        entry:   {
            'sorti-boxes': [
                './source/js/sorti-boxes.js'
            ]
        },
        plugins: (process.env.NODE_ENV == 'test' ?
            [] :
            [new ExtractTextPlugin({
                filename:  'themes/default.css', // css are saved in: [path + plugins.ExtractTextPlugin.filename]
                allChunks: false
            }),
            ]),
        output:  {
            path:          distPathSave, // JS/chunk is saved in: [path + filename/chunkFilename]
            publicPath:    distPathLoad, // chunk is loaded from: [publicPath + chunkFilename]
            filename:      'js/[name].js',
            chunkFilename: 'js/[name].[chunkhash].js' // System.import doesn't support named chunks
        }
    }
};