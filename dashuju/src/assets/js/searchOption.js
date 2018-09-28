 //引入排序方法
import {sortMethods} from './sort.js';
export let  columns1 = [
                {
                    title: '证券账户',
                    key: 'acctId',
                    width: 130,
                },
                {
                    title: '权证首笔交易日期',
                    key: 'minMinTradeDate',
                    width: 150,
                },
                {
                    title: '权证最后交易日期',
                    key: 'maxMaxTradeDate',
                    width: 150,
                },
                {
                    title: '权证日均交易金额（元）',
                    key: 'avgTradeAmt',
                    width: 150,
                    align: 'right',
                },
                {
                    title: '权证累计交易金额（元）',
                    key: 'tradeAmt',
                    width: 175,
                    align: 'right',
                },
                {
                    title: '权证盈亏情况（元）',
                    key: 'tradeAmtPf',
                    width: 175,
                    align: 'right', 
                }];

export let columns2 = [
                {
                    title: '成交标志',
                    key: 'logo',
                    width: 90
                },
                {
                    title: '成交标志描述',
                    key: 'describe',
                    width: 120
                },
                {
                    title: '算法',
                    key: 'ari',

                }];

export let data2 = [
                {
                    logo: 'M',
                    describe: '全部成交',
                    ari: '当日该笔交易的申报数量和成交数量相等，则认为该笔交易为全部成交交易'
                },
                {
                    logo: 'W',
                    describe: '撤单',
                    ari: '当日该笔交易的申报数量和成交数量不相等，同时撤单时间不为空，则认为该笔交易为撤单交易'
                },
                {
                    logo: 'O',
                    describe: '其他有效申报',
                    ari: '当日该笔交易的申报数量和成交数量不相等，同时其撤单时间为空，则认为该笔交易为其他有效申报交易'
                }];