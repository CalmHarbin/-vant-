<template>
    <div class="index">
        <Feedback></Feedback>

        <div class="box">
            <div>
                <div class="label">组件说明:</div>
                <ul>
                    <li>
                        state 取值 success 为成功状态, error 为失败状态
                    </li>
                    <li>
                        btn 取值 true 显示按钮 false不显示按钮
                    </li>
                    <li>
                        link 取值 vue路由支持的跳转形式 默认 返回上一页
                    </li>
                    <li>
                        text 描述文字 默认 提交成功 | 提交失败
                    </li>
                    <li>
                        btnText 按钮文字 默认 返回
                    </li>
                </ul>
                <div class="label">使用说明:</div>
                <p>此组件不依赖Vant的组件.源码地址<br />XXXXX</p>
            </div>
        </div>

        <Feedback state="error" :btn="true"></Feedback>
    </div>
</template>

<script>
import Feedback from './components/Feedback'
export default {
    data() {
        return {}
    },
    components: { Feedback }
}
</script>

<style lang="scss" scoped>
.box {
    padding: $padding;
}
.label {
    font-size: 24px;
    margin: 20px 0;
}
ul,
li {
    list-style: decimal-leading-zero;
}
li {
    font-size: 14px;
    margin-left: 20px;
    margin-bottom: 10px;
}
</style>
