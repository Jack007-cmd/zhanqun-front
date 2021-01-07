<template>
  <div id="platform-intro">
    <div class="intro-first">
      <b-container>
        <b-row>
          <b-col cols="3" style="padding-top: 15px;text-align: left;padding-left: 0;"><img src="../../assets/imgs/platform/logo.png"/></b-col>
          <b-col cols="6" offset="3">
            <div style="display: inline-block;">
              <ul class="item-list">
                <li>
                  <router-link to="/platform-intro"> 首页</router-link>
                </li>
                <li>
                  <router-link to="/platform-case"> 案例</router-link>
                </li>
                <li>
                  <router-link to="/platform-help"> 帮助</router-link>
                </li>
                <li>
                  <router-link to="/platform-about-us"> 关于我们</router-link>
                </li>
                <li v-if="user">
                  <router-link to="/dashboard/home"> 用户中心</router-link>
                </li>
              </ul>
            </div>
            <template v-if="user">
              <img :src="user.avatar" :onerror="errorImg" @click="showUl"
                   style="height: 50px;border-radius: 50%;border: 1px solid #cccccc;margin-right: 5px;" width="50"
                   alt=""/>
              <ul tabindex="-1" class="dropdown-menu dropdown-menu-right" id="person-ul" @blur="hideUl">
                <div class="personal-center">
                  <li>
                    <div>
                      <a class="dropdown-item">
                        <i class="nav-ico iconfont icon-ren"></i>
                        <span  class="public-name">{{user.name}}</span>
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
              </ul>
            </template>
          </b-col>
        </b-row>
        <b-row style="height: 701px;">
          <b-col cols="5">
            <div class="platform-desc">
              以群组为单位，每个用户都可以创建或加入一个或多个群组。每一个群组均可自由建站，不收取任何费用、不限制建站数量，建站流程简单快捷，无需懂技术代码，快捷生成网站。作为群主，可以管理站群中所有站点和成员，成员对自己名下的站点负责，
              明确分工，确保站群和站点良性发展。
            </div>
            <div class="intro-btns">
              <b-button @click="toGroup" class="current-btn"  @mouseover="over($event)">免费建群</b-button>
              <b-button @click="toCase" @mouseover="over($event)">案例</b-button>
            </div>
          </b-col>
          <b-col cols="5" offset="2" v-if="!user">
            <div class="login-form" v-if="showForm==='a'">
              <div class="form-logo"><img src="../../assets/imgs/platform/logo-ico.png"/></div>
              <b-form>
                <b-form-group>
                  <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  <b-form-input
                    v-model="loginForm.email"
                    required
                    placeholder="邮箱"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                  <b-form-input
                    v-model="loginForm.pwd"
                    required
                    type="password"
                    placeholder="密码"
                  ></b-form-input>
                </b-form-group>
                <div class="mt-3 reset ">
                  <span @click="showForm='b'">忘记密码?</span>
                </div>
                <b-button class="submit" @click="toLogin">登录</b-button>
                <div class="mt-3 register ">
                  <span @click="showForm='c'">注册账号</span>
                </div>
              </b-form>
            </div>
            <div class="reset-form" v-if="showForm==='b'">
              <div class="form-logo"><img src="../../assets/imgs/platform/logo-ico.png"/></div>
              <b-form>
                <b-form-group>
                  <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  <b-form-input
                    v-model="resetForm.email"
                    required
                    placeholder="邮箱"
                  ></b-form-input>
                </b-form-group>
                <b-button class="submit" style="margin-top: 50px;" @click="toReset">发送验证邮件</b-button>
                <div class="mt-3 register ">
                  <span @click="showForm='a'">想起来了>></span>
                </div>
              </b-form>
            </div>
            <div class="register-form" v-if="showForm==='c'">
              <div class="form-logo"><img src="../../assets/imgs/platform/logo-ico.png"/></div>
              <b-form>
                <b-form-group id="input-group-2" label="" label-for="input-2">
                  <span class="glyphicon glyphicon-user form-control-feedback"></span>
                  <b-form-input
                    id="input-2"
                    v-model="registerForm.nickName"
                    required
                    placeholder="昵称"
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  <b-form-input
                    v-model="registerForm.email"
                    required
                    placeholder="邮箱"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                  <b-form-input
                    v-model="registerForm.pwd"
                    required
                    type="password"
                    placeholder="用户密码:6-18位字母、数字组合"
                  ></b-form-input>
                </b-form-group>
                <b-button class="submit" style="margin-top: 30px;" @click="toRegister">注册</b-button>
                <div class="mt-3 register ">
                  <span @click="showForm='a'">已有账号？登录到平台</span>
                </div>
              </b-form>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" style="color:#ffffff;margin-top: 155px;text-align: left;">
            <div style="display: inline-block;margin-right: 20px">
              <div class=" arrow-box">
                <b class="bottom"><i class="bottom-arrow1" style=" border-top: 10px #919191 solid!important;"></i><i
                  class="bottom-arrow2"></i></b>
              </div>
              <div class="arrow-box">
                <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
              </div>
            </div>
          </b-col>
        </b-row>

      </b-container>
    </div>
    <div class="intro-second">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">我们的优势</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="odds-item">
            <span class="intro-ico ico-1"></span>
            <h4>免费建站</h4>
            <h6>免费使用，体验不同风格模板</h6>
          </b-col>
          <b-col cols="4" class="odds-item">
            <span class="intro-ico ico-2"></span>
            <h4>一键建站</h4>
            <h6>只需一键，就可建立自己的专属网站</h6>
          </b-col>
          <b-col cols="4" class="odds-item">
            <span class="intro-ico ico-3"></span>
            <h4>不限数量</h4>
            <h6>免费建站，且不限制建站数量</h6>
          </b-col>
          <b-col cols="4" class="odds-item">
            <span class="intro-ico ico-4"></span>
            <h4>网站合二为一</h4>
            <h6>响应式，PC端+手机端</h6>
          </b-col>
          <b-col cols="4" class="odds-item">
            <span class="intro-ico ico-5"></span>
            <h4>群组管理</h4>
            <h6>团队管理，能有序且高效维护站群</h6>
          </b-col>
          <b-col cols="4" class="odds-item">
            <span class="intro-ico ico-6"></span>
            <h4>维护便利</h4>
            <h6>无需等待，自己可即时修改网站内容</h6>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="intro-third">
      <b-container class="intro-sprit">
        <b-row>
          <b-col cols="12">
            <div class=" bs-1">
              <a><span class="btn-span" id="btn-1">登录/注册</span>
                <div class="my-tooltip notice-1">
                  <div class="arrow"></div>
                  <div class="my-tooltip-inner ">建站前提醒:必须先登录，若无账号，需注册</div>
                </div>
              </a>
            </div>
            <div class=" bs-2">
              <a><span class="btn-span">申请加群</span>
                <div class="my-tooltip notice-2">
                  <div class="re-arrow"></div>
                  <div class="my-tooltip-inner  ">若您想拥有自己的站群，请点击“创建站群”，完善您的站群资料，创建建群申请。</div>
                </div>
              </a>
            </div>
            <div class=" bs-3">
              <a> <span class="btn-span">创建站群</span>
                <div class="my-tooltip notice-3">
                  <div class="arrow"></div>
                  <div class="my-tooltip-inner  ">若您想加入自己心仪的站群，您可以通过精确搜索或招募令，找到心仪站群，然后点击“加入”。</div>
                </div>
              </a>
            </div>
            <div class=" bs-4">
              <a><span class="btn-span bs-4">进入站群</span>
                <div class="my-tooltip notice-4">
                  <div class="re-arrow"></div>
                  <div class="my-tooltip-inner  ">当您拥有了自己的站群，您可以点击站群，进入相应站群，查看站群具体信息。</div>
                </div>
              </a>
            </div>
            <div class=" bs-5">
              <a><span class="btn-span">创建网站</span>
                <div class="my-tooltip notice-5">
                  <div class="re-arrow"></div>
                  <div class="my-tooltip-inner  ">点击“创建网站”，输入网站名称、域名等，点击发布网站。</div>
                </div>
              </a>
            </div>
            <div class=" bs-6">
              <a><span class="btn-span">域名解析</span>
                <div class="my-tooltip notice-6">
                  <div class="re-arrow"></div>
                  <div class="my-tooltip-inner  ">网站发布之后，还需解析域名。根据系统提供的域名或IP，把网站解析到对应的域名或IP。</div>
                </div>
              </a>
            </div>
            <div class=" bs-7">
              <a><span class="btn-span">建站完成</span>
                <div class="my-tooltip notice-7">
                  <div class="re-arrow"></div>
                  <div class="my-tooltip-inner  ">网站创建完成啦！</div>
                </div>
              </a>
            </div>
          </b-col>
        </b-row>
      </b-container>

    </div>
    <div class="intro-fourth">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">我们能解决什么问题</h1>
            <h6 class="sub-title">让您不花一分钱，就能轻松建立多个站群，实现团队协作，快捷建站、个性化管理等功能。</h6>
          </b-col>
        </b-row>
        <b-row style="margin-top: 70px;">
          <b-col cols="6">
            <div class="media-item">
              <h4>
                <span class="iconfont icon-tuandui"></span>
                <span class="t-title">不再为团队管理发愁</span>
              </h4>
              <p>
                使用e速站，您可以创建或加入多个站群。根据在站群中的角色，您担负起不同的责任，完成不同的任务。架起站群与站点之间的桥梁。实现团队的良性长久发展。
              </p>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="media-item">
              <h4>
                <span class="iconfont icon-caidan"></span>
                <span class="t-title">轻松建立多个网站</span>
              </h4>
              <p>
                通过站群，您可以轻而易举的建立多个网站。无需任何技术，操作简单快捷。每个网站，我们都会提供域名解析的IP地址或域名。您只需解析就好。
              </p>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="media-item">
              <h4>
                <span class="iconfont icon-shangwanghangweiguanliduoyanghuaguanli" style="font-size: 45px;"></span>
                <span class="t-title">拒绝刻板、单一</span>
              </h4>
              <p>
                通过站群，您可以灵活选择是否使用我们提供的网站内容，还是自主创建网站内容，也可以两者结合。
              </p>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="media-item">
              <h4>
                <span class="iconfont icon-iconfontfazhandexiajishenhou"></span>
                <span class="t-title">实现站群、网站的长远发展</span>
              </h4>
              <p>
                使用e速站，您可以架起站群与站点之间的桥梁。打造一个站群与网站良性发展的生态圈。
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <footer>
      Copyright© 2008 NewStarting Inc. All Rights Reserved. [黑ICP备09026057号]
    </footer>
  </div>
</template>

<script>
  import * as http from '../../../apis/net'

  export default {
    name: "PlatformIntroduce",
    inject: ['reload'],
    data() {
      return {
        errorImg: 'this.src="' + require('../../assets/imgs/default-avatar.png') + '"',
        user: {
        },
        loginForm: {
          email: '',
          pwd: '',
        },
        resetForm: {
          email: ''
        },
        registerForm: {
          nickName: '',
          email: '',
          pwd: '',
        },
        showForm: 'a'
      }
    },
    methods: {
      over(event){
        $(event.target).siblings().removeClass("current-btn");
        $(event.target).addClass("current-btn");
      },
      toGroup() {
        if (!this.user) {
          this.$toast.success({
            message:"请先登录！",
            color:'#3cb5f1'
          });
        } else {
          this.toMain();
        }
      },
      toCase() {
        this.$router.push("/platform-case");
      },
      toMain() {
        this.$router.push("/dashboard/home");
      },
      showUl() {
        $("#person-ul").addClass("show");
        $("#person-ul").focus();
      },
      hideUl() {
        $("#person-ul").removeClass("show");
      },
      logout() {
        if (confirm("确定要退出？")) {
          this.user = null;
          this.$store.commit("logout");
        }
      },
      toLogin() {
        if (!this.loginForm.email) {
          this.$toast.success({
            message:"请输入邮箱",
            color:'#3cb5f1'
          });
          return;
        } else {
          let regEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
          if (!regEmail.test(this.loginForm.email)) {
            this.$toast.success({
              message:"邮箱格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        if (!this.loginForm.pwd) {
          this.$toast.success({
            message:"请输入密码",
            color:'#3cb5f1'
          });
          return;
        } else {
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.loginForm.pwd)) {
            this.$toast.success({
              message:"密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });

            return;
          }
        }
        http.login(this.loginForm.email.toLocaleLowerCase(), this.loginForm.pwd).then(rs => {
          if (!rs.code) {
            //
            this.$store.commit("login", rs.token);
            this.$store.commit("setStatus", rs.user.state);
            //用户账号未激活跳转激活页面
            if (rs.user.state === 2) {
              this.$router.push('/register-mail');
              return;
            }
            this.getProfile();
          }
        });
      },
      toReset() {
        if (!this.resetForm.email) {
          this.$toast.success({
            message:"请输入邮箱地址",
            color:'#3cb5f1'
          });
          return;
        }
        let regEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!regEmail.test(this.resetForm.email)) {
          this.$toast.success({
            message:"邮箱格式不正确，请重新输入",
            color:'#3cb5f1'
          });
          return;
        }
        http.sendResetMail(this.resetForm.email).then(rs => {
          if (!rs.code) {
            let page = encodeURIComponent(rs.mailUrl);
            this.$router.push('/reset-mail?email=' + this.resetForm.email + '&page=' + page);
          }
        });
      },
      toRegister() {
        if (!this.registerForm.nickName) {
          this.$toast.success({
            message:"请输入昵称",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.registerForm.email) {
          this.$toast.success({
            message:"请输入邮箱",
            color:'#3cb5f1'
          });
          return;
        } else {
          let regEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
          if (!regEmail.test(this.registerForm.email)) {
            this.$toast.success({
              message:"邮箱格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        if (!this.registerForm.pwd) {
          this.$toast.success({
            message:"请输入密码",
            color:'#3cb5f1'
          });
          return;
        } else {
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.registerForm.pwd)) {
            this.$toast.success({
              message:"密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        http.register(this.registerForm.nickName, this.registerForm.email.toLocaleLowerCase(), this.registerForm.pwd).then(rs => {
          if (!rs.code) {
            this.$store.commit("login", rs.token);
            this.$store.commit("setStatus", 2);
            if(rs['is_mail_valid']){
              this.$router.push('/register-mail?email=' + this.registerForm.email);
            }else{
              this.$toast.success({
                message:"注册成功！",
                color:'#3cb5f1'
              });
              this.showForm='a';
            }
          }
        });
      },
      getProfile() {
        http.getProfile().then(res => {
          if (!res.code) {
            this.$store.commit("setProfile", res);
            // setTimeout(() => {
              let redirect = decodeURIComponent(this.$route.query.redirect || '/dashboard/home');
              this.$router.push(redirect);
            // }
            // , 1000);
          }
        });
      },
    },
    mounted() {
      this.user = this.$store.getters.user;
    }
  }
</script>

<style lang="scss" scoped>
  #platform-intro {
    @media (min-width: 1200px) {
      .container {
        max-width: 1200px;
      }
    }

    .container {
      .col-4, .col-5, .col-6, .col-12 {
        padding: 0;
      }
    }

    a {
      text-decoration: none;
    }

    .intro-first {
      background: url("../../assets/imgs/platform/intro-1.png") no-repeat top;
      background-size: cover;
      width: 100%;
      height: 100vh;

      .platform-desc {
        width: 595px;
        margin-top: 250px;
        font-size: 18px;
        line-height: 32px;
        color: #ffffff;
        text-align: left;
        margin-left: 20px;
      }

      .intro-btns {
        float: left;
        margin-top: 90px;
        margin-left: 20px;
        button {
          border: 1px solid #ffffff;
          background: transparent;
          width: 148px;
          height: 50px;
          line-height: 36px;
          font-size: 16px;
          margin-right: 20px;
        }
        .current-btn,button:hover {
          border: 1px solid #fa2a54;
          background: #fa2a54;
        }
      }

      .arrow-box {
        margin-left: 20px;
        width: 10px;
        height: 10px;
        /*margin: 20px auto;*/
        position: relative;

        .bottom {
          width: 10px;
          height: 10px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;

          .bottom-arrow1 {
            top: 1px !important;
            border-top: 10px #ffffff solid !important;
          }

          .bottom-arrow1, .bottom-arrow2 {
            width: 0;
            height: 0;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 5;
            border-bottom: 8px transparent dashed;
            border-left: 8px transparent dashed;
            border-right: 8px transparent dashed;
            border-top: 8px #222222 solid;
            overflow: hidden;
          }
        }
      }
    }

    .intro-third {
      background: url("../../assets/imgs/platform/intro-2.png") no-repeat;
      background-size: cover;
      width: 100%;
      height: 472px;
    }

    .intro-second, .intro-fourth {
      height: 1057px;
      width: 100%;
    }

    .intro-second {
      background: #ffffff;
    }

    .intro-fourth {
      background: #f7f8fb;
    }

    footer {
      height: 64px; /*设定footer高度*/
      position: relative; /*设定footer绝对位置在底部*/
      bottom: 0;
      width: 100%; /*展开footer宽度*/
      background-color: #333333;
      line-height: 64px;
      color: #ffffff;
      text-align: center;
    }

    .item-list {
      padding-left: 0;
      margin-top: 57px;
      display: flex;
      width: 515px;

      li {
        list-style: none;
        padding: 0 27px;

        a {
          color: #ffffff;
          font-size: 16px;
        }

        a:hover {
          color: #fa2b56;
        }

        .router-link-active {
          color: #fa2b56;
        }
      }
    }

    .register-form {
      height: 528px;
    }

    .login-form, .reset-form {
      height: 498px;
    }

    .login-form, .reset-form, .register-form {
      width: 384px;
      float: right;
      margin-top: 173px;
      border-radius: 5px;
      background: #ffffff;
      padding: 0 30px;

      .form-logo {
        height: 146px;
        padding-top: 40px;
      }

      input {
        background: #e5e5e5;
        border-radius: 10px;
        color: #555555;
        padding-left: 50px;
        width: 305px;
        height: 57px;
        line-height: 57px;
      }

      input::placeholder {
        color: #555555;
      }
    }

    .form-group {
      margin: 0;
    }

    .reset, .register {
      display: block;
      margin-top: -5px;
      margin-bottom: 20px;
    }

    .reset {
      text-align: right;

      span {
        color: #666666;
        margin-right: 25px;
        border-bottom: 1px solid #dcdcdc;
        cursor: pointer;
      }
    }

    .register {
      text-align: left;

      span {
        color: #666666;
        margin-left: 30px;
        cursor: pointer;
      }
    }

    .submit {
      width: 305px;
      height: 55px;
      line-height: 40px;
      border-radius: 30px;
      font-size: 20px;
      color: #ffffff;
      background: #234798;
      margin-left: -15px;
    }

    .title {
      font-size: 48px;
      margin-top: 167px;
      color: #333333;
      font-weight: bold;
    }

    .sub-title {
      font-size: 18px;
      color: #333333;
    }

    .odds-item {
      margin: 100px 0;

      .intro-ico {
        background-size: 642px;
        width: 72px;
        height: 72px;
        display: block;
        margin: 0 auto;
      }

      .ico-1 {
        background: url("../../assets/imgs/platform/intro-ico.png") -24px -16px no-repeat;
      }

      .ico-2 {
        background: url("../../assets/imgs/platform/intro-ico.png") -130px -12px no-repeat;
      }

      .ico-3 {
        background: url("../../assets/imgs/platform/intro-ico.png") -240px -12px no-repeat;
      }

      .ico-4 {
        background: url("../../assets/imgs/platform/intro-ico.png") -342px -16px no-repeat;
      }

      .ico-5 {
        background: url("../../assets/imgs/platform/intro-ico.png") -450px -16px no-repeat;
      }

      .ico-6 {
        background: url("../../assets/imgs/platform/intro-ico.png") -558px -16px no-repeat;
      }

      h4 {
        margin-top: 30px;
        font-size: 18px;
        color: #333333;
      }

      h6 {
        font-size: 14px;
        color: #595f6f;
      }
    }

    .media-item {
      width: 578px;
      height: 165px;
      border-radius: 5px;
      background: #ffffff;
      margin: 30px auto;
      color: #333333;
      padding: 22px 30px;

      h4 {
        font-size: 22px;
        text-align: left;
        line-height: 37px;
        padding-left: 10px;

        .iconfont {
          font-size: 40px;
        }

        .t-title {
          vertical-align: super;
        }
      }

      p {
        font-size: 14px;
        text-align: left;
      }
    }

    .intro-sprit {
      background: url("../../assets/imgs/platform/intro-3.png") no-repeat;
      width: 1200px;
      height: 100%;

      a {
        display: block;
        width: 60px;

        .my-tooltip {
          display: none;
          position: absolute;
          margin-top: 20px;

          .arrow {
            left: 37px;
            position: absolute;
            display: block;
            width: .8rem;
            height: .4rem;
          }

          .arrow:before {
            box-sizing: border-box;
            top: -28px;
            border-width: 10px 10px 10px 10px;
            border-color: transparent transparent #ffffff transparent;
            position: absolute;
            content: "";
            border-style: solid;
            color: transparent;
          }

          .re-arrow {
            left: 37px;
            position: absolute;
            display: block;
            width: .8rem;
            height: .4rem;
          }

          .re-arrow:before {
            box-sizing: border-box;
            bottom: -101px;
            border-width: 10px 10px 10px 10px;
            border-color: #ffffff transparent transparent transparent;
            position: absolute;
            content: "";
            border-style: solid;
            color: transparent;
          }

          .my-tooltip-inner {
            background: #ffffff;
            width: 374px;
            height: 96px;
            margin-top: -8px;
            font-size: 16px;
            color: #555555;
            padding: 20px 10px;
            margin-left: -120px;
          }
        }
      }

      .notice-1 {
        margin-left: 20px;
      }

      .notice-2 {
        display: block;
        margin-left: 20px;
        margin-top: -158px !important;

        .re-arrow:before {
          bottom: -91px;
        }
      }

      .notice-3 {
        margin-left: 20px;
      }

      .notice-4 {
        margin-left: 250px;
        margin-top: -158px !important;
      }

      .notice-5 {
        margin-left: 20px;
        margin-top: -158px !important;
      }

      .notice-6 {
        margin-left: 20px;
        margin-top: -158px !important;
      }

      .notice-7 {
        margin-left: 20px;
        margin-top: -158px !important;
      }

      a:hover {
        .my-tooltip {
          display: block;
        }
      }
    }

    .btn-span {
      width: 149px;
      height: 60px;
      background: #ffffff;
      border-radius: 5px;
      font-size: 18px;
      color: #333333;
      display: block;
      line-height: 60px;
    }

    .bs-1 {
      margin-top: 237px;
      margin-left: 0px;
      width: 149px;
      height: 60px;
    }

    .bs-2 {
      margin-left: 231px;
      margin-top: -163px;
      width: 149px;
      height: 60px;
    }

    .bs-3 {
      margin-left: 231px;
      margin-top: 126px;
      width: 149px;
      height: 60px;
    }

    .bs-4 {
      margin-left: 228px;
      margin-top: -149px;
      width: 149px;
      height: 60px;
    }

    .bs-5 {
      margin-left: 655px;
      margin-top: -60px;
      width: 149px;
      height: 60px;
    }

    .bs-6 {
      margin-left: 842px;
      margin-top: -60px;
      width: 149px;
      height: 60px;
    }

    .bs-7 {
      margin-left: 1054px;;
      margin-top: -60px;
      width: 149px;
      height: 60px;
    }
  }

  .glyphicon-user:before {
    content: "\e008"
  }

  .glyphicon-lock:before {
    content: "\e033"
  }

  .glyphicon-envelope:before {
    content: "\2709";
  }
  .glyphicon-envelope , .glyphicon-lock, .glyphicon-user{
    font-size: 22px;
    float: left;
    top: 40px;
    left: 16px;
  }

  /deep/ #my-tooltip {
    background: #ffffff;

    .arrow::before {
      bottom: 0;
      border-width: 0 0.4rem 0.4rem;
      border-bottom-color: #ffffff;
    }

    .tooltip-inner {
      max-width: 200px;
      padding: 0.25rem 0.5rem;
      color: #555555 !important;
      text-align: center;
      background-color: #ffffff !important;
      border-radius: 0.25rem;
    }

    .tooltip.show {
      opacity: 1;
    }

  }

  .personal-center {
    position: absolute;
    right: -2px;
    width: 149px;
    padding: 0 14px 3px;
    margin-top: -11px;
    border-radius: 0;
    background: #ffffff;
    z-index: 9;

    li {
      height: 36px;
      line-height: 36px;

      div {
        border-bottom: 1px solid;
        border-image: linear-gradient(to right, #ffffff, #dcdcdc, #ffffff) 1 10;

        a {
          cursor: pointer;
        }

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

  /deep/ .dropdown-menu {
    min-width: 0;
  }


</style>
