<template>
    <div class="GoTop">
        <transition name="fade">
            <img
                class="go_top"
                v-if="show"
                @click="go_top"
                :src="require('./top.png')"
                alt=""
            />
        </transition>
    </div>
</template>

<script>
/**
 * 当html产生滚动条时,  pc端通过 document.documentElement.scrollTop获取滚动条位置   通过设置 document.documentElement.scrollTop来改变滚动条位置
 *                    移动端通过 document.body.scrollTop获取滚动条位置   通过设置 document.body.scrollTop来改变滚动条位置
 * 当 div 等标签内部产生滚动时
 *                     通过  el.scrollY  获取滚动条位置    设置el.scrollY  改变滚动条位置
 */
export default {
    name: 'GoTop',
    props: {
        el: {
            type: null,
            default: () => document.body
        }
    },
    data() {
        return {
            show: false,
            scrollY: 0 //上一次滚动条位置
        }
    },
    mounted() {
        let Timer = null
        this.el.onscroll = () => {
            if (Timer) clearTimeout(Timer)
            Timer = setTimeout(() => {
                this.show_go_top()
            }, 2000)

            let scrollY =
                this.el.scrollY ||
                this.el.scrollTop ||
                document.documentElement.scrollY ||
                document.documentElement.scrollTop
            // console.log(scrollY)
            if (scrollY > this.scrollY) {
                this.show = false
            } else {
                this.show = true
            }
            this.scrollY = scrollY
        }
    },
    methods: {
        show_go_top() {
            this.show = false
        },
        go_top() {
            let scrollY =
                this.el.scrollY ||
                this.el.scrollTop ||
                document.documentElement.scrollY ||
                document.documentElement.scrollTop
            if (scrollY > 100) {
                this.el.scrollTop
                    ? (this.el.scrollTop =
                          scrollY * 0.3 < 100 ? scrollY - 100 : scrollY * 0.7)
                    : (document.documentElement.scrollTop =
                          scrollY * 0.3 < 100 ? scrollY - 100 : scrollY * 0.7)
                setTimeout(() => {
                    this.go_top()
                }, 20)
            } else {
                this.el.scrollTop = 0
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.go_top {
    position: fixed;
    z-index: 999;
    right: 0.3rem;
    bottom: 1rem;
    width: 1.18rem;
}
</style>
