<template>
  <div id="update-site">
    <b-container fluid>
      <b-row>
        <b-col class="mtb20" cols="12">
          <b-row class="plate-switch">
            <b-col cols="6" :class="{on:showPlate==='a'}" @click="showPlate='a'">网站基本信息配置</b-col>
            <!--<b-col cols="6" :class="{on:showPlate==='b'}" @click="showPlate='b'">模板配置</b-col>-->
          </b-row>
        </b-col>
      </b-row>

      <b-row v-show="showPlate==='a'" class="plate-a">
        <table cellspacing="16">
          <tr>
            <td>网站类型<span style="color:red;">*</span></td>
            <td>
              <b-form-select v-model="update.type" :options="options" disabled></b-form-select>
            </td>
          </tr>
          <!--站点类型 1= 开奖网 2=部落 3=资讯网 4=导航网 5=香港 6=博客 7=登录入口-->
          <tr>
            <td>网站名称<span style="color:red;">*</span></td>
            <td><input type="text" v-model="update.name" style="width: 690px;"></td>
          </tr>
          <tr>
            <td style="vertical-align: baseline;">网站域名<span style="color:red;">*</span></td>
            <td><input type="text" v-model="update.domain" style="width: 690px;"><br>
              <i style="font-style: normal;">(可不填写"http://"或"https://")</i>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: initial;padding-top: 42px;">网站ICO图:</td>
            <td>
              <tr>
                 <span style="width:45px;display: inline-block;">PC端<span style="color:red;">*</span></span>
                <label class="btn btn-orange" for="upload"
                     style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update,'icon')">
                <img v-lazy="update['icon_img']" :key="update['icon_img']" alt=""
                   style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </tr>
              <tr>
                <span style="width:45px;display: inline-block;">移动端</span>
                <label class="btn btn-orange" for="h5_upload"
                     style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="h5_upload" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update,'h5_icon')">
                <img v-lazy="update['h5_icon_img']" :key="update['h5_icon_img']" alt=""
                   style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </tr>
              
            </td>
          </tr>
          <template v-if="update.type!==8">
            <tr>
              <td style="vertical-align: initial;padding-top: 42px;">网站logo图:</td>
              <td>
                <tr>
                  <span style="width:45px;display: inline-block;">PC端<span style="color:red;">*</span></span>
                  <label class="btn btn-orange" for="uploads"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>

                  <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="chooseImg($event, 1,update,'logo')">
                  <img v-lazy="update['logo_img']" :key="update['logo_img']" alt=""
                      style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
                  <template v-if="templatePath=='news/comprehensive'">
                    <span style="margin-left:25px;width:75px;display: inline-block;">PC端白色<span style="color:red;">*</span></span>
                    <label class="btn btn-orange" for="white_logo"
                          style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                      <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>

                    <input type="file" id="white_logo" style="position:absolute; clip:rect(0 0 0 0);"
                          accept="image/png, image/jpeg, image/gif, image/jpg"
                          @change="chooseImg($event, 1,update,'white_logo')">
                    <img v-lazy="update['white_logo_img']" :key="update['white_logo_img']" alt=""
                        style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
                  </template>
                </tr>
                <tr>
                  <span style="width:45px;display: inline-block;">移动端</span>
                  <label class="btn btn-orange" for="h5_uploads"
                        style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                    <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>

                  <input type="file" id="h5_uploads" style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="chooseImg($event, 1,update,'h5_logo')">
                  <img v-lazy="update['h5_logo_img']" :key="update['h5_logo_img']" alt=""
                      style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
                </tr>
                
              </td>
            </tr>
          </template>
          <template v-if="update.type===8">
            <tr>
              <td style="vertical-align: baseline;">HTML<span style="color:red;">*</span></td>
              <td>
                <vue-ueditor-wrap v-model="update.html" :config="config"></vue-ueditor-wrap>
              </td>
            </tr>
          </template>
        </table>
        <code id="testcon" style="width: 0;height: 0;"></code>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-button @click="updateSiteDetail">保存</b-button>
          <b-button @click="back">返回</b-button>
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
  import * as http from '../../../../apis/net'
  import VueUeditorWrap from 'vue-ueditor-wrap';

  export default {
    name: "UpdateSite",
    components: {
      VueUeditorWrap
    },
    data() {
      return {
        config: {
          //百度富文本编辑器参数配置
          initialFrameWidth: "50%",
          initialFrameHeight: 200,
          maxFrameHeight: 350,
          autoHeightEnabled: false,
          imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
          // imageUrlPrefix: "http://api.zhanqun.com/",
          // imagePathFormat: "/v1/user/material/upload",
          UEDITOR_HOME_URL: '/static/Ue/'
          // imageUrl:process.env.API_ROOT+"/v1/user/material/upload/"
        },
        editorOption: {},
        showPlate: 'a',
        options: [
          {value: '', text: '请选择网站类型'},
        ],
        update: {
          type: '',
          name: '',
          domain: '',
          icon: '',
          logo: '',
          white_logo:'',
          icon_img: '',
          logo_img: '',
          white_logo_img:'',
          h5_icon: '',
          h5_logo: '',
          h5_icon_img: '',
          h5_logo_img: '',
          template_id: '',
          template_path: '',
          html: ''
        },
        errorImg: 'this.src="' + require('../../../assets/imgs/site-img.png') + '"',
        templatePath:''
      }
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
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
      updateSiteDetail() {
        let formData = new FormData();
        if (!this.update.name) {
          this.$toast.success({
            message: "请填写网站名称",
            color: '#3cb5f1'
          });
          return;
        }
        if (!this.update.domain) {
          this.$toast.success({
            message: "请填写网站域名",
            color: '#3cb5f1'
          });
          return;
        }
        if (this.update.type === 8 && !this.update.html) {
          this.$toast.success({
            message: "请填写HTML",
            color: '#3cb5f1'
          });
          return;
        }
        Object.keys(this.update).forEach(v => {
          if (this.update[v] && v.indexOf("img") < 0) {
            formData.append(v, this.update[v]);
          }
        });
        http.updateSiteDetail(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
            this.back();
          }
        });
      },

      //获取站点类型列表
      getSiteType() {
        http.getSiteType().then(rs => {
          if (!rs.code) {
            rs.forEach(v => {
              this.options.push({
                value: v.id,
                text: v.name
              });
            });
          }
        });
      },
      getSiteDetail(id) {
        http.getSiteDetail({id: id}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['icon_img'] = rs['icon'];
            temp['logo_img'] = rs['logo'];
            temp['white_logo_img'] = rs['white_logo'];
            temp['h5_icon_img'] = rs['h5_icon'];
            temp['h5_logo_img'] = rs['h5_logo'];
            temp['icon'] = '';
            temp['logo'] = '';
            temp['white_logo'] = '';
            temp['h5_icon'] = '';
            temp['h5_logo'] = '';
            this.update = temp;
          }
        });
      },
    },
    mounted() {
      this.getSiteType();
      if (this.$route.query.id) {
        this.getSiteDetail(this.$route.query.id);
      }
      if (this.$route.query.path) {
        this.templatePath = this.$route.query.path;
      }
    },
    beforeUpdate() {

    }
  }
</script>

<style lang="scss" scoped>
  #update-site {
    padding: 25px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 67px);
  }

  .container-fluid {
    padding: 30px;
    background: #ffffff;

    button {
      background: #2a94de;
      width: 100px;
      border: none;
      line-height: 25px;
      margin: 50px auto 10px;
    }
  }

  .item-title {
    height: 30px;
    line-height: 30px;
    /*margin: 0 auto;*/
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #bfbfbf;

    .title {
      margin-left: 10px;
    }

  }

  .mtb20 {
    margin: 20px auto;
  }

  .plate-switch {
    padding: 0;

    div {
      background: #dcdcdc;
      line-height: 50px;
    }

    div.on, div:hover {
      color: #ffffff;
      background: #3cb5f1;
    }
  }

  table {
    width: 100%;
    border-collapse: inherit;

    tr {
      td:first-child {
        width: 120px;
        text-align: right;
        padding-right: 20px;
      }

      td:last-child {
        text-align: left;
        font-size: 14px
      }
    }

    select {
      width: 300px;
    }

    #site-name, #site-domain {
      width: 500px;
    }

    #service-qq {
      width: 300px;
    }

    textarea {
      height: 80px;
      width: 45%;
    }

    textarea:last-child {
      height: 60px;
    }

    span {
      font-size: 14px;
    }

  }


  .preview {
    cursor: pointer;
    line-height: 15px;
    color: #ffffff;
    background: #3cb5f1;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1;
    margin-right: 184px;
    position: relative;
    top: 28px;
  }

  .plate-b {
    img {
      margin-bottom: 10px;
    }
  }

</style>
