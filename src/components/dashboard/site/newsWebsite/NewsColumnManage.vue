<template>
  <div id="column-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">栏目管理</span>
          <b-button class="btn-add" @click="toEdit">新增+</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <div class="column-items">
            <b-row>
              <b-col cols="2">序号</b-col>
              <b-col cols="2">名称</b-col>
              <b-col cols="2">图标</b-col>
              <b-col cols="2">排序</b-col>
              <b-col cols="2">是否显示</b-col>
              <b-col cols="2">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in columnItems" :pid="item['parent_id']" :class="{hide_child:item['parent_id']!==0}"
                   @click="showChild(item)" :key="item.id">
              <b-col cols="2">{{index+1}}</b-col>
              <b-col cols="2">{{item.name}} <span v-if="item['parent_id']===0 && columnItems[index+1] && columnItems[index+1]['parent_id']===item.id" class="iconfont icon-xiala-copy"></span></b-col>
              <b-col cols="2"><img v-lazy="item.icon" :key="item.icon" alt="" style="height: 40px;width:40px;"></b-col>
              <b-col cols="2"><input type="number" min="0" v-model="item.sort" @change="updatePlatformCategorySort(item.id,item.sort)"></b-col>
              <b-col cols="2">
                <span  @mouseover="getCurrentItem(item)">
                <switchc v-model="item.state" text="on|off" @change="getData"></switchc>
               </span>
              </b-col>
              <b-col cols="2">
                <b-button v-if="mainLevel!=2" @click="toUpdate(item.id)">编辑</b-button>
                <b-button v-if="mainLevel!=2" @click="removeColumn(item.id)">删除</b-button>
              </b-col>
            </b-row>
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
    name: "NewsColumnManage",
    data() {
      return {
        columnItems: [],
        currentItem:{},
        mainLevel:''
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
      switchState(id, state) {
        let body = {
          id: id
        };
        if (state === 0) {
          http.setPlatformCategoryVisible(body).then();
        } else {
          http.setPlatformCategoryHidden(body).then();
        }
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
      toEdit() {
        this.$router.push("/dashboard/site/ns-edit-column?type=1");
      },
      toUpdate(id) {
        this.$router.push("/dashboard/site/ns-edit-column?type=2&id=" + id);
      },
      removeColumn(id) {
        if (confirm("确定要删除当前数据？")) {
          http.deletePlatformCategory({id: id}).then(rs => {
            if (!rs.code) {
               this.$toast.success({
            message:"删除成功！",
            color:'#3cb5f1'
          });
              this.getPlatformCategory();
            }
          });
        }
      },
      updatePlatformCategorySort(id,sort){
        http.updatePlatformCategorySort({id:id,sort}).then(rs=>{
          if(!rs.code){}
        });
      },
      getPlatformCategory() {
        http.getPlatformCategoryAll().then(rs => {
          if (!rs.code) {
            // this.columnItems = rs;
            this.columnItems = this.itemSort(rs);
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
      }
    },
    mounted() {
      this.mainLevel = this.$store.getters.site.mainLevel;
      this.getPlatformCategory();
    }
  }
</script>

<style lang="scss" scoped>
  #column-manage {}

  .container-fluid {
    padding: 20px 0;
    background: #ffffff;
    color: #555555;

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

  .column-items {
    margin-top: 30px;

    .row {
      cursor: pointer;
      color: #555;
      font-size: 14px;
      line-height: 50px;
      background: #eeeeee;
      border-bottom: 2px solid #ffffff;

      .col-1, .col-2 {
        padding: 0;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      margin-bottom: 10px;
    }

    input {
      width: 34px;
      height: 30px;
      line-height: 30px;
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
  .hide_child {
    display: none;
  }

  .show_child {
    background: #ffffff!important;
  }
</style>
