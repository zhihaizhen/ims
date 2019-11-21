/**
    证券大盘
    by zhihaizhen
 */
<template lang="pug">
    .bondContainer
        .bondType
            RadioGroup(v-model="bondType" type="button")
                Radio(label="证券名称")
                Radio(label="证券代码")
                Radio(label="交易所")
            RadioGroup(v-model="bondType" type="button")
                Radio(label="涨跌")
                Radio(label="当前市价")
                Radio(label="涨跌幅")
        .splitLine
        .bondTable 
            ul
                li(v-for="item in bondTestList" :key="item.name") 
                    span.name(:class="[item.type? 'redNm' : 'greenNm']") {{item.name}}
                    span.num1 {{item.value}}
                    span.num2 {{item.value2}}
        .splitLine
        .bottomPane
            ul
                li 
                    span 今开   10000
                li 
                    span 涨停   99991
            ul
                li 
                    span 昨收   10000
                li 
                    span 跌停   10000
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'BondPane',
        data() {
            return {
                bondType: '证券名称',
                bondTestList: [
                    {
                        name: '卖五',
                        value: 98.25,
                        value2: 98.25,
                        type: 0
                    },
                    {
                        name: '卖四',
                        value: 98.24,
                        value2: 98.25,
                        type: 0
                    },
                    {
                        name: '卖三',
                        value: 98.23,
                        value2: 98.25,
                        type: 0
                    },
                    {
                        name: '卖二',
                        value: 98.22,
                        value2: 98.25,
                        type: 0
                    },
                    {
                        name: '卖一',
                        value: 98.21,
                        value2: 98.25,
                        type: 0
                    },
                    {
                        name: '买一',
                        value: 98.11,
                        value2: 98.25,
                        type: 1
                    },
                    {
                        name: '买二',
                        value: 98.12,
                        value2: 98.25,
                        type: 1
                    },
                    {
                        name: '买三',
                        value: 98.13,
                        value2: 98.25,
                        type: 1
                    },
                    {
                        name: '买四',
                        value: 98.14,
                        value2: 98.25,
                        type: 1
                    },
                    {
                        name: '买五',
                        value: 98.15,
                        value2: 98.25,
                        type: 1
                    },
                ]

            };
        },
        computed: {
            ...mapGetters(['onTickInfo'])
        },
        methods: {
            //
        },
    };
</script>

<style lang="stylus" scoped>
    .bondContainer
        width 100%
        height 400px
        border 1px solid #D3D3D3
        border-radius 2px
        padding 5px 5px 5px 5px
        text-align center
        .ivu-radio-group-button .ivu-radio-wrapper
            width 75px
            margin 2px
        .bondTable
            ul
                li
                    display flex
                    justify-content space-around
                    line-height 25px
                    &:hover
                        background-color #DCDCDC
                .name
                    font-weight 600 
                .greenNm
                    color #7CFC00
                .redNm
                    color #FF0000
                .num1
                    color green 
        .bottomPane
            width 100%
            ul
                display flex
                justify-content space-around
        .splitLine
            width 100%
            height 2px
            margin 5px 0 5px 0
            background linear-gradient(90deg,rgba(17,36,80,0) 0%,rgba(0,233,255,1) 52%,rgba(17,36,80,0) 100%)
</style>
