const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
      sidepanel: path.join(srcDir, 'Sidepanel.tsx'),
      options: path.join(srcDir, 'Options.tsx'),
      background: path.join(srcDir, 'background.ts'),
      content_script: path.join(srcDir, 'content_script.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
        clean: true,
    },
    // https://v4.webpack.js.org/plugins/split-chunks-plugin/
    optimization: {
        chunkIds: 'named',
        moduleIds: 'named',
        splitChunks: {
            cacheGroups: {
                default: false,
                defaultVendors: false,
            },
            chunks: "async",
        },
        /*
        splitChunks: {
name: 'vendor',

            cacheGroups: {
                vendor: {

                }
            },
            chunks(chunk) {
                return chunk.name !== 'background';
            },

             */
        },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader", // Takes the CSS files and returns the CSS with imports and url(...) for Webpack
                        options: {
                            sourceMap: process.env.NODE_ENV === "development",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "resolve-url-loader", // Rewrites relative paths in url() statements
                    "sass-loader", // Takes the Sass/SCSS file and compiles to the CSS
                ],
            },

        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
        new Dotenv({ }),
    ],
};
