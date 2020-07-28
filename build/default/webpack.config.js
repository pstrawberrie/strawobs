/* eslint-disable */
/**
 * Default Entry Config
 */
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('../webpack.config');

module.exports = merge(baseConfig, {

    /**
     * Entry
     */
    entry: {
        default: path.resolve(__dirname, 'entry-default.js'),
    },

    /**
     * Output
     */
    output: {
        filename: 'default.bundle.js',
        library: 'strawobs_default',
        path: path.resolve(__dirname, '../../dist'),
        pathinfo: false,
    },

});
