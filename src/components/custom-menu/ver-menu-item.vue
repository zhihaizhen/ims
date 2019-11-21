<template lang="pug">
    Submenu(:name="`${parentItem.code}`")
        template(slot="title") 
            common-icon(:type="parentItem.icon || ''")
            span {{ getTitle(parentItem) }}
        template(v-for="item in children")
            template(v-if="item.children && item.children.length === 1")
                ver-menu-item(v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item")
                menu-item(v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`")
                    common-icon(:type="item.children[0].icon || ''")
                    span {{ getTitle(item.children[0]) }}
            template(v-else)
                ver-menu-item(v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item")
                menu-item(v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`")
                    common-icon(:type="item.icon || ''")
                    span {{ getTitle(item) }}
</template>

<script>
    import mixin from './mixin';
    import itemMixin from './item-mixin';
    export default {
        name: 'VerMenuItem',
        mixins: [ mixin, itemMixin ],
        methods: {
            getTitle(obj) {
                return obj.name;
            },
        }
    };
</script>

<style lang="stylus" scoped>

</style>
