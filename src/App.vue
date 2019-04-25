<template>
    <div id="app">
        <keep-alive>
            <router-view
                v-if="$route.meta.keepAlive"
                v-wechat-title="$route.meta.title"
            ></router-view>
        </keep-alive>
        <router-view
            v-if="!$route.meta.keepAlive"
            v-wechat-title="$route.meta.title"
        ></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
/* prettier-ignore */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,span,i,a,p,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td,table,header,footer,nav,aside{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
img {
    vertical-align: middle;
    max-width: 100%;
    height: auto;
    border: none;
}
body {
    width: 100%;
    overflow-x: hidden;
    font-size: 14px;
    min-height: 100vh;
    background-color: #f5f5f5;
    color: #333;
    -webkit-overflow-scrolling: touch;
}
#app {
    min-height: calc(100% + 1px);
}
/* prettier-ignore */
ul, li, ol {
	list-style: none;
}
/* prettier-ignore */
h1, h2, h3, h4, h5, h6 {
	font-weight: 500;
}
a {
    text-decoration: none;
}
a:hover {
    text-decoration: none;
}
.none {
    display: none !important;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ellipsis2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.ellipsis3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.click_active:active {
    background-color: #f2f3f5 !important;
}
img.arrow {
    width: 0.22rem;
}
.arrow_left {
    transform: rotate(90deg);
}
.arrow_top {
    transform: rotate(180deg);
}
.arrow_right {
    transform: rotate(-90deg);
}
.cell {
    background-color: #fff;
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
}
</style>
