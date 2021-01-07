<template>
  <div id="column-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">栏目管理</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="1">序号</b-col>
            <b-col cols="2">网站类别</b-col>
            <b-col cols="2">栏目名称</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="2">是否显示</b-col>
            <b-col cols="3">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in items" :key="item.id">
            <b-col cols="1">{{index+1}}</b-col>
            <b-col cols="2" v-if="mainLevel==1">主</b-col>
            <b-col cols="2" v-else-if="mainLevel==2 && item['copy_id']==0">副</b-col>
            <b-col cols="2" v-else-if="mainLevel==2 && item['copy_id']!=0">主</b-col>
            <b-col cols="2" v-else-if="mainLevel!=1 && mainLevel!=2">/</b-col>
            <b-col cols="2">{{item['name']}}</b-col>
            <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            <b-col cols="2">
              <span  @mouseover="getCurrentItem(item)">
                <switchc v-model="item.state" text="on|off" @change="getData"></switchc>
               </span>
            </b-col>
            <b-col cols="3">
              <b-button v-if="mainLevel!=2" @click="update(item)">编辑</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="modal-edit" size="xs" body-bg-variant="light" centered hide-header hide-footer>
      <div class="div-edit">
        <h4>编辑</h4>
        <p>
          栏目名称 <input type="text" v-model="tempItem.name">
        </p>
        <b-button @click="saveCategory">保存</b-button>
        <b-button @click="$bvModal.hide('modal-edit')">返回</b-button>
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
  import SwitchComponent from '../../../common/SwitchComponent'
  export default {
    name: "ColumnManage",
    components: {
      'switchc': SwitchComponent
    },
    data() {
      return {
        items: [],
        currentItem:{},
        tempItem:{},
        mainLevel:''
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getCurrentItem(item){
        this.currentItem = item;
      },
      getData(data){
        this.switchState(this.currentItem.id,data);
      },
      switchState(id, state) {
        let body = {
          id: id
        };
        if (state === 0) {
          http.setArticleCategoryVisible(body).then();
        } else {
          http.setArticleCategoryHidden(body).then();
        }
      },
      update(item) {
        this.tempItem = item;
        this.$bvModal.show('modal-edit');
        // this.$router.push("/dashboard/site/nw-edit-column?id="+id);
      },
      saveCategory(){
        if(!this.tempItem.name){
          this.$toast.success({
            message:"请填写栏目名称！",
            color:'#3cb5f1'
          });
          return;
        }
        http.updateArticleCategory(this.tempItem).then(rs=>{
          if(!rs.code){
            this.$toast.success({
              message:"保存成功！",
              color:'#3cb5f1'
            });
            this.$bvModal.hide('modal-edit');
          }
        });
      },
      getCategoryList() {
        http.getArticleCategoryList().then(rs => {
          if (!rs.code) {
            this.items = rs.data;
          }
        });
      },
      deleteCategory(id) {
        if (confirm("确定要删除当前栏目吗？")) {
          http.deleteArticleCategory({id: id}).then(rs => {
            if(!rs.code){
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.getCategoryList();
            }
          });
        }
      }
    },
    mounted() {
      this.mainLevel = this.$store.getters.site.mainLevel;
      this.getCategoryList();
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
        padding-bottom: 10.4px;

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 12px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
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
    }

    .row {
      color:#555;
      font-size: 14px;
      height: 50px;
      background: #eeeeee;
      margin-bottom: 2px;
      border-radius: 5px;

      div {
        line-height: 50px;
      }
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

  .div-edit{
    text-align: center;
    width: 450px;
    margin: 0 auto;

    h4 {
      text-align: left;
      margin-bottom: 10px;
    }
    p{
      text-align: left;
    }
    input {
      width: 300px;
      border: 1px solid #ced4da;
      border-radius: 5px;
    }

    button {
      background: #2a94de;
      min-width: 80px;
      color: #ffff;
      border: none;
      margin: 20px 0 5px;
    }
  }
</style>
