export default {
    // 请求配置
    httpConfig: {
        baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://192.168.70.22', // dev阶段
        timeout: 20000
    },
    // 缓存页面配置
    includeComponentsName: [
        {name: 'Monitor', isKeep: false},
    ],
    // 存储localStorage时设置前缀
    storePrefix: '_Expressway',
    // webSocket配置信息
    webSocketConfig: {
        debug: false, // 是否记录调试消息
        automaticOpen: true, // 实例化后是否立即尝试连接
        reconnectInterval: 1000, // 尝试重新连接之前要延迟的毫秒数
        maxReconnectInterval: 30000, // 延迟重新连接尝试的最大毫秒数
        reconnectDecay: 1.5, // 重新连接延迟的增加速率
        timeoutInterval: 2000, // 关闭并重试之前等等连接成功的最长时间
        maxReconnectAttempts: null, // 失败之前将进行的最大重新连接尝试次数，null:永远尝试，integer：次数
        binaryType: 'blob', // 二进制类型，blob 或 arraybuffer
        wsUrl: 'ws://192.168.70.22:8081/quotation' // ws-服务器
        // wsUrl: 'ws://192.168.30.113:8081/quotation' // ws-马晓晓
    }
};
