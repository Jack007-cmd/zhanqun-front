<template>
  <div id="domain-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">域名管理</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <!-- <b-row>
            <b-form inline>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="请输入域名名称" v-model="search" @change="queryData">
                <span class="input-group-addon glyphicon glyphicon-search" @click="queryData"></span>
              </div>
              <div class="input-group" style="margin-left:15px;">
                <b-form-group>
                  <b-form-radio-group
                    v-model="config.app_state"
                    :options="showOptions"
                    name="radio-showState"
                  ></b-form-radio-group>
                </b-form-group>
              </div>
              <div class="input-group">
                  <b-button class="btn-add" @click="toEdit">新增域名</b-button>
                  <span style="font-size: 14px;">(域名最多只能绑定10条)</span>
              </div>
            </b-form>
          </b-row> -->
          <div class="leaf-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="4">域名地址</b-col>
              <b-col cols="4">域名属性</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <template v-for="(temp) in leafItems" >
              <b-row v-if="temp.is_primary==1" :key="temp.id" >
                <b-col cols="2">1</b-col>
                <b-col cols="4"><input type="text" v-model="temp.domain"></b-col>
                <b-col cols="4" style="position:relative;">主域名</b-col>
                <b-col cols="2">
                  <span >/</span>
                </b-col>
              </b-row>     
            </template>
            <template v-for="(item,index) in leafItems" >                     
              <b-row v-if="item.is_primary==0" :key="item.id" :class="item.is_delete == 0?'':'delete'">
                <b-col cols="2">{{index+2}}</b-col>
                <b-col cols="4"><input type="text" v-model="item.domain"></b-col>
                <b-col cols="4" style="position:relative;">
                    <b-form-group id="leaf-radio" style="height:100%;margin-bottom: 0;">
                    <b-form-radio-group
                            v-model="item.is_redirect"
                            :options="redirecOptions"
                            :name="'radio-redirect'+index">
                        </b-form-radio-group>
                    </b-form-group> 
                </b-col>
                <b-col cols="2">
                  <b-button @click="deleteLeaf(index,item.is_delete)">删除</b-button>
                </b-col>
              </b-row>
            </template>
            <div class="lf-operation" style="padding-left: 38%;">
                <b-button @click="updataArticle">保存</b-button>
                <b-button @click="returnData">返回</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-create" size="xs" centered hide-header hide-footer>
        <div class="div-edit-keyword">
        <h5>新增域名</h5>
        <p><span>输入域名：</span><input type="text" v-model="create.domain"></p>
        <p><span>域名类型：</span>
            <b-form-group style="width:80%;float:right;">
                <b-form-radio-group
                    v-model="create.is_redirect"
                    :options="showOptions"
                    name="radio-showState">
                </b-form-radio-group>
            </b-form-group>
        </p>
        <div style="padding-left: 80px;">
            <b-button @click="createDomainName">保存</b-button>
            <b-button @click="$bvModal.hide('modal-create')">返回</b-button>
        </div>
        </div>
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
  import * as http from '../../../../apis/net'

  export default {
    name: "DomainNameManage",
    data() {
      return {
        search: '',
        leafItems: [],
        initialLeafItems: [],
        totalPage: 0,
        cpage: 1,
        showOptions:[
          {text: '301跳转', value: 1},
          {text: '绑定域名', value: 0}
        ],
        redirecOptions:[
          {text: '301跳转', value: 1},
          {text: '绑定域名', value: 0}
        ],
        config: {
            app_state: 1
        },
        create:{
            domain:'',
            is_redirect: 1
        },
        webId:''
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      toEdit() {
        if(this.leafItems.length<10){
          this.create.domain ='';
          this.create.is_redirect = 1;
          this.$bvModal.show("modal-create");
        }else{
         this.$toast.success({
            message:"域名最多只能绑定10条",
            color:'#3cb5f1'
          });
        }
      },
      getLeafList() {
        let params = {
          web_id : this.webId
        };
        let that = this;
        http.getDomainNameList(params).then(rs => {
          if (!rs.code) {
            rs.forEach(v=>{
              v['is_delete'] = 0;
            })
            that.leafItems = rs;
            // that.initialLeafItems = rs;
          }
        });
      },
      deleteLeaf(idx,is_delete) {
        if (confirm("确定要删除当前数据？")) {
          // this.leafItems.splice(idx,1);
          if(is_delete==0){
            this.leafItems[idx].is_delete = 1;
          }else{
            this.leafItems[idx].is_delete = 0;
          }
        }
      },
      createDomainName(){
        if (!this.create.domain) {
           this.$toast.success({
            message:"请填写域名！",
            color:'#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("web_id", this.webId);
        formData.append("domain", this.create['domain']);
        formData.append("is_redirect", this.create['is_redirect']);
        http.createDomainName(formData).then(rs => {
          if (!rs.code) {
             this.$toast.success({
              message:"保存成功！",
              color:'#3cb5f1'
          });
           this.$bvModal.hide("modal-create");
           this.getLeafList();
          }
        });        
      },
      updataArticle(){
        let formData = new FormData();
        formData.append("web_id", this.webId);
        this.leafItems.forEach((v,i)=>{
          formData.append("data["+i+"][id]", v.id);
          formData.append("data["+i+"][is_primary]", v['is_primary']);
          formData.append("data["+i+"][domain]", v.domain);
          formData.append("data["+i+"][is_redirect]", v['is_redirect']);
          formData.append("data["+i+"][is_delete]", v['is_delete']);
        })
        http.createDomainNameUpdate(formData).then(rs => {
          if(rs.success){
            this.$toast.success({
                message:"保存成功",
                color:'#3cb5f1'
            });
            this.getLeafList();
          }else{
            this.$toast.success({
                message: rs.error,
                color:'#3cb5f1'
            });
          }
        }); 
      },
      returnData(){//返回数据
        this.$router.go(-1);//返回上一层
        //  this.leafItems = this.initialLeafItems;
        // this.getLeafList();
      }

    },
    mounted() {
      this.webId = this.$route.query.id;
      this.getLeafList();  // 向后台发数据请求
    }
  }
</script>

<style lang="scss" scoped>
  #domain-manage {
    padding: 25px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 67px);
  }

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;
    color: #555555;
    .row.delete{
      display: none;
    }
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

    .input-group .btn-add{
            height: 26px;
            line-height: 10px;
            font-size: 12px;
            margin-top: 0;
            margin-left: 15px;
            margin-right: 5px;
            color: #099ae6;
            border: 1px solid #099ae6;
            background: #ffffff;
    }
  .leaf-items {
    margin-top: 30px;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-left: 1px solid #d2d2d2;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;

      .col-1, .col-2 {
        padding: 0;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      /*border-radius: 5px;*/
    }

    input {
      width: 100%;
      height: 96%;
      line-height: 30px;
      border: none;
      border-radius: 5px;
      text-align: center;
    }

    button {
      background: #01c36a;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 70px;
    }
    
    // .custom-control-label::after{
    //   top: 1rem !important;
    // }
  }

  .glyphicon-search:before {
    content: "\e003";
    color: #ffffff;
    font-size: 24px;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }

  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 400px;
    margin-bottom: 0;
    display: table-cell;

  }

  .input-group-addon {
    cursor: pointer;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #3cb5f1;
    border: 1px solid #3cb5f1;
    border-radius: 4px;
    display: table-cell;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }

  .input-group-addon, .input-group-btn {
    width: 80px;
    white-space: nowrap;
    vertical-align: middle;
  }
    .div-edit-keyword {
    padding: 0 10px;

    h5 {
      padding-bottom: 10px;
      border-bottom: 1px solid #c9c9c9;
    }
    
    p {
      width: 100%;
      span{
        width:20%;
        display:inline-block;
      }
      input {
        width: 80%;
        border: 1px solid #dcdcdc;
      }

    }

    button {
      background: #3cb5f1;
      border: none;
      width: 80px;
      margin: 20px;
    }
  }
  .lf-operation button{
      float: left;
      margin: 30px;
      background: #3cb5f1;
      border: none;
      padding: 0.375rem 0.75rem;
      width: 100px;
      height: 36px;
  }
  /deep/ #leaf-radio .custom-control-label::before{
    top: 1rem !important;
  }
  /deep/  #leaf-radio .custom-control-label::after{
    top: 1rem !important;
  }
</style>
