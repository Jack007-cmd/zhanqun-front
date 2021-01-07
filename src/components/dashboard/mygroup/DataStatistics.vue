<template>
  <div id="seo-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">访问数据统计</span>
        </b-col>
      </b-row>
      <b-row class="create-info">
        <b-col cols="12" class="mtb30">
          <b-row class="clear" style="line-height:34px;">
            时间：
            <span class="chg_time" :class="activeClass == 1 ? 'on':''" @click="changeDate(1)">今天</span>
            <span class="chg_time" :class="activeClass == 3 ? 'on':''" @click="changeDate(3)">3天</span>
            <span class="chg_time" :class="activeClass == 7 ? 'on':''" @click="changeDate(7)">7天</span>
            <input type="text" id="startDate" class="wdate" placeholder="请输入日期" :value="startVal">
            <span class="chg_line"></span>
            <input type="text" id="endDate" class="wdate" placeholder="请输入日期" :value="endVal">
            <b-form inline>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="请输入URL" v-model="search" @change="queryData" style="height:34px;line-height:34px;">
                <span class="input-group-addon glyphicon glyphicon-search" @click="queryData" style="width:75px;padding:4px 12px"></span>
              </div>
            </b-form>            
          </b-row>
          <div class="leaf-items">
            <b-row>
              <b-col cols="1">排序</b-col>
              <b-col cols="1">站点分类</b-col>
              <b-col cols="2">站点名称</b-col>
              <b-col cols="2">链接</b-col>
              <b-col cols="2">浏览量(PV)</b-col>
              <b-col cols="2">访客数(UV)</b-col>
              <b-col cols="2">浏览量占比</b-col>
            </b-row>
            <b-row v-for="(item,index) in leafItems" :key="index">
              <!--id	单页id	是	[int]	查看-->
              <!--4	 name	名称	是	[string]-->
              <!--5	 identify	标识	是	[string]-->
              <!--6	 sort	排序	是	[int]	查看-->
              <!--7	 created_at	创建时间	是	[string]	查看-->
              <!--8	 updated_at	修改时间-->
              <b-col cols="1">{{index+1}}</b-col>
              <b-col cols="1" :title="item.type">{{item.type}}</b-col>
              <b-col cols="2" :title="item.name">{{item.name}}</b-col>
              <b-col cols="2" class="access_item" :title="item.domain"><a :href="'http://'+item.domain" target="_blank">{{item.domain}}</a></b-col>
              <b-col cols="2">{{item.pv}}</b-col>
              <b-col cols="2">{{item.uv}}</b-col>
              <b-col cols="2">{{parseFloat(item.ratio).toFixed(2)}}%</b-col>
            </b-row>
            <div v-if="totalPage>1" style="margin-top: 50px;">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                                align="center"></b-pagination-nav>
            </div>
          </div>

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
import '../../../../static/js/laydate/laydate.js'

  export default {
    name: "DataStatistics",
    data() {
      return {
          visitList:{
              start_at:'',
              end_at:''
          },
          startVal:'',
          endVal:'',
          activeClass:1,
          search: '',
          leafItems: [],
          totalPage: 0,
          cpage: 1          
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
        this.getPvAccess();
        this.startVal='';
        this.endVal='';
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
      //时间插件
      getStartDate () {
        laydate.render({
          elem: '#startDate',
          done: (value) => {
            this.startVal = value;
            this.activeClass = 0;
            this.visitList.start_at = value;
            if(value && this.endVal){
              this.getPvAccess();
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
              this.getPvAccess();
            }
          }
        })
      },
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getPvAccess();  // 向后台发数据请求
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getPvAccess() {
        let params = {
          page: this.cpage,
          start_at: this.visitList.start_at,
          end_at: this.visitList.end_at,
        };
        
        if (this.search) {
          params['domain'] = this.search;
        }
        http.getDataStatistics(params).then(rs => {
          if (!rs.code) {
            this.leafItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      },
    },
    mounted() {
        this.visitList.start_at = this.getBeforeDate(0);
        this.visitList.end_at = this.getBeforeDate(0);
        this.fetchData();
        this.getStartDate();
        this.getEndDate();
    },
    watch: {
      '$route': 'fetchData',
    },
  }

</script>

<style lang="scss" scoped>
  #seo-list {
    padding: 25px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 67px);
    // font-size: 15px;
  }

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
        background: #fff url('../../../assets/imgs/visit_arrow.png') no-repeat right;
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
  }
  .leaf-items {
    margin-top: 30px;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-left: 1px solid #d2d2d2;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;

      .col-1, .col-2 {
        padding: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      /*border-radius: 5px;*/
    }

    input {
      width: 32px;
      height: 30px;
      line-height: 30px;
      background: #eeeeee;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      text-align: center;
    }

    button {
      background: #01c36a;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 70px;
    }
  }
.glyphicon-search:before {
    content: "\e003";
    color: #ffffff;
    font-size: 24px;
  }

  .input-group {
    position: relative;
    left: 50px;
    
    display: table;
    border-collapse: separate;
  }

  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 400px;
    margin-bottom: 0;
    display: table-cell;

  }

  .input-group-addon {
    cursor: pointer;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #3cb5f1;
    border: 1px solid #3cb5f1;
    border-radius: 4px;
    display: table-cell;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }

  .input-group-addon, .input-group-btn {
    width: 80px;
    white-space: nowrap;
    vertical-align: middle;
  }
  .access_item{
    width: 100%;
    height: 50px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
.clear{
  clear: both;
}


</style>
