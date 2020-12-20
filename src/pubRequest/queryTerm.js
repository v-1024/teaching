import {request} from "../network/request";

//所有学年
export function
queryTerm() {
    return request({
        url: 'PublicMethod/getallterm',
        method:'get'
    })
}

//最新学年
export function
queryTermLast() {
    return request({
        url: 'PublicMethod/getterm',
        method:'get'
    })
}