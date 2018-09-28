 //引入排序方法
import {sortMethods} from './sort.js';
export let columnsTemplate = [
                {
                    title: '股东账户',
                    key: 'gdAccounts',
                    width: 150,
                },
                {
                    title: '证券代码',
                    key: 'zqCode',
                    width: 100,
                },
                {
                    title: '开始日期',
                    key: 'startDate',
                    width: 150,
                },
                {
                    title: '结束日期',
                    key: 'endDate',
                    width: 150,
                },
                {
                    title: '佣金比例',
                    key: 'yjRate',
                    width: 100,
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
                    width: 120,
                    sortable: true,
                },
                {
                    title: '股东账户',
                    key: 'accountId',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true,
                    
                },
                {
                    title: '开始日期',
                    key: 'startDate',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '结束日期',
                    key: 'endDate',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '佣金比例',
                    key: 'yjRate',
                    width: 120,
                    sortable: true,
                    align: 'right',
                   
                },
                {
                    title: '说明',
                    key: 'explainInfo',
                    width: 200,
                }];

export let columnsTemplateTwo = [
                {
                    title: '账户代码',
                    key: 'gdAccounts',
                    width: 150,
                },
                {
                    title: '证券代码',
                    key: 'zqCode',
                    width: 90,
                },
                {
                    title: '交易日期',
                    key: 'startDate',
                    width: 90,
                },
                {
                    title: '成交时间',
                    key: 'endDate',
                    width: 90,
                },
                {
                    title: '成交编号',
                    key: 'yjRate',
                    width: 90,
                },
                {
                    title: '成交价格',
                    key: 'gdAccounts',
                    width: 90,
                },
                {
                    title: '成交金额',
                    key: 'zqCode',
                    width: 90,
                },
                {
                    title: '席位',
                    key: 'startDate',
                    width: 80,
                },
                {
                    title: '申报编码',
                    key: 'endDate',
                    width: 90,
                },
                {
                    title: '申报时间',
                    key: 'yjRate',
                    width: 90,
                },
                {
                    title: '成交方向',
                    key: 'gdAccounts',
                    width: 90,
                },
                {
                    title: '印花税',
                    key: 'zqCode',
                    width: 80,
                },
                {
                    title: '过户费',
                    key: 'startDate',
                    width: 80,
                },
                {
                    title: '交易佣金估算',
                    key: 'endDate',
                    width: 110,
                },
                {
                    title: '实际交易佣金',
                    key: 'yjRate',
                    width: 110,
                }];

export let dataTemplateTwo = [
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

export let columnsLookInfoTwo = [
                {
                    title: '是否有效',
                    key: 'isBoolean',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 120,
                    sortable: true,
                    
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true,
                    
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '成交时间',
                    key: 'tradeTime',
                    width: 110,
                    sortable: true,
                    
                },
                {
                    title: '成交编号',
                    key: 'tradeNo',
                    width: 110,
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '成交价格',
                    key: 'tradePrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '成交金额',
                    key: 'tradeAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '成交量',
                    key: 'tradeVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '席位',
                    key: 'pbuId',
                    width: 100,
                    sortable: true,
                },
                {
                    title: '申报编码',
                    key: 'orderNo',
                    width: 110,
                    sortable: true,
                    
                },
                {
                    title: '申报时间',
                    key: 'orderTime',
                    width: 110,
                    sortable: true,
                    
                },
                {
                    title: '成交方向',
                    key: 'tradeDir',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '印花税',
                    key: 'stampTaxAmt',
                    width: 90,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '过户费',
                    key: 'transFeeAmt',
                    width: 100,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '交易佣金估算',
                    key: 'commisionAmt',
                    width: 150,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '实际交易佣金',
                    key: 'commisionAmtReal',
                    width: 150,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '说明',
                    key: 'explainInfo',
                    width: 300,
                }];

export let columnsTemplateThreeFirst = [
                {
                    title: '账户代码',
                    key: 'gdAccounts',
                    width: 150,
                },
                {
                    title: '证券代码',
                    key: 'zqCode',
                    width: 90,
                },
                {
                    title: '交易日期',
                    key: 'startDate',
                    width: 90,
                },
                {
                    title: '买方成交编号',
                    key: 'endDate',
                    width: 120,
                },
                {
                    title: '买入价格',
                    key: 'yjRate',
                    width: 90,
                },
                {
                    title: '买入金额',
                    key: 'gdAccounts',
                    width: 90,
                },
                {
                    title: '买入量',
                    key: 'zqCode',
                    width: 90,
                },
                {
                    title: '买方印花税',
                    key: 'startDate',
                    width: 100,
                },
                {
                    title: '买方过户费',
                    key: 'endDate',
                    width: 100,
                },
                {
                    title: '买方交易佣金估算',
                    key: 'yjRate',
                    width: 150,
                },
                {
                    title: '买方交易实际佣金',
                    key: 'gdAccounts',
                    width: 150,
                },
                {
                    title: '对应该笔成交的卖出价格',
                    key: 'zqCode',
                    width: 250,
                },
                {
                    title: '对应该笔成交的卖出金额',
                    key: 'startDate',
                    width: 170,
                },
                {
                    title: '对应该笔成交的卖出',
                    key: 'endDate',
                    width: 160,
                },
                {
                    title: '对应该笔成交卖方印花税',
                    key: 'yjRate',
                    width: 170,
                },
                {
                    title: '对应该笔成交卖方过户费',
                    key: 'zqCode',
                    width: 180,
                },
                {
                    title: '对应该笔成交卖方交易佣金估算',
                    key: 'startDate',
                    width: 210,
                },
                {
                    title: '对应该笔成交卖方交易实际佣金',
                    key: 'endDate',
                    width: 220,
                }];

export let dataTemplateThreeFirst = [
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

export let columnsLookInfoThreeFirst = [

                {
                    title: '是否有效',
                    key: 'isBoolean',
                    width: 120,
                    sortable: true,
                },
                
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 110,
                    sortable: true,
                   
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '买方成交编号',
                    key: 'tradeNo',
                    width: 170,
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入价格',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入金额',
                    key: 'buyAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入量',
                    key: 'buyVol',
                    width: 100,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方印花税',
                    key: 'buyStampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方过户费',
                    key: 'buyTransFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方交易佣金估算',
                    key: 'buyCommisionAmt',
                    width: 150,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方交易实际佣金',
                    key: 'buyCommisionAmtReal',
                    width: 150,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出价格',
                    key: 'sellPrice',
                    width: 210,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出金额',
                    key: 'sellAmt',
                    width: 210,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出',
                    key: 'sellVol',
                    width: 180,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方印花税',
                    key: 'sellStampTaxAmt',
                    width: 210,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方过户费',
                    key: 'sellTransFeeAmt',
                    width: 210,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方交易佣金估算',
                    key: 'sellCommisionAmt',
                    width: 250,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方交易实际佣金',
                    key: 'sellCommisionAmtReal',
                    width: 250,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                
                {
                    title: '说明',
                    key: 'explainInfo',
                    width: 300,
                }];

export let columnsTemplateThreeSecond = [
                {
                    title: '账户代码',
                    key: 'gdAccounts',
                    width: 150,
                },
                {
                    title: '证券代码',
                    key: 'zqCode',
                    width: 90,
                },
                {
                    title: '交易日期',
                    key: 'startDate',
                    width: 90,
                },
                {
                    title: '卖方成交编号',
                    key: 'endDate',
                    width: 140,
                },
                {
                    title: '卖入价格',
                    key: 'yjRate',
                    width: 90,
                },
                {
                    title: '卖入金额',
                    key: 'gdAccounts',
                    width: 1200,
                },
                {
                    title: '卖入量',
                    key: 'zqCode',
                    width: 80,
                },
                {
                    title: '卖方印花税',
                    key: 'startDate',
                    width: 100,
                },
                {
                    title: '卖方过户费',
                    key: 'endDate',
                    width: 150,
                },
                {
                    title: '卖方交易佣金估算',
                    key: 'yjRate',
                    width: 200,
                },
                {
                    title: '卖方交易实际佣金',
                    key: 'gdAccounts',
                    width: 200,
                },
                {
                    title: '对应该笔成交的卖出价格',
                    key: 'zqCode',
                    width: 250,
                },
                {
                    title: '对应该笔成交的卖出金额',
                    key: 'startDate',
                    width: 250,
                },
                {
                    title: '对应该笔成交的卖出',
                    key: 'endDate',
                    width: 200,
                },
                {
                    title: '对应该笔成交买方印花税',
                    key: 'yjRate',
                    width: 200,
                },
                {
                    title: '对应该笔成交买方过户费',
                    key: 'zqCode',
                    width: 200,
                },
                {
                    title: '对应该笔成交买方交易佣金估算',
                    key: 'startDate',
                    width: 250,
                },
                {
                    title: '对应该笔成交买方交易实际佣金',
                    key: 'endDate',
                    width: 250,
                }];

export let dataTemplateThreeSecond = [
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

export let columnsLookInfoThreeSecond = [

                {
                    title: '是否有效',
                    key: 'isBoolean',
                    width: 120,
                    sortable: true,
                },
                
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 110,
                    sortable: true,
                   
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '卖方成交编号',
                    key: 'tradeNo',
                    width: 140,
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖入价格',
                    key: 'sellPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖入金额',
                    key: 'sellAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖入量',
                    key: 'sellVol',
                    width: 100,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方印花税',
                    key: 'sellStampTaxAmt',
                    width: 150,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方过户费',
                    key: 'sellTransFeeAmt',
                    width: 150,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方交易佣金估算',
                    key: 'sellCommisionAmt',
                    width: 200,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方交易实际佣金',
                    key: 'sellCommisionAmtReal',
                    width: 200,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出价格',
                    key: 'buyPrice',
                    width: 220,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出金额',
                    key: 'buyAmt',
                    width: 220,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出',
                    key: 'buyVol',
                    width: 200,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方印花税',
                    key: 'buyStampTaxAmt',
                    width: 220,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方过户费',
                    key: 'buyTransFeeAmt',
                    width: 220,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方交易佣金估算',
                    key: 'buyCommisionAmt',
                    width: 250,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方交易实际佣金',
                    key: 'buyCommisionAmtReal',
                    width: 250,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
               

                {
                    title: '说明',
                    key: 'explainInfo',
                    width: 300,
                }];

export let columnsTemplateFour = [
                {
                    title: '股东账户',
                    key: 'gdAccounts',
                    width: 150,
                },
                {
                    title: '证券代码',
                    key: 'zqCode',
                    width: 100,
                },
                {
                    title: '开始日期',
                    key: 'startDate',
                    width: 150,
                },
                {
                    title: '结束日期',
                    key: 'endDate',
                    width: 150,
                },
                {
                    title: '佣金比例',
                    key: 'yjRate',
                    width: 100,
                }];

export let dataTemplateFour = [
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

export let columnsLookInfoFour = [
                {
                    title: '是否有效',
                    key: 'isBoolean',
                    width: 120,
                    sortable: true,
                },
                
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true,
                    
                },
                {
                    title: '开始日期',
                    key: 'startDate',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '结束日期',
                    key: 'endDate',
                    width: 150,
                    sortable: true,
                },
               
                {
                    title: '说明',
                    key: 'explainInfo',
                    width: 330,
                    sortable: true,
                }];

export let columns1 = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '成交时间',
                    key: 'tradeTime',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '成交编号',
                    key: 'tradeNo',
                    width: 110,
                    //align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '成交价格',
                    key: 'tradePrice',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '成交金额',
                    key: 'tradeAmt',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                 {
                    title: '成交量',
                    key: 'tradeVol',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },

                {
                    title: '席位',
                    key: 'pbuId',
                    width: 90,
                    sortable: true,
                },
                {
                    title: '申报编码',
                    key: 'orderNo',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '申报时间',
                    key: 'orderTime',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '成交方向',
                    key: 'tradeDir',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '印花税',
                    key: 'stampTaxAmt',
                    width: 100,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '过户费',
                    key: 'transFeeAmt',
                    width: 100,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '交易佣金估算',
                    key: 'commisionAmt',
                    width: 130,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '实际交易佣金',
                    key: 'commisionAmtReal',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                }];

export let columns2 = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '买方成交编号',
                    key: 'tradeNo',
                    width: 150,
                    //align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入价格',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入金额',
                    key: 'buyAmt',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入量',
                    key: 'buyVol',
                    width: 100,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方印花税',
                    key: 'buyStampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方过户费',
                    key: 'buyTransFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方交易佣金估算',
                    key: 'buyCommisionAmt',
                    width: 160,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方交易实际佣金',
                    key: 'buyCommisionAmtReal',
                    width: 160,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出价格',
                    key: 'sellPrice',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出金额',
                    key: 'sellAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出量',
                    key: 'sellVol',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方印花税',
                    key: 'sellStampTaxAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方过户费',
                    key: 'sellTransFeeAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方交易佣金估算',
                    key: 'sellCommisionAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方交易实际佣金',
                    key: 'sellCommisionAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                 {
                    title: '匹配状态',
                    key: 'matchFlag',
                    width: 120,
                    sortable:true
                }];

export let columnsTwoFirst = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true
                },
                {
                    title: '买方成交编号',
                    key: 'tradeNo',
                    width: 140,
                    //align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入价格',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入金额',
                    key: 'buyAmt',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入量',
                    key: 'buyVol',
                    width: 100,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方印花税',
                    key: 'buyStampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方过户费',
                    key: 'buyTransFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方交易佣金估算',
                    key: 'buyCommisionAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '买方交易实际佣金',
                    key: 'buyCommisionAmtReal',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出价格',
                    key: 'sellPrice',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出金额',
                    key: 'sellAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的卖出量',
                    key: 'sellVol',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方印花税',
                    key: 'sellStampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方过户费',
                    key: 'sellTransFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方交易佣金估算',
                    key: 'sellCommisionAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交卖方交易实际佣金',
                    key: 'sellCommisionAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '匹配状态',
                    key: 'matchFlag',
                    width: 120,
                    sortable:true
                }];

export let columnsTwoSecond = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 120,
                    sortable: true
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true
                },
                {
                    title: '卖方成交编号',
                    key: 'tradeNo',
                    width: 140,
                    //align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出价格',
                    key: 'sellPrice',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 110,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出量',
                    key: 'sellVol',
                    width: 100,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方印花税',
                    key: 'sellStampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方过户费',
                    key: 'sellTransFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方交易佣金估算',
                    key: 'sellCommisionAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方交易实际佣金',
                    key: 'sellCommisionAmtReal',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的买入价格',
                    key: 'buyPrice',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的买入金额',
                    key: 'buyAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交的买入量',
                    key: 'buyVol',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方印花税',
                    key: 'buyStampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方过户费',
                    key: 'buyTransFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方交易佣金估算',
                    key: 'buyCommisionAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '对应该笔成交买方交易实际佣金',
                    key: 'buyCommisionAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '匹配状态',
                    key: 'matchFlag',
                    width: 120,
                    sortable:true
                }];

export let columns3 = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 150,
                    sortable: true
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 110,
                    sortable: true

                },
                {
                    title: '先进先出法确认的买入均价',
                    key: 'buyPrice',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法确认的买入金额',
                    key: 'sumBuyAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法确认的买入数量',
                    key: 'sumBuyVol',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的卖出价格',
                    key: 'sellPrice',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的卖出金额',
                    key: 'sumSellAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的卖出数量',
                    key: 'sumSellVol',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '印花税',
                    key: 'stampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '过户费',
                    key: 'transFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '交易佣金估算',
                    key: 'commisionAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '实际交易佣金',
                    key: 'commisionAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法违法所得（估算）',
                    key: 'resultAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法违法所得（实际）',
                    key: 'resultAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                }];

export let columnsThreeFirst = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 120,
                    sortable: true
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true

                },
                {
                    title: '先进先出法确认的买入均价',
                    key: 'buyPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法确认的买入金额',
                    key: 'sumBuyAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法确认的买入数量',
                    key: 'sumBuyVol',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的卖出价格',
                    key: 'sellPrice',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的卖出金额',
                    key: 'sumSellAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的卖出数量',
                    key: 'sumSellVol',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '印花税',
                    key: 'stampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '过户费',
                    key: 'transFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '交易佣金估算',
                    key: 'commisionAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '实际交易佣金',
                    key: 'commisionAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法违法所得（估算）',
                    key: 'resultAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '先进先出法违法所得（实际）',
                    key: 'resultAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                }];

export let columnsThreeSecond = [
                {
                    title: '账户代码',
                    key: 'acctId',
                    width: 120,
                    sortable: true
                },
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true

                },
                {
                    title: '后进先出法确认的卖出均价',
                    key: 'buyPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '后进先出法确认的卖出金额',
                    key: 'sumBuyAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '后进先出法确认的卖出数量',
                    key: 'sumBuyVol',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的买入价格',
                    key: 'sellPrice',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '确认的相应的买入金额',
                    key: 'sumSellAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {

                    title: '确认的相应的买入数量',
                    key: 'sumSellVol',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '印花税',
                    key: 'stampTaxAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '过户费',
                    key: 'transFeeAmt',
                    width: 120,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '交易佣金估算',
                    key: 'commisionAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '实际交易佣金',
                    key: 'commisionAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '后进先出法违法所得（估算）',
                    key: 'resultAmt',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '后进先出法违法所得（实际）',
                    key: 'resultAmtReal',
                    width: 140,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                }];

export let columns4 = [
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 160,
                    sortable: true
                },
                {
                    key: 'shareRegDate',
                    title: '股权登记日',
                    width: 160,
                    sortable: true
                },
                {
                    title: '上市流通日',
                    key: 'shareListDate',
                    width: 160,
                    sortable: true
                },
                {
                    title: '送配比例（10送）',
                    key: 'shareRatio',
                    width: 160,
                    sortable:true,
                    align: 'right',
                    sortMethod: sortMethods
                },
                {
                    title: '配股比例（10配）',
                    key: 'assueRatio',
                    width: 160,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                },
                {
                    title: '配股价格',
                    key: 'assuePrice',
                    width: 130,
                    align: 'right',
                    sortable:true,
                    sortMethod: sortMethods
                }];