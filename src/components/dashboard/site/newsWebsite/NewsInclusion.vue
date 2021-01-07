<template>
  <div id="inclusion-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">收录管理</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30" style="padding: 0">
          <div class="inclusion-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="2">类别</b-col>
              <b-col cols="2">电话</b-col>
              <b-col cols="4">网址</b-col>
              <b-col cols="2">时间</b-col>
            </b-row>
            <b-row v-for="(item,index) in inclusionItems" :key="item.id">
              <b-col cols="2">{{index+1}}</b-col>
              <b-col cols="2">{{item['category_name']}}</b-col>
              <b-col cols="2">{{item.phone}}</b-col>
              <b-col cols="4"  class="beyond-hiding" :title="item.urls">{{item.urls}}</b-col>
              <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
            <div v-if="totalPage>1" style="margin-top: 50px;">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                                align="center"></b-pagination-nav>
            </div>
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
    name: "WebsiteList",
    data() {
      return {
        text1: null,
        options: [
          {value: "true", text: 'on'},
          {value: 'false', text: 'off'},
        ],
        inclusionItems: [],
        totalPage: 0,
        cpage:1
      }
    },
    watch:{
      '$route':'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData(){
        this.cpage = Number(this.$route.query.page||1);
        this.getRecruit();
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getRecruit() {
        let params={
          page:this.cpage,
          per_page:17
        };
        http.getRecruit(params).then(rs => {
          if (!rs.code) {
            this.inclusionItems = rs.data;
            this.totalPage = Math.ceil(rs.total/17);
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
  #inclusion-list {}

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

        .btn-keep-sort, .btn-add {
          height: 26px;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-top: 0;
        }

        .btn-add {
          margin-right: 50px;
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;

        }

        .btn-keep-sort {
          margin-right: 10px;
          background: #099ae6;
          border: none;
          color: #ffffff;
        }
      }
    }
  }

  .mtb30 {
    margin: 30px auto;
  }

  .inclusion-items {
    margin-top: 30px;
    border-left: 1px solid #d2d2d2;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;

      .col-1, .col-2, .col-3 {
        padding: 0;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
    }

    input {
      width: 32px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      text-align: center;
      color: #555555;
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
    display: table;
    border-collapse: separate;
    margin-left: 100px;
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

  .form-group {
    margin-bottom: 0;

    div {
      height: 32px;
    }
  }
</style>
