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
              <td>位置:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="slide['position_id']" :options="positionOptions"></b-form-select>
              </td>
            </tr>
            <tr>
              <td>图片:<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,slide)">
                <img v-lazy="slide.img" :key="slide.img" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
           <tr>
              <td>链接:</td>
              <td><input type="text" v-model="slide.url"></td>
            </tr>
            <tr>
              <td>状态:<span style="color:red;">*</span></td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="slide.state"
                    :options="showOptions"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
          </table>
          <div style="padding-left: 35%;">
            <b-button @click="createSlide">确定</b-button>
            <b-button @click="back">取消</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>位置:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="update['position_id']" :options="positionOptions"></b-form-select>
              </td>
            </tr>
            <tr>
              <td>图片:<span style="color:red;">*</span></td>
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
              <td>链接:</td>
              <td><input type="text" v-model="update.url"></td>
            </tr>
            <tr>
              <td>状态:<span style="color:red;">*</span></td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="update.state"
                    :options="showOptions"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
          </table>
          <div style="padding-left: 35%;">
            <b-button @click="updataSlide">确定</b-button>
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
  // 工具栏配置
  const toolbarOptions = [
    ['image'] // 链接、图片、视频-----['link', 'image', 'video']
  ];
  export default {
    name: "BlogSlidesEdit",
    data() {
      return {
        plate: 'a',
        imgFile: '',
        options: [
          {value: 0, text: '首页'},
          {value: 2, text: '电影'},
        ],
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        slide:{
          position_id: '',
          type:'',
          image:'',
          img:'',
          url:'',
          state:'',
        },
        update:{
          position_id: '',
          id:'',
          type:'',
          image:'',
          img:'',
          url:'',
          state:'',
          position:''
        },
        positionOptions:[{text:'请选择位置',value: null},]
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
      createSlide() {
        if(!this.slide['position_id']){
           this.$toast.success({
             message:"请选择轮播图位置！",
            color:'#3cb5f1'
          });
          return;
        }
        if(!this.slide['image']){
           this.$toast.success({
             message:"请填写轮播图图片！",
            color:'#3cb5f1'
          });
          return;
        }
        if(this.slide['state'] === ''){
           this.$toast.success({
             message:"请选择轮播图状态！",
            color:'#3cb5f1'
          });
          return;
        }
        
        let formData = new FormData();
        formData.append("position_id", this.slide['position_id']);
        formData.append("type", this.slide['type']);
        formData.append("image", this.slide['image']);
        formData.append("url", this.slide['url']);
        formData.append("state", this.slide['state']);
        http.createSlide(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updataSlide() {
        if (this.update['type']<0) {
           this.$toast.success({
            message:"请选择轮播图位置！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("position_id", this.update['position_id']);
        formData.append("id", this.update.id);
        formData.append("type", this.update['type']);
        formData.append("state", this.update['state']);
        if (this.update['image']) {
          formData.append("image", this.update['image']);
        }
        formData.append("url", this.update['url']);
        http.updataSlide(formData).then(rs => {
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
        temp['image'] = e.target.files[0];
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
      getSlideDetail() {
        http.getSlideDetail({id: this.updateId}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['img'] = rs['image'];
            temp['image'] = '';
            temp['position'] = rs['type']
            this.update = temp;
          }
        });
      },
      getSlidePositionList() {
        http.getSlidePositionList().then(rs => {
          if (!rs.code) {
            rs.forEach(v => {
              this.positionOptions.push({text: v.name, value: v.id});
            });

          }
        });
      },
    },
    mounted() {
      this.getSlidePositionList();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.updateId = this.$route.query.id;
        this.getSlideDetail();
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

  .create-info,.update-info {
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

    select{
      width: 25%;
      margin-right: 50px;
    }
    input{
      width: 50%;
    }
    textarea{
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
  .form-group {
    margin-bottom: 0;
  }
</style>
