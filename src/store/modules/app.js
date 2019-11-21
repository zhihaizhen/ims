import {getBreadCrumbList,routeEqual,getNextRoute,getHomeRoute,
        setTagNavListInLocalstorage,getTagNavListFromLocalstorage,getRouteTitleHandled,routeHasExist} from '@/util';
import router from '@/router';
const closePage = (state, route) => {
    let nextRoute;
    if(state.tagNavList.length === 2){
        nextRoute = getHomeRoute(state.tagNavList,state.homeRoute.name);
    }else {
        nextRoute = getNextRoute(state.tagNavList, route);
    }
    state.tagNavList = state.tagNavList.filter(item => {
        return !routeEqual(item, route);
    });
    router.push(nextRoute);
};
const app = {
    namespaced: true,
    state: {
        breadCrumbList: [],
        tagNavList: [],
        homeRoute: {},
    },
    mutations: {
        SETBREADCRUMB(state, route){
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
        },
        SETHOMEROUTE(state, obj){
            const homeNm = obj.homeName ? obj.homeName : 'home';
            state.homeRoute = getHomeRoute(obj.routes,homeNm);
            console.log(state.homeRoute);
        },
        SETTAGNAVLIST(state, list){
            let tagList = [];
            let homeName = state.homeRoute.name;
            if(list) {
                tagList = [...list];
            }else {
                tagList = getTagNavListFromLocalstorage() || [];
            } 
            if(tagList[0] && tagList[0].name !== homeName) {
                tagList.shift();
            } 
            let homeTagIndex = tagList.findIndex(item => {
                return item.name === homeName;
            });
            if(homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0];
                tagList.unshift(homeTag);
            }
            state.tagNavList = tagList;
            setTagNavListInLocalstorage([...tagList]);
        },
        ADDTAGOBJ(state,{route,type = 'unshift'}){
            let routeObj = getRouteTitleHandled(route);
            let homeName = state.homeRoute.name;
            if(!routeHasExist(state.tagNavList, routeObj)) {
                if(type === 'push'){
                    state.tagNavList.push(routeObj);
                }else {
                    if(routeObj.name === homeName){
                        state.tagNavList.unshift(routeObj);
                    }else {
                        state.tagNavList.splice(1, 0, routeObj);
                    } 
                }
                setTagNavListInLocalstorage([...state.tagNavList]);
            }
        },
        CLOSETAG(state,route){
            let tag = state.tagNavList.filter(item => {
                return routeEqual(item, route);
            });
            route = tag[0] ? tag[0] : null;
            if(!route){
                return;
            } 
            closePage(state, route);
        }
    }
};
export default app;