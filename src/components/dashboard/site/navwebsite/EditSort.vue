<template>
  <div id="edit-sort">
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
              <td>分类名称:</td>
              <td><input type="text" v-model="sort.name"></td>
            </tr>
            <tr>
              <td>分类图片:</td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,sort)">
                <img v-lazy="sort.img" :key="sort.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="sort.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 50px;">
            <b-button @click="createNavCategory">保存</b-button>
            <b-button @click="back">返回</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>分类名称:</td>
              <td><input type="text" v-model="update.name"></td>
            </tr>
            <tr>
              <td>分类图片:</td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update)">
                <img v-lazy="update.img" :key="update.img" alt="" style="margin-left:50px;width: 70px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>排序:</td>
              <td><input type="text" v-model="update.sort"></td>
            </tr>
          </table>
          <div style="padding-left: 50px;">
            <b-button @click="updateNavCategory">保存</b-button>
            <b-button @click="back">返回</b-button>
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
        imgFile:'',
        sort: {
          name: '',
          icon: '',
          img:'',
          sort: '',
        },
        update:{
          id:'',
          name: '',
          icon: '',
          sort: '',
          img:''
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //选择图片
      chooseImg(e, num,temp) {
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
      createNavCategory(){
        if (!this.sort.name) {
           this.$toast.success({
            message:"请填写分类名称！",
            color:'#3cb5f1'
          });;
          return;
        }
        if (!this.sort.icon) {
           this.$toast.success({
            message:"请添加分类图片！",
            color:'#3cb5f1'
          });;
          return;
        }
        if (!this.sort.sort) {
           this.$toast.success({
            message:"请填写分类排序！",
            color:'#3cb5f1'
          });;
          return;
        }
        let formData = new FormData();
        formData.append('name', this.sort.name);
        formData.append('icon', this.sort.icon);
        formData.append('sort', this.sort.sort);
        http.createNavCategory(formData).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updateNavCategory(){
        let formData = new FormData();
        formData.append('id', this.update.id);
        formData.append('name', this.update.name);
        formData.append('icon', this.update.icon);
        formData.append('sort', this.update.sort);
        http.updateNavCategory(formData).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getNavCategoryDetail(id){
        http.getNavCategoryDetail({id:id}).then(rs=>{
          if(!rs.code){
            let temp = rs;
            temp['img']=temp['icon'];
            temp['icon'] = '';
            this.update = temp;
          }
        });
      }
    },
    mounted() {
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getNavCategoryDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-sort {}

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
      margin-left: 50px;

      tr {
        td:first-child {
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
  }
</style>
