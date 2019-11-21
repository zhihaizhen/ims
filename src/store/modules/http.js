const http = {
    namespaced: true, // 命名空间,
    state: {
        cancelTokenArr: [], // 取消请求token数组
    },
    mutations: {
        // 增加请求
        PUSHTOKEN(state, payload) {
            state.cancelTokenArr.push(payload.cancelToken);
        },
        // 取消未完成的请求
        CLEARTOKEN(state){
            state.cancelTokenArr.forEach(item => {
                item('路由跳转取消请求ss');
            });
            state.cancelTokenArr = [];
        }
    }
};

export default http;
