const merge = require("webpack-merge")
const common = require('./webpack.common.js')
const CnameWebpackPlugin = require('cname-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CnameWebpackPlugin({
      domain: 'michaelfarnik.js.org',
    }),
  ],
})