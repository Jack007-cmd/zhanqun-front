<template>
  <div id="basic-info-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span :class="{on:plate==='a'}" @click="plate='a'">网站基本信息配置</span>
          <span :class="{on:plate==='b'}" @click="plate='b'">客服</span>
          <span :class="{on:plate==='c'}" @click="plate='c'">网站简介</span>
          <!--   <span :class="{on:plate==='d'}" @click="plate='d'">APP下载</span>
          -->
          <span :class="{on:plate==='e'}" @click="plate='e'">其他配置</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="base-info">
        <b-col class="col-12">
          <table cellpadding="12">
            <tr>
              <td>网站名称:<span style="color:red;">*</span></td>
              <td><input type="text" v-model="basic.name"></td>
            </tr>
            <tr>
              <td>网站域名:<span style="color:red;">*</span></td>
              <td><input type="text" v-model="basic.domain"></td>
            </tr>
            <tr>
              <td style="vertical-align: initial;padding-top: 36px;">网站ICO图:<span style="color:red;">*</span></td>
              <td>
                <tr>
                  <!-- <span style="width:45px;display: inline-block;">PC端<span style="color:red;">*</span></span> -->
                  <label class="btn btn-orange" for="upload"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                  <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'icon')">
                  <img v-lazy="basic['icon_img']" :key="basic['icon_img']" alt=""
                      style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>
                <!--  
                <tr>
                  <span style="width:45px;display: inline-block;">移动端</span>
                  <label class="btn btn-orange" for="h5_upload"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                  <input type="file" id="h5_upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'h5_icon')">
                  <img v-lazy="basic['h5_icon_img']" :key="basic['h5_icon_img']" alt=""
                      style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>-->
              </td>
            </tr>
            <tr>
              <td style="vertical-align: initial;padding-top: 36px;">网站logo图:<span style="color:red;">*</span></td>
              <td>
                <tr>
                  <!-- <span style="width:45px;display: inline-block;">PC端<span style="color:red;">*</span></span> -->
                  <label class="btn btn-orange" for="logo"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                  <input type="file" id="logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'logo')">
                  <img v-lazy="basic['logo_img']" :key="basic['logo_img']" alt=""
                      style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>
                <!--  
                <tr>
                  <span style="width:45px;display: inline-block;">移动端</span>
                  <label class="btn btn-orange" for="h5_logo"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                  <input type="file" id="h5_logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'h5_logo')">
                  <img v-lazy="basic['h5_logo_img']" :key="basic['h5_logo_img']" alt=""
                      style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>-->
              </td>
            </tr>
            <tr>
              <td>关闭网站:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="basic.state"
                    :options="inviteOptions"
                    name="radio-showClose"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <!-- <tr v-if="basic.state===2">
              <td style="vertical-align: baseline;">关闭原因:</td>
              <td><textarea name="" v-model="basic['reason_close']"></textarea></td>
            </tr> -->
          </table>
          <b-button @click="updateBasicInfo">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="line-config">
        <b-col class="col-12">
          <table cellpadding="10">
            <tr>
              <td>客服QQ:</td>
              <td><input type="text" v-model="config['kefu_qq']"></td>
            </tr>
            <tr>
              <td>客服微信:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,config,'kefu_wechat_code')">
                <img v-lazy="config['kefu_wechat_code_img']" :key="config['kefu_wechat_code_img']" alt="" v-if="config['kefu_wechat_code_img']"
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>邮箱:</td>
              <td><input type="text" v-model="config['kefu_email']"></td>
            </tr>            
          </table>
          <b-button @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
       
      <b-row v-if="plate==='c'" class="notice">
        <b-col class="col-12">
          <table cellpadding="10">
            <tr>
              <td>标题:</td>
              <td><input type="text" v-model="config['web_title']"></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">网站介绍:</td>
              <td><textarea name="" v-model="config['web_introduce']"></textarea></td>
            </tr>
          </table>
          <b-button @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
<!-- 
      <b-row v-if="plate==='d'" class="base-info">
         <b-col class="col-12">
          <table cellpadding="10">
            <tr>
              <td>APP下载地址:</td>
              <td>
                <label class="btn btn-orange" for="uploadv"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploadv" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,config,'app_download_code')">
                <img v-lazy="config['app_download_code_img']" :key="config['app_download_code_img']" alt="" v-if="config['app_download_code_img']"
                      style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>软件载状态:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="config.app_state"
                    :options="showOptions"
                    name="radio-showState"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
          </table>
          <b-button @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
      -->

      <b-row v-if="plate==='e'" class="other-config">
        <b-col class="col-12">
          <table cellpadding="10">
            <tr>
              <td style="vertical-align: baseline;">SEO关键字:</td>
              <td>
                <textarea name="" v-model="config['seo_keywords']"></textarea>
                <i>注：一般不超过100个字符，关键词用英文逗号隔开</i>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">SEO描述:</td>
              <td>
                <textarea name="" v-model="config['seo_description']"></textarea>
                <i>注：一般不超过200个字符</i>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">版权信息:</td>
              <td>
                <textarea name="" v-model="config['copyright']"></textarea>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">访问统计代码:</td>
              <td><textarea name="" v-model="config['stats_code']"></textarea>
              </td>
            </tr>
          </table>
          <b-button @click="updateConfig">确定</b-button>
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
    name: "CompanyBasicInfo",
    data() {
      return {
        plate: 'a',
        imgFile: '',
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        inviteOptions: [
          {text: '是', value: 2},
          {text: '否', value: 0},
        ],
        config: {
          seo_keywords: '',
          seo_description: '',
          copyright: '',
          stats_code: '',
          kefu_qq: '',
          horse_race_lamp: '',
          kefu_email: '',
          kefu_wechat_code:'',
          notice:'',
          app_download:'',
          app_download_code:'',
          app_state:'',
          web_title:'',
          web_introduce:''
        },
        basic: {
          name: '',
          domain: '',
          icon: '',
          h5_icon: '',
          logo: '',
          h5_logo: '',
          state: ''
        },
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //选择图片
      chooseImg(e, num, temp,column) {
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
            temp[column+"_img"] = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);
      },
      getConfigDetail(){
        http.getConfigDetail().then(rs=>{
          if(!rs.code){
            let temp = rs;
            temp['kefu_wechat_code_img'] = rs['kefu_wechat_code'];
            temp['kefu_wechat_code'] = '';
            temp['app_download_code_img'] = rs['app_download_code'];
            temp['app_download_code'] = '';
            this.config = temp;

          }
        });
      },
      updateConfig() {
        let formData = new FormData();
        Object.keys(this.config).forEach(v => {
          if (v === 'kefu_wechat_code_img' || v === 'app_download_code_img') {
          } else{
            if (v.indexOf("_img") < 0) {
              if (this.config[v].toString() ){
                formData.append(v, this.config[v]);
              }else{
                if(['kefu_wechat_code','app_download_code','agent_wechat_code','agent_qq_code'].indexOf(v)===-1){
                  formData.append(v, this.config[v]);
                }
              }
            }
          }
        });
        http.updateConfig(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
          }
        });
      },
      updateBasicInfo() {
        if(!this.basic.name){
           this.$toast.success({
            message:"请填写站点名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.basic.domain){
           this.$toast.success({
            message:"请填写网站域名！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("state", this.basic.state);
        // formData.append("state", this.basic.web_title);
        // formData.append("state", this.basic.web_introduce);
        Object.keys(this.basic).forEach(v=>{
          if (v.indexOf("_img") < 0) {
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
      },
    },
    mounted() {
      this.getBasicInfo();
      this.getConfigDetail();
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
