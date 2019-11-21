<template lang="pug">
    keep-alive
        component(:is="tableType" :tabHeight="tabHeight")
</template>

<script>
    import HoldTable from './hold-table.vue';
    import AssetsTable from './assets-table.vue';
    export default {
        name: 'ChildTable',
        components: {
            HoldTable,AssetsTable
        },
        props: {
            type: {
                type: Number,
                required: true
            },
            tabHeight: {
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
                return this.type === 0 ? 'HoldTable' : 'AssetsTable';
            }
        },

    };
</script>

<style lang="stylus" scoped>

</style>
