<template>
  <div id="article-list">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">计划配置</span>
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
                <span class="input-group-addon glyphicon glyphicon-search"></span>
              </div>
            </b-form>
          </b-row>
          <div class="site-items">
            <b-row>
              <b-col cols="1">序号</b-col>
              <b-col cols="2">计划种类</b-col>
              <b-col cols="2">彩种</b-col>
              <b-col cols="3">链接</b-col>
              <b-col cols="2">创建时间</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in articleItems" :key="item.id">
              <b-col cols="1">{{(cpage-1)*6+index+1}}</b-col>
              <b-col cols="2">{{item['lottery_plan_category_name']}}</b-col>
              <b-col cols="2">{{item['lottery_name']}}</b-col>
              <b-col cols="3">{{item['link']}}</b-col>
              <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
              <b-col cols="2">
                <b-button @click="toupdate(item.id)">编辑</b-button>
                <b-button @click="deleteArticle(item.id)">删除</b-button>
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

  <b-modal id="modal-add" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>新增</h5>
        <div class="edit-cz">
            <span>计划种类</span><treeselect v-model="create.lottery_plan_category_id" style="width: 80%;" :multiple="false" :options="options" />
        </div>
        <div class="edit-cz">
             <span>彩种</span><treeselect v-model="create.lottery_id" style="width: 80%;" :multiple="false" :options="cv_options" />
        </div>
        <div style="padding-left: 80px;">
          <b-button @click="createLottag">保存</b-button>
          <b-button @click="$bvModal.hide('modal-add')">返回</b-button>
        </div>
      </div>
  </b-modal>
  <b-modal id="modal-update" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>编辑</h5>
        <div class="edit-cz">
            <span>计划种类</span><treeselect v-model="update.lottery_plan_category_id" style="width: 80%;" :multiple="false" :options="options" />
        </div>
        <div class="edit-cz">
             <span>彩种</span><treeselect v-model="update.lottery_id" style="width: 80%;" :multiple="false" :options="cv_options" />
        </div>
        <div style="padding-left: 80px;">
          <b-button @click="updateLotExpert">保存</b-button>
          <b-button @click="$bvModal.hide('modal-update')">返回</b-button>
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
    name: "LotteryPlanConfig",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        selected: '',
        search:'',
        options: [
          {id: '', label: '请选择计划种类'},
        ],
        cv_options:[
           {id: '', label: '请选择彩种'},
        ],
        create:{
           lottery_plan_category_id:'',
           lottery_id:'',
        },
        update:{
           id:'',
           lottery_plan_category_id:'',
           lottery_id:'',
        },        
        articleItems: [],
        totalPage: 0,
        cpage:1,
        total:0,
        tag:{
          name:"test"
        }
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
        this.getArticleList();
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
       // 获取计划种类列表
      getArticleList() {
        let params = {
          per_page: 6,
          page: this.cpage
        };
        if(this.selected){
          params['lottery_plan_category_id'] = this.selected;
        }
        if(this.search){
          params['lottery_name'] = this.search;
        }
        http.getPlanExpertList(params).then(rs => {
          if (!rs.code) {
            this.articleItems = rs.data;
            this.total = rs.total;
            this.totalPage = Math.ceil(rs.total / 6);
          }
        });
      },
      getAllArticleCategory() {
        http.getAllPlanCategory().then(rs => {
            if (!rs.code) {
              rs.forEach(v => {
                this.options.push({
                  id: v.id,
                  label: v.name
                })
              });
            }
        });
      },
      getLottagAll(){
        http.getLottagAll().then(rs => {
            if (!rs.code) {
              rs.forEach(v => {
                this.cv_options.push({
                  id: v.id,
                  label: v.name
                })
              });
            }
        });        
      },
      toEdit() {
         this.$bvModal.show("modal-add");
      },
      toupdate(id){
        this.$bvModal.show("modal-update");
        http.getPlanDetail({id:id}).then(rs=>{
          if(!rs.code){
            this.update.id = rs.id;
            this.update.lottery_plan_category_id = rs.lottery_plan_category_id;
            this.update.lottery_id = rs.lottery_id;
          }
        });
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      createLottag(){
        http.createPlanExpert(this.create).then(rs=>{
           if(!rs.code){
             this.$toast.success({
              message:"创建成功！",
              color:'#3cb5f1'
             });     
           }    
           this.$bvModal.hide("modal-add");
           this.fetchData();
        })
      },
      updateLotExpert(){
        http.updateLotPlan(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-update');
            this.fetchData();
          }
        });
      },
      deleteArticle(id){
        if(confirm("你确定要删除这条计划配置？")){
          http.deleteLotPlan({id:id}).then(rs => {
            if(!rs.code) {
             this.$toast.success({
            message:"计划配置删除成功！",
            color:'#3cb5f1'
          });
            this.fetchData();
            }
          });
        }
      }

    },
    mounted() {
      this.getAllArticleCategory();
      this.getLottagAll();
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
  .div-edit-keyword{
  padding: 0 10px;

  h5 {
    padding-bottom: 10px;
    border-bottom: 1px solid #c9c9c9;
  }    
    .edit-cz {
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    span{
      width:20%;
      height: 34px;
      line-height: 34px;
      display:block;
    }
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
