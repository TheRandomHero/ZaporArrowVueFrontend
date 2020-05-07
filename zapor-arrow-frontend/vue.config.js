const webpack = require('webpack');


module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            plugins:[
                new webpack.DefinePlugin({
                    'process.env': {
                      VUE_APP_ROOT_API: JSON.stringify(process.env.VUE_APP_ROOT_API)
                    }
            })
            ]
        }
        else 
        {
            devServer:{
                host: 'localhost'
            }
        }
      }
};