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
              <td>分类:<span style="color:red;">*</span></td>
              <td>
                <treeselect v-model="article['category_id']" style="width: 25%;" :multiple="false" :options="options" />
              </td>
            </tr>
            <tr>
              <td>产品名称:<span style="color:red;">*</span></td>
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
              <td style="vertical-align: baseline">产品内容:<span style="color:red;">*</span></td>
              <td>
                <UEtor :defaultMsg="article.content" :config=config ref="ue"></UEtor>
                <!-- <quill-editor id="article_editor" ref="myTextEditor" v-model="article.content"
                              :options="editorOption"></quill-editor> -->
              </td>
            </tr>
            <tr>
              <td style="display: block;height: 60px;"></td>
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
              <td>分类:<span style="color:red;">*</span></td>
              <td>
                <treeselect v-model="update['category_id']" style="width: 25%;" :multiple="false" :options="options" />
              </td>
            </tr>
            <tr>
              <td>产品名称:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="update.title">
              </td>
            </tr>
            <tr>
              <td>主图:<span style="color:red;">*</span></td>
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
              <td style="vertical-align: baseline">简介:</td>
              <td><textarea type="text" v-model="update.description"></textarea></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">产品内容:<span style="color:red;">*</span></td>
              <td>
                <UEtor :defaultMsg="update.content" :config=config ref="ue"></UEtor>
                <!-- <quill-editor id="update_editor" ref="myTextEditor" v-model="update.content" :options="editorOption"></quill-editor> -->
              </td>
            </tr>
            <tr>
              <td style="display: block;height: 60px;"></td>
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
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import {quillEditor} from 'vue-quill-editor';
  import {quillRedefine} from 'vue-quill-editor-upload'//引入图片上传
  import UEtor from '../../../Ue' 
  // 工具栏配置
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
    [{header: 1}, {header: 2}], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{list: 'ordered'}, {list: 'bullet'}], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{script: 'sub'}, {script: 'super'}], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
    [{indent: '-1'}, {indent: '+1'}], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
    [{size: ['small', false, 'large', 'huge']}], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{color: []}, {background: []}], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{font: []}], // 字体种类-----[{ font: [] }]
    [{align: []}], // 对齐方式-----[{ align: [] }]
    ['clean'], // 清除文本格式-----['clean']
    ['image'] // 链接、图片、视频-----['link', 'image', 'video']
  ];
  export default {
    name: "CompanyProductAdd",
    components: {
      quillEditor,
      UEtor,
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        config:{//百度富文本编辑器参数配置
            initialFrameWidth:null,
            initialFrameHeight:300,
            allowDivTransToP:false,  //禁止p转为div
            autosave: false,   //关闭自动保存
            serverUrl:  process.env.API_ROOT + "/v1/user/material/ueUpload"
        },  
        defaultMsg:'请输入文本...',          
        editorOption: {
          placeholder: '请输入文本...',
          theme: 'snow',
          modules: {
            toolbar: {
              container: toolbarOptions
            }
          }
        },
        plate: 'a',
        imgFile: '',
        options: [{id: '', label: '请选择栏目'},],
        article: {
          category_id: '',
          title: '',
          description:'',
          seo_description: '',
          seo_keywords: '',
          cover_plan: '',
          img: '',
          content: '',
          identify:1
        },
        update: {
          id: '',
          category_id: '',
          title: '',
          seo_keywords: '',
          cover_plan: '',
          img: '',
          content: '',
          identify:1
        },
      }
    },
    created() {
      this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
        {
          // 图片上传的设置
          uploadConfig: {
            action: process.env.API_ROOT+'/v1/user/material/upload',  // 必填参数 图片上传地址
            // action: this.uploadUrl,  // 必填参数 图片上传地址
            res: (respnse) => {
              return respnse.imageUrl;//return图片url
            },
            methods: 'POST',  // 可选参数 图片上传方式  默认为post
            token: localStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在localStorage
            name: 'image',  // 可选参数 文件的参数名 默认为img
            //size: 2048,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
            accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
            // input点击事件  formData是提交的表单实体
            change: (formData) => {
              // formData.append('image', '')
            },
            // 设置请求头 xhr: 异步请求， formData: 表单对象
            header: (xhr, formData) => {
                if(formData.get('image').size>2048*1024){
                  this.$toast.success({
                    message:"图片大小超过2M上传失败，请重新选择图片！",
                    color:'#3cb5f1'
                  });
                  return false;
                }
              // xhr.setRequestHeader('myHeader','myValue');
              // formData.append('token', '1234')
            },
            // start: function (){}
            start: () => {
            },  // 可选参数 接收一个函数 开始上传数据时会触发
            end: () => {
            },  // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
            success: () => {
            },  // 可选参数 接收一个函数 上传数据成功时会触发
            error: () => {
            }  // 可选参数 接收一个函数 上传数据中断时会触发
          },
          placeholder: '请输入文本...',
          theme: 'snow',
          modules: {
            toolbar: {
              container: toolbarOptions
            }
          }
        })
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createProduct() {
        if(!this.article['category_id']){
           this.$toast.success({
            message:"请选择分类！",
            color:'#3cb5f1'
          });;
          return;
        }
        if(!this.article['title']){
           this.$toast.success({
            message:"请填写产品名称:",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.article['cover_plan']){
           this.$toast.success( {
             message:"请选择产品主图",
            color:'#3cb5f1'
          });
          return;
        }
        //  if(!this.article['description']){
        //    this.$toast.success({
        //      message:"请填写文章简介",
        //     color:'#3cb5f1'
        //   });
        //   return;
        // }
        this.article.content = this.$refs.ue.getUEContent();
        if(!this.article['content']) {
           this.$toast.success({
             message:"请填写产品内容",
            color:'#3cb5f1'
          });
        }
        let formData = new FormData();
        formData.append("type", 1);
        formData.append("category_id", this.article['category_id']);
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
        if (!this.update['category_id']) {
           this.$toast.success({
            message:"请选择分类！",
            color:'#3cb5f1'
          });;
          return;
        }
        if (!this.update['title']) {
           this.$toast.success({
            message:"请填写产品名称",
            color:'#3cb5f1'
          });
          return;
        }      
        this.update.content = this.$refs.ue.getUEContent();
        if (!this.update['content']) {
           this.$toast.success({
            message:"请填写文章内容！",
            color:'#3cb5f1'
          });
          return;
        }
        // if (!this.update['description']) {
        //    this.$toast.success({
        //     message:"请填写文章简介！",
        //     color:'#3cb5f1'
        //   });
        //   return;
        // }
        let formData = new FormData();
        formData.append("type", 1);
        formData.append("id", this.update['id']);
        formData.append("category_id", this.update['category_id']);
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
      getProductCategoryAll() {
        http.getProductCategoryAll().then(rs => {
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
      // getAllTag() {
      //   http.getAllTag().then(rs => {
      //     if(!rs.code) {
      //       rs.forEach( v=> {
      //         this.tag.push({
      //           text: v.name,
      //           value: v.id
      //         });
      //       })
      //     }
      //   });
      // }
    },
    mounted() {
      this.getProductCategoryAll();
      // this.getAllTag();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.updateId = this.$route.query.id;
        this.getProductDetail();
      }
      if (this.plate === 'a') {
        this.article.identify = common.randomString(8);
      }
      //重新加载富文本// 初始化UE 
      this.editor = window.UE.getEditor('editor', this.config);              
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
