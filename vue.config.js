module.exports={
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.43.225:8085',   //后端提供的接口
                changeOrigin: true,
                ws:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack:{
        resolve:{
            alias:{
                'assets':"@/assets",
                'components':'@/components',
                'views':"@/views"
            }
        }
    }
}
