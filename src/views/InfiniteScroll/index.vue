<template>
    <div class="index">
        <yd-infinitescroll
            :pullcallback="pullcallback"
            :callback="callback"
            ref="infinitescrollDemo"
            pullTipBgColor="red"
        >
            <div slot="list">
                <button @click="btn_fun">按钮</button>
                我是滚动的容器<br />
                体验上拉加载和下拉刷新
                <div class="label">组件说明:</div>
                <ul style="padding: .3rem;word-break: break-all;">
                    <li>
                        滚动加载功能请参考<a
                            href="http://vue.ydui.org/docs/#/infinitescroll"
                            >ydui 滚动加载</a
                        >
                    </li>
                    <hr />
                    <li>
                        传入pullcallback参数表示开启下拉刷新功能
                    </li>
                    <li>
                        更新成功请调用
                        this.$refs.infinitescrollDemo.$emit('ydui.pullrefresh.finishLoad.success',
                        true) <br />
                        参数 true 开始提示, false 关闭提示, 默认true
                    </li>
                    <li>
                        更新失败请调用
                        this.$refs.infinitescrollDemo.$emit('ydui.pullrefresh.finishLoad.fail',
                        true) <br />
                        参数 true 开始提示, false 关闭提示, 默认true
                    </li>
                    <li>
                        传入pullTipBgColor参数来修改下拉刷新成功状态的背景色,默认
                        蓝色(#171dca)
                    </li>
                </ul>
                <div class="label">使用说明:</div>
                <p>此组件不依赖Vant,可直接使用.源码地址<br />XXXXX</p>

                <div v-for="item in num" :key="item" style="margin-top:150px;">
                    为了方便看动画效果{{ item }}-----------------
                </div>
            </div>
        </yd-infinitescroll>
    </div>
</template>

<script>
import YdInfinitescroll from './components/InfiniteScroll.vue'
export default {
    data() {
        return {
            num: 20
        }
    },
    components: { YdInfinitescroll },
    methods: {
        pullcallback() {
            // alert(1)
            setTimeout(() => {
                this.$refs.infinitescrollDemo.$emit(
                    'ydui.pullrefresh.finishLoad.success',
                    true
                )
            }, 1000)
        },
        callback() {
            setTimeout(() => {
                this.num += 20
                this.$refs.infinitescrollDemo.$emit(
                    'ydui.infinitescroll.finishLoad'
                )
            }, 1000)
        },
        btn_fun() {
            alert(1)
        }
    }
}
</script>

<style lang="scss" scoped>
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
