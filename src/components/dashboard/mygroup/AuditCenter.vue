<template>
  <div id="audit-center">
    <b-container fluid>
      <b-row style="margin: 0;">
        <b-col class="item-title audit-switch" cols="12">
          <span  class="title" :class="{on:showPlate==='a'}"  @click="plateSwitch('a')">成员进群审核
            <span class="glyphicon tnum" v-if="AuditMemberNum>0">{{'('+AuditMemberNum+')'}}</span>
          </span>
          <span class="title" :class="{on:showPlate==='b'}" @click="plateSwitch('b')">建站审核
            <span class="glyphicon tnum" v-if="AuditSiteNum>0">{{'('+AuditSiteNum+')'}}</span>
          </span>
        </b-col>
      </b-row>
      <b-row v-show="showPlate==='a'"  >
        <b-col class="mtb40 group-audit-list" cols="11">
          <b-row>
            <b-col cols="2">申请人</b-col>
            <b-col cols="3">申请理由</b-col>
            <b-col cols="2">申请时间</b-col>
            <b-col cols="2">来源</b-col>
            <b-col cols="3">操作</b-col>
          </b-row>

          <b-row v-for="(item,index) in memberItems" :key="item.id">
            <b-col cols="2">{{item.name}}</b-col>
            <b-col cols="3">{{item['reason_apply']}}</b-col>
            <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            <b-col cols="2">{{item.from}}</b-col>
            <b-col cols="3">
              <b-button @click="showPassModal(item.id)">通过</b-button>&nbsp;&nbsp;&nbsp;&nbsp;<b-button
              @click="showRefuseModal(item.id)">不通过
            </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row v-show="showPlate==='b'" >
        <b-col class="mtb40 site-audit-list" cols="11">
          <b-row>
            <b-col cols="2">创建者</b-col>
            <b-col cols="3">站点类型</b-col>
            <b-col cols="2">站点名称</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="3">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in siteItems" :key="item.id">
            <b-col cols="2">{{item['user_name']}}</b-col>
            <b-col cols="3">{{item['type_name']}}</b-col>
            <b-col cols="2">{{item['name']}}</b-col>
            <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            <b-col cols="3">
              <b-button @click="passSiteAudit(item.id)">通过</b-button>&nbsp;&nbsp;&nbsp;&nbsp;<b-button
              @click="showRefuseModal(item.id)">
              不通过
            </b-button>
            </b-col>

          </b-row>
        </b-col>
      </b-row>
      <div class="overflow-auto" style="margin-top: 50px;"  v-if="totalPage>1">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
      </div>
    </b-container>

    <b-modal id="modal-join-group" size="xs" centered hide-header hide-footer>
      <div style="text-align: left">
        <h5>加入站点</h5>
        <b-form-group id="input-group-4" style="max-height: 400px;overflow-y: scroll;">
          <b-form-checkbox-group v-model="selected" id="checkboxes-4" style="text-align: left;">
            <b-form-checkbox :value="site.id" v-for="site in normalSiteItems" :key="site.id">{{site.name}}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button @click="passMemberAudit" style="width: 120px;">确定审核通过</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-fail" size="xs" centered hide-header hide-footer>
      <div>
        <p>不通过原因</p>
      </div>
      <div>
        <textarea name="fail-reason" v-model="refuseReason" cols="30" rows="10"></textarea>
      </div>
      <b-button @click="refuse">确定</b-button>
    </b-modal>

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

  export default {
    name: "AuditCenter",
    data() {
      return {
        showPlate: 'a',
        selected: [],
        totalPage: 0,
        cpage: 1,
        currentMemberId: '',
        currentSiteId: '',
        refuseReason: '',
        memberItems: [],
        siteItems: [],
        normalSiteItems: [],
        AuditMemberNum:0,  //成员进群审核 数量
        AuditSiteNum:0     //建站审核 数量
      }
    },
    watch: {
      '$route': 'fetchData',
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      plateSwitch(p) {
        this.showPlate = p;
        this.$router.push(this.$route.path);
        this.fetchData();
      },
      // 成员审核通过
      passMemberAudit() {
        let body = {
          user_id: this.currentMemberId,
          join_web: this.selected
        };
        http.passMemberAudit(body).then(rs => {
          if (!rs.code) {
            this.$bvModal.hide('modal-join-group');
            this.$toast.success({
              message:"审核通过",
              color:'#3cb5f1'
            });
            this.fetchData();
          }
        });
      },
      //站点审核通过
      passSiteAudit(id) {
        http.passSiteAudit(id).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message:"审核通过",
              color:'#3cb5f1'
            });
            this.fetchData();
          }
        });
      },
      showPassModal(id) {
        this.currentMemberId = id;
        this.$bvModal.show('modal-join-group');
      },
      showRefuseModal(id) {
        if (this.showPlate === 'a') {
          this.currentMemberId = id;
        } else {
          this.currentSiteId = id;
        }
        this.$bvModal.show('modal-fail');
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;
        if (this.showPlate === 'a') {
          this.getAuditMemberList();
        } else {
          this.getAuditSiteList();
        }
      },
      //获取待审核成员列表
      getAuditMemberList() {
        http.getAuditMemberList(this.cpage).then(rs => {
          if (!rs.code) {
            this.memberItems = rs.data;
            this.AuditMemberNum = rs.data.length;
            this.totalPage = Math.ceil(rs.total / 19);
            http.getAuditSiteList(this.cpage).then(rs2 => {
              if (!rs2.code) {
              this.AuditSiteNum = rs2.data.length;
              this.$store.commit('setAmount',  this.AuditMemberNum+this.AuditSiteNum);
              }
            })
          }
        });
      },
      getAuditSiteList() {
        http.getAuditSiteList(this.cpage).then(rs => {
          if (!rs.code) {
            this.siteItems = rs.data;
            this.AuditSiteNum = rs.data.length;
            this.totalPage = Math.ceil(rs.total / 19);
            this.$store.commit('setAmount',  this.AuditMemberNum+this.AuditSiteNum);
          }
        });
      },
      //获取审核的数量
      getListNum(){
        http.getAuditMemberList(this.cpage).then(rs => {
          if (!rs.code) {
            this.AuditMemberNum = rs.data.length;
          }
        });
        http.getAuditSiteList(this.cpage).then(rs => {
          if (!rs.code) {
            this.AuditSiteNum = rs.data.length;
          }
        });
      },
      //审核不通过
      refuse() {
        if (!this.refuseReason.trim()) {
          this.$toast.success({
            message:"请输入不通过原因",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          reason_refuse: this.refuseReason
        };
        if (this.showPlate === 'a') {
          body['user_id'] = this.currentMemberId;
          //拒绝加入站群
          http.refuseMemberJoin(body).then(rs => {
            if (!rs.code) {
              this.currentMemberId = '';
              this.refuseReason = '';
              this.$bvModal.hide('modal-fail');
              this.$toast.success({
                message:"拒绝审核通过",
                color:'#3cb5f1'
              });
              this.fetchData();
            }
          });
        } else {
          body['id'] = this.currentSiteId;
          http.refuseSiteAudit(body).then(rs => {
            if (!rs.code) {
              this.$bvModal.hide('modal-fail');
              this.$toast.success({
                message:"拒绝审核通过",
                color:'#3cb5f1'
              });
              this.fetchData();
            }
          })
        }
      },
      getGroupAllSiteList() {
        http.getGroupAllSiteList().then(rs => {
          if (!rs.code) {
            this.normalSiteItems = rs;
          }
        });
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`;
      },
    },
    mounted() {
      this.getListNum();
      this.fetchData();
      this.getGroupAllSiteList();
    }
  }
</script>

<style lang="scss" scoped>
  #audit-center {
    padding: 25px;
    min-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
  }

  .item-title {
    height: 40px;
    line-height: 40px;
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
      padding:0 20px;
      font-size: 16px;
      cursor: pointer;
      .tnum{
        font-size:14px;
        color:#ff0000;
      }

    }
    .title.on{
      padding-bottom: 9px;
      border-bottom:1px solid #3cb5f1;
    }
  }

  .mtb40 {
    margin: 40px auto;
  }
  .audit-switch {
    padding: 0;
    /*border-bottom: 2px solid #3cb5f1;*/

    div {
      background: #dcdcdc;
      line-height: 50px;
    }

    div.on, div:hover {
      color: #ffffff;
      background: #3cb5f1;
    }
  }

  .group-audit-list {
    .row {
      font-size: 14px;
      line-height: 50px;

      .col-4 {
        padding: 0;
        border: 1px solid #d2d2d2;
      }
    }

    .row:first-child {
      line-height: 50px;
      font-size: 16px;
    }

    .row:nth-child(odd) {
      background: #eeeeee;
    }

    button {
      background: #e60012;
      border: none;
      width: 70px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
    }

  }

  #modal-lg {
    button {
      width: 100px;
      background: #2a94de;
      border: none;
    }

  }

  .site-audit-list {
    .row:first-child{
      font-size: 16px;
    }
    .row {
      div {
        cursor: pointer;
        line-height: 50px;

        .processed {
          background: #3cb5f1
        }

        .unprocessed {
          background: #d2d2d2;
        }

        .processed, .unprocessed {
          color: #ffffff;
          float: right;
          line-height: 23px;
          padding: 2px 5px;
          display: block;
          position: inherit;
          top: 13px;
          border-radius: 5px;
        }
      }


      div:hover {
        color: #2a94de;
      }

      button {
        background: #e60012;
        border: none;
        width: 80px;
      }
    }

    .row:nth-child(odd) {
      background: #eeeeee;
    }
  }

  .modal-body button {
    margin-left: 80px;
    width: 80px;
  }

  #modal-join-group {
    h5 {
      font-size: 18px;
    }

    button {
      background: #3cb5f1;
      color: #ffffff;
      border: none;
      width: 80px;
      display: block;
      margin: 0 auto;
    }
  }

  #modal-fail {
    textarea {
      height: 100px;
      background: #f2f2f2;
      width: 100%;
    }

    button {
      margin: 0 auto;
      display: block;
      background: #3cb5f1;
      border: none;
      color: #ffffff;
      width: 100px;
    }

  }

  .glyphicon-point:after {
    content: "\25CF";
    color: red;
    position: absolute;
    bottom: 10px;
  }
</style>
