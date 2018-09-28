<template>
    <div>
        <a>
            <span @click="modal10 = true" style="color:#5cadff;text-decoration:underline;">查看统计口径</span>
        </a>
        <Modal class="modal" title="统计口径说明" v-model="modal10" class-name="vertical-center-modal" cancel-text width='700' height='1000'>
            <h3 class="text">
                <b>数据说明</b>
            </h3>
            <p class="textSpan">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据时间范围：自2001年初至今 （应用上线初期只有2009年11月23日及以后的数据，之前的数据将按由近及远的顺序依次弥补加载） 证券选择范围：A股、B股、封闭式基金、ETF基金、债券现券、债券回购 交易平台范围：统计结果包含普通竞价系统和大宗交易系统
            </p>
            <h3 class="text">
                <b>指标说明</b>
            </h3>
            <p class="textSpan">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;买入均价＝买入金额÷买入数量 卖出均价＝卖出金额÷卖出数量 对于新质押式回购品种而言，本应用中的均价无业务含义。
            </p>
            <h3 class="text">
                <b>其他说明</b>
            </h3>
            <p class="textSpan">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在统计时，“会员营业部名称”字段的值基于成交明细数据中的Stat_Seat_Code来确定。如果某一个股东账户在同一交易日内的成交明细数据中出现了不同的Stat_Seat_Code（这种情况比较少见，但存在），那么以该股东账户当天第一笔交易类申报记录对应的Stat_Seat_Code来作为其当天所有交易的Stat_Seat_Code。即对某一个股东账户而言，在同一交易日内所有交易数据的“会员营业部名称”都相同。</p>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'introduce',
    data() {
        return {
            modal10: false,
        }
    }
}
</script>

