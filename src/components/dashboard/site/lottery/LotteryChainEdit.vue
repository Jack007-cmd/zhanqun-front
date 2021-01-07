<template>
  <div id="edit-article">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span :class="{on:plate==='a'}">新增</span>
          <span :class="{on:plate==='b'}">编辑</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="create-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>友链名称:</td>
              <td><input type="text" v-model="chain.name"></td>
            </tr>
           <tr>
              <td>链接:</td>
              <td>
                <input type="text" v-model="chain.url">
              </td>
            </tr>
           <tr>
              <td>排序:</td>
              <td><input type="text" v-model="chain.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 15%;">
            <b-button @click="createChain">保存</b-button>
            <b-button @click="back()">返回</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
           <table cellpadding="12">
             <tr>
              <td>友链名称:</td>
              <td><input type="text" v-model="update.name"></td>
            </tr>
            <tr>
              <td>链接:</td>
              <td>
                <input type="text"  v-model="update.url">
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text"  v-model="update.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 15%;">
            <b-button @click="updateChain">保存</b-button>
            <b-button @click="back()">返回</b-button>
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
    name: "LotteryChainEdit",
    data() {
      return {
        plate: 'a',
         chain: {
          name: '',
          url: '',
          sort: ''
        },
        update:{
          id:'',
          name: '',
          url: '',
          sort: ''
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
       createChain() {
        if(!this.chain.name){
           this.$toast.success({
            message:"请填写友链名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.chain.url){
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.chain.sort){
           this.$toast.success({
            message:"请填写排序！",
            color:'#3cb5f1'
          });
          return;
        }
        let body = this.chain;
        http.createChain(body).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updateChain() {
        if(!this.update.name){
           this.$toast.success({
            message:"请填写友链名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.update.url){
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.update.sort){
           this.$toast.success({
            message:"请填写排序！",
            color:'#3cb5f1'
          });
          return;
        }
        http.updateChain(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getChainDetail(id) {
        http.getChainDetail({id: id}).then(rs => {
          if (!rs.code) {
            this.update = rs;
          }
        });
      }
    },
    mounted() {
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getChainDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-article {}
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

  .create-info,.update-info {
    padding-top: 30px;

    table {
      width: 70%;
      margin-left: 50px;

      tr {
        td:first-child {
          width: 100px;
          text-align: right;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }
    input{
      width: 50%;
    }
    button {
      float: left;
      margin: 30px;
      background: #3cb5f1;
      border: none;
      width: 100px;
    }
  }
</style>
