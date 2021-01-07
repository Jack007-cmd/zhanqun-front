<template>
  <div id='group-config'>
    <b-container fluid>
      <!--<b-row>-->
      <b-row style="margin: 0;">
        <b-col class="item-title config-switch" cols="12">
          <span class="title" :class="{on:showPlate==='a'}" @click="showPlate='a'">基本信息</span>
          <span class="title" :class="{on:showPlate==='b'}" @click="showPlate='b'">规则配置</span>
          <span class="title" :class="{on:showPlate==='c'}" @click="showPlate='c'">招募</span>
          <span class="title" :class="{on:showPlate==='d'}" @click="showPlate='d'">公告</span>
        </b-col>
      </b-row>

      <b-row v-if="showPlate==='a'">
        <b-col style="margin: 25px 0;" cols="11">
          <b-row>
            <b-col cols="11" class="base-info">
              <table cellpadding="10">
                <tr>
                  <td>站群名称：</td>
                  <td><input type="text" v-model="baseInfo.name"></td>
                </tr>
                <tr>
                  <td>站群标识：</td>
                  <td>{{baseInfo.identify}}</td>
                </tr>
                <tr>
                  <td>招募链接：</td>
                  <td>{{recruit_url}}</td>
                </tr>
                <tr>
                  <td>站群logo：</td>
                  <td><label class="btn btn-orange" for="uploads"
                             style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">选择图片</label>
                    <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                           accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1)">
                    <img v-lazy="baseInfo.logo" :key="baseInfo.logo" alt="" style="width: 50px;height: 50px;"></td>
                </tr>
                <tr>
                  <td style="vertical-align: baseline;">站群描述：</td>
                  <td><textarea name="group-desc" id="group-desc" cols="30" rows="10" style="background: #ffffff;"
                                v-model="baseInfo.description"></textarea></td>
                </tr>
              </table>
              <b-button @click="updateGroupBaseInfo">保存</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="showPlate==='b'">
        <b-col class="mtb40 rule-config" cols="11">
          <b-row>
            <b-col cols="4">基本信息</b-col>
            <b-col cols="4">规则说明</b-col>
            <b-col cols="4">状态</b-col>
          </b-row>
          <b-row>
            <b-col cols="4">用户建站</b-col>
            <b-col cols="4">限制用户建站数量</b-col>
            <b-col cols="4"><input type="number" min="0" style="width: 65px;height: 30px;text-align: center;border-radius: 5px;border: 1px solid #bfbfbf;" v-model="rules['max_site_create']">
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">用户建站</b-col>
            <b-col cols="4">用户建站是否需审核</b-col>
            <b-col cols="4">
              <span  @mouseover="getCurrentItem('is_site_audit')">
                <switchc v-model="temp[rules['is_site_audit']]" text="on|off" @change="getData"></switchc>
               </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">用户搜索</b-col>
            <b-col cols="4">是否可见</b-col>
            <b-col cols="4">
              <span  @mouseover="getCurrentItem('is_search')">
                   <switchc v-model="temp[rules['is_search']]" text="on|off" @change="getData"></switchc>
               </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">用户加群</b-col>
            <b-col cols="4">用户进群是否需审核</b-col>
            <b-col cols="4">
              <span  @mouseover="getCurrentItem('is_join_audit')">
                <switchc v-model="temp[rules['is_join_audit']]" text="on|off" @change="getData"></switchc>
               </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="11" style="margin: 0 auto 30px;">

          <b-button class="btn-save-rule" @click="updateGroupRule">保存</b-button>
        </b-col>

      </b-row>

      <b-row v-if="showPlate==='c'">
        <b-col style="margin: 25px 0;" cols="11">
          <b-row>
            <b-col cols="11" class="recruitment-order">
              <table cellpadding="5">
                <tr>
                  <td>招募链接：</td>
                  <td>{{recruit_url}}</td>
                </tr>
                <tr>
                  <td style="vertical-align: baseline;">招募文案：</td>
                  <td><textarea name="recruitment" id="recruitment" cols="30" rows="10" v-model="recruit.content"
                                placeholder="XX站群发起招募啦，诚邀志同道合的朋友一起加入我们的站群：邀请链接：https://www.baidu.com/"></textarea></td>
                </tr>
                <tr>
                  <td>有效期：</td>
                  <td><span>当前时间——<input id="endTime" type="datetime-local" name="" v-model="recruit.endTime"> </span>
                    <span style="float: right;">100字以内</span></td>
                </tr>
              </table>
              <b-button class="btn-publish" @click="updateGroupRecruit">发布</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row v-if="showPlate==='d'">
        <b-col class="mtb40 " cols="12" style="margin-top: 25px;">
          <b-row>
            <b-col cols="12" style="padding: 0 30px;">
              <textarea name="bulletin" cols="30" rows="8" v-model="annunciateDetail"
                        style="background: #ffffff;display: block;width: 100%;"></textarea>
              <br>
              <b-button class="btn-publish-bulletin" style="display: block;margin: 0 auto;" @click="updateAnnunciate">发布</b-button>
            </b-col>
          </b-row>
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
  import SwitchComponent from '../../common/SwitchComponent'
  export default {
    name: "StationGroupConfig",
    components: {
      'switchc': SwitchComponent
    },
    data() {
      return {
        temp:[1,0],
        recruit_url:'',
        currentItem:'',
        baseInfo: {
          name: '',
          identify: '',
          logo: '',
          description: ''
        },
        rules: {},
        showPlate: 'a',
        options: [
          {text: 'on', value: '1'},
          {text: 'off', value: '0'},
        ],
        max_site_create: 0,
        recruit: {
          content: '',
          endTime: null
        },
        imgFile: '',
        fileName: '',  //本机文件地址
        tempFile: '',
        annunciateDetail: ''

      }
    },
    watch: {},
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getCurrentItem(item){
        this.currentItem = item;
      },
      getData(data){
        this.rules[this.currentItem] = this.temp[data];
      },
      //选择图片
      chooseImg(e, num) {
        var _this = this;
        //上传图片
        _this.tempFile = e.target.files[0];
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
            _this.baseInfo.logo = data;
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);

      },
      //取站群基本信息
      getGroupBaseInfo() {
        http.getGroupBaseInfo().then(rs => {
          if (!rs.code) {

            this.baseInfo = rs;
          }
        });
      },

      //站群基本信息更新
      updateGroupBaseInfo() {
        if (!this.baseInfo.name.trim()) {
          this.$toast.success({
            message:"请输入站群名称",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.baseInfo.description.trim()) {
          this.$toast.success({
            message:"请输入站群描述",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append('name', this.baseInfo.name);
        formData.append('description', this.baseInfo.description);
        if (this.tempFile) {
          formData.append('logo', this.tempFile);
        }
        http.updateGroupBaseInfo(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message:"保存成功!",
              color:'#3cb5f1'
            });
          }
        });
      },

      //获取站群规则配置信息
      getGroupRule() {
        http.getGroupRule().then(rs => {
          if (!rs.code) {
            this.rules = rs;
            this.max_site_create = rs['max_site_create'];

          }
        });
      },
      //更新站群规则
      updateGroupRule() {
        if (!this.rules['max_site_create']) {
          this.$toast.success({
            message:"请输入限制用户建站数量",
            color:'#3cb5f1'
          });
          return;
        }
        http.updataGroupRule(this.rules).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message:"保存成功!",
              color:'#3cb5f1'
            });
          }
        });
      },
      //获取公告内容
      getAnnunciateDetail() {
        http.getAnnunciateDetail().then(rs => {
          if (!rs.code) {
            this.annunciateDetail = rs.content;
          }
        });
      },
      //发布/更新公告内容
      updateAnnunciate() {
        let body = {
          content: this.annunciateDetail
        };
        http.updateAnnunciate(body).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message:"发布成功!",
              color:'#3cb5f1'
            });
          }
        });
      },
      //获取站群招募令信息
      getGroupRecruit() {
        http.getGroupRecruit().then(rs => {
          if (!rs.code) {
            this.recruit.content = rs['content'];
            this.recruit.endTime = rs['end_at'].replace(/\s+/g, "T");

          }
        });
      },
      // 更新站群招募令信息
      updateGroupRecruit() {
        if (!this.recruit.content.trim()) {
          this.$toast.success({
            message:"请输入招募令内容",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          content: this.recruit.content,
          end_at: this.recruit.endTime.replace('T', ' ')
        };
        http.updateGroupRecruit(body).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message:"发布成功！",
              color:'#3cb5f1'
            });
          }
        });
      },

    },
    mounted() {
      this.recruit_url =  "http://"+document.domain+"/dashboard/recruit-detail?id="+this.$store.getters.identify;
      this.getGroupBaseInfo();
      this.getGroupRule();
      this.getGroupRecruit();
      this.getAnnunciateDetail();
    }
  }
</script>

<style lang="scss" scoped>
  #group-config {
    padding: 25px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    padding-top: 25px;
    background: #ffffff;
    border-radius: 10px;
  }

  .item-title {
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #bfbfbf;

    .thick-line {
      height: 100%;
      border: 4px solid #1183bf;
      bottom: 2px;
      position: absolute;
    }

    .thin-line {
      height: 100%;
      border-left: 2px solid #1183bf;
      bottom: 2px;
      left: 10px;
      position: absolute;
    }

    .title {
      padding: 0 20px;
      font-size: 16px;
      cursor: pointer;
    }

    .title.on {
      padding-bottom: 8.5px;
      border-bottom: 1px solid #3cb5f1;
    }
  }

  .mtb40 {
    margin: 40px auto;
  }

  .config-switch {
    /*border-bottom: 2px solid #3cb5f1;*/

    div {
      line-height: 50px;
      background: #dcdcdc;
      border-right: 1px solid #e9e9e9;
      /*border: 1px solid #d2d2d2;*/
    }

    div:last-child {
      border-right: none;
    }

    div.on, div:hover {
      color: #ffff;
      background: #3cb5f1;
    }
  }

  .base-info {

    table {
      width: 90%;

      tr {
        td:first-child {
          width: 120px;
          text-align: right;
        }

        td:last-child {
          font-size: 14px;
          text-align: left;
        }
      }
    }

    textarea {
      background: #eeeeee;
      width: 100%;
    }

    button {
      width: 80px;
      text-align: center;
      background: #2a94de;
      border: none;
    }
  }

  .rule-config {
    border-top: 1px solid #b1b1b1;
    border-left: 1px solid #b1b1b1;

    .row {
      .col-4 {
        line-height: 45px;
        border-right: 1px solid #b1b1b1;
        border-bottom: 1px solid #b1b1b1;
      }
    }

    .row:nth-child(odd) {
      background: #e5e5e5;
    }
  }

  .btn-save-rule {
    margin-top: 20px;
    width: 80px;
    text-align: center;
    background: #2a94de;
    border: none;
  }

  .form-group {
    margin-bottom: 0;

    div {
      height: 32px;
      /*.btn{*/
      /*padding: 4px 8px;*/
      /*}*/
    }
  }

  .recruitment-order {
    table {
      width: 100%;

      tr {
        td:first-child {
          width: 120px;
          text-align: right;
        }

        td:last-child {
          font-size: 14px;
          text-align: left;
        }
      }
    }

    textarea {
      padding: 10px;
      width: 100%;
      height: 130px;
      background: #ffffff;
    }

    input {
      border: 1px solid #dcdcdc;
    }
  }

  .btn-publish {
    margin: 50px auto 20px;
  }

  .btn-publish, .btn-publish-bulletin {
    background: #2a94de;
    width: 100px;
    line-height: 25px;
    display: block;
    border: none;
  }
</style>
