const data = {
    namespaced: true,
    state: {
        entrustBsDic: [ // 买卖方向
            {
                value: 1,
                lable: '买入'
            },
            {
                value: 2,
                lable: '卖出'
            }
        ], 
        entrustPropDic: [ // 市价
            {
                value: 1,
                lable: '最优五档剩撤'
            },
            {
                value: 2,
                lable: '最优五档剩转'
            },
            {
                value: 3,
                lable: '本方最优价格'
            },
            {
                value: 4,
                lable: '对手方最优价格'
            },
            {
                value: 5,
                lable: '即时成交剩撤'
            },
            {
                value: 6,
                lable: '全额成交或撤销'
            }
        ],
        projectDic: [ // 产品信息
            {
                value: 1,
                lable: '基金一号'
            },
            {
                value: 2,
                lable: '基金二号'
            }
        ], 
        assetsDic: [// 资产单元
            {
                value: 1,
                lable: '兴业基金主资产单元'
            },
            {
                value: 2,
                lable: '兴业基金次次产单元'
            }
        ],
        combinDic: [ // 投资组合
            {
                value: 1,
                lable: '投资组合一'
            },
            {
                value: 2,
                lable: '投资组合二'
            },
            {
                value: 3,
                lable: '投资组合三'
            }
        ]

    },
    mutations: {
        SETENTRUSTBSDIC(state,params) {
            state.entrustBsDic = params;
        },
        SETENTRUSTPROPDIC(state,params) {
            state.entrustBsDic = params;
        },
        SETPROJECTDIC(state,params) {
            state.projectDic = params;
        },
        SETASSETSDIC(state,params) {
            state.assetsDic = params;
        },
        SETCOMBINDIC(state,params) {
            state.combinDic = params;
        }

    }
};

export default data;