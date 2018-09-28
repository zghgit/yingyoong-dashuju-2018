//引入排序方法
import {sortMethods} from './sort.js';
 let tableColumns1 = [
                    {
                        title: '股东账户',
                        key: 'acctId',
                        "fixed": "left",
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '交易营业部变更日',
                        key: 'tradeDate',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '自该变更日起账户交易营业部',
                        key: 'memBranchName',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '自该变更日起账户交易PBU',
                        key: 'pbuId',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '账户最近交易日',
                        key: 'latestTradeDay',
                        "width": 150,
                        sortable: true,
                    },
                    {
                        title: '账户最近交易营业部',
                        key: 'latestBranch',
                        "width": 130,
                        sortable: true,
                    },
                    {
                        title: '账户最近交易PBU',
                        key: 'latestPbu',
                        "width": 150,
                        sortable: true,
                    }];

let tableColumns2 = [
                    {
                        title: '股东账户',
                        key: 'acctId',
                        "fixed": "left",
                        "width": 190,
                        sortable: true,
                    },
                    {
                        title: '指定交易变动日期',
                        key: 'tradeDate',
                        "width": 190,
                        sortable: true,
                    },
                    {
                        title: '变动类型',
                        key: 'chgDesc',
                        "width": 190,
                        sortable: true,
                    },
                    {
                        title: '对应PBU',
                        key: 'pbuId',
                        "width": 190,
                        sortable: true,
                    },
                    {
                        title: '对应营业部',
                        key: 'branchName',
                        "width": 190,
                        sortable: true,
                    }];

export {tableColumns1,tableColumns2}