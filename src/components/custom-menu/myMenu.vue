<template lang="pug">
    component(:is="cType" :collapsed="collapsed" :active-name="activeName")
</template>

<script>
    import HorizontalMenu from './HorizontalMenu.vue';
    import VerticalMenu from './VerticalMenu.vue';

    // import {mapGetters} from 'vuex';
    export default {
        components: {
            HorizontalMenu,VerticalMenu
        },
        props: {
            menuType: {
                type: String,
                required: true
            },
            collapsed: {
                type: Boolean,
                default: false
            },
            activeName: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                // 
            };
        },

        computed: {
            cType(){
                return this.menuType && this.menuType.indexOf('horizontal') === 0 ? 'HorizontalMenu' : 'VerticalMenu';
            }
        },

    };
</script>

<style lang="stylus" scoped>

</style>
