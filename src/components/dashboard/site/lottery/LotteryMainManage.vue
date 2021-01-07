<template>
<div id="recom-nav">
    <div id="recommend" style="padding:0 0 15px 0">
        <b-container fluid>
            <b-row>
                <b-col cols="12" class="plate-title">
                <span class="on">推荐彩种(pc)</span>
                </b-col>
            </b-row>
            <b-form-group label="">
                <b-form-checkbox-group
                :options="recommendoptions"
                v-model="recommendselected"
                ></b-form-checkbox-group>
            </b-form-group>
            <div class="rec-on">
              <div class="rec-on-new">当前选中彩种</div>
              <draggable v-model="recommend_drag" v-bind="dragOptions">
                          <transition-group class = "custom-control-kg">
                               <div  v-for="item in recommend_drag" :key="item.text" >
                                      <div class="custom-control custom-control-inline custom-checkbox">
                                        <label class="custom-control-label">
                                          <span>{{item.text}} <span class="cus-delete"  @click="deleteLid(recommendselected,item.value)">X</span></span>
                                          </label>
                                      </div>
                              </div> 
                          </transition-group>
              </draggable>              
            </div>
        </b-container>
    </div>
     <div id="recommend">
        <b-container fluid>
            <b-row>
                <b-col cols="12" class="plate-title">
                <span class="on">推荐彩种(wap)</span>
                </b-col>
            </b-row>
            <b-form-group label="">
                <b-form-checkbox-group
                v-model="waprecommendselected"
                :options="waprecommendoptions"
                ></b-form-checkbox-group>
            </b-form-group>
            <div class="rec-on">
              <div class="rec-on-new">当前选中彩种</div>
              <draggable v-model="waprecommend_drag" v-bind="dragOptions">
                          <transition-group class = "custom-control-kg">
                              <div  v-for="item in waprecommend_drag" :key="item.text" >
                                      <div class="custom-control custom-control-inline custom-checkbox">
                                        <label class="custom-control-label">
                                          <span>{{item.text}} <span class="cus-delete"  @click="deleteLid(waprecommendselected,item.value)">X</span></span>
                                          </label>
                                      </div>
                              </div> 
                          </transition-group>
              </draggable>              
            </div>            
        </b-container>
    </div>
     <div id="video">
        <b-container fluid>
        <b-row>
            <b-col cols="12" class="plate-title">
            <span class="on">开奖视频</span>
            </b-col>
        </b-row>
        <b-form-group label="">
                <b-form-checkbox-group
                v-model="videoselected"
                :options="recommendoptions"
                ></b-form-checkbox-group>
            </b-form-group>
          <div class="rec-on">
                <div class="rec-on-new">当前选中彩种</div>
                <draggable v-model="video_drag" v-bind="dragOptions">
                            <transition-group class = "custom-control-kg">
                                <div  v-for="item in video_drag" :key="item.text" >
                                        <div class="custom-control custom-control-inline custom-checkbox">
                                          <label class="custom-control-label">
                                            <span>{{item.text}} <span class="cus-delete"  @click="deleteLid(videoselected,item.value)">X</span></span>
                                            </label>
                                        </div>
                                </div> 
                          </transition-group>
              </draggable>              
            </div>    
        </b-container>
        <b-button @click="updateConfig">确定</b-button>
    </div>
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
import draggable from 'vuedraggable'
  export default {
    name: "LotteryMainManage",
    components:{
      draggable
    },
    data(){
      return{
        recommendselected: [],
        recommendoptions : [],
        recommend_drag : [],
        waprecommendselected: [],
        waprecommendoptions : [],
        waprecommend_drag : [],
        videoselected: [],
        video_drag:[],
        newOptions:[],
        dragOptions: { animation: 500 }
      }

    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getConfigDetail(){
        http.getConfigDetail().then(rs=>{
          if(!rs.code){
            let temp = rs;
            if(rs.lottery_recommend){
              this.recommendselected = this.getOptionsList(rs.lottery_recommend.split(","));
              this.getRecOptions(this.recommendselected,this.recommendoptions,1);
            }
            if(rs.wap_lottery_recommend){
              this.waprecommendselected = this.getOptionsList(rs.wap_lottery_recommend.split(","));
              this.getRecOptions(this.waprecommendselected,this.waprecommendoptions,2);
            }
            if(rs.lottery_video){
              this.videoselected = this.getOptionsList(rs.lottery_video.split(","));
              this.getRecOptions(this.videoselected,this.recommendoptions,3);
            }            
          }
        });
      },
      getOptionsList(data){
        var arr =[];
        for(var i in data){
          arr.push(Number(data[i]))
        }
        return arr;
      },
      setDataType(data){
        var arr = [];
        for(var i=0;i<data.length;i++){
          arr.push(data[i].value);
        }        
        return arr;
      },
      updateConfig() {
        let formData = new FormData();
        formData.append("lottery_recommend", this.setDataType(this.recommend_drag).join(","));
        formData.append("wap_lottery_recommend", this.setDataType(this.waprecommend_drag).join(","));
        formData.append("lottery_video", this.setDataType(this.video_drag).join(","));
        http.updateConfig(formData).then(rs => {
          if(!rs.code){
            this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
           this.getConfigDetail();
          }
        });
      },
      getLottagAll(){
        http.getLottagAll().then(rs=>{
            if(!rs.code){
              this.recommendoptions = [];
              this.waprecommendoptions = [];
              rs.forEach(v=>{
                this.recommendoptions.push({text:v.name,value:v.id});
                this.waprecommendoptions.push({text:v.name,value:v.id});
              })
              this.getConfigDetail();
            }
        });
      },
      getRecOptions(resData,optData,type){
          this.newOptions =[];
          for(var k in resData){
            for(var i=0;i<optData.length;i++){
              if(optData[i].value == resData[k]){
                   this.newOptions.push({text:optData[i].text,value:optData[i].value});   
                }
            }
          }
          if(type===1){
            this.recommend_drag = [];
            this.recommend_drag = this.newOptions;
          }else if(type===2){
            this.waprecommend_drag = [];
            this.waprecommend_drag = this.newOptions;
          }else if(type===3){
            this.video_drag = [];
            this.video_drag = this.newOptions;            
          }
      },
      //删除彩种
      deleteLid(data,val){
        if(data.indexOf(val)!=-1){
           data.splice(data.indexOf(val), 1);
        }
      },      
    },
    mounted() {
      this.getLottagAll();
     //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function (event) {
          event.preventDefault();
          event.stopPropagation();
      }           
    },
    watch:{      
      'recommendselected': {
        handler: function(newVal,oldVal) {
          this.recommendselected = newVal;
          this.getRecOptions(this.recommendselected,this.recommendoptions,1);
        },
     },
     'waprecommendselected': {
        handler: function(newVal,oldVal) {
          this.waprecommendselected = newVal;
          this.getRecOptions(this.waprecommendselected,this.waprecommendoptions,2);
        },       
     },
     'videoselected': {
        handler: function(newVal,oldVal) {
          this.videoselected = newVal;
          this.getRecOptions(this.videoselected,this.recommendoptions,3);
        },           
     }
    },    
  }
</script>

<style lang="scss" scoped>
  #recom-nav{}
  #messages {
    padding: 15px 25px;
  }
  #recommend {
    padding: 25px 0 15px 0;
  }
  #video {
    padding: 25px 0 15px 0;
    .plate-title {
      padding-bottom: 10.4px;
    }
  }
  .form-group{
    padding: 10px 30px;
    text-align: left;
  }
  .form-check-inline{
    margin-right: 20px;
    font-size: 14px;
    }

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;
    .sure {
      margin-top: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }


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
      }
    }
  }
  button{
    margin-top: 30px;
    background: #099ae6;
    border: none;
    width: 100px;
  }
  button:hover{
    background: #099ae6;
  }
  .rec-on{
    position: relative;
    .rec-on-new{
      border-top:1px solid  #cccccc;
      width: calc(100% - 60px);
      height: 30px;
      line-height: 30px;
      text-align: left;
      // padding: 0 30px;
      margin: 0 auto;
    }
  .custom-control-kg {
        display: -ms-inline-flexbox;
        display: -webkit-inline-box;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        width: calc(100% - 60px);
        margin: 0 auto;
        padding: 0;
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
  }
</style>
