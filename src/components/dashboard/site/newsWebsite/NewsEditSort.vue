<template>
  <div id="edit-sort">
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
              <td>栏目名称<span style="color:red;">*</span></td>
              <td>
                <treeselect v-model="platform['category_id']" style="width: 25%;" :multiple="false" :options="options"/>
              </td>
            </tr>
            <tr>
              <td>平台名称<span style="color:red;">*</span></td>
              <td>
                <input type="text" style="width:95%" v-model="platform.name">
              </td>
            </tr>
            <tr>
              <td>平台logo</td>
              <td>
                <label class="btn btn-orange" for="platform_logo"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="platform_logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,platform,'logo')">
                <img v-lazy="platform['logo_img']" :key="platform.logo_img" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>平台评分</td>
              <td>
                <input type="text" v-model="platform.score">分
              </td>
            </tr>
            <tr>
              <td>站点<span style="color:red;">*</span></td>
              <td>
                <template v-for="(item,index) in platform.urls">
                  <input type="text" v-model="item['links_name']">
                  <input type="text" style="width:68%" v-model="item['links_url']">
                  <span v-if="index>0" @click="minus(platform.urls,index)">-</span>
                  <span v-if="index===0" @click="plus(platform)">+</span>
                  <br v-if="platform.urls.length!==index+1">
                </template>
              </td>
            </tr>
            <tr>
              <td>图标</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,platform,'icon')">
                <img v-lazy="platform['icon_img']" :key="platform['icon_img']" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>图标位置</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="platform['icon_seat']"
                    :options="positionOptions"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <!--<tr>-->
            <!--<td>下拉框颜色:</td>-->
            <!--<td><input type="text"></td>-->
            <!--</tr>-->
            <tr>
              <td>站长推荐</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="platform['is_recommend']"
                    :options="recommendOptions"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <tr>
              <td>排序</td>
              <td><input type="text" v-model="platform.sort"></td>
            </tr>
            <tr>
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
          </table>
          <div style="padding-left: 15%;">
            <b-button @click="createPlatform">保存</b-button>
            <b-button @click="back">返回</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>栏目名称<span style="color:red;">*</span></td>
              <td>
                <treeselect v-model="update['category_id']" style="width: 25%;" :multiple="false" :options="options"/>
              </td>
            </tr>
            <tr>
              <td>平台名称<span style="color:red;">*</span></td>
              <td>
                <input type="text" style="width:95%" v-model="update.name">
              </td>
            </tr>
            <tr>
              <td>平台logo</td>
              <td>
                <label class="btn btn-orange" for="upload_logo"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload_logo" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,update,'logo')">
                <img v-lazy="update['logo_img']" :key="update.logo_img" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>平台评分</td>
              <td>
                <input type="text" v-model="update.score">分
              </td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">站点<span style="color:red;">*</span></td>
              <td>
                <span v-for="(item,index) in update.urls" class="url-row" style="margin-bottom: 10px;display: block;">
                  <input type="text" v-model="item['links_name']">
                  <input type="text" style="width:60%" v-model="item['links_url']">
                  <span v-if="index>0" @click="minus(update.urls,index)">-</span>
                  <span v-if="index===0" @click="plus(update)">+</span>
                  <span class="test-fail" style="display:none;color: red;font-size:14px;">【无法访问】</span>
                  <br v-if="update.urls.length!==index+1">
                </span>
              </td>
            </tr>
            <tr>
              <td>图标</td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg"
                       @change="chooseImg($event, 1,update,'icon')">
                <img v-lazy="update['icon_img']" :key="update['icon_img']" alt=""
                     style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>图标位置</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="update['icon_seat']"
                    :options="positionOptions"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <!--<tr>-->
            <!--<td>下拉框颜色:</td>-->
            <!--<td><input type="text"></td>-->
            <!--</tr>-->
            <tr>
              <td>站长推荐</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="update['is_recommend']"
                    :options="recommendOptions"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <tr>
              <td>排序</td>
              <td><input type="text" v-model="update.sort"></td>
            </tr>
            <tr>
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
          </table>
          <div style="padding-left: 15%;">
            <b-button @click="updatePlatform">保存</b-button>
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
  import Vue from 'vue'

  export default {
    name: "EditWebsite",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        plate: 'a',
        positionOptions: [
          {text: '左', value: 0},
          {text: '右', value: 1},
        ],
        recommendOptions: [
          {text: '是', value: 1},
          {text: '否', value: 0},
        ],
        options: [{id: '', label: '请选择栏目'}],
        imgFile: '',
        platform: {
          category_id: '',
          name: '',
          urls: [{"links_url": "", "links_name": ""}],
          logo: '',
          icon: '',
          icon_img: '',
          logo_img: '',
          icon_seat: 0,
          is_recommend: 1,
          score: '0.0',
          sort: 0,
          state: 0,
          font_style:''
        },
        update: {
          id: '',
          category_id: '',
          name: '',
          urls: [{"links_url": "", "links_name": ""}],
          logo: '',
          icon: '',
          icon_img: '',
          logo_img: '',
          icon_seat: 0,
          is_recommend: 1,
          score: '',
          sort: 0,
          state: 0,
          font_style:''
        },
        color:'#4453D4',
        fontbShow:false,
        select: 16,
      }
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      createPlatform() {
        let reg = /((https|http|ftp|rtsp|igmp|file|rtspt|rtspu):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?/;
        for (let i = 0; i < this.platform['urls'].length; i++) {
          if (!reg.test(this.platform['urls'][i]["links_url"])) {
            this.$toast.success({
              message: "站点链接格式错误！",
              color: '#3cb5f1'
            });
            return;
          }
        }
        let bold = this.fontbShow==false?'normal':'bold';
        let font_style = 'font-size:'+this.select+'px;'+ 'font-weight:'+bold+';color:'+this.color+';';
        let formData = new FormData();
        formData.append("name", this.platform['name']);
        formData.append("category_id", this.platform['category_id']);
        formData.append("font_style", font_style);
        for (let i = 0; i < this.platform['urls'].length; i++) {
          Object.keys(this.platform['urls'][i]).forEach(v => {
            formData.append("urls[" + i + "][" + v + "]", this.platform['urls'][i][v]);
          });
        }
        if (this.platform['logo']) {
          formData.append("logo", this.platform['logo']);
        }
        if (this.platform['icon']) {
          formData.append("icon", this.platform['icon']);
        }
        // formData.append("icon",this.platform['icon']);
        formData.append("icon_seat", this.platform['icon_seat']);
        formData.append("sort", this.platform['sort']);
        formData.append("is_recommend", this.platform['is_recommend']);
        formData.append("score", this.platform['score']);
        http.createPlatform(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
            this.back();
          }
        });
      },
      plus(temp) {
        temp.urls.push({links_name: '', links_url: ''});
      },
      minus(temp, index) {
        Vue.delete(temp, index);
      },
      updatePlatform() {
        let reg = /((https|http|ftp|rtsp|igmp|file|rtspt|rtspu):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?/;
        for (let i = 0; i < this.update['urls'].length; i++) {
          if (!reg.test(this.update['urls'][i]["links_url"])) {
            this.$toast.success({
              message: "站点链接格式错误！",
              color: '#3cb5f1'
            });
            return;
          }
        }
        let bold = this.fontbShow==false?'normal':'bold';
        let font_style = 'font-size:'+this.select+'px;'+ 'font-weight:'+bold+';color:'+this.color+';';
        let formData = new FormData();
        formData.append("id", this.update['id']);
        formData.append("name", this.update['name']);
        formData.append("category_id", this.update['category_id']);
        formData.append("font_style", font_style);
        for (let i = 0; i < this.update['urls'].length; i++) {
          Object.keys(this.update['urls'][i]).forEach(v => {
            formData.append("urls[" + i + "][" + v + "]", this.update['urls'][i][v]);
          });
        }
        if (this.update['logo']) {
          formData.append("logo", this.update['logo']);
        }
        if (this.update['icon']) {
          formData.append("icon", this.update['icon']);
        }
        // formData.append("logo", this.update['logo']);
        // formData.append("icon", this.update['icon']);
        formData.append("icon_seat", this.update['icon_seat']);
        formData.append("sort", this.update['sort']);
        formData.append("is_recommend", this.update['is_recommend']);
        formData.append("score", this.update['score']);
        http.updatePlatform(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
            this.back();
          }
        });
      },
      getPlatformDetail(id) {
        http.getPlatformDetail({id: id}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['icon_img'] = rs['icon'];
            temp['logo_img'] = rs['logo'];
            temp['icon'] = '';
            temp['logo'] = '';
            temp['urls'] = JSON.parse(rs.urls);
            this.update = temp;
            if(this.update['font_style']){
              let i = (this.update['font_style']).indexOf('px');
              let k = (this.update['font_style']).indexOf(':');
              this.select = (this.update['font_style']).substring(k+1,i);
              if((this.update['font_style']).indexOf('bold')!=-1){
                this.fontbShow = true;
              }
              let m = this.update['font_style'].lastIndexOf(":");
              let n = this.update['font_style'].lastIndexOf(";");
              this.color = (this.update['font_style']).substring(m+1,n);
            }
            this.testLink();
          }
        });
      },
      testLink() {
        this.update.urls.forEach((val, i) => {
          $.ajax({
            type: 'get',
            url: val['links_url'],
            cache: false,
            dataType: "jsonp", //跨域采用jsonp方式
            processData: false,
            timeout: 5000, //超时时间，毫秒
            complete: function (data) {
              if (data.status === 200) {
              } else {
                $(".url-row").eq(i).find(".test-fail").show();
              }
            }
          });
        });
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
            temp[column + '_img'] = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);
      },
      getPlatformCategory() {
        http.getPlatformCategoryAll().then(rs => {
          if (!rs.code) {
            rs.forEach(t1 => {
              if (t1['parent_id'] === 0) {
                this.options.push({id: t1.id, label: t1.name});
              }
            });
            rs.forEach(a => {
              this.options.forEach((b) => {
                if (b.id === a['parent_id']) {
                  if (!b.children) {
                    b.children = [];
                  }
                  b.children.push({id: a.id, label: a.name});
                }
              });
            });
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
      this.getPlatformCategory();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getPlatformDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-sort {}

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
          width: 110px;
          text-align: right;
          font-size: 16px;
        }

        td:last-child {
          font-size: 14px;
          text-align: left;
        }
      }
    }

    input {
      /*width: 100%;*/
      font-size: 14px;
    }

    select {
      margin-right: 20px;
      width: 40%;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }

    span {
      cursor: pointer;
      font-size: 20px;
    }
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
