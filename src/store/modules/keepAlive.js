import config from '@/config/index';
const keepAlive = {
    namespaced: true,
    state: {
        // 缓存页面配置
        includeComponentsName: config.includeComponentsName,
    },
    mutations: {
        // 修改缓存的页面
        EDITINCLUDECOMPONENTSNAME(state, {name, isKeep}) {
            let current = state.includeComponentsName.find(item => {
                return item.name === name;
            });
            if(current) {
                current.isKeep = isKeep;
            }
            console.log(state.includeComponentsName);
        }
    }
};

export default keepAlive;

