<template>
  <div id="user-article">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span class="on">用户文章</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="mtb30">
          <b-row>
            <b-col cols="12" class="filter-div">
              <!--0=正常 1=隐藏 2=待审 3=拒绝-->
              <span :class="{on:state===''}" @click="switchState(-1)">全部</span>
              <span :class="{on:state===0}" @click="switchState(0)">审核通过</span>
              <span :class="{on:state===3}" @click="switchState(3)">审核不通过</span>
              <treeselect  v-model="category_id" style="width: 150px;" :multiple="false" :options="options" />
            </b-col>
          </b-row>
          <div class="article-items">
            <b-row>
              <b-col cols="1">序号</b-col>
              <b-col cols="2">标题</b-col>
              <b-col cols="1">状态</b-col>
              <b-col cols="1">主图</b-col>
              <b-col cols="1">主图栏目</b-col>
              <b-col cols="2">创建时间</b-col>
              <b-col cols="2">修改时间</b-col>
              <b-col cols="1">发布人</b-col>
              <b-col cols="1">操作</b-col>
            </b-row>
            <b-row v-for="(item,index) in articleItems" :key="item.id">
              <b-col cols="1">{{index+1}}</b-col>
              <b-col cols="2" :title="item.title" class="omitting-something">{{item.title}}</b-col>
              <b-col cols="1">{{item.state===0?'审核通过':(item.state===2?'待审核':'审核不通过')}}</b-col>
              <b-col cols="1"><img v-lazy="item['cover_plan']" :key="item['cover_plan']" alt=""></b-col>
              <b-col cols="1">{{item['category_name']}}</b-col>
              <b-col cols="2">
                <template v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template>
              </b-col>
              <b-col cols="2">
                <template v-if="item['updated_at']">{{item['updated_at'].substr(0,16)}}</template>
              </b-col>
              <b-col cols="1">{{item['member_name']}}</b-col>
              <b-col cols="1">
                <b-button @click="toPreview(item.id)">预览</b-button>
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

  export default {
    name: "UserArticle",
    components: {
      'treeselect': VueTreeselect.Treeselect
    },
    data() {
      return {
        category_id: '',
        options: [{id: '', label: '请选择栏目'},],
        state: '',
        articleItems: [ ],
        totalPage: 1,
        cpage: 1
      }
    },
    watch: {
      '$route': 'fetchData',
      category_id(){
        this.queryData();
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      switchState(n) {
        switch (n) {
          case -1:
            this.state = '';
            break;
          case 0:
            this.state = 0;
            break;
          case 3:
            this.state = 3;
            break;
          default:
            this.state = '';
        }
        this.queryData();
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page || 1);
        this.getUserArticleList();
      },
      getUserArticleList() {
        let params = {
          page: this.cpage
        };
        if (this.state !== '') {
          params['state'] = this.state;
        }
        if (this.category_id) {
          params['category_id'] = this.category_id;
        }
        http.getUserArticleList(params).then(rs => {
          if (!rs.code) {
            this.articleItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      },
      toPreview(id) {
        this.$router.push("/dashboard/site/blog-article-preview?id="+id);
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getCategoryList() {
        http.getArticleCategoryList().then(rs => {
          if (!rs.code) {
            rs.data.forEach(t1 => {
              if (t1['parent_id'] === 0) {
                this.options.push({id:t1.id,label:t1.name});
              }
            });
            rs.data.forEach(a => {
              this.options.forEach((b) => {
                if (b.id === a['parent_id']) {
                  if(!b.children){
                    b.children=[];
                  }
                  b.children.push({id: a.id,label: a.name});
                }
              });
            });
          }
        });
      },
    },
    mounted() {
      this.fetchData();
      this.getCategoryList();
    }
  }
</script>

<style lang="scss" scoped>
  #user-article {}

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
      }
    }
  }

  .mtb30 {
    margin: 30px auto;
  }

  .article-items {
    margin-top: 30px;

    .row {
      color: #555;
    font-size: 14px;
    line-height: 50px;
    background: #eeeeee;
    border-bottom: 2px solid #ffffff;

      .col-1, .col-2, .col-3 {
        padding: 0;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
      border-radius: 5px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
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

  .filter-div {
    text-align: left;
    display: inline-flex;
    select {
      width: 300px;
      margin-top: -4px;
    }

    span {
      cursor: pointer;
      text-align: center;
      width: 100px;
      display: inline-block;
      line-height: 37px;
      border: 1px solid #099ae6;
      background: #ffffff;
      color: #555;
      margin-right: 20px;
      top: 2px;
    }

    span.on {
      background: #099ae6;
      color: #ffffff;
    }
  }

  .omitting-something {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
