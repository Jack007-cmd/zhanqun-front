<template>
  <div id="leaf-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">单页管理</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <b-row>
            <b-form inline>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="请输入单页名称" v-model="search" @change="queryData">
                <span class="input-group-addon glyphicon glyphicon-search" @click="queryData"></span>
              </div>
            </b-form>
          </b-row>
          <div class="leaf-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="2">名称</b-col>
              <b-col cols="2">创建时间</b-col>
              <b-col cols="2">修改时间</b-col>
              <b-col cols="4">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in leafItems" :key="item.id">
              <!--id	单页id	是	[int]	查看-->
              <!--4	 name	名称	是	[string]-->
              <!--5	 identify	标识	是	[string]-->
              <!--6	 sort	排序	是	[int]	查看-->
              <!--7	 created_at	创建时间	是	[string]	查看-->
              <!--8	 updated_at	修改时间-->
              <b-col cols="2">{{index+1}}</b-col>
              <b-col cols="2">{{item.name}}</b-col>
              <b-col cols="2"><template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
              <b-col cols="2"><template v-if="item['updated_at']">{{item['updated_at'].substr(0,16)}}</template></b-col>
              <b-col cols="4">
                <b-button @click="toUpdate(item.id)">编辑</b-button>
                <b-button @click="deleteLeaf(item.id)">删除</b-button>
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
    name: "CompanyLeafManage",
    data() {
      return {
        search: '',
        leafItems: [ ],
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
        this.getLeafList();  // 向后台发数据请求
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      toEdit() {
        this.$router.push("/dashboard/site/company-leaf-edit?type=1");
      },
      toUpdate(id) {
        this.$router.push("/dashboard/site/company-leaf-edit?type=2&id=" + id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getLeafList() {
        let params = {
          page: this.cpage
        };
        if (this.search) {
          params['name'] = this.search;
        }
        http.getLeafList(params).then(rs => {
          if (!rs.code) {
            this.leafItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      },
      deleteLeaf(id) {
        if (confirm("确定要删除当前数据？")) {
          http.deleteLeaf({id: id}).then(rs => {
            if (!rs.code) {
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
    }
  }
</script>

<style lang="scss" scoped>
  #leaf-manage {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;
    color: #555555;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 10px;
        height: 40px;

        span {
          line-height: 32px;
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 11px;
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
</style>
