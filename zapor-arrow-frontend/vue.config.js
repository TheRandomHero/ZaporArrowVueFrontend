const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    devServer:{
        host: 'localhost'
    },
    configureWebpack: {
        plugins: [new BundleAnalyzerPlugin()]
    }

};