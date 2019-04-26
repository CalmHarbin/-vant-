/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import config from '@/config/index'
import axios from '@/api/index'

//微信sdk
const wxSDK = (urlPath = wxSdjUrl) =>
    new Promise((resolve, reject) => {
        axios
            .post(config.serverUrl + '/App/App_WXCommon/GetWXConfig', {
                urlPath: urlPath
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })

// 微信图片上传
const downloadImage = (serverId = []) =>
    new Promise((resolve, reject) => {
        axios
            .post(
                config.serverUrl + '/App/App_WXCommon/UpLoadImg',
                {
                    serverId: serverId
                },
                60000
            )
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
// prettier-ignore
export {
    wxSDK,
    downloadImage,
}
