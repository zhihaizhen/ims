<template lang="pug">
    common-content(@splitChange="changeTableHeight")
        ._content-box(style="height:430px")
            p(style="font-weight:600；margin-bottom: 6px;") 新股申购
            Card
                Split(v-model="splitValue" mode="vertical")
                    .topPane(slot="top")
                        share-up
                    .bottomPane(slot="bottom")
                        share-center
</template>

<script>
    // import {mapGetters} from 'vuex';
    import ShareUp from './share-up.vue';
    import ShareCenter from './share-center.vue';
    import commonContent from '_c/common-content';

    export default {
        name: 'NewShare',
        components: {
            ShareUp,ShareCenter,commonContent
        },
        props: {
            splitValue: {
                type: Number,
                default: 0.65
            }
        },
        
       
    };
</script>

<style lang="stylus" scoped>
    .bottomPane
        padding-top 10px
    .ivu-table-header 
        thead 
            tr 
                th
                    height 20px
</style>

<style lang="stylus">
    .commonTable
        .ivu-table-header 
            thead 
                tr 
                    th
                        height 25px
        .ivu-table-tip
            /*三角箭头的颜色*/
            scrollbar-arrow-color: #4F94CD;
            /*滚动条滑块按钮的颜色*/
            scrollbar-face-color: #4F94CD;
            /*滚动条整体颜色*/
            scrollbar-highlight-color: #4F94CD;
            /*滚动条阴影*/
            scrollbar-shadow-color: #4F94CD;
            /*滚动条轨道颜色*/
            scrollbar-track-color: #ffffff;
            /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
            scrollbar-3dlight-color:#EDEDED;
            /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
            scrollbar-darkshadow-color: #EDEDED;
            /*滚动条基准颜色*/
            scrollbar-base-color: #4F94CD;
            &::-webkit-scrollbar
                width: 5px;     
                height: 8px;
            &::-webkit-scrollbar-thumb
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: rgba(79,148,205,1);
            &::-webkit-scrollbar-track
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 0px;
                background: #EDEDED;
</style>

