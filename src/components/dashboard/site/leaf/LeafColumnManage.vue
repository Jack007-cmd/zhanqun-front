<template>
  <div id="column-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">栏目管理</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-items">
          <b-row>
            <b-col cols="2">序号</b-col>
            <b-col cols="2">网站类别</b-col>
            <b-col cols="2">栏目名称</b-col>
            <b-col cols="2">创建时间</b-col>
            <b-col cols="2">是否显示</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in items" :pid="item['parent_id']" :class="{hide_child:item['parent_id']!==0}"
                 @click="showChild(item)" :key="item.id">
            <b-col cols="2">{{index+1}}</b-col>
            <b-col cols="2" v-if="mainLevel==1">主</b-col>
            <b-col cols="2" v-else-if="mainLevel==2 && item['copy_id']==0">副</b-col>
            <b-col cols="2" v-else-if="mainLevel==2 && item['copy_id']!=0">主</b-col>
            <b-col cols="2" v-else-if="mainLevel!=1 && mainLevel!=2">/</b-col>
            <b-col cols="2">{{item.name}} <span v-if="item['parent_id']===0 && items[index+1] && items[index+1]['parent_id']===item.id" class="iconfont icon-xiala-copy"></span></b-col>
            <b-col cols="2">
              <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
            </b-col>
            <b-col cols="2">
              <span  @mouseover="getCurrentItem(item)">
                <switchc v-model="item.state"  text="on|off" @change="getData"></switchc>
              </span>
            </b-col>
            <b-col cols="2">
              <!--<template v-if="item['parent_id']===0">-->
                <!--<b-button @click.stop="toCreate(item.id)">添加下级</b-button>-->
                <!--<b-button @click.stop="update(item.id)">编辑</b-button>-->
              <!--</template>-->
              <!--<template v-if="item['parent_id']!==0">-->
                <b-button v-if="mainLevel!=2" @click="update(item)">编辑</b-button>
                <!--<b-button @click="deleteCategory(item.id)">删除</b-button>-->
              <!--</template>-->
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-edit" size="xs" body-bg-variant="light" centered hide-header hide-footer>
      <div class="div-edit">
        <h4>编辑</h4>
        <p>
          栏目名称 <input type="text" v-model="tempItem.name">
        </p>
        <b-button @click="saveCategory">保存</b-button>
        <b-button @click="$bvModal.hide('modal-edit')">返回</b-button>
      </div>
    </b-modal>
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
  // import common from '../../../../common'
  export default {
    name: "ColumnManage",
    components: {
      'switchc': SwitchComponent
    },
    data() {
      return {
        tempItem:{},
        currentItem:'',
        options: [
          {text: 'on', value: '1'},
          {text: 'off', value: '0'},
        ],
        items: [],
        mainLevel:''
        // newCategory: {}
      }
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
          http.setArticleCategoryVisible(body).then();
        } else {
          http.setArticleCategoryHidden(body).then();
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
      // toCreate(pid) {
      //   this.$router.push("/dashboard/site/blog-edit-column?type=1&pid=" + pid);
        // this.newCategory={
        //   parent_name:pname,
        //   parent_id:pid,
        //   identify:common.randomString(8),
        //   name:'',
        // };
        // this.$bvModal.show('modal-add-subordinate');
      // },
      update(item) {
        this.tempItem = item;
        this.$bvModal.show('modal-edit');
        // this.$router.push("/dashboard/site/nw-edit-column?id="+id);
      },
      saveCategory(){
        if(!this.tempItem.name){
          this.$toast.success({
            message:"请填写栏目名称！",
            color:'#3cb5f1'
          });
          return;
        }
        http.updateArticleCategory(this.tempItem).then(rs=>{
          if(!rs.code){
            this.$toast.success({
              message:"保存成功！",
              color:'#3cb5f1'
            });
            this.$bvModal.hide('modal-edit');
          }
        });
      },
      getCategoryList() {
        http.getAllArticleCategory().then(rs => {
          if (!rs.code) {
            this.items = this.itemSort(rs);
            // this.items = rs.data;
          }
        });
      },
      // deleteCategory(id) {
      //   if (confirm("确定要删除当前栏目吗？")) {
      //     http.deleteArticleCategory({id: id}).then(rs => {
      //       if (!rs.code) {
      //          this.$toast.success({
      //       message:"删除成功！",
      //       color:'#3cb5f1'
      //     });
      //         this.getCategoryList();
      //       }
      //     });
      //   }
      // },
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
      this.getCategoryList();
    }
  }
</script>

<style lang="scss" scoped>
  #column-manage {}

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
          padding: 0 50px 12px;
        }

        span.on {
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
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
  .div-edit{
    text-align: center;
    width: 450px;
    margin: 0 auto;

    h4 {
      text-align: left;
      margin-bottom: 10px;
    }
    p{
      text-align: left;
    }
    input {
      width: 300px;
      border: 1px solid #ced4da;
      border-radius: 5px;
    }

    button {
      background: #2a94de;
      min-width: 80px;
      color: #ffff;
      border: none;
      margin: 20px 0 5px;
    }
  }
</style>
