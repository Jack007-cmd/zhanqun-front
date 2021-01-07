<template>
  <div id="sort-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">平台列表</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <b-row>
            <b-form inline>
              <treeselect v-model="selected" style="width: 180px;" :multiple="false" :options="options" />
              <div class="input-group">
                <input type="text" class="form-control" v-model="search" @change="queryData">
                <span class="input-group-addon glyphicon glyphicon-search" @click="queryData"></span>
              </div>
              <b-button id="btn-test" @click="testLinks">检测无法访问链接</b-button>
            </b-form>
          </b-row>
          <div class="sort-items">
            <b-row>
              <b-col cols="1">序号</b-col>
              <b-col cols="2">平台名称</b-col>
              <b-col cols="1">栏目名称</b-col>
              <!--<b-col cols="1">所属副导航</b-col>-->
              <!--<b-col cols="1">所属主导航</b-col>-->
              <b-col cols="1">点击量</b-col>
              <!--<b-col cols="1">下拉框颜色</b-col>-->
              <b-col cols="1">排序</b-col>
              <b-col cols="1">图标</b-col>
              <b-col cols="1">站长推荐</b-col>
              <b-col cols="2">创建/修改时间</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in sortItems" :key="item.id" class="sort-row">
              <!--id	平台ID	是	[string]	查看-->
              <!--4	 category_id	平台分类ID	是	[string]	查看-->
              <!--5	 name	平台名称	是	[string]	查看-->
              <!--6	 category_name	分类名称	是	[string]-->
              <!--7	 icon	图标	是	[string]	查看-->
              <!--8	 count_hits	点击量	是	[string]-->
              <!--9	 is_recommend	是否推荐 0否 1是	是	[string]-->
              <!--10	 sort	排序	是	[int]	查看-->
              <!--11	 updated_at	创建时间	是	[string]	查看-->
              <!--12	 created_at	更新时间-->
              <b-col cols="1">{{index+1}}</b-col>
              <b-col cols="2">{{item.name}} <span class="test-fail" style="color: red;display: none;">【无法访问】</span></b-col>
              <b-col cols="1">{{item['category_name']}}</b-col>
              <!--<b-col cols="1">{{item['secondary-nav']}}</b-col>-->
              <!--<b-col cols="1">{{item['primary-nav']}}</b-col>-->
              <b-col cols="1">{{item['count_hits']}}</b-col>
              <!--<b-col cols="1">{{item.color}}</b-col>-->
              <b-col cols="1"><input type="number" min="0" v-model="item.sort" @change="updatePlatformSort(item.id,item.sort)"></b-col>
              <b-col cols="1"><img v-lazy="item.icon" :key="item.icon" alt="" style="width:40px;height: 40px;"></b-col>
              <b-col cols="1">{{item['is_recommend']?'是':'否'}}</b-col>
              <b-col cols="2">{{item['updated_at']?item['updated_at'].substr(0,16):item['created_at'].substr(0,16)}}</b-col>
              <b-col cols="2">
                <b-button @click="toUpdate(item.id)">编辑</b-button>
                <b-button @click="deletePlarform(item.id)">删除</b-button>
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
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        selected: '',
        search:'',
        options: [
          {id:'', label: '请选择主栏目'},],
        text2: null,
        sortItems: [],
        totalPage: 0,
        cpage: 1
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
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getPlatformList();  // 向后台发数据请求
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      toEdit() {
        this.$router.push("/dashboard/site/ns-edit-sort?type=1");
      },
      toUpdate(id) {
        this.$router.push("/dashboard/site/ns-edit-sort?type=2&id=" + id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      updatePlatformSort(id,sort){
        http.updatePlatformSort({id:id,sort:sort}).then(rs=>{
          if(!rs.code){
          }
        });
      },
      getPlatformList() {
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
        http.getPlatformList(params).then(rs => {
          if (!rs.code) {
            this.sortItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 16);
          }
        });
      },
      deletePlarform(id) {
        if (confirm("确定要删除当前数据？")) {
          http.deletePlarform({id: id}).then(rs => {
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
      getPlatformCategory() {
        http.getPlatformCategoryAll().then(rs => {
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
      testLinks(){
        this.sortItems.forEach((v,i)=>{
           v.urls.forEach(val=>{
             $.ajax({
               type: 'get',
               url: val['links_url'],
               cache: false,
               dataType: "jsonp", //跨域采用jsonp方式
               processData: false,
               timeout:5000, //超时时间，毫秒
               complete: function (data) {
                 if (data.status===200) {
                 } else {
                   $(".sort-row").eq(i).find(".test-fail").show();
                   return false;
                 }
               }
             });
          });
        });
      }
    },
    mounted() {
      this.fetchData();
      this.getPlatformCategory()
    }
  }
</script>

<style lang="scss" scoped>
  #sort-manage {}

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

  .sort-items {
    margin-top: 30px;

    .row {
      color: #555;
    font-size: 14px;
    line-height: 50px;
    background: #eeeeee;
    border-bottom: 2px solid #ffffff;

      .col-1, .col-2 {
        padding: 0;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      margin-bottom: 10px;
    }

    input {
      width: 34px;
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
  #btn-test{
    background: #01c36a;
    border: none;
    margin: 0 100px;
    height: 28px;
    line-height: 10px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
