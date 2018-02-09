const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bundleOutputDir = path.join(__dirname, '/wwwroot/dist');

const isProduction = process.env.NODE_ENV === 'production ';
const isDevBuild = !(isProduction);

module.exports = {
    resolve: { extensions: ['.js', '.jsx'] },
    entry: {
        'main-client': path.join(__dirname, './ClientApp/App.jsx')
    },
    output: {
        path: bundleOutputDir,
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: isDevBuild ? ['style-loader', 'css-loader?url=false'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize' }),
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
        ]
    },
    plugins: [
        
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
        ])
};