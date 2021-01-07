<template>
  <div id="create-site">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span>网站基本信息配置</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="site-kinds">
          站点类型：
          <ul>
            <li :class="{on:create.type===item.id}" v-for="item in options" @click="switchType(item.id) ">{{item.name}}</li>
          </ul>
        </b-col>
      </b-row>
      <b-row v-if="templet.length>0">
        <b-col class="site-kinds stype">
          网站模板：
          <span class="site-pc">●pc</span>
          <!-- <span class="site-more">更多>></span> -->
        </b-col>
      </b-row>
      <b-row class="plate-b mtb20 col-sm-12 col-md-11" v-if="templet.length>0">
        <b-col cols="3" v-for="item in templet" :key="item.id" style="max-width:19.7%">
          <span class="preview" @click="toPreview(item['case_url'])">预览</span>
          <img class="plate-img" v-lazy="item.preview" :key="item.preview" /> <br>
          <input name="templet-radios" v-model="create['template_id']" :value="item.id" type="radio"
                 @mousedown="change(item)">{{item.name}}
        </b-col>
      </b-row>
      <b-row>
        <b-col class="site-kinds">
          基本信息：
        </b-col>
      </b-row>
      <b-row  class="plate-a" style="padding:0 10px;">
        <table cellspacing="16" style="background: #EEEEEE;">
          <tr>
            <td>网站名称<span style="color:red;">*</span></td>
            <td><input type="text" v-model="create.name" style="width: 783px;"></td>
          </tr>
          <tr>
            <td style="vertical-align: baseline;">网站域名<span style="color:red;">*</span></td>
            <td><input type="text" v-model="create.domain" style="width: 783px;">
              <br>
              <i style="font-style: normal;">(可不填写"http://"或"https://")</i></td>
          </tr>
          <tr v-if="create.type!==9">
            <td>网站ico图<span style="color:red;">*</span></td>
            <td>
              <label class="btn btn-orange" for="upload"
                     style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>
              <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,create,'icon')">
              <img v-lazy="create['icon_img']" :key="create['icon_img']" alt=""
                   style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
            </td>
          </tr>
          <template v-if="create.type!==8">
            <tr>
              <td>网站logo图<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,create,'logo')">
                <img v-lazy="create['logo_img']" :key="create['logo_img']" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
          </template>
          <template v-if="create.type===8">
            <tr>
              <td style="vertical-align: baseline;">HTML<span style="color:red;">*</span></td>
              <td>
                <vue-ueditor-wrap v-model="create.html" :config="config"></vue-ueditor-wrap>
              </td>
            </tr>
          </template>
          <tr v-if="create.type==9">
            <td>文件资源<span style="color:red;">*</span></td>
            <td>
             <div class="wp">
                <span style="color: #ffffff;">上传</span>
                <input @change ="getInputval" type="file" class="upload-input" id="fileUpload" ref="uploadInput">
                <span class="wp-span">{{input_val}}</span>
                <!-- <span class="wp-span-ts"> 支持扩展名：.zip，且不超过10M </span> -->
             </div>
            </td>
          </tr>
        </table>
      </b-row>
      <b-row style="margin-top: 20px;">
        <b-col cols="12">
          <b-button @click="createSite">发布网站</b-button>
          <b-button @click="back">返回</b-button>
        </b-col>
      </b-row>



      <!--
      <b-row>
        <b-col class="mtb20" cols="12">
          <b-row class="plate-switch">
            <b-col cols="6" :class="{on:showPlate==='a'}" @click="showPlate='a'">网站基本信息配置</b-col>
            <b-col cols="6" :class="{on:showPlate==='b'}" @click="showPlate='b'">模板配置</b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row v-show="showPlate==='a'" class="plate-a">
        <table cellspacing="16">
          <tr>
            <td>网站类型<span style="color:red;">*</span></td>
            <td>
              <b-form-select v-model="create.type" :options="options" @change="switchType"></b-form-select>
            </td>
          </tr>
          //站点类型 1= 开奖网 2=部落 3=资讯网 4=导航网 5=香港 6=博客 7=登录入口 9=自定义
          <tr>
            <td>网站名称<span style="color:red;">*</span></td>
            <td><input type="text" v-model="create.name" style="width: 783px;"></td>
          </tr>
          <tr>
            <td style="vertical-align: baseline;">网站域名<span style="color:red;">*</span></td>
            <td><input type="text" v-model="create.domain" style="width: 783px;">
              <br>
              <i style="font-style: normal;">(可不填写"http://"或"https://")</i></td>
          </tr>
          <tr>
            <td>网站ico图<span style="color:red;">*</span></td>
            <td>
              <label class="btn btn-orange" for="upload"
                     style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>
              <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,create,'icon')">
              <img v-lazy="create['icon_img']" :key="create['icon_img']" alt=""
                   style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
            </td>
          </tr>
          <template v-if="create.type!==8">
            <tr>
              <td>网站logo图<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,create,'logo')">
                <img v-lazy="create['logo_img']" :key="create['logo_img']" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
          </template>
          <template v-if="create.type===8">
            <tr>
              <td style="vertical-align: baseline;">HTML<span style="color:red;">*</span></td>
              <td>
                <vue-ueditor-wrap v-model="create.html" :config="config"></vue-ueditor-wrap>
              </td>
            </tr>
          </template>
        </table>
      </b-row>
      <b-row v-show="showPlate==='b'" class="plate-b">
        <b-col cols="1">
          网站模板
        </b-col>
        <b-col cols="2" v-for="item in templet" :key="item.id">
          <span class="preview" @click="toPreview(item.preview)">预览</span>
          <img v-lazy="item.preview" :key="item.preview" height="269" width="238"/> <br>
          <input name="templet-radios" v-model="create['template_id']" :value="item.id" type="radio"
                 @mousedown="change(item)">{{item.name}}
        </b-col>
      </b-row>
      <b-row style="margin-top: 20px;">
        <b-col cols="12">
          <b-button @click="createSite">发布网站</b-button>
          <b-button @click="back">返回</b-button>
        </b-col>
      </b-row>       -->


    </b-container>
    <b-container fluid style="background: transparent!important;">
      <b-row>
        <b-col class="back-window" cols="2">
          <span class="btn-back" @click="back"><i class="iconfont icon-fanhui"></i> 返回</span>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-preview" size="xl" centered hide-header hide-footer>
      <img v-lazy="preview_img" style="width: 100%;"/>
    </b-modal>


  </div>
</template>

<script>
  import * as http from '../../../../apis/net'
  import VueUeditorWrap from 'vue-ueditor-wrap';

  export default {
    name: "CreateSite",
    components: {
      VueUeditorWrap
    },
    data() {
      return {
        config: {
          //百度富文本编辑器参数配置
          initialFrameWidth: "100%",
          initialFrameHeight: 200,
          maxFrameHeight: 350,
          autoHeightEnabled: false,
          imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
          // imageUrlPrefix: "http://api.zhanqun.com/",
          // imagePathFormat: "/v1/user/material/upload",
          UEDITOR_HOME_URL: '/static/Ue/'
          // imageUrl:process.env.API_ROOT+"/v1/user/material/upload/"
        },
        showPlate: 'a',
        // options: [
        //   {value: '', text: '请选择网站类型'},
        // ],
        options:[],
        templet: [],
        preview_img: '',
        create: {
          type: '1',
          name: '',
          domain: '',
          icon: '',
          logo: '',
          icon_img: '',
          logo_img: '',
          template_id: '',
          template_path: '',
          html: '',
          site_zip:''
        },
        errorImg: 'this.src="' + require('../../../assets/imgs/site-img.png') + '"',
        input_val:'支持扩展名：.zip，且不超过10M'
      }
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      change(item) {
        if (this.create['template_id'] && this.create['template_id'] !== item.id) {
          // if (confirm("确定切换模板吗？\n 注：切换模板后，站点内的部分数据需要重新编辑哦！")) {
          this.create['template_id'] = item.id;
          this.create['template_path'] = item.path;
          // } else {
          //   let that = this;
          //   $("input[name='templet-radios']").each(function () {
          //     if ($(this).val() === that.create['template_id']) {
          //       $(this).attr("checked", true);
          //     }
          //   });
          // }
        } else {
          this.create['template_id'] = item.id;
          this.create['template_path'] = item.path;
        }
      },
      toPreview(url) {
        window.open(url,"_blank");
        // this.preview_img = preview;
        // this.$bvModal.show('modal-preview');
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
      createSite() {
        let formData = new FormData();
        if (!this.create.type) {
          this.$toast.success({
            message: "请选择网站类型",
            color: '#3cb5f1'
          });
          return;
        }
        if (!this.create.name) {
          this.$toast.success({
            message: "请填写网站名称",
            color: '#3cb5f1'
          });
          return;
        }
        if (!this.create.domain) {
          this.$toast.success({
            message: "请填写网站域名",
            color: '#3cb5f1'
          });

          return;
        }
        if(this.create.type != 9){
          if (!this.create.icon) {
            this.$toast.success({
              message: "请选择网站ico图",
              color: '#3cb5f1'
            });
            return;
          }
        }
        if (this.create.type !== 8 && !this.create.logo) {
          this.$toast.success({
            message: "请选择网站logo图",
            color: '#3cb5f1'
          });
          return;
        }
        if (this.create.type === 8 && !this.create.html) {
          this.$toast.success({
            message: "请填写HTML",
            color: '#3cb5f1'
          });
          return;
        }
        Object.keys(this.create).forEach(v => {
          if (this.create[v] && v.indexOf("img") < 0) {
            formData.append(v, this.create[v]);
          }
        });
        http.createSite(formData).then(rs => {
          if (!rs.code) {
            this.$router.push("/dashboard/my-group/create-site-success");
          }
        });
      },
      switchType(id) {
        this.create.type = id;
        this.getTempletList();
        this.create.site_zip="";
        this.input_val="支持扩展名：.zip，且不超过10M";
        if(this.type === id){
          return;
        }
      },
      //获取站点类型列表
      getUseSiteType() {
        http.getUseSiteType().then(rs => {
          if (!rs.code) {
            this.create.type=1;
            this.options = rs;
            // rs.forEach(v => {
            //   this.options.push({
            //     value: v.id,
            //     text: v.name
            //   });
            // });
          }
        });
      },
      getTempletList() {
        http.getTempletList({type: this.create.type}).then(rs => {
          if (!rs.code) {
            this.templet = rs;
            if(rs.length>0){
              this.create['template_id'] = rs[0].id;
              this.create['template_path'] = rs[0].path;
            }
          }
        });
      },
      getInputval(e){
        this.input_val ="支持扩展名：.zip，且不超过10M";
        var files = this.$refs.uploadInput.files;
        var AllUpExt = ".zip";
        var extName = files[0].name.substring(files[0].name.lastIndexOf(".")).toLowerCase();
        if(AllUpExt.indexOf(extName) == "-1"){
          this.$toast.success({
            message: "请上传正确的文件",
            color: '#3cb5f1'
          });
          return;
        }
        var size = files[0].size;
        size = size/(1024*1024);
        if(size > 10){  // 10M
          this.$toast.success({
            message: "文件大小不能超过10M",
            color: '#3cb5f1'
          });
          return;
         }
         this.create.site_zip=$("#fileUpload")[0].files[0];
         this.input_val=$("#fileUpload")[0].files[0].name;
         e.target.value="";
      }
    },
    mounted() {
      this.getUseSiteType();
      this.getTempletList();
    }
  }
</script>

<style lang="scss" scoped>
  #create-site {
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
    text-align: left;
    border-bottom: 3px solid #626262;
    padding: 0;
    padding-bottom: 10.4px;
    span{
      cursor: pointer;
      padding: 0 50px;
      padding-bottom: 12px;
      color: #099ae6;
      border-bottom: 3px solid #099ae6;
    }
/*
    div {
      background: #dcdcdc;
      line-height: 50px;
    }

    div.on, div:hover {
      color: #ffffff;
      background: #3cb5f1;
    }
    */
  }
  .site-kinds{
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
    line-height: 60px;
    height: 50px;
  }
  .site-kinds ul {
    list-style: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    padding-left: 0;
  }
  .stype{
    height:35px;
    line-height:35px;
  }
   .site-kinds .site-pc{
     color: #2a94de;
  }
  .site-kinds .site-more{
    float: right;
    cursor: pointer;
  }
  .site-kinds ul li {
    margin-right: 20px;
    cursor: pointer;
}
.site-kinds ul li.on, .site-kinds ul li:hover {
    color: #2a94de;
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
      width: 100%;
    }

    textarea:last-child {
      height: 60px;
    }

    span {
      font-size: 14px;
    }
    .upload-input{
        position:absolute;
        top:0;
        left:0;
        margin:0;
        opacity:0;
        filter:alpha(opacity=0);
        cursor: pointer;
    }
    .wp{
        position:relative;
        width: 75px;
        height: 34px;
        line-height:34px;
        text-align:center;
        vertical-align:middle;
        cursor:pointer;
        background:#2a94de;
        border-radius:4px;
        -webkit-border-radius:4px;
        -moz-border-radius:4px;
    }
    .wp-span{
      position: absolute;
      left: 85px;
      height: 34px;
      line-height: 34px;
      min-width: 350px;
      text-align: left;
    }
    .wp-span-ts{
      position: absolute;
      left: 165px;
      height: 34px;
      line-height: 34px;
      min-width: 200px;
      width: 300px;
    }

  }

  .preview {
    cursor: pointer;
    line-height: 14px;
    color: #fff;
    background: #3cb5f1;
    padding: 5px 20px;
    border-radius: 5px;
    z-index: 1;
    margin-right: 168px;
    position: relative;
    top: 28px;
  }

  .plate-b {
    .plate-img {
      width: 240px;
      height: 308px;
      margin-bottom: 10px;
    }
  }


</style>
