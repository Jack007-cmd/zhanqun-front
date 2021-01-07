<template>
<div>
    <div id="messages">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">彩票标签</span>
          <b-button v-b-modal.modal-add >新增+</b-button>
          <!-- <b-button class="btn" :class="{click:active=='a'}" @click="toggle('a')">H5</b-button>
          <b-button class="btn" :class="{click:active=='b'}" style="margin-right:0px;" @click="toggle('b')">PC</b-button> -->
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="2">所属标签</b-col>
            <b-col cols="3">新增时间</b-col>
            <b-col cols="3">更新时间</b-col>
            <b-col cols="2">排序</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="item in tagItems" :key="item.number">
            <b-col cols="2">{{item['name']}}</b-col>
            <b-col cols="3">{{item['created_at'].substr(0,16)}}</b-col>
            <b-col cols="3">{{item['updated_at'].substr(0,16)}}</b-col>
            <b-col cols="2"><input type="number" v-model="item.sort" min="0" @change="updateNavSort(item.id,item.sort)"></b-col>
            <b-col cols="2">
                <b-button @click="toUpdate(item.id)">编辑</b-button>
                <b-button @click="deleteLottag(item.id)">删除</b-button>
            </b-col>
          </b-row>
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

  <b-modal id="modal-add" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>新增</h5>
        <p>标签名称： <input type="text" v-model="tag.name"></p>
        <div style="padding-left: 80px;">
          <b-button @click="createLottag">保存</b-button>
          <b-button @click="$bvModal.hide('modal-add')">返回</b-button>
        </div>
      </div>
    </b-modal>
    <b-modal id="modal-edit" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>编辑</h5>
        <p>标签名称：<input type="text" v-model="update.name"></p>
        <p>请选择彩种： <b-form-group label="">
                <b-form-checkbox-group
                :options="recommendoptions"
                v-model="update['lottery_ids']"
                ></b-form-checkbox-group>
            </b-form-group>
            </p>
        <p><span>当前选中彩种</span><b-form-group>
            <draggable v-model="recommendselected"  v-bind="dragOptions">
                        <transition-group>
                            <div  v-for="item in recommendselected" :key="item.text" class = "custom-control-kg">
                                    <div class="custom-control custom-control-inline custom-checkbox">
                                      <label class="custom-control-label">
                                        <span>{{item.text}} <span class="cus-delete"  @click="deleteLid(update['lottery_ids'],item.value)">X</span></span>
                                        </label>
                                    </div>
                            </div>
                        </transition-group>
            </draggable>
            </b-form-group> 
            </p>
        <div style="padding-left: 80px;">
          <b-button @click="updateLottag">保存</b-button>
          <b-button @click="$bvModal.hide('modal-edit')">返回</b-button>
        </div>
      </div>
    </b-modal>
    </div>
</div>
</template>

<script>
  import * as http from '../../../../../apis/site'
  import draggable from 'vuedraggable'

  export default {
    name: "LotteryTagManage",
    current_page:1,
    components:{
      draggable
    },
    data(){
      return{
        tagItems:[],
        recommendoptions:[],
        recommendselected:[],
        reactiveoptions:[],
        tag: {
          id: '',
          name:'',
        },
        update:{
          id:'',
          name:'',
          lottery_ids:[],
        },
        active:'b',
        startCs:{data:0,index:0},
        endCs:0,
        kd:0,
        dragOptions: { animation: 500 }
      }

    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //删除彩种
      deleteLid(data,val){
        if(data.indexOf(val)!=-1){
          data.splice(data.indexOf(val), 1);
        }
      },
      //切换PC和H5
      toggle(data){
        this.active = data;
      },
      //获取彩种标签列表
      getLottagList() {
          http.getLottagList().then(rs => {
            if(!rs.code){
              this.tagItems = rs.data;
            }
          });
      },
      // 编辑更新
      toUpdate(id){
        this.getLottagDetail(id);
        this.$bvModal.show("modal-edit");
      },
      updateLottag() {
        var arr = [];
        for(var i=0;i<this.recommendselected.length;i++){
          arr.push(this.recommendselected[i].value);
        }
        this.update.lottery_ids = arr;
        http.updateLottag(this.update).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-edit');
            this.getLottagList();
          }
        });
      },
       //增加
      createLottag() {
        http.createLottag(this.tag).then(rs=>{
          if(!rs.code){
             this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
            this.$bvModal.hide('modal-add');
            this.getLottagList();
          }
        })
      },
      getLottagAll(){
        http.getLottagAll().then(rs=>{
            if(!rs.code){
              this.recommendoptions = [];
              rs.forEach(v=>{
                this.recommendoptions.push({text:v.name,value:v.id});
              })

            }
        });
      },
      getLottagDetail(id){
        http.getLottagDetail({id:id}).then(rs=>{
          if(!rs.code){
            this.update = rs;
            this.getOptions();
  
          }
        });
      },
      getOptions(){
          this.recommendselected =[];
          for(var k in this.update['lottery_ids']){
            for(var i=0;i<this.recommendoptions.length;i++){
              if(this.recommendoptions[i].value == this.update.lottery_ids[k]){
                   this.recommendselected.push({text:this.recommendoptions[i].text,value:this.recommendoptions[i].value});   
                }
            }
          }
      },
      //删除
      deleteLottag(id) {
          if (confirm("确定要删除当前标签吗？")) {
            http.deleteLottag({id: id}).then(rs => {
              if (!rs.code) {
                 this.$toast.success({
            message:"标签删除成功！",
            color:'#3cb5f1'
          });
                this.getLottagList();
              }
            });
          }
        },
      updateNavSort(id, sort) {
        http.updateColorLabeSort({id: id, sort}).then(rs => {
          if (!rs.code) {
            this.getLottagList();
          }
        });
      },
    },

    mounted() {
      this.getLottagList();
      this.getLottagAll();
     //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function (event) {
          event.preventDefault();
          event.stopPropagation();
      }         
    },
    watch:{      
      'update.lottery_ids': {
      handler: function(newVal,oldVal) {
        this.update['lottery_ids'] = newVal;
        this.getOptions();
      },
     }
    },
  }
</script>

<style lang="scss" scoped>
  .custom-control-kg {
      display: -ms-inline-flexbox;
      display: -webkit-inline-box;
      display: inline-flex;
      margin-right: 1rem;
  }
  .custom-control-label::after,.custom-control-kg .custom-control-label::before{
    display: none;
  }
  .custom-control-kg .cus-delete{
    position: absolute;
    height: 16px;
    width: 16px;
    top: -2px;
    right: -18px;
    border-radius: 50%;
    border: 1px solid #6c757d;
    line-height: 14px;
    text-align: center;
    color: #6c757d;
    font-size: 12px;
  }
  #messages {}
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
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
        button{
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-right: 100px;
          outline:none;
        }
        .btn{
          width:60px;
          color:#ffffff;
          border-radius:0;
          background: #737373;
          border: 1px solid #737373;
        }
        .click{
          border:1px solid #099ae6;
          background: #099ae6;
        }

      }
    }
  }
  .data-items{
    margin: 30px auto;
    .row:first-child{
      background: #dcdcdc;
      line-height: 40px;
      font-size: 16px;
    }
    .row{
      line-height: 40px;
      background: #ffffff;
      border: 1px solid #dcdcdc;
      border-top: none;
      font-size: 14px;
    }
    button{
      background: #01c36a;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 70px;
    }
    input{
        width: 32px;
        height: 30px;
        line-height: 30px;
        background: #eeeeee;
        border: 1px solid #bfbfbf;
        text-align: center;
        border-radius: 5px;
    }
  }
  .div-edit-keyword {
    padding: 0 10px;

    h5 {
      padding-bottom: 10px;
      border-bottom: 1px solid #c9c9c9;
    }

    p {
      width: 100%;

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
</style>
