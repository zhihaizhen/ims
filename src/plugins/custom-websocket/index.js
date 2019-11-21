import CustomWebSocket from './CustomWebSocket.vue';
var WebSocket = {};
WebSocket.install = function(Vue,options) {
    const webSocketConstructor = Vue.extend(CustomWebSocket);
    const webSocketInstance = new webSocketConstructor();
    webSocketInstance.$mount(document.createElement('div'));
    document.body.appendChild(webSocketInstance.$el);
    webSocketInstance.store = options.store || null;
    webSocketInstance.wsConfig = options.wsConfig || {};
    // websocket连接暂时关闭
    webSocketInstance.initWebSocket();
    Vue.prototype.$sendWebSocketMsg = msg => {
        webSocketInstance.sendWebSocketMsg(msg);
    };
};

export default WebSocket;
