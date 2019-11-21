/**
    带智能提示的文本输入框
    by zhihaizhen
 */
<template lang="pug">
    .inputContainer
        Input(type="text" v-model="keyValue" placeholder="请输入证券代码" ref="keyValueInput" @on-keyup="inputListen($event)" @on-blur="hideDropDown")
        ul.dropDownView(v-show="showInputDropDown") 
            Spin.spinView(v-if="showLoading" size="large")
            li(v-else v-for="(item,index) in dropDownList" ref="hint" :key="item" :value="item" v-text="item" @click="fillInput(index)" v-cloak)
</template>

<script>
    import {buysell} from '@/api';
    export default {
        name: 'TipsInput',
        data() {
            return {
                showInputDropDown: false,
                showLoading: false,
                activeNo: -1,
                keyValue: '',
                dropDownList: []
            };
        },
        watch: {
            activeNo(newVal){
                if(newVal != -1) {
                    this.dropDownList.forEach((item,i) => {
                        this.$refs.hint[i].style.backgroundColor = '#ffffff';
                    });
                    this.$refs.hint[newVal].style.backgroundColor = '#DDD8E5';
                }
            }
        },
        methods: {
            inputListen(e) {
                let dLength = this.dropDownList.length;
                const kCode = e.keyCode;
                // if(kCode == 40) { // Down键事件
                //     if(this.activeNo >= dLength - 1) { // 划到最后一项了
                //         return;
                //     }
                //     this.activeNo++;
                //     return;
                // }
                // if(kCode == 38) { // Up键事件
                //     if(this.activeNo <= 0) { // 划到第一项了
                //         return; 
                //     }
                //     this.activeNo--;
                //     return;
                // }
                // if(kCode == 13) { // Enter键事件
                //     this.fillInput(this.activeNo);
                // }
                if(!this.keyValue) {
                    this.hideDropDown();
                    return;
                }
                if(kCode !== 40 && kCode !== 38 && kCode != 13) {
                    this.getDropDownList();
                }
                //
            },
            fillInput(index) {
                this.keyValue = this.dropDownList[index];
                this.hideDropDown();
            },
            hideDropDown() {
                setTimeout(() => {
                    this.dropDownList = [];
                    this.showInputDropDown = false;
                    this.activeNo = -1;
                },100);
            },
            getDropDownList() {
                this.showInputDropDown = true;
                this.showLoading = true;
                buysell.getZqdmList({},res => {
                    this.dropDownList = res;
                    this.showLoading = false;
                });
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .dropDownView
        position absolute
        background white
        height 150px
        width 185px
        overflow auto
        z-index 99
        border 1px solid #DDD8E5
        li
            padding-left 10px
            cursor pointer
            line-height 30px
            &:hover
                background #1890ff
                color #ffffff
        .spinView
            margin 60px 0 0 75px
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
