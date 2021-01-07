<template>
  <div id="custom-basic-info">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span class="on">网站基本信息配置3</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="base-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>网站名称:</td>
              <td><input type="text" v-model="basic.name"></td>
            </tr>
            <tr>
              <td>网站域名:</td>
              <td><input type="text" v-model="basic.domain"></td>
            </tr>
            <tr>
              <td>网站logo图:</td>
              <td>
                <label class="btn btn-orange" for="logo"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'logo')">
                <img v-lazy="basic['logo_img']" :key="basic['logo_img']" alt=""
                     style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>关闭网站:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="basic.state"
                    :options="showOptions"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <tr v-if="basic.state===2">
              <td style="vertical-align: baseline">关闭原因:</td>
              <td><textarea name="" v-model="basic['reason_close']"></textarea></td>
            </tr>
          </table>
          <b-button style="display: block;margin-left: 20%;" @click="updateBasicInfo">确定</b-button>
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
  import Vue from 'vue'
  // 工具栏配置
  export default {
    name: "CustomBasicInfo",
    components: {
    },
    created() {},
    data() {
      return {
        plate: 'a',
        show: false,
        imgFile: '',
        showOptions: [
          {text: '关闭', value: 2},
          {text: '显示', value: 0},
        ],
        invite: false,
        inviteOptions: [
          {text: '是', value: 1},
          {text: '否', value: 0},
        ],
        basic: {
          name: '',
          domain: '',
          icon: '',
          logo: '',
          state: '',
          reason: '',
        },
        lines: []
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //选择图片
      chooseImg(e, num, temp, column) {
        //上传图片
        temp[column] = e.target.files[0];
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$toast.success({
            message:"图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
            color:'#3cb5f1'
          });
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            temp[column + "_img"] = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);
      },
      updateBasicInfo() {
        if (!this.basic.name) {
           this.$toast.success({
            message:"请填写站点名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.basic.domain) {
           this.$toast.success({
            message:"请填写网站域名！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        Object.keys(this.basic).forEach(v => {
          if (v.indexOf("img") < 0) {
            if (this.basic[v].toString()) {
              formData.append(v, this.basic[v]);
            }
          }
        });
        http.updateBasicInfo(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
                message:"保存成功！",
                color:'#3cb5f1'
              });
          }
        });
      },
      getBasicInfo() {
        http.getBasicInfo().then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['logo_img'] = rs['logo'];
            temp['icon_img'] = rs['icon'];
             temp['h5_logo_img'] = rs['h5_logo'];
            temp['h5_icon_img'] = rs['h5_icon'];
            temp['logo'] = '';
            temp['icon'] = '';
            temp['h5_logo'] = '';
            temp['h5_icon'] = '';
            this.basic = temp;
          }
        });
      }
    },
    mounted() {
      this.getBasicInfo();
      // this.getConfigDetail();
    }
  }
</script>

<style lang="scss" scoped>
  #custom-basic-info {}

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

  .base-info, .service-notice {
    table {
      width: 70%;
    }

    input {
      width: 50%;
    }
  }

  .line-config {
    table {
      width: 35%;
    }

    input {
      width: 100%;
    }
  }

  .other-config {
    table {
      width: 70%;
    }

    textarea {
      width: 100%;
    }
  }

  .base-info, .service-notice, .line-config, .other-config {
    padding-top: 30px;

    table {
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
      border-radius: 3px;
      border: 1px solid #a0a0a0;
      height: 30px;
    }

    textarea {
      width: 100%;
      border: 1px solid #a0a0a0;
      border-radius: 5px;
    }

    button {
      background: #099ae6;
      border: none;
      width: 100px;
    }

    .line-title {
      color: #099ae6;
    }

    i {
      font-style: normal;
      font-size: 14px;
    }
  }

  .form-group {
    margin-bottom: 0;
  }

  .btn-add {
    margin-top: 0 !important;
    height: 30px;
    line-height: 20px;
    width: 80px !important;
  }

  .btn-delete {
    margin-top: 0 !important;
    display: block;
    margin: 0 auto;
    height: 30px;
    line-height: 20px;
    width: 80px !important;
  }

  /deep/ #site_desc {
    width: 90%;
    /*.editor {*/
    line-height: normal !important;
    height: 300px;
    /*}*/
  }
</style>
