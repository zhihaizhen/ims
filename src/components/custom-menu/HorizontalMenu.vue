<template lang="pug">
    Menu(ref="horMenus" theme="light" mode="horizontal" :active-name="actName")
        HorMenuItem(:menuArr="slider[0].children")
</template>

<script>
    import {mapGetters} from 'vuex';
    import HorMenuItem from './HorMenuItem.vue';
    export default {
        components: {
            HorMenuItem
        },
        data() {
            return {
                actName: '', // 当前激活菜单
            };
        },
        computed: {
            ...mapGetters(['slider'])
        },
        watch: {
            $route: {
                handler(newVal) {
                    this.actName = newVal.name;
                    this.$nextTick(() => {
                        this.$refs.horMenus.updateActiveName();
                    });
                },
                immediate: true
            }
        }
    };
</script>

<style lang="stylus" scoped>

</style>
