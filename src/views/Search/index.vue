<template>
    <div class="index">
        <Search></Search>
        <div class="box">
            <div>
                <div class="label">组件说明:</div>
                <ul>
                    <li>
                        自定义属性 background 控制搜索框背景底色(非输入框底色),
                        默认 '#4f77aa'
                    </li>
                    <li>
                        自定义属性 placeholder 控制搜索框提示语, 默认
                        '请输入搜索关键词'
                    </li>
                    <li>
                        自定义事件search, 触发方式
                        <ul>
                            <li>当点击右侧搜索按钮时触发</li>
                            <li>输入内容改变时自动触发</li>
                            <li>点击软键盘搜索按钮触发</li>
                        </ul>
                    </li>
                </ul>
                <div class="label">使用说明:</div>
                <p>此组件依赖Vant的search组件.源码地址<br />XXXXX</p>
            </div>
        </div>
    </div>
</template>

<script>
import Search from './components/Search'
export default {
    data() {
        return {}
    },
    components: { Search }
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
