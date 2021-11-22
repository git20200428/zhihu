const env = process.env.NODE_ENV;
module.exports ={
    lintOnSave: env !== 'production',
    publicPath: './',
    productionSourceMap: false,
    devServer:{
        proxy:{
            '/api':{
                target: 'http://127.0.0.1:7000',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}