import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({              //  create内返回的就是一个promise
        baseURL: '/api' ,
        timeout: 5000
    });

    instance.interceptors.request.use(
        config => {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            let token = sessionStorage.getItem('Authorization');
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        error => {
            console.log('error');
            return Promise.reject(error);
        });

    return instance(config)          //instance返回一个Promise  相当于return Promise
}