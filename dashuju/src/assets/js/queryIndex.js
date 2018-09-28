//引入排序方法
import {sortMethods} from './sort.js';
let qiTableColumns1 = [
                    {
                        title: '交易日期',
                        key: 'tradeDate',
                        "width": 120,
                        sortable: true,
                    },
                    {
                        title: '证券代码',
                        key: 'secCode',
                        "width": 120,
                        sortable: true,
                    },
                    {
                        title: '买入数量（股）',
                        key: 'buyVol',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '买入金额（万元）',
                        key: 'buyAmt',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '卖出数量（股）',
                        key: 'sellVol',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '卖出金额（万元）',
                        key: 'sellAmount',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组交易量（股）',
                        key: 'tradeVol',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组交易量占该股总交易量比重%',
                        key: 'tradeRatio',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组对倒量（股）',
                        key: 'internalTradeVol',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组对倒量占该股总交易量比重%',
                        key: 'internalTradeRatio',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组持A股流通股总数（股）',
                        key: 'holdVol',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组持A股流通股总数占该股A股流通股本比重%',
                        key: 'holdRatio',
                        "width": 210,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                   
                    {
                        title: '账户组持A股流通股总数占该股总股本比重%',
                        key: 'totalHoldRatio',
                        "width": 210,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    }];

let qiTableColumns2 = [
                    {
                        title: '账户组持仓量占流通盘比例（X%）',
                        key: 'ratioTypeDesc',
                        "width": 300,
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '账户组持仓量占流通盘比例超过X%的天数',
                        key: 'sumDateCnt',
                        "width": 300,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组持仓量占流通盘比例超过X%的天数／总交易天数',
                        key: 'dateRatio',
                        "width": 350,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    }];

let qiTableColumns3 = [
                    {
                        title: '账户组交易量占总交易量比例（X%）',
                        key: 'ratioTypeDesc',
                        "width": 300,
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '账户组交易量占总交易量比例超过X%的天数',
                        key: 'sumDateCnt',
                        "width": 300,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    },
                    {
                        title: '账户组交易量占总交易量比例超过X%的天数／总交易天数',
                        key: 'dateRatio',
                        "width": 360,
                        align: 'right',
                        sortable: true,
                         sortMethod: sortMethods
                    }];

let qiTableColumns4 = [
                    {
                        title: '账户组对倒量占总交易量比例（X%）',
                        key: 'ratioTypeDesc',
                        "width": 300,
                        sortable: true,                        
                        sortMethod: sortMethods
                    },
                    {
                        title: '账户组对倒量占总交易量比例超过X%的天数',
                        key: 'sumDateCnt',
                        "width": 300,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '账户组对倒量占总交易量比例超过X%的天数／总交易天数',
                        key: 'dateRatio',
                        "width": 360,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    }];

let qiTableColumns5 = [
                    {
                        title: '开始日期',
                        key: 'tradeDate',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '结束日期',
                        key: 'maxTradeDate',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '期间账户组交易量',
                        key: 'sumTradeVol',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期间该股总交易量',
                        key: 'sumTotalTradeVol',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期间账户组交易量占该股总交易量比重%',
                        key: 'sumTradeRatio',
                        "width": 330,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    }];

let qiTableColumns6 = [
                    {
                        title: '开始日期',
                        key: 'tradeDate',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '结束日期',
                        key: 'maxTradeDate',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '期间账户组对倒量',
                        key: 'sumTradeVol',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期间该股总交易量',
                        key: 'sumTotalTradeVol',
                        "width": 180,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期间账户组对倒量占该股总交易量比重%',
                        key: 'sumTradeRatio',
                        "width": 330,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    }];

export {qiTableColumns1,qiTableColumns2,qiTableColumns3,qiTableColumns4,qiTableColumns5,qiTableColumns6}