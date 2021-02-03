<template>
  <div id="synchro-manage">
    <b-container fluid>
      <b-row>
        <b-col class="item-title" cols="12">
          <span class="title">站点同步管理</span>
          <b-button class="btn-add" @click="addSynchro">新增同步</b-button>
          <div class="tips" @mouseover="tipsPopShow" @mouseout="tipsPopHide">
             <div class="tips-pop" v-show="tipsShow"> 
               <span class="pop_img"></span>
               <div style="color:#333333;font-weight: bold;">同步功能说明：</div>
               <div>1.可以选择一个主站点和十个副站点进行绑定</div>
               <div>2.绑定过后在主站点发布文章等新闻资讯时副站点会同步</div>
               <div>自动发布这些资讯</div>
               <div>3.必须是同类型的站点才可以进行绑定</div>
             </div>
          </div>
        </b-col>
       
      </b-row>
      <b-row>
        <b-col>
          <div class="synch-item" v-for="(item,index) in synchroList" :key="index">
            <div class="sych-nav-lf">
              <img class="nav-lf-img" v-lazy="item['logo']" :key="item['logo']" alt="logo" />
              <div class="item-lf-nec">
                <p class="ncp">
                  类型 :
                  <span class="nc-txt">{{item.type_name}}</span>
                </p>
                <p class="ncp">
                  名称 :
                  <span class="nc-txt">{{item.name}}</span>
                </p>
                <p class="ncp">
                  域名 :
                  <span class="nc-txt">{{item.domain}}</span>
                </p>
                <img class="nc-img" src="../../../assets/imgs/link.png" />
              </div>
            </div>
            <div v-if="item.sub_webs.length > 0" class="sych-nav-rg">
              <div class="nav-mt">
                <div class="mt-con ft" v-for="(item1,index1) in item.sub_webs" :key="index1">
                  <img class="mt-img" v-lazy="item1['logo']" :key="item1['logo']" />
                  <div class="mt-nec">
                    <p class="mtp">
                      名称 :
                      <span class="mt-txt">{{item1.name}}</span>
                    </p>
                    <p class="mtp">
                      域名 :
                      <span class="mt-txt">{{item1.domain}}</span>
                    </p>
                    <b-button class="del" @click="deleteVice(item1.id)">删除</b-button>
                  </div>
                </div>
              </div>
              <div class="nav-mb">
                <b-button class="set-up" @click="setUpSynchro(item)">设置</b-button>
              </div>
            </div>
            <div class="sych-nav-nt" v-if="item.sub_webs.length==0">
              暂无站点同步信息
              <b-button class="nt-del" @click="deleteMain(item.id)">删除</b-button>
              <b-button class="nt-add" @click="setUpSynchro(item)">设置</b-button>
            </div>
            <div style="clear:both;"></div>
          </div>
          <div v-if="totalPage>1" style="margin-top: 30px;">
            <b-pagination-nav
              :link-gen="linkGen"
              :number-of-pages="totalPage"
              use-router
              align="center"
            ></b-pagination-nav>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- 新增同步 -->
    <b-modal id="modal-add" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>新增同步</h5>
        <i class="nav_icon iconfont icon-shanchu" @click="$bvModal.hide('modal-add')"></i>
        <div class="edit-con">
          <div class="edit-type">
            <span>类型 :</span>
            <treeselect
              class="sel"
              v-model="addTypeVal"
              style="width: 120px;height:36px;"
              :multiple="false"
              :options="addTypeOptions"
            />
          </div>
          <div class="edit-type">
            <span>主站 :</span>
            <treeselect
              class="sel"
              v-model="addMainVal"
              style="width: 220px;height:36px;"
              :multiple="false"
              :options="addMainOptions"
            />
          </div>
        </div>
        <div class="edit-line"></div>
        <div class="edit-con">
          <div class="edit-type" v-for="(item1,index1) in addList" :key="index1">
            <span>副站{{index1+1}}:</span>
            <treeselect
              class="sel"
              v-model="item1.id"
              style="width: 220px;height:36px;"
              :multiple="false"
              :options="addViceOptions"
            />
            <span class="edit-del" @click="editDelete(index1)">删除</span>
          </div>
        </div>
        <div class="edit-con mtp">
          <span class="add-sub" :class="{dsab:addList.length>=10}" @click="addSub">新增副站点</span>
        </div>
        <div class="edit-btn">
          <b-button class="save" @click="createSynchro">保存</b-button>
          <b-button class="cancel" @click="$bvModal.hide('modal-add')">取消</b-button>
        </div>
      </div>
    </b-modal>

    <!-- 站点同步设置 -->
    <b-modal id="modal-setUp" size="xs" centered hide-header hide-footer>
      <div class="div-edit-keyword">
        <h5>站点同步设置</h5>
        <i class="nav_icon iconfont icon-shanchu" @click="$bvModal.hide('modal-setUp')"></i>
        <div class="edit-con">
          <div class="edit-type">
            <span>类型 :</span>
            <treeselect
              class="sel dsab"
              v-model="setTypeVal"
              style="width: 120px;height:36px;"
              :multiple="false"
              :options="addTypeOptions"
            />
          </div>
          <div class="edit-type">
            <span>主站 :</span>
            <treeselect
              class="sel dsab"
              v-model="setMainVal"
              style="width: 220px;height:36px;"
              :multiple="false"
              :options="setMainOptions"
            />
          </div>
        </div>
        <div class="edit-line"></div>
        <div class="edit-con">
          <div class="edit-type" v-for="(item1,index1) in setList" :key="index1">
            <span>副站{{index1+1}}:</span>
            <treeselect
              class="sel"
              v-model="item1.id"
              style="width: 220px;height:36px;"
              :multiple="false"
              :options="setViceOptions"
            />
            <span class="edit-del" @click="editSetDelete(index1)">删除</span>
          </div>
        </div>
        <div class="edit-con mtp">
          <span class="add-sub" :class="{dsab:setList.length>=10}" @click="addSetSub">新增副站点</span>
        </div>
        <div class="edit-btn">
          <b-button class="save" @click="createSetSynchro">保存</b-button>
          <b-button class="cancel" @click="$bvModal.hide('modal-setUp')">取消</b-button>
        </div>
      </div>
    </b-modal>
    <b-container fluid style="background: transparent!important;">
      <b-row>
        <b-col class="back-window" cols="2">
          <span class="btn-back" @click="back">
            <i class="iconfont icon-fanhui"></i> 返回
          </span>
        </b-col>
      </b-row>
    </b-container>    
  </div>
</template>

<script>
import * as http from "../../../../apis/net";

export default {
  name: "synchroManage",
  components: {
    treeselect: VueTreeselect.Treeselect
  },
  data() {
    return {
      totalPage: 1,
      cpage: 1,
      synchroList: [],
      addTypeVal: "",
      addMainVal: "",
      addTypeOptions: [{ id: "", label: "请选择" }],
      addTypeList: [],
      addMainOptions: [{ id: "", label: "请选择" }],
      addViceOptions: [{ id: "", label: "请选择" }],
      addList: [],
      setTypeVal: "",
      setMainVal: "",
      setList: [],
      setMainOptions: [{ id: "", label: "请选择" }],
      setViceOptions: [{ id: "", label: "请选择" }],
      tipsShow:false
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    //新增同步弹窗
    addSynchro() {
      this.$bvModal.show("modal-add");
      this.addTypeVal = "";
      this.addMainVal = "";
      this.addList = [{id:""}];
      this.getSynchroType();
    },
    //设置
    setUpSynchro(item) {
      this.$bvModal.show("modal-setUp");
      this.setTypeVal = "";
      this.setMainVal = "";
      this.getSynchroType();
      var key = "";
      for (var i = 0; i < this.addTypeList.length; i++) {
        if (this.addTypeList[i] == item.type_name) {
          key = i;
        }
      }
      if(key>6){
          key += 2;
      }else{
          key += 1;
      }
      this.setTypeVal = key;
      this.setMainVal = item.id;
      this.getSynchroMainSetUpWebs(key);
      this.getSynchroSubsidiarySetUpWebs(item.id);
      this.setList = [];
      for (var i in item.sub_webs) {
        this.setList.push({
          id: (item.sub_webs[i].id).toString()
        });
      }
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    addSub() {
      this.addList.push({ id: "" });
    },
    addSetSub() {
      this.setList.push({ id: "" });
    },
    //新增同步保存数据
    createSynchro() {
      let params = {};
      var arr = [];
      params["main_web_id"] = this.addMainVal;
      for (var i in this.addList) {
        if (this.addList[i].id != "") {
          arr.push(this.addList[i].id);
        }
      }
      if(!(this.judgmentRepetition(arr))){
          this.$toast.success({
            message: "请勿选择相同的副站点",
            color: "#3cb5f1"
          });
          return;        
      }      
      params["subs"] = arr;
      http.createSynchronization(params).then(rs => {
        if (rs.success) {
          this.$toast.success({
            message: "保存成功",
            color: "#3cb5f1"
          });
          this.$bvModal.hide("modal-add");
          this.getWebSynchron();
        }
      });
    },
    //新增同步删除副站
    editDelete(i) {
      Vue.delete(this.addList, i);
    },
    //站点同步删除副站
    editSetDelete(i) {
      Vue.delete(this.setList, i);
    },
    // 新增同步获取类型
    getSynchroType() {
      http.getWebsiteType().then(rs => {
        if (!rs.code) {
          var obj = [];
          obj.push({ id: "", label: "请选择" });
          for (var i in rs) {
            obj.push({ id: i, label: rs[i] });
          }
          this.addTypeOptions = obj;
        }
      });
    },
    // 新增同步获取主站
    getSynchroMainWebs(type, sid, sname) {
      http.getSynchroMainWebs({ type: type }).then(rs => {
        if (!rs.code) {
          var obj = [];
          obj.push({ id: "", label: "请选择" });
          for (var i in rs) {
            if (rs[i].main_level != 2) {
              obj.push({ id: rs[i]["id"], label: rs[i]["name"] });
            }
          }
          this.addMainOptions = obj;
        }
      });
    },
    // 新增同步获取副站
    getSynchroSubsidiaryWebs(id) {
      http.getSynchroSubsidiaryWebs({ id: id }).then(rs => {
        if (!rs.code) {
          var obj = [];
          obj.push({ id: "", label: "请选择" });
          for (var i in rs) {
            if (rs[i].main_level != 1) {
              if(rs[i].main_level == 2){
                this.addList.push({ id: rs[i]["id"].toString() });
              }
              obj.push({ id: rs[i]["id"].toString(), label: rs[i]["name"] });
            }
          }
          if(this.addList.length>1){
            this.addList.splice(0, 1);
          }
          this.addViceOptions = obj;
        }
      });
    },
    // 站点同步设置获取主站
    getSynchroMainSetUpWebs(type) {
      http.getSynchroMainWebs({ type: type }).then(rs => {
        if (!rs.code) {
          var obj = [];
          obj.push({ id: "", label: "请选择" });
          for (var i in rs) {
            if (rs[i].main_level != 2) {
              var rid = rs[i]["id"].toString();
              obj.push({ id: rid, label: rs[i]["name"] });
            }
          }
          this.setMainOptions = obj;
        }
      });
    },
    // 站点同步获取副站
    getSynchroSubsidiarySetUpWebs(id) {
      http.getSynchroSubsidiaryWebs({ id: id }).then(rs => {
        if (!rs.code) {
          var obj = [];
          obj.push({ id: "", label: "请选择" });
          for (var i in rs) {
            if (rs[i].main_level != 1) {
              obj.push({ id: rs[i]["id"].toString(), label: rs[i]["name"] });
            }
          }
          this.setViceOptions = obj;
        }
      });
    },
    //站点同步保存数据
    createSetSynchro() {
      let params = {};
      var arr = [];
      params["main_web_id"] = this.setMainVal;
      for (var i in this.setList) {
        if (this.setList[i].id != "") {
          arr.push(this.setList[i].id);
        }
      }
      if(!(this.judgmentRepetition(arr))){
          this.$toast.success({
            message: "请勿选择相同的副站点",
            color: "#3cb5f1"
          });
          return;        
      }
      params["subs"] = arr;
      http.createSynchronization(params).then(rs => {
        if (rs.success) {
          this.$toast.success({
            message: "保存成功",
            color: "#3cb5f1"
          });
          this.$bvModal.hide("modal-setUp");
          this.getWebSynchron();
        }
      });
    },
    //删除副站
    deleteVice(id) {
      this.deleteSite(id);
    },
    // 删除主站
    deleteMain(id) {
      this.deleteSite(id);
    },
    deleteSite(id) {
      if (confirm("确定要删除这个站点吗？")) {
        http.removeSynchronization({ id: id }).then(rs => {
          if (rs.success) {
            this.$toast.success({
              message: "删除成功",
              color: "#3cb5f1"
            });
            this.getWebSynchron();
          }
        });
      }
    },
    //获取主站数据
    getTypeList() {
      http.getWebsiteType().then(rs => {
        if (!rs.code) {
          var obj = [];
          for (var i in rs) {
            obj.push(rs[i]);
          }
          this.addTypeList = obj;
        }
      });
    },
    //路由地址发生变化抓取数据
    fetchData() {
      this.cpage = Number(this.$route.query.page) || 1; // 这个就是当前要请求的页数
      this.getWebSynchron(); // 向后台发数据请求
    },
    //加载数据源
    getWebSynchron() {
      let that = this;
      that.cpage = that.cpage || Number(that.$route.query.page) || 1;
      let params = {
        per_page: 10,
        page: that.cpage
      };
      http.getWebSynchron(params).then(rs => {
        if (!rs.code) {
          that.synchroList = rs.data;
          that.totalPage = Math.ceil(rs.total / 10);
        }
      });
    },
    //判断数组重复字段
    judgmentRepetition(arr){
      var str = arr.join(",")+",";
      var repeat = true;
      for(var i=0;i<arr.length;i++) {
        if(str.replace(arr[i]+",","").indexOf(arr[i]+",")>-1) {
          repeat =false;
        }
      }
      return repeat;
    },
    tipsPopShow(){
      this.tipsShow =true;
    },
    tipsPopHide(){
      this.tipsShow =false;
    }
  },
  mounted() {
    this.fetchData();
    this.getTypeList();
  },
  watch: {
    $route: "fetchData",
    addTypeVal: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.addList=[{id:""}];
          this.addMainOptions = [{ id: "", label: "请选择" }];
          this.addViceOptions = [{ id: "", label: "请选择" }];
          this.getSynchroMainWebs(newVal);
        }
        this.addMainVal = "";
      }
    },
    addMainVal: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.addList=[{id:""}];
          this.addViceOptions = [{ id: "", label: "请选择" }];
          this.getSynchroSubsidiaryWebs(newVal);
        }
      }
    },
    setTypeVal: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.getSynchroMainSetUpWebs(newVal);
        }
      }
    },
    setMainVal: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.getSynchroSubsidiarySetUpWebs(newVal);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1920px) {
  .media h5,
  .media p,
  .mtb-rg-nav span {
    font-size: 0.8rem;
  }
}
@media screen and (min-width: 1921px) {
  .media h5,
  .media p,
  .mtb-rg-nav span {
    font-size: 1rem;
  }
}
@media (max-width: 1680px) {
  .col-md-11 {
    flex: 0 0 98%;
    max-width: 98%;
  }
}

#synchro-manage {
  padding: 25px;
  min-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 69px);
}

.container-fluid {
  position: relative;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
}

.item-title {
  height: 30px;
  line-height: 30px;
  padding: 0;
  text-align: left;
  border-bottom: 1px solid #bfbfbf;
  position: relative;
  .title {
    margin-left: 10px;
  }
}
.tips{
  float: right;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: -4px;
  position: relative;
  background: url('../../../assets/imgs/visit_why.png') no-repeat;
  background-size: 100% 100%; 
  cursor: pointer;
}
.tips-pop{  
    position: absolute;
    top: 33px;
    right: -10px;
    width: 450px;
    height: 155px;
    z-index: 999;
    background: #ffffff;
    border: 1px solid #9DC2E1;
    padding: 0 10px;
    box-sizing: border-box;
}
.pop_img{
   position: absolute;
    width: 15px;
    height: 10px;
    right: 12px;
    top: -10px;
    background: url('../../../assets/imgs/fxtop_pop.png') no-repeat;
}
.tips-pop div{
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
.btn-add {
  width: 100px;
  height: 32px;
  line-height: 10px;
  font-size: 14px;
  float: right;
  margin-top: -10px;
  margin-right: 0;
  color: #fff;
  border: none;
  background: #01c36a;
}
.synch-item {
  margin-top: 20px;
  width: 100%;
  min-height: 142px;
  background: rgba(245, 245, 245, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  cursor: pointer;
  border-radius: 6px;
  display: flex;

  .sych-nav-lf,
  .sych-nav-rg,
  .sych-nav-nt {
    // float: left;
    width: 500px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .sych-nav-lf {
    height: 142px;
  }
  .sych-nav-rg,
  .sych-nav-nt {
    width: calc(100% - 500px);
  }
  .sych-nav-nt {
    line-height: 142px;
    text-align: left;
    font-size: 14px;
    color: #999999;
    .nt-del,
    .nt-add {
      position: absolute;
      top: 56px;
      right: 110px;
      width: 78px;
      height: 30px;
      background: rgba(245, 245, 245, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 3px;
      color: #333333;
      font-size: 14px;
      line-height: 14px;
    }
    .nt-add {
      right: 20px;
      background: #3cb5f1;
      color: #ffffff;
      padding: 0;
      border-radius: 3px;
      border: none;
    }
  }
  .sych-nav-lf img.nav-lf-img {
    position: absolute;
    top: 20px;
    left: 20px;
    display: block;
    width: 144px;
    height: 100px;
    background: #adadad;
    border-radius: 3px;
    float: left;
  }
  .item-lf-nec {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 295px;
    height: 100px;
    float: left;
    p.ncp {
      text-align: left;
      color: #999999;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    span.nc-txt {
      color: #333333;
    }
    img.nc-img {
      position: absolute;
      right: 20px;
      top: 33px;
      width: 36px;
      height: 36px;
      background: rgba(187, 187, 187, 1);
      border-radius: 50%;
    }
  }
  .sych-nav-rg {
    .nav-mb,
    .nav-mt {
      width: 120px;
      box-sizing: border-box;
      float: left;
      position: relative;
    }
    .nav-mt {
      width: calc(100% - 120px);
    }
    .set-up {
      width: 78px;
      height: 30px;
      background: #3cb5f1;
      border-radius: 3px;
      font-size: 14px;
      border: none;
      line-height: 14px;
      position: absolute;
      top: 50px;
      left: 22px;
    }
    .mt-con {
      width: 100%;
      height: 64px;
      padding: 11px;
      box-sizing: border-box;
      .mt-img {
        display: block;
        width: 59px;
        height: 40px;
        border-radius: 3px;
        float: left;
      }
      .mt-nec {
        float: left;
        font-size: 14px;
        position: relative;
        p.mtp {
          height: 20px;
          margin-left: 10px;
          text-align: left;
          color: #999999;
          margin-bottom: 0 !important;
          width: 240px;
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        span.mt-txt {
          color: #333333;
        }
        .del {
          position: absolute;
          top: 5px;
          left: 320px;
          width: 78px;
          height: 30px;
          background: rgba(245, 245, 245, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 3px;
          color: #333333;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
    .mt-con.ft {
      border-bottom: 1px solid #e7e7e7;
    }
    .mt-con.bt {
      margin-top: 11px;
    }
    .mt-con.bt .del {
      top: 7px;
    }
  }
}
.synch-item:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(170, 170, 170, 1);
}
.div-edit-keyword {
  padding: 0 5px;
  position: relative;
  .icon-shanchu {
    position: absolute;
    right: 5px;
    top: -2px;
    cursor: pointer;
  }
  h5 {
    padding-bottom: 10px;
    color: #333333;
    font-size: 18px;
  }

  p {
    width: 100%;

    input {
      width: 80%;
      border: 1px solid #dcdcdc;
    }
  }

  button {
    border: none;
    width: 80px;
    margin: 5px;
    height: 36px;
    font-size: 14px;
  }
  button.save {
    background: #3cb5f1;
    color: #ffffff;
  }
  button.cancel {
    background: #dddddd;
    color: #666666;
  }
  .edit-con {
    margin-left: 75px;
    position: relative;
    box-sizing: border-box;
  }
  .edit-type {
    width: 100%;
    height: 38px;
    line-height: 38px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
  }
  .edit-con .edit-type:nth-child(1) {
    margin-top: 22px;
  }
  .edit-type span {
    width: 60px;
    text-align: right;
    font-size: 14px;
    color: #666666;
    margin-right: 20px;
  }
  .edit-type span.edit-del {
    width: 45px;
    color: #3cb5f1;
    cursor: pointer;
  }

  .sel {
    // position: absolute;
    // left: 80px;
    // top: 0;
    font-size: 14px;
    color: #999999 !important;
  }
  .sel.dsab {
    pointer-events: none;
  }
  .edit-line {
    margin-left: 45px;
    margin-top: 22px;
    width: 550px;
    border-bottom: 1px solid #dddddd;
  }
  .edit-btn {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
  .add-sub {
    color: #01c36a;
    font-size: 14px;
    margin-left: 80px;
    cursor: pointer;
  }
  .add-sub.dsab {
    pointer-events: none;
    color: gray;
  }
  .mtp {
    margin-top: 10px;
  }
}
/deep/ .modal-content {
  width: 640px !important;
  min-height: 400px;
}

/deep/ .vue-treeselect__x-container {
  display: none;
}
/deep/ .vue-treeselect__control {
  display: inline-block;
}
/deep/ .vue-treeselect--has-value .vue-treeselect__input {
  height: 36px;
}
/deep/ .sel.dsab .vue-treeselect__control {
  background: #f5f5f5;
}
@media (min-width: 576px) {
  /deep/ .modal-dialog {
    max-width: 640px !important;
  }
}
</style>
