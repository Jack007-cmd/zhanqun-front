<template>
  <div id="reset-activate">
    <div class="outer" v-if="activate==='b'">
      <div class="reset-form">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-2" label="" label-for="input-2">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            <b-form-input
              id="input-2"
              v-model="form.pwd"
              required
              placeholder="新密码"
              type="password"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="" label-for="input-2">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            <b-form-input
              id="input-2"
              v-model="form.confirmPwd"
              required
              type="password"
              placeholder="确认新密码"
            ></b-form-input>
          </b-form-group>

          <b-button class="submit" type="submit" variant="primary">确定</b-button>
        </b-form>
      </div>
      <!--<div v-else class="reset-success">-->
      <!--<h1>重置成功！</h1>-->
      <!--<br>-->
      <!--<br>-->
      <!--<br>-->
      <!--<br>-->
      <!--<span><router-link to="/login">返回></router-link></span>-->
      <!--</div>-->
    </div>
    <b-container v-if="activate==='c'">
      <b-row class="fail">
        <b-col cols="12">
          <b-row style="border-bottom: 1px dotted gray;">
            <b-col cols="6">
              <span class="glyphicon glyphicon-remove-circle"></span>
            </b-col>
            <b-col cols="6">
              <p style="line-height: 60px;font-size: 28px;">链接已失效！</p>
            </b-col>
          </b-row>
          <b-row style="margin-top: 20px;">
            <b-col cols="12" style=" text-align: center;">
              <span class="return-platform" @click="fail">
              返回到平台>>
              </span>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import * as http from '../../apis/net'

  export default {
    name: "ResetActivate",
    data() {
      return {
        activate: 'a',
        token: null,
        form: {
          pwd: '',
          confirmPwd: ''
        }
      }
    },
    methods: {
      fail() {
        this.$router.push('/platform-intro');
      },
      onSubmit(evt) {
        evt.preventDefault();
        if (!this.form.pwd) {
          this.$toast.success({
            message:"请输入新密码",
            color:'#3cb5f1'
          });
          return;
        }else{
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.form.pwd)){
            this.$toast.success({
              message:"确认新密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });
            return;
          }
        }
        if (!this.form.confirmPwd) {
          this.$toast.success({
            message:"请输入确认新密码",
            color:'#3cb5f1'
          });
          return;
        }else{
          let patrn = /^[A-Za-z0-9]{6,18}$/;
          if (!patrn.test(this.form.confirmPwd)){
            this.$toast.success({
              message:"确认新密码格式不正确，请重新输入",
              color:'#3cb5f1'
            });

            return;
          }
        }
        if(this.form.confirmPwd!==this.form.pwd){
          this.$toast.success({
            message:"两次密码输入不一致，请重新输入",
            color:'#3cb5f1'
          });
          return;
        }
        let body = {
          token: this.token,
          password: this.form.pwd,
          confirm_password: this.form.confirmPwd
        };
        http.resetPwd(body).then(rs => {
          if (!rs.code) {

            this.$router.push('/platform-intro');
          }
        });
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
        });
      }
    },
    mounted() {
      this.token = this.$route.query.t;
      let body={
        token:this.token
      };
      //  判断链接是否失效
      http.checkToken(body).then(rs=>{
        if(!rs.code){
          this.activate='b';
        }else{
          this.activate='c';
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  #reset-activate {
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

  .outer {
    width: 450px;
    margin: 9% auto;
  }

  .reset-form {
    padding: 30px;
    background: #0d4280;
  }

  .form-group {
    margin: 35px 0;
  }

  .submit {
    width: 388px;
    background: #1aabff;
  }

  input {
    background: #0d4280;
    border: 1px solid #04a5fa;
    color: #ffff;
    padding-left: 50px;
  }

  input::placeholder {
    color: #ffff;
  }

  .glyphicon-lock:before {
    content: "\e033"
  }

  .glyphicon-user:before {
    content: "\e008"
  }

  .glyphicon-user, .glyphicon-lock {
    color: #ffff;
    float: left;
    position: relative;
    top: 26px;
    left: 20px;
  }

  .glyphicon-remove-circle:before {
    content: "\e088";
    font-size: 60px;
    color: #2a94de;
  }

  .container {
    padding: 30px;
    background: #ffffff;
  }

  .fail {
    height: 200px;
    padding-top: 70px;

    .row {
      div:first-child {
        text-align: right;
      }

      div:last-child {
        text-align: left;
      }
    }

    .return-platform {
      font-size: 18px;
      cursor: pointer;
    }
  }
</style>
