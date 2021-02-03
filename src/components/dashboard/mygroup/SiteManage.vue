<template>
  <div id="site-manage">
    <b-container fluid>
      <b-row>
        <b-col class="item-title" cols="12">
          <span class="title">站点概览</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="site-kinds">
          站点类型：
          <ul>
            <li :class="{on:type===0}" @click="switchType(0)">全部</li>
            <li :class="{on:type===item.id}" v-for="item in typeList" @click="switchType(item.id)">{{item.name}}</li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-row>
            <b-col class="input-div">
              <input type="text" v-model="search" placeholder="请输入站点名称或站点域名" @change="queryData" />
              <b-button class="btn-search" @click="queryData">搜索</b-button>
              <b-button class="create-site" @click="toCreate">创建网站</b-button>
              <b-button class="synchro" @click="synchroManage">同步管理</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mtb20" sm="12" md="11">
          <b-row>
            <b-col
              class="site-item"
              sm="10"
              xl="4"
              lg="6"
              v-for="(item,index) in siteList"
              :key="item.id"
            >
              <span class="pending-review" v-if="item.state===1">待审核</span>
              <span class="chief-deputy main" v-if="item.main_level==1">主</span>
              <span class="chief-deputy vice" v-if="item.main_level==2">副</span>
              <b-card>
                <b-media>
                  <b-media>
                    <b-img
                      slot="aside"
                      v-lazy="item['logo']" 
                      :key="item['logo']"
                      width="64"
                      alt
                      style="background: #ccc;border:1px solid #ccc;"
                    ></b-img>
                    <h5
                      class="mt-0"
                    >{{item.name.length>12?(item.name.substr(0,12)+'...'):item.name}}</h5>
                    <a
                      class="mb-0 domain mgtop"
                      :title="item.domain"
                      @click="toRescue(item.domain)"
                    >{{item.domain}}</a>
                    <!-- <a class="mb-0 domain" :title="item.domain" @click="toRescue(item.sld_domain)" style="color:#999999;">
                        {{item.sld_domain}}
                    </a>-->
                    <p class="mb-0 mgtop">
                      站点类型：
                      <span class="mb-txt">{{item['type_name']}}</span>
                    </p>
                    <p class="mgtop" v-if="item['created_at']">
                      创建时间：
                      <span class="mb-txt">{{item['created_at'].substring(0,10)}}</span>
                    </p>
                    <div class="mtb-rg-nav">
                      <span
                        v-if="item.state!==1 && item.type!==8"
                        @click="toBackstage(item.id,item.type,item.name,item.domain,item.main_level,item.template_path)"
                        class="on"
                        style="margin-top:0"
                      >进入后台</span>
                      <span v-if="item.state!==1" @click="toAdministratDomain(item.id)">域名管理</span>
                      <span @click="toUpdate(item.id,item.template_path)">基础设置</span>
                      <span v-if="item.state!==1" @click="toAppendMember(item.id)">添加成员</span>
                    </div>
                  </b-media>
                  <p class="mb-0 create-info" style="margin-top:10px;">
                    <!--                     <p class="mb-0" @click="toRemoveMember(item.id)" style="cursor: pointer;">
                        责任人：{{item['user_name']}} >>>
                    </p>-->
                    <span style="cursor: pointer;" @click="toRemoveMember(item.id)">
                      责任人：
                      <span class="mb-txt">{{item['user_name']}} >>></span>
                    </span>
                    <br />域名解析地址：
                    <span class="mb-txt">{{item.ip}}</span>
                    <br />域名解析：
                    <a
                      @click="toRescue(item['sld_domain'])"
                      style="cursor: pointer;color:#555555;"
                    >{{trimProtocol(item['sld_domain'])}}</a>
                    <span
                      class="glyphicon glyphicon-question-sign"
                      v-b-modal="'modal-resolution-step'"
                    ></span>
                    <span class="btn-operation">
                      <b-button
                        variant="danger"
                        class="recovery"
                        v-if="item.state===2"
                        @click="addRecycling(item)"
                      >加入回收站</b-button>
                      <b-button v-if="item.state===0" variant="danger" @click="stop(item.id)">暂停</b-button>
                      <b-button
                        v-if="item.state===2"
                        variant="danger"
                        :class="item.state===2?'on':''"
                        @click="activate(item.id)"
                      >开启</b-button>
                    </span>
                  </p>
                </b-media>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-modal id="modal-resolution-step" size="xl" centered hide-header="true" hide-footer="true">
        <img src="../../../assets/imgs/resolution-step.png" height="701" width="1107" />
      </b-modal>

      <b-modal id="modal-append-member" size="lg" centered hide-header hide-footer>
        <div style="text-align: center;">
          <template v-if="unJoinItems.length>0">
            <h5 style="text-align: left;">添加成员</h5>
            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="selected" id="checkboxes-4" style="text-align: left;">
                <b-form-checkbox
                  v-for="item in unJoinItems"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </template>
          <h5 v-else style="margin-top: 30px;">没有可以添加的成员</h5>
          <b-button v-if="selected.length>0" @click="appendMember">确定</b-button>
          <b-button @click="$bvModal.hide('modal-append-member')">返回</b-button>
        </div>
      </b-modal>

      <b-modal id="modal-remove-member" size="lg" centered hide-header hide-footer>
        <div style="text-align: center;">
          <h5 style="text-align: left;">现有成员</h5>
          <b-form-group id="input-group-4">
            <b-form-checkbox-group v-model="selected" id="checkboxes-4" style="text-align: left;">
              <b-form-checkbox
                v-for="item in joinItems"
                :key="item.id"
                :value="item.id"
              >{{item.name}}</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-button @click="removeMember" v-if="selected.length>0">移出</b-button>
          <b-button @click="$bvModal.hide('modal-remove-member')">返回</b-button>
        </div>
      </b-modal>

      <div v-if="totalPage>1">
        <b-pagination-nav
          :link-gen="linkGen"
          :number-of-pages="totalPage"
          use-router
          align="center"
        ></b-pagination-nav>
      </div>
    </b-container>
    <b-modal
      id="modal-add-recycling"
      size="xs"
      body-bg-variant="light"
      centered
      hide-header
      hide-footer
    >
      <div class="recy-top">加入回收站</div>
      <div class="recy-nav-fist">
        <b-img slot="aside" :src="recovery.logo" :key="recovery.logo"></b-img>
        <div class="recy-nec">
          <span class="recy-name">{{recovery.name}}</span>
          <div class="recy-domain">
            <span>域名 :</span>
            <a
              class="mb-0 domain mgtop"
              :title="recovery.domain"
              @click="toRescue(recovery.domain)"
            >{{recovery.domain}}</a>
          </div>
        </div>
      </div>
      <div style="clear:both;"></div>
      <div class="recy-tips">
        <span style="color:#E83F46;">注意 :</span>加入回收站后，站点管理列表不再展示此站点信息，如有需要请前往回收站进行恢复后，再进行操作。
        <br />
        <span style="color:#E83F46;">当站点加入回收站后，将自动解绑所存在的主副关系</span>
      </div>
      <div class="recy-btn">
        <b-button @click="updateRecycle(recovery.id)" style="margin-left:19%;">确定</b-button>
        <b-button @click="$bvModal.hide('modal-add-recycling')" class="gray">取消</b-button>
      </div>
    </b-modal>
    <b-container fluid style="background: transparent!important;">
      <b-row>
        <b-col class="back-window" cols="2">
          <span class="btn-back" @click="back">
            <i class="iconfont icon-fanhui"></i> 返回
          </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as http from "../../../../apis/net";

export default {
  name: "SiteManage",
  data() {
    return {
      type: 0,
      search: "",
      siteList: [],
      typeList: [],
      unJoinItems: [],
      memberItems: [],
      joinItems: [],
      selected: [],
      msg: "这里是站点管理",
      totalPage: 1,
      cpage: 1,
      sid: "", //操作对应的站点id
      recovery: {
        //回收显示对于数据
        id: "",
        logo: "",
        name: "",
        domain: ""
      }
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    toRescue(sld_domain) {
      window.open("http://" + sld_domain, "_blank");
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    toUpdate(id,path) {
      this.$router.push("/dashboard/my-group/update-site?id=" + id + "&path=" + path);
    },
    queryData() {
      if (this.cpage !== 1) {
        this.$router.push(this.$route.path);
      } else {
        this.fetchData();
      }
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    fetchData() {
      this.cpage = Number(this.$route.query.page) || 1;
      this.getGroupSiteList();
    },
    switchType(id) {
      if (this.type === id) {
        return;
      }
      this.type = id;
      this.queryData();
    },
    toRemoveMember(id) {
      this.sid = id;
      this.selected = [];
      http.getSiteMembers({ web_id: id }).then(rs => {
        if (!rs.code) {
          this.joinItems = rs;
        }
      });
      this.$bvModal.show("modal-remove-member");
    },
    removeMember() {
      let body = {
        web_id: this.sid,
        user_ids: this.selected
      };
      if (confirm("确定要移除选中的成员吗？")) {
        http.removeSiteMembers(body).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "移除成功！",
              color: "#3cb5f1"
            });
            this.$bvModal.hide("modal-remove-member");
          }
        });
      }
    },
    toAppendMember(id) {
      this.sid = id;
      this.selected = [];
      http.getSiteMembers({ web_id: id }).then(rs => {
        if (!rs.code) {
          this.unJoinItems = [];
          this.memberItems.forEach(t1 => {
            let exist = rs.some(t2 => t1.id === t2.id);
            if (!exist && t1.role === 0) {
              this.unJoinItems.push(t1);
            }
          });
        }
      });

      this.$bvModal.show("modal-append-member");
    },
    appendMember() {
      let body = {
        user_ids: this.selected,
        web_id: this.sid
      };
      http.updateSiteMembers(body).then(rs => {
        if (!rs.code) {
          this.$toast.success({
            message: "保存成功！",
            color: "#3cb5f1"
          });
          this.$bvModal.hide("modal-append-member");
        }
      });
    },
    toBackstage(id, type, siteName, siteDomain,mainLevel,templatePath) {
      $(this)
        .addClass("on")
        .siblings()
        .removeClass("on");
      this.$store.commit("setSite", {
        type: type,
        id: id,
        siteName: siteName,
        siteDomain: siteDomain,
        mainLevel: mainLevel,
        templatePath: templatePath
      });
      let destination = "";
      switch (type) {
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
    },
    //创建站点
    toCreate() {
      this.$router.push("/dashboard/my-group/create-site");
    },
    //暂停站点
    stop(id) {
      http.setSiteMaintain(id).then(rs => {
        if (!rs.code) {
          this.fetchData();
        }
      });
    },
    //激活站点
    activate(id) {
      http.activateSite(id).then(rs => {
        if (!rs.code) {
          this.fetchData();
        }
      });
    },
    synchroManage() {
      this.$router.push("/dashboard/my-group/synchro-manage");
    },
    //站群的站点列表
    getGroupSiteList() {
      let that = this;
      let params = {
        per_page: 12,
        page: that.cpage,
        state: "0,2"
      };
      if (that.type) {
        params["type"] = that.type;
      }
      if (that.search) {
        params["name_domain"] = that.search;
      }
      http.getGroupSiteList(params).then(rs => {
        if (!rs.code) {
          that.siteList = rs.data;
          that.totalPage = Math.ceil(rs.total / 12);
        }
      });
    },
    //获取站点类型列表
    getSiteType() {
      http.getSiteType().then(rs => {
        if (!rs.code) {
          this.typeList = rs;
        }
      });
    },
    trimProtocol(url) {
      if (url.substr(0, 7).toLowerCase() === "http://") {
        return url.substr(7);
      } else if (url.substr(0, 8).toLowerCase() === "https://") {
        return url.substr(8);
      } else {
        return url;
      }
    },
    getGroupMemberList() {
      let params = {};
      http.getGroupMemberList(params).then(rs => {
        if (!rs.code) {
          this.memberItems = rs.data;
        }
      });
    },
    //域名管理
    toAdministratDomain(id) {
      this.$router.push("/dashboard/my-group/domain-name-manage?id=" + id);
    },
    //加入回收弹框
    addRecycling(item) {
      this.recovery.id = item.id;
      this.recovery.logo = item.logo;
      this.recovery.name = item.name;
      this.recovery.domain = item.domain;
      this.$bvModal.show("modal-add-recycling");
    },
    updateRecycle(id) {
      //加入回收站
      let params = {
        id: id
      };
      http.updateRecycle(params).then(rs => {
        if (rs.success) {
          this.$toast.success({
            message: "加入回收站成功！",
            color: "#3cb5f1"
          });
          this.$bvModal.hide("modal-add-recycling");
          this.fetchData();
        }
      });
    }
  },
  mounted() {
    this.getSiteType();
    this.fetchData();
    this.getGroupMemberList();
  },
  updated() {
    let w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (w < 1920) {
      $(".site-item").addClass("col-xl-6");
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1920px) {
  .media h5,
  .media p,
  .mtb-rg-nav span {
    font-size: 0.8rem;
  }
}
@media screen and (min-width: 1921px) {
  .media h5,
  .media p,
  .mtb-rg-nav span {
    font-size: 1rem;
  }
}
@media (max-width: 1680px) {
  .col-md-11 {
    flex: 0 0 98%;
    max-width: 98%;
  }
}
#site-manage {
  padding: 25px;
  min-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 69px);
}

.container-fluid {
  position: relative;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
}

.item-title {
  height: 30px;
  line-height: 30px;
  /*margin: 0 auto;*/
  padding: 0;
  text-align: left;
  border-bottom: 1px solid #bfbfbf;

  .title {
    margin-left: 10px;
  }
}

.input-div {
  input {
    width: 350px;
    height: 38px;
    border-radius: 5px;
    border: 1px solid #d2d2d2;
    background: #ffffff;
    margin-right: 20px;
    padding-left: 10px;
  }

  button {
    width: 100px;
    margin-right: 20px;
  }

  .btn-search {
    background: #2a94de;
    border: none;
    color: #ffffff;
  }

  .create-site {
    background: #01c36a;
    border: none;
    color: #ffffff;
  }
  .synchro {
    position: absolute;
    right: 50px;
    width: 100px;
    background: rgba(238, 238, 238, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    color: #333333;
  }
}

.data-board {
  margin: 0 auto;
  padding: 10px 0;
}

.mtb20 {
  margin: 20px auto;
}

.mtb20 {
  margin: 20px auto;
}

.media {
  h5,
  p {
    text-align: left;
    // font-size: 1rem;
    color: #999999;

    .wait-audit,
    .to-backstage {
      line-height: 20px;
    }
  }
  h5 {
    font-weight: bold;
    color: #333333 !important;
  }
  .domain {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 240px;
    display: block;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
  }
  span.mb-txt {
    color: #555555;
  }

  .mgtop {
    margin-top: 10px;
  }

  // span:nth-child(even) {
  //   float: right;
  //   cursor: pointer;
  // }
}

.media .media-body .media {
  div:first-child {
    width: 167px;

    img {
      width: 100%;
      height: 114px;
    }
  }
}

.card {
  margin-bottom: 33px;
  background: #eeeeee;
  border-radius: 0;
}
.card:hover{
  box-shadow: 0px 2px 7px 0px #d8d8d8;
  background: #fff!important;
  border-radius: 5px;
}
.btn-danger.on {
  background: #01c36a;
  border: 1px solid #01c36a;
}
.btn-danger {
  background: #2a94de;
  width: 70px;
  border: 1px solid #2a94de;
}
.recovery.btn-danger {
  width: 90px;
  font-size: 13px;
  padding: 0.375rem 0.5rem;
  color: #666666;
  border: 1px solid rgba(221, 221, 221, 1);
  background: #fff;
  margin-right: 5px;
}

.create-info {
  line-height: 30px;

  button {
    line-height: 18px;
  }
}

.to-backstage {
  // border-bottom: 1px solid #959595;
  float: right;
  width: 84px;
  height: 34px;
  line-height: 34px !important;
  text-align: center;
  color: #2a94de;
  border-radius: 5px;
  border: 1px solid #2a94de;
}

.append-member {
  color: #2a94de;
  float: right;
  cursor: pointer;
}

.site-kinds {
  text-align: left;
  padding-left: 10px;
  font-size: 14px;
  line-height: 30px;

  ul {
    list-style: none;
    display: inline-flex;
    padding-left: 0;

    li {
      margin-right: 20px;
      cursor: pointer;
    }

    li.on,
    li:hover {
      color: #2a94de;
    }
  }
}

.glyphicon-question-sign:before {
  content: "\e085";
}

.glyphicon-question-sign:hover {
  color: #3cb5f1;
}

.glyphicon-note:before {
  content: "";
  background: url("../../../assets/imgs/note.png") no-repeat 100%;
  width: 24px;
  height: 22px;
  display: block;
  cursor: pointer;
}

.pending-review {
  line-height: 15px;
  color: #ffffff;
  background: #e60012;
  padding: 5px 10px;
  border-radius: 10px;
  z-index: 1;
  left: 25px;
  top: 10px;
  position: absolute;
}

.chief-deputy {
  position: absolute;
  top: 0;
  left: 15px;
  width: 41px;
  height: 24px;
  line-height: 22px;
  display: inline-block;
  z-index: 99;
  color: #ffffff;
  font-size: 14px;
  text-align: left;
  padding-left: 6px;
  box-sizing: border-box;
  overflow: hidden;
}

.main {
  background: url("../../../assets/imgs/Bq_1bg.png") no-repeat;
  background-size: 100% 100%;
}
.vice {
  background: url("../../../assets/imgs/Bq_2bg.png") no-repeat;
  background-size: 100% 100%;
}
#modal-append-member,
#modal-remove-member {
  .custom-control-inline {
    margin-right: 33px !important;
  }

  button {
    background: #3cb5f1;
    width: 100px;
    border: none;
    line-height: 25px;
    margin: 50px 20px;
  }
}

.tooltip-inner {
  background-color: #a9a7a8 !important;
}

/deep/ .card-body {
  padding-bottom: 10px;
  position: relative;
  min-height: 255px;
}
/deep/ .media-body {
  position: relative;
}
.mtb-rg-nav {
  position: absolute;
  right: 0;
  top: 0;
  width: 84px;
}
.mtb-rg-nav span {
  margin-top: 10px;
  display: inline-block;
  width: 84px;
  height: 34px;
  line-height: 32px !important;
  text-align: center;
  border-radius: 5px;
  color: #555555;
  border: 1px solid #dedede;
  cursor: pointer;
}
.mtb-rg-nav span:hover {
  color: #2a94de;
  background: #fff;
}
.mtb-rg-nav span.on {
  color: #2a94de;
  border: 1px solid #91c3e6;
}
.btn-operation {
  float: right;
  margin-top: -8px;
}
/deep/ #modal-add-recycling .modal-content {
  width: 420px !important;
  height: 290px !important;
  border-radius: 4px;
  box-shadow: 0px 3px 10px 0px rgba(4, 0, 0, 0.17);
  border: none;
}
/deep/ #modal-add-recycling .recy-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: linear-gradient(90deg, rgba(72, 90, 102, 1), rgba(58, 76, 88, 1));
  padding: 0 15px;
  color: #ffffff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#modal-add-recycling {
  .recy-nav-fist {
    position: relative;
    margin-top: 50px;
    margin-left: 10px;
    height: 65px;
  }
  .recy-nav-fist img {
    width: 98px;
    height: 60px;
    float: left;
    background: url("../../../assets/imgs/recy-img.gif");
    background-repeat: repeat;
    border-radius: 4px;
  }
  .recy-nec {
    float: left;
    width: 241px;
    height: 60px;
    margin-left: 14px;
    font-size: 14px;
  }
  .recy-name {
    color: #333333;
    font-weight: bold;
    width: 100%;
    max-height: 42px;
    display: inline-block;
    text-align: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .recy-domain {
    color: #999999;
    position: relative;
  }
  .recy-domain a {
    position: absolute;
    top: 0;
    left: 40px;
    display: inline-block;
    color: #2a94de;
    cursor: pointer;
    width: 202px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .recy-domain a:hover {
    color: #2a94de;
  }
  .recy-tips {
    margin-left: 10px;
    margin-top: 15px;
    color: #999999;
    font-size: 13px;
    width: 368px;
    height: 46px;
    line-height: 18px;
  }
  .recy-btn {
    margin-top: 35px;
  }
  .recy-btn .btn-secondary {
    background-color: #2a94de;
    width: 110px;
    height: 40px;
    border-radius: 4px;
    margin: 0 auto;
    color: #fff;
    border: 1px solid #2a94de;
  }
  .recy-btn .btn-secondary.gray {
    background-color: #dddddd;
    color: #333333;
    background: linear-gradient(
      0deg,
      rgba(246, 246, 246, 1),
      rgba(255, 255, 255, 1)
    );
    border: 1px solid rgba(221, 221, 221, 1);
    margin-left: 10px;
  }
}
/deep/ #modal-add-recycling .bg-light {
  background: none !important;
}
</style>
