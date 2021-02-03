<template>
  <div id="my-group">
    <button id="aside-button" @click="show" style="margin-left: 100px;border: none;">
      <span class="glyphicon glyphicon-th-large" style="font-size: 25px;"></span>
    </button>
    <transition name="my-trans" mode="out-in">
      <nav id="sidebar" class="sidebar-wrapper" v-if="seen">
        <div class="sidebar-content mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar desktop">
          <div
            id="mCSB_1"
            class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
            style="max-height: none;"
          >
            <div
              id="mCSB_1_container"
              class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
              style="position: relative; left: 0px; top: 0px;"
              dir="ltr"
            >
              <!--<a href="#" id="toggle-sidebar"><i class="fa fa-bars"></i></a>-->

              <div class="sidebar-menu">
                <!--群主、管理员看到全部菜单-->
                <span style="color: #333333;line-height: 50px;">{{groupName}}站群管理中心</span>
                <ul v-show="role === 1 || role === 99">
                  <li>
                    <router-link to="/dashboard/my-group/data-center">
                      <i class="nav_icon iconfont icon-shujuzhongxin"></i>
                      <span class="nav-text">
                        数据中心
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/data-statistics">
                      <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
                      <span class="nav-text">
                        数据统计
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/site-manage">
                      <i class="nav_icon iconfont icon-zhandianguanli"></i>
                      <span class="nav-text">
                        站点管理
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/synchro-manage">
                      <i class="nav_icon iconfont icon-tongbu"></i>
                      <span class="nav-text">
                        同步管理
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/station-group-config">
                      <i class="nav_icon iconfont icon-zhanqunguanlixitong"></i>
                      <span class="nav-text">
                        站群配置
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/audit-center">
                      <i class="nav_icon iconfont icon-icon_tab_shenhezhongxin"></i>
                      <span class="nav-text" style="position:relative;">
                        审核中心
                        <span class="nav-num" v-if="examineNum>0">{{examineNum}}</span>
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/member-manage">
                      <i class="nav_icon iconfont icon-chengyuanguanli"></i>
                      <span class="nav-text">
                        成员管理
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/message-manage">
                      <i class="nav_icon iconfont icon-liuyanguanli"></i>
                      <span class="nav-text">
                        留言管理
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/operation-record">
                      <i class="nav_icon iconfont icon-shiwucaozuojilu"></i>
                      <span class="nav-text">
                        操作记录
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/recycle-bin">
                      <i class="nav_icon iconfont icon-huishouzhan"></i>
                      <span class="nav-text">
                        回收站&nbsp&nbsp&nbsp
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                </ul>
                <!--成员只能看到站点管理菜单-->
                <ul v-show="role === 0">
                  <li></li>
                  <li>
                    <router-link to="/dashboard/my-group/private-data-center">
                      <i class="nav_icon iconfont icon-shujuzhongxin"></i>
                      <span class="nav-text">
                        数据中心
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/private-site-manage">
                      <i class="nav_icon iconfont icon-zhandianguanli"></i>
                      <span class="nav-text">
                        站点管理
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/message-manage">
                      <i class="nav_icon iconfont icon-liuyanguanli"></i>
                      <span class="nav-text">
                        留言管理
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/my-group/operation-record">
                      <i class="nav_icon iconfont icon-shiwucaozuojilu"></i>
                      <span class="nav-text">
                        操作记录
                        <i class="arrow-right">></i>
                      </span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <!-- sidebar-menu  -->
            </div>
          </div>
        </div>
        <!-- sidebar-content  -->
      </nav>
    </transition>
    <div id="content" :key="activeDate">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as http from "../../../apis/net";
export default {
  name: "MyGroup",
  data() {
    return {
      seen: true,
      groupName: null,
      role: -1,
      activeDate: new Date().getTime(),
      examineNum: 0,
      auditNum: 0
    };
  },
  computed: {
    isFollow() {
      return this.$store.getters.role; //需要监听的数据
    },
    isIdentify() {
      return this.$store.getters.identify;
    },
    getAmount() {
      return this.$store.state.amount;
    }
  },
  watch: {
    getAmount(data) {
      this.examineNum = data;
    },
    isFollow(newVal, oldVal) {
      //do something
      this.role = Number(newVal);
    },
    isIdentify(newVal, oldVal) {
      this.getGroupBaseInfo();
      this.activeDate = new Date().getTime();
    },
    seen(newVal, oldVal) {
      if (newVal) {
        $("#content").css("left", "220px");
      } else {
        setTimeout(() => {
          $("#content").css("left", "0");
        }, 200);
      }
    }
  },
  methods: {
    show() {
      this.seen = !this.seen;
    },
    getGroupBaseInfo() {
      http.getGroupBaseInfo().then(rs => {
        if (!rs.code) {
          this.groupName = rs.name;
        }
      });
    },
    //获取审核的数量
    getExamineNum() {
      http.getAuditMemberList(this.cpage).then(rs => {
        if (!rs.code) {
          this.auditNum = 0;
          this.auditNum += rs.data.length;
          http.getAuditSiteList(this.cpage).then(rs2 => {
            if (!rs2.code) {
              this.auditNum += rs2.data.length;
              this.examineNum = this.auditNum;
            }
          });
        }
      });
    }
  },
  mounted() {
    this.role = Number(this.$store.getters.role);
    this.getGroupBaseInfo();
    this.getExamineNum();
  }
};
</script>

<style scoped>
#my-group {
  /*z-index: 99;*/
}
.my-trans-enter-active,
.my-trans-leave-active {
  transition: all 0.5s ease-out;
}

.my-trans-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.my-trans-leave-active {
  transform: translateX(-200px);
  opacity: 0;
}

#content {
  height: calc(100vh - 69px);
  left: 244px;
  position: absolute;
  right: 0;
  top: 66px;
  bottom: 0;
  overflow: hidden;
  color: #555555;
  background: #efefef;
  z-index: -1;
}

/*----------------sidebar-wrapper----------------*/
.sidebar-wrapper {
  width: 244px;
  background: #ffffff;
  height: calc(100vh - 69px);
  /*max-height: 100%;*/
  position: absolute;
  z-index: -1;
  top: 67px;
}

@media screen and (max-width: 768px) {
  #aside-button {
    float: left;
    z-index: -1;
  }

  .sidebar-wrapper {
    top: 93px;
  }
}

@media screen and (min-width: 769px) {
  #aside-button {
    display: none;
  }

  .sidebar-wrapper {
  }
}

.sidebar-wrapper ul li:hover a i,
.sidebar-wrapper .sidebar-dropdown .sidebar-submenu li a:hover:before,
.sidebar-wrapper .sidebar-search input.search-menu:focus + span {
  color: #1d2228;
}

.sidebar-wrapper ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid #e5e5e5;
}

.sidebar-wrapper a {
  text-decoration: none;
}

/*----------------sidebar-content----------------*/
.sidebar-content {
  max-height: calc(100vh - 69px);
  height: calc(100vh - 69px);
  overflow-y: scroll;
  position: relative;
}

.sidebar-content.desktop {
  overflow-y: hidden;
}

/*--------------------sidebar-brand----------------------*/
.sidebar-wrapper .sidebar-brand {
  padding: 15px 20px;
  text-align: center;
  border-bottom: 1px solid #10151d;
}

.sidebar-wrapper .sidebar-brand > a {
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
}

/*--------------------sidebar-header----------------------*/
.sidebar-wrapper .sidebar-header {
  padding: 20px;
  overflow: hidden;
  border-top: 1px solid #202a3c;
  border-bottom: 1px solid #10151d;
}

.sidebar-wrapper .sidebar-header .user-pic {
  float: left;
  width: 60px;
  padding: 2px;
  border: 1px solid #585858;
  border-radius: 8px;
  margin-right: 15px;
}

.sidebar-wrapper .sidebar-header .user-info {
  float: left;
  color: #ccc;
}

.sidebar-wrapper .sidebar-header .user-info span {
  display: block;
}

.sidebar-wrapper .sidebar-header .user-info .user-role {
  font-size: 12px;
  color: #929292;
}

.sidebar-wrapper .sidebar-header .user-info .user-status {
  display: inline-block;
}

/*-----------------------sidebar-search------------------------*/

.sidebar-wrapper .sidebar-search {
  border-top: 1px solid #222b35;
  border-bottom: 1px solid #10151d;
}

.sidebar-wrapper .sidebar-search > div {
  padding: 10px 20px;
}

.sidebar-wrapper .sidebar-search input.search-menu,
.sidebar-wrapper .sidebar-search .input-group-addon {
  background: #0c1119;
  box-shadow: none;
  color: #9c9c9c;
  border-color: #3c485d;
  transition: color 0.5s;
}

/*----------------------sidebar-menu-------------------------*/
.sidebar-wrapper .sidebar-menu {
  /*border-top: 1px solid #222b35;*/
  padding-bottom: 10px;
}

.sidebar-wrapper .sidebar-menu .header-menu span {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  color: #b9b9b9;
  padding: 10px 20px;
  display: inline-block;
}

.sidebar-wrapper .sidebar-menu ul li {
  /*border-bottom: solid 1px #ffff; */
  border-bottom: solid 1px #e5e5e5;
  /* background: #dcdcdc; */
}

.sidebar-wrapper .sidebar-menu ul li a {
  display: inline-block;
  width: 100%;
  color: #333333;
  text-decoration: none;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  position: relative;
  font-size: 14px;
  line-height: 44px;
}

.sidebar-wrapper .sidebar-menu ul li.on,
.sidebar-wrapper .sidebar-menu ul li:hover {
  background: #3cb5f1;
  color: #fff !important;
}

.sidebar-wrapper .sidebar-menu ul li.on a i,
.sidebar-wrapper .sidebar-menu ul li:hover a i {
  color: #fff !important;
}
.sidebar-wrapper .sidebar-menu ul li.on a .nav-text,
.sidebar-wrapper .sidebar-menu ul li:hover a .nav-text {
  color: #fff !important;
}

.sidebar-wrapper .sidebar-menu ul li a .nav-text .nav-num {
  position: absolute;
  top: -8px;
  right: 25px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff0000;
  color: #ffffff;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  /**
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis; 
    **/
}

.sidebar-wrapper .sidebar-menu ul li:hover > a {
  background: #2a94de;
  color: #fff !important;
}

.router-link-active {
  /*color: #3cb5f1 !important;*/
  /*background: #333333;*/
  background: #2a94de;
  color: #fff !important;
}

.sidebar-wrapper .sidebar-menu ul li a i {
  margin-right: 10px;
  /*font-size: 14px;*/
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown div {
  background: #0c1119;
  border-bottom: 1px solid #222b35;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown > a:after {
  content: "\f105";
  font-family: FontAwesome;
  font-weight: 400;
  font-style: normal;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  background: 0 0;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  right: 15px;
  top: 10px;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu ul {
  padding: 5px 0;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li {
  padding-left: 25px;
  font-size: 13px;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a:before {
  content: "\f10c";
  font-family: FontAwesome;
  font-weight: 400;
  font-style: normal;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 10px;
  font-size: 10px;
}

.sidebar-wrapper .sidebar-menu ul li a span.label,
.sidebar-wrapper .sidebar-menu ul li a span.badge {
  float: right;
  margin-top: 7px;
  margin-left: 5px;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a .badge,
.sidebar-wrapper .sidebar-menu .sidebar-dropdown .sidebar-submenu li a .label {
  float: right;
  margin-top: 0px;
}

.sidebar-wrapper .sidebar-menu .badge {
  background: #384558;
}

.sidebar-wrapper .sidebar-menu .sidebar-submenu {
  display: none;
}

.sidebar-wrapper .sidebar-menu .sidebar-dropdown.active > a:after {
  transform: rotate(90deg);
  right: 17px;
}

/*--------------------------side-footer------------------------------*/

.sidebar-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  background: #1c232f;
  box-shadow: 0px -1px 5px #0c1119;
  border-top: 1px solid #222b35;
}

.sidebar-footer > a {
  flex-grow: 1;
  text-align: center;
  border-left: 1px solid #222b35;
  border-right: 1px solid #10151d;
  height: 30px;
  line-height: 30px;
  color: #9c9c9c;
  position: relative;
}

.sidebar-footer > a:first-child {
  border-left: none;
}

.sidebar-footer > a:last-child {
  border-right: none;
}

.sidebar-footer > a:hover {
  color: #ccc;
}

.sidebar-footer > a .notification {
  position: absolute;
  top: 0;
}

.glyphicon-th-large:before {
  content: "\e010";
}

.nav_icon {
  font-size: 24px;
  vertical-align: middle;
}

.arrow-right {
  padding-left: 20px;
  font-style: normal;
}

.icon-caozuojilu {
  font-size: 32px;
  margin-right: 3px;
}
</style>
