<template>
  <div id="messages">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">分类管理</span>
          <b-button class="btn-add" @click="toCreate">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="3">ID</b-col>
            <b-col cols="3">分类名称</b-col>
            <b-col cols="3">创建时间</b-col>
            <b-col cols="3">操作</b-col>
          </b-row>

          <b-row v-for="(item,index) in items" :pid="item['parent_id']" :class="{hide_child:item['parent_id']!==0}"
                 @click="showChild(item)" :key="item.id">
            <b-col cols="3">{{index+1}}</b-col>
            <b-col cols="3">{{item.name}} <span v-if="item['parent_id']===0 && items[index+1] && items[index+1]['parent_id']===item.id" class="iconfont icon-xiala-copy"></span></b-col>
            <b-col cols="3">
              <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
            </b-col>
            <b-col cols="3">
              <template>
                <b-button @click="update(item.id)">编辑</b-button>
                <b-button @click="deleteCategory(item.id)">删除</b-button>
              </template>

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
    name: "CompanySortManage",
    data(){
      return{
        items:[]
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
       showChild(item) {
        if (item['parent_id'] === 0) {
          let tRow = $(".row[pid='" + item.id + "']");
          if (tRow.hasClass("show_child")) {
            tRow.removeClass("show_child").addClass("hide_child");
          } else {
            tRow.removeClass("hide_child").addClass("show_child");
          }
        }
      },
      toCreate(pid) {
        this.$router.push("/dashboard/site/company-sort-add?type=1&pid=" + pid);
      },
      update(id) {
        this.$router.push("/dashboard/site/company-sort-add?type=2&id=" + id);
      },
      getProductCategoryList() {
        http.getProductCategoryList().then(rs => {
          if(!rs.code) {
           this.items = this.itemSort(rs.data);
          }
        });
      },
      deleteCategory(id) {
      if(confirm("确定删除当前栏目吗？")) {
        http.deleteProductCategory({id : id}).then(rs => {
          if(!rs.code){
             this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
            this.getProductCategoryList();
          }
        });
      }
      },
      itemSort(temp) {
        let all = [];
        temp.forEach(t1 => {
          if (t1['parent_id'] === 0) {
            all.push(t1);
          }
        });
        temp.forEach(a => {
          all.forEach((b, i) => {
            if (b.id === a['parent_id']) {
              all.splice(i + 1, 0, a);
            }
          });
        });
        return all;
      }
    },
    mounted() {
        this.getProductCategoryList();
    }
  }
</script>

<style lang="scss" scoped>
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

  .data-items {
    margin: 30px auto;

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      margin-bottom: 10px;
    }

    .row {
      border-bottom: 2px solid #ffffff;
      cursor: pointer;
      color: #555;
      font-size: 14px;
      height: 50px;
      background: #eeeeee;
      /*margin-bottom: 2px;*/
      border-radius: 5px;

      div {
        line-height: 50px;
      }
      // div:nth-of-type(2) {
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
      // }
    }

    button {
      background: #01c36a;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      min-width: 70px;
      max-width: 100px;
    }
  }

  .div-add-subordinate {
    padding: 0 10px;

    h5 {
      padding-bottom: 10px;
      border-bottom: 1px solid #c9c9c9;
    }

    p {
      width: 100%;

      input {
        width: 50%;
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

  .hide_child {
    display: none;
  }

  .show_child {
    background: #ffffff!important;
  }
</style>
