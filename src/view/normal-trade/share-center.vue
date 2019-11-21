<template lang="pug">
    div.centerheader
        Tabs.tabs(type="card")
            TabPane(label="申购委托") 
                tab-table(:type="2" :tabHeight="tHeight")
            TabPane(label="新股配号") 
                tab-table(:type="3" :tabHeight="tHeight")
            TabPane(label="中签查询") 
                tab-table(:type="4" :tabHeight="tHeight")
            TabPane(label="资金监控") 
                tab-table(:type="5" :tabHeight="tHeight")
            
        Form.formControl(label-position="left" :label-width="70")
            FormItem.form-item(label="产品信息")
                Select.select(v-model="model1")
                    Option(v-for="item in products" :value="item.value" :key="item.value") {{item.value}}
            FormItem.form-item(label="资产单元")
                Select.select(v-model="model2")
                    Option(v-for="item in productsFactory" :value="item.value" :key="item.value") {{item.value}}
            FormItem.form-item
                Button(type="primary") 查询
        div.clear
</template>

<script>
    import tabTable from '@/view/common-widget/tab-table';
    import {buysell} from '@/api';
    import {mapGetters} from 'vuex';
    export default {
        name: 'ShareCenter',
        components: {tabTable},
        data() {
            return {
                model1: '',
                model2: '',
                tHeight: 170,
                products: [
                    {
                        value: '兴业基金一号'
                    }, {
                        value: '兴业基金二号'
                    }, {
                        value: '兴业基金三号'
                    }, {
                        value: '兴业基金四号'
                    }
                ],
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
                // 申购委托
                columns1: [
                    {
                        title: '合同号',
                        key: 'hth',
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
                        title: '申购数量',
                        key: 'sgsl',
                        width: 120  
                    }, 
                    {
                        title: '撤单数量',
                        key: 'cdsl',
                        width: 120    
                    }, 
                    {
                        title: '错误信息',
                        key: 'cwxx',
                        width: 120    
                    }, 
                    {
                        title: '委托状态',
                        key: 'wtzt',
                        width: 130   
                    }, 
                    {
                        title: '订单状态',
                        key: 'ddzt',
                        width: 100
                    }
                ],

                // 新股配号
                columns2: [
                    {
                        title: '日期',
                        key: 'rq',
                        width: 80,
                    }, 
                    {
                        title: '产品信息',
                        key: 'cpxx',
                        width: 100
                    }, 
                    {
                        title: '资产单元',
                        key: 'zcdd',
                        width: 100  
                    }, 
                    {
                        title: '交易所',
                        key: 'jys',
                        width: 100    
                    }, 
                    {
                        title: '证券代码',
                        key: 'zqdm',
                        width: 100
                    }, 
                    {
                        title: '证券名称',
                        key: 'zqmc',
                        width: 100     
                    }, 
                    {
                        title: '成交笔数',
                        key: 'cjbs',
                        width: 100   
                    }, 
                    {
                        title: '起始配号',
                        key: 'qsph',
                        width: 120  
                    }
                ],

                // 中签查询
                columns3: [
                    {
                        title: '合同号',
                        key: 'hth',
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
                        title: '证券代码',
                        key: 'zqdm',
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
                        title: '申购数量',
                        key: 'sgsl',
                        width: 120  
                    }, 
                    {
                        title: '中签数量',
                        key: 'zqsl',
                        width: 100    
                    }, 
                    {
                        title: '中签应付款',
                        key: 'zqyfk',
                        width: 120  
                    }
                ],

                // 资金监控
                columns4: [
                    {
                        title: '产品信息',
                        key: 'cpxx',
                        width: 130
                    }, 
                    {
                        title: '资产单元',
                        key: 'zcdy',
                        width: 130   
                    }, 
                    {
                        title: '中签应付款',
                        key: 'zqyfk',
                        width: 120  
                    }, 
                    {
                        title: '资金可用',
                        key: 'zjky',
                        width: 120  
                    }, 
                    {
                        title: '资金缺口',
                        key: 'zjqk',
                        width: 120  
                    }, 
                    {
                        title: ' ',
                        key: ' ',
                        // width: 120  
                    }
                ],

                // 申购委托测试数据
                dataOneList: [],
            };
        },

        computed: {
            ...mapGetters(['oneList'])
        },
        
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                buysell.getOneList({}, res => {
                    this.dataOneList = res.data;
                    // console.log(this.dataOneList)
                });
            },
        }
    };
</script>

<style lang="stylus">
    .centerheader
        z-index 222
        margin-bottom: 30px
        .tabs
            .modifyelement1 .ivu-table-tip
                height 200px
        .formControl
            margin 10px 20px
            .form-item
                margin-bottom 5px
                margin-right 35px
                float left
                .select
                    width 200px
                Button
                    width 60px
                    margin-right 20px
    .clear
        clear both
                
</style>
