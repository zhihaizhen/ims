/** 
    历史持仓
*/
<template lang="pug">
    common-content(@splitChange="changeTableHeight" :splitValue="splitValue")
        .queryContainer
            .tableContainer(:style="styleObj")
                pl-table.mediumPlTable(
                    :datas="pageData"
                    big-data-checkbox
                    :auto-resize="true"
                    header-drag-style
                    :pagination-show="false"
                    @sort-change="sortChange"
                    @filter-change="filterChange"
                )
                    pl-table-column(
                        v-for="item in tableColumns"
                        :key="item.id"
                        :sortable="item.sortable"
                        :resizable="item.resizable"
                        :show-overflow-tooltip="item.showOverflowTooltip"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :filters="item.filters"
                        :column-key="item.prop"
                        filter-placement="bottom-end"
                    )
                Page.mediumPage(size="small" :current.sync="currentPgNum" :total="totalPgNum" :page-size="10" show-elevator @on-change="changePgNum")
            .formContainer(:style="formStyle")
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
                    FormItem(label="交易市场" prop="codeName")
                        Select(v-model="bookForm.codeName" placeholder="请选择交易市场")
                            Option(v-for="item in selectArr" :value="item.value" :key="item.value") {{item.label}}
                    FormItem(label="证券代码" prop="sss")
                        tips-input
                    FormItem(label="开始日期" prop="startTime" style="width:265px")
                        DatePicker(format="yyyy-MM-dd HH:mm:ss" type="datetime" :options="startTimeOptions" @on-change="startTimeChange" placeholder="开始时间" v-model="starttime")
                    FormItem(label="结束日期" prop="endTime" style="width:265px")
                        DatePicker(format="yyyy-MM-dd HH:mm:ss" type="datetime" :options="endTimeOptions" @on-change="endTimeChange" placeholder="结束时间" v-model="endtime")
                .operateBtnView
                    Button(type="error" size="small" @click="purchase") 查询
                    Button(type="primary" size="small" @click="buyTrial") 导出
                    Button(type="primary" size="small") 重置
</template>

<script>
    import {buysell} from '@/api';
    import commonContent from '_c/common-content';
    export default {
        name: 'HistoryHold',
        components: {commonContent},
        data() {
            return {
                splitValue: 0.77,
                startTimeOptions: {}, // 开始日期设置
                endTimeOptions: {}, // 结束日期设置
                starttime: '', // 开始日期model
                endtime: '',// 结束日期model

                holdTableColumns: [
                    {
                        title: '产品信息',
                        key: 'cpxx',
                        width: 100,
                        align: 'center',
                        tooltip: true,
                        fixed: 'left'
                    },
                    {
                        title: '资产单元',
                        key: 'zcdy',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '投资组合',
                        key: 'tzzh',
                        minWidth: 140,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '证券代码',
                        key: 'zqdm',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '证券名称',
                        key: 'zqmc',
                        minWidth: 140,
                        tooltip: true,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '币种',
                        key: 'bz',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '交易市场',
                        key: 'jysc',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '市场代码',
                        key: 'scdm',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '发生日期',
                        key: 'fsrq',
                        width: 100,
                        align: 'center',
                        tooltip: true,
                    },
                    {
                        title: '发生时间',
                        key: 'fssj',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '持仓数量',
                        key: 'ccsl',
                        minWidth: 140,
                        tooltip: true,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '持仓成本',
                        key: 'cccb',
                        minWidth: 100,
                        tooltip: true,
                        align: 'center'
                    },
                    {
                        title: '成本',
                        key: 'cb',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '持仓市值',
                        key: 'ccsz',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '实现盈亏',
                        key: 'sxyk',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '浮动盈亏',
                        key: 'fdyk',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '浮动率',
                        key: 'fdl',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '成本/净资产',
                        key: 'cbjzc',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '盈亏金额',
                        key: 'ykje',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                    {
                        title: '摊薄成本',
                        key: 'tbcb',
                        align: 'center',
                        tooltip: true,
                        minWidth: 100,
                    },
                ],
                tableHeight: 300,
                tableLoading: false,
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
                pageSize: 10, // 页面量
                currentPgNum: 1, // 当前页数
                totalPgNum: 0, // 总页数
                pageData: [], // 页面数据

                sortInfoArr: [], // 排序信息
                filtersArr: [], // 筛选信息
                tableColumns: [
                    {
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
                styleObj: {
                    height: '380px'
                },
                mType: '全部',
                mTypeArr: [],
                bookForm: {},
                formStyle: {
                    height: '400px'
                }
            };
        },
        watch: {
            // 结束时间范围
            'bookForm.startTime': function(val) {
                this.endTimeOptions = {
                    disabledDate: date => {
                        return date && date.valueOf() < new Date(this.bookForm.startTime).getTime() + 86400000;
                    }
                };
            }
        },
        mounted(){
            this.initData();
            const h = (window.innerHeight - 100) * this.splitValue - 40;
            this.heightListen(h);
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
            changeTableHeight(h){
                this.heightListen(h - 40);
            },
            // 高度监听
            heightListen(h) {
                this.tableHeight = h;
                this.formStyle.height = `${h}px`; 
            },

            startTimeChange(e) { // 设置开始时间
                this.starttime = e;
                this.endTimeOptions = {
                    disabledDate: date => {
                        let startTime = this.starttime ? new Date(this.starttime).valueOf() : '';
                        return date && (date.valueOf() < startTime);
                    }
                };
            },
            endTimeChange: function(e) { // 设置结束时间
                this.endtime = e;
                let endTime = this.endtime ? new Date(this.endtime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
                this.startTimeOptions = {
                    disabledDate(date) {
                        return date && date.valueOf() > endTime;
                    }
                };
            },
        },

    };
</script>

<style lang="stylus" scoped>
   
</style>
