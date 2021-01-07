<template>
  <div id="label-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">标签列表</span>
          <b-button class="btn-add" v-b-modal.modal-create-label>新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <div class="label-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="3">标签</b-col>
              <b-col cols="2">文章数量</b-col>
              <b-col cols="2">创建时间</b-col>
              <b-col cols="3">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in labelItems" :key="item.id">
              <b-col cols="2">{{index+1}}</b-col>
              <b-col cols="3">{{item.name}}</b-col>
              <b-col cols="2"><p>{{item['article_num']}}</p></b-col>
              <b-col cols="2">
                <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
              </b-col>
              <b-col cols="3">
                <b-button @click="toUpdate(item)">编辑</b-button>
                <b-button @click="deleteLabel(item.id)">删除</b-button>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>

      <b-modal id="modal-create-label" size="xs" body-bg-variant="light" centered hide-header hide-footer>
        <div class="div-create-label">
          <p>标签 <input type="text" v-model="label.name"></p>
          <p>排序 <input type="text" v-model="label.sort"></p>
          <b-button @click="createLabel">保存</b-button>
          <b-button @click="$bvModal.hide('modal-create-label')">返回</b-button>
        </div>
      </b-modal>
      <b-modal id="modal-update-label" size="xs" body-bg-variant="light" centered hide-header hide-footer>
        <div class="div-update-label">
          <p>标签 <input type="text" v-model="update.name"></p>
          <p>排序 <input type="text" v-model="update.sort"></p>
          <b-button @click="updateLabel">保存</b-button>
          <b-button @click="$bvModal.hide('modal-update-label')">返回</b-button>
        </div>
      </b-modal>
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
    name: "BlogLabelManage",
    data() {
      return {
        labelItems: [ ],
        label:{
          name:'',
          sort:'',
        },
        update:{
          id:'',
          name:'',
          sort:'',
        }
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      createLabel() {
        http.createTag(this.label).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-create-label');
            this.getLabelList();
          }
        })
      },
      toUpdate(item){
        this.update = item;
        this.$bvModal.show("modal-update-label");
      },
      updateLabel() {
        http.updateTag(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-update-label');
            this.getLabelList();
          }
        });
      },
      getLabelList() {
        http.getTagList().then(rs => {
          if (!rs.code) {
            this.labelItems = rs.data;
          }
        });
      },
      deleteLabel(id) {
        if (confirm("确定要删除这个标签吗？")) {
          http.deleteTag({id: id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"标签删除成功！",
            color:'#3cb5f1'
          });
              this.getLabelList();
            }
          });
        }
      },
    },
    mounted() {
      this.getLabelList();
    }
  }
</script>

<style lang="scss" scoped>
  #label-manage {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-title {
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 10px;
        height: 40px;

        span {
          cursor: pointer;
          padding: 0 50px 15px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }

        .btn-add {
          height: 26px;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-top: 0;
          margin-right: 50px;
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;
        }
      }
    }
  }

  .mtb30 {
    margin: 30px auto;
  }

  .label-items {
    margin-top: 30px;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-bottom: 1px solid #d2d2d2;

      div {
        height: 50px;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      border-radius: 5px;

    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }

    input {
      width: 32px;
      height: 30px;
      line-height: 30px;
      background: #eeeeee;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      text-align: center;
    }

    .toTop {
      background: #e60011;
    }

    button {
      background: #01c36a;
      border: none;
      /*margin: 0 10px;*/
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 60px;
    }
  }

  .div-create-label, .div-update-label {
    text-align: center;
    width: 450px;
    margin: 50px auto 20px;

    input {
      width: 300px;
    }

    button {
      background: #2a94de;
      min-width: 80px;
      min-width: 120px;
      color: #ffff;
      border: none;
      margin: 20px;
    }

  }
</style>
