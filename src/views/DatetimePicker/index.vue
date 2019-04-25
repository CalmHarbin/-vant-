<template>
    <div class="index">
        <!-- 日期+时间 -->
        <template>
            <van-button
                type="info"
                size="large"
                @click.native="show_datetime = true"
                >{{ datetime }}</van-button
            >
            <div style="height: 30px"></div>
            <DatetimePicker
                v-model="show_datetime"
                type="datetime"
                :time="datetime"
                @confirm="value => confirm(value, 'datetime')"
            ></DatetimePicker>
        </template>

        <!-- 日期 -->
        <template>
            <van-button
                type="info"
                size="large"
                @click.native="show_date = true"
                >{{ date }}</van-button
            >
            <div style="height: 30px"></div>
            <DatetimePicker
                v-model="show_date"
                type="date"
                :time="date"
                @confirm="value => confirm(value, 'date')"
            ></DatetimePicker>
        </template>

        <!-- 年月 -->
        <template>
            <van-button
                type="info"
                size="large"
                @click.native="show_year_month = true"
                >{{ year_month }}</van-button
            >
            <div style="height: 30px"></div>
            <DatetimePicker
                v-model="show_year_month"
                type="year-month"
                :time="year_month"
                @confirm="value => confirm(value, 'year_month')"
            ></DatetimePicker>
        </template>

        <!-- 时间 -->
        <template>
            <van-button
                type="info"
                size="large"
                @click.native="show_time = true"
                >{{ time }}</van-button
            >
            <DatetimePicker
                v-model="show_time"
                type="time"
                :time="time"
                @confirm="value => confirm(value, 'time')"
            ></DatetimePicker>
            <div style="height: 30px"></div>
        </template>

        <!-- 上班时间 -->
        <template>
            <van-button
                type="info"
                size="large"
                @click.native="show_work = true"
                >上班时间{{ work }}</van-button
            >
            <DatetimePicker
                v-model="show_work"
                type="time"
                :time="work"
                :minHour="9"
                :maxHour="18"
                @confirm="value => confirm(value, 'work')"
            ></DatetimePicker>
        </template>

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
                        type 类型 , datetime年月日时分 | date年月日 |
                        year-month年月 | time时分
                    </li>
                    <li>
                        minDate 最小时间 , 时间格式 默认 new Date('2010/01/01
                        00:00')
                    </li>
                    <li>
                        maxDate 最大时间 , 时间格式 默认 new Date('2036/12/31
                        23:59')
                    </li>
                    <li>
                        minHour 最小小时, 只针对type=time有效 默认0
                    </li>
                    <li>
                        maxHour 最大小时, 只针对type=time有效 默认23
                    </li>
                    <li>
                        minMinute 最小分钟, 只针对type=time有效 默认0
                    </li>
                    <li>
                        maxMinute 最大分钟, 只针对type=time有效 默认59
                    </li>
                </ul>
                <div class="label">使用说明:</div>
                <p>
                    此组件依赖Vant的Popup, DatetimePicker组件.源码地址<br />XXXXX
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import DatetimePicker from './components/DatetimePicker'
export default {
    data() {
        return {
            show_datetime: false,
            datetime: '2019-04-25 16:28',

            show_date: false,
            date: '2019-04-25',

            show_year_month: false,
            year_month: '2019-04',

            show_time: false,
            time: '16:28',

            show_work: false,
            work: '09:00'
        }
    },
    components: { DatetimePicker },
    methods: {
        confirm(value, Attribute) {
            this.$toast(`选中值为----${value}`)
            this[Attribute] = value
        }
    },
    created() {
        this.datetime = this.$GetDateTime(new Date(), 'Y-m-d h:i')
        this.date = this.$GetDateTime(new Date(), 'Y-m-d')
        this.year_month = this.$GetDateTime(new Date(), 'Y-m')
        this.time = this.$GetDateTime(new Date(), 'h:i')
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
