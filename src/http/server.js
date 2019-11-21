/**
 * 作用：负责发送ajax请求
 */
import Config from './../config';
import axios from 'axios';
import store from './../store/index';
import { Message, Spin } from 'view-design';
const instance = axios.create(Config.httpConfig);
const CancelToken = axios.CancelToken;

// 请求拦截
instance.interceptors.request.use(config => {
    // console.log(config);
    // 取消未完成的请求
    // config.cancelToken = new CancelToken(cancel => {
    //     store.dispatch('pushToken', {
    //         cancelToken: cancel
    //     });
    // });
    if(!!store.getters.userToken) {
        config.headers['token'] = store.getters.userToken;
        config.headers['userId'] = store.getters.userId;
    }
    return config;
});

// 响应拦截
instance.interceptors.response.use(
    response => {
        return response.data;
        // console.log(response);
        // TODO 数据模拟暂不做过滤
        // if(response.data.success) {
        //     return response.data;
        // }else {
        //     if(response.data.errorCode === -2 || typeof(response.data) === 'string') { // 与后端约定token失效状态码
        //         store.dispatch('clearToken');
        //         store.dispatch('loginOut');
        //         Message.error({
        //             content: '用户信息已过期，请重新登陆',
        //             duration: 1.2,
        //             onClose: () => {
        //                 window.location.reload();
        //             }
        //         });
        //         return Promise.reject(new Error('用户已过期'));
        //     }else {
        //         if(isHander(response)) { // 参数含有 _isHander 需要额外进行处理,不进行拦截
        //             return response.data;
        //         }else {
        //             Message.error({
        //                 content: response.data.message,
        //                 duration: 1.2
        //             });
        //             return Promise.reject(new Error(response.data.message));
        //         }
        //     }
        // }
    },
    err => {
        // 这里是返回状态码不为200时候的错误处理
        if(err && err.response) {
            switch(err.response.status) {
                case 400:
                    err.message = '请求错误';
                    break;
                case 401:
                    err.message = '未授权，请登录';
                    break;
                case 403:
                    err.message = '拒绝访问';
                    break;
                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`;
                    break;
                case 408:
                    err.message = '请求超时';
                    break;
                case 500:
                    err.message = '服务器内部错误';
                    break;
                case 501:
                    err.message = '服务未实现';
                    break;
                case 502:
                    err.message = '网关错误';
                    break;
                case 503:
                    err.message = '服务不可用';
                    break;
                case 504:
                    err.message = '网关超时';
                    break;
                case 505:
                    err.message = 'HTTP版本不受支持';
                    break;
                default:
            }
        }
        Message.error({
            content: err,
            duration: 1.2
        });
        return Promise.reject(err);
    }
);

function isHander(response) {
    if(response.config.method === 'get') {
        return !!response.config.params._isHander;
    }else {
        if(response.config.data.get) {
            return response.config.data.get('_isHander') !== null;
        }else {
            return response.config.data.indexOf('_isHander') !== -1;
        }
    }
}

export default {
    GetMethods(url, par) {
        return new Promise(resolve => {
            instance.get(url, {params: par}).then(res => {
                resolve(res);
            });
        });
    },
    PostMethods(url, par) {
        return new Promise(resolve => {
            instance.post(url, par).then(res => {
                resolve(res);
            });
        });
    },
    PutMethods(url, par) {
        return new Promise(resolve => {
            instance.put(url, par).then(res => {
                resolve(res);
            });
        });
    },
    DeleteMethods(url, par) {
        return new Promise(resolve => {
            instance.delete(url, {data: par}).then(res => {
                resolve(res);
            });
        });
    },
    AllMethods(urlArr) {
        let requests = urlArr.map(url => {
            return instance.get(url);
        });
        return new Promise(resolve => {
            axios.all(requests).then(res => {
                resolve(res);
            });
        });
    }
};
