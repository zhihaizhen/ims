/* eslint-disable global-require,arrow-body-style */
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

/* 路由懒加载*/
const Home = () => import('@/view/home');
const ParentView = () => import('_c/parent-view');

Vue.use(Router);

const createRouter = () => new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/view/login')
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/view/404')
        }
    ]
});

const router = createRouter();

const extraRouter = [
    {
        name: 'NormalTrade',
        path: '/normaltrade',
        component: Home,
        meta: {
            code: 'NormalTrade',
            notCache: true
        },
        children: [
            {
                name: 'BuySell',
                path: '/buysell',
                component: () => import('@/view/normal-trade/buy-sell'), // 买卖
                meta: {
                    code: 'BuySell',
                    pcode: 'NormalTrade',
                    icon: 'md-bookmark',
                    notCache: false
                },
            },
            {
                name: 'SharesApply',
                path: '/sharesapply',
                component: () => import('@/view/normal-trade/shares-apply'), // 新股申购
                meta: {
                    code: 'SharesApply',
                    pcode: 'NormalTrade',
                    icon: 'md-bookmarks',
                    notCache: true
                },
            }
        ]
    },
    {
        name: 'pStapleTrade',
        component: Home,
        path: '/psteptrade',
        meta: {
            hideInBread: true,
            code: 'StapleTrade',
            notCache: true
        },
        children: [
            {
                name: 'StapleTrade',
                component: () => import('@/view/staple-trade/staple-trade'), // 大宗交易
                path: '/stapletrade',
                meta: {
                    code: 'StapleTrade',
                    icon: 'md-funnel',
                    notCache: true
                }, 
            }
        ]
    },
    {
        name: 'Statistics',
        component: Home,
        path: '/statistics',
        meta: {
            code: 'Statistics',
            icon: 'md-funnel',
            notCache: true
        },
        children: [
            {
                name: 'TradeQuery',
                component: ParentView, // 交易查询
                path: '/tradequery',
                meta: {
                    code: 'TradeQuery',
                    pcode: 'Statistics',
                    icon: 'md-funnel',
                    notCache: true
                },
                children: [
                    {
                        name: 'CurrentEntrust',
                        component: () => import('@/view/statistics/trade-query/current-entrust'), // 当日委托
                        path: '/currententrust',
                        meta: {
                            code: 'CurrentEntrust',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'CurrentDeal',
                        component: () => import('@/view/statistics/trade-query/current-deal'), // 当日交易
                        path: '/currentdeal',
                        meta: {
                            code: 'CurrentDeal',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'HistoryEntrust',
                        component: () => import('@/view/statistics/trade-query/history-entrust'), // 历史委托
                        path: '/historyentrust',
                        meta: {
                            code: 'HistoryEntrust',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'HistoryDeal',
                        component: () => import('@/view/statistics/trade-query/history-deal'), // 历史交易
                        path: '/historydeal',
                        meta: {
                            code: 'HistoryDeal',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'CurBigEntrust',
                        component: () => import('@/view/statistics/trade-query/current-big-entrust'), // 今日大宗交易
                        path: '/curbigentrust',
                        meta: {
                            code: 'CurBigEntrust',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'HisBigEntrust',
                        component: () => import('@/view/statistics/trade-query/history-big-entrust'), // 历史大宗交易
                        path: '/hisbigentrust',
                        meta: {
                            code: 'HisBigEntrust',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'LotteriesInfo',
                        component: () => import('@/view/statistics/trade-query/lotteries-info'), // 中签信息
                        path: '/lotteriesinfo',
                        meta: {
                            code: 'LotteriesInfo',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'SignNumberInfo',
                        component: () => import('@/view/statistics/trade-query/sign-number-info'), // 配号信息
                        path: '/signnumberinfo',
                        meta: {
                            code: 'SignNumberInfo',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'CurSettlement',
                        component: () => import('@/view/statistics/trade-query/current-settlement'), // 当日交收查询
                        path: '/cursettlement',
                        meta: {
                            code: 'CurSettlement',
                            pcode: 'TradeQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                ]
            },
            {
                name: 'AssetsQuery',
                component: ParentView, // 资金查询
                path: '/assetsquery',
                meta: {
                    code: 'AssetsQuery',
                    pcode: 'Statistics',
                    icon: 'md-funnel',
                    notCache: true
                },
                children: [
                    {
                        name: 'CurrentAssets',
                        component: () => import('@/view/statistics/assets-query/current-assets'), // 当日资金
                        path: '/currentassets',
                        meta: {
                            code: 'CurrentAssets',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'HistoryAssets',
                        component: () => import('@/view/statistics/assets-query/history-assets'), // 历史资金
                        path: '/historyassets',
                        meta: {
                            code: 'HistoryAssets',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'CurrentHold',
                        component: () => import('@/view/statistics/assets-query/current-hold'), // 当日持仓
                        path: '/currenthold',
                        meta: {
                            code: 'CurrentHold',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'HistoryHold',
                        component: () => import('@/view/statistics/assets-query/history-hold'), // 历史持仓
                        path: '/historyhold',
                        meta: {
                            code: 'HistoryHold',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'AuditBill',
                        component: () => import('@/view/statistics/assets-query/audit-bill'), // 清算流水
                        path: '/historyassets',
                        meta: {
                            code: 'AuditBill',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'AssetsAdjust',
                        component: () => import('@/view/statistics/assets-query/assets-adjust'), // 资金调整
                        path: '/assetsadjust',
                        meta: {
                            code: 'AssetsAdjust',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                    {
                        name: 'SignShares',
                        component: () => import('@/view/statistics/assets-query/sign-shares'), // 配股查询
                        path: '/signshares',
                        meta: {
                            code: 'SignShares',
                            pcode: 'AssetsQuery',
                            icon: 'md-funnel',
                            notCache: true
                        },
                    },
                ]
            },
            {
                name: 'UsableDetail',
                component: ParentView,
                path: '/usabledetail',
                meta: {
                    code: 'UsableDetail',
                    pcode: 'Statistics',
                    icon: 'md-funnel',
                    notCache: true
                },
                children: [
                    {
                        name: 'HoldSharesDetail',
                        component: () => import('@/view/statistics/usable-detail/hold-detail'), // 持仓明细
                        path: '/holdsharesdetail',
                        meta: {
                            code: 'HoldSharesDetail',
                            pcode: 'UsableDetail',
                            icon: 'md-funnel',
                            notCache: true
                        }, 
                    },
                    {
                        name: 'AssetsDetail',
                        component: () => import('@/view/statistics/usable-detail/assets-detail'), // 资产明细
                        path: '/assetsaetail',
                        meta: {
                            code: 'AssetsDetail',
                            pcode: 'UsableDetail',
                            icon: 'md-funnel',
                            notCache: true
                        }, 
                    },
                ]
            },
        ]
    },
    {
        name: 'Sys',
        component: Home, // 系统管理
        path: '/sys',
        meta: {
            code: 'Sys',
            icon: 'md-funnel',
            notCache: true
        },
        children: [
            {
                name: 'SysUser',
                component: () => import('@/view/system/user'), // 用户管理
                path: '/sysUser',
                meta: {
                    code: 'SysUser',
                    pcode: 'Sys',
                    icon: 'md-funnel',
                    notCache: true
                }
            },
            {
                name: 'SysRole',
                component: () => import('@/view/system/role'), // 角色管理
                path: '/sysRole',
                meta: {
                    code: 'SysRole',
                    pcode: 'Sys',
                    icon: 'md-funnel',
                    notCache: true
                }
            },
            {
                name: 'SysResource',
                component: () => import('@/view/system/resource'), // 资源管理
                path: '/sysResource',
                meta: {
                    code: 'SysResource',
                    pcode: 'Sys',
                    icon: 'md-funnel',
                    notCache: true
                }
            }
        ]
    },
];
function produceRouter() { // 根据 code 动态添加路由
    let r = [];
    let userRouter = store.getters.slider[0].children;
    let resultRouter = recursionRouter(userRouter,extraRouter);
    if(resultRouter.length) {
        let firstPage = (resultRouter[0].children && resultRouter[0].children.length > 0) ? resultRouter[0].children[0].path : resultRouter[0].path;
        r = r.concat([
            {
                path: '/',
                redirect: '/home'
            },{
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    code: 'Home',
                    icon: 'md-funnel'
                },
                redirect: firstPage
            },{
                path: '*',
                name: '*',
                redirect: '/404'
            }
        ],resultRouter);
    }
    router.addRoutes(r);
    store.dispatch('addNewRouter', r);
    let firstPageName = (resultRouter[0].children && resultRouter[0].children.length > 0) ? resultRouter[0].children[0].name : resultRouter[0].name;
    store.dispatch('setHomeRoute',{routes: r,homeName: firstPageName});
}

router.beforeEach((to, from, next) => {
    // console.log('路由守卫');
    store.dispatch('clearToken'); // 取消未完成的请求
    let token = store.getters.userToken;
    if(token) { // 用户存在
        if(store.getters.newRouter.length === 0) { // vuex 中没有路由(刚登陆 或者 已登陆刷新情况下)
            if(store.getters.roleCode.length === 0) { // 用户已登陆刷新情况，需要根据token拉取权限code，处理路由
                store.dispatch('getPer').then(res => {
                    produceRouter();
                    next({ path: to.path });
                });
            }else { // 用户刚登陆情况，处理路由
                console.log('用户刚登陆');
                produceRouter();
                next({ path: '/' });
            }
        }else {
            // 路由表已经存在
            if(to.path === '/login') {
                let firstPage = getFirstPage(store.getters.newRouter);
                next({ name: firstPage.name });
            }else {
                next();
            }
        }
    }else { // 用户不存在
        if(to.path === '/login') {
            next();
        }else {
            next({ name: 'Login' });
        }
    }
});


function getFirstPage(newRouterArr) { // 获取路由表中第一个路由
    let first = newRouterArr.find(item => {
        return item.children === undefined;
    });
    if(first) {
        return first;
    }else {
        getFirstPage(newRouterArr[0].children);
    }
}

function recursionRouter(userRouter = [], allRouter = []){
    let realRoutes = [];
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            if(item.code === v.meta.code) {
                if(item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children);
                }
                if(v.meta.hideInBread){ // 一级菜单特殊处理
                    v.children[0].meta['title'] = item.name;
                }
                v.meta['title'] = item.name;
                realRoutes.push(v);
            }
        });
    });
    return realRoutes;
}
export default router;
