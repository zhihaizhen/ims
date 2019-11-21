<template lang="pug">
    .menu-wrapper
        template(v-for="item in menuArr")
            Submenu(:name="item.code" v-if="item.children && item.children.length > 0")
                template(slot="title")
                    span {{item.name}}
                MenuItem(v-for="ite in item.children" 
                        :key="ite.code" 
                        :name="ite.code" 
                        :to="ite.path") {{ite.name}}
            MenuItem(:name="item.code" :to="item.path" v-else) {{item.name}}
</template>

<script>
    import config from '@/config/index';
    export default {
        name: 'HorMenuItem',
        props: {
            menuArr: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
        methods: {
            //
        },
    };
</script>

<style lang="stylus" scoped>

</style>
