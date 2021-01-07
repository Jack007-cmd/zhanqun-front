<template>
  <div id="basic-info-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span :class="{on:plate==='a'}" @click="plate='a'">基本信息配置</span>
          <span :class="{on:plate==='c'}" @click="plate='c'">线路配置</span>
          <span :class="{on:plate==='b'}" @click="plate='b'">客服</span>
          <span :class="{on:plate==='e'}" @click="plate='e'">公告</span>
          <span :class="{on:plate==='f'}" @click="plate='f'">永久域名</span>
          <span :class="{on:plate==='d'}" @click="plate='d'">其他配置</span>
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
              <td style="vertical-align: initial;padding-top: 36px;">网站ICO图:</td>
              <td>
                <tr>
                <span style="width:45px;display: inline-block;">PC端<span style="color:red;">*</span></span>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'icon')">
                <img v-lazy="basic['icon_img']" :key="basic['icon_img']" alt=""
                     style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>
                <tr>
                <span style="width:45px;display: inline-block;">移动端</span>
                <label class="btn btn-orange" for="h5_upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="h5_upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'h5_icon')">
                <img v-lazy="basic['h5_icon_img']" :key="basic['h5_icon_img']" alt=""
                     style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: initial;padding-top: 36px;">网站logo图:</td>
              <td>
                <tr>
                  <span style="width:45px;display: inline-block;">PC端<span style="color:red;">*</span></span>
                  <label class="btn btn-orange" for="logo"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                  <input type="file" id="logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'logo')">
                  <img v-lazy="basic['logo_img']" :key="basic['logo_img']" alt=""
                      style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>
                <tr>
                  <span style="width:45px;display: inline-block;">移动端</span>
                  <label class="btn btn-orange" for="h5_logo"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                  <input type="file" id="h5_logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'h5_logo')">
                  <img v-lazy="basic['h5_logo_img']" :key="basic['h5_logo_img']" alt=""
                      style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
                </tr>
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
      <b-row v-if="plate==='b'" class="service-notice">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>客服QQ:</td>
              <td><input type="text" v-model="config['kefu_qq']"></td>
            </tr>
            <tr>
              <td>客服微信:</td>
              <td>
                <!--<input type="text"  v-model="config['kefu_wechat']">-->
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,config,'kefu_wechat_code')">
                <img v-lazy="config['kefu_wechat_code_img']" :key="config['kefu_wechat_code_img']" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>在线客服:</td>
              <td><input type="text" v-model="config['online_service']"></td>
            </tr>
            <tr>
              <td>代理申请:</td>
              <td><input type="text" v-model="config['agent_apply']"></td>
            </tr>
          </table>
          <b-button style="display: block;margin-left: 30%;" @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-if="plate==='c'" class="line-config">
        <b-col cols="12">
          <div class="l-con">
              <div class="l-line" :class="lineIndex==1?'on':''" @click="changeLine(1)">会员线路</div>
              <div class="l-line" :class="lineIndex==2?'on':''" @click="changeLine(2)">代理线路</div>
          </div>
          <table cellpadding="10" v-if="lineIndex==1">
            <tr>
              <td> 线路配置：</td>
              <td>
                <b-button class="btn-add" @click="addLine">新增</b-button>
              </td>
            </tr>
            <template v-for="(item,index) in lines">
              <!--<tr>-->
              <!--<td class="line-title">站点线路一</td>-->
              <!--<td></td>-->
              <!--</tr>-->
              <tr>
                <td>线路名称:</td>
                <td><input type="text" v-model="item.name"></td>
              </tr>
              <tr>
                <td>线路入口:</td>
                <td><input type="text" v-model="item.url"></td>
              </tr>
              <tr>
                <td>测速地址:</td>
                <td><input type="text" v-model="item['url_testing']"></td>
              </tr>
              <tr>
                <td colspan="2">
                  <b-button class="btn-delete" @click="deleteLine(index)">删除</b-button>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <hr>
                </td>
              </tr>
            </template>
          </table>
          <table cellpadding="10" v-if="lineIndex==2">
            <tr>
              <td> 线路配置：</td>
              <td>
                <b-button class="btn-add" @click="addProxyLine">新增</b-button>
              </td>
            </tr>
            <template v-for="(item,index) in proxyLines">
              <!--<tr>-->
              <!--<td class="line-title">站点线路一</td>-->
              <!--<td></td>-->
              <!--</tr>-->
              <tr>
                <td>线路名称:</td>
                <td><input type="text" v-model="item.name"></td>
              </tr>
              <tr>
                <td>线路入口:</td>
                <td><input type="text" v-model="item.url"></td>
              </tr>
              <tr>
                <td>测速地址:</td>
                <td><input type="text" v-model="item['url_testing']"></td>
              </tr>
              <tr>
                <td colspan="2">
                  <b-button class="btn-delete" @click="deleteProxyLine(index)">删除</b-button>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <hr>
                </td>
              </tr>
            </template>
          </table>
          <b-button style="display: block;margin-left: 15%;" @click="updateLines">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-if="plate==='d'" class="other-config">
        <b-col cols="12">
          <table cellpadding="10">
            <tr>
              <td style="vertical-align: baseline">SEO关键字:</td>
              <td><textarea name="" v-model="config['seo_keywords']"></textarea><br><i>注：一般不超过100个字符，关键词用英文逗号隔开</i></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">SEO描述:</td>
              <td><textarea name="" v-model="config['seo_description']"></textarea><br><i>注：一般不超过200个字符</i></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">版权信息:</td>
              <td><textarea name="" v-model="config['copyright']"></textarea></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">访问统计代码:</td>
              <td><textarea name="" v-model="config['stats_code']"></textarea></td>
            </tr>
          </table>
          <b-button style="display: block;margin-left: 35%;" @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-if="plate==='e'" class="base-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td style="vertical-align: baseline">公告:</td>
              <td><textarea name="" v-model="config.notice"></textarea></td>
            </tr>
          </table>
          <b-button style="display: block;margin-left: 35%;" @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-if="plate==='f'" class="base-info">
        <b-col cols="12">
          <table cellpadding="10">
            <tr>
              <td>永久域名:</td>
              <td><input type="text" v-model="config['site_domain']"><i style="font-style: normal;font-size: 12px;">注：展示在网站右侧浮动框中，若关闭，则会被隐藏</i>
              </td>
            </tr>
            <tr>
              <td>关闭永久域名:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="config['site_domain_state']"
                    :options="inviteOptions"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
          </table>
          <b-button style="display: block;margin-left: 35%;" @click="updateConfig">确定</b-button>
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

  export default {
    name: "BasicInfoManage",
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
        config: {
          seo_keywords: '',
          seo_description: '',
          copyright: '',
          stats_code: '',
          kefu_wechat_code: '',
          kefu_qq: '',
          horse_race_lamp: '',
          kefu_email: '',
          kefu_wechat_code_img: '',
          site_domain_state: '',
          online_service:'',
          agent_apply:''
        },
        basic: {
          name: '',
          domain: '',
          icon: '',
          h5_icon: '',
          logo: '',
          h5_logo: '',
          state: '',
          reason: '',
        },
        lines: [],
        proxyLines: [],
        lineIndex: 1
      }
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      changeLine(i){
        this.lineIndex = i;
      },
      addProxyLine(){
        if(this.proxyLines.length>4){
          this.$toast.success({
            message: "线路配置不能超过5条！",
            color: '#3cb5f1'
          });
        }else{
          this.proxyLines.push({
            "name": "",
            "url": "",
            "url_testing": ""
          }); 
        }
      },
      deleteProxyLine(index) {
        Vue.delete(this.proxyLines, index);
      },
      addLine() {
        if(this.lines.length>4){
          this.$toast.success({
            message: "线路配置不能超过5条！",
            color: '#3cb5f1'
          });
        }else{
           this.lines.push({
            "name": "",
            "url": "",
            "url_testing": ""
          });
        }
      },
      deleteLine(index) {
        Vue.delete(this.lines, index);
      },
      //选择图片
      chooseImg(e, num, temp, column) {
        //上传图片
        temp[column] = e.target.files[0];
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$toast.success({
            message: "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
            color: '#3cb5f1'
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
      getConfigDetail() {
        http.getConfigDetail().then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['kefu_wechat_code_img'] = rs['kefu_wechat_code'];
            temp['kefu_wechat_code'] = '';
            this.config = temp;
          }
        });
      },
      updateConfig() {
        let formData = new FormData();
        formData.append("site_domain_state", this.config.site_domain_state);
        Object.keys(this.config).forEach(v => {
          if (v.indexOf("_img") < 0) {
            if (this.config[v].toString()) {
              formData.append(v, this.config[v]);
            } else {
              if (['kefu_wechat_code', 'app_download_code', 'agent_wechat_code', 'agent_qq_code'].indexOf(v) === -1) {
                formData.append(v, this.config[v]);
              }
            }
          }
        });
        http.updateConfig(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
          }
        });
      },
      updateBasicInfo() {
        if (!this.basic.name) {
          this.$toast.success({
            message: "请填写站点名称！",
            color: '#3cb5f1'
          });
          return;
        }
        if (!this.basic.domain) {
          this.$toast.success({
            message: "请填写网站域名！",
            color: '#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        Object.keys(this.basic).forEach(v => {
          if (v.indexOf("_img") < 0) {
            if (this.basic[v].toString()) {
              formData.append(v, this.basic[v]);
            }
          }
        });
        http.updateBasicInfo(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
          }
        });
      },
      updateLines() {
        let that = this;
        if(that.getParamQualified()==false){
          return;
        }
        let formData = new FormData();
        for (let i = 0; i < that.lines.length; i++) {
          formData.append("route[" + i + "][type]", 1);
          Object.keys(that.lines[i]).forEach(v => {
            formData.append("route[" + i + "][" + v + "]", that.lines[i][v]);
          });
        }
        formData.append('type', 1);
        http.updateLines(formData).then(rs => {
          if (!rs.code) {
            that.updateProxyLines();
          }
        });
      },
      updateProxyLines(){
        let that = this;
        let formData = new FormData();
        for (let i = 0; i < that.proxyLines.length; i++) {
          formData.append("route[" + i + "][type]", 2);
          Object.keys(that.proxyLines[i]).forEach(v => {
            formData.append("route[" + i + "][" + v + "]", that.proxyLines[i][v]);
          });
        }
        formData.append('type', 2);
        http.updateLines(formData).then(rs => {
          if (!rs.code) {
            that.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
          }
        });
      },
      getParamQualified(){
        let qualified = true;
        let arr = [];
        let that = this;
        for (let i = 0; i < that.lines.length; i++) {
          Object.keys(that.lines[i]).forEach(v => {
            if(that.lines[i][v]==''){
               if(v=='name'){
                 arr.push('name');
               }else if(v=='url'){
                 arr.push('url');
               }else if(v=='url_testing'){
                 arr.push('url_testing');
               }
            }
          });
        }
        for (let i = 0; i < that.proxyLines.length; i++) {
          Object.keys(that.proxyLines[i]).forEach(v => {
            if(that.proxyLines[i][v]==''){
               if(v=='name'){
                 arr.push('name');
               }else if(v=='url'){
                 arr.push('url');
               }else if(v=='url_testing'){
                 arr.push('url_testing');
               }
            }
          });
        }
        if(arr.length>0){
          qualified = false;
          if(arr[0]=='name'){
            this.$toast.success({
              message: "请填写线路名称！",
              color: '#3cb5f1'
            });
          }else if(arr[0]=='url'){
            this.$toast.success({
              message: "请填写线路入口！",
              color: '#3cb5f1'
            });
          }else if(arr[0]=='url_testing'){
            this.$toast.success({
              message: "请填写测速地址！",
              color: '#3cb5f1'
            });
          }
        }
        return qualified;
      },
      getBasicInfo() {
        http.getBasicInfo().then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['logo_img'] = rs['logo'];
            temp['icon_img'] = rs['icon'];
            temp['kefu_wechat_code_img'] = rs['kefu_wechat_code'];
            temp['h5_logo_img'] = rs['h5_logo'];
            temp['h5_icon_img'] = rs['h5_icon'];
            temp[' kefu_wechat_code'] = '';
            temp['logo'] = '';
            temp['icon'] = '';
            temp['h5_logo'] = '';
            temp['h5_icon'] = '';
            this.basic = temp;
          }
        });
      },
      getAllLines() {
        let params = {
          type: 1
        };
        http.getAllLines(params).then(rs => {
          if (!rs.code) {
            this.lines = rs;
          }
        });
      },
      getProxyLines() {
        let params = {
          type: 2
        };
        http.getAllLines(params).then(rs => {
          if (!rs.code) {
            this.proxyLines = rs;
          }
        });
      }
    },
    mounted() {
      this.getBasicInfo();
      this.getConfigDetail();
      this.getAllLines();
      this.getProxyLines();
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
      width: 65%;

    }
  }

  .line-config {
    table {
      width: 35%;
    }

    input {
      width: 100%;
    }
    .l-con{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
    }
    .l-line{
      width: 120px;
      border: 1px solid #a0a0a0;
      text-align: center;
      height:28px;
      line-height:28px;
      cursor: pointer;
    }
    .l-line:nth-child(1){
      margin-left: 61px;
    }
    .l-line:nth-child(2){
      margin-left: 15px;
    }
    .l-line.on{
      color: #099ae6;
      border: 1px solid #099ae6;
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
          font-size: 14px
        }
      }
    }


    input {
      border-radius: 5px;
      border: 1px solid #a0a0a0;
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
</style>
