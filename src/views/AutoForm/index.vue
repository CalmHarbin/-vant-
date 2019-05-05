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

        <!-- 上拉菜单 -->
        <template>
            <h2 style="textAlign:center;margin-top:50px;">上拉菜单</h2>
            <AutoForm v-model="form3" :data="data3"></AutoForm>
        </template>

        <!-- 时间选择器 -->
        <template>
            <h2 style="textAlign:center;margin-top:50px;">时间选择器</h2>
            <AutoForm v-model="form5" :data="data5"></AutoForm>
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
                    label: '姓名', //label, 可选
                    value: '', //初始值, 可选
                    required: true //是否必填, 可选
                },
                {
                    type: 11,
                    label: '性别', //label, 可选
                    value: '男',
                    key: 'demo11',
                    data: ['男', '女'],
                    required: false //是否必填, 可选
                },
                {
                    type: 1, //输入框 , 必填
                    key: 'id', //key, 必填
                    inputType: 'tel', //输入框类型, 可选
                    label: '身份证号', //label, 可选
                    value: '', //初始值, 可选
                    required: false //是否必填, 可选
                },
                {
                    type: 1, //输入框 , 必填
                    key: 'address', //key, 必填
                    inputType: 'text', //输入框类型, 可选
                    label: '家庭住址', //label, 可选
                    value: '', //初始值, 可选
                    required: false //是否必填, 可选
                },
                {
                    type: 3, //输入框 , 必填
                    key: 'user', //key, 必填
                    label: '推荐人', //描述
                    value: 2, //命中值
                    show: false, //设为true可以让初始化时就显示
                    data: [
                        '张一',
                        '张二',
                        '张三',
                        '张四',
                        '张五',
                        '张六',
                        '张七',
                        '张八',
                        '张九'
                    ],
                    callback: (value, index) => {
                        console.log(`选中项${value},索引${index}`)
                    }
                },
                {
                    type: 10,
                    label: '是否入伍', //label, 可选
                    value: true,
                    key: 'demo10',
                    required: true, //是否必填, 可选,
                    callback: value => {
                        this.data[6].hidden = !value
                        this.data[6].required = value

                        this.data[7].hidden = !value
                        this.data[7].required = value
                    }
                },
                {
                    type: 5, //输入框 , 必填
                    key: 'demo5', //key, 必填
                    label: '退伍时间', //label, 可选
                    dateType: 'date', //取值 datetime | date | time | year_month
                    value: '2022-05-05', //初始值, 可选
                    hidden: false,
                    required: true //是否必填, 可选
                },
                {
                    type: 4, //多行文本框
                    key: 'reason',
                    value: '',
                    readonly: false,
                    placeholder: '请输入申请理由',
                    info: '申请理由不能为空啦',
                    required: true,
                    maxlength: 2000,
                    minHeight: 60, //最小高度
                    maxHeight: 140, //最大高度
                    hidden: false //隐藏字段
                },
                {
                    type: 7, //一个按钮
                    label: '提交',
                    readonly: false,
                    class: '123', //自定义样式,类
                    hidden: false, //隐藏字段
                    callback: form => {
                        console.log(form)
                        alert('提交成功')
                    }
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
                    required: true,
                    maxlength: 200,
                    regExp: /^\d*\d$/,
                    regExpInfo: '正则描述',
                    minHeight: 60, //最小高度
                    maxHeight: 140, //最大高度
                    class: '', //自定义样式,类
                    hidden: false, //隐藏字段
                    callback: () => {}
                }
            ],

            form3: {},
            data3: [
                {
                    type: 3, //输入框 , 必填
                    key: 'demo1', //key, 必填
                    label: '请选择', //描述
                    value: 3, //命中值
                    show: false, //设为true可以让初始化时就显示
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
                    ],
                    callback: (value, index) => {
                        console.log(`选中项${value},索引${index}`)
                    }
                }
            ],

            form5: {},
            data5: [
                {
                    type: 5, //输入框 , 必填
                    key: 'demo5', //key, 必填
                    label: '时间选择器', //label, 可选
                    dateType: 'datetime', //取值 datetime | date | time | year_month
                    value: '2019-05-05 12:35', //初始值, 可选
                    maxDate: new Date('2020/05/31 23:59'),
                    minDate: new Date('2018/06/01 00:00'),
                    required: true //是否必填, 可选
                }
            ]
        }
    },
    components: { AutoForm }
}
</script>

<style lang="scss" scoped></style>
