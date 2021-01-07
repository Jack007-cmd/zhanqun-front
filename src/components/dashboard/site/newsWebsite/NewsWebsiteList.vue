<template>
  <div id="website-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">网站列表</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <b-row>
            <b-form inline>
              <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="selected"
                :options="options"
                @change="queryData"
              >
              </b-form-select>
              <div class="input-group">
                <input type="text" v-model="search" class="form-control" @change="queryData">
                <span class="input-group-addon glyphicon glyphicon-search" @click="queryData"></span>
              </div>
            </b-form>
          </b-row>
          <div class="site-items">
            <b-row>
              <b-col cols="1">序号</b-col>
              <b-col cols="2">名称</b-col>
              <b-col cols="2">网站图标</b-col>
              <b-col cols="2">网址</b-col>
              <b-col cols="1">排序</b-col>
              <b-col cols="2">网站类型</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in siteItems" :key="item.id">
              <b-col cols="1">{{index+1}}</b-col>
              <b-col cols="2"  class="beyond-hiding" :title="item.name">{{item.name}}</b-col>
              <b-col cols="2"><img v-lazy="item.logo" :key="item.logo" alt="" style="width: 40px;height: 40px;"></b-col>
              <b-col cols="2" class="beyond-hiding" :title="item.url">{{item.url}}</b-col>
              <b-col cols="1"><input type="number" min="0" v-model="item.sort" @change="updateNavWebsiteSort(item.id,item.sort)"></b-col>
              <b-col cols="2">{{item['category_name']}}</b-col>
              <b-col cols="2">
                <b-button @click="update(item.id)">编辑</b-button>
                <b-button @click="deleteNavWebsite(item.id)">删除</b-button>
              </b-col>
            </b-row>
            <div v-if="totalPage>1" style="margin-top: 50px;">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
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
        selected: null,
        search:'',
        options: [{text:'请选择分类',value:null}],
        siteItems: [],
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
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getNavWebsiteList();  // 向后台发数据请求
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      update(id){
        this.$router.push("/dashboard/site/ns-edit-website?type=2&id="+id);
      },
      toEdit() {
        this.$router.push("/dashboard/site/ns-edit-website?type=1");
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getNavCategoryList() {
        http.getNavCategoryList().then(rs => {
          if (!rs.code) {
            this.items = rs.data.forEach(v => {
              let temp = {
                value: v.id,
                text: v.name
              };
              this.options.push(temp);
            });
          }
        });
      },
      updateNavWebsiteSort(id,sort){
        http.updateNavWebsiteSort({id:id,sort:sort}).then();
      },
      getNavWebsiteList() {
        let params = {
          page: this.cpage,
          per_page:16
        };
        if(this.selected){
          params['category_id'] = this.selected;
        }
        if(this.search){
          params['name'] = this.search;
        }
        http.getNavWebsiteList(params).then(rs => {
          if (!rs.code) {
            this.siteItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 16);
          }
        });
      },
      deleteNavWebsite(id) {
        if (confirm("确定要删除当前网站？")) {
          http.deleteNavWebsite({id: id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.fetchData();
            }
          });
        }
      }
    },
    mounted() {
      this.fetchData();
      this.getNavCategoryList();
    }
  }
</script>

<style lang="scss" scoped>
  #website-list {}

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

  .mtb30 {
    margin: 30px auto;
  }

  .site-items{
    margin-top: 30px;
    .row{
      color: #555;
    font-size: 14px;
    line-height: 50px;
    background: #eeeeee;
    border-bottom: 2px solid #ffffff;
    }
    .row:first-child{
      font-size: 16px;
      background: #dcdcdc;
      margin-bottom: 10px;
    }
    input{
      width: 34px;
      height: 30px;
      line-height: 30px;
      background: #eeeeee;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      text-align: center;
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
    cursor:pointer;
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
</style>
