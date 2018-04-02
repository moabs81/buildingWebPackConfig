const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv-webpack');
const myConfig = require('./myConfig');

const dotenvConfig = require('dotenv').config({ path: myConfig.buildPath('config/.env') }); //import dotenv config for use in Webpack config

module.exports = env => {
    console.log(env);
    let webpackConfig = {
        entry: {
            app: myConfig.buildPath('src/index.js')
        },
        output: {
            filename: '[name]-[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.(jpg|jpeg|png|svg)$/,
                            exclude: /node_modules/,
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 8092,
                                name: '[name]-[hash:6].[ext]'
                            }
                        },
                        {
                            test: /\.(js$)/,
                            exclude: /node_modules/,
                            loader: require.resolve('babel-loader')
                        },
                        {
                            test: /\.(scss$)/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: require.resolve('style-loader')
                                }, {
                                    loader: require.resolve('css-loader')
                                }, {
                                    loader: require.resolve('sass-loader')
                                }
                            ]
                        },
                        {
                            exclude: [/node_modules/, /\.js$/, /\.jsx$/, /\.html$/, /\.json$/],
                            loader: require.resolve('file-loader'),
                            options: {
                                name: 'media/[hash:16].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new htmlWebpackPlugin(),
            new dotenv({
                path: myConfig.buildPath('config/.env')
            }),
            new webpack.DefinePlugin({
                'process.env': dotenvConfig.parsed
            })
        ]
    };

    if (env) {
        if (env.LOCAL === 'true') {
            webpackConfig.devtool = 'cheap-eval-source-map';
            webpackConfig.output = {
                filename: '[name].js',
                path: myConfig.buildPath('local')
            }
            webpackConfig.devServer = {
                //useLocalIp: true,
                clientLogLevel: 'warning',
                //disableHostCheck: true,
                inline: true,
                port: 4000
            };
        };
        if (env.STAGING === 'true') {
            webpackConfig.output.path = myConfig.buildPath('dist');
            //webpackConfig.output.publicPath = process.env.StagingURL;
            webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }));
        };
    };
    return webpackConfig;
};