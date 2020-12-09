module.exports={
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.100.5.131:8085',   //后端提供的接口
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
