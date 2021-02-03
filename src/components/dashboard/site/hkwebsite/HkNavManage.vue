<template>
  <div id="sort-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">导航管理</span>
          <b-button @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="2">序号</b-col>
            <b-col cols="2">名称</b-col>
            <b-col cols="2">链接</b-col>
            <b-col cols="2">排序</b-col>
            <b-col cols="2">是否显示</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in navItems" :pid="item['parent_id']" :class="{hide_child:item['parent_id']!==0}"
                 @click="showChild(item)" :key="item.id">
            <b-col cols="2">{{index+1}}</b-col>
            <b-col cols="2">{{item.name}} <span v-if="item['parent_id']===0 && navItems[index+1] && navItems[index+1]['parent_id']===item.id" class="iconfont icon-xiala-copy"></span></b-col>
            <b-col cols="2" :title="item['url']">{{item['url']}}</b-col>
            <b-col cols="2"><input type="number" v-model="item.sort" min="0" @change="updateNavSort(item.id,item.sort)"> </b-col>
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
    name: "HkNavManage",
    components: {
      'switchc' : SwitchComponent
    },
    data(){
      return{
        navItems:[],
        currentItem: {}
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
      getCurrentItem(item){
        this.currentItem = item;
      },
      getData(data){
        this.switchState(this.currentItem.id,data)
      },
      switchState(id,state) {
        let body = {
          id :id
        };
        if(state === 0 ){
          http.setNavVisible(body).then();
        }else{
          http.setNavHidden(body).then();
        }
      },
      getNavList() {
        http.getNavList().then(rs => {
          if(!rs.code){
           this.navItems =this.itemSort(rs);
          }
        })
      },
      deleteNav(id){
        if(confirm("确定要删除该导航吗？")) {
          http.deleteNav({id : id}).then(rs => {
            if(!rs.code){
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.getNavList();
            }
          });
        }
      },
      updateNavSort(id, sort) {
        http.updateNavSort({id: id, sort}).then(rs => {
          if (!rs.code) {
          }
        });
      },
      toEdit(){
        this.$router.push("/dashboard/site/hk-nav-add?type=1");
      },
      update(id) {
        this.$router.push("/dashboard/site/hk-nav-add?type=2&id=" + id);
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
      this.getNavList();
    },
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
        // height: 50px;

        span {
          // line-height: 52px;
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 14px;
        }

        span.on {
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
        button{
          color: #099ae6;
          border: 1px solid #099ae6;;
          background: #ffffff;
          // height: 30px;
          line-height: 12px;
          font-size: 12px;
          float: right;
          margin-right: 100px;
        }
      }
    }
  }
  .data-items{
    margin: 30px auto;
    .row:first-child{
      margin-bottom: 10px;
      background: #dcdcdc;
      line-height: 40px;
      font-size: 16px;
    }
    .row{
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      background: #eeeeee;
      margin-bottom: 2px;
      div:nth-of-type(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div:nth-of-type(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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
        width: 37px;
        height: 30px;
        line-height: 30px;
        background: #eeeeee;
        border: 1px solid #bfbfbf;
        text-align: center;
        border-radius: 5px;
    }
  }
  .hide_child {
    display: none;
  }

  .show_child {
    background: #ffffff!important;
  }

</style>
