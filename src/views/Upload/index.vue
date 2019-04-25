<!--输入框-->
<template>
    <div class="index">
        <div class="cell">附件预览</div>
        <Upload :files="files_see" :isSee="true"></Upload>

        <div class="cell">附件上传</div>
        <Upload :files="files"></Upload>

        <div class="cell">微信图片上传</div>
        <div style="backgroundColor:#fff;padding:0 8px;">
            <Wxupload :files="wxFiles"></Wxupload>
        </div>

        <div class="cell">微信图片预览</div>
        <div style="backgroundColor:#fff;padding:0 8px;">
            <Wxupload :files="wxFiles" :isSee="true"></Wxupload>
        </div>

        <div class="box">
            <div>
                <div class="label">组件说明:</div>
                <ul>
                    <li>
                        因使用微信sdk,请在微信浏览器中查看该演示
                    </li>
                    <li>
                        组件用法请参考demo以及源码注释
                    </li>
                    <li>
                        附件上传组件 依赖plupload插件以及微信sdk <br />
                        图片上传组件依赖微信sdk
                    </li>
                    <li>
                        组件内调用了接口,请先准备好后相应接口再使用,具体看源码
                    </li>
                </ul>
                <div class="label">使用说明:</div>
                <p>此组件依赖Vant的Icon组件.源码地址<br />XXXXX</p>
            </div>
        </div>
    </div>
</template>

<script>
import Upload from './components/Upload'
import Wxupload from './components/Wxupload'
export default {
    data() {
        return {
            files_see: [
                {
                    type: 2,
                    name: '年度工作.xlsx',
                    size: 46673,
                    src: 'http://www.sunjee.cn:81/年度工作.xlsx'
                },
                {
                    type: 4,
                    name: '会议流程.pdf',
                    size: 757274,
                    src: 'http://www.sunjee.cn:81/会议流程.pdf'
                },
                {
                    type: 5,
                    name: '工作总结.pptx',
                    size: 865134,
                    src: 'http://www.sunjee.cn:81/工作总结.pptx'
                },
                {
                    type: 3,
                    name: '项目启动.docx',
                    size: 141155,
                    src: 'http://www.sunjee.cn:81/项目启动.docx'
                }
            ],
            files: [
                {
                    type: 2,
                    name: '年度工作.xlsx',
                    size: 46673,
                    src: 'http://www.sunjee.cn:81/年度工作.xlsx'
                },
                {
                    type: 4,
                    name: '会议流程.pdf',
                    size: 757274,
                    src: 'http://www.sunjee.cn:81/会议流程.pdf'
                },
                {
                    type: 5,
                    name: '工作总结.pptx',
                    size: 865134,
                    src: 'http://www.sunjee.cn:81/工作总结.pptx'
                },
                {
                    type: 3,
                    name: '项目启动.docx',
                    size: 141155,
                    src: 'http://www.sunjee.cn:81/项目启动.docx'
                }
            ],
            wxFiles: [
                'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202',
                'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202',
                'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202',
                'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202'
            ]
        }
    },
    components: { Upload, Wxupload }
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
