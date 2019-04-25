<!-- 
    上传附件,office办公软件等
    files: 初始图片链接,数组格式,无初始图片可不需要传, type取值说明   
            0 其他文件 
            1 图片
            2 Excel
            3 world
            4 pdf
            5 ppt
            6 txt
    maxNum: 总共最大上传数量,可选,默认无限上传
    isSee: 是不是查看状态,默认false
    
    事件
    change:当上传图片改变时触发,参数:files Array 当前所有图片的地址

 -->

<template>
    <div class="imgWrap">
        <div class="imgs" ref="standard">
            <div
                style="display: flex;width: 100%;flex-wrap: wrap;padding: 10px 0;"
                v-if="hackReset"
            >
                <div
                    class="img"
                    v-for="(item, index) in files"
                    ref="imgBox"
                    @click.stop="see(index)"
                    :key="index"
                >
                    <img src="./default.png" alt="" v-if="item.type === 0" />
                    <img
                        :src="'http://wechat.dfd.cn:8084' + item.src"
                        alt=""
                        v-if="item.type === 1"
                    />
                    <img src="./xls.png" alt="" v-if="item.type === 2" />
                    <img src="./doc.png" alt="" v-if="item.type === 3" />
                    <img src="./pdf.png" alt="" v-if="item.type === 4" />
                    <img src="./ppt.png" alt="" v-if="item.type === 5" />
                    <img src="./txt.jpg" alt="" v-if="item.type === 6" />
                    <p class="ellipsis" style="width: 90%;text-align: center;">
                        {{ item.name }}
                    </p>
                    <div
                        @click.stop="removeImg($event, index)"
                        class="remove"
                        v-if="!isSee"
                    >
                        <van-icon name="clear" />
                    </div>
                </div>
                <div class="add" id="add_img" v-show="!isGtNum" v-if="!isSee">
                    <img src="./jia-1.png" alt="" />
                    <span>添加</span>
                </div>
            </div>
        </div>
        <div class="yd-dialog-white-mask" v-if="percent != 0">
            <div class="yd-loading">
                <div class="yd-loading-icon"></div>
                <div class="yd-loading-txt">上传中({{ percent }}%)</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import config from '@/config/index'
import { wxSDK } from '@/api/api'

export default {
    name: 'upload',
    props: {
        files: {
            type: Array,
            default: function() {
                return []
            }
        },
        maxNum: {
            type: Number,
            default: 0 //0代表不限制个数
        },
        isSee: {
            type: Boolean,
            default: false //默认是上传
        }
    },
    data() {
        return {
            uploader: null, //上传对象
            isGtNum: false, //是否大于最大上传数量
            hackReset: true, //强制更新
            percent: 0, //上传进度
            config: config
        }
    },
    created() {
        this.wxSDK()
    },
    mounted() {
        if (typeof plupload === 'undefined') {
            let script = document.createElement('script')
            script.src = config.staticUrl + '/js/plupload.full.min.js'
            document.body.appendChild(script)
            script.onload = () => {
                if (!this.isSee) {
                    this.upload()
                }
            }
        } else {
            if (!this.isSee) {
                this.upload()
            }
        }
    },
    methods: {
        /**
         * 删除图片
         * @method removeImg
         * @param {object} event    事件对象
         * @param {number} index    当前图片索引
         * @returns {undefined}
         */
        removeImg(event, index) {
            this.files.splice(index, 1)
            //销毁上传对象
            this.uploader.destroy()
            //更新上传对象
            this.$nextTick(() => {
                //更新上传对象
                setTimeout(() => {
                    this.upload()
                }, 200)
            })
        },
        /**
         * 上传图片实例化
         * @method upload
         * @returns {undefined}
         */
        upload() {
            let that = this
            //图片上传
            this.uploader = new plupload.Uploader({
                //创建实例的构造方法
                browse_button: 'add_img', // 上传按钮
                // url: 'http://qy.sunjee.cn:8022'+"/App/App_WXCommon/Uploadfj", //远程上传地址
                url: 'http://wechat.dfd.cn:8084/App/App_WXCommon/Uploadfj', //远程上传地址
                filters: {
                    max_file_size: '20mb', //最大上传文件大小（格式100b, 10kb, 10mb, 1gb）
                    mime_types: [
                        //允许文件上传类型
                        // {title: "Image files", extensions: "jpg,jpeg,png,gif"},
                        // {title: "office", extensions: 'doc,ppt,xls'},
                        // {title: "other", extensions: 'txt,pdf'}
                    ]
                },
                multi_selection: false, //true:ctrl多文件上传, false 单文件上传
                init: {
                    // eslint-disable-next-line no-unused-vars
                    FilesAdded: function(up, files) {
                        //文件上传前
                        // console.log(files[0].getNative());
                        that.percent = 0
                        that.uploader.start()
                    },
                    FileUploaded: function(up, file, res) {
                        //文件上传成功的时候触发
                        res = JSON.parse(res.response)
                        that.percent = 0
                        if (res.flag) {
                            //更改数据
                            that.files.push({
                                type: res.data.FileType * 1,
                                src: res.data.FilePath,
                                name: res.data.FileName,
                                size: res.data.FileLength
                            })
                            //销毁上传对象
                            that.uploader.destroy()
                            that.$nextTick(() => {
                                //更新上传对象
                                setTimeout(() => {
                                    that.upload()
                                }, 200)
                            })
                        } else {
                            that.$dialog.toast({
                                mes: '上传失败,服务器错误',
                                timeout: 1500,
                                icon: 'error'
                            })
                        }
                    },
                    Error: function(up, err) {
                        //上传出错的时候触发
                        //上传动画结束
                        that.$dialog.loading.close()
                        if (err.code === -601) {
                            that.$dialog.toast({
                                mes: '文件类型错误',
                                timeout: 1500,
                                icon: 'error'
                            })
                        } else {
                            that.$dialog.toast({
                                mes: '上传失败,请重新上传',
                                timeout: 1500,
                                icon: 'error'
                            })
                        }
                        console.log(err)
                    }
                }
            })
            this.uploader.init()
            this.uploader.bind('UploadProgress', (up, file) => {
                that.percent = file.percent
            })
        },
        /**
         * 点击查看附件
         * @method upload
         * @returns {undefined}
         */
        see(index) {
            let that = this
            wx.checkJsApi({
                jsApiList: ['previewFile'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    if (res.checkResult.previewFile) {
                        wx.previewFile({
                            url: config.serverUrl + that.files[index].src, // 需要预览文件的地址(必填，可以使用相对路径)
                            size: that.files[index].size * 1 // 需要预览文件的字节大小(必填)
                        })
                    } else {
                        location.href = that.files[index].src
                    }
                }
            })
        },
        /**
         * 微信sdk
         * @method upload
         * @returns {undefined}
         */
        wxSDK() {
            wxSDK()
                .then(res => {
                    if (!res.iserror) {
                        let json = res.data
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: json.CorpID, // 必填，企业号的唯一标识，此处填写企业号corpid
                            timestamp: json.timestamp, // 必填，生成签名的时间戳
                            nonceStr: json.nonce_str, // 必填，生成签名的随机串
                            signature: json.signature, // 必填，签名，见附录1
                            jsApiList: [
                                'chooseImage',
                                'uploadImage',
                                'previewFile',
                                'previewImage'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        })
                    } else {
                        console.log(res.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    watch: {
        /**
         * 文件改变时触发change事件,并且限制数量
         * @method files
         * @returns {undefined}
         */
        files(newVal) {
            //强制更新
            this.hackReset = false
            this.$nextTick(() => {
                this.hackReset = true
            })

            this.$emit('change', this.files)

            if (this.maxNum === 0) return
            //控制最大数量
            if (newVal.length >= this.maxNum) {
                this.isGtNum = true
            } else {
                this.isGtNum = false
            }
        }
    }
}
</script>

<style scoped>
.imgWrap {
    padding: 0 0.24rem;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
.imgWrap .add {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #eee;
    width: 24%;
    height: 1.68rem;
}
.imgWrap .add img {
    width: 30px;
    margin-bottom: 2%;
}
.img {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 23.3%;
    overflow: hidden;
    margin-right: 2%;
    margin-bottom: 2%;
    height: 1.68rem;
    border: 1px solid #ddd;
}
.img img {
    width: 0.54rem;
    height: 0.54rem;
    background-color: #eee;
}
.img .remove {
    position: absolute;
    right: 0px;
    top: 0px;
}
.img .remove i {
    font-size: 0.4rem !important;
}
.img:nth-child(4n) {
    margin-right: 0;
}
.imgs {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

/* ydUI样式 */
@-webkit-keyframes yd-kf-zoom-in {
    0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
        opacity: 1;
    }
}
@keyframes yd-kf-zoom-in {
    0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
        opacity: 1;
    }
}
@-webkit-keyframes yd-kf-rotate {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
}
@keyframes yd-kf-rotate {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
}
.yd-dialog-white-mask {
    position: fixed;
    z-index: 2000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: transparent;
}
.yd-loading {
    border-radius: 3px;
    color: #fff;
    background-color: rgba(40, 40, 40, 0.85);
    -webkit-animation: yd-kf-zoom-in 0.1s ease forwards;
    animation: yd-kf-zoom-in 0.1s ease forwards;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 23px 0 24px;
    height: 48px;
}
.yd-loading-icon {
    width: 28px;
    height: 28px;
    background: url('data:image/png;base64,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')
        no-repeat;
    background-size: 28px 28px;
    -webkit-animation: yd-kf-rotate 0.45s linear forwards infinite;
    animation: yd-kf-rotate 0.45s linear forwards infinite;
    margin-right: 10px;
}
.yd-loading-txt {
    font-size: 15px;
    color: #fff;
    max-width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
