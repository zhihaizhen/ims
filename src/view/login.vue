<template lang="pug">
    .login
        .title
            .zh 股票交易系统
            .en Stock Trading System
        .login-box
            img(src="~sta/img/logo.png")
            .txt 股票交易系统
            Form(ref="formInline" :model="loginForm")
                FormItem
                    Input(type="text" v-model="loginForm.account" clearable placeholder="请输入用户名称")
                        Icon(type="ios-person" slot="prepend")
                FormItem(style="marginBottom: 8px")
                    Input(type="text" v-model="loginForm.password" clearable placeholder="请输入登陆密码")
                        Icon(type="ios-lock" slot="prepend")
                FormItem
                    Checkbox(v-model="isRemember") 记住账号
                FormItem
                    Button(type="primary" @click="submit" class="login-btn" :loading="btnLoading") 登录
        .login-foot
            .li1 版权所有©2019-2020 兆尹科技有限公司
            .li2 技术支持：兆尹科技有限公司
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    account: 'admin',
                    password: '888888'
                },
                isRemember: false,
                btnLoading: false
            };
        },
        methods: {
            ...mapActions(['login']),
            async submit() {
                if(this.loginForm.account === '') {
                    this.$Message.error('请输入用户名');
                }else if(this.loginForm.password === '') {
                    this.$Message.error('请输入密码');
                }else {
                    // this.btnLoading = true;
                    let msg = await this.login({
                        form: this.loginForm,
                        isRemember: this.isRemember
                    });
                    this.btnLoading = false;
                    this.$router.replace({path: '/'});
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import '../assets/css/login.styl';
</style>
