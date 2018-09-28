    //引入排序方法
    import {sortMethods} from './sort.js';
    //维度运算所有表头  
    let dataThead = {"股东账户": "acctId", "股东名称": "acctName", "交易日期": "tradeDate", "会员营业部": "memBranchName",
                "证券代码": "secCode","证券简称": "secName", "买成交数量（合计）" : "buyVol", 
                "买成交数量占比": "buyRatio", "买成交金额（合计）": "buyAmt","买成交价格（合计）":"buyPrice",
                "买成交价格（大宗）":"buyPriceBt",
                "卖成交数量（合计）": "sellVol","卖成交数量占比": "sellRatio","卖成交金额（合计）": "sellAmt",
                "卖成交价格（大宗）":  "sellPriceBt",
                "卖成交价格（合计）":  "sellPrice","买成交数量（大宗）":"buyVolBt","买成交金额（大宗）":"buyAmtBt",
                "卖成交数量（大宗）":"sellVolBt","卖成交金额（大宗）":"sellAmtBt","会员":"memName","PBU":"pbuId",
                "成交编号":"tradeNo","订单编号":"orderNo","成交时间":"tradeTime","该证券当日总成交量（维度）":"secTradeVolDmn",
                "该证券当日总成交额（维度）":"secTradeAmtDmn"};

    let dataTheadR = {"股东账户": "left", "股东名称": "left", "交易日期": "left", "会员营业部": "left",
                "证券代码": "left","证券简称": "left", "买成交数量（合计）" : "right", 
                "买成交数量占比": "right", "买成交金额（合计）": "right","买成交价格（合计）":"right",
                "买成交价格（大宗）":"right",
                "卖成交数量（合计）": "right","卖成交数量占比": "right","卖成交金额（合计）": "right",
                "卖成交价格（大宗）":  "right",
                "卖成交价格（合计）":  "right","买成交数量（大宗）":"right","买成交金额（大宗）":"right",
                "卖成交数量（大宗）":"right","卖成交金额（大宗）":"right","会员":"left","PBU":"left",
                "成交编号":"left","订单编号":"left","成交时间":"left","该证券当日总成交量（维度）":"right",
                "该证券当日总成交额（维度）":"right"}; 

    let dataTheadS = { "买成交数量（合计）" : 1, 
                "买成交数量占比": 2, "买成交金额（合计）": 3,"买成交价格（合计）":4,
                "卖成交数量（合计）": 6,
                "卖成交数量占比": 5,
                "卖成交金额（合计）": 7,
                "卖成交价格（合计）":  8,
                "买成交数量（大宗）":9,"买成交金额（大宗）":10,
                 "买成交价格（大宗）":11,
                "卖成交数量（大宗）":12,"卖成交金额（大宗）":13,
                "卖成交价格（大宗）":  14};

    let dealTable = [
                    {
                        "title": "股东账户",
                        "key": "acctId",
                        "fixed": "left",
                        "width": 120
                    },
                    {
                        "title": "股东名称",
                        "key": "acctName",
                        "width": 120,
                    },
                    {
                        "title": "交易日期",
                        "key": "tradeDate",
                        "width": 120,
                    },
                    {
                        "title": "会员营业部",
                        "key": "memBranchName",
                        "width": 120,
                    },
                    {
                        "title": "证券代码",
                        "key": "secCode",
                        "width": 120,
                    },
                    {
                        "title": "证券简称",
                        "key": "secName",
                        "width": 120,
                    },
                    {
                        "title": "买成交数量（合计）",
                        "key": "buyVol",
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods

                    },
                    {
                        "title": "买成交数量占比",
                        "key": "buyRatio",
                        "width": 120,
                    },
                    {
                        "title": "买成交金额（合计）",
                        "key": "buyAmt",
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        "title": "买成交价格（合计）",
                        "key": "buyPrice",
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        "title": "卖成交数量（合计）",
                        "key": "sellVol",
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        "title": "卖成交数量占比",
                        "key": "sellRatio",
                        "width": 120,
                    },
                    {
                        "title": "卖成交金额（合计）",
                        "key": "sellAmt",
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    } ,
                    {
                        "title": "卖成交价格（合计）",
                        "key": "sellPrice",
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    }];

    let fenmuList = [
                    {
                        value: 'fenzi1',
                        label: '买成交数量（合计）'
                    },
                    {
                        value: 'fenzi2',
                        label: '买成交数量占比'
                    },
                    {
                        value: 'fenzi3',
                        label: '买成交金额（合计）'
                    },
                    {
                        value: 'fenzi4',
                        label: '卖成交数量（合计）'
                    },
                    {
                        value: 'fenzi5',
                        label: '卖成交数量占比'
                    },
                    {
                        value: 'fenzi6',
                        label: '卖成交金额（合计）'
                    },
                    {
                        value: 'fenzi7',
                        label: '买成交数量（大宗）'
                    },
                    {
                        value: 'fenzi8',
                        label: '买成交金额（大宗）'
                    },
                    {
                        value: 'fenzi9',
                        label: '卖成交数量（大宗）'
                    },
                    {
                        value: 'fenzi10',
                        label: '卖成交金额（大宗）'
                    }];

    let fenziList = [
                    {
                        value: 'fenzi1',
                        label: '买成交数量（合计）'
                    },
                    {
                        value: 'fenzi2',
                        label: '买成交数量占比'
                    },
                    {
                        value: 'fenzi3',
                        label: '买成交金额（合计）'
                    },
                    {
                        value: 'fenzi4',
                        label: '卖成交数量（合计）'
                    },
                    {
                        value: 'fenzi5',
                        label: '卖成交数量占比'
                    },
                    {
                        value: 'fenzi6',
                        label: '卖成交金额（合计）'
                    },
                    {
                        value: 'fenzi7',
                        label: '买成交数量（大宗）'
                    },
                    {
                        value: 'fenzi8',
                        label: '买成交金额（大宗）'
                    },
                    {
                        value: 'fenzi9',
                        label: '卖成交数量（大宗）'
                    },
                    {
                        value: 'fenzi10',
                        label: '卖成交金额（大宗）'
                    }];

    export {dataThead,dataTheadR,dataTheadS,dealTable,fenmuList,fenziList};