<template lang="pug">
    Dropdown(placement="bottom-end" style="float:right")
        a(href="javascript:void(0)") {{this.userName}}
            span.iconfont &#xe65c; 
        DropdownMenu(slot="list")
            DropdownItem 
                span.iconfont(style="font-size: 14px;") &#xe63d; 修改密码
            DropdownItem 
                span.iconfont(style="font-size: 14px;") &#xe655; 帮助
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'HomeAdmin',
        // props: {
        //     userName: String
        // }
        
        computed: {
            ...mapGetters(['userName']),
        },
        // mounted() {
        //     console.log(this.userName);
        // }
    };
</script>

<style lang="stylus" scoped>
    @import url("../../assets/css/iconfont.css");
    a
        color #515a6e
    span
        vertical-align middle
        padding-left 3px
    
</style>
