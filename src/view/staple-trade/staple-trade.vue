/**
    大宗交易
    by zhihaizhen
 */
<template lang="pug">
    common-content(@splitChange="changeTableHeight" :splitValue="splitValue")
        .container
            .leftContent
                Tabs(type="card")
                    TabPane(label="委托")
                        tab-table(:type="6")
                    TabPane(label="成交") 
                        tab-table(:type="7")
                    TabPane(label="大宗行情") 
                        tab-table(:type="8")
            .bookContent 
                Row
                    Col(span="11") 
                        bond-pane
                    Col(span="13" offset="0")
                        .formContainer
                            Form(ref="bookForm" :model="bookForm" inline :label-width="80" label-position="left")
                                FormItem(label="产品信息" prop="code" )
                                    Select(v-model="bookForm.xxx" placeholder="请选择产品信息" width="300px")
                                        Option(v-for="item in selectArr" :value="item.value" :key="item.value") {{item.label}}
                                FormItem(label="资产单元" prop="codeName")
                                    Select(v-model="bookForm.codeName" placeholder="请选择资产单元")
                                        Option(v-for="item in selectArr" :value="item.value" :key="item.value") {{item.label}}
                                FormItem(label="投资组合" prop="xxx")
                                    Select(v-model="bookForm.xxx" placeholder="请选择投资组合")
                                        Option(v-for="item in selectArr" :value="item.value" :key="item.value") {{item.label}}
                                FormItem(label="证券代码" prop="sss")
                                    tips-input
                                FormItem(label="买卖方向" prop="xxx")
                                    Select(v-model="bookForm.xxx" placeholder="请选择买卖方向")
                                        Option(v-for="item in selectArr" :value="item.value" :key="item.value") {{item.label}}
                                FormItem(label="指定价格" prop="sort")
                                    Input(type="number" v-model="bookForm.sort" placeholder="请输入指定价格")
                                FormItem(label="市价" prop="sort")
                                    Select(v-model="bookForm.xxx" placeholder="请选择市价")
                                        Option(v-for="item in selectArr" :value="item.value" :key="item.value") {{item.label}}
                                FormItem(label="下单股数" prop="bbb")
                                    Input(type="text" v-model="bookForm.bbb" placeholder="请输入下单股数")
                                FormItem(label="备注信息" prop="ccc")
                                    Input(type="text" v-model="bookForm.ccc" placeholder="请输入备注信息")
                                FormItem(label="可开仓数" prop="ccc") 1000
                                .operateBtnView
                                    Button(type="error" size="small" @click="purchase") 买入
                                    Button(type="primary" size="small" @click="buyTrial") 试算
                                    Button(type="primary" size="small") 重置
</template>

<script>
    import {buysell} from '@/api';
    import commonContent from '_c/common-content';
    import bondPane from '@/view/common-widget/bond-pane';
    import tipsInput from '@/view/common-widget/tips-input';
    import tabTable from '@/view/common-widget/tab-table';
    import {mapActions} from 'vuex';
    export default {
        name: 'BuySell',
        components: {commonContent,tipsInput,bondPane,tabTable},
        data() {
            return {
                splitValue: 0.77,
                holdTableColumns: [
                    {
                        type: 'selection',
                        width: 35,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '交易所',
                        key: 'jys',
                        width: 100,
                        align: 'center',
                        tooltip: true,
                        fixed: 'left',
                        filters: [
                            {
                                label: '交易所1',
                                value: 1
                            },
                            {
                                label: '交易所2',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value,row) {
                            if(value === 1) {
                                return true;
                            }
                            return false;
                        }
                    },
                    {
                        title: '证券代码',
                        key: 'zqdm',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '证券名称',
                        key: 'zqmc',
                        minWidth: 140,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '买卖方向',
                        key: 'mmfx',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '开平',
                        key: 'kp',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                ],
                // 成交
                dealTableColumns: [
                    {
                        type: 'selection',
                        width: 35,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '订单状态',
                        key: 'ddzt',
                        width: 100,
                        align: 'center',
                        tooltip: true,
                        fixed: 'left'
                    },
                    {
                        title: '交易时间',
                        key: 'jysj',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '委托状态',
                        key: 'wtzt',
                        minWidth: 140,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '合同号',
                        key: 'hth',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '证券代码',
                        key: 'zqdm',
                        minWidth: 140,
                        tooltip: true,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '昨仓',
                        key: 'zc',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '今仓',
                        key: 'jc',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '可平仓',
                        key: 'kpc',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                ],
                tableHeight: 300,
                tableLoading: false,
                mType: '全部',
                mTypeArr: [],
                bookForm: {},
                selectArr: [
                    {
                        value: 1,
                        label: '选项一'
                    },
                    {
                        value: 2,
                        label: '选项二'
                    },
                    {
                        value: 3,
                        label: '选项三'
                    },
                ],
                tableResult: [],
                pageSize: 9, // 页面量
                currentPgNum: 1, // 当前页数
                totalPgNum: 0, // 总页数
                pageData: [], // 页面数据
            };
        },
        computed: {
            //
        },
        mounted(){
            this.initData();
            const h = (window.innerHeight - 100) * this.splitValue - 110;
            this.tableHeight = h;
        },
        methods: {
            ...mapActions(['setWsMethod']),
            initData() {
                this.tableLoading = true;
                buysell.getList({}, res => {
                    this.tableResult = res.data;
                    this.totalPgNum = this.tableResult ? this.tableResult.length : 0;
                    if(this.totalPgNum > 0) {
                        const cPgNum = this.totalPgNum > this.pageSize ? this.pageSize : this.totalPgNum;
                        for(let i = 0; i < cPgNum; i++){
                            this.pageData.push(this.tableResult[i]);
                        }
                    }
                    this.tableLoading = false;
                });
            },
            // 翻页
            changePgNum(p) {
                this.pageData = [];
                const startIndex = this.pageSize * (p - 1) + 1;
                const totalSize = this.totalPgNum > this.pageSize * p ? this.pageSize * p : this.totalPgNum;
                for(let i = startIndex; i <= totalSize; i++) {
                    this.pageData.push(this.tableResult[i]);
                }
            },
            // 排序监听
            holdColumnsSort(columns,key,order) {
                console.log('排序-----');
                // TODO
            },
            // 列表高度动态改变
            changeTableHeight(h){
                this.tableHeight = h - 110;
            },
            updateHoldList() {
                this.setWsMethod({value: 'updateHoldList',ts: new Date()});
            },
            purchase() {
                alert('买入-----');
            },
            buyTrial() {
                alert('试算-----');
            }
        },

    };
</script>

<style lang="stylus" scoped>
    .container
        width 100%
        height 100%
        display flex
        padding 0 0 0 2px
        .leftContent
            width calc(100% - 550px)
            .operateContainer
                width 100%
                line-height 30px
                display flex
                align-items center
                .leftOperate
                    flex 1
                    display flex
                    justify-content flex-start
                    .btn
                        margin 5px 20px 0 0
                .rightOperate
                    flex 1
                    display flex
                    justify-content space-around
</style>
