<template>
  <div id="column-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">广告管理</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <div>
            <b-row>
              <b-col cols="2">位置</b-col>
              <b-col cols="4">图片</b-col>
              <b-col cols="3">链接</b-col>
              <b-col cols="3">操作</b-col>
            </b-row>
            <b-row v-for="item in adItems" :key="item.id">
              <b-col cols="2">{{item['position_name']}}</b-col>
              <b-col cols="4"><img v-lazy="item.image" :key="item.image" alt=""></b-col>
              <b-col cols="3" :title="item.url">{{item.url}}</b-col>
              <b-col cols="3">
                <b-button @click="toUpdate(item.id)">编辑</b-button>
                <b-button @click="deleteAd(item.id)">删除</b-button>
              </b-col>
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
 import * as http from '../../../../../apis/site'

  export default {
    name: "TradeAdManage",
    data() {
      return {
        adItems: [],
        totalPage:1,
        cpage:1,
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
        this.cpage = Number(this.$route.query.page || 1);
        this.getAdList();
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getAdList() {
        let params= {
          page: this.cpage
        };
        http.getAdList(params).then(rs => {
          if(!rs.code) {
            this.adItems = rs.data;

          }
        });
      },
      // 添加     编辑     删除
      toEdit() {
        this.$router.push("/dashboard/site/trade-ad-edit?type=1");
      },
      toUpdate(id) {
        this.$router.push("/dashboard/site/trade-ad-edit?type=2&id=" + id);
      },
      deleteAd(id) {
        if(confirm("确定要删除这条广告吗？")){
          http.deleteAd({id: id}).then(rs => {
            if(!rs.code) {
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.fetchData();
            }
          });
        }
      },
    },
    mounted() {
        this.fetchData();
    },
  }
</script>

<style lang="scss" scoped>
  #column-manage {}

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

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 14px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }
        .btn-add {
          height: 26px;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-top: 0;
          margin-right: 50px;
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;

        }
      }
    }
  }

  .data-items {
    margin: 30px auto;

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      margin-bottom: 10px;
      height: 50px;
      border-radius: 5px;
    }

    .row {
      color:#555;
      font-size: 14px;
      height: 80px;
      border-bottom: 1px solid #dcdcdc;

      div {
        line-height: 50px;
      }
      div:nth-of-type(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
img {
      width: 300px;
      height: 60px;
      border-radius: 5px;
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
</style>
