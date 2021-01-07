<template>
  <div id="keyword-replace">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">关键字替换</span>
           <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="1">序号</b-col>
            <b-col cols="1">关键字</b-col>
            <b-col cols="1">替换对象</b-col>
            <b-col cols="3">跳转链接</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="2">修改时间</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in items" :key="item.id">
            <b-col cols="1">{{index+1}}</b-col>
            <b-col cols="1" class="omitting-something" :title="item['keyword']">{{item['keyword']}}</b-col>
            <b-col cols="1" class="omitting-something" :title="item['replace']">{{item['replace']}}</b-col>
            <b-col cols="3" class="omitting-something" :title="item['url']">{{item['url']}}</b-col>
            <b-col cols="2">
              <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
            </b-col>
            <b-col cols="2">
              <template v-if="item['updated_at']">{{item['updated_at'].substr(0,16)}}</template>
            </b-col>
            <b-col cols="2">
              <b-button @click="toUpdate(item)">编辑</b-button>
              <b-button @click="deleteKeyword(item.id)">删除</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div v-if="totalPage>1" style="margin-top: 50px;">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                          align="center"></b-pagination-nav>
      </div>
    </b-container>

    <b-modal id="modal-add-keyword" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>新增</h5>
        <p>关键字 <br> <input type="text" v-model="create.keyword"></p>
        <p>替换对象 <br> <input type="text" v-model="create.replace"></p>
        <p>链接 <br> <input type="text" v-model="create.url"></p>
        <div style="padding-left: 80px;">
          <b-button @click="createKeyword">保存</b-button>
          <b-button @click="$bvModal.hide('modal-add-keyword')">返回</b-button>
        </div>
      </div>
    </b-modal>
    <b-modal id="modal-update-keyword" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>编辑</h5>
        <p>关键字 <br> <input type="text" v-model="update.keyword"></p>
        <p>替换对象 <br> <input type="text" v-model="update.replace"></p>
        <p>链接 <br> <input type="text" v-model="update.url"></p>
        <div style="padding-left: 80px;">
          <b-button @click="updateKeyword">保存</b-button>
          <b-button @click="$bvModal.hide('modal-update-keyword')">返回</b-button>
        </div>
      </div>
    </b-modal>
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
    name: "CompanyKeywordReplace",
    data() {
      return {
        items: [],
        create: {
          keyword: '',
          replace: '',
          url: ''
        },
        update: {
          id:'',
          keyword: '',
          replace: '',
          url: ''
        },
        totalPage: 1,
        cpage: 1
      }
    },  watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;
        this.getKeywordsList();
      },
      deleteKeyword(id) {
        if (confirm("确定要删除当前数据吗？")) {
          http.deleteKeyword({id: id}).then(rs => {
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
      toUpdate(item){
        this.update = item;
        this.$bvModal.show('modal-update-keyword');
      },
      toEdit(){
        this.$bvModal.show('modal-add-keyword');
      },
      updateKeyword(){
        if (!this.update.keyword) {
           this.$toast.success({
            message:"请填写关键词！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.replace) {
           this.$toast.success({
            message:"请填写替换对象！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.url) {
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        http.updateKeyword(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-update-keyword');
            this.fetchData();
          }
        });
      },
      createKeyword() {
        if (!this.create.keyword) {
           this.$toast.success({
            message:"请填写关键词！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.create.replace) {
           this.$toast.success({
            message:"请填写替换对象！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.create.url) {
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        http.createKeyword(this.create).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-add-keyword');
            this.create = {
              keyword: '',
              replace: '',
              url: ''
            };
            this.fetchData();
          }
        });
      },
      getKeywordsList() {
        http.getKeywordsList({page: this.cpage}).then(rs => {
          if (!rs.code) {
            this.items = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
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
  #keyword-replace {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 9.4px;

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 13px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }
        .btn-add{
          height: 26px;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-right: 50px;
          margin-top: 0;
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;
        }
      }
    }
  }

  .data-items {
    padding: 0;
    margin: 30px auto;
    border-top: 1px solid #dcdcdc;

    .row {
      color:#555;
      font-size: 14px;
      height: 50px;
      border-left: 1px solid #dcdcdc;

      div {
        line-height: 50px;
        border-right: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
      }
    }
    .row:first-child {
      font-size: 16px;
    }

    button {
      background: #3db5f1;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 70px;
    }
  }

  .div-edit-keyword {
    padding: 0 10px;

    h5 {
      padding-bottom: 10px;
      border-bottom: 1px solid #c9c9c9;
    }

    p {
      width: 100%;

      input {
        width: 80%;
        border: 1px solid #dcdcdc;
      }

    }

    button {
      background: #3cb5f1;
      border: none;
      width: 80px;
      margin: 20px;
    }
  }
</style>
