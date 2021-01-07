<template>
  <div id="basic-info-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span :class="{on:plate==='a'}" @click="plate='a'">香港彩</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="base-info">
        <b-col class="col-12">
          <table cellpadding="12">
            <!-- <tr>
              <td>极速六合彩:</td>
              <td><input type="text" v-model="basic.jslhc_sites" placeholder="请输入链接"></td>
            </tr> -->
            <tr>
              <td>香港六合彩:</td>
              <td><input type="text" v-model="basic.xglhc_sites" placeholder="请输入链接"></td>
            </tr>
            <tr>
              <td>澳门六合彩:</td>
              <td><input type="text" v-model="basic.amlhc_sites" placeholder="请输入链接"></td>
            </tr>
          </table>
          <b-button @click="updateBasicInfo">确定</b-button>
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
    name: "LotterySixColors",
    data() {
      return {
        plate: 'a',
        basic: {
          // jslhc_sites: '',
          xglhc_sites: '',
          amlhc_sites: ''
        },
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getBasicInfo() {
      http.getConfigDetail().then(rs => {
          if (!rs.code) {
              // if(rs.jslhc_associated_sites){
              //     this.basic.jslhc_sites = rs.jslhc_associated_sites;
              // }
              if(rs.xglhc_associated_sites){
                  this.basic.xglhc_sites = rs.xglhc_associated_sites;
              }
              if(rs.xglhc_associated_sites){
                  this.basic.amlhc_sites = rs.amlhc_associated_sites;
              }

          }
        })
      },
      updateBasicInfo(){
          let formData = new FormData();
          // formData.append('jslhc_associated_sites', this.basic.jslhc_sites);
          formData.append('xglhc_associated_sites', this.basic.xglhc_sites);
          formData.append('amlhc_associated_sites', this.basic.amlhc_sites);
          http.updateConfig(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
                message:"保存成功！",
                color:'#3cb5f1'
            });
          }
        });
      }
    },
    mounted() {
      this.getBasicInfo();
    }
  }
</script>

<style lang="scss" scoped>
  #basic-info-manage {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-switch {
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
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
      }
    }
  }

  .base-info,.line-config,.other-config,.notice {
    padding-top: 30px;

    table {
      width: 100%;

      tr {
        td:first-child {
          text-align: right;
          width: 150px;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }

    input {
      width: 600px;
      border-radius: 5px;
      border: 1px solid #a0a0a0;
    }

    textarea {
      width:60%;
      border: 1px solid #a0a0a0;
      border-radius: 5px;
    }

    button {
      margin-top: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
    .line-title{
     color: #099ae6;
    }
    i{
      font-style: normal;
      font-size: 12px;
      display: block;
    }
  }
 .form-group {
    margin-bottom: 0;
}
</style>
