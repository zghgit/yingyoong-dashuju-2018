//引入排序方法
import {sortMethods} from './sort.js';
export let qiTableColumns1 = [
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '持股数量',
                    key: 'holdVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '持股占总股本比例',
                    key: 'holdVolTotPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '持股占非限售流通股本比例',
                    key: 'holdVolNegoPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量占比',
                    key: 'buyVolTradePct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量',
                    key: 'buyVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入金额',
                    key: 'buyAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入均价',
                    key: 'buyPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量占比',
                    key: 'sellVolTradePct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量',
                    key: 'sellVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出均价',
                    key: 'sellPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量占比',
                    key: 'comBuyVolPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入金额占比',
                    key: 'comBuyAmtPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量',
                    key: 'comBuyVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入金额',
                    key: 'comBuyAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量占比',
                    key: 'comSellVolPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                 {
                    title: '委托卖出金额占比',
                    key: 'comSellAmtPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },

                {
                    title: '委托卖出数量',
                    key: 'comSellVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额',
                    key: 'comSellAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量占比',
                    key: 'tradeVolPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量',
                    key: 'tradeVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒金额',
                    key: 'tradeAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },

                {
                    title: '该股收盘价',
                    key: 'currPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场成交总量（万股）',
                    key: 'tradeVolAll',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods

                },
                {
                    title: '市场成交总额（万元）',
                    key: 'tradeAmtAll',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托买入总量（万股）',
                    key: 'orderBVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托卖出总量（万股）',
                    key: 'orderSVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托买入总额（万元）',
                    key: 'orderBAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托卖出总额（万元）',
                    key: 'orderSAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股自由流通量（万股）',
                    key: 'freeCap',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股非限售流通股本（万股）',
                    key: 'negoCap',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股总股本（万股）',
                    key: 'totCap',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                }];

export let qiTableColumns2 = [
                {
                    title: '股东账户',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '股东名称',
                    key: 'acctName',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '期末持股数量',
                    key: 'holdVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量',
                    key: 'buyVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量',
                    key: 'comBuyVol',
                    width: 140,
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
                    title: '委托买入金额',
                    key: 'comBuyAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入均价',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量',
                    key: 'sellVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量',
                    key: 'comSellVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额',
                    key: 'comSellAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出均价',
                    key: 'sellPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量',
                    key: 'tradeVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒金额',
                    key: 'tradeAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒均价',
                    key: 'tradePrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '会员营业部',
                    key: 'branchName',
                    width: 140,
                    sortable: true,
                },
                {
                    title: '证件号码',
                    key: 'idCard',
                    width: 250,
                    sortable: true,
                }];

export let qiTableColumns3 = [
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '股东账户',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '股东名称',
                    key: 'acctName',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '持股数量',
                    key: 'holdVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量',
                    key: 'buyVol',
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
                    title: '买入均价',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量',
                    key: 'sellVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出均价',
                    key: 'sellPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量',
                    key: 'tradeVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒金额',
                    key: 'tradeAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒均价',
                    key: 'tradePrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量',
                    key: 'comBuyVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入金额',
                    key: 'comBuyAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量',
                    key: 'comSellVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额',
                    key: 'comSellAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '证件号码',
                    key: 'idCard',
                    width: 250,
                    sortable: true,
                }];

export let qiTableColumns4 = [
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 135,
                    sortable: true,
                },
                {
                    title: '成交时间',
                    key: 'tradeTime',
                    width: 135,
                    sortable: true,
                },
                {
                    title: '成交编号',
                    key: 'tradeNo',
                    width: 135,
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方股东账户',
                    key: 'sellAcctId',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '卖方股东名称',
                    key: 'sellAcctName',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '买方股东账户',
                    key: 'buyAcctId',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '买方股东名称',
                    key: 'buyAcctName',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '成交数量',
                    key: 'tradeVol',
                    width: 155,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '成交金额',
                    key: 'tradeAmt',
                    width: 155,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方证件号码',
                    key: 'sellIdCard',
                    width: 250,
                    sortable: true,

                },
                {
                    title: '买方证件号码',
                    key: 'buyIdCard',
                    width: 250,
                    sortable: true,
                }];

export let qiTableColumns5 = [
                {
                    title: '证券代码',
                    key: 'secCode',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 120,
                    sortable: true,
                },
                {
                    title: '持股数量',
                    key: 'holdVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '持股占总股本比例',
                    key: 'holdVolTotPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '持股占非限售流通股本比例',
                    key: 'holdVolNegoPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量占比',
                    key: 'buyVolTradePct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量',
                    key: 'buyVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入金额',
                    key: 'buyAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入均价',
                    key: 'buyPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量占比',
                    key: 'sellVolTradePct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量',
                    key: 'sellVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出均价',
                    key: 'sellPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量占比',
                    key: 'comBuyVolPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入金额占比',
                    key: 'comBuyAmtPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量',
                    key: 'comBuyVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入金额',
                    key: 'comBuyAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量占比',
                    key: 'comSellVolPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额占比',
                    key: 'comSellAmtPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量',
                    key: 'comSellVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额',
                    key: 'comSellAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量占比',
                    key: 'tradeVolPct',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量',
                    key: 'tradeVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒金额',
                    key: 'tradeAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股收盘价',
                    key: 'currPrice',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场成交总量（万股）',
                    key: 'tradeVolAll',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods

                },
                {
                    title: '市场成交总额（万元）',
                    key: 'tradeAmtAll',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托买入总量（万股）',
                    key: 'orderBVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托卖出总量（万股）',
                    key: 'orderSVol',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托买入总额（万元）',
                    key: 'orderBAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '市场委托卖出总额（万元）',
                    key: 'orderSAmt',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股自由流通量（万股）',
                    key: 'freeCap',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股非限售流通股本（万股）',
                    key: 'negoCap',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '该股总股本（万股）',
                    key: 'totCap',
                    width: 120,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                }];

export let qiTableColumns6 = [
                {
                    title: '股东账户',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '股东名称',
                    key: 'acctName',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '期末持股数量',
                    key: 'holdVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量',
                    key: 'buyVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量',
                    key: 'comBuyVol',
                    width: 140,
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
                    title: '委托买入金额',
                    key: 'comBuyAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入均价',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量',
                    key: 'sellVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量',
                    key: 'comSellVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额',
                    key: 'comSellAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出均价',
                    key: 'sellPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量',
                    key: 'tradeVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒金额',
                    key: 'tradeAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒均价',
                    key: 'tradePrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '会员营业部',
                    key: 'branchName',
                    width: 140,
                    sortable: true,
                },
                {
                    title: '证件号码',
                    key: 'idCard',
                    width: 250,
                    sortable: true,
                }];

export let qiTableColumns7 = [
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '股东账户',
                    key: 'acctId',
                    width: 150,
                    sortable: true,
                },
                {
                    title: '股东名称',
                    key: 'acctName',
                    width: 110,
                    sortable: true,
                },
                {
                    title: '持股数量',
                    key: 'holdVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '买入数量',
                    key: 'buyVol',
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
                    title: '买入均价',
                    key: 'buyPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出数量',
                    key: 'sellVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出金额',
                    key: 'sellAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖出均价',
                    key: 'sellPrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒数量',
                    key: 'tradeVol',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒金额',
                    key: 'tradeAmt',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '对倒均价',
                    key: 'tradePrice',
                    width: 110,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入数量',
                    key: 'comBuyVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托买入金额',
                    key: 'comBuyAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出数量',
                    key: 'comSellVol',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '委托卖出金额',
                    key: 'comSellAmt',
                    width: 140,
                    align: 'right',
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '证件号码',
                    key: 'idCard',
                    width: 250,
                    sortable: true,
                }];

export let qiTableColumns8 = [
                {
                    title: '交易日期',
                    key: 'tradeDate',
                    width: 135,
                    sortable: true,
                },
                {
                    title: '成交时间',
                    key: 'tradeTime',
                    width: 135,
                    sortable: true,
                },
                {
                    title: '成交编号',
                    key: 'tradeNo',
                    width: 135,
                    sortable: true,
                    sortMethod: sortMethods
                },
                {
                    title: '卖方股东账户',
                    key: 'sellAcctId',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '卖方股东名称',
                    key: 'sellAcctName',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '买方股东账户',
                    key: 'buyAcctId',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '买方股东名称',
                    key: 'buyAcctName',
                    width: 177,
                    sortable: true,
                },
                {
                    title: '成交数量',
                    key: 'tradeVol',
                    width: 155,
                    sortable: true,
                    align: 'right',
                    sortMethod: sortMethods
                },
                {
                    title: '成交金额',
                    key: 'tradeAmt',
                    width: 155,
                    sortable: true,
                    align: 'right',
                    sortMethod: sortMethods
                },
                {
                    title: '卖方证件号码',
                    key: 'sellIdCard',
                    width: 250,
                    sortable: true,

                },
                {
                    title: '买方证件号码',
                    key: 'buyIdCard',
                    width: 250,
                    sortable: true,
                }];