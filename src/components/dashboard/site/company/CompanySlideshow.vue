<template>
  <div id="column-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">轮播图</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="1">位置</b-col>
            <b-col cols="1">图片</b-col>
            <b-col cols="2">链接</b-col>
            <b-col cols="2">状态</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="2">修改时间</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="item in slideItems" :key="item.id">
            <b-col cols="1">{{item['position_name']}}</b-col>
            <b-col cols="1"><img v-lazy="item['image']" :key="item['image']" alt=""></b-col>
            <b-col cols="2" :title="item['url']">{{item['url']}}</b-col>
            <b-col cols="2">
              <span @mouseover="getCurrentItem(item)">
                <switchc v-model="item.state" text="on|off" @change="getData"></switchc>
               </span>
            </b-col>
            <b-col cols="2">{{item['created_at'].substr(0,16)}}</b-col>
            <b-col cols="2">{{item['updated_at'].substr(0,16)}}</b-col>
            <b-col cols="2">
              <b-button @click="update(item.id)">编辑</b-button>
              <b-button @click="deleteSlide(item.id)">删除</b-button>
            </b-col>
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
  import SwitchComponent from '../../../common/SwitchComponent'

  export default {
    name: "CompanySlideshow",
    components: {
      'switchc': SwitchComponent
    },
    data() {
      return {
        slideItems: [],
        options: [
          {text: 'on', value: true},
          {text: 'off', value: false},
        ],
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
      getCurrentItem(item) {
        this.currentItem = item;
      },
      getData(data) {
        this.switchState(this.currentItem.id, data);
      },
      switchState(id, state) {
        let body = {
          id: id
        };
        if (state === 0) {
          http.setSlideVisible(body).then();
        } else {
          http.setSlideHidden(body).then();//  轮播图的显示隐藏
        }
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;
        this.getSlideshowList();
      },
      getSlideshowList() {
        let params = {
          per_page: 11,
          page: this.cpage
        };
        http.getSlideshowList(params).then(rs => {
          if (!rs.code) {
            this.slideItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 11);

          }
        });
      },
      deleteSlide(id) {
        if (confirm("确定要删除这张轮播图吗？")) {
          http.deleteSlide({id: id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
             message:"轮播图删除成功！",
            color:'#3cb5f1'
          });
              this.fetchData();
            }
          });
        }
      },

      toEdit() {
        this.$router.push("/dashboard/site/company-slides-edit?type=1");
      },
      update(id) {
        this.$router.push("/dashboard/site/company-slides-edit?type=2&id=" + id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },

    },
    mounted() {
      this.getSlideshowList();
      this.fetchData();
    }
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

      div {
        line-height: 50px;
      }
    }

    .row {
      color: #555;
    font-size: 14px;
    height: 80px;
    background: #eeeeee;
    border-bottom: 2px solid #ffffff;
    border-radius: 5px;

      div {
        line-height: 80px;
      }

      div:nth-of-type(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    img {
      width: 60px;
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
