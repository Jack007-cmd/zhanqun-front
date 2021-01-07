<template>
  <div id="edit-nav">
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
              <td>名称:</td>
              <td><input type="text" v-model="nav.name"></td>
            </tr>
            <tr>
              <td>上级:</td>
              <td>
                <!-- <b-form-select v-model="nav['parent_id']" :options="options"></b-form-select> -->
                <treeselect v-model="nav['parent_id']" style="width: 180px;" :multiple="false" :options="options" />
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td><input type="text" v-model="nav.url"></td>
              <td class="fl"><b-form-checkbox
                  id="checkbox-1"
                  v-model="nav['is_blank']"
                  value="1"
                  unchecked-value="0"
                  name="checkbox-1"
                  style="float:left"
                  >
                  </b-form-checkbox>
                  <i>新窗口打开</i>
              </td>
            </tr>
            <!--  
            <tr>
              <td>图标:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,nav)">
                <img v-lazy="nav.cover_plan" :key="nav.cover_plan" alt="" v-if="nav.cover_plan"
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>-->
            <tr>
              <td>状态:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="nav.state"
                    :options="showOptions"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="nav.sort"></td>
            </tr>
            <tr v-if="mold == 1">
              <td>字体编辑:</td>
              <td>
               <div class="font-update">
                  <select @change="getFontVal($event)" class="opt">
                    <option v-for="(item,index) in 100" :key="'x'+index" :value='index' :selected = "select==index?'selected':''" v-if="index>0">{{index}}</option>
                  </select>
                  <span class="ft-color">
                    <colorPicker v-model="color" v-on:change="headleChangeColor" defaultColor="#9ea2ab"></colorPicker>
                    <span class="ft-bt" :style="'background:'+color"></span>
                  </span>
                  <span class="font-b" @click="setFontB" :class="fontbShow==true?'on':''"></span>
               </div>
              </td>
            </tr>
            <tr>
              <td>SEO配置</td>
            </tr>
            <tr>
              <td>标题:</td>
              <td><input type="text" v-model="nav.seo_title"></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">关键词:</td>
              <td><textarea name="" v-model="nav.seo_keywords"></textarea></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">描述:</td>
              <td><textarea name="" v-model="nav.seo_description"></textarea></td>
            </tr>                                    
          </table>
          <div style="padding-left: 35%;">
            <b-button @click="createNav">确定</b-button>
            <b-button @click="back">取消</b-button>
          </div>
        </b-col>
      </b-row>

      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>名称:</td>
              <td><input type="text" v-model="update.name"></td>
            </tr>
            <tr>
              <td>上级:</td>
              <td>
                <!-- <b-form-select v-model="update.parent_id" :options="options"></b-form-select> -->
                <treeselect v-model="update['parent_id']" style="width: 180px;" :multiple="false" :options="options" />
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td><input type="text" v-model="update.url"></td>
              <td class="fl"><b-form-checkbox
                  id="checkbox-1"
                  v-model="update['is_blank']"
                  value="1"
                  unchecked-value="0"
                  name="checkbox-1"
                  style="float:left"
                  >
                  </b-form-checkbox>
                  <i>新窗口打开</i>
              </td>
            </tr>
            <!-- <tr>
              <td>图标:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update)">
                <img v-lazy="update.cover_plan" :key="update.cover_plan" alt="" v-if="update.cover_plan"
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr> -->
            <tr>
              <td>状态:</td>
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
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="update.sort"></td>
            </tr>
            <tr v-if="mold == 1">
              <td>字体编辑:</td>
              <td>
               <div class="font-update">
                  <select @change="getFontVal($event)" class="opt">
                    <option v-for="(item,index) in 100" :key="'x'+index" :value='index' :selected = "select==index?'selected':''" v-if="index>0">{{index}}</option>
                  </select>
                  <span class="ft-color">
                    <colorPicker v-model="color" v-on:change="headleChangeColor" defaultColor="#9ea2ab"></colorPicker>
                    <span class="ft-bt" :style="'background:'+color"></span>
                  </span>
                  <span class="font-b" @click="setFontB" :class="fontbShow==true?'on':''"></span>
               </div>
              </td>
            </tr>
            <tr>
              <td>SEO配置</td>
            </tr>
            <tr>
              <td>标题:</td>
              <td><input type="text" v-model="update.seo_title"></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">关键词:</td>
              <td><textarea name="" v-model="update.seo_keywords"></textarea></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">描述:</td>
              <td><textarea name="" v-model="update.seo_description"></textarea></td>
            </tr>             
          </table>
          <div style="padding-left: 35%;">
            <b-button @click="updateNav">确定</b-button>
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
  import * as http from '../../../../../apis/site'

  export default {
    name: "CompanyNavAdd",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        plate: 'a',
        status: '',
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        options: [
          {id: '', label: '请选择上级'},
          {id: '0', label: '无'},
        ],
        nav: {
          name: '',
          parent_id: '',
          url: '',
          sort: '',
          state: '',
          is_blank:'',
          type:'',
          cover_plan: '',
          icon:'',
          seo_title:'',
          seo_keywords:'',
          seo_description:'',
          font_style:''
        },
        update: {
          id: '',
          name: '',
          parent_id: '',
          url: '',
          sort: '',
          state: '',
          is_blank:'',
          icon:'',
          cover_plan: '',
          seo_title:'',
          seo_keywords:'',
          seo_description:'',
          font_style:''        
        },
        color:'#9ea2ab',
        fontbShow:false,
        select: 16,
        mold:0
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createNav() {
        let mold = this.$route.query.mold
        this.nav.type = mold
        if (!this.nav.name) {
           this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.nav.url) {
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.nav.sort.toString()) {
           this.$toast.success({
            message:"请填写排序！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.nav.state.toString()) {
           this.$toast.success({
            message:"请选择状态！",
            color:'#3cb5f1'
          });
          return;
        }
        let bold = this.fontbShow==false?'normal':'bold';
        let font_style = 'font-size:'+this.select+'px!important;'+ 'font-weight:'+bold+'!important;color:'+this.color+'!important;';
        let formData = new FormData();
        formData.append("id", this.nav['id']);
        formData.append("name", this.nav['name']);
        formData.append("url", this.nav['url']);
        formData.append("sort", this.nav['sort']);
        formData.append("state", this.nav['state']);
        formData.append("is_blank", this.nav['is_blank']);
        formData.append("seo_title", this.nav['seo_title']);
        formData.append("seo_keywords", this.nav['seo_keywords']);
        formData.append("seo_description", this.nav['seo_description']);
        formData.append("type", this.nav.type);
        formData.append("font_style", font_style);

        if (this.nav['icon']) {
          formData.append("icon", this.nav['icon']);
        }
        formData.append("parent_id", this.nav['parent_id']);
        http.createNav(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updateNav() {
        if (!this.update.name) {
           this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.url) {
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.sort.toString()) {
           this.$toast.success({
            message:"请填写排序！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.state.toString()) {
           this.$toast.success({
            message:"请选择状态！",
            color:'#3cb5f1'
          });
          return;
        }
        let bold = this.fontbShow==false?'normal':'bold';
        let font_style = 'font-size:'+this.select+'px!important;'+ 'font-weight:'+bold+'!important;color:'+this.color+'!important;';
        let formData = new FormData();
        formData.append("id", this.update['id']);
        formData.append("name", this.update['name']);
        formData.append("url", this.update['url']);
        formData.append("sort", this.update['sort']);
        formData.append("state", this.update['state']);
        formData.append("is_blank", this.update['is_blank']);
        formData.append("seo_title", this.update['seo_title']);
        formData.append("seo_keywords", this.update['seo_keywords']);
        formData.append("seo_description", this.update['seo_description']);        
        formData.append("font_style", font_style);
        if (this.update['icon']) {
          formData.append("icon", this.update['icon']);
        }
        formData.append("parent_id", this.update['parent_id']);
        http.updateNav(formData).then(rs => {
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
        temp['icon'] = e.target.files[0];
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
            temp.cover_plan = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);

      },

      getNavList() {
        http.getNavList({type:this.$route.query.mold}).then(rs => {
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
                  b.children.push({id:a.id,label:a.name});
                }
              });
            });
          }
        });
      },

      getNavDetail() {
        http.getNavDetail({id: this.updateId}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['cover_plan'] = rs['icon'];
            temp['icon'] = '';
            this.update = temp;
            if(this.update['font_style']){
              let i = (this.update['font_style']).indexOf('px');
              let k = (this.update['font_style']).indexOf(':');
              this.select = (this.update['font_style']).substring(k+1,i);
              if((this.update['font_style']).indexOf('bold')!=-1){
                this.fontbShow = true;
              }
              let m = this.update['font_style'].lastIndexOf(":");
              let n = this.update['font_style'].lastIndexOf("!");
              this.color = (this.update['font_style']).substring(m+1,n);
            }
          }
        });
      },
      headleChangeColor(){
      },
      getFontVal(event){
        this.select = event.target.value;
      },
      setFontB(){
        this.fontbShow = !this.fontbShow;
      }
    },
    mounted() {
      if(this.$route.query.mold){
        this.mold = this.$route.query.mold;
      }
      this.getNavList();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.updateId = this.$route.query.id;
        this.getNavDetail();
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-nav {}

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
          width: 100px;
          text-align: right;
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
    
    textarea {
      width:100%;
      border: 1px solid #D2D2D2;
      // border-radius: 5px;
    }
    select {
      width: 40%;
    }

    input, select {
      border: 1px solid #d2d2d2;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
  }
  i{
    font-size: 12px;
    font-style: normal;
  }
  .form-group {
    margin-bottom: 0;
  }
   .font-update{
    display: flex;
    .opt{
      padding-left: 5px;
      width: 75px;
      outline: none;
      border-radius: 2px;
      height: 25px;
    }
    .font-b{
      margin-left: 8px;
      cursor: pointer;
      display: inline-block;
      height: 25px !important;
      width: 25px !important;
      background: #fff;
      background-image: url(../../../../assets/imgs/icons.png);
      background-position: 0 0;
      box-shadow: border-box;
      overflow: hidden;
      border: 1px solid #D2D2D2;
    }
    .on{
      border: 1px solid #DCAC6C;
      background: #FFE69F;
      background-image: url(../../../../assets/imgs/icons.png);
      background-position: 0 0;
    }
    .ft-color{
      cursor: pointer;
      display: inline-block;
      margin-left: 8px;
      width: 25px;
      height: 25px;
      background-image: url(../../../../assets/imgs/icons.png);
      background-position: -720px 1px;
      position: relative;
      border: 1px solid #D2D2D2;
      .ft-bt{
        display: inline-block;
        width: 25px;
        height: 6px;
        position: absolute;
        left: -1px;
        bottom: 0;
      }
    }
  }
  
  /deep/ .m-colorPicker .colorBtn{
    width: 25px!important;
    height: 25px!important;
    background: #ffffff!important;
    opacity: 0.1;
    z-index: 99;
  }
  /deep/ .m-colorPicker{
    z-index: 99;
  }
</style>
