<template>
  <div id="member-manage">

    <b-container fluid>
      <b-row>
        <b-col class="item-title" cols="12">
          <span class="title">成员管理</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb200">
          <b-row>
            <b-col cols="12" style="float: left;text-align: center;line-height: 50px;">
              <input id="search" v-model="name" type="text" @change="queryData">
              <b-button class="btn-search" @click="queryData">搜索</b-button>
            </b-col>
          </b-row>
          <!--<b-row>-->
            <!--<b-col cols="6" style="float: left;text-align: left;line-height: 50px;">站群名称（{{total}}人）</b-col>-->
          <!--</b-row>-->
        </b-col>
      </b-row>

      <b-row >
        <b-col cols="11" class="memberList">
          <b-row>
            <b-col cols="1">昵称</b-col>
            <b-col cols="2">邮箱</b-col>
            <b-col cols="2">进群时间</b-col>
            <b-col cols="2">创建站点</b-col>
            <b-col cols="2">加入站点</b-col>
            <b-col cols="3">操作</b-col>
          </b-row>

          <b-row v-for="(item,index) in memberItems" :key="item.id">
            <b-col cols="1">{{item.name}}</b-col>
            <b-col cols="2">{{item.email}}</b-col>
            <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            <b-col cols="2">{{item['create_site']}}
            </b-col>
            <b-col cols="2">{{item['join_site']}}</b-col>
            <b-col cols="3">
              <template v-if="!(user.id===item.id && item.role===99)">
                <span @click="viewPermission(item.id)">查看</span>
                <span  @click="setPermission(item.id)">设置</span>
                <b-button class="btn-cancel-manager" @click="cancelAdmin(item)" v-show="role===99 && item.role===1">取消管理员</b-button>
                <b-button class="btn-set-manager" @click="setAdmin(item)" v-show="role===99 && item.role===0">设为管理员</b-button>
                <span @click="transferOwner(item)" v-show="role===99  && item.role!==99">转让</span>
                <span @click="removeMember(item)" v-show="item.role!==99">移出</span>
              </template>
            </b-col>
          </b-row>
        </b-col>
      </b-row>


      <b-modal id="modal-view" size="lg" centered hide-header hide-footer>
        <div class="mtb20" style="text-align: center;">
          <table>
            <tr>
              <td>昵称：</td>
              <td>{{memberDetail.name}}</td>
            </tr>
            <tr>
              <td>邮箱：</td>
              <td>{{memberDetail.email}}</td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">创建站点：</td>
              <td><template v-for="item in memberDetail['create_web']">{{item.name}}（{{item.domain}}） </template></td>
            </tr>
            <tr>
              <td style="vertical-align: baseline;">加入站点：</td>
              <td><template v-for="item in memberDetail['join_web']">{{item.name}}（{{item.domain}}） </template></td>
            </tr>
            <tr>
              <td>权限配置：</td>
              <td>建站数量 {{max_site_create?max_site_create:0}}个</td>
            </tr>
            <tr>
              <td>建站类型：</td>
              <td style="padding-top: 18px;line-height: 20px;">
                <b-form-group id="input-group-4">
                  <b-form-checkbox-group v-model="selected" id="checkboxes-4" style="text-align: left;">
                    <b-form-checkbox disabled v-for="item in typeList" :key="item.id" :value="item.id">{{item.name}}</b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
              </td>
            </tr>
          </table>

          <b-button @click="$bvModal.hide('modal-view')">返回</b-button>
        </div>
      </b-modal>

      <b-modal id="modal-set-permissions" size="lg" centered hide-header hide-footer>
        <p>设置</p>
        <table cellpadding="12" border="1" cellspacing="0">
          <tr>
            <td>用户行为</td>
            <td>规则说明</td>
            <td>状态</td>
          </tr>
          <tr>
            <td>用户建站</td>
            <td>限制用户建站数量</td>
            <td><input type="text" style="text-align: center;" v-model="max_site_create"></td>
          </tr>
          <tr>
            <td>用户建站</td>
            <td>限制用户建站类型</td>
            <td>
              <b-form-group id="input-group-4">
                <b-form-checkbox-group v-model="selected" id="checkboxes-4">
                  <b-form-checkbox v-for="item in typeList" :key="item.id" :value="item.id">{{item.name}}</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </td>
          </tr>
        </table>
        <b-button @click="updateUserRuleDetail">确定</b-button>
      </b-modal>

      <div class="overflow-auto" style="margin-top: 50px;"  v-if="totalPage>1">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
      </div>
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

  export default {
    name: "MemberManage",
    data() {
      return {
        user:{},
        role: null,
        max_site_create: 0,
        selected:[],
        msg: '这里是成员管理',
        memberItems: [],
        memberDetail:{},
        totalPage: 0,
        cpage: 1,
        name: '',
        total:0,
        typeList:[],
        current_id:""
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      viewPermission(uid){
        this.getUserInfoDetail(uid);
        this.getUserRuleDetail(uid);

        this.$bvModal.show('modal-view');
      },
      setPermission(uid){
        this.getUserRuleDetail(uid);
        this.$bvModal.show('modal-set-permissions');
      },
      //   <b-button class="btn-set-manager" @click="setAdmin(item.id)" v-show="role===99">设为管理员</b-button>
      //   &nbsp;&nbsp;<span @click="removeMember(item.id)">移出</span>
      // &nbsp;&nbsp;<span @click="transferOwner(item.id)"  v-show="role===99">转让</span>
      //  设置为管理员
      setAdmin(member) {
        if (confirm('确定设置' + member.name + '为管理员吗？')) {
          http.setAdmin(member.id).then(rs => {
            if (!rs.code) {
              // window.location.reload();
              this.fetchData();
            }
          });
        }
      },
      //取消管理员
      cancelAdmin(member) {
        if (confirm('确定取消' + member.name + '管理员身份吗？')) {
          http.setUser(member.id).then(rs => {
            if (!rs.code) {
              // window.location.reload();
              this.fetchData();
            }
          });
        }
      },
      //移出成员
      removeMember(member) {
        if (confirm('确定将' + member.name + '移出站群吗？')) {
          http.removeMember(member.id).then(rs => {
            if (!rs.code) {
              // 移出完毕
              this.fetchData();
            }
          }, err => {
          });
        }
      },
      //转让群主
      transferOwner(member) {
        if (confirm('确定将群主转让给' + member.name + '吗？')) {
          http.transferMaster(member.id).then(rs => {
            if (!rs.code) {
              // 群主转让完毕身份变成普通成员，页面跳转到普通成员数据中心
            //注意：此处页面跳转到普通成员数据中心
              this.$store.commit('setRole', 0);
              this.$router.push('/dashboard/my-group/private-data-center');
            }
          }, err => {
          });
        }
      },
      fetchData() {
        this.cpage= Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getGroupMemberList();
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`;
      },
      getGroupMemberList() {
        let params = {
          page:this.cpage,
          per_page:17
        };
        if (this.name.trim()) {
          params['name'] = this.name.trim();
        }
        http.getGroupMemberList(params).then(rs => {
          if (!rs.code) {

            this.memberItems = rs.data;
            this.total = rs.total;
            this.totalPage = Math.ceil(rs.total / 17);
          }
        });
      },
      getUserInfoDetail(id){
        http.getUserInfoDetail({user_id:id}).then(rs=>{
          if(!rs.code){
            this.memberDetail = rs;
          }
        });
      },
      getUserRuleDetail(uid) {
        this.current_id = uid;
        let body={
          user_id:uid
        };
        http.getUserRuleDetail(body).then(rs=>{
          if(!rs.code){
            this.selected = rs['types_site_create'].split(",");
            this.max_site_create = rs['max_site_create'];
          }
        });
      },
      updateUserRuleDetail(){
        let body={
          user_id:this.current_id,
          max_site_create:this.max_site_create,
          types_site_create:this.selected
        };
        http.updateUserRuleDetail(body).then(rs=>{
          if(!rs.code){
            this.$bvModal.hide('modal-set-permissions');
            this.$toast.success({
              message:"保存成功！",
              color:'#3cb5f1'
            });
          }
        });
      },
      //获取站点类型列表
      getUseSiteType() {
        http.getUseSiteType().then(rs => {
          if (!rs.code) {
            this.typeList = rs;
          }
        });
      },
    },
    mounted() {
      if (this.$store.getters.role) {
        this.role = this.$store.getters.role;
      }
      this.user = this.$store.getters.user;
      this.fetchData();
      this.getUseSiteType();
    }
  }
</script>

<style lang="scss" scoped>
  #member-manage {
    padding: 25px;
    min-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    padding: 30px;
    background: #ffffff;
    border-radius: 10px;
  }

  .item-title {
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;

    .title {
      margin-left: 20px;
    }
  }

  .mtb20 {
    margin: 20px auto;
    padding: 0;
  }

  .mtb200 {
    margin: 20px auto 0;
  }

  /*button {*/
  /*width: 80px;*/
  /*background: #e70012;*/
  /*border: none;*/
  /*!*margin-left: 50px;*!*/
  /*}*/

  #search {
    /*width: 100%;*/
    width: 600px;
    height: 36px;
    border-radius: 5px;
    border: 1px solid #d2d2d2;
    background: #f2f2f2;
    padding-left: 10px;
  }

  .memberList {
    margin: 30px auto;

    .row {
      font-size: 14px;
      line-height: 50px;
      border-bottom: 1px solid #dcdcdc;
      border-right: 1px solid #dcdcdc;
      border-left: 1px solid #dcdcdc;
    }

    .row:first-child {
      font-size: 16px;
      background: #eeeeee;
    }

    .btn-cancel-manager, .btn-set-manager {
      background: #3cb5f1;
      line-height: 15px;
      width: 105px;
      cursor: pointer;
      margin-left: 10px;
      border: none;
    }

    span:first-child{
      margin-left: 0;
    }
    span {
      background: #c9c9c9;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;
    }
  }

  #modal-view .modal-body {
    text-align: center;
  }

  #search {
    background: #ffffff;
    border: 1px solid #c9c9c9;
  }

  #count {
    background: #ffffff;
    width: 34px;
    height: 26px;
    border: 1px solid #c9c9c9;
  }

  .btn-search {
    background: #2a94de;
    border: none;
    width: 100px;
    margin-top: -5px;
  }

  #modal-view {
    tr {
      line-height: 35px;

      td:first-child {
        width: 100px;
        text-align: right;
      }

      td:last-child {
          text-align: left;
         font-size:14px
        }
    }

    button {
      margin: 30px 20px 10px 20px;
      background: #2a94de;
      border: none;
      width: 100px;
    }
  }

  #modal-set-permissions {
    padding: 30px 50px;

    p {
      text-align: center;
    }

    table {
      tr {
        td:first-child {
          width: 25%;
        }

        td:nth-child(even) {
          width: 35%;
        }

        td {
          text-align: center;
        }
      }
    }

    input {
      width: 65px;
    }

    #checkboxes-4 {
      text-align: left;
    }

    button {
      margin: 50px auto 10px;
      display: block;
      background: #2a94de;
      border: none;
      width: 100px;
    }
  }
</style>
