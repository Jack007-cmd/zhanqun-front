<template>
  <div id="sort-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">分类管理</span>
          <b-button @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="2">序号</b-col>
            <!--<b-col cols="2">属性</b-col>-->
            <b-col cols="2">分类名称</b-col>
            <b-col cols="2">分类图标</b-col>
            <b-col cols="2">排序</b-col>
            <b-col cols="4">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in items" :key="item.id">
            <b-col cols="2">{{index+1}}</b-col>
            <!--<b-col cols="2">{{item['attr']}}</b-col>-->
            <b-col cols="2">{{item['name']}}</b-col>
            <b-col cols="2"><img v-lazy="item.icon" :key="item.icon" alt="" style="width:40px;height: 40px;"></b-col>
            <b-col cols="2">{{item['sort']}}</b-col>
            <b-col cols="4">
              <b-button @click="update(item.id)">编辑</b-button>
              <b-button @click="deleteNavCategory(item.id)">删除</b-button>
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
    name: "NavSortManage",
    data() {
      return {
        items: [ ]
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      toEdit() {
        this.$router.push("/dashboard/site/nw-edit-sort?type=1");
      },
      update(id) {
        this.$router.push("/dashboard/site/nw-edit-sort?type=2&id="+id);
      },
      getNavCategoryList() {
        http.getNavCategoryList().then(rs => {
          if (!rs.code) {
            this.items = rs.data;
          }
        });
      },
      deleteNavCategory(id) {
        if (confirm("确定要删除当前分类吗？")) {
          http.deleteNavCategory({id: id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.getNavCategoryList();
            }
          });
        }
      }
    },
    mounted() {
      this.getNavCategoryList();
    }
  }
</script>

<style lang="scss" scoped>
  #sort-manage {}

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

        button {
          color: #099ae6;
          border: 1px solid #099ae6;
          background: #ffffff;
          height: 26px;
          line-height: 10px;
          font-size: 12px;
          float: right;
          margin-right: 100px;
          margin-top: 0;
        }
      }
    }
  }

  .data-items {
    margin: 30px auto;

    .row:first-child {
      background: #dcdcdc;
      line-height: 50px;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .row {
      font-size: 14px;
    color: #555;
    line-height: 50px;
    background: #eeeeee;
    border-bottom: 2px solid #ffffff;
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
