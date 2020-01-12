<template>
    <div class="DatetimePicker">
        <!-- 弹出层 -->
        <van-popup
            v-model="show"
            position="bottom"
            :lazy-render="false"
            get-container="#app"
            @close="$emit('input', false)"
            @open="open"
        >
            <van-datetime-picker
                v-model="currentDate"
                ref="datetime"
                :type="type"
                :title="title"
                :min-date="minDate"
                :max-date="maxDate"
                :min-hour="minHour"
                :max-hour="maxHour"
                :min-minute="minMinute"
                :max-minute="maxMinute"
                :formatter="formatter"
                @confirm="onConfirm"
                @cancel="$emit('input', false)"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'DatetimePicker',
    props: {
        value: {
            type: Boolean
        },
        title: {
            type: String,
            default: '选择时间'
        },
        type: {
            type: String,
            default: 'datetime'
        },
        time: {
            type: String,
            default: '' //选中时间
        },
        minDate: {
            type: Date,
            default: () => new Date('2010/01/01 00:00')
        },
        maxDate: {
            type: Date,
            default: () => new Date('2036/12/31 23:59')
        },
        minHour: {
            type: Number,
            default: 0 //最小小时, 只针对type=time有效
        },
        maxHour: {
            type: Number,
            default: 23 //最大小时, 只针对type=time有效
        },
        minMinute: {
            type: Number,
            default: 0 //最小分钟, 只针对type=time有效
        },
        maxMinute: {
            type: Number,
            default: 59 //最大分钟, 只针对type=time有效
        }
    },
    data() {
        return {
            show: false,
            formatter_time: null,
            currentDate: new Date()
        }
    },
    created() {
        this.show = this.value
        this.formatter_time = this.time.replace(/-/g, '/') //防止格式不统一  2019-12-12  和 2019/12/12
        if (this.time === '') {
            if (this.type === 'time') {
                this.currentDate = this.GetDateTime(new Date(), 'h:i') //默认当前时间
            } else {
                this.currentDate = new Date() //默认当前时间
            }
        } else {
            if (this.type === 'time') {
                this.currentDate = this.time //将时间转一下格式
            } else {
                this.currentDate = new Date(this.time.replace(/-/g, '/')) //将时间转一下格式
            }
        }
    },
    methods: {
        /**
         * 确定
         * @method onConfirm
         * @param { Date } value 选中的时间
         * @return { String } 格式化后的结果
         */
        onConfirm(value) {
            //返回格式化的时间
            if (this.type === 'datetime') {
                this.$emit('confirm', this.GetDateTime(value, 'Y-m-d h:i'))
            } else if (this.type === 'date') {
                this.$emit('confirm', this.GetDateTime(value, 'Y-m-d'))
            } else if (this.type === 'year-month') {
                this.$emit('confirm', this.GetDateTime(value, 'Y-m'))
            } else if (this.type === 'time') {
                this.$emit('confirm', value)
            }
            //关闭弹出层
            this.$emit('input', false)
        },
        /**
         * vant时间格式化
         * @method formatter
         * @return { undefined }
         */
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day') {
                return `${value}日`
            } else if (type === 'hour') {
                return `${value}时`
            } else if (type === 'minute') {
                return `${value}分`
            }
            return value
        },
        /**
         * 格式化时间
         * @method GetDateTime
         * @param { Date } 时间对象
         * @param { String } 格式化格式   例如 'Y-m-d h:i:s'
         * @return { String } 格式化后的结果
         */
        GetDateTime(dateObj, format) {
            if (dateObj) {
                if (typeof dateObj === 'string') {
                    let tempIndex = dateObj.lastIndexOf('.')
                    if (tempIndex > -1) {
                        dateObj = dateObj.substring(0, tempIndex)
                    }

                    dateObj = dateObj.replace('T', ' ').replace(/-/g, '/')
                }
                let date = new Date(dateObj)

                let obj = {
                    y: date.getFullYear(),
                    m: date.getMonth() + 1,
                    d: date.getDate(),
                    h: date.getHours(),
                    min: date.getMinutes(),
                    s: date.getSeconds()
                }
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let element = obj[key]
                        obj[key] = element < 10 ? '0' + element : element
                    }
                }
                if (format) {
                    return format
                        .replace('Y', obj.y)
                        .replace('m', obj.m)
                        .replace('d', obj.d)
                        .replace('h', obj.h)
                        .replace('i', obj.min)
                        .replace('s', obj.s)
                }

                return (
                    obj.y +
                    '-' +
                    obj.m +
                    '-' +
                    obj.d +
                    ' ' +
                    obj.h +
                    ':' +
                    obj.min +
                    ':' +
                    obj.s
                ) //返回时间格式
            } else return ''
        },
        /**
         * 显示时默认到当前选中时间
         * @method open
         * @return { undefined }
         */
        open() {
<<<<<<< Updated upstream
            if (this.$refs.datetime) {
                let values = []
                if (this.type === 'datetime') {
                    // "2019-12-11 22:12"
                    values = [
                        `${this.formatter_time.split(' ')[0].split('/')[0]}年`,
                        `${this.formatter_time.split(' ')[0].split('/')[1]}月`,
                        `${this.formatter_time.split(' ')[0].split('/')[2]}日`,
                        `${this.formatter_time.split(' ')[1].split(':')[0]}时`,
                        `${this.formatter_time.split(' ')[1].split(':')[1]}分`
                    ]
                } else if (this.type === 'date') {
                    // "2019-12-11"
                    values = [
                        `${this.formatter_time.split('/')[0]}年`,
                        `${this.formatter_time.split('/')[1]}月`,
                        `${this.formatter_time.split('/')[2]}日`
                    ]
                } else if (this.type === 'year-month') {
                    // "2019-12"
                    values = [
                        `${this.formatter_time.split('/')[0]}年`,
                        `${this.formatter_time.split('/')[1]}月`
                    ]
                } else if (this.type === 'time') {
                    values = [
                        `${this.formatter_time.split(':')[0]}时`,
                        `${this.formatter_time.split(':')[1]}分`
                    ]
                }
                this.$refs.datetime.$children[0].$children[0].setValues(values)
=======
            let values = []
            if (this.type === 'datetime') {
                // "2019-12-11 22:12"
                values = [
                    `${this.formatter_time.split(' ')[0].split('/')[0]}年`,
                    `${this.formatter_time.split(' ')[0].split('/')[1]}月`,
                    `${this.formatter_time.split(' ')[0].split('/')[2]}日`,
                    `${this.formatter_time.split(' ')[1].split(':')[0]}时`,
                    `${this.formatter_time.split(' ')[1].split(':')[1]}分`
                ]
            } else if (this.type === 'date') {
                // "2019-12-11"
                values = [
                    `${this.formatter_time.split('/')[0]}年`,
                    `${this.formatter_time.split('/')[1]}月`,
                    `${this.formatter_time.split('/')[2]}日`
                ]
            } else if (this.type === 'year-month') {
                // "2019-12"
                values = [
                    `${this.formatter_time.split('/')[0]}年`,
                    `${this.formatter_time.split('/')[1]}月`
                ]
            } else if (this.type === 'time') {
                values = [
                    `${this.formatter_time.split(':')[0]}时`,
                    `${this.formatter_time.split(':')[1]}分`
                ]
>>>>>>> Stashed changes
            }
            this.$refs.datetime.$children[0].$children[0].setValues(values)
        }
    },
    watch: {
        value(newVal) {
            this.show = newVal
        },
        time(newVal) {
            this.formatter_time = newVal.replace(/-/g, '/') //防止格式不统一  2019-12-12  和 2019/12/12
        }
    }
}
</script>
