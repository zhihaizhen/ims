import qs from 'qs';
import {Post, Get} from '../http';

export default {
    // 登陆
    login(par, cb) {
        Post('login', qs.stringify(par), res => {
            cb(res);
        });
    },
    // 登出
    logout(cb) {
        Post('logout', {}, res => {
            cb(res);
        });
    },
    // 获取当前用户权限
    getPermission(cb) {
        Get('init/menu', {}, res => {
            cb(res);
        });
    }
};
