<template lang="pug">
    Header.my-header
        .img
            img(src="~sta/img/logo.png")
            span 股票交易系统
        .operate
            .close(@click="close")
                img(src="~sta/img/close.png")
                span 退出登录
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    export default {
        name: 'Myheader',
        components: {
            // SliderItem
        },
        data(){
            return {
                actName: '', // 当前激活菜单
                openName: [], // 当前激活菜单列表
            };
        },
        computed: {
            ...mapGetters(['slider'])
        },
        watch: {
            $route: {
                handler(newVal) {
                    this.actName = newVal.name;
                    this.openName = [newVal.meta.code];
                }
            }
        },
        created() {
            // console.log(this.$route);
        },
        methods: {
            ...mapActions(['loginOut']),
            close() {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认退出？</p>',
                    loading: true,
                    onOk: async() => {
                        await this.loginOut();
                        this.$Modal.remove();
                        window.location.reload();
                    },
                    onCancel: () => {
                        //
                    }
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>

</style>
