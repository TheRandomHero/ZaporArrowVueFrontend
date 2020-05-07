
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            process.env.VUE_APP_ROOT_API = 'https://zaporarrowapi.azurewebsites.net'
        } 
        else 
        {
            devServer:{
                host: 'localhost'
            }
        }
      }
};