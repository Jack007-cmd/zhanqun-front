<template>
  <div id="leaf-manage">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span style="color:#099ae6;border-bottom:3px solid #099ae6;">娱乐图集抓取</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <b-row style="position:relative;">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="请输入图集标题/图集关键字" v-model="search" @change="queryData">
                <span class="input-group-addon glyphicon glyphicon-search" @click="queryData"></span>
              </div>
              <!-- 资讯分类 -->
              <div class="classify">
                <span style="color: #333;">图集栏目：</span>
                <treeselect v-model="selected" style="width: 180px;" :multiple="false" :options="options" />
                <b-button class="clfy-btn" @click="release">一键发布</b-button>
              </div>
          </b-row>
          <div class="leaf-items">
            <b-row>
              <b-col cols="1">序号</b-col>
              <b-col cols="2">抓取时间</b-col>
              <b-col cols="2">图集关键字</b-col>
              <b-col cols="3">图集标题</b-col>
              <b-col cols="2">抓取地址</b-col>
              <b-col cols="2" class="ck-all">
                <label for="fxckbox" class="fx">
                    <input type="checkbox" class="ckbox" id="fxckbox" @click="getCheckedAll()" :checked="checkedAll"/>
                    <span>全选</span>
                </label>
              </b-col>
            </b-row>
            <b-row v-for="(item,index) in leafItems" :key="item.id">
              <!--id	单页id	是	[int]	查看-->
              <!--4	 name	名称	是	[string]-->
              <!--5	 identify	标识	是	[string]-->
              <!--6	 sort	排序	是	[int]	查看-->
              <!--7	 created_at	创建时间	是	[string]	查看-->
              <!--8	 updated_at	修改时间-->
              <b-col cols="1">{{item['id']}}</b-col>
              <b-col cols="2">{{item['created_at']}}</b-col>
              <b-col cols="2"><div class="seo_item">{{item['keywords']}}</div></b-col>
              <b-col cols="3"><div class="seo_item" :title="item['title']">{{item['title']}}</div></b-col>
              <b-col cols="2"><div class="seo_item" :title="item['source_url']"><a target="_blank"  :href="item['source_url']">{{item['source_url']}}</a></div></b-col>
              <b-col cols="2" class="seo_cl">
               <input type="checkbox" :name="item.id" :id="item.id" class="ckbox" @click="getChecked(item.id)" :checked="selectList.indexOf(item.id)!=-1">
              </b-col>
            </b-row>
            <div class="total-number" style="font-size:14px;">共：{{total}}条数据</div>
            <div v-if="totalPage>1" style="margin-top: 30px;">
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

  export default {
    name: "LotterySeoConfig",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        search: '',
        leafItems: [ ],
        totalPage: 0,
        cpage: 1,
        total:0,
        update:{
          name:'',
          keywords:'',
          description:''
        },
        checkedAll:false,
        checkedNum: 0,
        selected:'',
        selectList: [],
        options:[{id: '', label: '请选择栏目'}],
        siteType: 0,
      }
    },
    mounted() {
      this.siteType = this.$store.getters.site['mainLevel'];
      this.fetchData();
      this.getCategoryList();
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getLeafList();  // 向后台发数据请求
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      // toEdit() {
      //   this.$router.push("/dashboard/site/lottery-seoconfig-add?type=1");
      // },
      toUpdate(id) {
        this.$router.push("/dashboard/site/lottery-seoconfig-add?type=2&id=" + id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getLeafList() {
        let params = {
          page: this.cpage
        };
        if (this.search) {
          params['title'] = this.search;
        }
        http.getAtlas(params).then(rs => {
          if (!rs.code) {
            this.leafItems = rs.data;
            this.judgeSelectList();
            this.total = rs.total;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      },
      getChecked(id){
          if(this.selectList.indexOf(id)!=-1){
              this.selectList.splice(this.selectList.indexOf(id),1);
              this.judgeSelectList();
          }else{
              this.selectList.push(id);
              this.judgeSelectList();
          }
      },
      getCheckedAll(){
        this.checkedAll = !this.checkedAll;
        if(this.checkedAll){
          this.addSelectList();
        }else{
          this.deleteSelectList();
        }
      },
      addSelectList(){
        for(let i=0;i<this.leafItems.length;i++){
          if(this.selectList.indexOf(this.leafItems[i].id)==-1){
            this.selectList.push(this.leafItems[i].id);
          }
        }
      },
      deleteSelectList(){
        for(let i=0;i<this.leafItems.length;i++){
          if(this.selectList.indexOf(this.leafItems[i].id)!=-1){
            this.selectList.splice(this.selectList.indexOf(this.leafItems[i].id),1);
          }
        }
      },
      judgeSelectList(){
        this.checkedNum = 0;
        for(let i=0;i<this.leafItems.length;i++){
          if(this.selectList.indexOf(this.leafItems[i].id)!=-1){
            this.checkedNum++;
          }
        }
        if(this.checkedNum<this.leafItems.length){
          this.checkedAll = false;
        }else {
          this.checkedAll = true;
        }
      },
      release(){//一键发布
        var that = this;
        if(!that.selected){
          that.$toast.success({ 
            message:"请选择图集栏目",
            color:'#3cb5f1'
          });
          return;
        }
        if(that.selectList.length<1){
          that.$toast.success({
            message:"请选择发布图集",
            color:'#3cb5f1'
          });
          return;
        }
        http.setAtlasRelease({category_id: that.selected,sys_atlas_ids: that.selectList}).then(rs =>{
          if (rs.success) {
              that.$toast.success({
                message:"发布成功!",
                color:'#3cb5f1'
              });
              that.getLeafList();
              that.selectList = [];
          }else{
              that.$toast.success({
                message:"网络异常!",
                color:'#3cb5f1'
              });
          }
        })
      },
      getCategoryList(){
         http.getAllAtlas().then(rs => {
          if (!rs.code) {
           if(this.siteType === 1){
                rs.forEach(t1 => {
                  if (t1['parent_id'] === 0) {
                    this.options.push({id: t1.id, label: t1.name+'(主)'});
                  }
                });
                rs.forEach(a => {
                  this.options.forEach((b) => {
                    if (b.id === a['parent_id']) {
                      if (!b.children) {
                        b.children = [];
                      }
                      b.children.push({id: a.id, label: a.name+'(主)'});
                    }
                  });
                });
            }else if(this.siteType === 2){
              rs.forEach(t1 => {
                if (t1['parent_id'] === 0) {
                  if(t1['copy_id'] === 0){
                    this.options.push({id:t1.id,label:t1.name+'(副)'});
                  }else{
                    this.options.push({id:t1.id,label:t1.name+'(主)'});
                  }
                }
              });
              rs.forEach(a => {
                this.options.forEach((b) => {
                  if (b.id === a['parent_id']) {
                    if(a['copy_id'] === 0){
                      if(!b.children){
                        b.children=[];
                      }
                      b.children.push({id: a.id,label: a.name+'(副)'});
                    }else{
                      if(!b.children){
                        b.children=[];
                      }
                      b.children.push({id: a.id,label: a.name+'(主)'});
                    }
                  }
                });
              });
            }else{
              rs.forEach(t1 => {
                if (t1['parent_id'] === 0) {
                  this.options.push({id: t1.id, label: t1.name});
                }
              });
              rs.forEach(a => {
                this.options.forEach((b) => {
                  if (b.id === a['parent_id']) {
                    if (!b.children) {
                      b.children = [];
                    }
                    b.children.push({id: a.id, label: a.name});
                  }
                });
              });
            }
          }
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  #leaf-manage {}

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

  .leaf-items {
    margin-top: 30px;

    .row {
      color: #555;
      font-size: 14px;
      line-height: 50px;
      border-left: 1px solid #d2d2d2;
      border-right: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;
 
      .col-1, .col-2 {
        padding: 0;
        overflow: hidden;
      }
      .ck-all{
        display:flex;
        justify-content: center;
        align-items: center
      }
      .fx{
        height: 42px;
        display: block;
        display:flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        margin-bottom: 0!important;
        span{
              color: #555;
              font-size: 16px;
              margin-left: 5px;
        }
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      /*border-radius: 5px;*/
    }

    input {
      width: 32px;
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
    .seo_cl{
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .seo_item{
      width: 100%;
      height: 50px;
      overflow: hidden;
      white-space:nowrap;
	    text-overflow: ellipsis;
      a{
        color: #007bff;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .ckbox{
        height: 20px;
        width: 20px;
    }
  }

  .classify{
      position: absolute;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .clfy-btn{
        padding: 0;
        margin-left: 10px;
        border: 1px solid #3cb5f1;
        background: #3cb5f1 !important;
        width: 85px;
        height: 36px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 5px;
        outline: none;
      }
      // .btn:focus, .btn.focus{
      //   -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)!important;
      //   box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)!important;
      // }
      .btn-secondary:hover{
        color: #fff !important;
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
    width: auto;
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
</style>
