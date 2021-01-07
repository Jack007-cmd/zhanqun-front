<template>
  <div id="user-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">用户列表</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="user-items">
          <b-row>
            <b-col cols="2">用户昵称</b-col>
            <b-col cols="2">电话</b-col>
            <b-col cols="3">注册时间</b-col>
            <b-col cols="2">发布文章数</b-col>
            <b-col cols="3">最近上线时间</b-col>
          </b-row>
          <b-row v-for="item in userItems" :key="item.id">
            <b-col cols="2">{{item.name}}</b-col>
            <b-col cols="2">{{item.phone}}</b-col>
            <b-col cols="3"><template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            <b-col cols="2">{{item['article_count']}}</b-col>
            <b-col cols="3"><template v-if="item['last_login_at']">{{item['last_login_at'].substr(0,16)}}</template></b-col>
          </b-row>
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
    name: "BlogUserList",
    data() {
      return {
        userItems: [],
        totalPage: 0,
        cpage: 1
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page | 1);
        this.getSiteUserList();
      },
      getSiteUserList() {
        let params = {
          page: this.cpage
        };
        http.getSiteUserList(params).then(rs => {
          this.userItems = rs.data;
          this.totalPage = Math.ceil(rs.total / 15);
        });
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
    },
    mounted() {
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #user-list {}

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

  .user-items {
    margin: 30px auto;

    .row {
      color: #555;
    font-size: 14px;
    line-height: 50px;
    background: #eeeeee;
    border-bottom: 2px solid #ffffff;
    }

    .row:first-child {
      border-radius: 5px;
      font-size: 16px;
      background: #dcdcdc;
    }
  }
</style>
