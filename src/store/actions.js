import { setLocalStore, setSessionStore, removeLocalStore, removeSessionStore, handlerTree, handlerRouter,getBreadCrumbList } from './../util';
import {user} from '@/api';

function handlerResource(data) {
    let resource = [
        {
            id: null,
            code: 'all',
            name: '所有'
        }
    ];
    handlerTree(data, resource);
    let codes = handlerRouter(data);
    return {resource, codes};
}

const actions = {
    // 登陆
    login({ commit }, {form, isRemember}) {
        return new Promise((resolve, reject) => {
            // 模拟登陆
            let res = require('./userinfo.json');
            let data = res.data;
            commit('user/SETNAME', data.name);
            commit('user/SETTOKEN', data.jSessionID);
            commit('user/SETUSERID', data.id);
            if(isRemember) {
                setLocalStore('useName', data.name);
                setLocalStore('useToken', data.jSessionID);
                setLocalStore('userId', data.id);
            }else {
                setSessionStore('useName', data.name);
                setSessionStore('useToken', data.jSessionID);
                setSessionStore('userId', data.id);
            }
            // console.log(data.sysWebResourceEntities);
            let resource = handlerResource(data.sysWebResourceEntities);
            commit('user/SETSLIDER', resource.resource);
            commit('user/SETROLECODE', resource.codes);
            resolve(res);
            // TODO
            // 正式请求后台接口登陆
            // user.login(form, res => {
            //     let data = res.data;
            //     commit('user/SETNAME', data.name);
            //     commit('user/SETTOKEN', data.jSessionID);
            //     commit('user/SETUSERID', data.id);
            //     if(isRemember) {
            //         setLocalStore('useName', data.name);
            //         setLocalStore('useToken', data.jSessionID);
            //         setLocalStore('userId', data.id);
            //     }else {
            //         setSessionStore('useName', data.name);
            //         setSessionStore('useToken', data.jSessionID);
            //         setSessionStore('userId', data.id);
            //     }
            //     // console.log(data.sysWebResourceEntities);
            //     let resource = handlerResource(data.sysWebResourceEntities);
            //     commit('user/SETSLIDER', resource.resource);
            //     commit('user/SETROLECODE', resource.codes);
            //     resolve(res);
            // });

        });
    },
    // 登出
    loginOut({ commit }) {
        return new Promise((resolve, reject) => {
            user.logout(res => {
                commit('user/DELLNAME');
                commit('user/DELLTOKEN');
                commit('user/DELLUSERID');
                removeLocalStore('useName');
                removeSessionStore('useName');
                removeLocalStore('useToken');
                removeSessionStore('useToken');
                removeLocalStore('userId');
                removeSessionStore('userId');
                resolve(res);
            });
        });
    },
    // 获取当前用户权限(用户已登陆情况)
    getPer({ commit }) {
        return new Promise((resolve, reject) => {
            // 模拟用户权限
            let res = require('./userinfo.json');
            let resource = handlerResource(res.data.sysWebResourceEntities);
            commit('user/SETSLIDER', resource.resource);
            commit('user/SETROLECODE', resource.codes);
            resolve(res);

            // TODO
            // user.getPermission(res => {
            //     let resource = handlerResource(res.data);
            //     commit('user/SETSLIDER', resource.resource);
            //     commit('user/SETROLECODE', resource.codes);
            //     resolve(res);
            // });
        });
    },
    // 注入路由
    addNewRouter({commit}, newRouter) {
        commit('user/SETNEWROUTER', newRouter);
    },

    // 增加请求
    pushToken({commit}, payload) {
        commit('http/PUSHTOKEN', payload);
    },
    // 取消未完成的请求
    clearToken({commit}) {
        commit('http/CLEARTOKEN');
    },
    // 修改缓存的页面
    editIncludeComponentsName({commit}, {name, isKeep}) {
        commit('keepAlive/EDITINCLUDECOMPONENTSNAME', {name, isKeep});
    },
    setBreadCrumbList({commit},route){
        commit('app/SETBREADCRUMB',route);
    },
    setHomeRoute({commit},obj){
        commit('app/SETHOMEROUTE',obj);
    },
    setTagNavList({commit},list){
        commit('app/SETTAGNAVLIST',list);
    },
    setWsMethod({commit},list){
        commit('data/SETWSMETHOD',list);
    },
    setHoldList({commit},list){
        commit('data/SETHOLDLIST',list);
    },
    setOnTickInfo({commit},list){
        commit('data/SETONTICKINFO',list);
    },
    setOneList({commit},list){
        commit('data/SETONELIST',list);
    },

    addTagObj({commit},router){
        commit('app/ADDTAGOBJ',router);
    },
    closeTag({commit},router){
        commit('app/CLOSETAG',router);
    }
};

export default actions;
