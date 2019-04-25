<template>
    <div class="index">
        <van-button type="info" size="large" @click.native="show = true"
            >显示</van-button
        >
        <p>当前索引 {{ index }} 当前值 {{ columns[index] }}</p>
        <Actionsheet
            v-model="show"
            :columns="columns"
            :default_index="index"
            @confirm="confirm"
        ></Actionsheet>
        <div class="box">
            <div>
                <div class="label">组件说明:</div>
                <ul>
                    <li>
                        请使用v-model绑定属性,控制是否显示
                    </li>
                    <li>
                        title 上方文字 默认标题, 不显示传空字符即可
                    </li>
                    <li>
                        columns 数据来源 , 必填
                    </li>
                    <li>
                        default_index 默认选中索引 , 请输入正确索引
                    </li>
                </ul>
                <div class="label">使用说明:</div>
                <p>此组件依赖Vant的Popup, Picker组件.源码地址<br />XXXXX</p>
            </div>
        </div>
    </div>
</template>

<script>
import Actionsheet from './components/Actionsheet'
export default {
    data() {
        return {
            show: false,
            columns: [
                '选项一',
                '选项二',
                '选项三',
                '选项四',
                '选项五',
                '选项六',
                '选项七',
                '选项八',
                '选项九'
            ],
            index: 2
        }
    },
    components: { Actionsheet },
    methods: {
        confirm(value, index) {
            this.$toast(`选中索引---${index},值为----${value}`)
            this.index = index
        }
    }
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
