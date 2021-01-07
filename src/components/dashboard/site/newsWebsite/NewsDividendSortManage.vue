<template>
  <div id="chain-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">分类管理</span>
          <b-button class="btn-add" v-b-modal.modal-create-sort>新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="chain-items">
          <b-row>
            <b-col cols="2">序号</b-col>
            <b-col cols="4">分类名称</b-col>
            <b-col cols="2">排序</b-col>
            <b-col cols="4">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in categoryItems" :key="item.id">
            <b-col cols="2">{{index+1}}</b-col>
            <b-col cols="4" class="beyond-hiding" :title="item.name">{{item.name}}</b-col>
            <b-col cols="2"><input type="number" min="0" v-model="item.sort"
                                   @change="updateCategorySort(item.id,item.sort)"></b-col>
            <b-col cols="4">
              <b-button @click="toUpdate(item)">编辑</b-button>
              <b-button @click="deleteCategory(item.id)">删除</b-button>
            </b-col>
          </b-row>
          <div v-if="totalPage>1" style="margin-top: 50px;">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
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
    <b-modal id="modal-create-sort" size="xs" body-bg-variant="light" centered hide-header hide-footer>
        <h5>新增</h5>
      <div class="div-create-label">
        <p><span style="width: 70px;text-align: left;display: inline-block;">分类名称 </span> <input type="text" v-model="sort.name"></p>
        <p><span style="width: 70px;text-align: left;display: inline-block;">排序 </span> <input type="text" v-model="sort.sort"></p>
        <b-button @click="createSort">保存</b-button>
        <b-button @click="$bvModal.hide('modal-create-sort')">返回</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-update-sort" size="xs" body-bg-variant="light" centered hide-header hide-footer>
        <h5>编辑</h5>
      <div class="div-update-label">
        <p><span style="width: 70px;text-align: left;display: inline-block;">分类名称 </span>  <input type="text" v-model="update.name"></p>
        <p><span style="width: 70px;text-align: left;display: inline-block;">排序 </span> <input type="text" v-model="update.sort"></p>
        <b-button @click="updateSort">保存</b-button>
        <b-button @click="$bvModal.hide('modal-update-sort')">返回</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import * as http from '../../../../../apis/site'

  export default {
    name: "ChainManage",
    data() {
      return {
        categoryItems: [],
        sort:{
          name:'',
          sort:'',
        },
        update:{
          id:'',
          name:'',
          sort:'',
        },
        totalPage: 0,
        cpage: 1
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getBonusCategoryList();  // 向后台发数据请求
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      createSort() {
        http.CreateBonusCategory(this.sort).then(rs=>{
          if(!rs.code){
            this.$toast.success({
              message:"保存成功！",
              color:'#3cb5f1'
            });
            this.$bvModal.hide('modal-create-sort');
            this.sort={name:'',sort:'',};
            this.getBonusCategoryList();
          }
        })
      },
      toUpdate(item){
        this.update = item;
        this.$bvModal.show("modal-update-sort");
      },
      //更新分类
      updateSort() {
        http.updateBonusCategory(this.update).then(rs=>{
          if(!rs.code){
            this.$toast.success({
              message:"保存成功！",
              color:'#3cb5f1'
            });
            this.$bvModal.hide('modal-update-sort');
            this.update={id:'',name:'',sort:'',};
            this.getBonusCategoryList();
          }
        });
      },
      //保存排序
      updateCategorySort(id,sort) {
        http.updateBonusCategorySort({id:id,sort:sort}).then();
      },
      deleteCategory(id) {
        if (confirm("确定要删除当前分类吗？")) {
          http.deleteBonusCategory({id: id}).then(rs => {
            if (!rs.code) {
              this.getBonusCategoryList();
            }
          });
        }
      },
      getBonusCategoryList(){
        let params = {
          page: this.cpage,
          per_page:16
        };
        http.getBonusCategoryList(params).then(rs=>{
          if(!rs.code){
            this.categoryItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 16);
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
  #chain-manage {}

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

  .chain-items {
    margin: 30px auto;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      background: #eeeeee;
      margin-bottom: 2px;
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
      color: #555;
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

  .div-create-label, .div-update-label {
    text-align: center;
    width: 450px;
    margin: 50px auto 20px;

    input {
      width: 300px;
    }

    button {
      background: #2a94de;
      min-width: 80px;
      color: #ffff;
      border: none;
      margin: 20px;
    }
  }
</style>
