<template>
  <div id="edit-nav">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span :class="{on:plate==='a'}">新增</span>
          <span :class="{on:plate==='b'}">编辑</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="create-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>名称:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="nav.name">
              </td>
            </tr>
            <tr>
              <td>上级:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="nav['parent_id']" :options="options"></b-form-select>
                <!--<b-form-select v-model="selected" :options="options"></b-form-select>-->
              </td>
            </tr>
            <tr>
              <td>链接:<span style="color:red;">*</span></td>
              <td>
                <b-container fluid>
                  <b-row>
                    <b-col cols="9" style="padding: 0;"><input type="text" v-model="nav.url" style="width:100%;">
                    </b-col>
                    <b-col cols="1" style="text-align: right;padding: 0;"><input type='radio' id='window' value='1'
                                                                                 v-model="nav['is_blank']"/></b-col>
                    <b-col cols="2" style="text-align: left;padding: 0;"><label for='window'>新窗口打开</label></b-col>
                  </b-row>
                </b-container>
              </td>
            </tr>
            <tr>
              <td>状态:<span style="color:red;">*</span></td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="nav.state"
                    :options="showOptions"
                    name="radio-invite"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="nav.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 20%;">
            <b-button @click="createNav">确定</b-button>
            <b-button @click="back">取消</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>名称:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="update.name">
              </td>
            </tr>
            <tr>
              <td>上级:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="update['parent_id']" :options="options"></b-form-select>
                <!--<b-form-select v-model="selected" :options="options"></b-form-select>-->
              </td>
            </tr>
            <tr>
              <td>链接:<span style="color:red;">*</span></td>
              <td>
                <b-container fluid>
                  <b-row>
                    <b-col cols="9" style="padding: 0;"><input type="text" v-model="update.url" style="width:100%;">
                    </b-col>
                    <b-col cols="1" style="text-align: right;padding: 0;"><input type='radio' id='open' value='1'
                                                                                 v-model="update['is_blank']"/></b-col>
                    <b-col cols="2" style="text-align: left;padding: 0;"><label for='open'>新窗口打开</label></b-col>
                  </b-row>
                </b-container>
              </td>
            </tr>
            <tr>
              <td>状态:<span style="color:red;">*</span></td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="update.state"
                    :options="showOptions"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="update.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 20%;">
            <b-button @click="updateNav">确定</b-button>
            <b-button @click="back">取消</b-button>
          </div>
        </b-col>
      </b-row>
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
  import * as http from '../../../../../apis/site'

  export default {
    name: "EditWebsite",
    data() {
      return {
        plate: 'a',
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        options: [
          {value: -1, text: '请选择上级'},{value: 0, text: '无'},],
        nav: {
          name: '',
          parent_id: 0,
          url: '',
          sort: 0,
          state: '',
          is_blank: 0,
        },
        update: {
          is_blank: '',
          id: '',
          name: '',
          parent_id: '',
          url: '',
          sort: 0,
          state: ''
        },
        move:0
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createNav() {
        if (!this.nav.name) {
           this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.nav.url) {
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.nav.state.toString()) {
           this.$toast.success({
            message:"请选择状态！",
            color:'#3cb5f1'
          });
          return;
        }
        if (this.nav['parent_id']<0) {
           this.$toast.success({
            message:"请选择上级！",
            color:'#3cb5f1'
          });
          return;
        }
        this.nav['type'] = this.move;
        http.createNav(this.nav).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getNavDetail(id) {
        let params = {
          id: id,
          type: this.move
        }
        http.getNavDetail(params).then(rs => {
          if (!rs.code) {
            this.update = rs;
          }
        });
      },
      updateNav() {
        if (!this.update.name) {
           this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (this.update['parent_id']<0) {
           this.$toast.success({
            message:"请选择上级！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.url) {
           this.$toast.success({
            message:"请填写链接！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update.state.toString()) {
           this.$toast.success({
            message:"请选择状态！",
            color:'#3cb5f1'
          });
          return;
        }
        this.update['type'] = this.move;
        http.updateNav(this.update).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getNavList() {
        http.getNavList().then(rs => {
          if (!rs.code) {
            rs.forEach(v => {
              if (v['parent_id'] === 0) {
                this.options.push({
                  value: v.id,
                  text: v.name
                });
              }
            });
          }
        });
      }
    },
    mounted() {
      this.getNavList();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      this.move = Number(this.$route.query.move);
      if (this.$route.query.id) {
        this.getNavDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-nav {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 10.4px;

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 12px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }
      }
    }
  }

  .create-info, .update-info {
    padding-top: 30px;

    table {
      width: 50%;
      margin-left: 50px;

      tr {
        td:first-child {
          width: 80px;
          text-align: right;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }

    input {
      width: 100%;
    }

    select {
      margin-right: 20px;
      width: 40%;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
  }

  .form-group {
    margin-bottom: 0;
  }
</style>
