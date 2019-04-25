<template>
    <div class="GoTop">
        <van-search
            shape="round"
            :placeholder="placeholder"
            :background="background"
            show-action
            v-model="search_text"
            @input="inputFn"
            @search="search"
        >
            <div class="search" slot="action" @click="search">搜索</div>
        </van-search>
    </div>
</template>

<script>
export default {
    name: 'GoTop',
    props: {
        background: {
            type: String,
            default: '#4f77aa'
        },
        placeholder: {
            type: String,
            default: '请输入搜索关键词'
        }
    },
    data() {
        return {
            inputFn: null,
            search_text: '' //搜索内容
        }
    },
    created() {
        //函数防抖绑定事件
        this.inputFn = this.debounce(this.search, 1000)
    },
    methods: {
        /**
         *  函数防抖
         * @method search
         * @param {Function} fn 触发函数
         * @param {int} wait 延时时间  毫秒
         * @return {undefined}
         */
        debounce(fn, wait) {
            let timer = null
            return function() {
                let arg = arguments
                let ctx = this
                if (timer) clearTimeout(timer)
                timer = setTimeout(function() {
                    fn.apply(ctx, arg) //改变this指向,并且传入参数
                }, wait)
            }
        },
        /**
         *  搜索
         * @method search
         * @return {undefined}
         */
        search() {
            //触发搜索方法,传递搜索的值
            this.$emit('search', this.search_text)
        }
    }
}
</script>

<style lang="scss" scoped>
.van-search__content {
    background-color: #fff;
}
.search {
    color: #fff;
}
</style>
