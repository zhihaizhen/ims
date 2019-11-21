import Mock from 'mockjs';
import { doCustomTimes } from '@/util';

export const Prodects = () => {
    let productList = [];
    doCustomTimes(3, () => {
        productList.push(Mock.mock({
            value: '@date'
        }));
    });
    return {
        productList: productList
    };
};
// const Prodects = { 
//     'productList': [{
//         value: '兴业基金一号'
//     }, {
//         value: '兴业基金二号'
//     }]
// };

// export const getProducts = req => {
//     return Prodects;
// };