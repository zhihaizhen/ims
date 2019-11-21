<template lang="pug">
    .side-menu-wrapper
        slot
        Menu(ref="verMenus" v-show="!collapsed" theme="light" mode="vertical" width="200" :active-name="activeName" :open-names="openedNames" :accordion="accordion" @on-select="handleSelect")
            template( v-for="item in slider[0].children")
                template(v-if="item.children && item.children.length === 1")
                    ver-menu-item(v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item")
                    menu-item(v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`")
                        common-icon(:type="item.children[0].icon || ''")
                        span {{getTitle(item.children[0])}}
                template(v-else)
                    ver-menu-item(v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item")
                    menu-item(v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`")
                        common-icon(:type="item.icon || ''")
                        span {{getTitle(item)}}
        .menu-collapsed(v-show="collapsed" :list="slider[0].children")
            template(v-for="item in slider[0].children")
                collapsed-menu(v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`")
                Tooltip(transfer v-else :content="getTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`")
                    a(@click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}")
                        common-icon(:size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)")
</template>

<script>
    import {mapGetters} from 'vuex';
    import VerMenuItem from './ver-menu-item.vue';
    import CollapsedMenu from './collapsed-menu.vue';
    import mixin from './mixin';
    import {getUnion} from '@/util';
    export default {
        components: {
            VerMenuItem,CollapsedMenu
        },
        mixins: [ mixin ],
        props: {
            collapsed: {
                type: Boolean,
                default: false
            },
            rootIconSize: {
                type: Number,
                default: 20
            },
            theme: {
                type: String,
                default: 'light'
            },
            iconSize: {
                type: Number,
                default: 16
            },
            accordion: {
                type: Boolean,
                default: true
            },
            activeName: {
                type: String,
                default: ''
            },
            openNames: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                openedNames: [], // 展开菜单
            };
        },
        computed: {
            ...mapGetters(['slider']),
            textColor() {
                return this.theme === 'dark' ? '#fff' : '#495060';
            }
        },
        watch: {
            activeName(name) {
                if(this.accordion){
                    this.openedNames = this.getOpenedNamesByActiveName(name);
                }else {
                    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
                } 
                this.$nextTick(() => {
                    this.$refs.verMenus.updateActiveName();
                });
            },
            openNames(newNames) {
                this.openedNames = newNames;
            },
            openedNames() {
                this.$nextTick(() => {
                    this.$refs.verMenus.updateOpened();
                });
            }
        },
        mounted() {
            this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
        },
        methods: {
            getTitle(obj) {
                return obj.name;
            },
            handleSelect(route) {
                let { name, params, query } = {};
                if(typeof route === 'string'){
                    name = route;
                }else {
                    name = route.name;
                    params = route.params;
                    query = route.query;
                }
                this.$router.push({
                    name,
                    params,
                    query
                });
            },
            getOpenedNamesByActiveName(name) {
                return this.$route.matched.map(item => {
                    return item.name;
                }).filter(item => {
                    return item !== name;
                });
            },
        }
    };
</script>

<style lang="stylus" scoped>
    .side-menu-wrapper
        user-select none
        .menu-collapsed
            padding-top 10px
            .ivu-dropdown
                width 100%
                .ivu-dropdown-rel, a
                    width 100%
            .ivu-tooltip
                width 100%
                .ivu-tooltip-rel
                    width 100%
                .ivu-tooltip-popper, .ivu-tooltip-content    
                    .ivu-tooltip-arrow
                        border-right-color #ffffff
                    .ivu-tooltip-inner
                        background #fff
                        color #495060
        a.drop-menu-a
            display inline-block
            padding 6px 15px
            width 100%
            text-align center
            color #495060
    .menu-title
        padding-left 6px
</style>
