/**
 * 作用：对axios数据请求插件进一步封装
 * 前端只需要传参数，拿结果即可
 */

import servers from './server';

async function Get(url, par, cb) {
    const res = await servers.GetMethods(url, par);
    cb(res);
}
async function Post(url, par, cb) {
    const res = await servers.PostMethods(url, par);
    cb(res);
}
async function Put(url, par, cb) {
    const res = await servers.PutMethods(url, par);
    cb(res);
}
async function Delete(url, par, cb) {
    const res = await servers.DeleteMethods(url, par);
    cb(res);
}
async function All(urlArr, cb) {
    const res = await servers.AllMethods(urlArr);
    cb(res.data);
}

export { Get, Post, Put, Delete, All };
