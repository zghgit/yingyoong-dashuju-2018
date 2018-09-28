 //引入排序方法
import {sortMethods} from './sort.js';

export let columnsTemplate = [
                    {
                        title: '股东账户',
                        key: 'gdAccounts',
                        width:150,
                    },
                    {
                        title: '证券代码',
                        key: 'zqCode',
                        width:100,
                    },
                    {
                        title: '开始日期',
                        key: 'startDate',
                        width:150,
                    },
                    {
                        title: '结束日期',
                        key: 'endDate',
                        width:150,
                    },
                    {
                        title: '佣金比例',
                        key: 'yjRate',
                        width:100,
                    }];

export let dataTemplate = [
                    {
                        gdAccounts: 'A000832200',
                        zqCode: 'ALL',
                        startDate: '20100115',
                        endDate: '20110423',
                        yjRate: 0.002,
                    },
                    {
                        gdAccounts: 'A530916975',
                        zqCode: 'ALL',
                        startDate: '20091221',
                        endDate: '20170607',
                        yjRate: 0.00025,
                    },
                    {
                        gdAccounts: 'A684165286',
                        zqCode: '600081',
                        startDate: '20091221',
                        endDate: '20170607',
                        yjRate: 0.00025,
                    }];

export let columnsLookInfo = [
                    {
                        title: '是否有效',
                        key: 'isBoolean',
                        width:120,
                        sortable:true,
                    },
                    {
                        title: '股东账户',
                        key: 'gdAccounts',
                        width:140,
                        sortable:true,
                    },
                    {
                        title: '证券代码',
                        key: 'zqCode',
                        width:120,
                        sortable:true,
                       
                    },
                    {
                        title: '开始日期',
                        key: 'startDate',
                        width:120,
                        sortable:true,
                    },
                    {
                        title: '结束日期',
                        key: 'endDate',
                        width:120,
                        sortable:true,
                    },
                    {
                        title: '佣金比例',
                        key: 'jyRate',
                        width:120,
                        sortable:true,
                        align:'right',
                        sortMethod: sortMethods
                    },
                    {
                        title: '说明',
                        key: 'explainInfo',
                        width:200,
                    }];

export let tableColumns1 = [
                    {
                        title: '股东代码',
                        key: 'acctId',
                        "fixed": "left",
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
                        title: '期初持股',
                        key: 'baseHoldBal',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期初持股市值',
                        key: 'baseMktVal',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },  
                    {
                        title: '新股申购数量',
                        key: 'orderVol',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '新股申购金额',
                        key: 'orderAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '累计买入数量',
                        key: 'accuBuyVol',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '累计买入金额',
                        key: 'accuBuyAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '累计卖出数量',
                        key: 'accuSellVol',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '累计卖出金额',
                        key: 'accuSellAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期末持股',
                        key: 'holdBal',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '期末持股市值',
                        key: 'mktVal',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '印花税',
                        key: 'stampTaxAmt',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '过户费',
                        key: 'transFeeAmt',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '交易佣金估算',
                        key: 'commFeeAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '实际交易佣金',
                        key: 'realCommFeeAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '累计派现金额',
                        key: 'divAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '累计送股数量',
                        key: 'shareRealVol',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '配股数量',
                        key: 'placingRealVol',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },   
                    {
                        title: '配股金额',
                        key: 'placingRealAmt',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '股改送股数量',
                        key: 'shareReformRealVol',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '股改送现金金额',
                        key: 'reformDivAmt',
                        "width": 140,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '非交易过户转入',
                        key: 'nontradeIn',
                        "width": 160,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '非交易过户转出',
                        key: 'nontradeOut',
                        "width": 160,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '违法所得（按估算佣金）',
                        key: 'unlawGet',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '违法所得（按实际佣金）',
                        key: 'realUnlawGet',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    },
                    {
                        title: '校验',
                        key: 'checkHold',
                        "width": 120,
                        align:'right',
                        sortable: true,
                        sortMethod: sortMethods
                    }];
