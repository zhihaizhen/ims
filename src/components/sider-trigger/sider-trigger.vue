<template lang="pug">
    a(@click="handleChange" type="text" :class="['sider-trigger-a',collapsed ? 'collapsed' : '']")
        Icon(:type="icon" :size="size")
</template>

<script>
    export default {
        name: 'SiderTrigger',
        props: {
            collapsed: {
                type: Boolean,
                default: false
            }, 
            icon: {
                type: String,
                default: 'navicon-round'
            },
            size: {
                type: Number,
                default: 26
            }
        },
        methods: {
            handleChange() {
                this.$emit('on-change', !this.collapsed);
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .trans
        transition transform .2s ease
    .sider-trigger-a
        padding 6px
        width 40px
        height 40px
        display inline-block
        text-align center
        color #5c6b77
        margin-top 12px
        i
            vertical-align top
        &:hover
            color #2D8cF0
    .collapsed
        i
            transform: rotateZ(90deg)
</style>
