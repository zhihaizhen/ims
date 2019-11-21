/**
    买卖
    by zhihaizhen
 */
<template lang="pug">
    common-content(:splitValue="splitValue" @splitChange="changeTableHeight")
        .container
            .leftContent
                Tabs(type="card")
                    TabPane(label="委托")
                        tab-table(:type="0")
                    TabPane(label="成交") 
                        tab-table(:type="1")
            .bookContent 
                Row
                    Col(span="11") 
                        bond-pane
                    Col(span="13" offset="0")
                        .formContainer
                            Form(ref="bookForm" :model="bookForm" inline :label-width="80" label-position="left")
                                FormItem(label="产品信息" prop="project" )
                                    Select(v-model="bookForm.project" transfer=true placeholder="请选择产品信息" width="300px")
                                        Option(v-for="item in projectDic" :value="item.value" :key="item.value") {{item.lable}}
                                FormItem(label="资产单元" prop="assets")
                                    Select(v-model="bookForm.assets" transfer=true placeholder="请选择资产单元")
                                        Option(v-for="item in assetsDic" :value="item.value" :key="item.value") {{item.lable}}
                                FormItem(label="投资组合" prop="combin")
                                    Select(v-model="bookForm.combin" transfer=true placeholder="请选择投资组合")
                                        Option(v-for="item in combinDic" :value="item.value" :key="item.value") {{item.lable}}
                                FormItem(label="证券代码" prop="instrumentID")
                                    //- tips-input
                                    Select(v-model="bookForm.instrumentID" filterable)
                                        Option(v-for="item in instrumentIDArr" :value="item" :key="item") {{item}}
                                FormItem(label="买卖方向" prop="entrustBs")
                                    Select(v-model="bookForm.entrustBs" transfer=true placeholder="请选择买卖方向")
                                        Option(v-for="item in entrustBsDic" :value="item.value" :key="item.value") {{item.lable}}
                                FormItem(label="指定价格" prop="entrustPrice")
                                    Input(type="number" v-model="bookForm.entrustPrice" placeholder="请输入指定价格")
                                FormItem(label="市价" prop="entrustProp")
                                    Select(v-model="bookForm.entrustProp" transfer=true placeholder="请选择市价")
                                        Option(v-for="item in entrustPropDic" :value="item.value" :key="item.value") {{item.lable}}
                                FormItem(label="下单股数" prop="num"  width="100")
                                    Input.inputappend(type="text" v-model="bookForm.num" placeholder="请输入下单股数")
                                        span(slot="append") 张
                                FormItem(label="备注信息" prop="remark")
                                    Input(type="text" v-model="bookForm.remark" placeholder="请输入备注信息")
                                FormItem(label="可开仓数" ) 1000
                                .operateBtnView
                                    Button(type="error" size="small" @click="purchase") 买入
                                    Button(type="primary" size="small" @click="purchase") 试算
                                    Button(type="primary" size="small" @click="resetForm") 重置
</template>

<script>
    import {buysell} from '@/api';
    import {arrDescSort,arrAscSort} from '@/util';
    import commonContent from '_c/common-content';
    import bondPane from '@/view/common-widget/bond-pane';
    import tipsInput from '@/view/common-widget/tips-input';
    import tabTable from '@/view/common-widget/tab-table';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        name: 'BuySell',
        components: {commonContent,tabTable,tipsInput,bondPane},
        data() {
            return {
                splitValue: 0.77,
                entrustTableColumns: [
                    {
                        label: '交易所',
                        prop: 'jys',
                        width: 100,
                        align: 'center',
                        showOverflowTooltip: true,
                    },
                    {
                        label: '证券代码',
                        prop: 'zqdm',
                        minWidth: 100,
                        showOverflowTooltip: true,
                        align: 'center',
                        sortable: true
                    },
                    {
                        label: '证券名称',
                        prop: 'zqmc',
                        minWidth: 140,
                        showOverflowTooltip: true,
                        align: 'center'
                    },
                    {
                        label: '买卖方向',
                        prop: 'mmfx',
                        minWidth: 100,
                        showOverflowTooltip: true,
                        align: 'center'
                    },
                    {
                        label: '开平',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '投保',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '价格类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '报单价格',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '成交均价',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '成交数量',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '成交金额',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '撤单数量',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '成交比例',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '交易所',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '委托类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '委托批号',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '篮子编号',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '算法ID',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: 'FixId',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '错误信息',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '备注',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '币种',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '成交属性',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '投资建议提出时间',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 170,
                    },
                    {
                        label: '投资顾问交易员',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 150,
                    },
                    {
                        label: '投资顾问交易员姓名',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 170,
                    },
                    {
                        label: '审核时间',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '审核人',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '审核人名称',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '交易员',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '交易员姓名',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '业务类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '子业务类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: 'Book',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    },
                    {
                        label: '转发UUID',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        minWidth: 100,
                    }
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
                bookForm: {
                    project: '',
                    assets: '',
                    combin: '',
                    entrustBs: '',
                    entrustPrice: '',
                    entrustProp: '',
                    num: '',
                    remark: ''
                },
                tableResult: [],
                pageSize: 10, // 页面量
                currentPgNum: 1, // 当前页数
                totalPgNum: 0, // 总页数
                entrustPageData: [], // 页面数据
                enSortInfo: null, // 
                instrumentIDArr: [
                    12345,
                    2222323,
                    234234
                ]
            };
        },
        computed: {
            ...mapGetters(['wsMethod','entrustBsDic','entrustPropDic','projectDic','assetsDic','combinDic'])
        },
        mounted(){
            this.initData();
            this.tableHeight = (window.innerHeight - 100) * this.splitValue - 110;
        },
        methods: {
            initData() {
                this.tableLoading = true;
                buysell.getList({}, res => {
                    this.tableResult = res.data;
                    this.totalPgNum = this.tableResult ? this.tableResult.length : 0;
                    if(this.totalPgNum > 0) {
                        const cPgNum = this.totalPgNum > this.pageSize ? this.pageSize : this.totalPgNum;
                        for(let i = 0; i < cPgNum; i++){
                            this.entrustPageData.push(this.tableResult[i]);
                        }
                    }
                    this.tableLoading = false;
                });
            },
            changeForPgNum(p) { 
                let tempResult = [...this.tableResult];
                this.entrustPageData = [];
                const startIndex = this.pageSize * (p - 1);
                const endIndex = this.totalPgNum > this.pageSize * p ? this.pageSize * p : this.totalPgNum;
                let j = 0;
                for(let i = startIndex; i < endIndex; i++) {
                    this.entrustPageData[j++] = this.tableResult[i];
                }
            },
            updateHoldList() {
                // console.log(this.$testMsg);
                // console.log(this.$testMethod('lalla'));
            },
            subscribe() {
                const testJson = {
                    command: 'Subscribe',
                    msgId: '',
                    msgParam: {
                        instrumentID: '513660',
                        ExchangeType: ''
                    }
                };
                this.$sendWebSocketMsg(testJson);
            },
            unSubscribe() {
                const testJson = {
                    command: 'UnSubscribe',
                    msgId: '123',
                    msgParam: {
                        InstrumentID: '888',
                        ExchangeType: 'sh'
                    }
                };
                this.$sendWebSocketMsg(testJson);
            },
            purchase() {
                alert('功能暂未开放！');
            },
            buyTrial() {
                alert('试算-----');
            },
            socketTest(res){
                this.$sendWebSocketInfo('推送消息！！！');
                // console.log('socket连接状态----',this.$socket.connected);
                // this.$socket.emit('socketTestA','你好，我是前端数据！');
            },
            changeTableHeight(e) {
                //
            },
            resetForm() {
                this.bookForm.project = '';
                this.bookForm.assets = '';
                this.bookForm.combin = '';
                this.bookForm.entrustBs = '';
                this.bookForm.entrustPrice = '';
                this.bookForm.entrustProp = '';
                this.bookForm.num = '';
                this.bookForm.remark = '';
            }
        },
        // sockets: {
        //     socketTestB(res) {
        //         console.log('我已接收到111----',res);
        //     }
        // }
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
            .tableContainer
                height 300px
                width 100%
        .bookContent
            width 550px
</style>
<style lang="stylus">
    .inputappend
        width 156px !important
</style>
