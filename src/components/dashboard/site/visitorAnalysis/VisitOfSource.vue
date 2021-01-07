<template>
  <div id="seo-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">访问来源统计</span>
        </b-col>
      </b-row>
      <b-row class="create-info">
        <b-col cols="12" class="mtb30">
          <b-row class="clear" style="line-height:34px;">
            时间：
            <span class="chg_time" :class="activeClass == 1 ? 'on':''" @click="changeDate(1)">今天</span>
            <span class="chg_time" :class="activeClass == 3 ? 'on':''" @click="changeDate(3)">3天</span>
            <span class="chg_time" :class="activeClass == 7 ? 'on':''" @click="changeDate(7)">7天</span>
            <input type="text" id="startDate" class="wdate"  placeholder="请输入日期" :value="startVal">
            <span class="chg_line"></span>
            <input type="text" id="endDate" class="wdate"  placeholder="请输入日期" :value="endVal">
          </b-row>
          <b-row class="clear" style="height:150px;border-bottom:1px solid #EFEFEF;">
            <div class="seo_nec fst">
              <p class="seo_nec_title" style="padding: 0;">浏览量（ PV ）<span class="seo_nec_img"></span></p>
              <p class="seo_nec_num" style="padding: 0;">{{visitData.pv_total}}</p>
            </div>
            <div class="seo_nec">
              <p class="seo_nec_title">访客数（ UV ）<span class="seo_nec_img"></span></p>
              <p class="seo_nec_num">{{visitData.uv_total}}</p>              
            </div>
            <div class="seo_nec">
              <p class="seo_nec_title">IP数&nbsp;&nbsp; <span class="seo_nec_img"></span></p>
              <p class="seo_nec_num">{{visitData.iv_total}}</p>              
            </div>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="seo-info">
        <b-col cols="12" class="mtb30">
          <b-row class="clear" style="line-height:34px;">
            <select name="" id="seo_sel" v-model="seoSelVal" @change="getSelVal">
              <option v-for="item in seoSelData">{{item}}</option>
            </select>
          </b-row>
          <b-row style="margin-top:20px;margin-bottom:30px;">
            <div id="echart_left">
              <e-charts :options="pieOption" :autoresize="true"></e-charts>
            </div>
            <div id="echart_right">
              <e-charts :options="brkOption" :autoresize="true"></e-charts>
            </div>
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
import * as http from '../../../../../apis/site'
import '../../../../../static/js/laydate/laydate.js'
import ECharts from 'vue-echarts/components/ECharts';

require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");

  export default {
    name: "visitOfSource",
    components:{
      ECharts
    },
    data() {
      return {
          visitList:{
              start_at:'',
              end_at:''
          },
          startVal:'',
          endVal:'',
          activeClass:1,
          visitData:'',
          pieOption :{},
          pieSerData:{},
          brkOption:{},
          seoSelVal:'浏览量(PV)',
          seoSelData:["浏览量(PV)","访客数(UV)","IP数"],
          chartData: {
            x: [],
            PV: [],
            UV: [],
            IP: [],
            WZ: []
            // x: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
            // PV: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210],
            // UV: [10, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 210,230 ],
            // IP: [150, 232, 201, 154, 190, 330, 410, 132, 101, 134, 90, 230, 210],
            // WZ: [190, 252, 181, 154, 160, 230, 310, 152, 191, 154, 190, 330, 510],
          },
      }
    },


    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      changeDate(data){
        this.activeClass = data;
        data = data-1;
        this.visitList.end_at = this.getBeforeDate(0);
        this.visitList.start_at = this.getBeforeDate(data);
        this.getPvForSource();
        this.startVal='';
        this.endVal='';


      },
      getSelVal(){
        this.setPieOptions();
      },
      //日期时间计算
      getBeforeDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if(day <= n) {
            if(mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
      },
      getPvForSource(){
            http.getPvForSource(this.visitList).then(rs => {
                if (!rs.code) {
                    this.visitData  = rs;
                    this.setPieOptions();
                }
            });            
      },
      setVisitData(data){
        var arr = [];
        arr.push({value:data.direct_total,name:'直接访问',itemStyle: { color: '#4FA8FA' }});
        arr.push({value:data.search_total,name:' 搜索引擎',itemStyle: { color: '#6EC71F' }});
        arr.push({value:data.external_total,name:'外部链接',itemStyle: { color: '#F56E6A' } });
        arr.push({value:data.unknown_total,name:'未知类型',itemStyle: { color: '#005eff' } });
        return arr;
      },
      setBrkOption(data){
        var arr = {
            x: [],
            PV: [],
            UV: [],
            IP: [],
            WZ: []
            }
            if(data){
              data.forEach(v => {
                arr.x.push(v.times);
                arr.PV.push(v.direct_num);
                arr.UV.push(v.search_num);
                arr.IP.push(v.external_num);
                arr.WZ.push(v.unknown_num);
              });
            }
            return arr;
      },
      setPieOptions(){
        let that = this;
        if(this.seoSelVal=="浏览量(PV)"){
          that.pieSerData = that.setVisitData(that.visitData.pv);
          that.chartData = that.setBrkOption(that.visitData.pv.data);
        }else if(that.seoSelVal=="访客数(UV)"){
          that.pieSerData = that.setVisitData(that.visitData.uv);
          that.chartData = that.setBrkOption(that.visitData.uv.data);
        }else if(that.seoSelVal=="IP数"){
          that.pieSerData = that.setVisitData(that.visitData.iv);
          that.chartData = that.setBrkOption(that.visitData.iv.data);
        }
        that.pieOption={
              tooltip: {
                  trigger: 'item',
                  // formatter: '{a} <br/>{b} : {c} ({d}%)'
                  formatter: '{b} : {c} ({d}%)'
              },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      center: ['40%', '50%'],
                      data:that.pieSerData,
                      emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }                         
                        }
                      }
              ]              
        }

        that.brkOption = {
              title: {
                // text: '未来一周气温变化',
                // subtext: '纯属虚构'
              },
              tooltip: {
                // trigger: 'axis',
                axisPointer: {
                  type: 'cross'
                },
              },
              // tooltip: {
              //   // trigger: 'axis'
              //   trigger:'item' // 然后eCharts3有默认的格式的。
              // },
              // tooltip: {
                // trigger: 'item',
                // formatter: '{c}'
                // formatter: '{a} <br/>{b} : {c}'

              // },
              legend: {
                data: ['直接访问', '搜索引擎', '外部链接','未知类型'],
                // orient: 'vertical',
                // left: 'center',
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
                  magicType: {type: ['line']},
                  // magicType: {type: ['line', 'bar']},
                  restore: {},
                  saveAsImage: {}
                }
              },
              xAxis: [{
                type: 'category',
                // name: '时间',
                boundaryGap: false,
                data: that.chartData['x'],
              }, {
                splitLine: {
                  show: false,  //去掉背景的网格线
                  lineStyle: {
                    color: '#666666',  //坐标轴的颜色
                  },
                },
                // show: true,  //隐藏坐标轴及刻度
                axisLabel: {
                  textStyle: {
                    color: '#666666',  //坐标的字体颜色
                  },
                },
                axisLine: {
                  show: false, //隐藏坐标轴
                  lineStyle: {
                    color: '#666666',  //坐标轴的颜色
                  },
                },
                axisTick: {
                  show: true, //隐藏坐标轴的刻度
                },
              }],
              yAxis: [
                // 1eb86b
                // {
                //   type: 'value',
                // },
                {
                  splitLine: {
                    show: true,  //去掉背景的网格线
                    lineStyle: {
                      color: '#F2F2F2',  //坐标轴的颜色
                    },
                  },
                  // name: '访问量',
                  // show: true,  //隐藏坐标轴及刻度
                  axisLabel: {
                    textStyle: {
                      color: '#666666',  //坐标的字体颜色
                    },
                  },
                  axisLine: {
                    show: false, //隐藏坐标轴
                    lineStyle: {
                      color: '#E8E8E8',  //坐标轴的颜色
                    },
                  },
                  axisTick: {
                    show: false, //隐藏坐标轴的刻度
                  },
                }

              ],
              series: [
                {
                  name: '直接访问',
                  type: 'line',
                  data: that.chartData['PV'],
                  itemStyle: {
                    normal: {
                      color: '#4FA8FA',
                      lineStyle: {
                        color: '#4FA8FA'
                      },
                      label : {show: true}
                    }
                  },
                },
                {
                  name: '搜索引擎',
                  type: 'line',
                  data: that.chartData['UV'],
                  itemStyle: {
                    normal: {
                      color: '#6EC71F',
                      lineStyle: {
                        color: '#6EC71F'
                      },
                      label : {show: true}
                    }
                  },

                },
                {
                  name: '外部链接',
                  type: 'line',
                  data: that.chartData['IP'],
                  itemStyle: {
                    normal: {
                      color: "#F56E6A",//图例
                      lineStyle: {
                        color: '#F56E6A'
                      },
                      label : {show: true}
                    }
                  }
                },
                {
                  name: '未知类型',
                  type: 'line',
                  data: that.chartData['WZ'],
                  itemStyle: {
                    normal: {
                      color: "#005eff",//图例
                      lineStyle: {
                        color: '#005eff'
                      },
                      label : {show: true}
                    }
                  }
                }                
              ]
            };
      },
      //时间插件
      getStartDate () {
        laydate.render({
          elem: '#startDate',
          done: (value) => {
            this.startVal = value;
            this.activeClass = 0;
            this.visitList.start_at = value;
            if(value && this.endVal){
              this.getPvForSource();
            }
          }
        })
      },
      getEndDate () {
        laydate.render({
          elem: '#endDate',
          done: (value) => {
            this.endVal = value;
            this.activeClass = 0;
            this.visitList.end_at = value;
            if(value && this.startVal){
              this.getPvForSource();
            }            
          }
        })
      }
    },
    mounted() {
        this.visitList.start_at = this.getBeforeDate(0);
        this.visitList.end_at = this.getBeforeDate(0);
        this.getPvForSource();
        this.getStartDate();
        this.getEndDate();
    }
  }

</script>

<style lang="scss" scoped>
  #seo-list {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 10.4px;

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 12px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }
      }
    }
  }

  .create-info{
    color: #000000;
    padding-top: 30px;
    padding-right: 25px;
    padding-left: 25px;

    .chg_time{
      float: right;
      display: inline-block;
      height: 34px;
      line-height: 34px;
      margin-top: 0;
      margin-right: 15px;
      border: 1px solid #DDDDDD;
      width: 65px;
      cursor: pointer;
      border-radius: 5px;
    }
    
    .wdate{
        outline: none;
        border-radius: 5px;
        display: block;      
        border: #999 1px solid;
        height: 34px;
        line-height: 34px;
        width: 135px;
        padding: 0 0 0 10px;
        border: 1px solid #DDDDDD;
        background: #fff url('../../../../assets/imgs/visit_arrow.png') no-repeat right;
        background-size: 11px 6px;
        background-position: 94% 50%;
    }
    .chg_line{
      width: 10px;
      height: 1px;
      border-top: 2px solid #A8A8A8;
      margin: 15px 15px 0 15px;
    }
    .on{
      color: #ffffff;
      background: #089AE7;
      border: 1px solid #089AE7;
    }
    .seo_nec{
      position: relative;
      margin-top: 50px;
      width: 280px;
      height: 65px;
      border-left:1px solid #EEEEEE;
    }
    .fst{
      border: none;
    }
    .seo_nec p{
      position:absolute;
      padding: 0 0 0 45px;
      text-align: left;
    }
    .seo_nec_title{
      top: 3px;
      color: #989898;
    }
    .seo_nec_num{
      top: 36px;
      font-size: 18px;
    }
    .startDate .b-calendar output{
      height: 34px;
      line-height: 34px;
    }
    .seo_nec_img{
        display: inline-block;
        width: 16px;
        height: 16px; 
        background: #fff url('../../../../assets/imgs/visit_why.png') no-repeat right;
        background-size: 100% 100%;
        position: absolute;
        top: 5px;
    }
  }

.seo-info{
    color: #000000;
    padding-top: 20px;
    padding-right: 25px;
    padding-left: 25px;

    #echart_left{
      position: relative;
      width: 25%;
      height: 480px;
      float: left;
    }
    #echart_right{
      position: relative;
      width: 75%;
      height: 480px;
      float: left;
    }
    #echart_right .echarts{
      width: 100%;
    }
}

#seo_sel{
    outline: none;
    border-radius: 5px;
    display: block;
    border: #999 1px solid;
    height: 34px;
    line-height: 34px;
    width: 115px;
    padding: 0 0 0 10px;
    border: 1px solid #DDDDDD;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: #fff url('../../../../assets/imgs/visit_arrow.png') no-repeat right;
    background-size: 11px 6px;
    background-position: 94% 50%;
}
.clear{
  clear: both;
}


</style>
