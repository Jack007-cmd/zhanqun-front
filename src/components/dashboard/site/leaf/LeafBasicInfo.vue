<template>
  <div id="basic-info-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span :class="{on:plate==='a'}" @click="plate='a'">基本信息配置</span>
          <span :class="{on:plate==='b'}" @click="plate='b'">线路配置</span>
          <span :class="{on:plate==='c'}" @click="plate='c'">网站简介</span>
          <span :class="{on:plate==='d'}" @click="plate='d'">其他配置</span>
        </b-col>
      </b-row>
      <b-row v-show="plate==='a'" class="base-info">
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
              <td>网站ICO图:</td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>
                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,basic,'icon')">
                <img v-lazy="basic['icon_img']" :key="basic['icon_img']" alt=""
                     style="margin-left:50px;width: 100px;height: 70px;vertical-align: top;">
              </td>
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
      <b-row v-show="plate==='b'" class="line-config">
        <b-col cols="12">
          <table cellpadding="10">
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
          <b-button style="display: block;margin-left: 15%;" @click="updateLines">确定</b-button>
        </b-col>
      </b-row>      
      <b-row v-show="plate==='c'" class="service-notice">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td style="vertical-align: baseline;"> 网站介绍:</td>
              <td>
                <UEtor :defaultMsg="leafconfig.introduce" :config=config ref="ue"></UEtor>
                <!-- <quill-editor id="site_desc" ref="myTextEditor" v-model="leafconfig.introduce"
                              :options="editorOption"></quill-editor> -->
              </td>
            </tr>
            <tr style="height: 80px;">
              <td></td>
            </tr>
            <tr>
              <td>牌照说明:</td>
              <td>
                <input type="text" v-model="leafconfig['license_desc']">
              </td>
            </tr>
          </table>
          <b-button style="display: block;margin-left: 30%;" @click="updateConfig">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-show="plate==='d'" class="other-config">
        <b-col cols="12">
          <table cellpadding="10">
            <tr>
              <td style="vertical-align: baseline">SEO关键字:</td>
              <td><textarea name="" v-model="leafconfig['seo_keywords']"></textarea><br><i>注：一般不超过100个字符，关键词用英文逗号隔开</i></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">SEO描述:</td>
              <td><textarea name="" v-model="leafconfig['seo_description']"></textarea><br><i>注：一般不超过200个字符</i></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">版权信息:</td>
              <td><textarea name="" v-model="leafconfig['copyright']"></textarea></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline">访问统计代码:</td>
              <td><textarea name="" v-model="leafconfig['stats_code']"></textarea></td>
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
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
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
    name: "BasicInfoManage",
    components: {
      UEtor
    },
    created() {
      this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
        {
          // 图片上传的设置
          uploadConfig: {
            action: process.env.API_ROOT + '/v1/user/material/upload',  // 必填参数 图片上传地址
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
        editorOption: {},
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
        leafconfig: {
          seo_keywords: '',
          seo_description: '',
          copyright: '',
          stats_code: '',
          introduce:'',
          license_desc:'',
        },
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
      addLine() {
        this.lines.push(
          {
            "name": "",
            "url": "",
            "url_testing": ""
          });
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
      getConfigDetail() {
        http.getConfigDetail().then(rs => {
          if (!rs.code) {
            this.leafconfig = rs;
          }
        });
      },
      updateConfig() {
        let formData = new FormData();
        this.leafconfig.introduce = this.$refs.ue.getUEContent();
        Object.keys(this.leafconfig).forEach(v => {
          if (v.indexOf("_img") < 0) {
            if (this.leafconfig[v].toString() ){
              formData.append(v, this.leafconfig[v]);
            }else{
              if(['kefu_wechat_code','app_download_code','agent_wechat_code','agent_qq_code'].indexOf(v)===-1){
                formData.append(v, this.leafconfig[v]);
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
      updateLines() {
        let formData = new FormData();
        for (let i = 0; i < this.lines.length; i++) {
          formData.append("route[" + i + "][type]", 1);
          Object.keys(this.lines[i]).forEach(v => {
            formData.append("route[" + i + "][" + v + "]", this.lines[i][v]);
          });
        }
        formData.append('type', 1);
        http.updateLines(formData).then(rs => {
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
      getAllLines() {
        http.getAllLines().then(rs => {
          if (!rs.code) {
            this.lines = rs;
          }
        });
      }
    },
    mounted() {
      this.getBasicInfo();
      this.getConfigDetail();
      this.getAllLines();
    },
    watch: {
      plate (newVal, oldVal) {
          if ( newVal == 'c') {
            //重新加载富文本// 初始化UE 
            this.editor = window.UE.getEditor('editor', this.config);    
        }
      }
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
