var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
    var distPathSave = path.resolve('./dist/');
    var distPathLoad = 'dist/';

    return {
        cache: false,
        module: {
            loaders: [
                {
                    test:   /\.pcss$/,
                    loader: ExtractTextPlugin.extract({
                        loader: ['css-loader?sourceMap', 'postcss-loader?sourceMap&config=./']
                    })
                },

                {
                    test:    /\.js$/,
                    exclude: /node_modules/,
                    loader:  'babel-loader',
                    query:   {
                        presets: [require('babel-preset-es2015')]
                    }
                },
            ]
        },

        resolve: {
            modules: [
                path.resolve('./node_modules/')
            ]
        },

        entry: {
            'sorti-boxes': [
                './source/js/sorti-boxes.js'
            ]
        },

        plugins: [
            new ExtractTextPlugin({
                filename:  'themes/default.css', // css are saved in: [path + plugins.ExtractTextPlugin.filename]
                allChunks: false
            })
        ],

        output: {
            path:          distPathSave, // JS/chunk is saved in: [path + filename/chunkFilename]
            publicPath:    distPathLoad, // chunk is loaded from: [publicPath + chunkFilename]
            filename:      'js/[name].js',
            chunkFilename: 'js/[name].[chunkhash].js' // System.import doesn't support named chunks
        },
    }
};