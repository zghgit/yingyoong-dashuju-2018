 //引入排序方法
import {sortMethods} from './sort.js';
let TableColumns1 = [
                    {
                        title: '交易日期',
                        key: 'tradeDate',
                        "width": 120,
                        sortable: true,
                    },
                    {
                        title: '成交时间',
                        key: 'tradeTime',
                        "width": 150,
                        sortable: true,
                    },
                    {
                        title: '成交编号',
                        key: 'tradeNo',
                        "width": 80,
                        //align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '买方所在账户组',
                        key: 'acctGroupBuy',
                        "width": 160,
                        sortable: true,
                    },
                    {
                        title: '买方股东账户',
                        key: 'acctIdBuy',
                        "width": 160,
                        sortable: true,
                    },
                    {
                        title: '买方股东名称',
                        key: 'acctNameBuy',
                        "width": 140,
                        sortable: true,
                    },
                    {
                        title: '卖方所在账户组',
                        key: 'acctGroupSell',
                        "width": 120,
                        sortable: true,
                    },
                    {
                        title: '卖方股东账户',
                        key: 'acctIdSell',
                        "width": 150,
                        sortable: true,
                    },                      
                    {
                        title: '卖方股东名称',
                        key: 'acctNameSell',
                        "width": 160,
                        sortable: true,
                    },
                    {
                        title: '成交数量',
                        key: 'tradeVol',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '成交金额',
                        key: 'tradeAmt',
                        "width": 120,
                        align: 'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '卖方证件号码',
                        key: 'idCardSell',
                        "width": 200,
                        sortable: true,
                    },
                    {
                        title: '买方证件号码',
                        key: 'idCardBuy',
                        "width": 200,
                        sortable: true,
                    }];

let TableColumns2 = [
                    {
                        title: '交易日期',
                        key: 'tradeDate',
                        "width": 120,
                        sortable: true,
                    },
                    {
                        title: '成交时间',
                        key: 'tradeTime',
                        "width": 150,
                        sortable: true,
                    },
                    {
                        title: '成交编号',
                        key: 'tradeNo',
                        "width": 80,
                        sortable: true,
                        //align: 'right',
                        sortMethod: sortMethods
                    },
                    {
                        title: '买方所在账户组',
                        key: 'acctGroupBuy',
                        "width": 160,
                        sortable: true,
                    },
                    {
                        title: '买方股东账户',
                        key: 'acctIdBuy',
                        "width": 160,
                        sortable: true,
                    },
                    {
                        title: '买方股东名称',
                        key: 'acctNameBuy',
                        "width": 140,
                        sortable: true,
                    },
                    {
                        title: '卖方所在账户组',
                        key: 'acctGroupSell',
                        "width": 120,
                        sortable: true,
                    },
                    {
                        title: '卖方股东账户',
                        key: 'acctIdSell',
                        "width": 150,
                        sortable: true,
                    },                      
                    {
                        title: '卖方股东名称',
                        key: 'acctNameSell',
                        "width": 160,
                        sortable: true,
                    },
                    {
                        title: '成交数量',
                        key: 'tradeVol',
                        "width": 120,
                        sortable: true,
                        align: 'right',
                        sortMethod: sortMethods
                    },
                    {
                        title: '成交金额',
                        key: 'tradeAmt',
                        "width": 120,
                        sortable: true,
                        align: 'right',
                        sortMethod: sortMethods
                    },
                    {
                        title: '卖方证件号码',
                        key: 'idCardSell',
                        "width": 200,
                        sortable: true,
                    },
                    {
                        title: '买方证件号码',
                        key: 'idCardBuy',
                        "width": 200,
                        sortable: true,
                    }];

export {TableColumns1,TableColumns2};