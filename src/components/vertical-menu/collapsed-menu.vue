<template lang="pug">
    Dropdown(ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement")
        a.drop-menu-a( type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}")
            common-icon(:size="rootIconSize" :color="textColor" :type="parentItem.icon")
            span(class="menu-title" v-if="!hideTitle") {{ parentItem.name }}
            Icon(style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16")
        DropdownMenu(ref="dropdown" slot="list" style="width: 120px")
            template(v-for="child in children")
                collapsed-menu(v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`")
                DropdownItem(v-else :key="`drop-${child.name}`" :name="child.code")
                    common-icon(:size="iconSize" :type="child.icon")
                    span(class="menu-title") {{ child.name }}
</template>

<script>
    import mixin from './mixin';
    import itemMixin from './item-mixin';
    import { findNodeUpperByClasses } from '@/util';
    export default {
        name: 'CollapsedMenu',
        mixins: [mixin,itemMixin],
        props: {
            hideTitle: {
                type: Boolean,
                default: false
            },
            rootIconSize: {
                type: Number,
                default: 16
            }
        },
        data() {
            return {
                placement: 'right-end'
            };
        },
        mounted() {
            let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, ['ivu-select-dropdown', 'ivu-dropdown-transfer']);
            if(dropdown) {
                dropdown.style.overflow = 'visible';
            }
        },
        methods: {
            handleClick(name) {
                this.$emit('on-click', name);
            },
            handleMousemove(event, children) {
                const { pageY } = event;
                const height = children.length * 38;
                const isOverflow = pageY + height < window.innerHeight;
                this.placement = isOverflow ? 'right-start' : 'right-end';
            }
        },
    };
</script>

<style lang="stylus" scoped>
    a.drop-menu-a
        display inline-block
        padding 6px 15px
        width 100%
        text-align center
        color #495060
    .collased-menu-dropdown
        width: 100%;
        margin: 0;
        line-height: normal;
        padding: 7px 0 6px 5px;
        clear: both;
        font-size: 12px !important;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background 0.2s ease-in-out;
        &:hover
            background: rgba(100, 100, 100, 0.1);
        & *
            color: #515a6e;
        .ivu-menu-item > i
            margin-right: 12px !important;
        .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i
            margin-right: 8px !important;
</style>
