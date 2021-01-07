<template>
    <div id="edit-leaf">
      <b-container fluid>
        <b-row>
          <b-col cols="12" class="plate-title">
            <!-- <span :class="{on:plate==='a'}">新增</span> -->
            <span :class="{on:plate==='b'}">编辑</span>
          </b-col>
        </b-row>
        <!-- <b-row v-if="plate==='a'" class="create-info">
          <b-col cols="12">
            <table cellpadding="12">
                <tr>
                    <td>彩种名称:</td>
                    <td><input type="text" v-model="creat.name"></td>
                </tr>
                <tr>
                    <td>彩种code:</td>
                    <td><input type="text" v-model="creat.code"></td>
                </tr>
                <tr>
                    <td style="vertical-align: baseline;">关键词:</td>
                    <td>
                        <textarea name="" v-model="creat.keywords"></textarea>
                        <i>注：一般不超过100个字符，关键词用英文逗号隔开</i>
                    </td>
                    </tr>
                <tr>
                    <td style="vertical-align: baseline;">描述:</td>
                    <td>
                        <textarea name="" v-model="creat.description"></textarea>
                        <i>注：一般不超过200个字符</i>
                    </td>
                </tr>
            </table>
            <div style="padding-left: 38%;">
              <b-button @click="createLeaf()">确定</b-button>
              <b-button @click="back">取消</b-button>
            </div>
          </b-col>
        </b-row> -->
        <b-row v-if="plate==='b'" class="update-info">
          <b-col cols="12">
            <table cellpadding="12">
                <tr>
                    <td>彩种名称:</td>
                    <td><input type="text" v-model="update.name" disabled="disabled"></td>
                </tr>
                <tr>
                    <td style="vertical-align: baseline;">关键词:</td>
                    <td>
                        <textarea name="" v-model="update.keywords"></textarea>
                        <i>注：一般不超过100个字符，关键词用英文逗号隔开</i>
                    </td>
                    </tr>
                <tr>
                    <td style="vertical-align: baseline;">描述:</td>
                    <td>
                        <textarea name="" v-model="update.description"></textarea>
                        <i>注：一般不超过200个字符</i>
                    </td>
                </tr>
            </table>
            <div style="padding-left: 38%;">
              <b-button @click="updateLeaf(update.id)">确定</b-button>
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
  // 工具栏配置
    export default {
     name: "lotterySeoconfigAdd",
      data() {
        return {
          plate: 'a',
          creat: {
                type:'',
                name:'',
                code:'',
                keywords:'',
                description:''
            },
            update:{
                name:'',
                keywords:'',
                description:''
            },
        }
      },
      created() {
      },
      methods: {
        back(){
          this.$router.go(-1);//返回上一层
        },
        // createLeaf() {
        //   this.creat['type'] =1;
        //   if (!this.creat['name']) {
        //      this.$toast.success({
        //     message:"请填写名称！",
        //     color:'#3cb5f1'
        //   });
        //     return;
        //   }
        //   if (!this.creat['code']) {
        //      this.$toast.success({
        //     message:"请填写彩种code！",
        //     color:'#3cb5f1'
        //   });
        //     return;
        //   }
        //   if (!this.creat['keywords']) {
        //      this.$toast.success({
        //      message:"请填写关键词！",
        //     color:'#3cb5f1'
        //   });
        //     return;
        //   }
        //   if (!this.creat['description']) {
        //      this.$toast.success({
        //      message:"请填写描述！",
        //     color:'#3cb5f1'
        //   });
        //     return;
        //   }
        //   http.createLotterySeo(this.creat).then(rs => {
        //     if (!rs.code) {
        //        this.$toast.success({
        //         message:"保存成功！",
        //         color:'#3cb5f1'
        //     });
        //       this.back();
        //     }
        //   });
        // },
        updateLeaf(id) {
          this.creat['id'] = id;
          if (!this.update['name']) {
             this.$toast.success({
            message:"请填写名称！",
            color:'#3cb5f1'
          });
            return;
          }
          if (!this.update['keywords']) {
             this.$toast.success({
            message:"请填写关键词！",
            color:'#3cb5f1'
          });
            return;
          }          
          if (!this.update['description']) {
             this.$toast.success({
             message:"请填写描述！",
            color:'#3cb5f1'
          });
            return;
          }
          http.updateLotterySeoUpdate(this.update).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"保存成功！",
            color:'#3cb5f1'
          });
              this.back();
            }
          });
        },
        getLotterySeoDetail(id) {
          http.getLotterySeoDetail({id:id}).then(rs => {
            if (rs) {
              this.update = rs;
            }
          });          
        }
      },
      mounted() {
        this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
        if (this.$route.query.id) {
          this.getLotterySeoDetail(this.$route.query.id);
        }
      }
    }
</script>

<style lang="scss" scoped>
#edit-leaf{}
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
        textarea{
            width: 100%;
            border: 1px solid #a0a0a0;
            border-radius: 5px;    
            overflow: auto;
            resize: vertical;                    
        }
        i{
            font-style: normal;
            font-size: 12px;
            display: block;           
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
