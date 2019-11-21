import Mock from 'mockjs';
import { doCustomTimes } from '@/util';

export const getTableData = req => {
    let tableData = [];
    doCustomTimes(100, () => {
        tableData.push(Mock.mock({
            jys: '@string("lower",10)',
            hydm: '@string("number",6)',
            hymc: '@string("lower",10)',
            zqmc: '@string("upper",10)',
            zqdm: '@string("number",8)',
            tb: '@string("number",2)',
            jrbd: '@string("number",6)',
            mmfx: '买入',
            kp: '@string("number",2)',
            ccsl: '@integer(110,1000)',
            zc: '@integer(100,500)',
            jc: '@integer(100,500)',
            kpc: '@integer(50,200)',
            zxj: '@float(50,200,3, 5)',
        }));
    });
    return {success: true,data: tableData};
};

export const getTableDatas = req => {
    let bondData = [];
    doCustomTimes(10, () => {
        bondData.push(Mock.mock({
            name: '@string("lower",5)',
            buy1: '@string("number",2,2)',
            buy2: '@string("lower",10)',
            buy3: '@string("upper",10)',
            buy4: '@string("number",8)',
            buy5: '@string("number",2)',
            sell1: '@string("number",6)',
            sell2: '买入',
            sell3: '@string("number",2)',
            sell4: '@@float(60, 100, 3)',
            sell5: '@integer(100,500)'
        }));
    });
    return bondData;
};

export const getBuySellList = req => {
    let tableData = [];
    doCustomTimes(100, () => {
        tableData.push(Mock.mock({
            ddzt: '@string("number",2)',
            jysj: '@date("yyyy-MM-dd")',
            wtzt: '@string("number",2',
            hth: '@string("number",6)',
            zqdm: '@string("number",8)',
            zqmc: '@string("upper",10)',
            mmfx: '买入',
            kp: '@string("upper",2)',
            jglx: '@integer(110,1000)',
            wtjg: '@integer(100,500)',
            jc: '@integer(100,500)',
            kpc: '@integer(50,200)',
            zxj: '@float(50,200,3, 5)',
        }));
    });
    return {success: true,data: tableData};
};

export const getBondPaneList = req => {
    let tableData = [];
    doCustomTimes(10, () => {
        tableData.push(Mock.mock({
            name: '档次',
            num1: '@string("number",6)',
            num2: '@string("number",6)',
            type: '@boolean()',
        }));
    });
    return {success: true,data: tableData};
};

export const getOneList = req => {
    let oneList = [];
    doCustomTimes(100, () => {
        oneList.push(Mock.mock({
            hth: '@string("lower",10)',
            cpxx: '@string("number",6)',
            zcdy: '@string("upper",10)',
            jys: '@string("lower",10)入',
            sgdm: '@integer(110,1000)',
            zqmc: '@integer(100,500)',
            sgjg: '@integer(100,500)',
            sgsl: '@integer(50,200)',
            cdsl: '@float(50,200,3, 5)',
            cwxx: '@string("lower",10)',
            wtzt: '@string("number",6)',
            ddzt: '@string("lower",10)',
        }));
    });
    return {success: true,data: oneList};
};

export const getZqdmList = req => {
    let zqdmList = [];
    doCustomTimes(100,() => {
        zqdmList.push(Mock.mock('@string("number",8)'));
    });
    return zqdmList;
};