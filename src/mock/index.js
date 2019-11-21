import Mock from 'mockjs';
import { login, logout, getUserInfo } from './login';
import { getTableData,getBondPaneList,getOneList,getZqdmList,getBuySellList} from './data';
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user';
import { Prodects} from './products';

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1000
});

// 登录相关和获取用户信息
Mock.mock(/\/login/, login);
Mock.mock(/\/get_info/, getUserInfo);
Mock.mock(/\/logout/, logout);
Mock.mock(/\/get_table_data/, getTableData);
Mock.mock(/\/getBuySellList/, getBuySellList);
Mock.mock(/\/getBondPaneList/,getBondPaneList);
Mock.mock(/\/get_DataOne_data/, getOneList);

Mock.mock(/\/getZqdmList/, getZqdmList);
Mock.mock(/\/save_error_logger/, 'success');
Mock.mock(/\/message\/init/, getMessageInit);
Mock.mock(/\/message\/content/, getContentByMsgId);
Mock.mock(/\/message\/has_read/, hasRead);
Mock.mock(/\/message\/remove_readed/, removeReaded);
Mock.mock(/\/message\/restore/, restoreTrash);
Mock.mock(/\/message\/count/, messageCount);
Mock.mock(/\/product/,Prodects);

export default Mock;
