Vue.component('upload', {
    props: {
        url: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '0'
        },
        height: {
            type: String,
            default: '0'
        }
    },
    data: function() {
        return {
            src: '', //图片地址
            standardWidth: 0, //标准宽度,px
            standardHeight: 0, //标准高度,px
            isOver: false, //图片是否加载完成
            flexStart: false //顶部对其
        };
    },
    mounted() {
        let el = this.$refs.imgWrap
        this.standardWidth = el.offsetWidth
        this.standardHeight = el.offsetHeight
        this.Reset(this.url)
    },
    methods: {
        /*
         * 将css单位转数字
         * @method Calculation
         * @param {String} 待转换的单位
         * @return {Number} 转换好的数字
         */
        Calculation(str) {
            //以rem单位
            if (str.match(/rem$/)) {
                return (window.innerWidth / 750) * 100 * parseFloat(str)
                //以px为单位
            } else if (str.match(/px$/) || !str.match(/\D/g)) {
                return parseFloat(str)
                //以vw为单位
            } else if (str.match(/vw$/)) {
                return (window.innerWidth / 100) * parseFloat(str)
                //以vh为单位
            } else if (str.match(/vh$/)) {
                return (window.innerHeight / 100) * parseFloat(str)
            } else if (/^calc\(.+\)$/.test(str)) {
                return str
            }
        },
        /*
         * 计算图片的宽高
         * @method Reset
         * @return {undefined}
         */
        Reset(newVal) {
            let img = new Image()
            img.src = newVal
            this.src = newVal
            img.onload = function() {
                this.src = newVal
                this.isOver = true
                let ImgInfo = {
                    width: img.width,
                    height: img.height
                }
                //图片宽高均比容器小
                if (
                    ImgInfo.width <= this.standardWidth &&
                    ImgInfo.height <= this.standardHeight
                )
                    return

                if (ImgInfo.width > ImgInfo.height) {
                    //高度小于容器高度,宽度大于容器宽度时,以宽度为准
                    if (ImgInfo.height <= this.standardHeight) {
                        this.$refs.img.style.width = this.standardWidth + 'px'
                        this.$refs.img.style.height =
                            this.standardWidth *
                                (ImgInfo.height / ImgInfo.width) +
                            'px'
                    } else {
                        this.$refs.img.style.height = this.standardHeight + 'px'
                        this.$refs.img.style.width =
                            this.standardHeight *
                                (ImgInfo.width / ImgInfo.height) +
                            'px'
                    }
                } else {
                    //宽度小于容器宽度,高度大于容器宽度时,以高度为准
                    if (ImgInfo.width <= this.standardWidth) {
                        this.$refs.img.style.height = this.standardHeight + 'px'
                        this.$refs.img.style.width =
                            this.standardHeight *
                                (ImgInfo.width / ImgInfo.height) +
                            'px'
                    } else {
                        this.$refs.img.style.width = this.standardWidth + 'px'
                        this.$refs.img.style.height =
                            this.standardWidth *
                                (ImgInfo.height / ImgInfo.width) +
                            'px'
                        //顶部对其
                        this.flexStart = true
                    }
                }
            }.bind(this)
        }
    },
    watch: {
        url(newVal) {
            let img = new Image()
            img.src = newVal
            this.src = newVal
            img.onload = function(){
                this.src = newVal
                this.isOver = true
                let ImgInfo = {
                    width: img.width,
                    height: img.height
                }
                //图片宽高均比容器小
                if (
                    ImgInfo.width <= this.standardWidth &&
                    ImgInfo.height <= this.standardHeight
                )
                    return

                if (ImgInfo.width > ImgInfo.height) {
                    //高度小于容器高度,宽度大于容器宽度时,以宽度为准
                    if (ImgInfo.height <= this.standardHeight) {
                        this.$refs.img.style.width = this.standardWidth + 'px'
                        this.$refs.img.style.height =
                            this.standardWidth *
                                (ImgInfo.height / ImgInfo.width) +
                            'px'
                    } else {
                        this.$refs.img.style.height = this.standardHeight + 'px'
                        this.$refs.img.style.width =
                            this.standardHeight *
                                (ImgInfo.width / ImgInfo.height) +
                            'px'
                    }
                } else {
                    //宽度小于容器宽度,高度大于容器宽度时,以高度为准
                    if (ImgInfo.width <= this.standardWidth) {
                        this.$refs.img.style.height = this.standardHeight + 'px'
                        this.$refs.img.style.width =
                            this.standardHeight *
                                (ImgInfo.width / ImgInfo.height) +
                            'px'
                    } else {
                        this.$refs.img.style.width = this.standardWidth + 'px'
                        this.$refs.img.style.height =
                            this.standardWidth *
                                (ImgInfo.height / ImgInfo.width) +
                            'px'
                        //顶部对其
                        this.flexStart = true
                    }
                }
            }.bind(this)
        },
        width(newVal) {
            this.standardWidth = this.Calculation(newVal)
        },
        height(newVal) {
            this.standardHeight = this.Calculation(newVal)
        }
    },
    template: 
        '<div\
            class="imgWrap"\
            :class="{ over: isOver, flexStart: flexStart }"\
            :style="{ width: width, height: height }"\
            ref="imgWrap"\
        >\
            <img :src="src" alt="" ref="img" />\
        </div>'
});
