<template lang="pug">
    .shareup
        Form.formControl(label-position="left" :label-width="70")
            FormItem.form-item(label="产品信息")
                Select.select(v-model="model1")
                    Option(v-for="item in productList" :value="item.value" :key="item.value") {{item.value}}
            FormItem.form-item(label="资产单元")
                Select.select(v-model="model2")
                    Option(v-for="item in productList" :value="item.value" :key="item.value") {{item.value}}
            FormItem.form-item
                Button(type="primary") 查询
                Button(type="primary" ) 全额申购
        div.clear
        .tableContainer(:style="styleObj")
            pl-table.smallPlTable(
                :datas="tableResult"
                big-data-checkbox
                :auto-resize="true"
                ref="holdTable"
                header-drag-style
                use-virtual
                :row-height="10"
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
        //- div
        //-     Table.mediumTable(size="small" highlight-row stripe  :columns="columns1" :data="data1" :height="tableHeight" :loading="tableLoading")
            //- Table#modifyelement(stripe :columns="columns1" :data="data1" ref="table" :height="tableHeight" size="small")
</template>

<script>
    import {mapGetters} from 'vuex';
    import {buysell} from '@/api';
    import {arrDescSort,arrAscSort} from '@/util';
    import axios from 'axios';
    export default {
        name: 'ShareUp',
        
        data() {
            return {
                model1: '',
                model2: '',
                productList: [null],
                productsFactory: [
                    {
                        value: '兴业基金一号资产单元'
                    }, {
                        value: '兴业基金二号资产单元'
                    }, {
                        value: '兴业基金三号资产单元'
                    }, {
                        value: '兴业基金四号资产单元'
                    }
                ],

                columns1: [
                    {
                        title: '选择',
                        key: 'xz',
                        width: 80,
                    }, 
                    {
                        title: '产品信息',
                        key: 'cpxx',
                        width: 100
                    }, 
                    {
                        title: '资产单元',
                        key: 'zcdy',
                        width: 100   
                    }, 
                    {
                        title: '交易所',
                        key: 'jys',
                        width: 100   
                    }, 
                    {
                        title: '申购代码',
                        key: 'sgdm',
                        width: 100    
                    }, 
                    {
                        title: '证券名称',
                        key: 'zqmc',
                        width: 100  
                    }, 
                    {
                        title: '申购价格',
                        key: 'sgjg',
                        width: 100   
                    }, 
                    {
                        title: '最小申购数量',
                        key: 'zxsgsl',
                        width: 120  
                    },
                    {
                        title: '最大申购数量',
                        key: 'zdsgsl',
                        width: 120  
                    }, 
                    {
                        title: '按值配售额度',
                        key: 'azpsed',
                        width: 120  
                    }, 
                    {
                        title: '实际可申购数量',
                        key: 'sjksgsl',
                        width: 130  
                    }, 
                    {
                        title: '中签日',
                        key: 'zqr',
                        width: 100 
                    }
                ],

                
                tableResult: [],
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
                    height: '200px'
                }
            };
        },
        computed: {
            ...mapGetters(['holdList'])
        },
        watch: {
            holdList: {
                handler(newArr) {
                    // let tempList = [...newArr];
                }
            },
            tabHeight: {
                handler(newVal) {
                    this.styleObj.height = `${newVal}px`;
                }
            },
        },

        mounted() {
            this.initData();

            var _this = this;
            axios.get('../../api/product.js')
                .then(function(res) {
                    const data = res.data;
                    _this.productList = data.productList;
            });
        },
        methods: {
            // 数据初始化
            initData() {
                buysell.getList({}, res => {
                    this.tableResult = [...res.data];
                    this.hisTableResult = [...res.data];
                });
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
            },
        },
    };
</script>

<style lang="stylus">
    .shareup
        margin-bottom: 30px
        // overflow-y scroll
        .formControl
            .form-item
                margin-bottom 5px
                margin-right 35px
                float left
                .select
                    width 200px
                Button
                    margin-right 20px
        .clear
            clear both
        #modifyelement .ivu-table-tip
            height 200px

        #modifyelement .ivu-table-cell
            padding-left 10px
            padding-right 10px
</style>
