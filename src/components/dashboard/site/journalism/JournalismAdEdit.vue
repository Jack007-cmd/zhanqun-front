<template>
  <div id="edit-ad">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span :class="{on:plate==='a'}">新增</span>
          <span :class="{on:plate==='b'}">编辑</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="create-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>位置:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="ad['position_id']" :options="positionOptions"></b-form-select>
              </td>
            </tr>
            <tr>
              <td>图片:<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="upload"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="upload" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,ad)">
                <img v-lazy="ad.img" :key="ad.img" alt="" style="margin-left:50px;width: 330px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td><input type="text" v-model="ad.url"></td>
            </tr>
            <tr>
              <td>状态:<span style="color:red;">*</span></td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="ad.state"
                    :options="options"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
          </table>
          <div style="margin-left:38%">
            <b-button @click="createAd">确定</b-button>
            <b-button @click="back">返回</b-button>
          </div>

        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
            <tr>
              <td>位置:<span style="color:red;">*</span></td>
              <td>
                <b-form-select v-model="update['position_id']" :options="positionOptions"></b-form-select>
              </td>
            </tr>
            <tr>
              <td>图片:<span style="color:red;">*</span></td>
              <td>
                <label class="btn btn-orange" for="uploads"
                       style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/></label>

                <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);"
                       accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update)">
                <img v-lazy="update.img" :key="update.img" alt="" style="margin-left:50px;width: 330px;height: 70px;vertical-align: top;">
              </td>
            </tr>
            <tr>
              <td>链接:</td>
              <td><input type="text" v-model="update.url"></td>
            </tr>
            <tr>
              <td>状态:<span style="color:red;">*</span></td>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="update.state"
                    :options="options"
                    name="radio-show"
                  ></b-form-radio-group>
                </b-form-group>
              </td>
            </tr>
          </table>
          <div style="margin-left:38%">
            <b-button @click="updateAd">确定</b-button>
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
    name: "TradeAdEdit",
    data() {
      return {
        plate: 'a',
        selected: null,
        imgFile: '',
        state: false,
        img: '',
        options: [
          {text: '显示', value: 0},
          {text: '隐藏', value: 1},
        ],
        ad: {
          position_id: '',
          image: '',
          url: '',
          state: '',
          img: '',
          // identify	广告标识（位置）	是	[string]
          // 2	image	广告图	是	[file]
          // 3	url	广告图URL	是	[string]
          // 4	state	广告图状态
        },
        update: {
          id: '',
          position_id: '',
          image: '',
          img: '',
          url: '',
          state: '',
          // id	广告ID	是	[string]
          // identify	广告标识（位置）
          // 2	image	广告图		[file]
          // 3	url	广告图URL	是	[string]
          // 4	state	广告图状态
        },
        positionOptions: [{text: '请选择位置', value: null},]
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createAd() {
        if (!this.ad['position_id']) {
           this.$toast.success({
            message:"请选择位置！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.ad['image']) {
           this.$toast.success({
            message:"请上传图片！",
            color:'#3cb5f1'
          });
          return;
        }
        // if (!this.ad['url']) {
        //    this.$toast.success({
        //     message:"请填写链接！",
        //     color:'#3cb5f1'
        //   });
        //   return;
        // }
        if (this.ad['state']==='') {
           this.$toast.success({
            message:"请选择状态！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("position_id", this.ad['position_id']);
        formData.append("image", this.ad.image);
        formData.append("url", this.ad.url);
        formData.append("state", this.ad.state);
        http.createAd(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      updateAd() {
         if (!this.update['position_id']) {
           this.$toast.success({
            message:"请选择位置！",
            color:'#3cb5f1'
          });
          return;
        }
        if (!this.update['img']) {
           this.$toast.success({
            message:"请上传图片！",
            color:'#3cb5f1'
          });
          return;
        }
        // if (!this.update['url']) {
        //    this.$toast.success({
        //     message:"请填写链接！",
        //     color:'#3cb5f1'
        //   });
        //   return;
        // }
        if (this.update['state']==='') {
           this.$toast.success({
            message:"请选择状态！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("id", this.update.id);
        formData.append("position_id", this.update['position_id']);
        if (this.update.image) {
          formData.append("image", this.update.image);
        }
        formData.append("url", this.update.url);
        formData.append("state", this.update.state);
        http.updateAd(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.back();
          }
        });
      },
      getAdPositionList() {
        http.getAdPositionList().then(rs => {
          if (!rs.code) {
            rs.forEach(v => {
              this.positionOptions.push({text: v.name, value: v.id});
            });
          }
        });
      },
      //选择图片
      chooseImg(e, num, temp) {
        //上传图片
        temp.image = e.target.files[0];
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
      getAdDetail(id) {
        http.getAdDetail({id: Number(id)}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            temp['img'] = rs['image'];
            temp['image'] = '';
            this.update = temp;
          }
        });
      }
    },
    mounted() {
      this.getAdPositionList();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getAdDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-ad {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-switch {
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
      width: 60%;

      tr {
        td:first-child {
          text-align: right;
          width: 150px;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
      }
    }


    input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #a0a0a0;
    }

    textarea {
      width: 100%;
      border: 1px solid #a0a0a0;
      border-radius: 5px;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }

    .line-title {
      color: #099ae6;
    }

    i {
      font-style: normal;
      font-size: 14px;
    }
  }

  .form-group {
    margin-bottom: 0;
  }
</style>
