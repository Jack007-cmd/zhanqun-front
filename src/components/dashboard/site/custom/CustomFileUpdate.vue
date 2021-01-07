<template>
  <div id="custom-file-update">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="file-title">
          <div class="pt-cat-nav">
            {{path}} 
          </div>
        </b-col>
      </b-row>             
      <b-row>
        <b-col cols="12" class="file-cont">
          <div class="file-ct-nec">
            <textarea v-model="fileContent" class="form-control" id="deblock_udid" name="deblock_udid" rows="40" style="min-width: 90%" />
          </div>
        </b-col>
      </b-row> 
      <b-row style="margin-top: 20px;">
        <b-col cols="12">
          <b-button @click="updateFile">修改</b-button>
          <b-button @click="cancelFile">取消</b-button>
        </b-col>
      </b-row>   

    </b-container>
  </div>
</template>

<script>
  import * as http from '../../../../../apis/site'
  import Vue from 'vue'
  // 工具栏配置
  export default {
    name: "CustomFileUpdate",
    components: {
    },
    created() {},
    data() {
      return {
        parameter:{},
        fileContent:'',
        path:'',
        plate:'a'
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getBasicInfo() {
        http.getBasicInfo().then(rs => {
          if (!rs.code) {
            this.parameter["group-identify"] = rs.group_id;
            this.parameter["web-identify"] = rs.id;
            this.parameter["path"] = this.$route.query.path;
            this.getCustomFileContent();
          }
        });
      },
      getCustomFileContent() {
        http.getCustomFileContent(this.parameter).then(rs => {
          if (rs) {
            this.fileContent = rs.content;          
          }
        })   
      },
      updateFile(){
        this.parameter["content"] = this.fileContent;
        http.setCustomFileWrite(this.parameter).then(rs => {
          if (rs.success) {
              this.$toast.success({
                message: "修改成功！",
                color: '#3cb5f1'
              });            
              this.getPath();
              this.$router.push('/dashboard/site/cust-file-manage?path=' + this.path + "&plate=" + this.plate);            
          }
        })         
      },
      cancelFile(){
        this.getPath();
        this.$router.push('/dashboard/site/cust-file-manage?path=' + this.path + "&plate=" + this.plate);
      },
      getPath(){
          var end = this.path.lastIndexOf("/");
          this.path = this.path.substring(0,end);
          if(this.path === ""){
              this.path = "/";
          }
      }
    },
    mounted() {
      this.path = this.$route.query.path;
      this.plate = this.$route.query.plate;
      this.getBasicInfo();
    }
  }
</script>

<style lang="scss" scoped>
  #custom-file-update {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-switch {
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
  .file-title{
    width: 100%;
    height: 42px;
  }  
  .file-title .pt-cat-nav{
    height: 42px;
    line-height: 42px;
    padding:0 35px;
    float: left;
    text-align: center;
    color:#ffffff;
    background: linear-gradient(to right, #43A9F5, #2967E3);
  }
  button,button:hover,button:active {
    background: #2a94de;
    width: 100px;
    border: none;
    line-height: 25px;
    margin: 50px auto 10px;
  }    
  .file-ct-nec {
    overflow: hidden;
  }
  .file-ct-nec textarea{
    outline: none;
  }

 
</style>
