<template>
  <div id="sort-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">头部导航</span>
          <b-button @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="1">序号</b-col>
            <b-col cols="2">名称</b-col>
            <b-col cols="2">链接</b-col>
            <b-col cols="2">图标</b-col>
            <b-col cols="1">排序</b-col>
            <b-col cols="2">是否显示</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in navItems" :id="item.id" :pid="item['parent_id']" :class="{hide_child:item['parent_id']!==0}"
                 @click="showChild(item)" :key="item.id">
            <b-col cols="1">{{index+1}}</b-col>
            <b-col cols="2">{{item.name}} <span v-if="item.childlength" class="iconfont icon-xiala-copy"></span></b-col>
            <!-- <b-col cols="2">{{item.name}} <span v-if="item['parent_id']===0 && navItems[index+1] && navItems[index+1]['parent_id']===item.id" class="iconfont icon-xiala-copy"></span></b-col> -->
            <b-col cols="2" :title="item['url']">{{item['url']}}</b-col>
            <b-col cols="2"><img  v-if="item['parent_id'] != 0" :src="item['icon']" :key="item['icon']" alt="" width="30" height="30"></b-col>
            <b-col cols="1"><input type="number" v-model="item.sort" min="0" @change="updateNavSort(item.id,item.sort)"> </b-col>
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
    name: "LotteryHeadManage",
    components: {
      'switchc': SwitchComponent
    },
    data(){
      return{
        navItems:[],
        currentItems:{},
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      showChild(item) {
        // if (item['parent_id'] === 0) {
          let tRow = $(".row[pid='" + item.id + "']");          
          if (tRow.hasClass("show_child")) {
            tRow.removeClass("show_child").addClass("hide_child");
            for(let i=0;i<tRow.length;i++){
              $(".row[pid='" + tRow[i].id + "']").removeClass("show_child").addClass("hide_child");    
            }
          } else {
            tRow.removeClass("hide_child").addClass("show_child");
          }
        // }
      },
      getCurrentItem(item){
        this.currentItem = item;
      },
      getData(data){
        this.switchState(this.currentItem.id,data);
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
      getNavList(){
        http.getNavList({type:0}).then(rs => {
          if(!rs.code){
            this.navItems =this.itemSort(rs);
          }
        });
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
      toEdit(){
        this.$router.push("/dashboard/site/lottery-nav-add?type=1&mold=0");
      },
      update(id) {
        this.$router.push("/dashboard/site/lottery-nav-add?type=2&id=" + id);
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
            if (b.id === a['parent_id'] ) {
              b.childlength=b.childlength?(b.childlength+1):1;              
              all.splice(i + 1, 0, a);
            }
          });
        });
        temp.forEach(c => {
            all.forEach((d, j) => {
                if (all.indexOf(c)===-1 && d.id === c['parent_id'] && c['parent_id']!==0) {
                  d.childlength=d.childlength?(d.childlength+1):1;              
                  all.splice(j + 1, 0, c);
                }
            });      
        });

        return all;
      },
      updateNavSort(id, sort) {
        http.updateNavSort({id: id, sort}).then(rs => {
          if (!rs.code) {
          }
        });
      },
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
        padding-bottom: 5.4px;

        span {
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 13px;
        }

        span.on {
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
        button{
          color: #099ae6;
          border: 1px solid #099ae6;;
          background: #ffffff;
          height: 30px;
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
      background: #dcdcdc;
      line-height: 40px;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .row{
      line-height: 40px;
      background: #eeeeee;
      border-bottom: 2px solid #ffffff;
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
  .hide_child {
    display: none;
  }

  .show_child {
    background: #ffffff!important;
  }
</style>
