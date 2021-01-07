<template>
  <div id="about-us">
    <div class="intro-first">
      <b-container>
        <b-row>
          <b-col cols="6" offset="6">
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
            <template v-if="!user"><span class="to-login" @click="toLogin">登录/注册</span></template>
            <template v-if="user">
              <img :src="user.avatar" :onerror="errorImg" @click="showUl" class="bg-img" width="50"  alt=""/>
              <ul tabindex="-1" class="dropdown-menu dropdown-menu-right" id="person-ul" @blur="hideUl">
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
      </b-container>
    </div>
    <div class="intro-second">
      <b-container>
        <b-row>
          <b-col cols="12">
            <article>

              <h1>关于我们</h1>
              <div>
                <p>e速站是一款所见即所得的在线自助建站产品，无需懂技术代码，无需租用空间，利用完善、智能的系统，一键建站，即可轻松快速创建属于自己的网站。</p>
                <p>
                  打破以往单人独自创建和维护多个站点，孤军奋战的局面，平台以站群为单位，用户可以组建一个或多个站群，然后邀请其他用户加入自己的站群，群主统一管理，成员有序创建和维护站群的站点。每一个群组均可自由建站，不收取任何费用、不限制建站数量。</p>
                <p>
                  未来，e速站将打造一个完整的互联网营销闭环，为企业提供互联网营销工具、广告分发渠道、用户引导转化工具的全方位互联网营销解决方案，并整合优质企业服务商引进e速站，实现企业与企业服务商无缝对接，联合构建成开放式的企业互联网商业生态圈。无论企业是否具有互联网运营经验，e速站都将承载他们，助力他们在新商业浪潮中乘风破浪驶向更宽广的未来。</p>
              </div>
            </article>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="intro-third">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-row>
              <b-col cols="12">
                <h1 class="contact-us">联系我们</h1>
              </b-col>
            </b-row>
            <b-row class="contact-info">
              <b-col cols="4">
                <img src="../../assets/imgs/platform/us-wechat.png" height="136" width="136"/>
                <h3>微信二维码</h3>
              </b-col>
              <b-col cols="4">
                <img src="../../assets/imgs/platform/us-qq.png" height="136" width="136"/><br>
                <h3>QQ二维码</h3>
              </b-col>
              <b-col cols="4">
                <table cellpadding="5">
                  <tr>
                    <td>QQ</td>
                    <td>:&nbsp;1235467</td>
                  </tr>
                  <tr>
                    <td>微信</td>
                    <td>:&nbsp;1235467</td>
                  </tr>
                  <tr>
                    <td>邮箱</td>
                    <td>:&nbsp;1235467@qq.com</td>
                  </tr>
                  <tr>
                    <td>skype</td>
                    <td>:&nbsp;1235467</td>
                  </tr>
                </table>
              </b-col>
            </b-row>
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
  export default {
    name: "PlatformAboutUs",
    data() {
      return {
        errorImg: 'this.src="' + require('../../assets/imgs/default-avatar.png') + '"',
        user: {}
      }
    },
    methods: {
      toLogin(){
        this.$router.push("/platform-intro");
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
    },
    mounted() {
      this.user = this.$store.getters.user;
    }
  }
</script>

<style lang="scss" scoped>
  #about-us {
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
      background: url("../../assets/imgs/platform/us-1.png") no-repeat top;
      background-size: 100%;
      width: 100%;
      height: 402px;
      .to-login {
        font-size: 14px;
        color: #333333;
        margin-left: 8px;
        cursor: pointer;
      }

      .bg-img {
        height: 50px;
        border-radius: 50%;
        border: 1px solid #cccccc;
        margin-right: 5px;
      }
    }

    .intro-second, .intro-third {
      width: 100%;
    }

    .intro-second {
      height: 690px;
      background: #ffffff;

      article {
        margin-top: 115px;

        h1 {
          font-size: 48px;
          color: #333333;
          font-weight: bold;
        }

        div {
          margin-top: 60px;
          text-align: left;
          font-size: 16px;
          color: #555555;
          font-weight: bold;

          p {
            text-indent: 2em;
          }
        }
      }
    }

    .intro-third {
      height: 430px;
      background: #f7f8fb;

      .contact-us {
        margin-top: 50px;
        font-size: 48px;
        color: #333333;
        font-weight: bold;
      }
      .contact-info{
        margin-top: 75px;
        h3{
          margin-top: 10px;
          font-size: 18px;
          color: #555555;
          font-weight: bold;
        }
      }
      table {
        margin: 0 auto;
        tr {
          td{
            text-align: left;
          }
          td:first-child {
            width: 15px;
          }
        }
      }
    }

    .item-list {
      padding-left: 0;
      margin-top: 28px;
      display: flex;
      width: 515px;

      li {
        list-style: none;
        padding: 0 27px;

        a {
          color: #333333;
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
