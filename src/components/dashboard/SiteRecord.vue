<template>
  <div id="site-record">
    <b-container>
      <b-row>
        <b-col class="item-title" cols="12">
          <span class="title">建站记录</span>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" class="site-item">
          <b-row>
            <b-col cols="1">序号</b-col>
            <b-col cols="2">所属站群</b-col>
            <b-col cols="1">站点类型</b-col>
            <b-col cols="2">站点名称</b-col>
            <b-col cols="2">站点域名</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="2">状态</b-col>
          </b-row>
          <b-row v-for="(item,index) in siteItems" :key="item.id">
            <b-col cols="1">{{index+1}}</b-col>
            <b-col cols="2" class="omitting-something" :title="item['group_name']">{{item['group_name']}}</b-col>
            <b-col cols="1">{{item['type_name']}}</b-col>
            <b-col cols="2" class="omitting-something" :title="item['web_name']">{{item['web_name']}}</b-col>
            <b-col cols="2" class="omitting-something" :title="item.domain">{{item.domain}}</b-col>
            <b-col cols="2">
              <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
            </b-col>
            <b-col cols="2">
              <template v-if="item.state===1">
                <span class="under-review">审核中</span>
              </template>
              <template v-if="item.state===0">
                <span class="pass-review">审核通过</span>
              </template>
              <template v-if="item.state===3">
                <span class="fail-review">审核未通过</span>
                <span class="view" @click="viewReason(item['reason_refuse'])">查看</span>
              </template>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-fail-reason" size="xs" centered hide-header hide-footer>
      <p>未通过原因:</p>
      <p>{{reason}}
      </p>
    </b-modal>

    <div class="overflow-auto" style="margin-top: 50px;" v-if="totalPage>1">
      <!--use-router-->
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
    </div>

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
  import * as http from '../../../apis/net'

  export default {
    name: "SiteRecord",
    data() {
      return {
        reason: '',
        siteItems: [],
        cpage: 1,
        totalPage: 1
      }
    },
    watch: {
      '$route': 'fetchData',
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;
        this.getUserSiteRecord();
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`;
      },
      viewReason(reason) {
        this.reason = reason;
        this.$bvModal.show('modal-fail-reason');
      },
      getUserSiteRecord() {
        let params = {
          page: this.cpage,
          per_page: 24
        };
        http.getUserSiteRecord(params).then(rs => {
          if (!rs.code) {
            this.siteItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 24);
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
  #site-record {
    height: calc(100vh - 69px);
    background: url("../../assets/imgs/home-bg.png") no-repeat #000000;
    background-position: top;
    background-size: cover;
    width: 100%;
    padding-top: 25px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .container {
    width: 1200px !important;
    background: #ffffff;
    min-height: 655px;
    border-radius: 5px;
    padding: 20px;

    .row {
      margin: 0;
    }
  }

  .item-title {
    height: 30px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #dcdcdc;

    .title {
      padding-left: 10px;
      padding-right: 20px;
      font-size: 16px;
      border-bottom: 1px solid #3cb5f1;
      padding-bottom: 7px;
    }
  }

  .site-item {
    padding-top: 20px;

    .row {
      line-height: 40px;
      font-size: 14px;
      margin: 0;

      .col-1, .col-2 {
        padding: 0;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #eeeeee;
      border-radius: 5px;
    }
  }

  .under-review, .view {
    color: #3cb5f1;
  }

  .pass-review {
    color: #555555;
  }

  .fail-review {
    color: #ff0000;
    margin-right: 10px;
  }

  .view {
    cursor: pointer;
  }

  .omitting-something {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
