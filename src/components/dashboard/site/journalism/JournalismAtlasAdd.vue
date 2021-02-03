<template>
  <div id="edit-article">
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
              <td>栏目:<span style="color:red;">*</span></td>
              <td>
                <treeselect v-model="article['category_id']" style="width: 25%;" :multiple="false" :options="options" />
              </td>
            </tr>
            <tr>
              <td>标题:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="article.name">
              </td>
            </tr>
            <tr>
              <td>内容</td>
              <td><span class="add" @click="addLines">添加</span></td>
            </tr>
            <tr v-for="(item,index) in article['atlas_details']" :key="index+'x'">
              <td>{{index + 1}}</td>
              <td>
                <label class="btn btn-orange" :for="'upload'+index">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/>
                </label>
                <input class="t-ipt" type="file" :id="'upload'+index" :data-url="index" accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,article['atlas_details'],index)">
                <img class="l-img" v-lazy="item.img" :key="item.img">
                <br/>
                <input type="text" v-model="item.description">
                <span class="txt" v-if="index!=article['atlas_details'].length-1" @click="moveDown(index)">下移</span>
                <span class="txt" v-if="index!=0" @click="moveUp(index)">上移</span>
                <span class="txt" v-if="index!=0" @click="deleteLine(index)">删除</span>
                <span class="txt" :class="{hover:active==index}" @click="setCover(index)">{{active==index?"已设为封面":"设为封面"}}</span>
              </td>
            </tr>
          </table>
          <div style="padding-left: 38%;">
            <b-button @click="createAtlas()">确定</b-button>
            <b-button @click="back">取消</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <table cellpadding="12">
             <tr>
              <td>栏目:<span style="color:red;">*</span></td>
              <td>
                <treeselect v-model="update['category_id']" style="width: 25%;" :multiple="false" :options="options" />
              </td>
            </tr>
            <tr>
              <td>标题:<span style="color:red;">*</span></td>
              <td>
                <input type="text" v-model="update.name">
              </td>
            </tr>
            <tr>
              <td>内容</td>
              <td><span class="add" @click="addLines">添加</span></td>
            </tr>
            <tr v-for="(item,index) in update['atlas_details']" :key="index+'x'">
              <td>{{index + 1}}</td>
              <td>
                <label class="btn btn-orange" :for="'upload'+index">
                  <img src="../../../../assets/imgs/upload.png" height="70" width="113"/>
                </label>
                <input class="t-ipt" type="file" :id="'upload'+index" :data-url="index" accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImg($event, 1,update['atlas_details'],index)">
                <img class="l-img" v-lazy="item.img" :key="item.img">
                <br/>
                <input type="text" v-model="item.description">
                <span class="txt" v-if="index!=update['atlas_details'].length-1" @click="moveDown(index)">下移</span>
                <span class="txt" v-if="index!=0" @click="moveUp(index)">上移</span>
                <span class="txt" v-if="index!=0" @click="deleteLine(index)">删除</span>
                <span class="txt" :class="{hover:active==index}" @click="setCover(index)">{{active==index?"已设为封面":"设为封面"}}</span>
              </td>
            </tr>
          </table>
          <div style="padding-left: 38%;">
            <b-button @click="updataArticle">确定</b-button>
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
  import common from '../../../../common'
  import * as http from '../../../../../apis/site'
  import {quillRedefine} from 'vue-quill-editor-upload'//引入图片上传
  // 工具栏配置
  export default {
    name: "NewsArticleAdd",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        plate: 'a',
        article: {
          category_id:'',
          name:'',
          atlas_details:[{cover_plan: '',img: '',description:''}]
        },
        update: {
          category_id:'',
          name:'',
          atlas_details:[{cover_plan: '',img: '',description:''}]
        },
        options: [{id: '', label: '请选择栏目'},],
        active: -1,
        qualified: false
      }
    },
    created() {
  
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createAtlas() {
        let that = this;
        let arr = that.article.atlas_details;
        if(!this.article['category_id']){
           this.$toast.success({
            message:"请选择栏目！",
            color:'#3cb5f1'
          });;
          return;
        }
        if(arr.length>0){
          if(that.article.name==''){
            this.$toast.success({
              message: "标题不能为空！",
              color: '#3cb5f1'
            });
            return;
          }
          for (let i = 0; i < arr.length; i++) {
            if(arr[i]['img'] ==''){
              this.$toast.success({
                message: "请选择第"+ (i+1) +"个的图片！",
                color: '#3cb5f1'
              });
              return;
            }
            // else if(arr[i]['description'] ==''){
            //   this.$toast.success({
            //     message: "请填写第"+ (i+1) +"个的内容！",
            //     color: '#3cb5f1'
            //   });
            //   return;
            // }
          }
          let formData = new FormData();
          formData.append("name", this.article['name']);
          formData.append("category_id", this.article['category_id']);
          if(that.active == -1 || that.article.atlas_details.length == that.active){
            that.active = 0;
          }
          formData.append('cover_plan',that.article.atlas_details[that.active]['cover_plan']);
          for (let i = 0; i < arr.length; i++) {
            formData.append('atlas_details['+i+'][sort]',i);
            formData.append('atlas_details['+i+'][description]',arr[i]['description']);
            formData.append('atlas_details['+i+'][image]',arr[i]['img']);
            if(that.active==i){
              formData.append('atlas_details['+i+'][is_cover]',1);
            }else{
              formData.append('atlas_details['+i+'][is_cover]',0);
            }
          }
          http.createAtlas(formData).then(rs => {
            if (!rs.code) {
              this.$toast.success({
              message:"添加成功！",
              color:'#3cb5f1'
            });
              that.back();
            }
          });
        }else{
          this.$toast.success({
            message: "新增内容不能为空！",
            color: '#3cb5f1'
          });
        }
      },
      updataArticle() {
        let that = this;
        let arr = that.update.atlas_details;
        if (!this.update['category_id']) {
           this.$toast.success({
            message:"请选择栏目！",
            color:'#3cb5f1'
          });;
          return;
        }
        if(arr.length>0){
          if(that.update.name==''){
            this.$toast.success({
              message: "标题不能为空！",
              color: '#3cb5f1'
            });
            return;
          }
          for (let i = 0; i < arr.length; i++) {
            if(arr[i]['img'] ==''){
              this.$toast.success({
                message: "请选择第"+ (i+1) +"个的图片！",
                color: '#3cb5f1'
              });
              return;
            }
            // else if(arr[i]['description'] ==''){
            //   this.$toast.success({
            //     message: "请填写第"+ (i+1) +"个的内容！",
            //     color: '#3cb5f1'
            //   });
            //   return;
            // }
          }
          let formData = new FormData();
          formData.append("id", this.update['id']);
          formData.append("category_id", this.update['category_id']);
          formData.append("name", this.update['name']);
          if(that.active == -1 || that.update.atlas_details.length == that.active){
            that.active = 0;
          }
          if (that.update.atlas_details[that.active]['cover_plan']) {
            formData.append('cover_plan',that.update.atlas_details[that.active]['cover_plan']);
          }else{
            formData.append('cover_plan',that.update.atlas_details[that.active]['image']);
          }
          for (let i = 0; i < arr.length; i++) {
            formData.append('atlas_details['+i+'][sort]',i);
            formData.append('atlas_details['+i+'][description]',arr[i]['description']);
            if (arr[i]['cover_plan']) {
              formData.append('atlas_details['+i+'][image]',arr[i]['cover_plan']);
            }else{
              formData.append('atlas_details['+i+'][image]',arr[i]['image']);
            }
            if(that.active==i){
              formData.append('atlas_details['+i+'][is_cover]',1);
            }else{
              formData.append('atlas_details['+i+'][is_cover]',0);
            }
          }
          http.updateAtlas(formData).then(rs => {
            if (!rs.code) {
              this.$toast.success({
              message:"修改成功！",
              color:'#3cb5f1'
            });
              that.back();
            }
          });
        }else{
          this.$toast.success({
            message: "编辑内容不能为空！",
            color: '#3cb5f1'
          });
        }
      },
      addLines(){
        let that = this;
         if(that.plate == 'a'){
            if(this.article.atlas_details.length>34){
              this.$toast.success({
                message: "图集最多可以添加35个！",
                color: '#3cb5f1'
              });
            }else{
                  that.article.atlas_details.push({cover_plan: '',img: '',description:''})
            }
        }else{
            if(this.update.atlas_details.length>34){
              this.$toast.success({
                message: "图集最多可以添加35个！",
                color: '#3cb5f1'
              });
            }else{
                  that.update.atlas_details.push({cover_plan: '',img: '',description:''})
            }
        }
      },
      moveUp(index){
        if(this.plate=='a'){
          this.swapItems(this.article.atlas_details,index,index-1);
        }else{
          this.swapItems(this.update.atlas_details,index,index-1);
        }
        if(index == this.active){
          this.active = Number(this.active) - 1;
        }else if((index-1) == this.active){
          this.active = Number(this.active) + 1;
        }
      },
      moveDown(index){
        if(this.plate=='a'){
          this.swapItems(this.article.atlas_details,index,index+1);
        }else{
          this.swapItems(this.update.atlas_details,index,index+1);
        }
        if(index == this.active){
          this.active = Number(this.active) + 1;
        }else if((index+1) == this.active){
          this.active = Number(this.active) - 1;
        }
      },
      deleteLine(index){
        if(this.plate=='a'){
          Vue.delete(this.article.atlas_details, index);
        }else{
          Vue.delete(this.update.atlas_details, index);
        }
      },
      swapItems(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      },
      setCover(index){
        if(this.active == index){
          this.active = -1;
        }else{
          this.active = index;
        }
      },
      //选择图片
      chooseImg(e, num, temp,index) {
        var _this = this;
        //上传图片
        var file = e.target.files[0];
        if(file.size/1024/1024 > 2){
           this.$toast.success({
            message:"图片大小不能超过2M!",
            color:'#3cb5f1'
          });
          return;
        }
        _this.fileName = file.name;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$toast.success({
            message:"图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
            color:'#3cb5f1'
          });
          return false
        }

        let formData = new FormData();
        formData.append("image",e.target.files[0]);
        http.materialUpload(formData).then(rs => {
          if(rs.success){
            temp[index].img = rs.imageUrl;
            temp[index]['cover_plan'] = rs.imageUrl;
          }else{
             this.$toast.success({
              message:"图片上传失败!",
              color:'#3cb5f1'
            });
          }
        })
        // var reader = new FileReader();
        // reader.onload = (e) => {
        //   let data;
        //   if (typeof e.target.result === 'object') {
        //     // 把Array Buffer转化为blob 如果是base64不需要
        //     data = window.URL.createObjectURL(new Blob([e.target.result]))
        //   } else {
        //     data = e.target.result
        //   }
        //   if (num === 1) {
        //     temp[index].img = data
        //   }
        // }
        // // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file);

      },
      getAtlasDetail(id) {
        let that = this;
        http.getAtlasDetail({id: id}).then(rs => {
          if (!rs.code) {
            let temp = rs;
            for(var i in temp.atlas_details){
              temp.atlas_details[i]['img'] = temp.atlas_details[i]['image'];
              temp.atlas_details[i]['cover_plan'] = '';
              if(temp.atlas_details[i]['is_cover']==1){
                that.active = i;
              }
            }
            that.update = temp;
          }
        });
      },
      getAllAtlas(){
         http.getAllAtlas().then(rs => {
          if (!rs.code) {
           if(this.siteType === 1){
                rs.forEach(t1 => {
                  if (t1['parent_id'] === 0) {
                    this.options.push({id: t1.id, label: t1.name+'(主)'});
                  }
                });
                rs.forEach(a => {
                  this.options.forEach((b) => {
                    if (b.id === a['parent_id']) {
                      if (!b.children) {
                        b.children = [];
                      }
                      b.children.push({id: a.id, label: a.name+'(主)'});
                    }
                  });
                });
            }else if(this.siteType === 2){
              rs.forEach(t1 => {
                if (t1['parent_id'] === 0) {
                  if(t1['copy_id'] === 0){
                    this.options.push({id:t1.id,label:t1.name+'(副)'});
                  }else{
                    this.options.push({id:t1.id,label:t1.name+'(主)'});
                  }
                }
              });
              rs.forEach(a => {
                this.options.forEach((b) => {
                  if (b.id === a['parent_id']) {
                    if(a['copy_id'] === 0){
                      if(!b.children){
                        b.children=[];
                      }
                      b.children.push({id: a.id,label: a.name+'(副)'});
                    }else{
                      if(!b.children){
                        b.children=[];
                      }
                      b.children.push({id: a.id,label: a.name+'(主)'});
                    }
                  }
                });
              });
            }else{
              rs.forEach(t1 => {
                if (t1['parent_id'] === 0) {
                  this.options.push({id: t1.id, label: t1.name});
                }
              });
              rs.forEach(a => {
                this.options.forEach((b) => {
                  if (b.id === a['parent_id']) {
                    if (!b.children) {
                      b.children = [];
                    }
                    b.children.push({id: a.id, label: a.name});
                  }
                });
              });
            }
          }
        });
      }
    },
    mounted() {
       this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
       if(this.plate=='a'){
         this.active = 0;
       }
       if (this.$route.query.id) {
        this.getAtlasDetail(this.$route.query.id);
      }
      this.getAllAtlas();
    }
  }
</script>
<style lang="scss" scoped>

  #edit-article {}

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
      width: 70%;
      margin-left: 50px;

      tr {
        td:first-child {
          width: 100px;
          text-align: right;
        }

        td:last-child {
          text-align: left;
         font-size:14px
        }
        .add{
          color:#3cb5f1;
          cursor: pointer;
          outline: none;
          display: inline-block;
        }
        .txt{
          margin-left: 22px;
          color:#3cb5f1;
          cursor: pointer;
        }
        .btn-orange{
          display:inline-block;
          width: 70px;
          padding: 0;
          text-align: center;
          line-height: 28px;
        }
        .l-img{
          margin-left:50px;
          width: 70px;
          height: 70px;
          vertical-align: top;
        }
        .t-ipt{
          position:absolute;
          clip:rect(0 0 0 0);
        }
      }
    }

    select {
      width: 25%;
      margin-right: 50px;
    }

    input {
      width: 50%;
    }

    textarea {
      width: 90%;
    }

    button {
      float: left;
      margin: 30px;
      background: #3cb5f1;
      border: none;
      width: 100px;
    }
  }

</style>
