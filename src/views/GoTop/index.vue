<template>
    <div class="index">
        <div style="height:4000px">
            我是滚动的容器<br />
            请向下滚动体验
            <div class="label">组件说明:</div>
            <ul>
                <li>
                    给组件传入 el 自定义属性, 值为 节点元素 , 默认为
                    document.documentElement
                </li>
                <li>
                    向下滚动时置顶按钮消失，向上滚动时置顶按钮显示，滚动停止2s后置顶按钮消失
                </li>
                <li>
                    点击置顶按钮可快速回到顶部
                </li>
            </ul>
            <div class="label">使用说明:</div>
            <p>此组件不依赖Vant,可直接使用.源码地址<br />XXXXX</p>
            <div v-for="item in 20" :key="item" style="margin-top:150px;">
                为了方便看动画效果{{ item }}-----------------
            </div>
        </div>
        <div>你该向上滚啦~</div>
        <GoTop></GoTop>
    </div>
</template>

<script>
import GoTop from './components/GoTop'
export default {
    data() {
        return {}
    },
    components: { GoTop }
}
</script>

<style lang="scss" scoped>
.index {
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
