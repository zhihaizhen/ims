const getters = {
    // 用户token
    userToken: state => {
        return state.user.token;
    },
    // 用户userId
    userId: state => {
        return state.user.userId;
    },
    userName: state => {
        return state.user.name;
    },
    // 用户路由表
    newRouter: state => {
        return state.user.newrouter;
    },
    // 用户权限code
    roleCode: state => {
        return state.user.roleCode;
    },
    // 用户slider
    slider: state => {
        return state.user.slider;
    },
    // 面包屑
    breadCrumbList: state => {
        return state.app.breadCrumbList;
    },
    // 导航栏
    tagNavList: state => {
        return state.app.tagNavList;
    },
    // 首页
    homeRoute: state => {
        return state.app.homeRoute;
    },
    // 当前缓存路由
    includeComponentsName: state => {
        if(state.keepAlive.includeComponentsName.length) {
            let current = state.keepAlive.includeComponentsName.filter(item => {
                return item.isKeep === true;
            });
            if(current) {
                return current.map(i => {
                    return i.name;
                });
            }
            return [];
        }
        return [];
    },
    wsMethod: state => {
        return state.data.wsMethod;
    },
    holdList: state => {
        return state.data.holdList;
    },
    onTickInfo: state => {
        return state.data.onTickInfo;
    },
    oneList: state => {
        return state.data.oneList;
    },

    entrustBsDic: state => {
        return state.dictionary.entrustBsDic;
    },
    entrustPropDic: state => {
        return state.dictionary.entrustPropDic;
    },
    projectDic: state => {
        return state.dictionary.projectDic;
    },
    assetsDic: state => {
        return state.dictionary.assetsDic;
    },
    combinDic: state => {
        return state.dictionary.combinDic;
    }


};

export default getters;
