<template>
  <div id="nav-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">导航管理</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30" style="padding: 0">
          <div class="nav-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="2">名称</b-col>
              <b-col cols="2">链接</b-col>
              <b-col cols="2">排序</b-col>
              <b-col cols="2">是否显示</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in navItems" :key="item.id" :pid="item['parent_id']" :class="{hide_child:item['parent_id']!==0}" @click="showChild(item)">
              <b-col cols="2">{{index+1}}</b-col>
              <b-col cols="2">{{item.name}}<span v-if="item['parent_id']===0 && navItems[index+1] && navItems[index+1]['parent_id']===item.id" class="iconfont icon-xiala-copy"></span></b-col>
              <b-col cols="2">{{item.url}}</b-col>
              <b-col cols="2"><input type="number" v-model="item.sort" min="0" @change="updateNavSort(item.id,item.sort)"></b-col>
              <b-col cols="2">
                <span  @mouseover="getCurrentItem(item)">
                <switchc v-model="item.state" text="on|off" @change="getData"></switchc>
               </span>
              </b-col>
              <b-col cols="2">
                <b-button @click="update(item.id)">编辑</b-button>
                <b-button @click="deleteNav(item.id)">删除</b-button>
              </b-col>
            </b-row>
            <div v-if="totalPage>1" style="margin-top: 50px;">
              <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                                align="center"></b-pagination-nav>
            </div>
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
  import SwitchComponent from '../../../common/SwitchComponent'
  export default {
    name: "WebsiteList",
    data() {
      return {
        navItems: [],
        currentItem:{},
        totalPage: 0,
      }
    },
    components: {
      'switchc': SwitchComponent
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      getCurrentItem(item){
        this.currentItem = item;
      },
      getData(data){
        this.switchState(this.currentItem.id,data);
      },
      deleteNav(id) {
        if (confirm("确定要删除该导航吗？")) {
          http.deleteNav({id: id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.getNavList();
            }
          });
        }
      },
      toEdit() {
        this.$router.push("/dashboard/site/ns-edit-nav?type=1" + "&move=0");
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
      switchState(id, state) {
        let body = {
          id: id
        };
        if (state === 0) {
          http.setNavVisible(body).then();
        } else {
          http.setNavHidden(body).then();
        }
      },
      update(id) {
        this.$router.push("/dashboard/site/ns-edit-nav?type=2&id=" + id + "&move=0");
      },
      getNavList(){
        http.getNavList({type: 0}).then(rs=>{
          if(!rs.code){
            this.navItems = this.itemSort(rs);
          }
        });
      },
      updateNavSort(id,sort){
        http.updateNavSort({id:id,sort}).then(rs=>{
          if(!rs.code){
          }
        });
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
      },
    },
    mounted() {
      this.getNavList();
    }
  }
</script>

<style lang="scss" scoped>
  #nav-manage {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;

    .row {
      margin: 0;
      div:nth-of-type(2){
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      div:nth-of-type(3){
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
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

  .nav-items {
    margin-top: 30px;
    border-left: 1px solid #d2d2d2;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;
      background: #eeeeee;
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
    }

    input {
      width: 37px;
      height: 30px;
      line-height: 30px;
      background: #eeeeee;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      text-align: center;
      color: #555555;
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

  .glyphicon-search:before {
    content: "\e003";
    color: #ffffff;
    font-size: 24px;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    margin-left: 100px;
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

  .form-group {
    margin-bottom: 0;

    div {
      height: 32px;
    }
  }
  .hide_child {
    display: none;
  }

  .show_child {
    background: #ffffff!important;
  }
</style>
