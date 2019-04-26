//引入配置文件中的资源路径
import vueConfig from '../../vue.config.js'
//配置文件
const config = {
    serverUrl:
        process.env.NODE_ENV === 'development'
            ? ''
            : 'http://wechat.dfd.cn:8084', //服务器地址
    routeUrl: '/MobileWork/AppDefalut', //路由前缀
    staticUrl: vueConfig.publicPath + vueConfig.assetsDir //静态资源
}

export default config
