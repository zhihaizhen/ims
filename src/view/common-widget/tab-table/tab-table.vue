<template lang="pug">
    keep-alive
        component(:is="tableType")
</template>

<script>
    // 买卖
    import EntrustTable from './entrust-table.vue';
    import DealTable from './deal-table.vue';

    // 新股申购
    import ShareSgwt from './share-sgwt.vue';
    import ShareXgph from './share-xgph.vue';
    import ShareZjjk from './share-zjjk.vue';
    import ShareZqcx from './share-zqcx.vue';

    // 大宗交易
    import StapleDeal from './staple-deal.vue';
    import StapleEntrust from './staple-entrust.vue';
    import StapleItrade from './staple-itrade.vue';
    export default {
        name: 'TabTable',
        components: {
            EntrustTable,DealTable,ShareSgwt,ShareXgph,ShareZjjk,ShareZqcx,StapleDeal,StapleEntrust,StapleItrade
        },
        props: {
            type: {
                type: Number,
                required: true
            },
        },
        data() {
            return {
                // 
            };
        },

        computed: {
            tableType(){
                if(this.type === 0){
                    return 'EntrustTable';
                }else if(this.type === 1){
                    return 'DealTable';
                }else if(this.type === 2){
                    return 'ShareSgwt';
                }else if(this.type === 3){
                    return 'ShareXgph';
                }else if(this.type === 4){
                    return 'ShareZjjk';
                }else if(this.type === 5){
                    return 'ShareZqcx';
                }else if(this.type === 6){
                    return 'StapleEntrust';
                }else if(this.type === 7){
                    return 'StapleDeal';
                }else if(this.type === 8){
                    return 'StapleItrade';
                }
            }
        },

    };
</script>

<style lang="stylus" scoped>

</style>
