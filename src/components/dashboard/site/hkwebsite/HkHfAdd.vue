<template>
  <div id="edit-website">
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
              <td>
                <input type="text" v-model="nav.name">
              </td>
            </tr>
            <tr>
              <td>上级:</td>
              <td>
                <treeselect v-model="nav['parent_id']" style="width: 25%;" :multiple="false" :options="parentOptions" />
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td class="fl"><input type="text" v-model="nav.url">
              <td class="fl"><b-form-checkbox
                  v-model="nav.is_blank"
                  :options= "options"
                  style="float:left"
                  >
                  </b-form-checkbox>
                  <i>新窗口打开</i>
              </td>
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
           <tr>
              <td class="seo_c">SEO配置</td>
            </tr>
            <tr>
              <td>标题:</td>
              <td><input type="text"></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;">关键字:</td><td><textarea name=""></textarea><i>注：一般不超过100个字符，关键词用英文逗号隔开</i></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;">描述:</td><td><textarea name=""></textarea><i>注：一般不超过200个字符</i></td>
            </tr>
          </table>
          <div style="padding-left: 36%;">
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
              <td>
                <input type="text" v-model="update.name">
              </td>
            </tr>
            <tr>
              <td>上级:</td>
              <td>
                <treeselect v-model="update['parent_id']" style="width: 25%;" :multiple="false" :options="parentOptions" />
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td class="fl"><input type="text" v-model="update.url">
              <td class="fl"><b-form-checkbox
                  v-model="update['is_blank']"
                  value="1"
                  unchecked-value="0"
                  style="float:left"
                  >
                  </b-form-checkbox>
                  <i>新窗口打开</i>
              </td>
            </tr>
            <tr>
              <td>状态:</td>
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
           <tr>
              <td class="seo_c">SEO配置</td>
            </tr>
            <tr>
              <td>标题:</td>
              <td><input type="text"></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;">关键字:</td><td><textarea name=""></textarea><i>注：一般不超过100个字符，关键词用英文逗号隔开</i></td>
            </tr>
            <tr>
                <td style="vertical-align: baseline;">描述:</td><td><textarea name=""></textarea><i>注：一般不超过200个字符</i></td>
            </tr>

          </table>
          <div style="padding-left:36%;">
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
    name: "HkNavAdd",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data(){
      return{
        plate:'a',
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        parentOptions: [{id:'0',label:'请选择上级'}],
        nav: {
          name:'',
          parent_id: '0',
          url: '',
          sort: '',
          state: '',
          is_blank:'',
        },
        update: {
          id: "",
          name:'',
          parent_id :'',
          url: '',
          sort: '',
          state: '',
          is_blank:'',
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createNav() {
        this.nav.type = 2;
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
        this.update.type = 2;
        if (!this.update.name) {
          this.$toast.success({
            message:"请填写名称！",
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
          let params = {
              type: 2
          }
        http.getNavList( params ).then(rs => {
          if (!rs.code) {
            rs.forEach(t1 => {
              if (t1['parent_id'] === 0) {
                this.parentOptions.push({id:t1.id,label:t1.name});
              }
            });
            rs.forEach(a => {
              this.parentOptions.forEach((b) => {
                if (b.id === a['parent_id']) {
                  if(!b.children){
                    b.children=[];
                  }
                  b.children.push({id: a.id,label: a.name});
                }
              });
            });
          }
        });
      },
      getNavDetail(id) {
        http.getNavDetail({id: id}).then(rs => {
          if (!rs.code) {
            this.update = rs;
          }
        });
      },
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
  #edit-website {}
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

  .create-info,.update-info {
    padding-top: 30px;

    table {
      margin-left: 50px;

      tr {
        td:first-child {
          width: 85px;
          text-align: right;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
    textarea {
      width: 100%;
      border: 1px solid #a0a0a0;
      border-radius: 5px;
    }
     select{
      width: 85%;
      margin-right: 50px;
    }
    input{
      width: 600px;
    }
  }
  .seo_c{
      color: black;
  }
  .form-group {
    margin-bottom: 0;
}
i{
    font-size: 12px;
    font-style: normal;
}
.fl{
  float: left;
}
</style>
