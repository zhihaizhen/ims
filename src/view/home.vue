<template lang="pug">
    Layout.home
        //- custom-header
        //- custom-bread-crumb(show-icon style="{marign-left: 30px}" :list="breadCrumbList")
        //- tags-nav.tagNav(:value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag")
        //- custom-menu(menuType='horizontal')
        //- home-admin(:userName ="userName")
        Layout.homeContent
            Sider.my-sider(hide-trigger collapsible :width="200" :collapsed-width="64" v-model="collapsed")
                custom-menu(menuType='vertical' :active-name="$route.name" :collapsed="collapsed")
                    //- .logonCon
                    //-     img(v-show="!collapsed" src="~sta/img/logo.jpg" key="max-logo" width="200px")
                    //-     img(v-show="collapsed" src="~sta/img/logo-min.jpg" key="min-logo" width="50px" height="50px")
            Content 
                .header-bar
                    .sider-trigger
                        sider-trigger.sider-trigger(:collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange")
                        custom-bread-crumb(show-icon style="{marign-left: 30px}" :list="breadCrumbList") 
                    home-admin(:userName ="userName")
                tags-nav.tagNav(:value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag")
                transition(name="fade" mode="out-in")
                    keep-alive(:include="cacheList")
                        router-view
</template>

<script>
    import customMenu from '_c/vertical-menu';
    import customHeader from '_c/custom-header';
    import customBreadCrumb from '_c/custom-bread-crumb';
    import siderTrigger from '_c/sider-trigger';
    import HomeAdmin from '_c/common-admin';
    import tagsNav from '_c/tags-nav';
    import { getNewTagList, routeEqual } from '@/util';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Home',
        components: {
            customHeader,customMenu,customBreadCrumb,siderTrigger,tagsNav,HomeAdmin
        },
        data(){
            return {
                collapsed: false,
            };
        },
        computed: {
            ...mapGetters(['roleCode','breadCrumbList','tagNavList','homeRoute','userName']),
            cacheList() {
                let cacheArr = this.tagNavList.filter(item => {
                    return !(item.meta && item.meta.notCache);
                });
                const list = ['ParentView', ...this.tagNavList.length ? cacheArr.map(item => {
                    return item.name;
                }) : []];
                return list;
            },
        },
        watch: {
            '$route'(newRoute) {
                const { name, query, params, meta } = newRoute;
                this.addTagObj({
                    route: { name, query, params, meta },
                    type: 'push'
                });
                this.setBreadCrumbList(newRoute);
                this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
            }
        },
        mounted() {
            this.setTagNavList();
            const { name, params, query, meta } = this.$route;
            this.addTagObj({
                route: { name, params, query, meta }
            });
            this.setBreadCrumbList(this.$route);
        },
        methods: {
            ...mapActions(['getPer','setBreadCrumbList','setTagNavList','addTagObj','closeTag']),
            turnToPage(route) {
                let { name, params, query } = {};
                if(typeof route === 'string'){
                    name = route;
                }else {
                    name = route.name;
                    params = route.params;
                    query = route.query;
                }
                if(name.indexOf('isTurnByHref_') > -1){
                    window.open(name.split('_')[1]);
                    return;
                }
                this.$router.push({
                    name,
                    params,
                    query
                });
            },
            handleCollpasedChange(state){
                this.collapsed = state;
            },
            handleClick(item) {
                this.turnToPage(item);
            },
            handleCloseTag(res, type, route) {
                if(type !== 'others') {
                    if(type === 'all') {
                        this.turnToPage(this.homeRoute.name);
                    }else {
                        if(routeEqual(this.$route, route)) {
                            this.closeTag(route);
                        }
                    }
                }
                this.setTagNavList(res);
            },
        }
    };
</script>

<style lang="stylus" scoped>
    .home
        height 100%
        background #EAEFF3
        .homeContent
            height 100%
            width 100%
            box-shadow: 0 6px 6px rgba(0,0,0,0.2) inset
        .tagNav
            padding 0px
            height 40px
            background #F0F0F0
        .header-bar
            height 40px;
            width 100%
            display flex
            justify-content:space-between
            align-items center
            background #ffffff
            padding 0 20px
            .sider-trigger
                margin 0 10px

</style>
