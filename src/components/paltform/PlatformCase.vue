<template>
  <div id="platform-case">
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
              <img :src="user.avatar" :onerror="errorImg" @click="showUl"  class="bg-img" width="50" alt=""/>
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
            <h1 class="case-title">我们最新的案例</h1>
          </b-col>
          <!--<b-col cols="12">-->
            <!--<ul class="case-genre">-->
              <!--<li @click="switchGenre($event)">资讯</li>-->
              <!--<li @click="switchGenre($event)">导航</li>-->
              <!--<li @click="switchGenre($event)">博客</li>-->
            <!--</ul>-->
          <!--</b-col>-->
        </b-row>
        <b-row class="case-all">
          <b-col cols="3" v-for="item in caseItems" :key="item.id">
            <a :href="'http://'+item.url" class="case-item">
              <div>
                <img :src="item['cover_plan']"  :onerror="errorImg" height="263" width="263"/><br>
                <h5>{{item.name}}</h5>
                <!--<h6>预览</h6>-->
              </div>
            </a>
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
    name: "PlatformCase", data() {
      return {
        errorImg: 'this.src="' + require('../../assets/imgs/default-avatar.png') + '"',
        user: null,
        caseItems:[]
      }
    },
    methods: {
      switchGenre(event) {

        $(event.target).siblings().removeClass("current-genre");
        $(event.target).addClass("current-genre");
      },
      toLogin() {
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
      getPlatformAllCase(){
        http.getPlatformAllCase().then(rs=>{
          if(!rs.code){
            this.caseItems = rs;
          }
        });
      }
    },
    mounted() {
      this.user = this.$store.getters.user;
      this.getPlatformAllCase();
    }
  }
</script>

<style lang="scss" scoped>
  #platform-case {
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
      background: url("../../assets/imgs/platform/case-1.png") no-repeat top;
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

    .intro-second {
      width: 100%;
      min-height: 871px;
      background: #f7f8fb;

      .case-title {
        margin-top: 115px;
        font-size: 48px;
        color: #333333;
        font-weight: bold;
      }

      .case-genre {
        list-style: none;
        display: inline-flex;
        margin-top: 15px;

        li {
          width: 116px;
          height: 35px;
          color: #595f6f;
          font-size: 16px;
          line-height: 35px;
          padding: 0;
          cursor: pointer;
        }

        .current-genre {
          padding: 0;
          background: #fa2851;
          color: #ffffff;
          border-radius: 20px;
          box-shadow: 8px 9px 10px #b7b8ba;
        }
      }

      .case-all {
        margin-top: 90px;
        padding-bottom: 40px;
        .case-item {
          width: 263px;
          display: block;

          div {
            border-radius: 5px;
          }

          h5 {
            font-size: 22px;
            color: #333333;
            margin-top: 25px;
            padding-bottom: 20px;
          }

          /*h6 {*/
            /*font-size: 16px;*/
            /*color: #595f6f;*/
          /*}*/

          img {
            border-radius: 5px;
          }


        }
        a:hover {
          div {
            background: #fdfdfd;
            box-shadow: 16px 16px 16px #d4d4d4;
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

