<template>
  <div id="article-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">产品列表</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <b-row>
            <b-form inline>
              <treeselect v-model="selected" style="width: 180px;" :multiple="false" :options="options" />
              <div class="input-group">
                <input type="text" class="form-control" placeholder="请输入产品名称" v-model="search" @change="queryData">
                <span class="input-group-addon glyphicon glyphicon-search"></span>
              </div>
            </b-form>
          </b-row>
          <div class="site-items">
            <b-row>
              <b-col cols="1">序号</b-col>
              <b-col cols="1">栏目</b-col>
              <b-col cols="1">主图</b-col>
              <b-col cols="2">标题</b-col>
              <b-col cols="2">创建时间</b-col>
              <b-col cols="2">修改时间</b-col>
              <b-col cols="3">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in articleItems" :key="item.id">
              <b-col cols="1">{{(cpage-1)*6+index+1}}</b-col>
              <b-col cols="1" :title="item['category_name']">{{item['category_name']}}</b-col>
              <b-col cols="1"><img v-lazy="item['cover_plan']" :key="item['cover_plan']" alt=""></b-col>
              <b-col cols="2" :title="item.title"><p>{{item.title}}</p></b-col>
              <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
              <b-col cols="2"><template  v-if="item['updated_at']">{{item['updated_at'].substr(0,16)}}</template></b-col>
              <b-col cols="3">
                <b-button class="toTop" v-if="item['is_top']===0" @click="setProductTop(item.id)">置顶</b-button>
                <b-button class="toTop" v-if="item['is_top']===1" @click="cancelProductTop(item.id)" style="width: 80px;">取消置顶</b-button>
                <b-button @click="update(item.id)">编辑</b-button>
                <b-button @click="deleteProduct(item.id)">删除</b-button>
              </b-col>
            </b-row>
            <div class="total-number">共：{{total}}条数据</div>
            <div v-if="totalPage>1" style="margin-top: 50px;">
              <b-pagination-nav
              :link-gen="linkGen"
              :number-of-pages="totalPage" use-router
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
    name: "CompanyProductList",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        selected: '',
        search:'',
        options: [
          {id: '', label: '请选择分类'},
        ],
        articleItems: [],
        totalPage: 0,
        cpage:1,
        total:0
      }
    },
    watch: {
      '$route': 'fetchData',
      selected(){
        this.queryData();
      }
    },

    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;
        this.getCompanyProductList();
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
       // 获取产品列表
      getCompanyProductList() {
        let params = {
          per_page: 6,
          page: this.cpage
        };
        if(this.selected){
          params['category_id'] = this.selected;
        }
        if(this.search){
          params['title'] = this.search;
        }
        params['type'] = 1;
        http.getCompanyProductList(params).then(rs => {
          if (!rs.code) {
            this.articleItems = rs.data;
            this.total = rs.total;
            this.totalPage = Math.ceil(rs.total / 6);
          }
        });
      },
      // 置顶产品
      setProductTop(id) {
        if (confirm("确定要置顶这个产品吗？")) {
          http.setProductTop({id:id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"置顶成功！",
            color:'#3cb5f1'
          });
              this.fetchData();
            }
          });
        }
      },
      cancelProductTop(id){
        if (confirm("确定要取消置顶这个产品吗？")) {
          http.cancelProductTop({id: id}).then(rs => {
            if (!rs.code) {
              this.$toast.success({
                message:"取消置顶成功！",
                color:'#3cb5f1'
              });
              this.fetchData();
            }
          });
        }
      },
      // 删除产品
      deleteProduct(id){
        if(confirm("你确定要删除这个产品吗？")){
          http.deleteProduct({id:id}).then(rs => {
            if(!rs.code) {
             this.$toast.success({
            message:"产品删除成功！",
            color:'#3cb5f1'
          });
            this.fetchData();
            }
          });
        }
      },
      getProductCategoryAll() {
        http.getProductCategoryAll().then(rs => {
          if (!rs.code) {
            rs.forEach(t1 => {
              if (t1['parent_id'] === 0) {
                this.options.push({id:t1.id,label:t1.name});
              }
            });
            rs.forEach(a => {
              this.options.forEach((b) => {
                if (b.id === a['parent_id']) {
                  if(!b.children){
                    b.children=[];
                  }
                  b.children.push({id: a.id,label: a.name});
                }
              });
            });
          }
        });
      },
      toEdit() {
        this.$router.push("/dashboard/site/company-product-add?type=1");
      },
      update(id){
        this.$router.push("/dashboard/site/company-product-add?type=2&id=" + id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
    },
    mounted() {
      this.getProductCategoryAll();
      this.fetchData();
    }
  }

</script>

<style lang="scss" scoped>
  #article-list {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 7px;

        span {
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

  .site-items {
    margin-top: 30px;
    font-size: 14px;
    .row {
      /*background: #eeeeee;*/
      margin-bottom: 2px;
      height: 80px;
      border-bottom: 1px solid #d2d2d2;
      div {
        line-height: 80px;

        p {
          width: 100%;
          height: 60px;
          line-height: 30px;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient:vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          text-align: center;
        }
      }
    }

    .row:first-child {
      background: #dcdcdc;
      margin-bottom: 10px;
      height: 50px;
      border-radius: 5px;
      font-size: 16px;
      div {
        line-height: 50px;
      }
    }
    .row{
      div:nth-of-type(2) {
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

    input {
      width: 32px;
      height: 30px;
      line-height: 30px;
      background: #eeeeee;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      text-align: center;
    }
    .toTop{
      background:#e60011;
    }

    button {
      background: #01c36a;
      border: none;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 60px;
    }
    .pag{
      margin-top: 20px;
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
</style>
