const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    resolve: {
      alias: {
        // example how to override Handsontable dependency version
        "moment": path.resolve(__dirname, 'node_modules/moment'),
        // workaround for `browser` field in Handsontable package.json
        "handsontable": path.resolve(__dirname, 'node_modules/handsontable/es'),
        "handsontable-pro": path.resolve(__dirname, 'node_modules/handsontable-pro/es'),
        "vue$": path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
      }
    }
  }
};
