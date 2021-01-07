<template>
  <div id="messages">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">留言反馈</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="2">称呼</b-col>
            <b-col cols="2">类型</b-col>
            <b-col cols="2">号码</b-col>
            <b-col cols="4">内容</b-col>
            <b-col cols="2">创建时间</b-col>
          </b-row>
          <b-row v-for="item in feedbackItems" :key="item.id">
            <b-col cols="2">{{item.name}}</b-col>
            <b-col cols="2">{{item['contact_way']}}</b-col>
            <b-col cols="2">{{item.contact}}</b-col>
            <b-col cols="4" :title="item.content">{{item.content}}</b-col>
            <b-col cols="2">{{item['created_at'].substr(0,16)}}</b-col>
          </b-row>
          <div v-if="totalPage>1" style="margin-top: 50px;">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                                align="center"></b-pagination-nav>
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
 import * as http from '../../../../../apis/site'

  export default {
    name: "LotteryMessageBack",
    data(){
      return{
        feedbackItems:[],
        totalPage: 0,
        cpage:1,
      }
    },
    watch: {
      '$route' : 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData(){
        this.cpage = Number(this.$route.query.page || 1);
        this.getFeedback();
      },
      linkGen(pageNum){
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      // 站点留言反馈列表
      getFeedback(){
        let params = {
          page:this.cpage
        };
        http.getFeedback(params).then(rs => {
          if(!rs.code){
            this.feedbackItems = rs.data;
            this.totalPage = Math.ceil(rs.total/15);
          }
        });
      }
    },
    mounted() {
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #messages {}
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
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
        button{
          color: #099ae6;
          border: 1px solid #099ae6;;
          background: #ffffff;
          height: 30px;
          line-height: 12px;
          font-size: 12px;
          float: right;
          margin-right: 100px;
        }
      }
    }
  }
  .data-items{
    margin: 30px auto;
    .row:first-child{
      background: #dcdcdc;
      line-height: 40px;
      font-size: 16px;
    }
    .row{
      line-height: 40px;
      background: #ffffff;
      border: 1px solid #dcdcdc;
      border-top: none;
      font-size: 14px;
      div:nth-of-type(4) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    button{
      background: #01c36a;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 70px;
    }
  }
</style>
