<template lang="pug">
    .custom-bread-crumb 
        Breadcrumb(:style="{fontSize:`${fontSize}px`}")
            BreadcrumbItem(v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`")
                common-icon(style="margin-right: 4px;" :type="item.icon || ''")
                span {{showTitle(item)}}
</template>

<script>
    import {showTitle} from '@/util';
    import CommonIcon from '_c/common-icon';
    export default {
        name: 'CustomBreadCrumb',
        components: {
            CommonIcon
        },
        props: {
            list: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            fontSize: {
                type: Number,
                default: 14
            },
            showIcon: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            showTitle(item) {
                return showTitle(item, this);
            },
            isCustomIcon(iconName) {
                return iconName.indexOf('_') === 0;
            },
            getCustomIconName(iconName) {
                return iconName.slice(1);
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .custom-bread-crumb 
        display inline-block
        vertical-align middle
</style>
