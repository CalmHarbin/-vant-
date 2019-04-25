<template>
    <div class="demo1">
        <AutoForm v-model="form" :data="data" required></AutoForm>
    </div>
</template>

<script>
import AutoForm from '@/components/autoForm/autoForm'
export default {
    data() {
        return {
            form: {},
            data: [
                {
                    type: 1, //输入框 , 必填
                    key: 'demo1_key', //key, 必填
                    inputType: 'text', //输入框类型, 可选
                    placeholder: '请输入label', //提示语,
                    label: 'label', //label, 可选
                    value: '我是初始值', //初始值, 可选
                    required: false //是否必填, 可选
                }
            ]
        }
    },
    components: { AutoForm }
}
</script>

<style lang="scss" scoped></style>
