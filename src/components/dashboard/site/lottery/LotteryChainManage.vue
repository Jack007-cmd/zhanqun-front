<template>
  <div id="chain-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">友链管理</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="chain-items">
          <b-row>
            <b-col cols="1">序号</b-col>
            <b-col cols="2">友链名称</b-col>
            <b-col cols="2">链接</b-col>
            <b-col cols="1">排序</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="2">修改时间</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in chainItems" :key="item.id">
            <b-col cols="1">{{index+1}}</b-col>
            <b-col cols="2" class="beyond-hiding" :title="item.name">{{item.name}}</b-col>
            <b-col cols="2" class="beyond-hiding" :title="item.url">{{item.url}}</b-col>
            <b-col cols="1"><input type="number" min="0" v-model="item.sort"  @change="updateChainSort(item.id,item.sort)"></b-col>
            <b-col cols="2"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></b-col>
            <b-col cols="2"><template  v-if="item['updated_at']">{{item['updated_at'].substr(0,16)}}</template></b-col>
            <b-col cols="2">
              <b-button @click="toUpdate(item.id)">编辑</b-button>
              <b-button @click="deleteChain(item.id)">删除</b-button>
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
  </div>
</template>

<script>
  import * as http from '../../../../../apis/site'
    export default {
        name: "ChainManage",
      data() {
        return {
          chainItems: []
        }
      },
      methods: {
        back(){
          this.$router.go(-1);//返回上一层
        },
        toEdit() {
          this.$router.push("/dashboard/site/lottery-chain-edit?type=1");
        },
        toUpdate(id) {
          this.$router.push("/dashboard/site/lottery-chain-edit?type=2&id=" + id);
        },
        getChainList() {
          http.getChainList().then(rs => {
            if (!rs.code) {
              this.chainItems = rs.data;

            }
          });
        },
        deleteChain(id) {
          if (confirm("确定要删除当前友链吗？")) {
            http.deleteChain({id: id}).then(rs => {
              if (!rs.code) {
                this.getChainList();
              }
            });
          }
        },
        updateChainSort(id,sort){
          http. updateChainSort({id:id,sort:sort}).then(rs=>{
            if(!rs.code){
            }
          });
        }
      },
      mounted() {
        this.getChainList();
      }
    }
</script>

<style lang="scss" scoped>
  #chain-manage{}
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
          line-height: 32px;
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 11px;
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

  .chain-items {
    margin: 30px auto;

    .row {
      color:#555;
      font-size: 14px;
      line-height: 50px;
      background: #eeeeee;
      margin-bottom: 2px;
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      margin-bottom: 10px;
    }

    input {
      width: 32px;
      height: 30px;
      line-height: 30px;
      color:#555;
      background: #eeeeee;
      border: 1px solid #bfbfbf;
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
  }
</style>
