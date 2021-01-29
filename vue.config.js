module.exports={
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8085',   //后端提供的接口
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
