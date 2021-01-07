<template>
  <div id='home'>
    <b-container fluid>

      <b-row style="width: 1205px;margin: 0 auto;">
        <b-col style="margin:139px auto 0 ;" cols="12">
          <b-row>
            <b-col cols="12" style="padding: 0;">

              <div class="form-div">
                <!--<b-form inline>-->
                <div class="input-group">
                  <input type="text" class="form-control" id="search" @change="queryGroup" autocomplete="off" placeholder="输入站群标识">
                  <span class="input-serch"  @click="queryGroup"></span>
                </div>
                <b-button class="b-create" v-b-modal.modal-create-group>建群申请
                </b-button>
              </div>
            </b-col>
          </b-row>



          <b-row id="own-group" style="margin-top: 94px;" v-if="groupList.length>0">
            <b-col cols="3"  v-for="(item,index) in groupList" :key="item.id">
              <!--<b-card-->
              <!--img-alt="Image"-->
              <!--img-top-->
              <!--class="mb-2"-->
              <!--@click="toNext(0,item)"-->
              <!--&gt;-->
              <!--<b-card-img v-lazy="item.logo" :key="item.logo" class="rounded-0"></b-card-img>-->
              <!--<b-card-text>-->
              <!--{{item.name}}-->
              <!--</b-card-text>-->
              <!--</b-card>-->

              <div class="card mb-2" @click="toNext(0,item)">
                <div class="card-body">
                  <div class="image-layer">
                    <img class="rounded-0 card-img" v-lazy="item.logo" :key="item.logo">
                    <!-- <span v-if="item.pivot.role===1" class="iconfont icon-guanliyuan"></span> -->
                    <!-- <span v-if="item.pivot.role===99" class="iconfont icon-guanliyuan1"></span> -->
                  </div>
                  <div class="card-nec">
                    <p class="card-text">{{item.name}}</p>
                    <span v-if="item.pivot.role===1" class="iconc iconc_gly"></span>
                    <span v-if="item.pivot.role===99" class="iconc iconc_glys"></span>                    
                  </div>
                </div>
              </div>
            </b-col>
            </b-row>
            <b-row id="own-group" style="margin-top: 94px;" v-else>
              <b-col cols="3">
                <div class="card mb-2">
                  <div class="card-body">
                    <div class="image-layer">
                      <img style="width:118px;height:118px;position:absolute;left:42.5px;top:8px;" class="rounded-0 card-img" src="../../assets/imgs/no-station-group.png">
                    </div>
                    <div class="card-nec">
                      <p class="card-text">未创建站群</p>                 
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
            

          <b-row id="publish-group" style="display:none;margin-top: 15%;">
            <b-col cols="8" style="background: #c9c9c9;opacity: .9;padding: 10px;margin: 0 auto;">
              <div style="background: #ffffff;opacity: .9;">
                <b-row>
                  <b-col cols="12" style="height: 30px;display: block;">
                    <span class="audit-span" v-if="currentGroup['is_join']===1">审核中</span>
                  </b-col>
                </b-row>
                <b-row style="padding: 0 30px;">
                  <b-col>
                    <b-card no-body style="max-width: 540px;border: none;">
                      <b-row no-gutters>
                        <b-col md="2">
                          <b-card-img
                            v-lazy="currentGroup.logo" :key="currentGroup.logo"
                            style="height: 70px;width: 100px;"
                            class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="10">
                          <b-card-body :title="currentGroup.name">
                            <b-card-text>
                              ID：{{currentGroup.identify}}
                            </b-card-text>
                          </b-card-body>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;padding-right: 30px;">
                  <b-col cols="2" style="text-align: right;">站群介绍：</b-col>
                  <b-col cols="10" style="text-align: left;">
                    {{currentGroup.description}}
                  </b-col>
                </b-row>
                <b-row style="margin-top: 10px;padding-right: 30px;">
                  <b-col cols="2" style="text-align: right;">站群概括：</b-col>
                  <b-col cols="10" style="text-align: left;">
                    站群成员{{currentGroup['user_num']}}个 <br>
                    站点数量{{currentGroup['web_num']}}个
                  </b-col>
                </b-row>
                <b-row style="padding-bottom: 30px">
                  <b-col cols='12'>
                    <!--<b-button v-if="!currentGroup.role" @click="joinGroup(currentGroup.id)">加入</b-button>-->
                    <b-button v-if="currentGroup['is_join']===-1" v-b-modal.modal-join-group>加入</b-button>
                    <b-button v-if="currentGroup['is_join']===0 " @click="toNext(0, currentGroup) ">进入站群管理</b-button>
                    <b-button   @click="backToHome" style="margin-left: 10px;">返回用户中心</b-button>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </b-container>

    <!--招募令飘窗-->
    <b-container fluid style="background: transparent!important;">
      <b-row>
        <b-col id="bay-window" cols="2">
          <img src="../../assets/imgs/recruit.png" height="168" width="199" @click="toRecruit"/>
        </b-col>
        <b-col class="back-window" cols="2">
          <span class="btn-back" @click="back"><i class="iconfont icon-fanhui"></i> 返回</span>
        </b-col>
      </b-row>

    </b-container>

    <b-modal id="modal-once" size="lg" centered hide-header hide-footer>
      <div class="div-join-group">
        <h4>您可以选择</h4>
        <span>
          <b-button v-b-modal.modal-create-group @click="$bvModal.hide('modal-once')">申请站群</b-button>
          <b-button v-b-modal.modal-join-group @click="$bvModal.hide('modal-once')">加入站群</b-button>
        </span>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <span style="border-bottom: 1px solid #aaaaaa;float: right;"
              @click="$bvModal.hide('modal-once')">暂不加入站群，先看看吧</span>
      </div>
    </b-modal>

    <b-modal id="modal-join-group" size="xs" body-bg-variant="light" centered hide-header hide-footer>
      <div class="div-join-group">
        <h4>加入站群</h4>
        <p style="text-align: left;padding-left: 10%;">加入理由</p>
        <p>
          <textarea name="" v-model="reason_apply" style="width: 80%;min-height: 100px;"></textarea>
        </p>
        <b-button @click="joinGroup">确定</b-button>
        <b-button @click="$bvModal.hide('modal-join-group')">返回</b-button>
      </div>
    </b-modal>

    <b-modal id="modal-create-group" size="lg" centered hide-header hide-footer>
      <h4
        style="margin-top: 10px;border-bottom: 1px solid #d3d3d3;padding-bottom: 10px;padding-left: 20px;font-size: 22px;">
        建群申请</h4>
      <div class="div-create-group">
        <table cellpadding="10">
          <tr>
            <td>建群名称:</td>
            <td><input id="site-name" type="text"></td>
          </tr>
          <tr>
            <td>建群logo:</td>
            <td>
              <label class="btn btn-orange" for="uploads"
                     style="background: #e5e5e5;display:inline-block;width: 100px;padding: 0;text-align: center;line-height: 28px;">+选择图片</label>
              <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1)">
              <img v-lazy="img" :key="img" alt="" v-if="img" style="width: 50px;height: 50px;">
            </td>
          </tr>
          <tr>
            <td>建群描述:</td>
            <td>
              <b-form-textarea
                id="site-desc"
                size="lg"
              ></b-form-textarea>
            </td>
          </tr>
        </table>
        <b-button @click="createGroup">确定</b-button>
        <b-button @click="$bvModal.hide('modal-create-group')">返回</b-button>
      </div>
    </b-modal>

    <b-modal id="modal-msg-create" size="lg" centered hide-header hide-footer>
      <div style="text-align: center;">
        <p>申请提交成功，系统将会在24小时内审核！不如先加入心仪站群吧！</p>
        <b-button @click="hideMsg">确定</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-msg-join" size="lg" centered hide-header hide-footer>
      <div style="text-align: center;">
        <p>申请提交成功，系统将会在24小时内审核！</p>
        <b-button @click="hideMsg">确定</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import * as http from '../../../apis/net'

  export default {
    name: "Home",
    data() {
      return {
        dismissSecs: 200,
        dismissCountDown: 0,
        msg: '',
        groupList: [],
        currentGroup: {
          logo: ''
        },
        reason_apply: '',
        form: {
          checked: false
        },
        recruitItems: [],
        imgFile: '',
        fileName: '',  //本机文件地址
        img: '',
        tempFile: ''
      }
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      //申请加入站群
      joinGroup() {
        // id	站群id	是	[int]	51	查看
        // 2	from	加入来源 0=默认 1=招募令 2=标识搜索	是	[int]	1	查看
        // 3	reason_apply	加入理由
        if (!this.reason_apply) {
          this.$toast.success({
            message:"请输入加入理由",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          'id': this.currentGroup.id,
          'from': 2,
          'reason_apply': this.reason_apply
        };
        http.joinGroup(body).then(rs => {
          if (!rs.code) {
            this.reason_apply = '';
            //
            this.$bvModal.hide('modal-join-group');
            this.$bvModal.show('modal-msg-join');
          }
        });
      },
      //返回用户中心
      backToHome() {
        $("#search").val('');
        this.currentGroup = {};
        $("#own-group").show();
        $("#publish-group").hide();
        window.location.reload();
      },
      //根据站群标志检索站群
      queryGroup() {
        let identify = $('#search').val();
        if (!identify) {
          this.$toast.success({
            message:"请输入站群标志检索站群",
            color:'#3cb5f1'
          });
          return;
        }
        http.queryGroup(identify).then(rs => {
          if (!rs.code) {
            if (rs.length > 0) {
              $("#own-group").hide();
              $("#publish-group").show();
              this.currentGroup = rs[0];
            } else {
              this.$toast.success({
                message:"没有找到您要的站群",
                color:'#3cb5f1'
              });

            }
          }
        });
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
            _this.img = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);

      },
      //申请建群
      createGroup() {
        if (!$('#site-name').val()) {
          this.$toast.success({
            message:"请填写站群名称",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.img) {
          this.$toast.success({
            message:"请选择站群logo",
            color:'#3cb5f1'
          });
          return;
        }
        if (!$('#site-desc').val()) {
          this.$toast.success({
            message:"请填写建群描述",
            color:'#3cb5f1'
          });
          return;
        }
        let _this = this;
        let formData = new FormData();
        formData.append('name', $('#site-name').val());
        formData.append('logo', _this.tempFile);
        formData.append('description', $('#site-desc').val());
        http.createGroup(formData).then(rs => {
          if (!rs.code) {
            _this.$bvModal.hide('modal-create-group');
            if(rs['is_group_create_audit']){
            _this.$bvModal.show('modal-msg-create');
            }else{
              _this.$toast.success({
                message:"建群成功！",
                color:'#3cb5f1'
              });
              window.location.reload();
            }
          }
        });
      },
      hideMsg() {
        window.location.reload();
        this.$bvModal.hide('modal-msg-create');
      },
      //点击+前往招募令
      toRecruit() {
        this.$router.push("/dashboard/recruit-list");
      },
      toDetail(id) {
        this.$router.push('/dashboard/recruit-detail?id=' + Number(id));
      },
      toNext(state, item) {
        //群主、管理员进入数据中心
        //成员进入站点管理
        // 角色（0普通成员，1管理员，99群主）
        //state	站群状态（0=正常 1=待审 2=拒绝）
        if (state === 0) {
          this.$store.commit('setIdentify', item.id);
          this.$store.commit('setRole', item.pivot.role);
          if (item.pivot.role === 0) {
            this.$router.push('/dashboard/my-group/private-data-center');
          } else if (item.pivot.role === 1 || item.pivot.role === 99) {
            this.$router.push('/dashboard/my-group/data-center');
          }
        }
      }
    },
    mounted() {
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
    }
  }
</script>

<style lang="scss" scoped>
  #home {
    /*min-height: 100vh;*/
    min-height: calc(100vh - 69px);
    max-height: 100%;
    background: url("../../assets/imgs/home-bg.png") no-repeat #000000;
    background-position: top;
    background-size: cover;
    width: 100%;
  }

  /*.container{*/
  /*padding-top: 30px;*/
  /*background: #000000;*/
  /*}*/

  .item-title {
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #1183bf;

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
      margin-left: 20px;
    }
  }

  .overview-item {
    line-height: 120px;
    height: 120px;
    background: #ffffff;

    .left {
      width: 48%;
      display: inline-block;
    }

    .right {
      width: 25%;
      display: inline-block;
      line-height: 70px;
      color: #ffffff;
      margin-right: 25%;
      border-radius: 10px;
    }
  }

  .audit-span {
    right: 15px;
    position: absolute;
    display: block;
    background: #e60012;
    z-index: 1;
     top: 0;
    color: #ffffff;
    border-radius: 5px;
    padding: 0 5px;
  }

  /*.triangle {*/
  /*position: relative;*/
  /*width: 0px;*/
  /*height: 0px;*/
  /*border-color: transparent #d86b2c;*/
  /*border-width: 0px 0px 20px 20px;*/
  /*border-style: solid;*/
  /*}*/

  #own-group {
    .card {
      width: 203px;
      height: 134px;
      border: none;
      background: #eeeeee;
      margin-top:8px; 
      /*max-width: 20rem;*/
      // padding-top: 18px;
      // padding-left: 24px;
      // background: linear-gradient(135deg, transparent 15px, #ffffff 0) left;
      border-radius: 0;

      img {
        width: 100%;
        height: 100%;
        // border-radius: 5px;
        border: 1px solid #eeeeee;
      }

      .card-body {
        padding: 0;
      }

      .card-nec{
        position: relative;
        width: 100%;
        height: 44px;
        overflow: hidden;
        .iconc{
          position: absolute;
          right: 0;
          top: 10px;
          width: 25px;
          height: 25px;
        }
        .iconc_gly{
              background: url("../../assets/imgs/group-owner.png") no-repeat;
        }
       .iconc_glys{
              background: url("../../assets/imgs/member.png") no-repeat;
        }        
      }
      
      .card-text {
        color: #555555;
        text-align: center;
        line-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
      }
    }

    .col-3 {
      flex: 0 0 6px;
      margin-bottom: 26px;
      width: 222px;
      height: 188px;
      background: #ffffff;
      margin-right: 22px;
      padding: 0 9.5px; 
      /*margin-top: 14px;*/
    }
    .col-3:nth-child(5n+5){
      margin-right: 0;

    }
  }

  .glyphicon-search:before {
    content: "\e003";
    color: #ffffff;
    font-size: 24px;
  }

  .glyphicon-user:before {
    content: "\e008"
  }

  .glyphicon-user, .glyphicon-people {
    float: right;
    position: relative;
    top: 20px;
    right: 4px;
  }

  .glyphicon-remove-circle:before {
    content: "\e088"
  }

  .glyphicon-people:before {
    content: '';
    background: url("../../assets/imgs/people.png") no-repeat 100%;
    width: 20px;
    height: 20px;
    display: block;
  }

  .recruit-title {
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid #dcdcdc;

    .title {
      display: block;
      text-align: left;
    }
  }

  .recruit-item {
    line-height: 50px;
    text-align: left;
    font-size: 12px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recruit-item, span {
    cursor: pointer;
  }


  .div-join-group, .div-create-group {
    text-align: center;
    width: 450px;
    margin: 0 auto;

    h4 {
      text-align: left;
      margin-bottom: 10px;
    }

    .custom-control {
      margin-bottom: 10px;
    }

    textarea.form-control {
      /*background: #eeeeee;*/
    }

    input {
      width: 300px;
      border: 1px solid #ced4da;
      border-radius: 5px;
    }

    button {
      background: #2a94de;
      /*min-width: 80px;*/
      min-width: 120px;
      color: #ffff;
      border: none;
      margin: 20px 0 5px;
    }

    table {
      tr {
        td:first-child {
          width: 90px;
          text-align: right;

        }

        td:last-child {
          text-align: left;
          font-size: 14px
        }
      }
    }
  }


  #bay-window {
    padding-left: 0;
    width: 300px !important;
    display: block;
    position: fixed;
    left: 0;
    bottom: 0;

    img {
      float: left;
      cursor: pointer;
    }
  }

  .container {
    width: 1205px !important;
  }


  .card .card-body {
    text-align: left;
    width: 100%;
    height: 100%;
  }

  .alert-danger {
    p {
      margin-bottom: 0;
    }
  }

  #publish-group {
    color: #000000;

    .card-body {
      padding-top: 0;

      h4 {
        font-size: 18px;
      }
    }

    button {
      background: #2a94de;
      border: none;
      min-width: 100px;
    }
  }

  .mb-2, .my-2 {
    margin-bottom: 0;
  }


  .form-div {
    display: inline-flex;

    button {
      margin-left: 15px;
      background: #01c36a;
      border: none;
      width: 108px;
      height: 41px;
      font-size: 16px;
      outline: none;
    }

    .input-group {
      position: relative;
      display: inline-block;
      border-collapse: separate;
      width: 565px;
      height: 41px;

      /*margin-left: 100px;*/
    }

    .input-group .form-control {
      position: relative;
      z-index: 2;
      // float: left;
      width: 565px;
      height: 41px;
      // display: table-cell;
      font-size: 14px;
      // opacity:0.2;
      color: #ffffff ;
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid #D2D2D2;
      border-radius: 5px;
      outline: none;
    }
    .form-control:focus { outline:none; } 
    input::-webkit-input-placeholder{
              color: #ffffff;
    }
    .input-group-addon {
      cursor: pointer;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      color: #555;
      text-align: center;
      background-color: #3cb5f1;
      border: 1px solid #3cb5f1;
      border-radius: 4px;
      display: table-cell;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 0;
    }

    .input-group-addon, .input-group-btn {
      width: 80px;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
  .input-serch{
      cursor: pointer;
      position: absolute;
      top: 2px;
      right: 8px;
      background: url("../../assets/imgs/search.png") no-repeat 100%;
      width: 36px;
      height: 36px;
      display: block;
      z-index: 99;
  }
  /deep/ #modal-create-group {
    .modal-body {
      width: 705px;
      height: 406px;
    }
  }

  /deep/ .card-body {
    .image-layer {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      span {
        color: #333333;
        position: relative;
        margin-top: -28px;
        display: block;
        float: right;
        font-size: 21px;
      }
    }
    // .image-layer:before {
    //   content: '';
    //   position: absolute;
    //   bottom: 0;
    //   right: 0;
    //   border: 0px solid;
    //   border-color: rgba(0, 0, 0, 0) #e3e3e3;
    //   border-right-width: 40px;
    //   border-top-width: 40px
    // }
  }
</style>
