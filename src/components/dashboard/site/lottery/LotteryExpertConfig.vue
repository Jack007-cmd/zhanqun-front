<template>
<div>
    <div id="messages">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">专家配置</span>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="3">序号</b-col>
            <b-col cols="3">专家名称</b-col>
            <b-col cols="3">排序</b-col>
            <b-col cols="3">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in tagItems" :key="item.number">
            <b-col cols="3">{{index + 1}}</b-col>
            <b-col cols="3">{{item['name']}}</b-col>
            <b-col cols="3"><input type="number" v-model="item.sort" min="0" @change="updateNavSort(item.id,item.sort)"></b-col>
            <b-col cols="3">
                <b-button @click="toUpdate(item.id)">编辑</b-button>
            </b-col>
          </b-row>
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
      <b-modal id="modal-update" size="xs" centered hide-header hide-footer>
          <div class="div-edit-keyword">
            <h5>编辑</h5>
            <p><span>专家名称</span><input type="text" v-model="update.name"></p>
            <p><span>排序</span><input type="text" v-model="update.sort"></p>
            <div style="padding-left: 80px;">
              <b-button @click="updateExpert">保存</b-button>
              <b-button @click="$bvModal.hide('modal-update')">返回</b-button>
            </div>
          </div>
      </b-modal>
    </div>
</div>
</template>

<script>
  import * as http from '../../../../../apis/site'

  export default {
    name: "LotteryExpertConfig",
    current_page:1,
    data(){
      return{
        tagItems:[],
        update:{
          id:'',
          name:'',
          sort:'',
        }
      }

    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //获取专家列表
      getPlanExpertAll() {
          http.getPlanExpertAll().then(rs => {
            if(!rs.code){
              this.tagItems = rs;
            }
          });
      },
      // 编辑更新
      toUpdate(id){
        this.getLottagDetail(id);
        this.$bvModal.show("modal-update");
      },
      updateExpert() {
        http.updatePlanExpert(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-update');
            this.getPlanExpertAll();
          }
        });
      },
      getLottagDetail(id){
        http.getPlanExpertDetail({id:id}).then(rs=>{
          if(!rs.code){
            this.update = rs;
          }
        });
      },
      updateNavSort(id, sort) {
        http.updatePlanExpertSort({id: id, sort}).then(rs => {
          if (!rs.code) {
            // this.getPlanExpertAll();
          }
        });
      },
    },
    mounted() {
      this.getPlanExpertAll();
    }
  }
</script>

<style lang="scss" scoped>
  .custom-control-kg {
      display: -ms-inline-flexbox;
      display: -webkit-inline-box;
      display: inline-flex;
      margin-right: 1rem;
  }
  .custom-control-label::after,.custom-control-kg .custom-control-label::before{
    display: none;
  }
  .custom-control-kg .cus-delete{
    position: absolute;
    height: 16px;
    width: 16px;
    top: -2px;
    right: -18px;
    border-radius: 50%;
    border: 1px solid #6c757d;
    line-height: 14px;
    text-align: center;
    color: #6c757d;
    font-size: 12px;
  }
  #messages {}
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
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
        button{
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-right: 100px;
          outline:none;
        }
        .btn{
          width:60px;
          color:#ffffff;
          border-radius:0;
          background: #737373;
          border: 1px solid #737373;
        }
        .click{
          border:1px solid #099ae6;
          background: #099ae6;
        }

      }
    }
  }
  .data-items{
    margin: 30px auto;
    .row:first-child{
      background: #dcdcdc;
      line-height: 40px;
      font-size: 16px;
    }
    .row{
      line-height: 40px;
      background: #ffffff;
      border: 1px solid #dcdcdc;
      border-top: none;
      font-size: 14px;
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
    input{
        width: 32px;
        height: 30px;
        line-height: 30px;
        background: #eeeeee;
        border: 1px solid #bfbfbf;
        text-align: center;
        border-radius: 5px;
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
      span{
        width:20%;
        display:inline-block;
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
