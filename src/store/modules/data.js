const data = {
    namespaced: true,
    state: {
        wsMethod: '', // 推送的方法类型
        holdList: [], // 持仓列表数据
        onTickInfo: '', // 证券大盘数据
        oneList: []
    },
    mutations: {
        SETWSMETHOD(state,params) {
            state.wsMethod = params;
        },
        
        SETHOLDLIST(state,params) {
            state.holdList = params;
        },

        SETONELIST(state,params) {
            state.oneList = params;
        },

        SETONTICKINFO(state,params) {
            state.onTickInfo = params;
        }
    }
};

export default data;