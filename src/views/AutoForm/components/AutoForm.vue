<!--
用法:
    {   
        type: 1,//输入框
        inputType: 'text',
        label: '姓名',
        key: '',
        value: '',
        placeholder: '请输入姓名',
        maxlength: 35,
        readonly: false,
        info: '为空描述',
        required: false,
        regExp: /^\d*\d$/,
        regExpInfo: '正则描述',
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 2,//组织架构选人,单选
        value: {id: '',name:''},
        key: '',
        label: '负责人',
        readonly: false,
        info: '为空描述',
        required: false,
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 3,//上拉菜单选择,单选
        label: '出行方式',
        key: '',
        value: '公交车',
        data: ['公交车', '火车'],
        readonly: false,
        info: '为空描述',
        required: false,
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },

    {
        type: 4,//多行文本框
        label: '内容',
        key: '',
        value: '',
        readonly: false,
        placeholder: '请输入姓名',
        info: '为空描述',
        required: false,
        maxlength: 200,
        regExp: /^\d*\d$/,
        regExpInfo: '正则描述',
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 5,//时间组件
        value: '2018-01-01',
        key: '',
        dateType: 'date',//时间组件类型,date|time|datetime  详见ydui时间组件
        readonly: false,
        info: '为空描述',
        required: false,
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 6,//附件,任意类型附件
        label: '附件',
        value: [],
        key: '',
        readonly: false,
        info: '为空描述',
        required: false,
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 7,//一个按钮
        label: '提交',
        readonly: false,
        bgcolor: '#10a6b7',//背景颜色
        color: '#fff',//文字颜色
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 8,//上拉菜单选择,含有id,单选
        label: '出行方式',
        key: '',
        value: {id: '1', name: '公交车'},
        data: [{id: '1', name: '公交车'}, {id: '2', name: '火车'}],
        readonly: false,
        info: '为空描述',
        required: false,
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 9,//多选
        label: '乘车方式',
        key: '',
        value: [],
        data: ['选项一', '选项二'],
        horizontal: true,//水平排列
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 10,//开关单选
        label: '乘车方式',
        key: '',
        value: [],
        data: ['开', '关'],
        show: fasle,//是否显示文字
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
    {
        type: 11,//多数据时,左侧弹出选择框,支持单选和多选.
        label: '项目类别',
        key: '',
        data: [{id: '1', name: '公交车'}, {id: '2', name: '火车'}],
        readonly: false,
        info: '为空描述',
        required: false,
        class: '',//自定义样式,类
        hidden: false,//隐藏字段
        callback: function
    },
插槽功能 slot
slot='top',//在顶部
slot='bottom',//在底部
slot='key',//在key的后面
-->
<template>
    <div
        :class="{
            style_left: styles === 'left',
            style_right: styles === 'right'
        }"
    >
        <slot name="top"></slot>
        <!-- 输入框 -->
        <!-- <template v-for="(item, index) in list" v-if="item.type === 1">
            <yd-cell-item
                :class="
                    item.hidden
                        ? 'none ' + (item.class ? item.class : '')
                        : item.class
                "
                :key="index"
            >
                <span slot="left"
                    >{{ item.label
                    }}<i class="required" v-if="item.required">*</i></span
                >
                <input
                    slot="right"
                    :type="item.inputType"
                    :readonly="item.readonly"
                    :placeholder="item.placeholder"
                    v-model="form[item.key]"
                    :maxlength="item.maxlength"
                    @input="
                        $event =>
                            item.callback && item.callback($event.target.value)
                    "
                />
            </yd-cell-item>
            <slot :name="item.key"></slot>
        </template> -->
        <template v-for="(item, index) in list" v-if="item.type === 1">
            <van-field
                :class="
                    item.hidden
                        ? 'none ' + (item.class ? item.class : '')
                        : item.class
                "
                :key="index"
                v-model="form[item.key]"
                :required="item.required"
                :label="item.label"
                :input-align="styles"
                :type="item.inputType"
                :readonly="item.readonly"
                :placeholder="item.placeholder"
                :maxlength="item.maxlength"
                @input="value => item.callback && item.callback(value)"
            />
            <slot :name="item.key"></slot>
        </template>
        <!-- 调用组织架构选人,单选 -->
        <!-- <template v-else-if='item.type === 2'>
            <yd-cell-item @click.native='selectPeople(form[item.key].id, item.key, item.callback, item.readonly)' arrow :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index'>
                <span slot="left">{{item.label}}<i class='required' v-if='item.required'>*</i></span>
                <span slot="right" class='readonly' v-if='item.readonly'>{{form[item.key].name ? form[item.key].name : item.placeholder}}</span>
                <span slot="right" v-else>{{form[item.key].name ? form[item.key].name : item.placeholder}}</span>
            </yd-cell-item>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 上拉菜单选择 -->
        <template v-else-if="item.type === 3">
            <van-cell
                :title="item.label"
                is-link
                :value="item.data[item.value]"
                @click.native="item.show = true && $forceUpdate()"
            />
            <Actionsheet
                v-model="item.show"
                :columns="item.data"
                :default_index="item.value"
                @confirm="
                    (value, index) => confirm_Actionsheet(value, index, item)
                "
            ></Actionsheet>
            <slot :name="item.key"></slot>
        </template>

        <!-- 含有id的上拉菜单 -->
        <!-- <template v-else-if="item.type === 8">
            <div  :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index' v-if='item.data.length'>
                <formSelect :data='item.data_name_list' :isdefault='item.default' :title='item.label' :Hit='item.data_name' :readonly='item.readonly' :required='item.required'  @change="(text) => changeFormSelect(text, item)"></formSelect>
            </div>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 多行文本框 -->
        <template v-else-if="item.type === 4">
            <van-field
                :class="
                    item.hidden
                        ? 'none ' + (item.class ? item.class : '')
                        : item.class
                "
                :key="index"
                v-model="form[item.key]"
                :required="item.required"
                :label="item.label"
                :input-align="styles"
                type="textarea"
                :readonly="item.readonly"
                :placeholder="item.placeholder"
                :maxlength="item.maxlength"
                :autosize="{
                    maxHeight: item.maxHeight,
                    minHeight: item.minHeight
                }"
                @input="value => item.callback && item.callback(value)"
            />
            <slot :name="item.key"></slot>
        </template>

        <!-- 时间组件,默认年月日时分 -->
        <!-- <template v-else-if="item.type === 5">
            <yd-cell-item  :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index' arrow>
                <span slot="left">{{item.label}}<i class='required' v-if='item.required'>*</i></span>
                <input slot="right" type="text" readonly v-model="form[item.key]" v-if='item.readonly'>
                <yd-datetime :type="item.dateType" :start-date="item.startDate" v-model="form[item.key]" slot="right" :callback="(date) => changeDate(date,item.callback)" v-else></yd-datetime>
            </yd-cell-item>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 附件 -->
        <!-- <template v-else-if="item.type === 6">
            <div  :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index'>
                <p style="padding-left: .24rem;color: #555;margin-top: 10px;">{{item.label}}<i class='required' v-if='item.required'>*</i></p>
                <upload :files="form[item.key]" :isSee='item.readonly' @change="(files) => changeFiles(files, item.key, item.callback)"></upload>
            </div>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 多选,不含id -->
        <!-- <template v-else-if="item.type === 9">
            <div  :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index'>
                <p style="padding-left: .24rem;color: #555;margin-top: 10px;">{{item.label}}<i class='required' v-if='item.required'>*</i></p>
                <div class="checkbox_wrap" :class="{'verticality': !item.horizontal}">
                    <yd-checkbox-group v-model="form[item.key]" :callback='(checked) => item.callback && item.callback(checked)' >
                        <yd-checkbox :val="i" v-for='i in item.data' :disabled='item.readonly' :key='i'>{{i}}</yd-checkbox>
                    </yd-checkbox-group>
                </div>
            </div>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 开关 -->
        <!-- <template v-else-if="item.type === 10">
            <yd-cell-item class='switch'  :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index'>
                <span slot="left">{{item.label}}<i class='required' v-if='item.required'>*</i></span>
                <div slot="right" style="display: flex;align-items: center;">
                    <yd-switch v-model="form[item.key]" :callback="(state) => item.callback && item.callback(state)"></yd-switch>
                    <span style="font-size: 14px;margin-left: 5px" v-if='item.show'>{{form[item.key] ? item.data[0] : item.data[1]}}</span>
                </div>
            </yd-cell-item>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 多数据时,左侧弹出选择框,支持单选和多选. -->
        <!-- <template v-else-if='item.type === 11'>
            <yd-cell-item @click.native='() => {!item.readonly && (item.show = true)}' arrow :class='item.hidden ? "none "+(item.class ? item.class : "") : item.class' :key='index'>
                <span slot="left" >{{item.label}}<i class='required' v-if='item.required'>*</i></span>
                <input slot="right" type="text" :placeholder="item.placeholder" v-model="form[item.key].name" :maxlength="item.maxlength" :readonly="item.readonly" disabled />
            </yd-cell-item>
            <pick :select='item.select' :search='item.search' :bgcolor='item.bgcolor' :color='item.color' :btnText='item.btnText' :isCheckbox='item.isCheckbox' :isloadList='item.isloadList' :isSearch='item.isSearch' :width='item.width' :data="item.data" v-model="item.show" :isAvatar='item.isAvatar' @search='(text, callback) => item.searchCallback && item.searchCallback(text, callback)' @loadList='(text, callback) => item.loadList && item.loadList(text, callback)' @change='(value,data) => pickChange(value,data,item)'></pick>
            <slot :name='item.key'></slot>
        </template> -->

        <!-- 一个按钮 -->
        <template v-else-if="item.type === 7">
            <button
                class="btn_blcok"
                :key="index"
                :class="
                    item.hidden
                        ? 'none ' + (item.class ? item.class : '')
                        : item.class
                "
                :style="
                    `backgroundColor:${
                        item.bgcolor ? item.bgcolor : '#5875ed'
                    };color:${item.color ? item.color : '#fff'}`
                "
                @click="submit(item.callback, item.readonly)"
            >
                {{ item.label }}
            </button>
            <slot :name="item.key"></slot>
        </template>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
import Actionsheet from '../../Actionsheet/components/Actionsheet'
import { wxSDK } from '@/api/api'
export default {
    name: 'AutoForm',
    components: { Actionsheet },
    props: {
        value: Object,
        styles: {
            //页面风格,默认居左,right居右
            type: String,
            default: 'left'
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            form: {},
            list: [],
            wxSDK_Ok: false,
            show: false
        }
    },
    created() {
        if (this.value) {
            for (let item in this.value) {
                // this.form[item] = this.data[item];
                this.$set(this.form, item, this.value[item])
            }
        }
        this.update(this.data)
    },
    mounted() {
        // console.log(this.list)
    },
    methods: {
        /**
         * 微信sdk
         * @method upload
         * @returns {undefined}
         */
        wxSDK() {
            if (this.wxSDK_Ok) return
            this.wxSDK_Ok = true
            wxSDK()
                .then(res => {
                    if (!res.iserror) {
                        this.wxSDK_Ok = true
                        let json = res.data
                        wx.config({
                            beta: true,
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: json.CorpID, // 必填，企业号的唯一标识，此处填写企业号corpid
                            timestamp: json.timestamp, // 必填，生成签名的时间戳
                            nonceStr: json.nonce_str, // 必填，生成签名的随机串
                            signature: json.signature, // 必填，签名，见附录1
                            jsApiList: [
                                'previewFile',
                                'selectEnterpriseContact'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        })
                    } else {
                        this.$dialog.alert({ mes: '系统内部错误,请稍后再试' })
                    }
                })
                .catch(err => {
                    this.$dialog.loading.close()
                    this.$dialog.alert({ mes: err.message })
                })
        },
        /**
         * 选人
         * @method selectPeople
         * @param {String} id 默认选中id
         * @param {String} key 当前key值
         * @param {Function} callback 值改变时回调
         * @param {Boolean} readOnly 是否只读
         * @returns {undefined}
         */
        selectPeople(id, key, callback, readOnly) {
            if (readOnly) return
            let _this = this
            wx.invoke(
                'selectEnterpriseContact',
                {
                    fromDepartmentId: -1, // 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                    mode: 'single', // 必填，选择模式，single表示单选，multi表示多选
                    type: ['user'], // 必填，选择限制类型，指定department、user中的一个或者多个
                    selectedDepartmentIds: [], // 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    selectedUserIds: id ? [id] : [] // 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                },
                function(res) {
                    if (res.err_msg == 'selectEnterpriseContact:ok') {
                        if (typeof res.result === 'string') {
                            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                        }

                        let selectedUserList = res.result.userList // 已选的成员列表

                        _this.form[key] = {
                            id: selectedUserList[0].id,
                            name: selectedUserList[0].name,
                            avatar: selectedUserList[0].avatar
                        }
                        //执行回调
                        callback && callback(_this.form[key])
                    }
                }
            )
        },
        /**
         * 上拉菜单选择
         * @method formSelectChange
         * @param {String} text 选中的值
         * @param {String} key 当前key值
         * @param {Function} callback 值改变时回调
         * @returns {undefined}
         */
        formSelectChange(text, key, callback) {
            this.form[key] = text
            callback && callback(text)
        },
        /**
         * 附件
         * @method upload
         * @param {Array} files 附件
         * @param {String} key 当前key值
         * @param {Function} callback 值改变时回调
         * @returns {undefined}
         */
        changeFiles(files, key, callback) {
            this.form[key] = files
            callback && callback(files)
        },
        /**
         * 时间
         * @method upload
         * @param {String} date 改变后的时间
         * @param {Function} callback 值改变时回调
         * @returns {undefined}
         */
        changeDate(date, callback) {
            callback && callback(date)
        },
        /**
         * 确定
         * @method submit
         * @param {Function} callback 值改变时回调
         * @param {Boolean} readonly 只读
         * @returns {undefined}
         */
        submit(callback, readonly) {
            if (readonly) return
            //表单验证
            for (let item of this.list) {
                if (!item.key) {
                    continue
                }
                //必填项验证,this.$check是封装的一个全局方法,用于表单验证
                if (
                    item.required &&
                    !this.$check(this.form[item.key], item.info)
                ) {
                    return
                }
                //正则验证
                if (item.type === 1 && this.form[item.key]) {
                    if (
                        item.regExp instanceof RegExp &&
                        !this.$check(
                            this.form[item.key],
                            item.regExpInfo,
                            item.regExp
                        )
                    ) {
                        return
                    }
                }
            }
            //执行回调
            callback && callback(this.form)
        },
        /**
         * 确定
         * @method submit
         * @param {String} value 当前选中的值
         * @param {String} index 选中索引
         * @param {String} item 当前对象
         * @returns {undefined}
         */
        confirm_Actionsheet(value, index, item) {
            this.form[item.key] = value
            item.value = index
            item.callback && item.callback(value, index)
        },
        /**
         * 左侧选择确定回调
         * @method pickChange
         * @param {String} text 当前选中的值
         * @param {String} obj 当前的对象
         * @returns {undefined}
         */
        pickChange(value, data, item) {
            item.select = value
            if (item.isCheckbox) {
                this.form[item.key] = {
                    id: null,
                    name: value.length + '个'
                }
                let arr = []
                for (let item of value) {
                    arr.push(data[item])
                }
                //多选时返回数组
                item.callback && item.callback(arr)
            } else {
                this.form[item.key] = data[value[0]]
                //单选时返回对象
                item.callback && item.callback(data[value[0]])
            }
        },
        /**
         * 更新数据
         * @method update
         * @returns {undefined}
         */
        update(data = this.data) {
            this.list = [...data]
            //数据给默认值
            for (let item of this.list) {
                if (item.type !== 7) {
                    if (this.form[item.key] === undefined) {
                        this.$set(this.form, item.key, item.value)
                    }
                }
                item.hidden = item.hidden !== undefined ? item.hidden : false //默认不是隐藏字段
                item.required =
                    item.required !== undefined ? item.required : true //默认必填项
                item.info =
                    item.info !== undefined
                        ? item.info
                        : item.label + '不能为空' //默认提示语
                item.regExp = item.regExp !== undefined ? item.regExp : false //默认没有正则验证
                item.regExpInfo =
                    item.regExpInfo !== undefined
                        ? item.regExpInfo
                        : item.label + '格式不正确' //默认没有正则验证
                //表单输入框
                if (item.type === 1) {
                    item.inputType = item.inputType ? item.inputType : 'text'
                    item.placeholder =
                        item.placeholder !== undefined
                            ? item.placeholder
                            : '请输入' + item.label
                    item.maxlength = item.maxlength > 0 ? item.maxlength : 35
                    item.readonly =
                        item.readonly !== undefined ? item.readonly : false
                }
                //组织架构选人
                if (item.type === 2) {
                    this.wxSDK()
                    item.placeholder =
                        item.placeholder !== undefined
                            ? item.placeholder
                            : '请选择' + item.label
                    item.maxlength = item.maxlength > 0 ? item.maxlength : 35
                    this.form[item.key] =
                        this.form[item.key] !== undefined
                            ? this.form[item.key]
                            : { name: '', id: '' }
                }
                //上拉菜单,无id
                if (item.type === 3) {
                    if (!this.form[item.key]) {
                        this.form[item.key] = item.data.length && item.data[0] //默认选中第一项
                    }
                    item.show = false
                }
                //textare
                if (item.type === 4) {
                    item.placeholder =
                        item.placeholder !== undefined
                            ? item.placeholder
                            : '请输入' + item.label
                    item.maxlength = item.maxlength > 0 ? item.maxlength : 200
                    item.maxHeight =
                        item.maxHeight !== undefined ? item.maxHeight : 60
                    item.minHeight =
                        item.minHeight !== undefined ? item.minHeight : 60
                    item.readonly =
                        item.readonly !== undefined ? item.readonly : false
                }
                //时间组件,默认年月日
                if (item.type === 5) {
                    item.dateType =
                        item.dateType !== undefined ? item.dateType : 'date'
                    item.startDate =
                        item.startDate !== undefined
                            ? item.startDate
                            : this.$GetDateTime(new Date(), 'Y-m-d')
                    this.form[item.key] = this.form[item.key]
                        ? this.form[item.key]
                        : this.$GetDateTime(new Date(), 'Y-m-d')
                }
                //附件
                if (item.type === 6) {
                    item.label = item.label !== undefined ? item.label : '附件'
                    this.form[item.key] =
                        this.form[item.key] !== undefined
                            ? this.form[item.key]
                            : []
                }
                //一个按钮
                if (item.type === 7) {
                    item.label = item.label !== undefined ? item.label : '提交'
                    item.bgcolor =
                        item.bgcolor !== undefined ? item.bgcolor : '#5875ed'
                    item.color = item.color !== undefined ? item.color : '#FFF'
                }
                //上拉菜单选择,含有id
                if (item.type === 8) {
                    // debugger;
                    item.label = item.label !== undefined ? item.label : '提交'
                    item.default =
                        item.default !== undefined ? item.default : false //默认选中第一项
                    if (item.data === undefined) {
                        item.data = [
                            { id: 1, name: '选项一' },
                            { id: 2, name: '选项二' }
                        ]
                    }
                    if (item.default) {
                        this.form[item.key] =
                            this.form[item.key] !== undefined
                                ? this.form[item.key]
                                : item.data[0]
                        //选中值
                        item.data_name =
                            this.form[item.key] !== undefined &&
                            this.form[item.key].name
                    } else {
                        if (this.form[item.key] === undefined) {
                            item.data_name = '' //默认为空
                        } else {
                            item.data_name = this.form[item.key].name
                        }
                    }
                    //所有数据
                    item.data_name_list = []
                    for (let i of item.data) {
                        item.data_name_list.push(i.name)
                    }
                }
                //多选框
                if (item.type === 9) {
                    item.horizontal =
                        item.horizontal !== undefined ? item.horizontal : true //默认是水平的
                    this.form[item.key] =
                        this.form[item.key] !== undefined
                            ? this.form[item.key]
                            : []
                    item.data = item.data.length
                        ? item.data
                        : ['选项一', '选项二']
                }
                //开关
                if (item.type === 10) {
                    this.form[item.key] =
                        this.form[item.key] !== undefined
                            ? this.form[item.key]
                            : item.value !== undefined
                            ? item.value
                            : true
                }
                //多数据选择,左侧弹出,单选或多选
                if (item.type === 11) {
                    this.form[item.key] =
                        this.form[item.key] !== undefined
                            ? this.form[item.key]
                            : { name: '', id: '' }

                    item.placeholder =
                        item.placeholder !== undefined
                            ? item.placeholder
                            : '请选择' + item.label
                    item.search = item.search !== undefined ? item.search : ''
                    item.bgcolor =
                        item.bgcolor !== undefined ? item.bgcolor : '#ef4f4f'
                    item.color = item.color !== undefined ? item.color : '#fff'
                    item.btnText =
                        item.btnText !== undefined ? item.btnText : '确定'
                    item.isCheckbox =
                        item.isCheckbox !== undefined ? item.isCheckbox : true //默认为多选
                    item.width = item.width !== undefined ? item.width : '60%'
                    item.isloadList =
                        item.isloadList !== undefined ? item.isloadList : false
                    item.isSearch =
                        item.isSearch !== undefined ? item.isSearch : false
                    item.isAvatar =
                        item.isAvatar !== undefined ? item.isAvatar : false
                    item.select = item.select !== undefined ? item.select : [0]
                }
            }
            this.$forceUpdate()
        },
        /**
         * 表单不为空验证
         * @method submit
         * @param {} value 待验证的值
         * @param {String} info 提示语
         * @param {RegExp} regExp 正则验证 ,当此值为正则是则使用正则验证.
         * @returns {Boolean} false表示验证不通过,true表示通过
         */
        $check(value, info, regExp) {
            //正则验证
            if (regExp instanceof RegExp) {
                if (!regExp.test(value)) {
                    this.$toast.fail(info)
                    return false
                }
            } else {
                //不为空验证
                //字符串验证
                if (typeof value === 'string' && !value) {
                    this.$toast.fail(info)
                    return false
                }
                //数组验证
                if (value instanceof Array && !value.length) {
                    this.$toast.fail(info)
                    return false
                }
                //对象验证
                if (
                    Object.prototype.toString.call(value) === '[object Object]'
                ) {
                    for (let i in value) {
                        if (!this.$check(value[i], info)) {
                            return false
                        }
                    }
                }
                //为假验证
                if (value === undefined || value === null) {
                    this.$toast.fail(info)
                    return false
                }
            }
            return true
        }
    },
    watch: {
        form: {
            handler: function(newVal) {
                this.$emit('input', newVal)
                this.$forceUpdate()
            },
            deep: true, //对象内部的属性监听，也叫深度监听
            immediate: true //初始化就执行
        },
        value: {
            handler: function(newVal) {
                if (newVal) {
                    for (let item in newVal) {
                        this.$set(this.form, item, newVal[item])
                    }
                }
                this.$forceUpdate()
                // this.update(this.data);
            },
            deep: true, //对象内部的属性监听，也叫深度监听
            immediate: true //newVal
        },
        data: {
            handler: function(newVal) {
                this.update(newVal)
            },
            deep: true, //对象内部的属性监听，也叫深度监听
            immediate: true //newVal
        }
    }
}
</script>

<style lang="scss" scoped>
.style_left /deep/ {
    width: 100%;
    overflow-x: hidden;
    .yd-cell-left {
        width: 2.3rem;
    }
    .yd-cell-right {
        justify-content: space-between;
    }
}
.style_right /deep/ {
    width: 100%;
    overflow-x: hidden;
    .yd-cell-right input {
        text-align: right;
        padding-left: 10px;
    }
    .yd-cell-right .yd-datetime-input {
        justify-content: flex-end;
    }
}
.textarea_box::after {
    margin-left: 0.24rem;
    height: 1px;
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    background-image: -webkit-linear-gradient(
        bottom,
        #ececec 50%,
        transparent 0
    );
    background-image: linear-gradient(0deg, #ececec 50%, transparent 0);
}
.yd-button {
    padding-bottom: 0.2rem;
}
.checkbox_wrap {
    position: relative;
    padding: 0.24rem;
    &::after {
        margin-left: 0.24rem;
        height: 1px;
        position: absolute;
        z-index: 0;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        background-image: -webkit-linear-gradient(
            bottom,
            #ececec 50%,
            transparent 0
        );
        background-image: linear-gradient(0deg, #ececec 50%, transparent 0);
    }
}
.verticality label {
    display: block;
    margin-bottom: 10px;
}
.verticality label:last-child {
    margin-bottom: 0;
}
input[readonly],
input[disabled],
.readonly {
    color: #949494 !important;
    opacity: 1 !important;
    -webkit-text-fill-color: #949494;
    -webkit-opacity: 1;
}
.style_left /deep/ .yd-cell-right,
.style_right /deep/ .yd-cell-right {
    font-size: 0.28rem;
}
.switch /deep/ .yd-cell-right {
    justify-content: flex-end;
}
.required {
    color: red;
    margin-left: 3px;
}
/deep/ .yd-textarea-readonly {
    opacity: 1;
    color: #949494 !important;
}

// new
/deep/ {
    .van-field__label {
        flex: 0 1 90px;
        max-width: none;
    }
    .van-field__control {
        padding: 0 5px;
    }
}
.btn_blcok {
    display: block;
    width: calc(100% - 30px);
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 6px;
    margin: 30px auto 0;
    border: none;
    outline: none;
    font-size: 17px;
}
</style>
