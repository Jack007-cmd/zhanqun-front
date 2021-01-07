<template>
  <div id="edit-column">
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
                <input type="text" v-model="column.name">
              </td>
            </tr>
            <tr>
              <td>上级:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="column['parent_id']" :options="options"></b-form-select>
                <!--<b-form-select v-model="selected" :options="options"></b-form-select>-->
              </td>
            </tr>
            <tr>
              <td>图标:</td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,column)">
                <img v-lazy="column.img" :key="column.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <!--<tr>-->
            <!--<td>状态:</td>-->
            <!--<td>       <b-form-group>-->
            <!--<b-form-radio-group-->
            <!--v-model="column.state"-->
            <!--:options="showOptions"-->
            <!--name="radio-invite"-->
            <!--&gt;</b-form-radio-group>-->
            <!--</b-form-group></td>-->
            <!--</tr>-->
            <tr>
              <td>标识:<span style="color:red;">*</span></td>
              <td><input type="text" v-model="column.identify"></td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="column.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 20%;">
            <b-button @click="createColumn">确定</b-button>
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
              <td>图标:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update)">
                <img v-lazy="update.img" :key="update.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <!--<tr>-->
            <!--<td>状态:</td>-->
            <!--<td>       <b-form-group>-->
            <!--<b-form-radio-group-->
            <!--v-model="update.state"-->
            <!--:options="showOptions"-->
            <!--name="radio-invite"-->
            <!--&gt;</b-form-radio-group>-->
            <!--</b-form-group></td>-->
            <!--</tr>-->
            <tr>
              <td>标识:<span style="color:red;">*</span></td>
              <td><input type="text" v-model="update.identify" disabled></td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="update.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 20%;">
            <b-button @click="updateColumn">确定</b-button>
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
  import common from '../../../../common'

  export default {
    name: "NewsEditColumn",
    data() {
      return {
        plate: 'a',
        showOptions: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        options: [{text:'无',value:0}],
        imgFile: '',
        column: {
          name: '',
          parent_id: 0,
          icon: '',
          sort: 0,
          state: '',
          img: '',
          identify: '',
        },
        update: {
          id: '',
          name: '',
          parent_id: '',
          icon: '',
          sort: '',
          state: '',
          identify: '',
          img: '',
          // icon: ""
          // id: 27
          // identify: "child_bank"
          // name: "国内银行"
          // parent_id: 11
          // sort: 1
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //选择图片
      chooseImg(e, num, temp) {
        //上传图片
        temp.icon = e.target.files[0];
        var file = e.target.files[0];
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
            temp.img = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);
      },
      createColumn() {
        if (!this.column.name) {
           this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
          return;
        }
        if (this.column['parent_id']<0) {
           this.$toast.success({
            message:"请选择上级！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.column.identify) {
           this.$toast.success({
             message:"请填写标识！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("name", this.column.name);
        formData.append("identify", this.column.identify);
        formData.append("parent_id", this.column['parent_id']);
        formData.append("sort", this.column.sort);
        if (this.column.icon) {
          formData.append("icon", this.column.icon);
        }
        http.createPlatformCategory(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updateColumn() {
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
        if (!this.update.identify) {
           this.$toast.success({
             message:"请填写标识！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("id", this.update.id);
        formData.append("name", this.update.name);
        formData.append("identify", this.update.identify);
        formData.append("parent_id", this.update['parent_id']);
        formData.append("sort", this.update.sort);
        if (this.update.icon) {
          formData.append("icon", this.update.icon);
        }
        http.updatePlatformCategory(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getPlatformCategoryDetail(id) {
        http.getPlatformCategoryDetail({id: id}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['img'] = rs['icon'];
            temp['icon'] = '';
            this.update = temp;

          }
        });
      },
      getPlatformCategory() {
        http.getPlatformCategoryAll().then(rs => {
          if (!rs.code) {
            rs.forEach(v => {
              this.options.push({
                text: v.name,
                value: v.id
              })
            });
          }
        });
      }
    },
    mounted() {
      this.getPlatformCategory();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getPlatformCategoryDetail(this.$route.query.id);
      }
      if (this.plate === 'a') {
        this.column.identify = common.randomString(8);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-column {}

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
