<template>
  <div id="edit-website">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">编辑</span>
        </b-col>
      </b-row>
      <b-row class="create-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr >
              <td>栏目名称</td>
              <td><input type="text" v-model="update.name" ></td>
            </tr>
           <tr>
              <td>SEO配置</td>
            </tr>
            <tr>
               <td>标题:</td>
              <td><input type="text" v-model="update['seo_title']"></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;">关键词:</td>
                <td><textarea name=""  v-model="update['seo_keywords']"></textarea><i>注：一般不超过100个字符，关键词用英文逗号隔开</i></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;">描述:</td>
                <td><textarea name=""  v-model="update['seo_description']"></textarea><i>注：一般不超过200个字符</i></td>
            </tr>
          </table>
          <div style="padding-left: 36%;">
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
    name: "HkColumnEdit",
    data(){
       return {
        update:{
          id:'',
          name:'',
          parent_id:0,
          seo_title:'',
          seo_keywords:'',
          seo_description:''
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      updateCategory(){
        if(!this.update.name){
          this.$toast.success({
            message:"请输入栏目名称",
            color:'#3cb5f1'
          });
          return;
        }
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
      }
    },
    mounted() {
      if(this.$route.query.id){
        this.getArticleCategoryDetail(this.$route.query.id);
      }
    },
  }
</script>

<style lang="scss" scoped>
  #edit-website {}
  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 9px;

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 11px;
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
      margin-left: 50px;

      tr {
        td:first-child {
          text-align: right;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
    textarea {
      width: 100%;
      border: 1px solid #a0a0a0;
      border-radius: 5px;
    }
  }
  .form-group {
    margin-bottom: 0;
}
i{
    font-size: 12px;
    font-style: normal;
}
</style>
