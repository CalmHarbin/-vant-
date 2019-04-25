<template>
    <div class="index">
        <div class="header">
            <img
                src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png"
                alt=""
            />
            基于Vant的常用组件
        </div>
        <p class="info">轻量、可靠的移动端Vue组件库</p>
        <van-cell title="自动表单" is-link />
        <van-cell title="置顶" :to="{ name: 'GoTop' }" is-link />
        <van-cell title="搜索框" :to="{ name: 'Search' }" is-link />
        <van-cell title="附件上传" :to="{ name: 'Upload' }" is-link />
        <van-cell title="图片自适应" :to="{ name: 'AutoImg' }" is-link />
        <van-cell title="操作反馈" :to="{ name: 'Feedback' }" is-link />
        <van-cell title="上拉菜单" :to="{ name: 'Actionsheet' }" is-link />
        <van-cell title="时间选择器" :to="{ name: 'DatetimePicker' }" is-link />
        <demo1></demo1>
    </div>
</template>

<script>
import demo1 from './AutoFrom/demo1'
export default {
    data() {
        return {}
    },
    components: { demo1 }
}
</script>

<style lang="scss" scoped>
.index {
    padding: $padding;
}
.group {
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    font-size: 15px;
    padding: 0 15px;
}
.header {
    font-size: 26px;
    font-weight: 500;
    img {
        width: 38px;
        margin-right: 5px;
    }
}
.info {
    font-size: 14px;
    color: #999;
    margin: $margin 0;
}
.van-cell {
    margin-bottom: 15px;
}
</style>
