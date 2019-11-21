<--大宗交易 成交列表 -->
<template lang="pug">
    .mainContent
        .operateContainer
            .leftOperate
                Button.btn(type="warning" size="small" @click="socketTest") 刷新
                RadioGroup(v-model="mType")
                    Radio(label="全部")
                    Radio(label="成交")
                    Radio(label="撤单")
            .rightOperate
                CheckboxGroup(v-model="mTypeArr")
                    Checkbox(label="按合约汇总")
                    Checkbox(label="按指令发送员")
        .tableContainer
            pl-table.mediumPlTable(
                :datas="pageData"
                big-data-checkbox
                ref="entrustTable"
                header-drag-style
                use-virtual
                :row-height="50"
                :pagination-show="false"
                @sort-change="sortChange"
            )
                pl-table-column(type="selection" width="39" :fixed="true")
                pl-table-column(
                    v-for="item in tableColumns"
                    :key="item.id"
                    :sortable="item.sortable"
                    :resizable="item.resizable"
                    :show-overflow-tooltip="item.showOverflowTooltip"
                    :prop="item.prop"
                    :label="item.label"
                    :fixed="item.fixed"
                    :width="item.width"
                )
        Page.mediumPage(size="small" :current.sync="currentPgNum" :total="totalPgNum" :page-size="10" show-elevator @on-change="changeForPgNum")
</template>

<script>
    import {buysell} from '@/api';
    import {arrDescSort,arrAscSort} from '@/util';
    import {mapGetters} from 'vuex';
    export default {
        name: 'StapleDeal',
        data() {
            return {
                mType: '全部',
                mTypeArr: [],
                tableLoading: false,
                tableResult: [],
                pageSize: 10, // 页面量
                currentPgNum: 1, // 当前页数
                totalPgNum: 0, // 总页数
                pageData: [], // 页面数据
                sortInfoArr: [], // 排序信息
                tableColumns: [
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
                        width: 100,
                        showOverflowTooltip: true,
                        align: 'center',
                        sortable: true
                    },
                    {
                        label: '证券名称',
                        prop: 'zqmc',
                        width: 140,
                        showOverflowTooltip: true,
                        align: 'center'
                    },
                    {
                        label: '买卖方向',
                        prop: 'mmfx',
                        width: 100,
                        showOverflowTooltip: true,
                        align: 'center'
                    },
                    {
                        label: '开平',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '投保',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '价格类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '报单价格',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '成交均价',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '成交数量',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '成交金额',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '撤单数量',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '成交比例',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '交易所',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '委托类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '委托批号',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '篮子编号',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '算法ID',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: 'FixId',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '错误信息',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '备注',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '币种',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '成交属性',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '投资建议提出时间',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 170,
                    },
                    {
                        label: '投资顾问交易员',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 150,
                    },
                    {
                        label: '投资顾问交易员姓名',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 170,
                    },
                    {
                        label: '审核时间',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '审核人',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '审核人名称',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '交易员',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '交易员姓名',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '业务类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '子业务类型',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: 'Book',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    },
                    {
                        label: '转发UUID',
                        prop: 'kp',
                        align: 'center',
                        showOverflowTooltip: true,
                        width: 100,
                    }
                ],
            };
        },
        computed: {
            ...mapGetters(['holdList'])
        },
        watch: {
            holdList: {
                handler(newArr) {
                    let tempList = [...newArr];
                    const listNum = this.pageSize * this.hPageNum; 
                    if(this.holdSortInfo) {
                        if('asc' === this.holdSortInfo.order) {
                            tempList.sort(arrAscSort(this.holdSortInfo.key));
                        }else if('desc' === this.holdSortInfo.order) {
                            tempList.sort(arrDescSort(this.holdSortInfo.key));
                        }
                    }
                    if(listNum < tempList.length) {
                        this.holdTableData = tempList.slice(0, this.pageSize * this.hPageNum);
                    }else {
                        this.holdTableData = tempList;
                    }
                    this.tableLoading = false;
                }
            },
        },
        mounted() {
            this.initData();
        },
        methods: {
            // 数据初始化
            initData() {
                this.tableLoading = true;
                buysell.getList({}, res => {
                    this.tableResult = res.data;
                    this.totalPgNum = this.tableResult ? this.tableResult.length : 0;
                    this.changeForPgNum(this.currentPgNum);
                    this.tableLoading = false;
                });
            },
            purchase() {
                console.log('按钮事件监听。。。');
            },
            // 排序监听
            sortChange(columns,key,order) {
                console.log('排序改变监听------');
            },
            socketTest(res){
                this.$sendWebSocketInfo('推送消息！！！123');
            },
            // 分页
            changeForPgNum(p) {
                let tempResult = [...this.tableResult];
                this.pageData = [];
                const startIndex = this.pageSize * (p - 1);
                const endIndex = this.totalPgNum > this.pageSize * p ? this.pageSize * p : this.totalPgNum;
                let j = 0;
                for(let i = startIndex; i < endIndex; i++) {
                    this.pageData[j++] = this.tableResult[i];
                }
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .mainContent
        height 100%
        width 100%
        .tableContainer
            height 300px
            width 100%
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

