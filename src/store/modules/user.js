import { getLocalStore, getSessionStore } from '@/util';

function getStoreVal(name) {
    return !!getLocalStore(name) ? getLocalStore(name) : !!getSessionStore(name) ? getSessionStore(name) : '';
}

const user = {
    namespaced: true, // 命名空间,
    state: {
        name: getStoreVal('useName'),
        token: getStoreVal('useToken'),
        newrouter: [], // 新增的权限路由
        roleCode: [], // 权限code 数组
        slider: [], // 侧边栏导航
        userId: getStoreVal('userId'),
        userMessage: ''
    },
    mutations: {
        // 设置 name
        SETNAME(state, params) {
            state.name = params;
        },
        // 新增token
        SETTOKEN(state, params) {
            state.token = params;
        },
        // 新增路由
        SETNEWROUTER(state, params) {
            state.newrouter = params;
        },
        // 新增权限code数组
        SETROLECODE(state, params) {
            state.roleCode = params;
        },
        // 新增slider
        SETSLIDER(state, params) {
            state.slider = params;
        },
        // 新增userId
        SETUSERID(state, params) {
            state.userId = params;
        },

        // 删除name
        DELLNAME(state) {
            state.name = '';
        },
        // 删除token
        DELLTOKEN(state) {
            state.token = '';
        },
        // 删除路由
        DELLROUTER(state) {
            state.newrouter = [];
        },
        // 删除userId
        DELLUSERID(state) {
            state.userId = '';
        },

        // 获取用户信息
        GETUSERDET(state, params) {
            state.userMessage = params;
        }
    }
};

export default user;
