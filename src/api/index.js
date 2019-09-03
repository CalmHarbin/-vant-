/* eslint-disable no-undef */
'use strict'

// import axios from 'axios'
import qs from 'qs'

//请求拦截器
axios.interceptors.request.use(
    config => {
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (
            config.method.toLocaleLowerCase() === 'post' ||
            config.method.toLocaleLowerCase() === 'put' ||
            config.method.toLocaleLowerCase() === 'delete'
        ) {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截器
axios.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break

                case 401:
                    err.message = '未授权，请登录'
                    break

                case 403:
                    err.message = '拒绝访问'
                    break

                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`
                    break

                case 408:
                    err.message = '请求超时'
                    break

                case 500:
                    err.message = '服务器内部错误'
                    break

                case 501:
                    err.message = '服务未实现'
                    break

                case 502:
                    err.message = '网关错误'
                    break

                case 503:
                    err.message = '服务不可用'
                    break

                case 504:
                    err.message = '网关超时'
                    break

                case 505:
                    err.message = 'HTTP版本不受支持'
                    break

                default:
            }
        }
        //1.判断请求超时
        if (
            err.code === 'ECONNABORTED' &&
            err.message.indexOf('timeout') !== -1
        ) {
            // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
            err.message = '网络好像开小差了'
        }
        return Promise.reject(err)
    }
)

function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (
        response &&
        (response.status === 200 ||
            response.status === 304 ||
            response.status === 400)
    ) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

export default {
    post(url, data, timeout = 60000) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: data,
                timeout: timeout,
                headers: {
                    // 'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
                .then(res => {
                    checkStatus(res)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    get(url, params, timeout = 60000) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params, // get 请求时带的参数
                timeout: timeout
                // headers: {
                //   'X-Requested-With': 'XMLHttpRequest'
                // }
                // headers: {
                //     token: userId
                // }
            })
                .then(res => {
                    checkStatus(res)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
