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
    </div>
</template>

<script>
/* eslint-disable no-undef */
import config from '@/config/index'
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
            config: config
        }
    },
    created() {},
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
         * 调用微信sdk
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
            this.counts =
                this.maxNum - this.files.length < this.count
                    ? this.maxNum - this.files.length
                    : this.count
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
            this.$dialog.loading.open('上传中')
            downloadImage(this.serverIds)
                .then(res => {
                    this.$dialog.loading.close()
                    this.files = [...this.files, ...res.data]
                })
                .catch(err => {
                    this.$dialog.loading.close()
                    this.$dialog.toast({
                        mes: err.message,
                        timeout: 1500,
                        icon: 'error'
                    })
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
</style>
