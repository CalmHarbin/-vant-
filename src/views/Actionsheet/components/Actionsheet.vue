<template>
    <div class="Actionsheet">
        <!-- 弹出层 -->
        <van-popup
            v-model="show"
            position="bottom"
            @close="$emit('input', false)"
            @open="$refs.picker && $refs.picker.setIndexes([default_index])"
        >
            <van-picker
                ref="picker"
                show-toolbar
                :title="title"
                :default-index="default_index"
                :columns="columns"
                @confirm="onConfirm"
                @cancel="$emit('input', false)"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'Actionsheet',
    props: {
        value: {
            type: Boolean
        },
        title: {
            type: String,
            default: '标题'
        },
        columns: {
            type: Array
        },
        default_index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            show: false
        }
    },
    created() {
        this.show = this.value
    },
    methods: {
        onConfirm(value, index) {
            this.$emit('confirm', value, index)
            this.$emit('input', false) //关闭弹出层
        }
    },
    watch: {
        value(newVal) {
            this.show = newVal
        }
    }
}
</script>
