import axios from 'axios';

export function getAxios(method, url, params, headers) {
    return new Promise((resolve, reject) => {
        if (typeof params !== 'object') params = {};
        let _option = params;
        // _option = {
        //     method,
        //     url,
        //     // baseURL: '/api',
        //     timeout: 30000,
        //     params: null,
        //     data: null,
        //     headers: null,
        //     ...params,
        // }
        _option = {
            method: method.toUpperCase(),
            url,
            // baseURL: '/api',
            timeout: 30000,
            params: null,
            data: null,
            headers: headers,
            ...params,
        }
        axios.request(_option).then(res => {
            resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
        }, error => {
            if (error.response) {
                reject(error.response.data)
            } else {
                reject(error)
            }
        })
    })
}



