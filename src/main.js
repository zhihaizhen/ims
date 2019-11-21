// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import config from './config';
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
import 'babel-polyfill';
import CustomWebSocket from '@/plugins/custom-websocket';

import plTable from 'pl-table';
import 'pl-table/themes/index.css';
import 'pl-table/themes/plTableStyle.css';
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') {
    require('@/mock')
// }
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(CustomWebSocket,{store:store,wsConfig:config.webSocketConfig});
Vue.use(plTable);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
});
