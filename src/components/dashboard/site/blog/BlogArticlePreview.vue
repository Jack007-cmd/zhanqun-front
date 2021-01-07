<template>
  <div id="article-preview">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">预览</span>
        </b-col>
      </b-row>
      <b-row class="article-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>文章标题:</td>
              <td>{{article.title}}</td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">文章主图:</td>
              <td>
                <img v-lazy="article['cover_plan']" :key="article['cover_plan']" width="100" height="100" alt="">
              </td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">文章内容:</td>
              <td v-html="article.content">
              </td>
            </tr>
          </table>
          <div style="padding-left: 15%;" v-if="article.state===2">
            <b-button @click="setUserArticlePass(article.id)">审核通过</b-button>
            <b-button @click="setUserArticleRefuse(article.id)">审核不通过</b-button>
          </div>
          <div style="padding-left: 15%;" v-if="article.state!==2">
            <b-button @click="back">返回</b-button>
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
    name: "BlogArticlePreview",
    data(){
      return{
        article:{
          id:'',
          identify:'',
          title:'',
          cover_plan:'',
          content:'',
          state:'',
        },
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getUserArticleDetail(id){
        http.getUserArticleDetail({id:id}).then(rs=>{
          if(!rs.code){
          this.article = rs;
          }
        });
      },
      setUserArticlePass(id){
        http.setUserArticlePass({id:id}).then(rs=>{
          if(!rs.code){
            this.back();
          }
        });
      },
      setUserArticleRefuse(id){
        http.setUserArticleRefuse({id:id}).then(rs=>{
          if(!rs.code){
            this.back();
          }
        });
      }
    },
    mounted() {
      if(this.$route.query.id){
        this.getUserArticleDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #article-preview {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 10px;
        height: 40px;

        span {
          cursor: pointer;
          padding: 0 50px 15px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }
      }
    }
  }
  .article-info {
    padding-top: 30px;

    table {
      width: 50%;
      margin-left: 50px;

      tr {
        td:first-child {
          text-align: right;
          width: 100px;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }
    input{
      width: 100%;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 110px;
    }
  }
  /deep/ img{
    max-width: 95%;
  }
</style>
