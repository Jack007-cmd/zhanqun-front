<template>
  <div id="dashboard">
    <b-navbar toggleable="lg" type="dark" variant="success"
              style="padding: 0;position: absolute;width: 100%;top: 0;left: 0;">
      <b-container fluid style="padding: 0;">
        <span style="display: inherit;line-height: 50px;">
          <!--<b-navbar-nav>-->
          <!--<b-nav-item-dropdown left>-->
          <!--<template slot="button-content" style="padding-left: 20px;">-->
          <!--<img src="../assets/imgs/th-list.png" height="25"/>-->
          <!--</template>-->
          <!--&lt;!&ndash;class="dropdown-menu show"&ndash;&gt;-->
          <!--<div class="parent-nav">-->
          <!--<li>-->
          <!--<router-link class="dropdown-item" to="/platform-intro">-->
          <!--<i class="nav-ico iconfont icon-home"></i>-->
          <!--<span>首页</span>-->
          <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
          <!--<router-link class="dropdown-item" to="/platform-case">-->
          <!--<i class="nav-ico iconfont icon-anli"></i>-->
          <!--<span>案例</span>-->
          <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
          <!--<router-link class="dropdown-item" to="/platform-help">-->
          <!--<i class="nav-ico iconfont icon-bangzhuzhongxin"></i>-->
          <!--<span>帮助中心</span>-->
          <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
          <!--<router-link class="dropdown-item" to="/platform-about-us">-->
          <!--<i class="nav-ico iconfont icon-cloud-we"></i>-->
          <!--<span>关于我们</span>-->
          <!--</router-link>-->
          <!--</li>-->
          <!--<li  class="li-home" style="display: none;">-->
          <!--<router-link class="dropdown-item" to="/dashboard/home">-->
          <!--<i class="nav-ico iconfont icon-yonghuzhongxin"></i>-->
          <!--<span>用户中心</span>-->
          <!--</router-link>-->
          <!--</li>-->
          <!--<li class="li-group" style="display: none;">-->
          <!--<a class="dropdown-item" @click="toSiteManage" style="cursor: pointer;">-->
          <!--<i class="nav-ico iconfont icon-zhanqunguanlixitong"></i>-->
          <!--<span>站群管理</span>-->
          <!--</a>-->
          <!--</li>-->
          <!--</div>-->

          <!--</b-nav-item-dropdown>-->
          <!--</b-navbar-nav>-->

          <b-navbar-brand href="/platform-intro" style="color: #ffffff;padding: 0;line-height: 67px;">
            <img src="../assets/imgs/platform/logo-ico.png" height="67"/>
          </b-navbar-brand>
        </span>

        <div class="main-nav" style="width: 1200px;">
          <b-navbar-nav style="float: right;">
            <!--<b-nav-item href="/platform-intro">首页</b-nav-item>-->
            <!--<b-nav-item href="/platform-case">案例</b-nav-item>-->
            <!--<b-nav-item href="/platform-help">帮助中心</b-nav-item>-->
            <!--<b-nav-item href="/platform-about-us">关于我们</b-nav-item>-->
            <b-nav-item href="/dashboard/home">用户首页</b-nav-item>
            <b-nav-item href="#" id="group-manage">站群管理</b-nav-item>
            <b-nav-item href="#" id="site-manage" style="display: none;">站点管理</b-nav-item>
            <b-nav-item href="/dashboard/recruit-list">招募令</b-nav-item>
            <div id="group-items" class="items-container">
              <b-container>
                <b-row>
                  <b-col cols="12">
                    <div class="arrow"></div>
                  </b-col>
                </b-row>
                <b-row class="items-con-nav">
                  <b-col cols="12" style="display: block;">
                    <ul class="items-ul">
                      <li class="item" v-for="item in groupList" :key="item.id" @click="toNextGroup(0,item)">
                        {{item.name}}
                      </li>
                    </ul>
                  </b-col>
                </b-row>
              </b-container>
            </div>
            <div id="site-items" class="items-container">
              <b-container>
                <b-row>
                  <b-col cols="12">
                    <div class="arrow site-arrow"></div>
                  </b-col>
                </b-row>
                <b-row class="items-con-nav">
                  <b-col cols="12" style="display: block;">
                    <ul class="items-ul site-items-ul">
                      <li class="item" v-for="item in siteList" :key="item.id" @click="toNextSite(item)">{{item.domain}}
                      </li>
                    </ul>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </b-navbar-nav>
        </div>
        <!-- Right aligned nav items -->
        <b-navbar-nav>

          <span style="line-height: 65px; ">
            <span class="glyphicon glyphicon-bell" @click="showInfo">
            </span>
            <!--<img src="../assets/imgs/chat.png" height="30"/>-->
          </span>

          <b-nav-item-dropdown right id="personal-dropdown">
            <template slot="button-content">
              <img :src="user.avatar" :onerror="errorImg"
                   style="height: 50px;border-radius: 50%;border: 1px solid #cccccc;" width="50" height="50" alt=""/>
            </template>
            <div class="personal-center">
              <li>
                <div>
                  <a class="dropdown-item">
                    <i class="nav-ico iconfont icon-ren"></i>
                    <span class="public-name">{{user.name}}</span>
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <router-link to="/dashboard/site-record" class="dropdown-item">
                    <i class="nav-ico iconfont icon-jilu"></i>
                    <span>建站记录</span>
                  </router-link>
                </div>
              </li>
              <li>
                <div>

                  <router-link to="/dashboard/app-record" class="dropdown-item">
                    <i class="nav-ico iconfont icon-shenqinglan"></i>
                    <span>申请记录</span>
                  </router-link>
                </div>
              </li>
              <li>
                <div>
                <span style="cursor: pointer;" class="dropdown-item" v-b-modal.modal-profile>
                  <i class="nav-ico iconfont icon-gerenziliao"></i>
                  <span>个人资料</span>
                </span>
                </div>
              </li>
              <li>
                <div>
                  <a class="dropdown-item">
                    <i class="nav-ico iconfont icon-mima"></i>
                    <span v-b-modal.modal-reset-pwd>更改密码</span>
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <a class="dropdown-item">
                    <i class="nav-ico iconfont icon-tuichu"></i>
                    <span @click="logout">退出</span>
                  </a>
                </div>
              </li>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!--</b-collapse>-->
      </b-container>
    </b-navbar>

    <b-modal id="modal-profile" size="xs" centered hide-header hide-footer>
      <div class="div-create-group">
        <h4>基本资料</h4>
        <table cellpadding="10">
          <tr>
            <td>昵称:</td>
            <td><input id="site-name" type="text" v-model="user.name"></td>
          </tr>
          <tr>
            <td>头像:</td>
            <td>
              <label class="btn btn-orange" for="uploads"
                     style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;background: #e5e5e5;vertical-align: -webkit-baseline-middle;font-size: 14px;">选择图片</label>
              <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,user)">
              <img :src="user.avatar" alt="" style="width: 50px;height: 50px;">
            </td>
          </tr>
          <tr>
            <td>邮箱:</td>
            <td>
              {{user.email}}
            </td>
          </tr>
          <tr>
            <td>手机号码:</td>
            <td>
              <input type="number" v-model="user.phone" maxlength="11">
            </td>
          </tr>
          <tr>
            <td>上次登录:</td>
            <td>
              <template v-if="user['last_login_at']"> {{user['last_login_at'].substr(0,16)}}</template>

            </td>
          </tr>
        </table>
        <div style="padding-left: 30%;">
          <b-button @click="update">确定</b-button>
          <b-button @click="$bvModal.hide('modal-profile')">取消</b-button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-reset-pwd" size="xs" centered hide-header hide-footer>
      <div class="div-create-group">
        <h4>重置密码</h4>
        <table cellpadding="10">
          <tr>
            <td>原密码:</td>
            <td><input type="password" v-model="resetFrom.old"></td>
          </tr>
          <tr>
            <td>新密码:</td>
            <td>
              <input type="password" v-model="resetFrom.newPwd">
            </td>
          </tr>
          <tr>
            <td>确认新密码:</td>
            <td>
              <input type="password" v-model="resetFrom.confirmPwd">
            </td>
          </tr>
        </table>
        <div style="padding-left: 30%;">
          <b-button @click="updatePwd">确定</b-button>
          <b-button @click="cancel">取消</b-button>
        </div>
      </div>
    </b-modal>

    <div style="padding-top: 69px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import * as http from '../../apis/net'

  export default {
    name: "Dashboard",
    data() {
      return {
        unread_num: 0,
        groupList: [],
        siteList: [],
        user: {},
        img: '',
        imgFile: '',
        tempFile: '',
        resetFrom: {
          old: '',
          newPwd: '',
          confirmPwd: ''
        },
        errorImg: 'this.src="' + require('../assets/imgs/default-avatar.png') + '"'
      }
    },
    watch: {
      '$route': 'parentNavChange',
      isFollow (newVal, oldVal) {
        //do something
        let role = this.$store.getters.role;
        if (role === 1 || role === 99) {
          this.getGroupAllSiteList();
        } else if (role === 0) {
          this.getPrivateAllSiteList();
        }
      },
    },
    computed: {
      isFollow () {
        return this.$store.getters.identify;　　//需要监听的数据
      }
    },
    methods: {
      toSiteManage() {
        let role = Number(this.$store.getters.role);
        if (role === 1 || role === 99) {
          this.$router.push("/dashboard/my-group/site-manage");
        } else if (role === 0) {
          this.$router.push("/dashboard/my-group/private-site-manage");
        }
      },
      parentNavChange() {
        if (location.href.indexOf("home") > -1) {
          $(".li-home").hide();
        } else {
          $(".li-home").show();
        }

        if (location.href.indexOf("site/") > -1) {
          $(".li-group").show();
        } else {
          $(".li-group").hide();
        }

        if (location.href.indexOf("site/") > -1 || location.href.indexOf("my-group/") > -1) {
          $("#site-manage").show();
          $("#group-items").find(".arrow").removeClass("site-arrow");
        } else {
          $("#site-manage").hide();
          $("#group-items").find(".arrow").addClass("site-arrow");
        }
      },
      //更新用户个人信息
      update() {
        if (!this.user.name) {
          this.$toast.success({
            message:"昵称不可为空",
            color:'#3cb5f1'
          });
          return;
        }
        //  提交個人資料
        let _this = this;
        let formData = new FormData();
        formData.append('name', _this.user.name);
        if (_this.tempFile) {
          formData.append('avatar', _this.tempFile);
        }
        if (_this.user.phone) {
          let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (!reg.test(_this.user.phone)) {
            this.$toast.success({
              message:"手机格式不正确",
              color:'#3cb5f1'
            });
            return;
          }
          formData.append('phone', this.user.phone);
        }
        http.updateUserInfo(formData).then(rs => {
          if (!rs.code) {
            this.$bvModal.hide('modal-profile');
            this.$toast.success({
              message:"基本资料修改成功",
              color:'#3cb5f1'
            });
            this.getProfile();
          }
        });
      },
      cancel(){
        this.$bvModal.hide('modal-reset-pwd');
      },
      //重置密码
      updatePwd() {
        if (!this.resetFrom.old) {
          this.$toast.success({
            message:"原密码不能为空",
            color:'#3cb5f1'
          });
          return;
        } else {
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.resetFrom.old)) {
            this.$toast.success({
              message:"原密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        if (!this.resetFrom.newPwd.trim()) {
          this.$toast.success({
            message:"请输入新密码",
            color:'#3cb5f1'
          });
          return;
        } else {
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.resetFrom.newPwd)) {
            this.$toast.success({
              message:"新密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        if (!this.resetFrom.confirmPwd) {
          this.$toast.success({
            message:"确认新密码不能为空",
            color:'#3cb5f1'
          });
          return;
        } else {
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.resetFrom.confirmPwd)) {
            this.$toast.success({
              message:"确认新密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        if (this.resetFrom.newPwd !== this.resetFrom.confirmPwd) {
          this.$toast.success({
            message:"两次输入新密码不一致，请重新输入！",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          old: this.resetFrom.old,
          password: this.resetFrom.newPwd,
          password_confirmation: this.resetFrom.confirmPwd,
        };
        http.updatePwd(body).then(rs => {
          if (!rs.code) {

            this.$bvModal.hide('modal-reset-pwd');
            this.resetFrom = {
              old: '',
              newPwd: '',
              confirmPwd: ''
            };
            this.$toast.success({
              message:"密码重置成功！",
              color:'#3cb5f1'
            });
          }
        });
      },
      //选择图片
      chooseImg(e, num, temp) {
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
            temp.avatar = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);

      },
      logout() {
        if (confirm("确定要退出？")) {
          this.userName = null;
          this.$store.commit("logout");
          this.$router.push('/platform-intro');
        }
      }, showInfo() {
        $(".glyphicon-bell").removeClass("glyphicon-point");
        this.$router.push("/dashboard/info");
      },
      getProfile() {
        http.getProfile().then(res => {
          if (!res.code) {
            this.$store.commit("setProfile", res);
          }
        });
      },
      getUnreadInfoCount() {
        http.getUnreadInfoCount().then(rs => {
          if (!rs.code) {
            this.unread_num = rs.unread_num;
            if (this.unread_num > 0) {
              $(".glyphicon-bell").addClass("glyphicon-point");
            }
          }
        });
      },
      getPrivateGroupList() {
        http.getPrivateGroupList().then(rs => {
          if (!rs.code) {
            this.groupList = rs.data;
          } else {
            this.$toast.success({
              message:rs.msg,
              color:'#3cb5f1'
            });
          }
        });
      },
      toNextGroup(state, item) {
        //群主、管理员进入数据中心
        //成员进入站点管理
        // 角色（0普通成员，1管理员，99群主）
        //state	站群状态（0=正常 1=待审 2=拒绝）
        let des = "";
        if (state === 0) {
          this.$store.commit('setIdentify', item.id);
          this.$store.commit('setRole', item.pivot.role);
          if (item.pivot.role === 0) {
            des = '/dashboard/my-group/private-data-center';
          } else if (item.pivot.role === 1 || item.pivot.role === 99) {
            des = '/dashboard/my-group/data-center';
          }
        }
        if (this.$route.path === des) {
          window.location.reload();
        } else {
          this.$router.push(des);
        }
        $("#group-manage").removeClass("current-item");
        $("#group-items").hide();
        // window.location.reload();
      },
      toNextSite(item) {
        this.$store.commit('setSite', {type: item.type, id: item.id, siteName: item.name, siteDomain: item.domain});
        let destination = '';
        switch (item.type) {
          case 1:
            destination = "/dashboard/site/lottery-basic-info";
            break;
          case 2:
            destination = "/dashboard/site/blog-basic-info";
            break;
          case 3:
            destination = "/dashboard/site/ns-basic-info";
            break;
          case 4:
            destination = "/dashboard/site/nw-basic-info";
            break;
          case 5:
            destination = "/dashboard/site/hk-basic-info";
            break;
          case 6:
            destination = "/dashboard/site/trade-basic-info";
            break;
          case 7:
            destination = "/dashboard/site/leaf-basic-info";
            break;
          case 9:
            destination = "/dashboard/site/cust-basic-info";
            break;
          case 10:
            destination = "/dashboard/site/company-basic-info";
            break;      
          case 11:
            destination = "/dashboard/site/journal-basic-info";
            break;     
          default:
            destination = "/dashboard/site";
        }
        this.$router.push(destination);
        $("#site-manage").removeClass("current-item");
        $("#site-items").hide();
        // window.location.reload();
        // let routeUrl = this.$router.resolve({
        //   path: destination,
        //   // query: {id:96}
        // });
        // window.open(routeUrl.href, '_blank');
      },
      getGroupAllSiteList() {
        http.getGroupAllSiteList().then(rs => {
          if (!rs.code) {
            this.siteList = rs;
          }
        });
      },
      getPrivateAllSiteList() {
        http.getPrivateAllSiteList().then(rs => {
          if (!rs.code) {
            this.siteList = rs;
          }
        });
      }
    },
    mounted() {
      $(".parent-nav li").click(function () {
        $(this).parent().parent().parent().removeClass("show");
        $(this).parent().parent().removeClass("show");
        setTimeout(() => {
          $(this).parent().parent().parent().removeClass("on");
          $(this).parent().parent().parent().find("a").attr("aria-expanded", false);
        }, 500);
      });
      this.user = this.$store.getters.user;
      this.getUnreadInfoCount();
      this.parentNavChange();
      this.getPrivateGroupList();
      let role = this.$store.getters.role;
      if (role === 1 || role === 99) {
        this.getGroupAllSiteList();
      } else if (role === 0) {
        this.getPrivateAllSiteList();
      }
      $("#dashboard").mousemove(function (e) {
        $("#site-manage").removeClass("current-item");
        $("#group-manage").removeClass("current-item");
        $("#site-items").hide();
        $("#group-items").hide();
        if ($.contains($("#group-items")[0], e.target) || $("#group-items")[0] == e.target || $.contains($("#group-manage")[0], e.target) || $("#group-manage")[0] == e.target) {
          $("#group-manage").addClass("current-item");
          $("#group-items").show();
        }
        if ($.contains($("#site-items")[0], e.target) || $("#site-items")[0] == e.target || $.contains($("#site-manage")[0], e.target) || $("#site-manage")[0] == e.target) {
          $("#site-manage").addClass("current-item");
          $("#site-items").show();
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  #dashboard {
    z-index: 999;
    color: #656565;
    /*color: #ffff;*/
  }

  .bg-success {
    background-color: #ffffff !important;
  }

  em {
    font-style: normal;
    /*color: #ffff;*/
    color: #656565;
  }

  .main-nav {
    .navbar-nav {
      .nav-item {
        padding: 0 25px;
        height: 69px;
        line-height: 55px;

        a {
          color: #333333;
        }
      }

      .nav-item:hover {
        background: #333333;

        a {
          color: #ffffff !important;
        }
      }

      .current-item {
        background: #333333;

        a {
          color: #ffffff !important;
        }
      }
    }
  }

  .glyphicon-bell {
    /*color: #ffff;*/
    color: #656565;
    margin-right: 20px;
  }

  .glyphicon-th-list:before {
    content: "\e012";
    color: #656565;
    width: 30px;
    height: 30px;
  }

  .glyphicon-bell:before {
    content: "\e123"
  }

  .glyphicon-point:after {
    content: "●";
    color: red;
    top: -9px;
    position: absolute;
    left: 9px;
  }

  #modal-profile {
    h4 {
      text-align: center;
    }

    table {
      margin: 0 auto;

      tr {
        td:first-child {
          text-align: right;
        }

        td:last-child {
          text-align: left;
          font-size: 14px
        }
      }
    }

    button {
      display: inline-block;
      margin: 10px;
      background: #2a94de;
      border: none;
      width: 80px;
    }
  }

  #modal-reset-pwd {
    h4 {
      text-align: center;
    }

    table {
      margin: 0 auto;

      tr {
        td:first-child {
          text-align: right;
        }
      }
    }

    button {
      display: inline-block;
      margin: 10px;
      background: #2a94de;
      border: none;
      width: 80px;
    }
  }

  .parent-nav {
    position: absolute;
    width: 221px;
    margin-top: -10px;
    border-radius: 0;
    background: #ffffff;
    height: calc(100vh - 70px);
    z-index: 100;

    li {
      height: 44px;
      line-height: 44px;
      background: #eeeeee;
      border-bottom: 1px solid #dcdcdc;

      .dropdown-item {
        font-size: 14px;
        color: #555555;
        padding: 0;
        padding-left: 50px;

        .nav-ico {
          font-size: 26px;
          width: 26px;
          height: 26px;
        }

        span {
          padding-left: 10px;
        }
      }

      .dropdown-item:hover {
        background: #2a94de;
        color: #ffffff;
      }
    }
  }

  .personal-center {
    position: absolute;
    right: 0;
    width: 169px;
    padding: 0 14px 3px;
    margin-top: -11px;
    border-radius: 0;
    background: #ffffff;
    z-index: 9;
    box-shadow: 5px -4px 5px #b3b3b3;

    li {
      height: 36px;
      line-height: 36px;

      div {
        border-bottom: 1px solid;
        border-image: linear-gradient(to right, #ffffff, #dcdcdc, #ffffff) 1 10;

        .dropdown-item {
          font-size: 14px;
          color: #555555;
          padding: 0;

          .nav-ico {
            font-size: 18px;
            margin-left: 17px;
          }

          span {
            padding-left: 22px;
          }
        }
      }
    }
  }

  #personal-dropdown {
    ul {
      li {
        a {
          cursor: pointer;
        }
      }
    }
  }
  .items-container {
    display: none;
    position: absolute;
    width: 100%;
    padding-bottom: 10px;
    min-height: 95px;
    background: #e5e5e5;
    top: 69px;
    z-index: 101;
    left: 0;

    .container {
      max-width: 1200px;
      .items-con-nav::-webkit-scrollbar {
          display: none;
      }
      .items-con-nav{
        max-height: 500px;
        overflow-y: scroll;
      }
      .site-arrow {
        right: 150px !important;
      }

      .arrow {
        position: absolute;
        display: block !important;
        width: .8rem;
        height: .4rem;
        right: 280px;
      }

      .arrow:before {
        box-sizing: border-box;
        border-width: 10px 5px 5px 5px;
        border-color: #333333 transparent transparent transparent;
        position: absolute;
        content: "";
        border-style: solid;
        color: transparent;
      }

      .site-items-ul {
        padding-right: 0 !important;
      }

      .items-ul {
        margin-top: 7px;
        /*height: 390px;*/
        /*column-count: 4; //多列的列数*/
        /*column-gap: 40px; //列间距*/
        float: right;
        /*padding-right: 130px;*/
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: wrap-reverse;
        justify-content: flex-start;
        align-items: flex-end;
        align-content: flex-start;

        .item {
          break-inside: avoid; //避免在主体框中插入任何中断（页面，列或区域）。
          cursor: pointer;
          text-align: left;
          width: 252px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          /*margin-left: 40px;*/
          line-height: 39px;
          font-size: 14px;
          color: #555555;
        }
      }
    }
  }

  /*/deep/ .navbar-nav .nav-item {*/
  /*padding: 0 0 0 20px !important;*/
  /*}*/
</style>
