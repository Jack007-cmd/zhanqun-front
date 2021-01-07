<template>
  <div id="registe-activate">
    <b-container>
      <b-row v-show="activate" class="success">
        <b-col cols="12" >
          <div>
          <p style="text-align: center;"> <span class="glyphicon glyphicon-ok-circle"></span><span style="font-size: 24px;display: inline-block;vertical-align: top;color: #000000;">&nbsp;&nbsp;恭喜您注册成功！</span></p>
          </div>
        </b-col>
        <b-col cols="12">
          <b-button @click="success" style="display:block;margin: 0 auto;">确定</b-button>
        </b-col>
      </b-row>
      <b-row v-show="!activate" class="fail">
        <b-col cols="12">
          <b-row style="border-bottom: 1px dotted gray;">
            <b-col cols="12">
              <p  style="text-align: center;"><span class="glyphicon glyphicon-remove-circle"></span><span style="font-size: 24px;display: inline-block;vertical-align: top;color: #000000;">&nbsp;&nbsp;链接已失效！</span></p>
            </b-col>
          </b-row>
          <b-row style="margin-top: 20px;">
            <b-col cols="12" style=" text-align: center;">
              <span class="return-platform" @click="fail">返回到平台>>
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
    name: "RegisteActivate",
    data() {
      return {
        activate: null,
        token:null,
        user:{}
      }
    },
    methods: {
      success() {
        this.$store.commit("login", this.token);
        this.$store.commit("setStatus", this.user.state);
        this.getProfile();
      },
      fail() {
        this.$router.push('/platform-intro');
      },
      getProfile(){
        http.getProfile().then(res => {
          if (!res.code) {
            this.$store.commit("setProfile", res);
            // setTimeout(() => {
            this.$router.push('/platform-intro');
            // }, 1000);
          }
        });
      },
    },
    mounted() {
      http.activate(this.$route.query.t).then(rs => {
        if (!rs.code) {
          this.activate = true;
          this.token=rs.token;
          this.user=rs.user;
        } else {
          this.activate = false;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  #registe-activate {
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

  @media (min-width: 1200px) {
    .container {
      max-width: 1200px;
    }
  }
  .container {
    padding: 30px;
    background: #ffffff;
  }

  .glyphicon-ok-circle:before {
    content: "\e089";
    font-size: 42px;
    color: #000000;
    display: block;
  }

  .glyphicon-remove-circle:before {
    content: "\e088";
    font-size: 42px;
    color: #000000;
  }


  .success {
    /*height: 200px;*/

    div:first-child {
      text-align: right;
    }

    div:last-child {
      text-align: left;
    }

    button {
      background: #2a94de;
      border: none;
      width: 75px;
    }
  }

  .fail {

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
