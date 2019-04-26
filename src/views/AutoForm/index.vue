<template>
    <div>
        <div class="demo1">
            <AutoForm v-model="form" :data="data"></AutoForm>
        </div>
        <!-- 输入框 -->
        <template>
            <h2 style="textAlign:center;margin-top:50px;">输入框</h2>
            <AutoForm v-model="form1" :data="data1"></AutoForm>
        </template>

        <!-- 文本框 -->
        <template>
            <h2 style="textAlign:center;margin-top:50px;">文本框</h2>
            <AutoForm v-model="form4" :data="data4"></AutoForm>
        </template>

        <!-- 一个按钮 -->
        <template>
            <h2 style="textAlign:center;margin-top:50px;">一个按钮</h2>
            <AutoForm v-model="form7" :data="data7"></AutoForm>
        </template>
    </div>
</template>

<script>
import AutoForm from './components/AutoForm'
export default {
    data() {
        return {
            form: {},
            data: [
                {
                    type: 1, //输入框 , 必填
                    key: 'demo1', //key, 必填
                    inputType: 'text', //输入框类型, 可选
                    // placeholder: '', //提示语,
                    label: '姓名', //label, 可选
                    value: '', //初始值, 可选
                    required: true //是否必填, 可选
                },
                {
                    type: 3, //输入框 , 必填
                    key: 'demo1', //key, 必填
                    label: '请选择',
                    value: 3,
                    data: [
                        '选项一',
                        '选项二',
                        '选项三',
                        '选项四',
                        '选项五',
                        '选项六',
                        '选项七',
                        '选项八',
                        '选项九'
                    ]
                },
                {
                    type: 3, //输入框 , 必填
                    key: 'demo11', //key, 必填
                    label: '请选择',
                    value: 3,
                    data: [
                        '选项一',
                        '选项二',
                        '选项三',
                        '选项四',
                        '选项五',
                        '选项六',
                        '选项七',
                        '选项八',
                        '选项九'
                    ]
                },
                {
                    type: 7, //一个按钮
                    label: '提交',
                    readonly: false,
                    class: '123', //自定义样式,类
                    hidden: false, //隐藏字段
                    callback: () => {}
                }
            ],

            form1: {},
            data1: [
                {
                    type: 1, //输入框
                    inputType: 'tel',
                    label: '姓名',
                    key: 'key1',
                    value: '',
                    placeholder: '请输入姓名',
                    maxlength: 35,
                    readonly: false,
                    info: '为空描述',
                    required: true,
                    regExp: /^\d*\d$/,
                    regExpInfo: '正则描述',
                    class: '', //自定义样式,类
                    hidden: false, //隐藏字段
                    callback: value => {
                        console.log(value)
                    } //输入框内容改变时触发
                }
            ],

            form7: {},
            data7: [
                {
                    type: 7, //一个按钮
                    label: '提交', //按钮文字
                    readonly: true, //true 表示不可点击 | false可点击, 默认false
                    bgcolor: '#10a6b7', //背景颜色
                    color: '#fff', //文字颜色
                    class: '', //自定义样式,类
                    hidden: false, //隐藏字段
                    callback: () => {
                        console.log('提交')
                    }
                }
            ],

            form4: {},
            data4: [
                {
                    type: 4, //多行文本框
                    key: '',
                    value: '',
                    readonly: false,
                    placeholder: '请输入姓名',
                    info: '为空描述',
                    required: false,
                    maxlength: 200,
                    regExp: /^\d*\d$/,
                    regExpInfo: '正则描述',
                    minHeight: 60, //最小高度
                    maxHeight: 140, //最大高度
                    class: '', //自定义样式,类
                    hidden: false, //隐藏字段
                    callback: () => {}
                }
            ]
        }
    },
    components: { AutoForm }
}
</script>

<style lang="scss" scoped></style>
