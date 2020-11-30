module.exports={
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.152.20.153:8888',
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
