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
              <td>名称:</td>
              <td><input type="text" v-model="nav.name"></td>
            </tr>
            <tr>
              <td>上级:</td>
              <td>
                <b-form-select v-model="nav['parent_id']" :options="options"></b-form-select>
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td><input type="text" v-model="nav.url"></td>
            </tr>
            <tr>
              <td>状态:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="nav.state"
                    :options="showOptions"
                    name="radio-show"
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
              <td>名称:</td>
              <td><input type="text" v-model="update.name"></td>
            </tr>
            <tr>
              <td>上级:</td>
              <td>
                <b-form-select v-model="update.parent_id" :options="options"></b-form-select>
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td><input type="text" v-model="update.url"></td>
            </tr>
            <tr>
              <td>状态:</td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="update.state"
                    :options="showOptions"
                    name="radio-show"
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
    name: "EditSort",
    data() {
      return {
        plate: 'a',
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        options: [{value:'0',text:"请选择上级"}],
        nav: {
          name: '',
          parent_id: 0,
          url: '',
          sort: '',
          state: ''
        },
        update: {
          id: '',
          name: '',
          parent_id: '',
          url: '',
          sort: '',
          state: ''
        },
        pid: 0
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
        if (!this.nav.sort.toString()) {
           this.$toast.success({
            message:"请填写排序！",
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
      updateNav() {
        if (!this.update.name) {
           this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (this.pid==this.update.parent_id) {
           this.$toast.success({
            message:"不能将自身作为上级！",
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
        if (!this.update.sort.toString()) {
           this.$toast.success({
            message:"请填写排序！",
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
              let temp = {
                value: v.id,
                text: v.name
              };
              this.options.push(temp);
            });
          }
        });
      },
      getNavDetail(id){
        http.getNavDetail({id:id}).then(rs=>{
          if(!rs.code){
            this.update = rs;
            if(this.update['id']){
                this.pid = this.update['id'];
            }
          }
        });
      }
    },
    mounted() {
      this.getNavList();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
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
      width: 40%;
    }

    input, select {
      border: 1px solid #d2d2d2;
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
