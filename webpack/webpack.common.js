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
            patterns: [
                { 
                    from: ".", 
                    to: "../", 
                    context: "public",
                    globOptions: {
                        ignore: ["**/manifest.json"]
                    }
                }
            ],
            options: {},
        }),
        new CopyPlugin({
            patterns: [{
                from: "src/_locales",
                to: "../_locales",
                noErrorOnMissing: true
            }],
        }),
        // Browser-specific manifest processing
        new CopyPlugin({
            patterns: [{
                from: "public/manifest.json",
                to: "../manifest.json",
                transform(content) {
                    const targetBrowser = process.env.TARGET_BROWSER || 'chrome';
                    const manifest = JSON.parse(content.toString());
                    
                    // Process browser-specific fields
                    const processedManifest = {};
                    
                    for (const [key, value] of Object.entries(manifest)) {
                        if (key.startsWith(`__${targetBrowser}__`)) {
                            // Remove prefix and add to manifest
                            const realKey = key.replace(`__${targetBrowser}__`, '');
                            processedManifest[realKey] = value;
                        } else if (!key.startsWith('__chrome__') && !key.startsWith('__firefox__')) {
                            // Add non-prefixed fields
                            processedManifest[key] = value;
                        }
                    }
                    
                    return JSON.stringify(processedManifest, null, 2);
                }
            }],
        }),
        new Dotenv({ }),
        new webpack.DefinePlugin({
            'process.env.TARGET_BROWSER': JSON.stringify(process.env.TARGET_BROWSER || 'chrome'),
        }),
    ],
};