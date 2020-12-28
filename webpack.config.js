const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    resolve: {
        extensions: [".ts", ".js", ".tsx"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: { loader: 'ts-loader', options: { transpileOnly: true } },
            },
            {
                test: /.css$/, use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader', options: { sourceMap: true, esModule: false } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/@ionic/core/dist/ionic/svg', to: './svg' }]
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./assets/favicon.ico"
        }),
        new WebpackPwaManifest({
            name: 'Lawy',
            short_name: 'Lawy',
            description: 'Lawy. App for Weight-Statistics.',
            background_color: '#ffffff',
            icons: [
              {
                src: path.resolve('./assets/android-chrome-144x144.png'),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                purpose: "any maskable"
              },
            ],
            ios: {
                "apple-touch-icon": path.resolve('./assets/apple-touch-icon.png'),
            },
            theme_color: '#ffffff'
          }),
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../lawy-server/public"),
    },
    devServer: {
        historyApiFallback: {
            index: "/",
        },
    }
};
