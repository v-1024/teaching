import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({              //  create内返回的就是一个promise
        baseURL: '/api' ,
        timeout: 5000

    });

    return instance(config)          //instance返回一个Promise  相当于return Promise
}