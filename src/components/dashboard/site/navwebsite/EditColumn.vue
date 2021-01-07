<template>
  <div id="edit-column">

    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">编辑</span>
        </b-col>
      </b-row>
      <b-row class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>SEO配置</td>
              <td></td>
            </tr>
            <tr>
              <td>标题:</td>
              <td><input type="text" v-model="update['seo_title']">
              </td>
            </tr>
            <tr>
              <td>关键词:</td>
              <td><textarea v-model="update['seo_keywords']" name=""></textarea></td>
            </tr>
            <tr>
              <td>描述:</td>
              <td><textarea name="" v-model="update['seo_description']"></textarea></td>
            </tr>
          </table>
          <div style="padding-left: 30%;">
            <b-button @click="updateCategory">确定</b-button>
            <b-button @click="back">返回</b-button>
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
    name: "EditColumn",
    data(){
      return{
        update:{
          id:'',
          seo_keywords:'',
          seo_description:'',
          seo_title:'',
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      updateCategory(){
        http.updateArticleCategory(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getArticleCategoryDetail(id){
        http.getArticleCategoryDetail({id:id}).then(rs=>{
          if(!rs.code){
            this.update = rs;
          }
        });
      },
    },
    mounted(){
      if (this.$route.query.id) {
        this.getArticleCategoryDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-column {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 11px;

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

  .create-info, .update-info {
    padding-top: 30px;

    table {
      width: 70%;

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

    input,textarea{
      width: 100%;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
  }
</style>
