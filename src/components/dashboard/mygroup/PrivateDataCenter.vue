<template>
  <div id="private-data-center">

    <b-container fluid>
      <b-row style="margin: 0;">
        <b-col cols="9" class="left">
          <b-row class="chart">
            <b-col cols="12">
              <b-row>
                <b-col class="item-title" cols="12">
                  <span class="title">数据统计</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="data-board" cols="12">
                  <b-row>
                    <b-col cols="6" class="switch">
                      <span class="menu" @click="showChart=!showChart"></span>
                    </b-col>
                    <b-col cols="6" class="period" v-show="showChart">
                      <span :class="{ on: period==='today' }" class="{'on':period=='today'}" v-model="period"
                            @click="period='today'">今日</span>
                      <span :class="{ on : period==='week'}" v-model="period" @click="period='week'">近7天</span>
                      <span :class="{ on : period==='month'}" v-model="period" @click="period='month'">近30天</span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" class="echarts" v-show="showChart">
                      <!--<e-charts :options="chartOption" style="overflow: scroll;"></e-charts>-->
                      <e-charts :options="option"  :autoresize="true"></e-charts>
                    </b-col>
                    <b-col cols="12" v-show="showChart" class="term-desc">
                      <span>PV（Page View）访问量：</span>页面浏览量或点击量，衡量网站用户访问的网页数量；在一定统计周期内用户每打开或刷新一个页面就记录1次，多次打开或刷新同一页面则浏览量累计。<br>
                      <span>UV（Unique Visitor）独立访客：</span>统计1天内访问某站点的用户数(以cookie为依据);访问网站的一台电脑客户端为一个访客。可以理解成访问某网站的电脑的数量。<br>
                      <span>IP（Internet Protocol）独立IP数：</span>指1天内多少个独立的IP浏览了页面，即统计不同的IP浏览用户数量。同一IP不管访问了几个页面，独立IP数均为1；不同的IP浏览页面，计数会加1。
                    </b-col>
                    <b-col offset="1" cols="10" v-show="!showChart" style="padding-bottom: 30px;">
                      <div id="site-list">
                        <b-row>
                          <b-col cols="4" style="text-align: left">
                            <span>站点列表</span>
                          </b-col>
                          <b-col cols="8" class="input-div">
                            <input type="text" v-model="search" placeholder="请输入站点名称或站点域名" @change="queryData">
                            <b-button @click="queryData">搜索</b-button>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-form-group id="input-group-4"  style="text-align: left;margin: 25px;">
                            <b-form-checkbox-group  id="checkboxes-4">
                              <b-form-checkbox v-for="item in sites" :key="item.id" v-model="web_ids" :value="item.id">{{item.domain}}</b-form-checkbox>
                            </b-form-checkbox-group>
                          </b-form-group>
                        </b-row>
                        <b-row>
                          <b-col cols="3" class="checked-amount" style="display: inherit;">
                              <b-form-checkbox
                                    v-model="allSelected"
                                    name="checkbox-3"
                                    value="true"
                                    unchecked-value="false"
                                     @change="allSelectedChanged"
                                  >
                                    全选
                                  </b-form-checkbox>
                            &nbsp;&nbsp;&nbsp;&nbsp;已选择{{web_ids.length}}个站点
                          </b-col>
                          <b-col cols="6" offset="3" v-if="totalPage>1">
                            <div class="overflow-auto">
                              <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                                                align="right"></b-pagination-nav>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col offset-md="3" offset-sm="2" md="6" sm="4">
                            <b-button variant="danger" @click="checkChoose">确定</b-button>
                            <b-button variant="danger" @click="resetChoose">重置</b-button>
                          </b-col>
                        </b-row>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="3" class="right">
          <b-row class="bulletin">
            <b-col cols="12">
              <b-row class="bulletin-title"><span class="title">公告</span> <span class="more"></span></b-row>
              <b-row>
                <ul  style="list-style: square;">
                  <li> {{annunciateDetail}}</li>
                </ul>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="log">
            <b-col cols="12">
              <b-row class="log-title"><span class="title">操作日志</span>
                <span  style="display: block;position: absolute;right: 0;">
                <div @click="toRecord" style="display: flex;text-decoration: none;color: #555555;cursor: pointer;">
                <span class="nav-text" style="font-size: 14px;"> MORE   </span>
                </div>
                  </span>
              </b-row>
              <b-row>
                <div class='time-line'>
                  <div v-for='item in recordItems' class='time-line-div'>
                    <p></p>
                    <p ref='circular'></p>
                    <p class="log-content" :title="item.user.name+item.content">{{item.user.name}}{{item.content}}</p>
                  </div>
                  <div class='img-dotted' ref='dotted'></div>
                </div>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid style="background: transparent!important;">
      <b-row>
        <b-col class="back-window" cols="2">
          <span class="btn-back" @click="back"><i class="iconfont icon-fanhui"></i> 返回</span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import * as http from '../../../../apis/net'
  import ECharts from 'vue-echarts/components/ECharts';

  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/line');
  require("echarts/lib/component/legend");
  export default {
    name: "PrivateDataCenter",
    components: {
      ECharts
    },
    data() {
      return {
        cpage:1,
        search:'',
        totalPage:1,
        showChart: true,
        allSelected:true,
        period: 'today',
        web_ids: [],
        allSitesId: [],
        chartData: {
          x: [],
          PV: [],
          UV: [],
          IP: []
          // x: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
          // PV: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210],
          // UV: [10, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 210,230 ],
          // IP: [150, 232, 201, 154, 190, 330, 410, 132, 101, 134, 90, 230, 210]
        },
        sites:[],
        recordItems: [],
        option: {},
        annunciateDetail:''
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //获取公告内容
      getAnnunciateDetail() {
        http.getAnnunciateDetail().then(rs => {
          if (!rs.code) {
            this.annunciateDetail = rs.content;
          }
        });
      },
      resetChoose(){
        this.web_ids=[];
      },
      checkChoose(){
        this.showChart = true;
        this.getPrivateTargetSiteStatistics();
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      toRecord(){
        this.$router.push("/dashboard/my-group/operation-record");
      },
      getPrivateGoupLog() {
        let params = {
          page: 1
        };
        http.getPrivateGoupLog(params).then(rs => {
          if (!rs.code) {
            this.recordItems = rs.data;
          }
        });
      },
      getPrivateTargetSiteStatistics(){
        let that = this;
        let body={
          type:that.period,
        };
        if(that.web_ids.length>0){
          body['web_ids'] = that.web_ids;
        }
        http.getPrivateTargetSiteStatistics(body).then(rs=>{
          if(!rs.code){
            that.chartData={
              x:[],
              PV:[],
              UV:[],
              IP:[],
            };
            rs.forEach(v=>{
              that.chartData.x.push(v.times);
              that.chartData.PV.push(v.pv);
              that.chartData.UV.push(v.uv);
              that.chartData.IP.push(v.iv);
            });
            that.option = {
              title: {
                // text: '未来一周气温变化',
                subtext: '纯属虚构'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data:['PV','UV','IP'],
                orient: 'vertical',
                left: 'center',
                bottom: 'bottom',
                // orient: 'horizontal',
                // // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                // x: 'left',
                // // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                // y: 'top',
              },
              toolbox: {
                show: true,
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  dataView: {readOnly: false},
                  magicType: {type: ['line', 'bar']},
                  restore: {},
                  saveAsImage: {}
                }
              },
              xAxis:  [{
                type: 'category',
                name: '时间',
                boundaryGap: false,
                data: that.chartData['x'],
              },   {
                splitLine: {
                  show: false,  //去掉背景的网格线
                },
                // show: true,  //隐藏坐标轴及刻度
                axisLabel: {
                  textStyle: {
                    color: '#1eb86b',  //坐标的字体颜色
                  },
                },
                axisLine: {
                  show: false, //隐藏坐标轴
                  lineStyle: {
                    color: '#1eb86b',  //坐标轴的颜色
                  },
                },
                axisTick: {
                  show: false, //隐藏坐标轴的刻度
                },
              }],
              yAxis:  [
                // 1eb86b
                // {
                //   type: 'value',
                // }

                {
                  splitLine: {
                    show: false,  //去掉背景的网格线
                  },
                  name: '访问量',
                  // show: true,  //隐藏坐标轴及刻度
                  axisLabel: {
                    textStyle: {
                      // color: '#1eb86b',  //坐标的字体颜色
                    },
                  },
                  axisLine: {
                    show: true, //隐藏坐标轴
                    lineStyle: {
                      // color: '#1eb86b',  //坐标轴的颜色
                    },
                  },
                  axisTick: {
                    show: false, //隐藏坐标轴的刻度
                  },
                }

              ],
              series: [
                {
                  name:'PV',
                  type:'line',
                  data:that.chartData['PV'],
                  itemStyle: {
                    normal: {
                      color: '#3cb5f1',
                      lineStyle: {
                        color: '#3cb5f1'
                      },
                      label : {show: true}
                    }
                  },

                },
                {
                  name:'UV',
                  type:'line',
                  data:that.chartData['UV'],
                  itemStyle: {
                    normal: {
                      color: '#ff7664',
                      lineStyle: {
                        color: '#ff7664'
                      },
                      label : {show: true}
                    }
                  },

                },
                {
                  name:'IP',
                  type:'line',
                  data:that.chartData['IP'],
                  itemStyle: {
                    normal: {
                      color: "#b56cfc",//图例
                      lineStyle: {
                        color: '#b56cfc'
                      },
                      label : {show: true}
                    }
                  },
                  // markLine: {
                  //   data: [
                  //
                  //     [
                  //       {
                  //         symbol: 'none',
                  //         x: '90%',
                  //
                  //       },
                  //       {
                  //         symbol: 'circle',
                  //         label: {
                  //           normal: {
                  //
                  //           }
                  //         },
                  //         type: 'max',
                  //         name: '最高点'
                  //       }]
                  //   ]
                  // }
                }
              ]
            };
          }
        });
      },
      getPrivateSite(){
        let params={
          page:this.cpage,
          per_page:20,
          state:'0,2'
        };
        if(this.search){
          params['name_domain'] = this.search;
        }
        http.getPrivateSite(params).then(rs=>{
          if(!rs.code){
            this.sites = rs.data;
            this.totalPage = Math.ceil(rs.total/20);
          }
        });
      },
      fetchData(){
        this.cpage = Number(this.$route.query.page||1);
        this.getPrivateSite();
      },
      queryData(){
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      getPrivateAllSiteList() {
        let that = this;
        http.getPrivateAllSiteList().then(rs => {
          if (!rs.code) {
            let temp=[];
             rs.forEach(v=>{
               temp.push(v.id);
             });
            that.allSitesId = temp;
          }
        });
      },
      allSelectedChanged(){
        if(JSON.parse(this.allSelected)){
          this.web_ids = [];
          return;
        }
        this.web_ids = this.allSitesId;
      }
    },
    computed: {
      isFollow () {
        return this.$store.getters.identify;　　//需要监听的数据
      }
    },
    watch: {
      // isFollow (newVal, oldVal) {
      //   //do something
      //   window.location.reload();
      // },
      showChart:function(newVal, oldVal){
        if(!newVal && JSON.parse(this.allSelected)){
          this.web_ids = this.allSitesId;
        }
      },
      web_ids:function(newVal, oldVal){
        if(newVal && newVal.length!=this.allSitesId.length){
          this.allSelected = false;
        }
      },
      period: function (newVal, oldVal) {
        this.getPrivateTargetSiteStatistics();
      },
      '$route':'fetchData'
    },
    mounted() {
      this.getPrivateAllSiteList();
      this.getPrivateTargetSiteStatistics();
      this.getAnnunciateDetail();
      this.getPrivateGoupLog();
      this.fetchData();
      this.$refs.dotted.style.left = "-11px";
    }
  }
</script>

<style lang="scss" scoped>
  #private-data-center {
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    padding: 25px;
    .row{

      .left{
        padding: 0;
        .chart{
          margin: 0;
          border-radius: 10px;
        }
      }
     .right{

     }
    }
  }

  .item-title {
    height: 50px;
    line-height: 60px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #bfbfbf;
    .title {
      padding-left: 10px;
      font-size: 16px;
      border-bottom: 1px solid #3cb5f1;
      padding-bottom: 9px;
    }
  }

  .media-body h5 {
    text-align: left;
    /*font*/
  }

  .media {
    .media {
      div {
        padding-left: 20%;
      }

      img {
        width: 35px;
        height: 35px;
        float: left;
      }

      .media-body h5 {
        display: inline-block;
        margin-left: -60px;
        font-size: 34px;
      }
    }
  }

  .switch {
    text-align: left;
  }

  .period {
    text-align: right;
  }

  .period {

    span {
      cursor: pointer;
      display: inline-block;
      width: 70px;
      margin-left: 5px;
      text-align: center;
      padding: 2px 0;
      border: 1px solid #1db86c;
      border-radius: 5px;
    }

    .on {
      color: #ffff;
      background: #1db86c;
    }
  }

  .site-category {
    .row {
      line-height: 40px;

      .col-4 {
        padding: 0;
        border: 1px solid #d2d2d2;

      }
    }

    .row:first-child {
      background: #2a94de;
      color: #ffff;
      line-height: 50px;
    }
  }

  #site-list {
    margin-top: 10px;
    background: #ffff;
    padding: 20px;
    border: 1px solid #b3b3b3;
    box-shadow: 3px 3px 3px #b3b3b3, 3px -3px 3px #b3b3b3, -3px 3px 3px #b3b3b3, -3px -3px 3px #b3b3b3;;

    .input-div {
      text-align: right;

      button {
        background: #2a94de;
        border: none;
        width: 100px;
      }
    }

    input {
      min-width: 250px;
      max-width: 350px;
      height: 38px;
      border-radius: 10px;
      border: 1px solid #d2d2d2;
    }

    .btn-danger {
      width: 100px;
      background: #e60012;
      /*background: #2a94de;*/
      border: none;
    }

    .checked-amount {
      color: red;
      text-align: left;
      padding-left: 30px;
    }

    .custom-control-inline {
      margin-right: 35px;
      margin-bottom: 20px;
    }

    .form-group {
      /*padding-left: 30px;*/
      margin-top: 10px;
    }
  }

  .chart {
    padding: 0 10px;
    background: #ffffff;
    margin: 0 auto;
    margin-left: 15px;

    .menu {
      cursor: pointer;
      content: '';
      background: url("../../../assets/imgs/menu.png") no-repeat;
      display: block;
      background-size: 22px;
      height: 22px;
      width: 22px;
    }
  }

  .card {
    border: none;
  }

  .today-ns-count, .site-amount, .new-member-count, .member-amount {
    color: #ffffff;
    padding-left: 20px;
    padding-bottom: 15px;

    h5 {
      font-size: 18px;
      line-height: 36px;
    }
  }

  .today-ns-count {
    background: #3cb5f1;
  }

  .site-amount {
    background: #01c36a;
  }

  .new-member-count {
    background: #ff7664;
  }

  .member-amount {
    background: #b56cfc;
  }

  .bulletin, .log {
    /*background: #ffffff;;*/
    /*!*color: *!*/
    /*padding: 20px;*/
    /*margin-left: 5px;*/
    /*margin-bottom: 30px;*/
    background: #fff;
    padding: 20px;
    margin-left: 10px;
    margin-bottom: 25px;
    border-radius: 10px;
    ul {
      margin-left: -20px;
      width: 100%;
      padding-top: 10px;
      li {
        padding-left: 5px;
        color: #3cb5f1;
        line-height: 30px;
        text-align: left;
        font-size: 14px;
      }
    }

    .bulletin-title, .log-title {
      border-bottom: 1px solid #bfbfbf;
      height: 26px;
      line-height: 19px;
      padding: 0;
      .title{
        padding-left: 10px;
        padding-right: 30px;
        padding-bottom: 6.7px;
        border-bottom: 1px solid #3cb5f1;
      }
    }
  }

  .time-line {
    position: relative;
    width: 100%;
    /*width:300px;*/
    /*margin:0 auto;*/
  }

  .time-line-div {
    position: relative;
    min-height: 45px;
  }

  .time-line-div > p:nth-child(1) {
    position: absolute;
    /*left:0;*/
    /*width:100px;*/
  }

  .time-line-div > p:nth-child(2) {
    position: absolute;
    left: 3px;
    width: 9px;
    height: 9px;
    top: 17px;
    background: #3cb5f1;
    border-radius: 50%;
    z-index: 10;
  }

  .time-line-div > p:nth-child(3) {
    position: absolute;
    left: 15px;
    padding: 10px;
    /*background: #317EF3;*/
    font-size: 14px;
    color:#555555;
    border-radius: 10px;
  }

  .img-dotted {
    position: absolute;
    width: 19px;
    height: 100%;
    top: 17px;
    z-index: 1;
    border-right: 1px solid #3cb5f1;
    /*background:url('/static/dotted.png');*/
  }

  .log-content {
    width: 90%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .data-board {
    margin-top: 20px;
  }
  .echarts{
    width: 1000px;
    height: 600px;
    margin: auto;
    text-align: center;
    padding-bottom: 30px;
  }
  .term-desc {
    font-size: 14px;
    line-height: 30px;
    padding-bottom: 20px;
    text-align: left;
    span{
      font-weight: bold;
    }
  }
</style>
