import {Get, Post} from '@/http';

export default {
    getList(par, cb) {
        Get('get_table_data', par, res => {
            cb(res);
        });
    },
    
    getBuySellList(par, cb) {
        Get('getBuySellList', par, res => {
            cb(res);
        });
    },

    getDatOneList(par, cb) {
        Get('get_DataOne_data', par, res => {
            cb(res);
        });
    },
    /**
     * 模糊搜索证券代码
     * @param {*} par 
     * @param {*} cb 
     */
    getZqdmList(par,cb) { 
        Get('getZqdmList',par,res => {
            cb(res);
        });
    },
    /**
     * 证券大盘信息
     * @param {*} par 
     * @param {*} cb 
     */
    getBondPaneList(par,cb) {
        Get('getBondPaneList',par,res => {
            cb(res);
        });
    }
};
