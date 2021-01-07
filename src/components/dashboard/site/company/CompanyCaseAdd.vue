<template>
  <div id="edit-article">
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
              <td>案例名称:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="article.title">
              </td>
            </tr>
            <tr>
              <td>主图:<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,article)">
                <img v-lazy="article.img" :key="article.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
             <tr>
              <td style="vertical-align: baseline">简介:</td>
              <td><textarea type="text" v-model="article.description"></textarea></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">案例描述:<span style="color:red;">*</span></td>
              <td><textarea name="" v-model="article['content']"></textarea></td>
            </tr> 
          </table>
          <div style="padding-left: 38%;">
            <b-button @click="createProduct()">确定</b-button>
            <b-button @click="back">取消</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>案例名称:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="update.title">
              </td>
            </tr>
             <tr>
              <td style="vertical-align: baseline">简介:</td>
              <td><textarea type="text" v-model="update.description"></textarea></td>
            </tr>
            <tr>
              <td>主图:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update)">
                <img v-lazy="update.img" :key="update.img" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">

              </td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">案例描述:<span style="color:red;">*</span></td>
              <td><textarea name="" v-model="update['content']"></textarea></td>
            </tr> 
          </table>
          <div style="padding-left: 38%;">
            <b-button @click="updataProduct">确定</b-button>
            <b-button @click="back">取消</b-button>
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
  import common from '../../../../common'
  import * as http from '../../../../../apis/site'
  export default {
    name: "CompanyCaseAdd",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        plate: 'a',
        imgFile: '',
        options: [{id: '', label: '请选择栏目'},],
        article: {
          tags:[],
          url:'',
          category_id: '',
          title: '',
          description:'',
          seo_description: '',
          seo_keywords: '',
          cover_plan: '',
          img: '',
          content: '',
          identify: ''
        },
        update: {
          tags:[],
          id: '',
          url:'',
          category_id: '',
          title: '',
          description:'',
          seo_description: '',
          seo_keywords: '',
          cover_plan: '',
          img: '',
          content: '',
          identify: ''
        },
        tag: [{text: '请选择标签',value:'' },]
      }
    },
    created() {
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createProduct() {
        if(!this.article['title']){
           this.$toast.success({
            message:"请填写案例名称:",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.article['cover_plan']){
           this.$toast.success( {
             message:"请选择案例主图",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.article['content']){
           this.$toast.success( {
             message:"请填写案例描述",
            color:'#3cb5f1'
          });
          return;
        }        
        let formData = new FormData();
        formData.append("type", 2);
        formData.append("title", this.article['title']);
        formData.append("cover_plan", this.article['cover_plan']);
        formData.append("content", this.article['content']);
        formData.append("description", this.article['description']);
        formData.append("identify", this.article['identify']);
        http.createProduct(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updataProduct() {
        if (!this.update['title']) {
           this.$toast.success({
            message:"请填写案例名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update['content']) {
           this.$toast.success({
            message:"请填写案例描述！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("type", 2);
        formData.append("id", this.update['id']);
        formData.append("title", this.update['title']);
        if (this.update['cover_plan']) {
          formData.append("cover_plan", this.update['cover_plan']);
        }
        formData.append("content", this.update['content']);
        formData.append("description", this.update['description']);
        formData.append("identify", this.update['identify']);
        http.updataProduct(formData).then(rs => {
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
        var _this = this;
        //上传图片
        temp['cover_plan'] = e.target.files[0];
        var file = e.target.files[0];

        _this.fileName = file.name;
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
      getProductDetail() {
        http.getProductDetail({id: this.updateId}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['img'] = rs['cover_plan'];
            temp['cover_plan'] = '';
            this.update = temp;
          }
        });
      },
      getAllArticleCategory() {
        http.getAllArticleCategory().then(rs => {
          if (!rs.code) {
            rs.forEach(t1 => {
              if (t1['parent_id'] === 0) {
                this.options.push({id:t1.id,label:t1.name});
              }
            });
            rs.forEach(a => {
              this.options.forEach((b) => {
                if (b.id === a['parent_id']) {
                  if(!b.children){
                    b.children=[];
                  }
                  b.children.push({id: a.id,label: a.name});
                }
              });
            });
          }
        });
      },
      getAllTag() {
        http.getAllTag().then(rs => {
          if(!rs.code) {
            rs.forEach( v=> {
              this.tag.push({
                text: v.name,
                value: v.id
              });
            })
          }
        });
      }
    },
    mounted() {
      this.getAllArticleCategory();
      this.getAllTag();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.updateId = this.$route.query.id;
        this.getProductDetail();
      }
      if (this.plate === 'a') {
        this.article.identify = common.randomString(8);
      }
    }
  }
</script>
<style lang="scss" scoped>

  #edit-article {}

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
      width: 70%;
      margin-left: 50px;

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

    select {
      width: 25%;
      margin-right: 50px;
    }

    input {
      width: 50%;
    }

    textarea {
      width: 90%;
    }

    button {
      float: left;
      margin: 30px;
      background: #3cb5f1;
      border: none;
      width: 100px;
    }
  }

  /deep/ #article_editor {
    width: 90%;
    /*.editor {*/
    line-height: normal !important;
    height: 300px;
    /*}*/
    .ql-snow .ql-tooltip[data-mode=link]::before {
      content: "请输入链接地址:";
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
      content: '14px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
      content: '10px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
      content: '18px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
      content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
      content: '文本';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      content: '标题4';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      content: '标题5';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
      content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
      content: '标准字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
      content: '衬线字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
      content: '等宽字体';
    }
  }
  /deep/ #update_editor {
    width: 90%;
    /*.editor {*/
    line-height: normal !important;
    height: 300px;
    /*}*/
    .ql-snow .ql-tooltip[data-mode=link]::before {
      content: "请输入链接地址:";
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
      content: '14px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
      content: '10px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
      content: '18px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
      content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
      content: '文本';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      content: '标题4';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      content: '标题5';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
      content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
      content: '标准字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
      content: '衬线字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
      content: '等宽字体';
    }
  }
</style>
