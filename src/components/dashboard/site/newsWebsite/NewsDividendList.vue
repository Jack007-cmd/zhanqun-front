<template>
  <div id="browser-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">分红列表</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30" style="padding: 0">
          <b-row>
            <b-form inline>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="category_id"
                :options="options"
                @change="queryData"
              >
              </b-form-select>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="year"
                :options="yearOptions"
                @change="queryData"
              >
              </b-form-select>
              <b-button @click="queryData" class="btn-search">搜索</b-button>
            </b-form>
          </b-row>
          <div class="browser-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="2">分类</b-col>
              <b-col cols="2">年份</b-col>
              <b-col cols="2">创建时间</b-col>
              <b-col cols="2">修改时间</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in bonusItems" :key="item.id">
              <b-col cols="2">{{index+1}}</b-col>
              <b-col cols="2">{{item['category_name']}}</b-col>
              <b-col cols="2">{{item.year}}</b-col>
              <b-col cols="2">
                <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
              </b-col>
              <b-col cols="2">
                <template v-if="item['updated_at']">{{item['updated_at'].substr(0,16)}}</template>
              </b-col>
              <b-col cols="2">
                <b-button @click="toUpdate(item.id)">编辑</b-button>
                <b-button @click="deleteBonus(item.id)">删除</b-button>
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
    name: "WebsiteList",
    data() {
      return {
        category_id: null,
        options: [
          {value: null, text: '请选择分类'},
        ],
        year: null,
        yearOptions: [
          {value: null, text: '请选择年份'},
        ],
        bonusItems: [],
        totalPage: 0,
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getBonusList();  // 向后台发数据请求
      },
      toEdit() {
        http.getBonusCategoryList().then(rs=>{
          if(!rs.code){
            if(rs.data.length == 0){
              this.$toast.success({
              message: "请先设置分类",
              color: '#3cb5f1'
              });
            }else{
              this.$router.push("/dashboard/site/ns-edit-dividend?type=1"); 
            }
          }
        });
      },
      toUpdate(id) {
        this.$router.push("/dashboard/site/ns-edit-dividend?type=2&id=" + id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      deleteBonus(id) {
        http.deleteBonus({id: id}).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "删除成功！",
              color: '#3cb5f1'
            });
            this.getBonusList();
          }
        });
      },
      getBonusList() {
        let params = {
          page: this.cpage,
          per_page:16
        };
        if(this.category_id){
          params['category_id'] = this.category_id;
        }
        if(this.year){
          params['year'] = this.year;
        }
        http.getBonusList(params).then(rs => {
          if (!rs.code) {
            this.bonusItems = rs.data;
          }
        });
      },
      getAllBonusCategoryList(){
        http.getAllBonusCategoryList().then(rs=>{
          if(!rs.code){
            rs.forEach(v=>{
              this.options.push({value:v.id,text:v.name});
            })
          }
        });
      },
      getYears(){
        let currentYear = new Date().getFullYear();
        for(let i=currentYear+10;i>currentYear-10;i--){
          this.yearOptions.push({value:i,text:i});
        }
      }
    },
    mounted() {
      this.getAllBonusCategoryList();
      this.getYears();
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #browser-list {}

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

  .browser-items {
    margin-top: 30px;
    border-left: 1px solid #d2d2d2;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;

      .col-1, .col-2, .col-3, .col-4 {
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

  .btn-search {
    background: #2a94de;
    border: none;
    width: 100px;
    margin-left: 10px;
    margin-top: 0;
  }
</style>
