import config from './../config';
import { log } from 'util';
// 存储localStorage
export const setLocalStore = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(config.storePrefix + name, content);
};
// 获取localStorage
export const getLocalStore = name => {
    if(!name) return;
    return window.localStorage.getItem(config.storePrefix + name);
};
// 删除localStorage
export const removeLocalStore = name => {
    if(!name) return;
    window.localStorage.removeItem(config.storePrefix + name);
};

// 存储sessionStorage
export const setSessionStore = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(config.storePrefix + name, content);
};
// 获取sessionStorage
export const getSessionStore = name => {
    if(!name) return;
    return window.sessionStorage.getItem(config.storePrefix + name);
};
// 删除sessionStorage
export const removeSessionStore = name => {
    if(!name) return;
    window.sessionStorage.removeItem(config.storePrefix + name);
};

// 根据后端返回的资源arr ，返回资源树
/**
 *
 * @param {Array} dataArr 剩余没存入选项的组成的数组
 * @param {Array} resource 当前层级资源
 * @author 支海振
 */
export function handlerTree(dataArr, resource) {
    let idArr = resource.map(item => { // 当前已存入选项组成的id数组
        item.children = [];
        return item.id;
    });
    let remainder = dataArr.filter(item => { // 剩余没存入选项的组成的数组
        return !idArr.includes(item.id);
    });
    remainder.sort(arrAscSort('sort'));
    if(remainder.length > 0) {
        for(let i of remainder){
            if(idArr.includes(i.idParent)) {
                let index = resource.findIndex(item => {
                    return item.id === i.idParent;
                });
                resource[index].children.push(i);
            }
        }
        for(let s of resource) {
            handlerTree(remainder, s.children);
        }
    }
}
/**
 * 对象数组升序排序
 * @param {*} prop 排序字段
 */
export function arrAscSort(prop){
    return function(obj1,obj2){
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if(!isNaN(Number(val1)) && !isNaN(Number(val2))){
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if(val1 < val2){
            return -1;
        }else if(val1 > val2){
            return 1;
        }else {
            return 0;
        }
    };
}
/**
 * 对象数组降序排序
 * @param {*} prop 排序字段
 */
export function arrDescSort(prop){
    return function(obj1,obj2){
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if(!isNaN(Number(val1)) && !isNaN(Number(val2))){
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if(val1 > val2){
            return -1;
        }else if(val1 < val2){
            return 1;
        }else {
            return 0;
        }
    };
}


export function handlerRouter(dataArr) {
    let menuArr = dataArr.filter(item => { // 筛选出所有菜单项
        return item.type === 1;
    });
    // 模拟的数据
    // menuCodeArr = ['Reveal', 'Monitor', 'Disease', 'Data', 'Report', 'ReportGenerate', 'ReportManage', 'Alarm', 'Sys', 'SysUser', 'SysRole', 'SysMeasur', 'SysDepreciation', 'SysResource'];
    return menuArr.map(item => { // 菜单code 组成的数组
        return {code: item.code,name: item.name};
    });
}

// 返回 时间格式 2018-02-09
export const DataTime = date => {
    if(!date) return '';
    date = new Date(date);
    var m = date.getMonth() + 1;
    m = m > 9 ? m : `0${m}`;
    var d = date.getDate();
    d = d > 9 ? d : `0${d}`;
    return date.getFullYear() + '-' + m + '-' + d;
};

export function preloadImages(imgUrlArr) {
    // 已加载图片数量
    let loadedImage = 0;
    // 存放图片的数组
    let newImages = [];
    // 返回一个promise 对象
    return new Promise((resolve, reject) => {
        for(let i = 0; i < imgUrlArr.length; i++) {
            newImages[i] = new Image();
            // 设置图片src 属性
            newImages[i].src = imgUrlArr[i];
            // 图片绑定onload事件，确保加载完成
            newImages[i].onload = () => {
                loadedImage++;
                // 当全部加载完成后 ,resolve
                if(loadedImage === imgUrlArr.length) {
                    resolve();
                }
            };
            newImages[i].onerror = () => {
                reject(new Error('错误'));
            };
        }
    });
}

// 日期格式化
export function formatDate(date, fmt) {
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(let k in o) {
        if(new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 图片转化base64
export function getObjectURL(file) {
    var url = null;
    if(window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
    }else if(window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }else if(window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

// 实现滚动条无法滚动
var mo = function(e) {
    e.preventDefault();
};

/** *禁止滑动***/
export function touchmovestop() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    // document.addEventListener("touchmove", mo, false);//禁止页面滑动
}

/** *取消滑动限制***/
export function touchmovemove() {
    document.body.style.overflow = ''; // 出现滚动条
    document.body.style.position = 'relative';
    // document.removeEventListener("touchmove", mo, false);
}

// 解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用，
// 全局 加上 body.dialog-open { position: fixed; width: 100%; }

const ModalHelper = (bodyCls => {
    let scrollTop;
    return {
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add('dialog-open');
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
            document.body.classList.remove('dialog-open');
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('dialog-open');

export const showTitle = (item, vm) => {
    let { title, __titleIsFunction__ } = item.meta;
    let useI18n = false;
    if(!title) return;
    if(useI18n) {
        if(title.includes('{{') && title.includes('}}') && useI18n){
            title = title.replace(/({{[\s\S]+?}})/, (m, str) => {
                str.replace(/{{([\s\S]*)}}/, (n, _) => {
                    vm.$t(_.trim());
                });
            });
        }else if(__titleIsFunction__){
            title = item.meta.title;
        }else {
            title = vm.$t(item.name);
        }
    }else {
        title = (item.meta && item.meta.title) || item.name;
    } 
    return title;
};
/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
    // let homeItem = { ...homeRoute, icon: homeRoute.meta.icon };
    let routeMetched = route.matched;
    // if(routeMetched.some(item => {
    //     return item.name === homeRoute.name;
    // })){
    //     return [homeItem];
    // } 
    let routeHandle = routeMetched.filter(item => {
        return item.redirect === undefined && (item.meta === undefined || !item.meta.hideInBread);
    });
    let res = routeHandle.map(item => {
        let meta = { ...item.meta };
        if(meta.title && typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true;
            meta.title = meta.title(route);
        }
        let obj = {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: meta
        };
        return obj;
    });
    res = res.filter(item => {
        return !item.meta.hideInMenu;
    });
    return [...res];
};

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1;
    let len = routers.length;
    let homeRoute = {};
    while(++i < len) {
        let item = routers[i];
        if(homeName === item.name){
            return item;
        }else if(item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName);
            if(res.name){
                return res;
            }
        }
    }
    return homeRoute;
};
/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.keys(obj2);
    if(keysArr1.length !== keysArr2.length){
        return false;
    }else if(keysArr1.length === 0 && keysArr2.length === 0){
        return true;
    }else {
        return !keysArr1.some(key => {
            return obj1[key] != obj2[key];
        });
    } 
};
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {};
    const params2 = route2.params || {};
    const query1 = route1.query || {};
    const query2 = route2.query || {};
    return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2);
};
/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNavList = JSON.stringify(list);
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNavList;
    return list ? JSON.parse(list) : [];
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute;
    let newList = [...list];
    if(newList.findIndex(item => {  
        return item.name === name; 
    }) >= 0) {
        return newList;
    }else {
        newList.push({ name, path, meta });
    } 
    return newList;
};
/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    let res = {};
    const index = list.findIndex(item => {
        return routeEqual(item, route);
    });
    if(index === list.length - 1){
        res = list[list.length - 2];
    }else {
        res = list[index + 1];
    }
    return res;
};

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1;
    while(++i < times) {
        callback(i);
    }
};

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length;
    let res = false;
    doCustomTimes(len, index => {
        if(routeEqual(tagNavList[index], routeItem)){
            res = true;
        } 
    });
    return res;
};

export const getRouteTitleHandled = route => {
    let router = { ...route };
    let meta = { ...route.meta };
    let title = '';
    if(meta.title) {
        if(typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true;
            title = meta.title(router);
        }else {
            title = meta.title;
        } 
    }
    meta.title = title;
    router.meta = meta;
    return router;
};

export const findNodeUpperByClasses = (ele, classes) => {
    let parentNode = ele.parentNode;
    if(parentNode) {
        let classList = parentNode.classList;
        if(classList && classes.every(className => {
            return classList.contains(className);
        })) {
            return parentNode;
        }else {
            return findNodeUpperByClasses(parentNode, classes);
        }
    }
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&');
    let paramObj = {};
    keyValueArr.forEach(item => {
        const keyValue = item.split('=');
        paramObj[keyValue[0]] = keyValue[1];
    });
    return paramObj;
};
