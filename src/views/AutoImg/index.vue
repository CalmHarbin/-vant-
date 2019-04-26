<template>
    <div class="index">
        <div class="cell">原始比例 1036 x 484</div>
        <img
            src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202"
            alt=""
        />

        <div class="cell">100 x 100</div>
        <AutoImg
            url="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202"
            width="100px"
            height="100px"
        />

        <div class="cell">calc(100% - 50px) x calc(30vh - 50px)</div>
        <AutoImg
            url="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202"
            width="calc(100% - 50px)"
            height="calc(30vh - 50px)"
        />

        <div class="cell">200 x 100</div>
        <AutoImg
            url="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202"
            width="200px"
            height="100px"
        />

        <div class="cell">150 x 100</div>
        <AutoImg
            url="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202"
            width="150px"
            height="100px"
        />

        <div style="padding: 0 15px">
            <div class="label">组件说明:</div>
            <ul>
                <li>
                    url: 图片地址
                </li>
                <li>
                    width: 要显示的宽度, 可传任意css支持的单位, 例如 px | vw | %
                    | vh | calc(100% - 20px) 等
                </li>
                <li>
                    height: 要显示的宽度, 可取单位 同width
                </li>
            </ul>
            <div class="label">使用说明:</div>
            <p>此组件不依赖Vant,可直接使用.源码地址<br />XXXXX</p>
        </div>
    </div>
</template>

<script>
import AutoImg from './components/AutoImg'
export default {
    data() {
        return {}
    },
    components: { AutoImg }
}
</script>

<style lang="scss" scoped>
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
.imgWrap {
    margin: 0 auto;
}
</style>
