<template>
    <div class="Feedback">
        <img src="./success.png" alt="" v-if="state === 'success'" />
        <img src="./error.png" alt="" v-else-if="state === 'error'" />
        <p>{{ text ? text : state === 'success' ? '提交成功' : '提交失败' }}</p>
        <button
            v-if="btn"
            @click="go"
            :class="
                state === 'success'
                    ? 'success'
                    : state === 'error'
                    ? 'error'
                    : ''
            "
        >
            {{ btnText }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Feedback',
    props: {
        state: {
            type: String,
            default: 'success' //取值  success   |   error
        },
        btn: {
            type: Boolean,
            default: false //是否显示按钮
        },
        link: {
            type: [String, Object, Boolean],
            default: true //跳转链接, 默认后退一页  ,请传入 vue路由支持的跳转形式
        },
        text: {
            type: [String, Boolean],
            default: false //自定义描述位置,  成功状态默认提交成功,  失败状态默认为提交失败
        },
        btnText: {
            type: String,
            default: '返回' //按钮文字自定义, 默认为返回
        }
    },
    data() {
        return {}
    },
    created() {},
    methods: {
        go() {
            if (this.link === true) {
                this.$router.go(-1) //默认后退一页
            } else {
                this.$router.push(this.link)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.Feedback {
    height: 100vh;
    background-color: #fff;
    padding-top: 36px;
    img {
        width: 93px;
        margin: auto;
        display: block;
    }
    p {
        margin-bottom: 5px;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        margin-top: 30px;
    }
    button {
        display: block;
        margin: 0 auto;
        width: calc(100vw - 30px);
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        color: #ffffff;
        border: none;
        margin-top: 30px;
        background-color: #1aad19;
    }
    button.success {
        background-color: #1aad19;
    }
    button.error {
        background-color: #f76260;
    }
}
</style>
