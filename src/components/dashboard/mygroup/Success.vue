<template>
  <div id="success">
    <b-container fluid>
      <b-row>
        <b-col cols="12" style="text-align: left;font-size: 20px;color: #2a94de;">
          发布成功！
        </b-col>
        <b-col cols="12" style="text-align: left;">
          网站发布之后，需等待群主/管理员审核。审核通过之后，您还需要将域名解析到平台提供的IP或二级域名。<br>
          解析形式有两种，分别是”记录类型A“、”记录类型CNAME“。若有疑问，请 
          <span style="border-bottom: 1px solid;cursor: pointer;"  v-b-modal.modal-resolution-step>点击这里</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-button @click="toSiteManage">返回站点管理</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-resolution-step" size="xl" centered hide-header="true" hide-footer="true">
      <img src="../../../assets/imgs/resolution-step.png" height="701" width="1107"/>
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
  export default {
    name: "Success",
    data() {
      return {}
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      toSiteManage() {
        let role = Number(this.$store.getters.role);
        if (role === 1 || role === 99) {
          this.$router.push("/dashboard/my-group/site-manage");
        } else if(role === 0) {
          this.$router.push("/dashboard/my-group/private-site-manage");
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #success {
    padding: 25px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 67px);
  }

  .container-fluid {
    padding: 30px;
    background: #ffffff;

    button {
      background: #2a94de;
      width: 130px;
      border: none;
      line-height: 25px;
      margin: 50px auto 10px;
    }
  }

</style>
