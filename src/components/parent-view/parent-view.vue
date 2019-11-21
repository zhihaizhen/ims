<template lang="pug">
    keep-alive(:include="cacheList" :exclude="notCacheName")
        router-view(ref="child")
</template>

<script>
    export default {
        name: 'ParentView',
        computed: {
            tagNavList() {
                return this.$store.state.app.tagNavList;
            },
            notCacheName() {
                return [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : ''];
            },
            cacheList() {
                let cacheArr = this.tagNavList.filter(item => {
                    return !(item.meta && item.meta.notCache);
                });
                return ['ParentView', ...this.tagNavList.length ? cacheArr.map(item => {
                    return item.name;
                }) : []];
            }
        },
    };
</script>

<style lang="stylus" scoped>

</style>
