<template>
  <div id="registe-mail">
    <b-container>
      <b-row>
        <b-col cols="2"><span class="glyphicon glyphicon-envelope"></span></b-col>
        <b-col cols="10">
          <h4>
            验证邮件已发送到邮箱{{email}}
          </h4>
          <p>请在2小时内点击邮箱中的链接继续注册</p>
          <b-button @click="viewMail">立即查收邮件</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="10">
          <h4>一直没有收到邮件？</h4>
          <p>请先检查是否在垃圾邮件中。如果还未收到，请&nbsp;&nbsp;&nbsp;&nbsp;<span class="mail-again" @click="sendActivateMail">点击重新发送邮件</span></p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import * as http from '../../apis/net'

  export default {
    name: "RegisteMail",
    data() {
      return {
        email:'',
        mailPage: ''
      }
    },
    methods: {
      viewMail() {
        if (!this.mailPage) {
          this.$toast.success({
            message:"抱歉!未找到对应的邮箱登录地址，请自己登录邮箱查看邮件！",
            color:'#3cb5f1'
          });
        } else {
          window.open(this.mailPage);
        }
        // window.location.href=this.mailPage;//前往邮箱查看邮件
        // this.$router.push('/register-activate');
      },
      sendActivateMail(){
        http.sendActivateMail().then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message:"重新发送邮件成功！请登录邮箱查看！",
              color:'#3cb5f1'
            });
          }
        });

      },
      getMailUrl(email){
        http.getMailUrl({email:email}).then(rs=>{
          if(!rs.code){
            this.mailPage = rs.url;
          }
        });
      }
    },
    mounted() {
      this.email = this.$route.query.email;
      this.getMailUrl(this.email);
    }
  }
</script>

<style lang="scss" scoped>
  #registe-mail {
    background: url("../assets/imgs/home-bg.png") no-repeat;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-position: top;
    background-size: cover;
    padding: 200px;
  }

  .container {
    padding: 30px;
    background: #ffffff;

    .row {
      padding: 20px 0;

      div:first-child {
        text-align: right;
      }

      div:last-child {
        text-align: left;
      }
    }

    .row:first-child {
      border-bottom: 1px dotted gray;
    }

    button {
      background: #2a94de;
      border: none;
      cursor: pointer;
    }

    .mail-again {
      cursor: pointer;
      background: white;
      padding: 5px;
      border: 1px solid gray;
      border-radius: 5px;
    }
  }

  .glyphicon-envelope:before {
    content: "\2709";
    font-size: 60px;
  }
</style>
