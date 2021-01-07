<template>
  <div id="recruit-detail">
    <b-container fluid>
      <b-row>
        <b-col class="mtb20 recruit-info" cols="11">
          <b-row style="display: flex;">
            <!--<b-col cols="1">-->
            <div style="flex: 1;width: 15%;">
              <img v-lazy="detail.logo" style="width:90%;" alt="站群logo">
            </div>
            <div style="width: 85%;">
              <p>{{detail.name}}
                <b-button class="btn-join" id="join" v-if="detail['join_state']==='-1' ||detail['join_state']===2||detail['join_state']===3" v-b-modal.modal-join-group>加入</b-button>
                <b-button class="btn-join"  v-if="detail['join_state']===1" >审核中</b-button>
              </p>
              <p>ID：<span class="group-ID">{{detail.identify}}</span></p>
              <table>
                <tr>
                  <td ><span>站群介绍：</span></td>
                  <td style="background: #eeeeee;"><span>{{detail.description}}</span></td>
                </tr>
                <tr style="height: 10px;">
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><span>招募介绍：</span></td>
                  <td style="background: #eeeeee;"><span>{{detail['invite_content']}}</span>
                  </td>
                </tr>
              </table>
            </div>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mtb0" cols="11">
          <b-row>
            <b-col cols="12"><p style="text-align: left;">评论</p></b-col>
            <b-col cols="12"><textarea name="publish-comment" v-model="comment" style="width: 100%;height: 100px;"
                                       id="publish-comment"
                                       cols="30" rows="10"></textarea>
            </b-col>
            <b-col cols="12">
              <b-button id="publish" @click="leaveComments">发布</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="mtb20 comment-info" cols="11">
          <b-card v-for="(item,index) in commentList" :key="item.id">
            <b-media>
              <b-img :src="item.avatar" :onerror="errorImg" slot="aside"  width="50" height="50"></b-img>

              <h5 class="mt-0">{{item['user_name']}}</h5>
              <p class="time">
                <template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
              </p>
              <p>
               {{item['content']}}
              </p>

              <b-media v-if="Object.keys(item.answer).length!==0">
                <b-img slot="aside" :src="waiter" width="50" height="50" ></b-img>
                <h5 class="mt-0">客服</h5>
                <p class="time">
                  <template  v-if="item.answer['updated_at']">{{item.answer['updated_at'].substr(0,16)}}</template>
                </p>
                <p>
                  {{item.answer['content']}}
                </p>
              </b-media>
            </b-media>
          </b-card>
        </b-col>
      </b-row>

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

      <div style="padding-bottom: 20px;" v-if="totalPage>1">
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
    name: "RecruitDetail",
    data() {
      return {
        waiter:require('../../../assets/imgs/default-waiter.png'),
        errorImg: 'this.src="' + require('../../../assets/imgs/default-avatar.png') + '"',
        ID: '',
        comment: '',
        detail: {},
        reason_apply: '',
        commentList: [],
        totalPage: 0,
        cpage: 1
      }
    },
    watch: {

      $route() {
        this.cpage = Number(this.$route.query.page) || 1;
      },
      cpage() {
        this.fetchData()
      },
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //申请加入站群
      joinGroup() {
        // id	站群id	是	[int]	51	查看
        // 2	from	加入来源 0=默认 1=招募令 2=标识搜索	是	[int]	1	查看
        // 3	reason_apply	加入理由
        if (!this.reason_apply.trim()) {
          this.$toast.success({
            message:"请输入加入理由",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          'id': this.ID,
          'from': 1,
          'reason_apply': this.reason_apply
        };
        http.joinGroup(body).then(rs => {
          if (!rs.code) {
            this.reason_apply = '';
            //
            this.$bvModal.hide('modal-join-group');
            this.$toast.success({
              message:"加群申请提交成功,请耐心等待站群管理员审核",
              color:'#3cb5f1'
            });

            this.detail['join_state']='1';
          }
        });

      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?id=' + this.ID : `?id=` + this.ID + `&page=${pageNum}`
      },
      fetchData() {
        this.getAllComment();
      },
      getGroupRecruitDetail() {
        http.getGroupRecruitDetail(this.ID).then(rs => {
          if (!rs.code) {

            this.detail = rs;
          }
        });
      },
      getAllComment() {
        http.getAllComment(this.ID, this.cpage).then(rs => {
          if (!rs.code) {

            this.commentList = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      },
      leaveComments() {
        if (!this.comment.trim()) {
          this.$toast.success({
            message:"请填写评论内容",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          group_id: this.ID,
          content: this.comment.trim()
        };
        http.leaveComments(body).then(rs => {
          if (!rs.code) {

            this.comment = '';
            this.getAllComment();
            // window.location.reload();
          }
        });
      }
    },
    mounted() {
      this.ID = this.$route.query.id;
      this.getGroupRecruitDetail();
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #recruit-detail {
    max-height: 100%;
    min-height: 100vh;
    background: #000000;
    padding: 30px 150px;
  }

  .container-fluid {
    /*margin: 30px;*/
    background: #ffffff;
    color: #555555;
  }

  .mtb0 {
    margin: 0 auto;
  }

  .mtb20 {
    margin: 20px auto;
  }

  .recruit-info {
    img {
      width: inherit;
    }

    p, div {
      text-align: left;
    }
  }

  .btn-join{
    background: #e70012;
  }

  #publish {
    background: #3db5f1;
    margin-right: 20px;
  }

   #publish,.btn-join {
    float: right;
    width: 80px;
    color: #ffffff;
    border: none;
  }

  .comment-info {
    .media {
      h5, p {
        text-align: left;
        padding-right: 20px;
      }

      .media {
        border-top: 1px solid #959595;
        border-left: 1px solid #959595;
        border-right: 1px solid #959595;
        padding: 10px 0 0 10px;
        margin-right: 20px;
      }

      .media:last-child {
        border-bottom: 1px solid #959595;
        margin-bottom: 20px;
      }

      .time {
        margin-bottom: 5px;
      }
    }

    .card {
      border: none;
      margin-top: 20px;
      border-bottom: 1px solid #dcdcdc;
    }

    .card-body {
      padding: 0;
    }

    img {
      border-radius: 50%;
    }
  }

  .div-join-group {
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
      background: #eeeeee;
    }

    input {
      width: 300px;
    }

    button {
      background: #2a94de;
      min-width: 80px;
      min-width: 120px;
      color: #ffff;
      border: none;
      margin: 20px;
    }

  }

  table {
    width: 100%;

    tr {
      td:first-child {
        width: 90px;
        text-align: left;
      }

      td:last-child {
        text-align: left;
        font-size: 14px;
      }
    }
  }

  .group-ID {
    font-size: 14px;
  }
</style>
