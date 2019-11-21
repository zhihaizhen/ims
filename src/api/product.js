import {Get, Post} from '@/http';
export default {
    getProdectList(par, cb) {
        Get('product', par, res => {
            cb(res);
        });
    },
};
