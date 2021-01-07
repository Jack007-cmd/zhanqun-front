<template>
  <div id="message-manage">
    <b-container fluid>
      <b-row>
        <b-col class="item-title" cols="12">
          <span class="title">留言管理</span>
        </b-col>
      </b-row>
      <div class="msg-div">
        <b-row>
          <b-col cols="1">序号</b-col>
          <b-col cols="1">昵称</b-col>
          <b-col cols="3">留言内容</b-col>
          <b-col cols="2">留言时间</b-col>
          <b-col cols="3">回复</b-col>
          <b-col cols="2">状态</b-col>
        </b-row>
        <b-row v-for="(item,index) in msgList" :key="item.id">
          <b-col cols="1">{{index+1}}</b-col>
          <b-col cols="1">{{item['user_name']}}</b-col>
          <b-col cols="3" class="omitting-something" :title="item.content">{{item.content}}</b-col>
          <b-col cols="2">{{item['created_at'].substring(0,16)}}</b-col>
          <b-col cols="3" class="omitting-something" :title="item.answer?item.answer.content:''">
            {{item.answer?item.answer.content:''}}
          </b-col>
          <b-col cols="2">
            <span class="unanswered" v-if="Object.keys(item.answer).length===0"
                  @click="showReplyModal(item.id)">未回复</span>
            <span class="replied" v-if="Object.keys(item.answer).length!==0">已回复</span>
            <span class="edit-reply" v-if="Object.keys(item.answer).length!==0"
                  @click="showUpdateModal(item.answer)">编辑回复</span>
          </b-col>
        </b-row>
      </div>
      <div v-if="totalPage>1" style="margin-top: 50px;">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                          align="center"></b-pagination-nav>
      </div>
    </b-container>
    <b-modal id="modal-reply" size="lg" body-bg-variant="light" centered hide-header hide-footer>
      <div class="div-reply">
        <p>回复</p>
        <p>
          <textarea v-model="currentMsg.answer.content"></textarea>
        </p>
        <b-button @click="replyGroupQuestion">确定</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-update" size="lg" body-bg-variant="light" centered hide-header hide-footer>
      <div class="div-reply">
        <p>回复</p>
        <p>
          <textarea v-model="currentAnswer.content"></textarea>
        </p>
        <b-button @click="updateReplyGroupQuestion">确定</b-button>
      </div>
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
    name: "MessageManage",
    data() {
      return {
        msgList: [],
        currentMsg: {
          id: '',
          answer: {
            content: ''
          }
        },
        currentAnswer: {},
        totalPage: 0,
        cpage: 1,
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getGroupQuestionList();  // 向后台发数据请求
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      showReplyModal(id) {
        this.currentMsg.id = id;
        this.currentMsg.answer['content'] = '';
        this.$bvModal.show('modal-reply');
      },
      showUpdateModal(answer) {
        this.currentAnswer = answer;
        this.$bvModal.show('modal-update');
      },
      getGroupQuestionList() {
        let params = {
          page: this.cpage,
          per_page: 23
        };
        http.getGroupQuestionList(params).then(rs => {
          if (!rs.code) {

            this.msgList = rs.data;
            this.totalPage = Math.ceil(rs.total / 23);
          }
        });
      },
      replyGroupQuestion() {
        if (!this.currentMsg.answer.content.trim()) {
           this.$toast.success({
             message:"请输入回复内容",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          question_id: this.currentMsg.id,
          content: this.currentMsg.answer.content
        };
        http.replyGroupQuestion(body).then(rs => {
          if (!rs.code) {

            this.$bvModal.hide('modal-reply');
            this.getGroupQuestionList();
          }
        });
      },
      updateReplyGroupQuestion() {
        if (!this.currentAnswer.content.trim()) {
           this.$toast.success({
             message:"请输入回复内容",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          id: this.currentAnswer.id,
          content: this.currentAnswer.content
        };
        http.updateReplyGroupQuestion(body).then(rs => {
          if (!rs.code) {

            this.$bvModal.hide('modal-update');
            this.getGroupQuestionList();
          }
        });
      }
    },
    mounted() {
      this.getGroupQuestionList();
    }
  }
</script>

<style lang="scss" scoped>
  #message-manage {
    padding: 25px;
    min-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    background: #ffffff;
    padding: 30px 50px ;
    border-radius: 10px;


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

    .msg-div {
      margin-top: 25px;
      .row:first-child {
        font-size: 16px;
        background: #eeeeee;
        line-height: 50px;
        border: 1px solid #eeeeee;

        div {
          padding: 0;
        }
      }

      .row {
        font-size: 14px;
        border-left: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;

        div {
          min-height: 40px;
          padding: 10px 0;
        }
      }
    }

    .edit-reply {
      margin-left: 10px;
    }

    .unanswered, .edit-reply {
      color: #2a94de;
      cursor: pointer;
    }
  }

  .div-reply {
    padding: 20px 50px;

    textarea {
      width: 100%;
      min-height: 200px;
    }

    button {
      background: #2a94de;
      border: none;
      width: 80px;
      display: block;
      margin: 0 auto;
    }
  }

  .omitting-something {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
