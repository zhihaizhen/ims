import {Get, Post} from '@/http';

export default {
    getList1(par, cb) {
        Get('emerg/onduty/log/data-page', par, res => {
            cb(res);
        });
    },
};
