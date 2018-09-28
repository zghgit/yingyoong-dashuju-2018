<template>
    <section class='constWidth'>
        <!--头部-->
        <header></header>
        <Spin id="show" fix class="loadBox" v-bind:class="{hide:ishide}">
            <Icon type="load-c" size=40 class="loadIcon"></Icon>
            <div style="font-size:16px;">&nbsp;&nbsp;&nbsp;数据加载中...</div>
        </Spin>
        <Tabs :animated="false" value="" type="card" class="inoutCalBox" style="min-width:1260px;">
            <Tab-pane label="输出成交明细和费用">
                    <Row :gutter="gutterValue1">
                <Col :span="leftPane1">
                    <!--显示隐藏按钮-->
                    <span class="showHideBar" @click="hideRightBox1()"><i :class="changeArrow1"></i></span>
                    <Card style="min-height:810px;">
                        <p slot="title">输出成交明细和费用</p>
                        <Row style="margin-top:-10px; margin-bottom:10px;">
                            <a>
                                <span @click="modalOne = true" style="color:#5cadff;text-decoration:underline;">查看统计口径</span>
                            </a>
                            <Modal class="modal" title="输出成交明细和费用 统计口径说明" v-model="modalOne" class-name="vertical-center-modal" width='700' cancel-text>
                                <h3 class="">
                                    <b>数据说明</b>
                                </h3>
                                <p class="textP">数据时间范围：自2003年初至今
                                    <br>证券选择范围：A股、B股、封闭式基金、ETF基金、债券现券、权证
                                    <br>平台范围： 竞价系统，大宗交易系统</p>
                                <h3 class="">
                                    <b>指标说明</b>
                                </h3>
                                <p class="textP">印花税 = 买（卖）金额 * 买（卖）方向印花税率
                                    <br> 过户费 = 成交股数 / 1000（A股） = 成交金额*0.05% （B 股）
                                    <br> 佣金 = 成交金额 * 佣金费率 注：仅A，B股交易有印花税，过户费。
                                    <br> 债券佣金费率为0.02%，其他按前端输入费率，前端无输入则按缺省0.3%计算
                                </p>
                                </p>
                                <h3 class="">
                                    <b>其他说明</b>
                                </h3>
                                <p class="textP">无</p>
                            </Modal>
                        </Row>
                        <p id="infoTableList1" class="redtext">
                        </p>
                      <!--  <Table height="600" :columns="columns1" ref='tableOneExport' :data="data1"></Table>
                           <Page :total="returnTotal" :current="returnN" :page-size="20" show-elevator show-total @on-change="tableChange"></Page> -->

<fastTable  :width="1680" :bwidth="1660" :columns="columns1" :data="data1" class="inoutTable" ></fastTable>

<div style="padding-top:10px">
                            <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>

                        <Row style="float:right;">
                            <Button id="calExportBtnOne" type="primary" style="width:300px;  margin-top:0px;" @click='exportTable(1)' disabled>导出全部结果为XLSX文件</Button>
                        </Row>
                    </Card>
                    </Col>
                    <Col :span="rightPane1" >

                    <Card style="min-height:810px;">
                        <p slot="title"></p>
                        <Form ref="formValidateOne" :model="formValidateOne" :rules="ruleValidateOne">
                            <Row class="uploadBox proCalBtnBox">
                                <Upload ref="upload" :show-upload-list="false" accept=".xls,.xlsx,.csv" :default-file-list="defaultList" :format="['xls','xlsx','csv']" :headers="upfileParams" :on-success="handleSuccessAccount" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload1" :on-error="enableUpload1" multiple action="/dwapp/dwappUpload/decode_upfile?uploadType=TRANDETAIL" style="display: inline-block;">
                                    <Button id="importAccountBtn1" type="ghost" class="uploadExcel">Excel上传</Button>
                                </Upload>
                                <Button @click="lookUploadInfo = true" type="ghost">查看</Button>
                                <Modal v-model="lookUploadInfo" title="查看已上传的文件" width="884" class-name="vertical-center-modal" cancel-text>
                              <Table height="300" id="lookInfoTable" border stripe :columns="columnsLookInfo" :data="dataLookInfo"></Table>

                                </Modal>
                                <Button id="templateBtn" @click="modelType(1)">模板</Button>
                                <Modal title="账面盈利计算文件模板" v-model="templateInfo" width="684" class-name="vertical-center-modal" cancel-text>
                                    <Table id="templateTable" border stripe :columns="columnsTemplate" :data="dataTemplate"></Table>
                                </Modal>
                            </Row>
                            <Row class="procalList" style="margin-top:10px; margin-Bottom:-10px">
                                <p>已上传记录总数:
                                    <span class="bluetext">{{items}}</span>
                                </p>
                                <p style="margin-top:5px;">其中有效记录数:
                                    <span  class="bluetext">{{itemse}}</span>
                                </p>
                            </Row>
                            <br>
                            <h4>佣金费率</h4>
                            <Form-item>
                                <Input  v-model="inputNumberOne" style="width:70%;"></Input>
                                <label  class="bluetext">&nbsp;&nbsp;%</label>
                            </Form-item>
                            <Form-item prop="inputOne" id="AccountForm1" style="margin-top:-10px;" >
                                在页面上显示前&nbsp;&nbsp;
                                <Input-number id="inputOne" @on-change="validNum" v-model="formValidateOne.inputOne" :max="2000" :min="1"  style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                                <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                                <p>
                                    <label class="redtext fontsize12">(最多显示2000行)</label>
                                </p>
                            </Form-item>
                            <Form-item>
                                <div class="cxBox">
                                    <Button id="searchBtn" type="primary" @click="handleSubmitOne('formValidateOne')" style="float:right;width:80px;">查询</Button>
                                </div>
                            </Form-item>
                        </Form>
                    </Card>
                    </Col>
                </Row>
            </Tab-pane>
            <Tab-pane label="输出买卖记录对应数据表">
                 <Row :gutter="gutterValue2">
                <Col :span="leftPane2">
                    <!--显示隐藏按钮-->
                    <span class="showHideBar" @click="hideRightBox2()"><i :class="changeArrow2"></i></span>
                    <Card style="min-height:810px;">
                        <p slot="title">输出买卖记录对应数据表</p>
                        <Row style="margin-top:-10px; margin-bottom:10px;">
                            <a>
                                <span @click="modalTwo = true" style="color:#5cadff;text-decoration:underline;">查看统计口径</span>
                            </a>
                            <Modal class="modal" title="输出买卖记录对应数据表 统计口径说明" v-model="modalTwo" class-name="vertical-center-modal" cancel-text width='700' height='1000' cancel-text>
                                <h3 class="text">
                                    <b>数据说明</b>
                                </h3>
                                <p class="textP">无</p>
                                <h3 class="text">
                                    <b>指标说明</b>
                                </h3>
                                <p class="textP">无</p>
                                </p>
                                <h3 class="text">
                                    <b>其他说明</b>
                                </h3>
                                <p class="textP">无</p>
                            </Modal>
                        </Row>
                        <p id="infoTableList2" class="redtext">
                        </p>
                   <!--     <Table height="600" :columns="columns2" ref='tableTwoExport' :data="data2" style="overflow-x:auto"></Table>
                           <Page :total="returnTotal2" :current="returnN2" :page-size="20" show-elevator show-total @on-change="tableChange2"></Page> -->
<fastTable  :width="2380" :bwidth="2360" :columns="columns2" :data="data2"  class="inoutTable2" ></fastTable>

<div style="padding-top:10px">
                            <Page :total="returnTotal2" :current="returnN2" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page> </div>

                        <Row style="margin-top: 20px;text-align: center;">
                            <Button id="calExportBtnTwoFirst" type="primary" style="width:300px;" @click='exportTable(2)' disabled>将查询结果导出为XLSX文件（先进先出）</Button>
                            <Button id="calExportBtnTwoSecond" type="primary" style="width:300px;  margin-left:10px;" @click='exportTable(3)' disabled>将查询结果导出为XLSX文件（后进先出）</Button>
                        </Row>

                    </Card>
                    </Col>
                  <Col :span="rightPane2" >

                    <Card style="min-height:810px;">
                        <p slot="title"></p>
                        <Form ref="formValidateTwo" :model="formValidateTwo" :rules="ruleValidateTwo">
                            <Row class="uploadBox proCalBtnBox">
                                <Upload ref="upload" :show-upload-list="false" accept=".xls,.xlsx,.csv" :default-file-list="defaultList" :format="['xls','csv','xlsx']" :data="uploadParams" :headers="upfileParams" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload2" :on-error="enableUpload2" :on-success="handleSuccessAccount2" multiple action="/dwapp/dwappUpload/decode_upfile?uploadType=DETAILCHARGE" style="display: inline-block;">
                                    <Button id="importAccountBtn2" type="ghost" class="uploadExcel">Excel上传</Button>
                                </Upload>
                                <Button @click="formValidateTwo.modalTwoFirst = true" type="ghost">查看</Button>
                                <Modal title="查看已上传的文件" v-model="formValidateTwo.modalTwoFirst" width="884" class-name="vertical-center-modal" cancel-text>
                                  <Table height="300" id="lookInfoTable" border stripe :columns="columnsLookInfoTwo" :data="dataLookInfoTwo"></Table>


                                </Modal>
                                <Button @click="modelType(2)" type="ghost">模版</Button>
                                <Modal title="账面盈利计算文件模板" v-model="formValidateTwo.modalTwoSecond" width="884" class-name="vertical-center-modal" cancel-text>
                                    <Table id="templateTable" border stripe :columns="columnsTemplateTwo" :data="dataTemplateTwo"></Table>
                                </Modal>
                            </Row>

                            <Row class="procalList" style="margin-top:10px; margin-Bottom:10px">
                                <p>已上传记录总数:
                                    <span  class="bluetext">{{items2}}</span>
                                </p>
                                <p style="margin-top:5px;">其中有效记录数:
                                    <span  class="bluetext">{{items2e}}</span>
                                </p>
                            </Row>

                            <b style="font-size:16px;">算法选择</b>
                            <Form-item>

                                <Radio-group v-model="formValidateTwo.singleTwo" @on-change="radiochangeTwo">
                                    <Radio label="先进先出" ></Radio>
                                    <Radio label="后进先出" ></Radio>
                                </Radio-group>
                            </Form-item>

                            <Form-item prop="inputTwo"  id="AccountForm2" style="margin-top:-10px;">
                                在页面上显示前&nbsp;&nbsp;
                                <Input-number id="inputTwo" @on-change="validNum2" v-model="formValidateTwo.inputTwo" :max="2000" :min="1"  style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                                 <p><label class="redtext fontsize12">{{showrowTip2}}</label></p>
                                <p>
                                    <label class="redtext fontsize12">(最多显示2000行)</label>
                                </p>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmitTwo('formValidateTwo')" style="float:right;width:80px;">查询</Button>
                            </Form-item>

                        </Form>

                    </Card>
                    </Col>
                </Row>

            </Tab-pane>
            <Tab-pane label="输出盈利统计表" name="tableThreeXls">

    <Row :gutter="gutterValue3">
                <Col :span="leftPane3">
                    <!--显示隐藏按钮-->
                    <span class="showHideBar" @click="hideRightBox3()"><i :class="changeArrow3"></i></span>
                    <Card style="min-height:810px;">
                        <p slot="title">输出盈利统计表</p>
                        <Row style="margin-top:-10px; margin-bottom:10px;">
                            <a>
                                <span @click="modalThree = true" style="color:#5cadff;text-decoration:underline;">查看统计口径</span>
                            </a>
                            <Modal class="modal" title="输出盈利统计表 统计口径说明" v-model="modalThree" class-name="vertical-center-modal" cancel-text width='700' height='1000' cancel-text>
                                <h3 class="text">
                                    <b>数据说明</b>
                                </h3>
                                <p class="textP">无</p>
                                <h3 class="text">
                                    <b>指标说明</b>
                                </h3>
                                <p class="textP">违法所得 =卖出金额 -买入金额 -印花税 - 过户费 -交易佣金估算</p>
                                </p>
                                <h3 class="text">
                                    <b>其他说明</b>
                                </h3>
                                <p class="textP">此盈利算法不特别考虑分红配送的情况</p>
                            </Modal>
                        </Row>
                        <p id="infoTableList3" class="redtext">
                        </p>
                <!--        <Table height="600" :columns="columns3" ref='tableThreeExport' :data="data3"></Table>
                           <Page :total="returnTotal3" :current="returnN3" :page-size="20" show-elevator show-total @on-change="tableChange3"></Page>  -->

                <fastTable  :width="1820" :bwidth="1800" :columns="columns3" :data="data3"  class="inoutTable2" ></fastTable>

<div style="padding-top:10px">
                            <Page :total="returnTotal3" :current="returnN3" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize3" @on-change="tableChange3"></Page> </div>
                        <Row  style="margin-top: 20px;text-align: center;">
                            <Button id="calExportBtnThreeFirst" type="primary" @click='exportTable(4)' style="width:300px;" disabled>将查询结果导出为XLSX文件（先进先出） </Button>
                            <Button id="calExportBtnThreeSecond" type="primary" @click='exportTable(5)' style="width:300px; margin-left:10px;" disabled>将查询结果导出为XLSX文件（后进先出）</Button>
                        </Row>
                    </Card>
                    </Col>
                    <Col :span="rightPane3" >
                    <Card style="min-height:810px;">
                        <p slot="title"></p>
                        <Form ref="formValidateThree" :model="formValidateThree" :rules="ruleValidateThree">
                            <p slot="title"></p>
                            <b>文件上传</b>
                            <small class="redtext">（先进先出）</small>
                            <Row style="margin-top:10px;" class="uploadBox proCalBtnBox">
                                <Upload ref="upload" :show-upload-list="false" accept=".xls,.xlsx,.csv" :data="uploadParams1" :headers="upfileParams" :default-file-list="defaultList" :format="['xls','xlsx','csv']" :on-success="handleSuccessAccount3" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-error="enableUpload3" :before-upload="handleBeforeUpload3" multiple action="/dwapp/dwappUpload/decode_upfile?uploadType=PROFITFIFO" style="display: inline-block;">
                                    <Button id="importAccountBtn3"  type="ghost" class="uploadExcel">Excel上传</Button>
                                </Upload>

                                <Button @click="formValidateThree.modalThreeFirst = true" type="ghost">查看</Button>
                                <Modal title="查看上传列表" v-model="formValidateThree.modalThreeFirst" width="884" class-name="vertical-center-modal" cancel-text>
                                   <Table height="300" id="lookInfoTable" border stripe :columns="columnsLookInfoThreeFirst" :data="dataLookInfoThreeFirst"></Table>


                                </Modal>
                                <Button @click="modelType(3)" type="ghost">模版</Button>
                                <Modal title="模版" v-model="formValidateThree.modalThreeSecond" width="684" class-name="vertical-center-modal" cancel-text>
                                   <Table id="templateTable" border stripe :columns="columnsTemplateThreeFirst" :data="dataTemplateThreeFirst"></Table>


                                </Modal>
                            </Row>

                            <Row style="margin-top:10px; margin-Bottom:15px">
                                <p>已上传记录总数:
                                    <span  class="bluetext">{{items3}}</span>
                                </p>
                                <p style="margin-top:5px;">其中有效记录数:
                                    <span  class="bluetext">{{items3e}}</span>
                                </p>
                            </Row>
                            <b>文件上传</b>
                            <small class="redtext">（后进先出）</small>

                            <Row style="margin-top:10px;" class="uploadBox proCalBtnBox" >
                                <Upload ref="upload" :show-upload-list="false" accept=".xls,.xlsx,.csv" :default-file-list="defaultList" :format="['xls','xlsx','csv']" :max-size="2048" :on-success="handleSuccessAccount4" :data="uploadParams2" :headers="upfileParams" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-error="enableUpload4" :before-upload="handleBeforeUpload4" multiple action="/dwapp/dwappUpload/decode_upfile?uploadType=PROFITLIFO" style="display: inline-block;">
                                    <Button id="importAccountBtn4" type="ghost"  class="uploadExcel">Excel上传</Button>
                                </Upload>

                                <Button @click="formValidateThree.modalThreeThird = true" type="ghost">查看</Button>
                                <Modal title="查看上传列表" v-model="formValidateThree.modalThreeThird" width="884" class-name="vertical-center-modal" cancel-text>
                                  <Table height="300" id="lookInfoTable" border stripe :columns="columnsLookInfoThreeSecond" :data="dataLookInfoThreeSecond"></Table>


                                </Modal>
                                <Button @click="modelType(4)" type="ghost">模版</Button>
                                <Modal title="模版" v-model="formValidateThree.modalThreeForth" width="884" class-name="vertical-center-modal" cancel-text>
                                    <Table id="templateTable" border stripe :columns="columnsTemplateThreeSecond" :data="dataTemplateThreeSecond"></Table>
                                </Modal>
                            </Row>

                            <Row style="margin-top:10px; margin-Bottom:10px">
                                <p>已上传记录总数:
                                    <span class="bluetext">{{items4}}</span>
                                </p>
                                <p style="margin-top:5px;">其中有效记录数:
                                    <span class="bluetext">{{items4e}}</span>
                                </p>
                            </Row>
                            <Form-item>
                                <b style="font-size:16px;">算法选择</b>
                                <br>
                                <Radio-group v-model="formValidateThree.singleThree" @on-change="radiochangeThree">
                                    <Radio label="先进先出" id="radioThreeFirst" name="radioThreeFirst" ></Radio>
                                    <Radio label="后进先出" id="radioThreeSecond" name='radioThreeSecond' ></Radio>
                                </Radio-group>
                            </Form-item>
                            <Form-item prop="inputThree" id="AccountForm3" style="margin-top:-10px;">
                                在页面上显示前&nbsp;&nbsp;
                                <Input-number id="inputThree"  @on-change="validNum3" v-model="formValidateThree.inputThree" :max="2000" :min="1"  style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                                 <p><label class="redtext fontsize12">{{showrowTip3}}</label></p>
                                <p>
                                    <label class="redtext fontsize12">(最多显示2000行)</label>
                                </p>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmitThree('formValidateThree')" style="float:right;width:80px;">查询</Button>
                            </Form-item>

                        </Form>
                    </Card>
                    </Col>
                </Row>
            </Tab-pane>
            <Tab-pane label="输出高送转明细" name="tableFourXls">

                <Row :gutter="gutterValue4">
                <Col :span="leftPane4">
                    <!--显示隐藏按钮-->
                    <span class="showHideBar" @click="hideRightBox4()"><i :class="changeArrow4"></i></span>
                    <Card style="min-height:810px;">
                        <p slot="title">输出高送转明细</p>
                        <Row style="margin-top:-10px; margin-bottom:10px;">
                            <a>
                                <span @click="modalFour = true" style="color:#5cadff;text-decoration:underline;">查看统计口径</span>
                            </a>
                            <Modal class="modal" title="输出高送转明细 统计口径说明" v-model="modalFour" class-name="vertical-center-modal" cancel-text width='700' height='1000' cancel-text>
                                <h3 class="text">
                                    <b>数据说明</b>
                                </h3>
                                <p class="textP">无</p>
                                <h3 class="text">
                                    <b>指标说明</b>
                                </h3>
                                <p class="textP">无</p>
                                </p>
                                <h3 class="text">
                                    <b>其他说明</b>
                                </h3>
                                <p class="textP">根据录入的证券及开始结束时间，输出期间有过送转股的记录(由于对高送转的比例无明确定义，故只要有送转记录的均输出)</p>
                            </Modal>
                        </Row>
                        <p id="infoTableList4" class="redtext"></p>
               <!--         <Table height="600" :columns="columns4" ref='tableFourExport' :data="data4"></Table>
                           <Page :total="returnTotal4" :current="returnN4" :page-size="20" show-elevator show-total @on-change="tableChange4"></Page>  -->
<fastTable  :width="930" :bwidth="920" :addWidth="0" :columns="columns4" :data="data4" class="inoutTable2"  ></fastTable>

<div style="padding-top:10px">
                            <Page :total="returnTotal4" :current="returnN4" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize4" @on-change="tableChange4"></Page> </div>


                        <Row style="float:right">
                            <Button id="calExportBtnFour" type="primary" style="width:300px;  margin-top:0px;" @click='exportTable(6)' disabled>导出全部结果为XLSX文件</Button>
                        </Row>
                    </Card>
                    </Col>
                    <Col :span="rightPane4" >
                    <Card style="min-height:810px;">
                        <p slot="title"></p>
                        <p style="color:rgb(216,81,36);">
                            <b>如果不上传文件则直接使用输出成交明细和费用中的证券代码,开始日期,结束日期作为查询条件。</b>
                        </p>
                        <Form ref="formValidateFour" :model="formValidateFour" :rules="ruleValidateFour" style="margin-top:10px">
                            <Row class="uploadBox proCalBtnBox" >
                                <Upload ref="upload" :show-upload-list="false" accept=".xls,.xlsx,.csv" :default-file-list="defaultList" :format="['xls','xlsx','csv']" :max-size="2048" :on-format-error="handleFormatError" :headers="upfileParams" :on-success="handleSuccessAccount5" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload5" :on-error="enableUpload5"  multiple action="/dwapp/dwappUpload/decode_upfile?uploadType=HIGH" style="display: inline-block;">
                                    <Button type="ghost" id="importAccountBtn5" class="uploadExcel">Excel上传</Button>
                                </Upload>

                                <Button @click="formValidateFour.modalFourFirst = true" type="ghost">查看</Button>
                                <Modal title="查看上传列表" v-model="formValidateFour.modalFourFirst" width="884" class-name="vertical-center-modal" cancel-text>
                                  <Table height="300" id="lookInfoTable" border stripe :columns="columnsLookInfoFour" :data="dataLookInfoFour"></Table>



                                </Modal>
                                <Button @click="modelType(5)" type="ghost">模版</Button>
                                <Modal title="模版" v-model="formValidateFour.modalFourSecond" width="684" class-name="vertical-center-modal" cancel-text>
                                    <Table id="templateTable" border stripe :columns="columnsTemplateFour" :data="dataTemplateFour"></Table>
                                </Modal>
                            </Row>
                            <Row style="margin-top:10px; margin-Bottom:10px">
                                <p>已上传记录总数:
                                    <span class="bluetext">{{items5}}</span>
                                </p>
                                <p style="margin-top:5px;">其中有效记录数:
                                    <span class="bluetext">{{items5e}}</span>
                                </p>
                            </Row>
                            <Form-item prop="inputFour" id="AccountForm4" >
                                在页面上显示前&nbsp;&nbsp;
                                <Input-number id="inputFourForm" @on-change="validNum4" v-model="formValidateFour.inputFour" :max="2000" :min="1"  style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                                 <p><label class="redtext fontsize12">{{showrowTip4}}</label></p>
                                <p>
                                    <label class="redtext fontsize12">(最多显示2000行)</label>
                                </p>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmitFour('formValidateFour')" style="float:right;width:80px;">查询</Button>
                            </Form-item>
                        </Form>
                    </Card>
                    </Col>
                </Row>

            </Tab-pane>
        </Tabs>
    </section>
</template>



<script>
// import Introduce from '../components/introduce'
import {columnsTemplate,dataTemplate,columnsLookInfo,columnsTemplateTwo,dataTemplateTwo,columnsLookInfoTwo,columnsTemplateThreeFirst,dataTemplateThreeFirst,columnsLookInfoThreeFirst,columnsTemplateThreeSecond,dataTemplateThreeSecond,columnsLookInfoThreeSecond,columnsTemplateFour,dataTemplateFour,columnsLookInfoFour,columns1,columns2,columnsTwoFirst,columnsTwoSecond,columns3,columnsThreeFirst,columnsThreeSecond,columns4} from '../assets/js/searchInoutCal.js';
import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';

export default {
    name: 'compute',
    data() {
      return {
        inputNumberOne:0.3,
        showrowTip:'',
        showrowTip2:'',
        showrowTip3:'',
        showrowTip4:'',
        returnN:1,
        returnTotal:0,
        dataArrayAll:[],
        returnN2:1,
        returnTotal2:0,
        dataArrayAll2:[],
        returnN3:1,
        returnTotal3:0,
        dataArrayAll3:[],
        returnN4:1,
        returnTotal4:0,
        dataArrayAll4:[],
        datalength1:0,
        datalength2:0,
        datalength3:0,
        datalength4:0,
        pageSize:500,
        pageSize2:500,
        pageSize3:500,
        pageSize4:500,
          //显示隐藏输入条件
        changeArrow1:'rightArrow',
        gutterValue1:16,
        leftPane1:19,
        rightPane1:5,
        changeArrow2:'rightArrow',
        gutterValue2:16,
        leftPane2:19,
        rightPane2:5,
        changeArrow3:'rightArrow',
        gutterValue3:16,
        leftPane3:19,
        rightPane3:5,
        changeArrow4:'rightArrow',
        gutterValue4:16,
        leftPane4:19,
        rightPane4:5,
        //查看 模板
        columnsTemplate: columnsTemplate,
        dataTemplate: dataTemplate,
        columnsLookInfo: columnsLookInfo,
        dataLookInfo: [

        ],

        dataLookEffective:[],
        dataLookTwoEffective:[],
        dataLookInfoFourEffective:[],
        itemse:0,
        items2e:0,
        items5e:0,
        dataLookThreeEffective2:[],
        dataLookThreeEffective1:[],
        items3e:0,
        items4e:0,

        //Two查看模版
        columnsTemplateTwo: columnsTemplateTwo,
        dataTemplateTwo: dataTemplateTwo,
        columnsLookInfoTwo: columnsLookInfoTwo,
        dataLookInfoTwo: [

        ],

        //Three查看模版(先进先出)
        columnsTemplateThreeFirst: columnsTemplateThreeFirst,
        dataTemplateThreeFirst: dataTemplateThreeFirst,
        columnsLookInfoThreeFirst: columnsLookInfoThreeFirst,
        dataLookInfoThreeFirst: [

        ],
        //three  后进后出
        //Three查看模版
        columnsTemplateThreeSecond: columnsTemplateThreeSecond,
        dataTemplateThreeSecond: dataTemplateThreeSecond,
        columnsLookInfoThreeSecond: columnsLookInfoThreeSecond,
        dataLookInfoThreeSecond: [

        ],

        //Four查看模版
        //查看 模板
        columnsTemplateFour: columnsTemplateFour,
        dataTemplateFour: dataTemplateFour,
        columnsLookInfoFour: columnsLookInfoFour,
        dataLookInfoFour: [],
        lookUploadInfo: false,
        templateInfo: false,
        urlParams:window.location.href,
        ishide: true,
        uploadParams:{},
        uploadParams1:{},
        uploadParams2:{},
        modalOne: false,
        modalTwo: false,
        modalThree: false,
        modalFour: false,
        items: 0,
        items1: 0,
        items2: 0,
        items3: 0,
        items4: 0,
        items5: 0,
        table: 'tableOneXls',
        modal7: false,
        modal8: false,
        defaultList: [],
        imgName: '',
        single: '先进先出',
        visible: false,
        uploadList: [],
        inputTwo: 20,
        inputThree: 20,
        inputFour: 20,
        formValidateOne: {
            inputOne: 2000,
            inputNumberOne: 0.3,
            modalOneFirst: false,
            modalOneSecond: false,
        },
        ruleValidateOne: {

        },
        formValidateTwo: {
            inputTwo: 2000,
            inputNumberTwo: 0.3,
            modalTwoFirst: false,
            modalTwoSecond: false,
            singleTwo: '先进先出',
        },
        ruleValidateTwo: {
        },
        formValidateThree: {
            inputThree: 2000,
            modalThreeFirst: false,
            modalThreeSecond: false,
            modalThreeThird: false,
            modalThreeForth: false,
            singleThree: '先进先出',
        },
        ruleValidateThree: {

        },
        formValidateFour: {
            inputFour: 2000,
            modalFourFirst: false,
            modalFourSecond: false,
        },
        ruleValidateFour: {

        },
        columns1: columns1,
        columns2: columns2,
        columnsTwoFirst: columnsTwoFirst,
        columnsTwoSecond: columnsTwoSecond,
        columns3: columns3,
        columnsThreeFirst: columnsThreeFirst,
        columnsThreeSecond: columnsThreeSecond,
        columns4: columns4,
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        t: ''
        }
    },
    mounted() {
        // this.uploadList = this.$refs.upload.fileList;
         var urlParams=window.location.href;
            var upfileParamsValue={};
            upfileParamsValue.signature=signatureA;
            upfileParamsValue.Authorization=AuthorizationA;
            this.upfileParams = upfileParamsValue;


            var uploadData={};
            uploadData.userId=srcUseridA;
            uploadData.userName=srcUsernameA;
            uploadData.Authorization=AuthorizationA;
            this.uploadParams=uploadData;

            var uploadData1={};
            uploadData1.userId=srcUseridA;
            uploadData1.userName=srcUsernameA;
            uploadData1.Authorization=AuthorizationA;
            uploadData1.reportType="PROFITFIFO";
            this.uploadParams1=uploadData1;

            uploadData.reportType="PROFITLIFO";
            this.uploadParams2=uploadData;
    },
    watch:{
        inputNumberOne(){
          var _this = this;
            if(!(/^[0-9]+([.]{1}[0-9]+){0,1}$/).test(_this.inputNumberOne)){
            this.$Message.error('请输入合法参数!');
            }
        },
     },
    methods: {
        // 点击tab页时
        _fetch:function(fetch_promise, timeout) {//设置fetch请求超时方法
            var abort_fn = null;
            var abortInfo=this;
            //这是一个可以被reject的promise
            var abort_promise = new Promise(function(resolve, reject) {
                    abort_fn = function() {
                        console.log('查询超时abort promise');
                        abortInfo.isHide=true;
                        // abortInfo.$Message.warning('查询超时！请重试！');
                    };
            });
            //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
            var abortable_promise = Promise.race([
                    fetch_promise,
                    abort_promise
            ]);
            abortInfo.t = setTimeout(function() {
                    abort_fn();
                }, timeout);
            return abortable_promise;
        },
        validNum:function(){//验证显示行数是否为小数
            var r = /^[1-9]\d*$/;
            if(r.test(this.formValidateOne.inputOne) == false){
                this.$Message.error('显示行数不能为小数！请输入整数！');
                this.showrowTip = '显示行数不能为小数！请输入整数！';
                this.addClass(document.getElementById('AccountForm1'),'ivu-form-item-error');
                return;
            }
            this.removeClass(document.getElementById('AccountForm1'),'ivu-form-item-error');
            this.showrowTip = '';
        },
        validNum2:function(){//验证显示行数是否为小数
            var r = /^[1-9]\d*$/;
            if(r.test(this.formValidateTwo.inputTwo) == false){
                this.$Message.error('显示行数不能为小数！请输入整数！');
                this.showrowTip2 = '显示行数不能为小数！请输入整数！';
                this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                return;
            }
            this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
            this.showrowTip2 = '';
        },
        validNum3:function(){ //验证显示行数是否为小数
            var r = /^[1-9]\d*$/;
            if(r.test(this.formValidateThree.inputThree) == false){
                this.$Message.error('显示行数不能为小数！请输入整数！');
                this.showrowTip3 = '显示行数不能为小数！请输入整数！';
                this.addClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
                return;
            }
            this.removeClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
            this.showrowTip3 = '';
        },
        validNum4:function(){//验证显示行数是否为小数
            var r = /^[1-9]\d*$/;
            if(r.test(this.formValidateFour.inputFour) == false){
                this.$Message.error('显示行数不能为小数！请输入整数！');
                this.showrowTip4 = '显示行数不能为小数！请输入整数！';
                this.addClass(document.getElementById('AccountForm4'),'ivu-form-item-error');
                return;
            }
            this.removeClass(document.getElementById('AccountForm4'),'ivu-form-item-error');
            this.showrowTip4 = '';
        },
        tableChange:function (page){
            this.returnN=page;
            this.data1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
        },
        tableChangeSize:function (pageSize){
            this.pageSize=pageSize;
            this.returnN=1;
            this.data1 =this.dataArrayAll.slice(0,this.pageSize);
        },
        tableChange2:function (page){
            this.returnN2=page;
            this.data2 =this.dataArrayAll2.slice((page-1)*this.pageSize2,page*this.pageSize2);
        },
        tableChangeSize2:function (pageSize){
            this.pageSize2=pageSize;
            this.returnN2=1;
            this.data2 =this.dataArrayAll2.slice(0,this.pageSize2);
        },
        tableChange3:function (page){
            this.returnN3=page;
            this.data3 =this.dataArrayAll3.slice((page-1)*this.pageSize3,page*this.pageSize3);
        },
        tableChangeSize3:function (pageSize){
            this.pageSize3=pageSize;
            this.returnN3=1;
            this.data3 =this.dataArrayAll3.slice(0,this.pageSize3);
        },
        tableChange4:function (page){
            this.returnN4=page;
            this.data4 =this.dataArrayAll4.slice((page-1)*this.pageSize4,page*this.pageSize4);
        },
        tableChangeSize4:function (pageSize){
            this.pageSize4=pageSize;
            this.returnN4=1;
            this.data4 =this.dataArrayAll4.slice(0,this.pageSize4);
        },
        hideRightBox1:function(){//显示隐藏左右
            (this.leftPane1 == '19')?this.leftPane1='25':this.leftPane1='19';
            (this.rightPane1 == '5')?this.rightPane1='0':this.rightPane1='5';
            (this.gutterValue1 == 16)?this.gutterValue1=0:this.gutterValue1=16;
            (this.changeArrow1 == 'rightArrow')?this.changeArrow1='leftArrow':this.changeArrow1='rightArrow';
        },
        hideRightBox2:function(){
            (this.leftPane2 == '19')?this.leftPane2='25':this.leftPane2='19';
            (this.rightPane2 == '5')?this.rightPane2='0':this.rightPane2='5';
            (this.gutterValue2 == 16)?this.gutterValue2=0:this.gutterValue2=16;
            (this.changeArrow2 == 'rightArrow')?this.changeArrow2='leftArrow':this.changeArrow2='rightArrow';
        },
        hideRightBox3:function(){
            (this.leftPane3 == '19')?this.leftPane3='25':this.leftPane3='19';
            (this.rightPane3 == '5')?this.rightPane3='0':this.rightPane3='5';
            (this.gutterValue3 == 16)?this.gutterValue3=0:this.gutterValue3=16;
            (this.changeArrow3 == 'rightArrow')?this.changeArrow3='leftArrow':this.changeArrow3='rightArrow';
        },
        hideRightBox4:function(){
            (this.leftPane4 == '19')?this.leftPane4='25':this.leftPane4='19';
            (this.rightPane4 == '5')?this.rightPane4='0':this.rightPane4='5';
            (this.gutterValue4 == 16)?this.gutterValue4=0:this.gutterValue4=16;
            (this.changeArrow4 == 'rightArrow')?this.changeArrow4='leftArrow':this.changeArrow4='rightArrow';
        },
        hasClass:function(obj, cls){  //原声js写jquery方法
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass:function(obj, cls){
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        },
        removeClass:function(obj, cls){
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        },
        toggleClass:function(obj,cls){
                if(this.hasClass(obj,cls)){
                    this.removeClass(obj, cls);
                }else{
                    this.addClass(obj, cls);
                }
        },
        infoTableSort:function(sort){//传排序参数
                this.orderParams.field=sort.key;
                this.orderParams.sort=sort.order;
        },
        handleSuccessAccount(response, file, fileList){//股东账户导入
        document.getElementById("importAccountBtn1").disabled=false;
                if(response.message != null){
                        this.$Message.warning(response.message);
                    }
                    if(response.resData){
                        const arry = response.resData;
                        console.log(arry)
                        let str = '';
                        let  arryAll= [];
                        for(var i = 0; i < arry.length; i++){
                            if(arry[i].isEffective == "true"){
                                arry[i].isBoolean = '是'
                            }else{
                                arry[i].isBoolean = '否'
                            }
                            arryAll.push(arry[i]);
                        }
                        console.log(arryAll)
                        this.dataLookInfo = arryAll;
                        this.items = arryAll.length;
                        //判断是否有效
                        let effectiveNum = 0;
                        this.dataLookEffective=[];
                        for(var i=0;i<arry.length;i++){
                            if(arry[i].isEffective == "true"){
                                effectiveNum ++;
                                this.dataLookEffective.push(arry[i]);
                            }
                        }

                        this.itemse = effectiveNum;

                        str = arryAll.join('\n');
                    }
        },
        handleSuccessAccount2(response, file, fileList){
         document.getElementById("importAccountBtn2").disabled=false;
                if(response.message != null){
                    this.$Message.warning(response.message);
                }
                if(response.resData){
                    const arry = response.resData;
                    console.log(arry)
                    let str = '';
                    let  arryAll= [];
                    for(var i = 0; i < arry.length; i++){
                        if(arry[i].isEffective == "true"){
                            arry[i].isBoolean = '是'
                        }else{
                            arry[i].isBoolean = '否'
                        }
                        arryAll.push(arry[i]);
                    }
                    console.log(arryAll)
                    this.dataLookInfoTwo = arryAll;

                    //判断是否有效
                    let effectiveNum = 0;
                    this.dataLookTwoEffective=[];
                    for(var i=0;i<arry.length;i++){
                        if(arry[i].isEffective == "true"){
                            effectiveNum ++;
                            this.dataLookTwoEffective.push(arry[i]);
                        }
                    }
                    this.items2 = arryAll.length;

                    this.items2e = effectiveNum;

                    str = arryAll.join('\n');
                }
        },
        handleSuccessAccount3(response, file, fileList){
        document.getElementById("importAccountBtn3").disabled=false;
                if(response.message != null){
                        this.$Message.warning(response.message);
                    }
                    if(response.resData){
                        const arry = response.resData;
                        console.log(arry)
                        let str = '';
                        let  arryAll= [];
                        for(var i = 0; i < arry.length; i++){
                            if(arry[i].isEffective == "true"){
                                arry[i].isBoolean = '是'
                            }else{
                                arry[i].isBoolean = '否'
                            }
                            arryAll.push(arry[i]);
                        }
                       // console.log(arryAll)
                        this.dataLookInfoThreeFirst = arryAll;
                         //判断是否有效
                        let effectiveNum = 0;
                        this.dataLookThreeEffective1=[];
                        for(var i=0;i<arry.length;i++){
                            if(arry[i].isEffective == "true"){
                                effectiveNum ++;
                                this.dataLookThreeEffective1.push(arry[i]);
                            }
                        }
                        this.items3 = arryAll.length;

                        this.items3e = effectiveNum;

                       // str = arryAll.join('\n');
                        //this.formValidate.desc = str;
                    }
        },
        handleSuccessAccount4(response, file, fileList){
        document.getElementById("importAccountBtn4").disabled=false;
                if(response.message != null){
                        this.$Message.warning(response.message);
                    }
                    if(response.resData){
                        const arry = response.resData;
                        console.log(arry)
                        let str = '';
                        let  arryAll= [];
                        for(var i = 0; i < arry.length; i++){
                            if(arry[i].isEffective == "true"){
                                arry[i].isBoolean = '是'
                            }else{
                                arry[i].isBoolean = '否'
                            }
                            arryAll.push(arry[i]);
                        }
                       // console.log(arryAll)
                        this.dataLookInfoThreeSecond = arryAll;

                         //判断是否有效
                        let effectiveNum = 0;
                        this.dataLookThreeEffective2=[];
                        for(var i=0;i<arry.length;i++){
                            if(arry[i].isEffective == "true"){
                                effectiveNum ++;
                                this.dataLookThreeEffective2.push(arry[i]);
                            }
                        }
                        this.items4 = arryAll.length;

                        this.items4e = effectiveNum;

                       // str = arryAll.join('\n');
                        //this.formValidate.desc = str;
                    }
        },
        handleSuccessAccount5(response, file, fileList){
        document.getElementById("importAccountBtn5").disabled=false;
                 if(response.message != null){
                        this.$Message.warning(response.message);
                    }
                    if(response.resData){
                        const arry = response.resData;
                        console.log(arry)
                        let str = '';
                        let  arryAll= [];
                        for(var i = 0; i < arry.length; i++){
                            if(arry[i].isEffective == "true"){
                                arry[i].isBoolean = '是'
                            }else{
                                arry[i].isBoolean = '否'
                            }
                            arryAll.push(arry[i]);
                        }
                        console.log(arryAll)
                        this.dataLookInfoFour = arryAll;
                        this.items5 = arryAll.length;

                        //判断是否有效
                        let effectiveNum = 0;
                        this.dataLookInfoFourEffective=[];
                        for(var i=0;i<arry.length;i++){
                            if(arry[i].isEffective == "true"){
                                effectiveNum ++;
                                this.dataLookInfoFourEffective.push(arry[i]);
                            }
                        }
                        this.items5e = effectiveNum;

                        str = arryAll.join('\n');
                        //this.formValidate.desc = str;
                    }
        },
        handleSubmitOne(name) {
                this.$refs[name].validate((valid) => {
                 if(this.ishide==false){
                    return;
                 }
                    console.log(1);
                     //验证显示行数是否为整数
                        if(this.formValidateOne.inputOne){
                            var r = /^[1-9]\d*$/;
                            if(r.test(this.formValidateOne.inputOne) == false){
                                this.$Message.error('显示行数不能为小数！请输入整数！');
                                this.addClass(document.getElementById('AccountForm1'),'ivu-form-item-error');
                                return;
                            }
                            this.removeClass(document.getElementById('AccountForm1'),'ivu-form-item-error');
                        }
                     if(this.dataLookEffective.length==0){
                        this.$Message.error('上传数据不能为空!');
                        return;
                     }
                     if(this.inputNumberOne >=1 || this.inputNumberOne <=0 || !(/^[0-9]+([.]{1}[0-9]+){0,1}$/).test(this.inputNumberOne)){
                            this.$Message.error('请输入0-1之间的数!');
                            return;
                    }
                    if (valid) {
                        this.$Message.success('提交成功!请等待~');
                        this.ishide = false;
                        this.searchOne();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
        },
        handleSubmitTwo(name) {
                this.$refs[name].validate((valid) => {
                if(this.ishide==false){
                    return;
                }
                    console.log(1);
                     //验证显示行数是否为整数
                        if(this.formValidateTwo.inputTwo){
                            var r = /^[1-9]\d*$/;
                            if(r.test(this.formValidateTwo.inputTwo) == false){
                                this.$Message.error('显示行数不能为小数！请输入整数！');
                                this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                                return;
                            }
                            this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                        }
                    if(this.dataLookTwoEffective.length==0){
                        this.$Message.error('上传数据不能为空!');
                        return;
                    }
                    if (valid) {
                        this.$Message.success('提交成功!请等待~');
                        this.ishide = false;
                        this.searchTwo();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
        },
        handleSubmitThree(name) {
                this.$refs[name].validate((valid) => {
                if(this.ishide==false){
                    return;
                }
                    console.log(1);
                     //验证显示行数是否为整数
                        if(this.formValidateThree.inputThree){
                            var r = /^[1-9]\d*$/;
                            if(r.test(this.formValidateThree.inputThree) == false){
                                this.$Message.error('显示行数不能为小数！请输入整数！');
                                this.addClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
                                return;
                            }
                            this.removeClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
                        }

                     if(this.formValidateThree.singleThree == '先进先出'){
                     if(this.dataLookThreeEffective1.length==0){
                         this.$Message.error('先进先出上传数据不能为空!');
                         return;
                    }
                }
                if(this.formValidateThree.singleThree == '后进先出'){
                     if(this.dataLookThreeEffective2.length==0){
                          this.$Message.error('后进先出上传数据不能为空!');
                                return;
                    }
                }

                if (valid) {
                    this.$Message.success('提交成功!请等待~');
                    this.ishide = false;
                    this.searchThree();
                } else {
                    this.$Message.error('表单验证失败!');
                }
                })
        },
        handleSubmitFour(name) {
                this.$refs[name].validate((valid) => {
                if(this.ishide==false){
                      return;
                }
                    console.log(1);
                     //验证显示行数是否为整数
                        if(this.formValidateFour.inputFour){
                            var r = /^[1-9]\d*$/;
                            if(r.test(this.formValidateFour.inputFour) == false){
                                this.$Message.error('显示行数不能为小数！请输入整数！');
                                this.addClass(document.getElementById('AccountForm4'),'ivu-form-item-error');
                                return;
                            }
                            this.removeClass(document.getElementById('AccountForm4'),'ivu-form-item-error');
                        }
                    if(this.dataLookInfoFourEffective.length==0&&this.dataLookEffective.length==0){
                        this.$Message.error('上传数据不能为空!');
                        return;
                   }
                    if (valid) {
                        this.$Message.success('提交成功!请等待~');
                        this.ishide = false;
                        this.searchFour();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
        },
        getUrlParams:function(url){ //获取参数
                var urlArray=url.split("?")[1].split("&"),
                    urlValue={};
                for(var i=0;i<urlArray.length;i++){
                    var urlRowArray=urlArray[i].split("=");
                    urlValue[urlRowArray[0]]=urlRowArray[1];
                }
                return urlValue;
        },
        handleView(name) {
                this.imgName = name;
                this.visible = true;
        },
        handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 xls 格式的表格。'
                });
        },
        handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
                 document.getElementById("importAccountBtn1").disabled=false;
                 document.getElementById("importAccountBtn2").disabled=false;
                 document.getElementById("importAccountBtn3").disabled=false;
                 document.getElementById("importAccountBtn4").disabled=false;
                 document.getElementById("importAccountBtn5").disabled=false;
        },
        handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 个表格。'
                    });
                }
                return check;
        },
         handleBeforeUpload1() {
               document.getElementById("importAccountBtn1").disabled=true;
        },
         handleBeforeUpload2() {
               document.getElementById("importAccountBtn2").disabled=true;
        },
         handleBeforeUpload3() {
               document.getElementById("importAccountBtn3").disabled=true;
        },
        handleBeforeUpload4() {
               document.getElementById("importAccountBtn4").disabled=true;
        },
         handleBeforeUpload5() {
               document.getElementById("importAccountBtn5").disabled=true;
        },
        enableUpload1() {
               document.getElementById("importAccountBtn1").disabled=false;
        },
        enableUpload2() {
               document.getElementById("importAccountBtn2").disabled=false;
        },
        enableUpload3() {
               document.getElementById("importAccountBtn3").disabled=false;
        },
         enableUpload4() {
               document.getElementById("importAccountBtn4").disabled=false;
        },
         enableUpload5() {
               document.getElementById("importAccountBtn5").disabled=false;
        },

        searchOne: function () {
                var calExportBtnOne = document.getElementById("calExportBtnOne");
                    this.returnN=1;
                    this.returnTotal=0;
                    this.data1=[];

                    this.dataArrayAll=[];

                //jsonOne数据
                var arrayOne = {}
                var inputNumberOne = this.inputNumberOne
                var inputOne = this.formValidateOne.inputOne
                arrayOne.inputNumberOne = this.inputNumberOne
                arrayOne.inputOne = this.formValidateOne.inputOne
                var jsonOne = JSON.stringify(arrayOne)
                console.log(jsonOne);
                //查询记录数提示变化
                this.datalength1 = 0;
                document.getElementById("infoTableList1").innerHTML="查询结果共 "+this.datalength1+" 条记录";

                var requestParam={
                    "userId":srcUseridA,
                    "userName":srcUsernameA,
                    "limit":this.formValidateOne.inputOne,
                    "commRate":this.inputNumberOne,
                    "dwSessonid":dwSessionidA,
                    "tranDetailList":this.dataLookEffective

                };
                //获取数据 并传递数据
               var _this=this;
               const url = '/dwapp/mktdt/io_detail_fee';
               this._fetch(fetch(url, {
                        method: "POST",
                        body: JSON.stringify(requestParam),
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/json",
                            "signature":signatureA,
                            "Authorization":AuthorizationA
                        }
                    }), 600000).then(function (response) {
                    return response.json()
                }, function (error) {
                    console.log(error);
                    _this.ishide = true;
                }).then(data => {
                    if(this.t != ''){
                       clearTimeout(this.t);
                    }
                    if(data.resData == null){
                       _this.ishide = true;
                       this.$Message.warning("查询出错"+data.message);
                    }else if(data.resData.length == 0){
                       _this.ishide = true;
                       this.$Message.warning("查询无数据！");
                    }else{
                       calExportBtnOne.removeAttribute("disabled");
                        var dataResponse = data.resData;
                        this.datalength1 = data.respSize;
                        this.dataArrayAll=[];
                        this.dataArrayAll=dataResponse;//保存所有数据
                        this.returnN=1;
                        this.returnTotal=dataResponse.length;
                        var tmpLimit=this.pageSize;
                        if(tmpLimit>dataResponse.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.length;
                        }
                        this.data1=this.dataArrayAll.slice(0,tmpLimit);
                        this.ishide = true;
                        //查询结果提示变化
                        if(this.formValidateOne.inputOne<this.datalength1){
                            document.getElementById("infoTableList1").innerHTML="查询结果共 "+this.datalength1+" 条记录，当前页面只显示前"+this.formValidateOne.inputOne+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("infoTableList1").innerHTML="查询结果共 "+this.datalength1+" 条记录";
                        }
                    }
                })
        },
        searchTwo: function () {
                var calExportBtnTwoFirst = document.getElementById("calExportBtnTwoFirst");
                var calExportBtnTwoSecond = document.getElementById("calExportBtnTwoSecond");
                    this.returnN2=1;
                    this.returnTotal2=0;
                    this.data2=[];
                    this.dataArrayAll2=[];
                //jsonTwo数据
                var arrayTwo = {}
                var singleTwo = this.formValidateTwo.singleTwo
                var inputTwo = this.formValidateTwo.inputTwo
                arrayTwo.singleTwo = this.formValidateTwo.singleTwo
                arrayTwo.inputTwo = this.formValidateTwo.inputTwo
                var jsonTwo = JSON.stringify(arrayTwo)
                console.log(jsonTwo);
                var algorithm="0";
                  if(this.formValidateTwo.singleTwo == '先进先出'){
                    algorithm="0";

                }
                if(this.formValidateTwo.singleTwo == '后进先出'){
                    algorithm="1";

                }

                 if(this.formValidateTwo.singleTwo == '先进先出'){
                    console.log(1)

                    this.columns2 =  this.columnsTwoFirst;
                    this.data2=[];
                }
                if(this.formValidateTwo.singleTwo == '后进先出'){
                    console.log(2)

                    this.columns2 = this.columnsTwoSecond;
                    this.data2=[];

                }
                //查询记录数提示变化
                this.datalength2 = 0;
                document.getElementById("infoTableList2").innerHTML="查询结果共 "+this.datalength2+" 条记录";
                var requestParam={
                        "userId":srcUseridA,
                        "userName":srcUsernameA,
                        "limit":this.formValidateTwo.inputTwo,
                        "algorithm":algorithm,
                        "dwSessonid":dwSessionidA,
                        "FifoLifoExcel02":this.dataLookTwoEffective
                };
                var _this=this;
                //获取数据 并传递数据
                const url = '/dwapp/mktdt/io_sale_record';
                this._fetch(fetch(url, {
                        method: "POST",
                        body: JSON.stringify(requestParam),
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/json",
                            "signature":signatureA,
                            "Authorization":AuthorizationA
                        }
                }), 600000).then(function (response) {
                    return response.json()
                }, function (error) {
                    console.log(error);
                    _this.ishide = true;
                }).then(data => {
                   if(this.t != ''){
                    clearTimeout(this.t);
                   }
                  if(data.resData == null ){
                       _this.ishide = true;
                       this.$Message.warning("查询出错"+data.message);
                    }

                    else if(data.resData.length == 0){
                       _this.ishide = true;
                       this.$Message.warning("查询无数据！");
                    }else{
                      if(data.resData.length>0){
                       if(this.formValidateTwo.singleTwo == '先进先出'){
                        calExportBtnTwoFirst.removeAttribute("disabled");
                        calExportBtnTwoSecond.removeAttribute("disabled");
                        calExportBtnTwoSecond.setAttribute("disabled","true");
                       }else{
                       calExportBtnTwoSecond.removeAttribute("disabled");
                       calExportBtnTwoFirst.removeAttribute("disabled");
                       calExportBtnTwoFirst.setAttribute("disabled","true");
                       }

                      }

                    var dataResponse = data.resData;
                    this.datalength2 = data.respSize;
                    this.dataArrayAll2=[];
                    this.dataArrayAll2=dataResponse;//保存所有数据
                    this.returnN2=1;
                    this.returnTotal2=dataResponse.length;
                    var tmpLimit=this.pageSize2;
                    if(tmpLimit>dataResponse.length){
                    //如果加载数据少，全部返回
                        tmpLimit=dataResponse.length;
                    }
                       this.data2=this.dataArrayAll2.slice(0,tmpLimit);
                        this.ishide = true;
                    //查询结果提示变化
                    if(this.formValidateTwo.inputTwo<this.datalength2){
                        document.getElementById("infoTableList2").innerHTML="查询结果共 "+this.datalength2+" 条记录，当前页面只显示前"+this.formValidateTwo.inputTwo+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                    }else{
                        document.getElementById("infoTableList2").innerHTML="查询结果共 "+this.datalength2+" 条记录";
                    }
                }
                })
        },
        searchThree: function () {
                var calExportBtnThreeFirst = document.getElementById("calExportBtnThreeFirst");
                var calExportBtnThreeSecond = document.getElementById("calExportBtnThreeSecond");
                    this.returnN3=1;
                    this.returnTotal3=0;
                    this.data3=[];
                    this.dataArrayAll3=[];

                //jsonTHree数据
                var arrayThree = {}
                var singleThree = this.formValidateThree.singleThree
                var inputThree = this.formValidateThree.inputThree
                arrayThree.singleThree = this.formValidateThree.singleThree
                arrayThree.inputThree = this.formValidateThree.inputThree
                var jsonThree = JSON.stringify(arrayThree)
                console.log(jsonThree);
                var algorithm="0";
                 if(this.formValidateThree.singleThree == '先进先出'){
                    algorithm="0";
                }
                if(this.formValidateThree.singleThree == '后进先出'){
                   algorithm="1";
                }

                 if(this.formValidateThree.singleThree == '先进先出'){
                    console.log(1)
                    this.columns3 = this.columnsThreeFirst;
                    this.data3=[];
                }
                if(this.formValidateThree.singleThree == '后进先出'){
                    console.log(2)
                    this.columns3 = this.columnsThreeSecond;
                    this.data3=[];
                }
                //查询记录数提示变化
                this.datalength3 = 0;
                document.getElementById("infoTableList3").innerHTML="查询结果共 "+this.datalength3+" 条记录";
                var requestParam={
                    "userId":srcUseridA,
                    "userName":srcUsernameA,
                    "limit":this.formValidateThree.inputThree,
                    "algorithm":algorithm,
                    "dwSessonid":dwSessionidA,
                    "profitFifoList":this.dataLookThreeEffective1,
                    "profitLifoList":this.dataLookThreeEffective2
                };

                //获取数据 并传递数据
                const url = '/dwapp/mktdt/io_gain_count';
                this._fetch(fetch(url, {
                        method: "POST",
                        body: JSON.stringify(requestParam),
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/json",
                            "signature":signatureA,
                            "Authorization":AuthorizationA
                        }
                }), 600000).then(function (response) {
                    return response.json()
                }, function (error) {
                    console.log(error);
                    _this.ishide = true;
                }).then(data => {
                 if(this.t != ''){
                    clearTimeout(this.t);
                }
                if(data.resData == null){
                       _this.ishide = true;
                       this.$Message.warning("查询出错"+data.message);
                }

                else if(data.resData.length == 0){
                       _this.ishide = true;
                       this.$Message.warning("查询无数据！");
                    }else{
                    if(data.resData.length>0){
                        if(this.formValidateThree.singleThree == '先进先出'){
                            calExportBtnThreeFirst.removeAttribute("disabled");
                            calExportBtnThreeSecond.removeAttribute("disabled");
                            calExportBtnThreeSecond.setAttribute("disabled","true");
                        }else{
                            calExportBtnThreeSecond.removeAttribute("disabled");
                            calExportBtnThreeFirst.removeAttribute("disabled");
                            calExportBtnThreeFirst.setAttribute("disabled","true");
                        }

                    }
                    this.columns = this.columns4;
                    var dataResponse = data.resData;
                    this.datalength3 = data.respSize;
                    this.dataArrayAll3=[];
                    this.dataArrayAll3=dataResponse;//保存所有数据
                    this.returnN3=1;
                    this.returnTotal3=dataResponse.length;
                    var tmpLimit=this.pageSize3;
                    if(tmpLimit>dataResponse.length){
                    //如果加载数据少，全部返回
                        tmpLimit=dataResponse.length;
                    }
                       this.data3=this.dataArrayAll3.slice(0,tmpLimit);
                    this.ishide = true;
                    //查询结果提示变化
                    if(this.formValidateThree.inputThree<this.datalength3){
                        document.getElementById("infoTableList3").innerHTML="查询结果共 "+this.datalength3+" 条记录，当前页面只显示前"+this.formValidateThree.inputThree+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                    }else{
                        document.getElementById("infoTableList3").innerHTML="查询结果共 "+this.datalength3+" 条记录";
                    }
                }
            })
        },
        searchFour: function () {
                var calExportBtnFour = document.getElementById("calExportBtnFour");
                this.returnN4=1;
                this.returnTotal4=0;
                var data=[];
                this.data4=[];
                this.dataArrayAll4=[];
                if(this.dataLookInfoFour.length==0){
                    data=this.dataLookEffective;
                }else{
                    data=this.dataLookInfoFourEffective;
                }
                //查询记录数提示变化
                this.datalength4 = 0;
                document.getElementById("infoTableList4").innerHTML="查询结果共 "+this.datalength4+" 条记录";
                var requestParam={
                    "userId":srcUseridA,
                    "userName":srcUsernameA,
                    "dwSessonid":dwSessionidA,
                    "limit":this.formValidateFour.inputFour,
                    "highDeliList":data
                };
                //jsonFour数据
                var arrayFour = {}
                var inputFour = this.formValidateFour.inputFour
                arrayFour.inputFour = this.formValidateFour.inputFour
                var jsonFour = JSON.stringify(arrayFour)
                console.log(jsonFour)
                 var _this=this;
                //获取数据 并传递数据
                const url = '/dwapp/mktdt/io_high_tranf';
                this._fetch(fetch(url, {
                        method: "POST",
                        body: JSON.stringify(requestParam),
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/json",
                            "signature":signatureA,
                            "Authorization":AuthorizationA
                        }
                }), 600000).then(function (response) {
                    return response.json()
                }, function (error) {
                    console.log(error);
                    _this.ishide = true;
                }).then(data => {
                    if(this.t != ''){
                    clearTimeout(this.t);
                    }
                    if(data.resData == null ){
                       _this.ishide = true;
                       this.$Message.warning("查询出错"+data.message);
                    }
                    else if(data.resData.length == 0){
                       _this.ishide = true;
                       this.$Message.warning("查询无数据！");
                    }else{
                    calExportBtnFour.removeAttribute("disabled");
                    var dataResponse = data.resData;
                    this.datalength4 = data.respSize;
                    this.dataArrayAll4=[];
                    this.dataArrayAll4=dataResponse;//保存所有数据
                    this.returnN4=1;
                    this.returnTotal4=dataResponse.length;
                    var tmpLimit=this.pageSize4;
                    if(tmpLimit>dataResponse.length){
                    //如果加载数据少，全部返回
                        tmpLimit=dataResponse.length;
                    }
                       this.data4=this.dataArrayAll4.slice(0,tmpLimit);

                        this.ishide = true;
                        //查询结果提示变化
                        if(this.formValidateFour.inputFour<this.datalength4){
                            document.getElementById("infoTableList4").innerHTML="查询结果共 "+this.datalength4+" 条记录，当前页面只显示前"+this.formValidateFour.inputFour+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("infoTableList4").innerHTML="查询结果共 "+this.datalength4+" 条记录";
                        }
                   }
                })
        },
        radiochangeTwo :function(){
            if(this.formValidateTwo.singleTwo == '先进先出'){

            }
            if(this.formValidateTwo.singleTwo == '后进先出'){


            }
        },
        radiochangeThree :function() {
            if(this.formValidateThree.singleThree == '先进先出'){

            }
            if(this.formValidateThree.singleThree == '后进先出'){

            }
        },
        modelType: function(type){
            var params="&signature="+signatureA+"&Authorization="+AuthorizationA;
                       if (type === 1) {
                          //  window.location.href='/dwapp/download/downLoadFile?reportType=CJMX'+params;
                                   void(window.open('/dwapp/download/downLoadFile?reportType=CJMX'+params));
                            }else if (type === 2) {
                          //  window.location.href='/dwapp/download/downLoadFile?reportType=RECORD'+params;
                                   void(window.open('/dwapp/download/downLoadFile?reportType=RECORD'+params));
                        }else if (type === 3) {
                           // window.location.href='/dwapp/download/downLoadFile?reportType=PROFIT'+params;
                                   void(window.open('/dwapp/download/downLoadFile?reportType=PROFIT'+params));
                        }else if (type === 4) {
                         //   window.location.href='/dwapp/download/downLoadFile?reportType=PROFITFIFO'+params;
                                   void(window.open('/dwapp/download/downLoadFile?reportType=PROFITFIFO'+params));
                        }else if (type === 5) {
                           // window.location.href='/dwapp/download/downLoadFile?reportType=HIGH'+params;
                                   void(window.open('/dwapp/download/downLoadFile?reportType=HIGH'+params));
                        }
        },
        exportTable: function (type) {// 导出xls表格
                //导出参数
                var downfileParams="&signature="+signatureA+
                    "&userId="+srcUseridA+"&userName="+srcUsernameA+"&Authorization="+AuthorizationA;

                    if (type === 1) {
                      document.getElementById("calExportBtnOne").setAttribute("disabled",true);
                  setTimeout("document.getElementById('calExportBtnOne').removeAttribute('disabled')",5000);
                               void(window.open('/dwapp/download/dwapp_downfile?reportType=TRANDETAIL&fileType=xlsx'+"&commRate="+this.inputNumberOne+downfileParams));
                    } else if (type === 2) {
                     document.getElementById("calExportBtnTwoFirst").setAttribute("disabled",true);
                  setTimeout("document.getElementById('calExportBtnTwoFirst').removeAttribute('disabled')",5000);
                               void(window.open('/dwapp/download/dwapp_downfile?reportType=TRANRECORD&fileType=xlsx'+downfileParams));
                    }else if (type === 3) {
                     document.getElementById("calExportBtnTwoSecond").setAttribute("disabled",true);
                  setTimeout("document.getElementById('calExportBtnTwoSecond').removeAttribute('disabled')",5000);
                               void(window.open('/dwapp/download/dwapp_downfile?reportType=TRANRECORDLIFO&fileType=xlsx'+downfileParams));
                    }else if (type === 4) {
                     document.getElementById("calExportBtnThreeFirst").setAttribute("disabled",true);
                  setTimeout("document.getElementById('calExportBtnThreeFirst').removeAttribute('disabled')",5000);
                               void(window.open('/dwapp/download/dwapp_downfile?reportType=PROFITSTAT&fileType=xlsx'+downfileParams));
                    }else if (type === 5) {
                     document.getElementById("calExportBtnThreeSecond").setAttribute("disabled",true);
                  setTimeout("document.getElementById('calExportBtnThreeSecond').removeAttribute('disabled')",5000);
                               void(window.open('/dwapp/download/dwapp_downfile?reportType=PROFITSTATLIFO&fileType=xlsx'+downfileParams));
                    }else if (type === 6) {
                     document.getElementById("calExportBtnFour").setAttribute("disabled",true);
                  setTimeout("document.getElementById('calExportBtnFour').removeAttribute('disabled')",5000);
                               void(window.open('/dwapp/download/dwapp_downfile?reportType=HIGHDELI&fileType=xlsx'+downfileParams));
                    }
        },
    }
}
</script>


