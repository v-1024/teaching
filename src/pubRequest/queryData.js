import {request} from "../network/request";

export function queryData(url , data) {
    return request({
        url: url,
        method: 'post' ,
        params: data
    })
}