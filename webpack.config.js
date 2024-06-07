const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const webpack = require('webpack')
const fs = require('fs');

class InlineCssPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineCssPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'InlineCssPlugin',
                (data, cb) => {
                    const cssFiles = ['dist/styles.css'];
                    let cssContent = '';
                    cssFiles.forEach(file => {
                        cssContent += fs.readFileSync(path.resolve(__dirname, file), 'utf8');
                    });
                    data.html = data.html.replace('</head>', `<style>${cssContent}</style></head>`);
                    //delete compilation.assets[cssFilename];
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: ['./dist/main.js', './dist/polyfills.js', './dist/runtime.js'], // The entry point for your UI code
        code: './plugin/code.ts', // The entry point for your plugin code,
    },

    module: {
        rules: [
            // Converts TypeScript code to JavaScript
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                options: {
                    configFile: 'tsconfig.plugin.json'
                },
                exclude: /node_modules/
            },
            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, "css-loader"],
            },
        ]
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {extensions: ['.ts', '.js']},

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
        new webpack.DefinePlugin({
            'global': {} // Fix missing symbol error when running in developer VM
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            inject: "body",
            template: './dist/index.html',
            filename: 'ui.html',
            chunks: ['ui']
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
        new InlineCssPlugin()
    ],
    watchOptions: {
        ignored: ['src/**/*.js', '**/node_modules']
    }
})
