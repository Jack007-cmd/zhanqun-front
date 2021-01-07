<template>
  <div id="edit-browser">
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
              <td>浏览器名称:<span style="color:red;">*</span></td>
              <td><input type="text" v-model="browser.name"></td>
            </tr>
            <tr>
              <td>浏览器图标:<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,browser)">
                <img v-lazy="browser.img" :key="browser.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>下载链接:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="browser.url">
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="browser.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 15%;">
            <b-button @click="createBrowser">保存</b-button>
            <b-button @click="back">返回</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>浏览器名称:<span style="color:red;">*</span></td>
              <td><input type="text" v-model="update.name"></td>
            </tr>
            <tr>
              <td>浏览器图标:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update)">
                <img v-lazy="update.img" :key="update.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>下载链接:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="update.url">
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="update.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 15%;">
            <b-button @click="updateBrowser">保存</b-button>
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
    name: "EditBrowser",
    data() {
      return {
        plate: 'a',
        imgFile: '',
        browser: {
          name: '',
          logo: '',
          url: '',
          sort: 0,
          img: '',
        },
        update: {
          id: '',
          name: '',
          logo: '',
          url: '',
          sort: 0,
          img: '',
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getBrowserDetail(id) {
        http.getBrowserDetail({id: id}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['img'] = rs.logo;
            temp['logo'] = '';
            this.update = temp;
          }
        });
      },
      createBrowser() {
        if(!this.browser.name){
           this.$toast.success({
             message:"请填写浏览器名称",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.browser.logo){
           this.$toast.success({
             message:"请选择浏览器图标",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.browser.url){
           this.$toast.success({
             message:"请填写浏览器下载链接",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append('name', this.browser.name);
        formData.append('logo', this.browser.logo);
        formData.append('sort', this.browser.sort);
        formData.append('url', this.browser.url);
        http.createBrowser(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updateBrowser() {
        if(!this.update.name){
           this.$toast.success({
             message:"请填写浏览器名称",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.update.url){
           this.$toast.success({
             message:"请填写浏览器下载链接",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append('id', this.update.id);
        formData.append('name', this.update.name);
        if (this.update.logo) {
          formData.append('logo', this.update.logo);
        }
        formData.append('sort', this.update.sort);
        formData.append('url', this.update.url);
        http.updateBrowser(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      //选择图片
      chooseImg(e, num, temp) {
        //上传图片
        temp.logo = e.target.files[0];
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
            temp.img = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);
      },
    },
    mounted() {
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getBrowserDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-browser {}

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

  .create-info, .update-info {
    padding-top: 30px;

    table {
      width: 50%;
      margin-left: 50px;

      tr {
        td:first-child {
          text-align: right;
          width: 130px;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }

    input {
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
