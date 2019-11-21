<--委托列表 by zhihaizhen-->
<template lang="pug">
    .mainContent
        .operateContainer
            .leftOperate
                Button.btn(type="warning" size="small" @click="purchase") 刷新
                RadioGroup(v-model="mType")
                    Radio(label="全部")
                    Radio(label="可撤单")
            .rightOperate
                Button(type="warning" size="small" @click="purchase") 撤单
                Button(type="warning" size="small" @click="purchase") 全撤
                Button(type="warning" size="small" @click="purchase") 强制撤单
                Button(type="warning" size="small" @click="purchase") 盘后撤单
        .tableContainer
            pl-table.mediumPlTable(
                :datas="pageData"
                big-data-checkbox
                ref="entrustTable"
                header-drag-style
                use-virtual
                :stripe="true"
                :row-height="30"
                :pagination-show="false"
                @sort-change="sortChange"
                @filter-change="filterChange"
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
                    :filters="item.filters"
                    :column-key="item.prop"
                    filter-placement="bottom-end"
                )
        Page.mediumPage(size="small" :current.sync="currentPgNum" :total="totalPgNum" :page-size="10" show-elevator @on-change="changeForPgNum")
</template>

<script>
    import {buysell} from '@/api';
    import {arrDescSort,arrAscSort} from '@/util';
    import {mapGetters} from 'vuex';
    export default {
        name: 'EntrustTable',
        data() {
            return {
                mType: '全部',
                mTypeArr: [],
                tableLoading: false,
                tableResult: [],
                hisTableResult: [],
                pageSize: 10, // 页面量
                currentPgNum: 1, // 当前页数
                totalPgNum: 0, // 总页数
                pageData: [], // 页面数据
                sortInfo: null, // 排序信息
                filtersArr: [], // 排序信息
                tableColumns: [
                    {
                        id: 'aaa',
                        label: '交易所',
                        prop: 'jys',
                        width: 100,
                        align: 'center',
                        showOverflowTooltip: true,
                        filters: [
                            {
                                text: '包含a',
                                value: 'a'
                            },
                            {
                                text: '包含b',
                                value: 'b'
                            },
                            {
                                text: '包含c',
                                value: 'c'
                            }
                        ]
                    },
                    {
                        id: 'bbb',
                        label: '证券代码',
                        prop: 'zqdm',
                        width: 100,
                        showOverflowTooltip: true,
                        align: 'center',
                        sortable: true
                    },
                    {
                        id: 'ccc',
                        label: '证券名称',
                        prop: 'zqmc',
                        width: 140,
                        showOverflowTooltip: true,
                        align: 'center'
                    },
                    {
                        id: 'ddd',
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
                        sortable: true,
                        filters: [
                            {
                                text: '<30',
                                value: 1
                            },
                            {
                                text: '>=30,<50',
                                value: 2
                            },
                            {
                                text: '>50',
                                value: 3
                            }
                        ]

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
                    this.hisTableResult = [...res.data];
                    this.totalPgNum = this.tableResult ? this.tableResult.length : 0;
                    this.changeForPgNum(this.currentPgNum);
                    this.tableLoading = false;
                });
            },
            purchase() {
                console.log('功能暂未开放！');
            },
            // 排序监听
            sortChange(sortdata) {
                const sortOrder = sortdata.order;
                if(sortOrder) {
                    if(sortOrder === 'ascending') {
                        this.tableResult.sort(arrAscSort(sortdata.prop));
                    }else {
                        this.tableResult.sort(arrDescSort(sortdata.prop));
                    }
                }else {
                    this.tableResult = [...this.hisTableResult];
                }
                this.sortInfo = sortdata;
                this.changeForPgNum(this.currentPgNum);
            },
            // 数据过滤监听
            filterChange(e){
                const columnKey = Object.keys(e)[0];
                const vArr = Object.values(e)[0];
                const fIndex = this.filtersArr.findIndex(item => {
                    return item.key === columnKey;
                });
                if(fIndex > -1) {
                    if(vArr.length > 0) {
                        this.filtersArr[fIndex].value = vArr;
                    }else {
                        this.filtersArr.splice(fIndex,1);
                    }
                }else if(vArr.length > 0){
                    this.filtersArr.push({
                        key: columnKey,
                        value: vArr
                    });
                }
                this.filterHandle();
            },
            // 执行排序操作
            filterHandle() {
                if(this.filtersArr.length > 0){
                    let tempArr = [...this.hisTableResult];
                    this.filtersArr.forEach(item => {
                        const columnKey = item.key;
                        const fArr = item.value;
                        if(fArr.length > 0) {
                            if('kp' === columnKey) {
                                console.log('开平过滤----');
                            }else { // 包含是或关系
                                this.tableResult = tempArr.filter(i => {
                                    const tValue = i[columnKey];
                                    let flag = false;
                                    for(let fValue of fArr) {
                                        if(tValue.indexOf(fValue) > -1) {
                                            flag = true;
                                            break;
                                        }
                                    }
                                    return flag;
                                });
                            }
                        }
                    
                    });
                }else {
                    this.tableResult = [...this.hisTableResult];
                }
                this.totalPgNum = this.tableResult ? this.tableResult.length : 0;
                this.changeForPgNum(this.currentPgNum = 1);
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

