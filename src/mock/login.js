import { getParams } from '@/util';
const USER_MAP = {
    admin: {
        name: 'admin',
        access: ['admin'],
        token: 'admin',
        avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    }
};

export const login = req => {
    req = JSON.parse(req.body);
    return { token: USER_MAP[req.userName].token };
};

export const getUserInfo = req => {
    const params = getParams(req.url);
    return USER_MAP[params.token];
};

export const logout = req => {
    return null;
};
