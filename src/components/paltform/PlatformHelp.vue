<template>
  <div id="platform-help">
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
              <img :src="user.avatar" :onerror="errorImg" @click="showUl" class="bg-img" width="50" alt=""/>
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
        <b-row>
          <b-col cols="12">
            <b-form style="margin-top: 100px;">
              <b-form-group>
                <span class="glyphicon glyphicon-search form-control-feedback"></span>
                <b-form-input
                  required
                  placeholder="输入关键字搜索"
                  v-model="title"
                  @change="queryData"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="intro-second">
      <b-container>
        <b-row v-if="columnShow">
          <b-col cols="12">
            <h1 class="question-title">常见问题解答</h1>
          </b-col>
          <b-col cols="12">
            <ul class="question-genre">
              <li @click="switchGenre($event,item.id)" v-for="item in columns" :key="item.id">{{item.name}}</li>
              <!--<li @click="switchGenre($event)">站群管理</li>-->
              <!--<li @click="switchGenre($event)">域名使用</li>-->
              <!--<li @click="switchGenre($event)">网站管理</li>-->
              <!--<li @click="switchGenre($event)">公告</li>-->
            </ul>
          </b-col>
        </b-row>
        <b-row class="question-all">
          <template v-if="itemList.length>0"></template>
          <b-col cols="6" v-for="temp in itemList" :key="temp.id">
            <div class="question-item">
              <details>
                <summary>{{temp.title}}</summary>
                <div style="margin-top: 15px;" v-html="temp.content"></div>
              </details>
            </div>
          </b-col>
          <template v-if="!category_id && itemList.length===0">
            <b-col cols="12">
              <div style="background: #ffffff;width: 400px;margin: 0 auto;height: 150px;line-height: 150px;">
                搜索不到您想要的结果，换个关键词试试哦~
              </div>
            </b-col>
          </template>
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
    name: "PlatfromHelp", data() {
      return {
        errorImg: 'this.src="' + require('../../assets/imgs/default-avatar.png') + '"',
        user: null,
        columns: [],
        itemList: [],
        category_id: '',
        title: '',
        columnShow: true
      }
    },
    methods: {
      queryData() {
        this.columnShow = !this.title;
        this.category_id = '';
        this.getPlatformHelpItems();
        window.scroll({ top: document.body.clientHeight, left: 0, behavior: 'smooth' });
      },
      switchGenre(event, id) {
        $(event.target).siblings().removeClass("current-genre");
        $(event.target).addClass("current-genre");
        this.category_id = id;
        this.getPlatformHelpItems();
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
      getPlatformHelpColumn() {
        http.getPlatformHelpColumn({parent_id:17}).then(rs => {
          if (!rs.code) {
            this.columns = rs;
          }
        });
      },
      getPlatformHelpItems() {
        let params = {};
        if (this.category_id) {
          params['category_id'] = this.category_id;
        }
        if (this.title) {
          params['title'] = this.title;
        }
        http.getPlatformHelpItems(params).then(rs => {
          if (!rs.code) {
            this.itemList = rs;
          }
        });
      }
    },
    mounted() {
      this.user = this.$store.getters.user;
      this.getPlatformHelpColumn();
      this.getPlatformHelpItems();
    }
  }
</script>

<style lang="scss" scoped>
  #platform-help {
    background: #f7f8fb;
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
      background: url("../../assets/imgs/platform/help-1.png") no-repeat top;
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

      input {
        font-size: 14px;
        padding-left: 60px;
        width: 694px;
        height: 45px;
        line-height: 45px;
        color: #ffffff;
        background: transparent;
        border: 1px solid #ffffff;
      }

      input::placeholder {
        line-height: 45px;
        color: #ffffff;
      }

      .glyphicon {
        top: 11px;
        color: #ffffff;
        left: 40px;
      }
    }

    .intro-second {
      width: 100%;
      min-height: 871px;


      .question-title {
        margin-top: 115px;
        font-size: 48px;
        color: #333333;
        font-weight: bold;
      }

      .question-genre {
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
          background: #fa2851;
          color: #ffffff;
          border-radius: 20px;
          box-shadow: 8px 9px 10px #b7b8ba;
        }
      }

      .question-all {
        margin-top: 90px;
        padding-bottom: 40px;

        .question-item {
          margin: 20px 10px;
          text-align: left;
          background: #ffffff;
          padding: 15px 20px;
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

  .glyphicon-search:before {
    content: "\e003";
    color: #ffffff;
    font-size: 20px;
  }
  .glyphicon-search{
    font-size: 20px;
    top: 11px;
    color: #fff;
    left: 40px;
    float: left;
  }

</style>

