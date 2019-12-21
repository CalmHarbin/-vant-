<!--
    上传图片组件,带缩略图
    files: 初始图片链接,数组格式,无初始图片可不需要传
    maxNum: 总共最大上传数量,可选,默认无限上传
    count: 每次最大上传数量,默认9
    isSee: 是不是查看状态,默认false

    事件
    change:当上传图片改变时触发,参数:files Array 当前所有图片的地址

 -->

<template>
    <div class="imgWrap">
        <div class="item" v-for="(item, index) in files" :key="index">
            <div
                class="square"
                :style="`backgroundImage:url(${item})`"
                @click="see(item)"
            ></div>
            <div
                @click.stop="removeImg($event, index)"
                class="remove"
                v-if="!isSee"
            >
                <van-icon name="clear" />
            </div>
        </div>
        <div class="item" @click="uploadBtn" v-if="!isSee">
            <div class="square">
                <div class="add">
                    <img src="./camera.png" alt="" />
                    <span>相片</span>
                </div>
            </div>
        </div>
        <div class="yd-dialog-white-mask" v-if="loading">
            <div class="yd-loading">
                <div class="yd-loading-icon"></div>
                <div class="yd-loading-txt">上传中</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { wxSDK, downloadImage } from '@/api/api'
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
        },
        count: {
            type: Number,
            default: 9 //最大一次上传数量
        }
    },
    data() {
        return {
            isGtNum: false, //是否大于最大上传数量
            hackReset: true, //强制更新
            counts: null, //每次最大上传数量
            serverIds: [], //服务器端id
            loading: false
        }
    },
    created() {
        if (this.maxNum === 0) return
        //控制最大数量
        if (this.files.length >= this.maxNum) {
            this.isGtNum = true
        } else {
            this.isGtNum = false
        }
    },
    updated() {},
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
        },
        /**
         * 调用微信sdk----东风项目
         * @method wxSDK
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
        },
        /**
         * 上传图片点击事件
         * @method uploadBtn
         * @returns {undefined}
         */
        uploadBtn() {
            if (this.isGtNum) return
            let that = this
            //控制最大上传数量
            if (this.maxNum === 0) {
                this.counts = 9
            } else {
                this.counts =
                    this.maxNum - this.files.length < this.count
                        ? this.maxNum - this.files.length
                        : this.count
            }
            this.serverIds = []
            // eslint-disable-next-line no-undef
            wx.chooseImage({
                count: that.counts, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    that.uploadImage(res.localIds)
                }
            })
        },
        /**
         * 微信上传图片
         * @method uploadImage
         * @method {Array} localIds 本地图片id列表
         * @returns {undefined}
         */
        uploadImage(localIds) {
            let that = this
            if (localIds.length === 0) {
                this.downloadImage()
            } else {
                wx.uploadImage({
                    localId: localIds.shift(), // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function(res) {
                        that.serverIds.push(res.serverId) // 返回图片的服务器端ID
                        that.uploadImage(localIds)
                    }
                })
            }
        },
        /**
         * 服务器从微信上下载图片
         * @method downloadImage
         * @returns {undefined}
         */
        downloadImage() {
            this.loading = true
            downloadImage(this.serverIds)
                .then(res => {
                    this.loading = false
                    for (let item of res.data) {
                        this.files.push(this.$config.serverUrl + item)
                    }
                    // this.files = [...this.files, ...res.data]
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.fail(err.message)
                })
        },
        /**
         * 图片预览
         * @method see
         * @returns {undefined}
         */
        see(url) {
            wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: this.files // 需要预览的图片http链接列表
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

<style lang="scss" scoped>
.imgWrap {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .add {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #f5f5f5;
        img {
            width: 30%;
            margin-bottom: 5px;
        }
    }
    .item {
        position: relative;
        flex: 0 0 23.5%;
        margin-right: 2%;
        margin-bottom: 2%;
        .square {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            background-size: cover;
            background-position: center;
        }
    }
    .item:nth-child(4n) {
        margin-right: 0;
    }
}
.remove {
    position: absolute;
    right: 0px;
    top: 0px;
    i {
        font-size: 0.4rem !important;
    }
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
