import {request} from "../network/request";

export function fileDownLoad(data) {
    return request({
        url: 'file/down' ,
        method: 'post' ,
        params: data
    })
}