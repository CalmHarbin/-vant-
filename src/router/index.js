import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config/index'

Vue.use(Router)

const AutoForm = [
    {
        path: '/AutoForm',
        name: 'AutoForm',
        component: () => import('@/views/AutoForm/index'),
        meta: {
            title: '自动表单', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const GoTop = [
    {
        path: '/GoTop',
        name: 'GoTop',
        component: () => import('@/views/GoTop/index'),
        meta: {
            title: '置顶', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const Search = [
    {
        path: '/Search',
        name: 'Search',
        component: () => import('@/views/Search/index'),
        meta: {
            title: '搜索框', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const Upload = [
    {
        path: '/Upload',
        name: 'Upload',
        component: () => import('@/views/Upload/index'),
        meta: {
            title: '附件上传', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const AutoImg = [
    {
        path: '/AutoImg',
        name: 'AutoImg',
        component: () => import('@/views/AutoImg/index'),
        meta: {
            title: '图片自适应', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const Feedback = [
    {
        path: '/Feedback',
        name: 'Feedback',
        component: () => import('@/views/Feedback/index'),
        meta: {
            title: '操作反馈', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const Actionsheet = [
    {
        path: '/Actionsheet',
        name: 'Actionsheet',
        component: () => import('@/views/Actionsheet/index'),
        meta: {
            title: '上拉菜单', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const DatetimePicker = [
    {
        path: '/DatetimePicker',
        name: 'DatetimePicker',
        component: () => import('@/views/DatetimePicker/index'),
        meta: {
            title: '时间选择器', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

const Infinitescroll = [
    {
        path: '/Infinitescroll',
        name: 'Infinitescroll',
        component: () => import('@/views/InfiniteScroll/index'),
        meta: {
            title: '下拉刷新', // 标题设置在这里
            keepAlive: false //是否缓存当前页面
        }
    }
]

export default new Router({
    // mode: 'history',
    base: config.routeUrl,
    routes: [
        ...AutoForm,
        ...GoTop,
        ...Search,
        ...Upload,
        ...AutoImg,
        ...Feedback,
        ...Actionsheet,
        ...DatetimePicker,
        ...Infinitescroll,
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index'),
            meta: {
                title: 'demo演示', // 标题设置在这里
                keepAlive: false //是否缓存当前页面
            }
        },
        {
            path: '*',
            name: '404',
            component: () => import('@/views/404'),
            meta: {
                title: '404', // 标题设置在这里
                keepAlive: false //是否缓存当前页面
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
