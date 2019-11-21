<template lang="pug">
    ._content-box
        Card 
            Split(ref="splitRef" v-model="sValue" mode="vertical" :max='0' :min='0' @on-move-end='splitListener')
                .topContentPane(ref="splitTop" slot="top" :style="topPaneStyle")
                    slot
                .bottomContentPane(ref="splitBottom" slot="bottom")
                    Tabs.holdAssetsTab(type="card")
                        TabPane(label="持仓")
                            child-table(:type="0" :tabHeight="tHeight")
                        TabPane(label="资金") 
                            child-table(:type="1" :tabHeight="tHeight")
</template>

<script>
    import childTable from './child-table';
    export default {
        name: 'CommonContent',
        components: {childTable},
        props: {
            splitValue: {
                type: Number,
                default: 0.77
            }
        },
        data() {
            return {
                sValue: 0.75,
                tHeight: 100,
                topPaneStyle: {height: '300px'},
            };
        },
        watch: {
            splitValue: {
                handler(newval) {
                    this.sValue = newval;
                }
            }
        },
        mounted() {
            const topPaneHeight = (window.innerHeight - 100) * this.sValue;
            this.topPaneStyle.height = `${topPaneHeight}px`;
            this.splitListener();
        },
        methods: {
            // 分隔板移动监听
            splitListener() {
                const topPaneHeight = (window.innerHeight - 100) * this.sValue;
                // this.topPaneStyle.height = `${topPaneHeight}px`;
                this.tHeight = window.innerHeight - topPaneHeight - 140; 
                // this.$emit('splitChange',topPaneHeight);
            },
        },
    };
</script>

<style lang="stylus" scoped>
  
</style>

