/**
 * Core Webpack Config
 */
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const scssSyntax = require('postcss-scss');
const stylelintFormatter = require('stylelint-formatter-pretty');

const IS_PROD = (process.env.NODE_ENV === 'production');
const NODE_MODULES = path.resolve(__dirname, '../node_modules');
const UTIL_PATH = path.resolve(__dirname, '../util');

const coreConfig = {
    /**
     * Setup
     */
    name: 'base',
    mode: IS_PROD ? 'production' : 'development',
    stats: { children: false },

    /**
     * Loaders
     */
    module: {
        rules: [

            // ESLint Loader
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        useEslintrc: false,
                        configFile: path.resolve(__dirname, '../.eslintrc'),
                        formatter: require('eslint-formatter-pretty')
                    }
                }
            },
            // JS Loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    useBuiltIns: 'usage',
                                    corejs: 3
                                }]
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    },
                    { loader: 'webpack-import-glob-loader'}
                ],
            },
            // SCSS Loader
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', options: {
                            importLoaders: 2,
                            sourceMap: IS_PROD ? false : true,
                        }
                    },
                    {
                        loader: 'postcss-loader', options: {
                            ident: 'postcss',
                            sourceMap: IS_PROD ? false : true,
                            plugins: () => {
                                const plugins = [];

                                plugins.push(
                                    postcssPresetEnv({
                                        stage: 0,
                                        autoprefixer: { grid: 'autoplace' }
                                    }),
                                );

                                if (IS_PROD) {
                                    plugins.push(require('cssnano')({
                                        preset: ['default', {
                                            discardComments: {
                                                removeAll: true,
                                            },
                                        }]
                                    }));
                                }

                                return plugins;
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: IS_PROD ? false : true,
                        }
                    },
                    {
                        loader: 'postcss-loader', options: {
                            ident: 'postcsspre',
                            syntax: scssSyntax,
                            plugins: () => {
                                const plugins = [];

                                if (!IS_PROD) {
                                    plugins.push(
                                        require('stylelint')({
                                            configFile: path.resolve(__dirname, '../.stylelintrc'),
                                            failOnError: true,
                                            quiet: false,
                                            formatter: stylelintFormatter
                                        })
                                    )
                                }

                                plugins.push(
                                    require("postcss-reporter")({
                                        clearReportedMessages: true
                                    })
                                )

                                return plugins;
                            }
                        }
                    },
                    { loader: 'webpack-import-glob-loader'}
                ]
            },

        ],
    },

    /**
     * Resolves
     */
    resolve: {
        symlinks: false,//Remove if using symlinks
        extensions: ['.js', '.scss', '.json'],
        modules: [
            NODE_MODULES,
            UTIL_PATH
        ],
        alias: {
            "style-utils": path.resolve(UTIL_PATH, 'scss/utils.scss')
        }
    },

    /**
     * Plugins
     */
    plugins: [
        new MiniCssExtractPlugin({ filename: 'default.bundle.css' }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3003,
            proxy: "localhost:3003",
            // server: {
            //     baseDir: ['../public'],
            //     directory: true
            // },
            open: false
          })
    ],

    /**
     * Watch
     */
    watchOptions: {
        ignored: [
            /node_modules/,
            '**/*.bundle.css',
            '**/*.bundle.js',
            '**/*.html',
        ],
    },

    /**
     * Optimizations
     */
    optimization: {

        // Ensure CSS is compiled as a single file
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }

    },
};

/**
 * Environment-specific
 */
if (IS_PROD) {
    /* PRODUCTION */

    // Source Maps
    coreConfig.devtool = 'source-map';

    // Minification
    // - minification in AEM must be turned off or JS will break (when double-minified)
    coreConfig.optimization.minimizer = [];
    coreConfig.optimization.minimizer.push(new TerserPlugin({sourceMap: true,}));
} else {
    /* DEVELOPMENT */

    // Source Maps
    coreConfig.devtool = 'inline-source-map';
}

module.exports = coreConfig;
