<template lang="pug">
    .webSocket
</template>

<script>
    import ReconnectingWebSocket from 'reconnecting-websocket';
    export default {
        name: 'CustomWebSocket',
        data(){
            return {
                customWebSocket: null,
                store: null, 
                wsConfig: {},
                heartCheckTimeObj: null,
                heartTime: 59 // 心跳间隔
            };
        },
        methods: {
            // 建立webSocket连接
            initWebSocket(){
                console.log('初始化websocket',this.wsConfig);
                this.customWebSocket = new ReconnectingWebSocket(this.wsConfig.wsUrl, [], this.wsConfig);
                this.customWebSocket.addEventListener('open',r => {
                    console.log('通信连接已建立2！');
                });
                this.customWebSocket.addEventListener('error',r => {
                    console.log('通信发生错误', r);
                });
                this.customWebSocket.addEventListener('message',r => {
                    this.receiveWebSocketMsg(r);
                });
                this.customWebSocket.addEventListener('close',r => {
                    console.log('通信连接关闭');
                });
            },

            // 接收后台消息
            receiveWebSocketMsg(res) {
                let result = JSON.parse(res.data);
                let command = result.command;
                // console.log('接收通信---',command);
                switch(command) {
                    case 'OnTick':
                        this.store.dispatch('setOnTickInfo',result.msgParam);
                        break;
                    default:
                        break;
                }
            },

            // 推送消息给后台
            sendWebSocketMsg(msg) {
                const wsState = this.customWebSocket.readyState;
                switch(wsState){
                    case 0:
                        console.log('webSocket连接未打开！');
                        break;
                    case 1:
                        console.log('数据推送：',JSON.stringify(msg));
                        this.customWebSocket.send(JSON.stringify(msg));
                        break;
                    case 2:
                        console.log('webSocket连接正在关闭！');
                        break;
                    case 3:
                        console.log('webSocket连接已关闭！');
                        break;
                    default:
                        break;
                }
            },

            // 心跳检测,暂时不做检测
            heartCheckStart() {
                this.heartCheckTimeObj = setInterval(() => {
                    const wsState = this.customWebSocket.readyState;
                    if(wsState == 1) {
                        console.log('连接状态，发送心跳保持连接');
                        this.customWebSocket.send('ping');
                    }else {
                        console.log('断开状态，尝试重连');
                        this.initWebSocket();
                    }
                },this.heartTime);
            }
        }
    };
</script>

