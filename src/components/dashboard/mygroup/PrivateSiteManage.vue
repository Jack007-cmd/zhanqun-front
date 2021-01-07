<template>
  <div id="private-site-manage">
    <b-container fluid>
      <b-row>
        <b-col class="item-title" cols="12">
          <span class="title">站点概览</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="site-kinds">
          站点类型：
          <ul>
            <li :class="{on:type===0}" @click="switchType(0)">全部</li>
            <li :class="{on:type===item.id}" v-for="item in typeList" @click="switchType(item.id)">{{item.name}}</li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-row>
            <b-col class="input-div">
              <input type="text" v-model="search" placeholder="请输入站点名称或站点域名" @change="queryData">
              <b-button class="btn-search" @click="queryData">搜索</b-button>
              <b-button class="create-site" @click="toCreate">创建网站</b-button>
            </b-col>
          </b-row>
        </b-col>

      </b-row>
      <b-row style="min-height: 980px;">
        <b-col class="mtb20" sm="12" md="11">
          <b-row>
            <b-col sm="10" xl="4" lg="6" v-for="(item,index) in siteList" :key="item.id">
              <span class="pending-review" v-if="item.state===1">待审核</span>
              <b-card>
                <b-media>
                  <b-media>
                    <b-img v-lazy="item.logo" :key="item.logo"  slot="aside" width="64" alt="logo" style="background: #ccc;"></b-img>
                    <!--<b-img :src="item.logo" :onerror="errorImg" width="64" alt="logo"></b-img>-->
                    <h5 class="mt-0">{{item.name.length>12?(item.name.substr(0,12)+'...'):item.name}}
                      <span class="glyphicon glyphicon-note" @click="toUpdate(item.id)"></span>
                      <!--<span></span>-->
                      <span
                      v-if="item.state!==1 && item.type!==8" class="to-backstage" @click="toBackstage(item.id,item.type,item.name,item.domain)">进入后台</span></h5>
                    <a class="mb-0 domain" :title="item.domain" @click="toRescue(item.domain)">
                      {{item.domain}}
                    </a>
                    <p class="mb-0">
                      站点类型：{{item['type_name']}}
                    </p>
                    <p class="mb-0">
                      责任人：{{item['user_name']}}
                    </p>
                    <p>
                      创建时间：{{item['created_at'].substr(0,10)}}
                    </p>
                  </b-media>
                  <p class="mb-0 create-info">
                    域名解析地址：{{item.ip}}<br>
                    CNAME域名解析：<a @click="toRescue(item['sld_domain'])" style="cursor: pointer;">{{trimProtocol(item['sld_domain'])}}</a>
                    <span class="glyphicon glyphicon-question-sign" v-b-modal="'modal-resolution-step'"></span>
                    <span><b-button v-if="item.state===0" variant="danger" @click="stop(item.id)">暂停</b-button> <b-button
                      v-if="item.state===2" variant="danger" @click="activate(item.id)">激活</b-button></span>
                  </p>
                </b-media>
              </b-card>
            </b-col>

          </b-row>
        </b-col>
      </b-row>

      <b-modal id="modal-resolution-step" size="xl" centered hide-header="true" hide-footer="true">
        <img src="../../../assets/imgs/resolution-step.png" height="701" width="1107"/>
      </b-modal>
      <div v-if="totalPage>1">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                          align="center"></b-pagination-nav>
      </div>

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
  import * as http from '../../../../apis/net'

  export default {
    name: "PrivateSiteManage",
    data() {
      return {
        type: 0,
        search: '',
        siteList: [],
        typeList: [],
        errorImg:'this.src="' + require('../../../assets/imgs/default.png') + '"',
        totalPage: 1,
        cpage: 1,
        sid: ''//操作对应的站点id
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      toRescue(domain) {
        window.open("http://"+domain,"_blank");
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
      toUpdate(id){
        this.$router.push("/dashboard/my-group/update-site?id="+id);
      },
      queryData() {
        if (this.cpage !== 1) {
          this.$router.push(this.$route.path);
        } else {
          this.fetchData();
        }
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;
        this.getPrivateSite();
      },
      switchType(id) {
        if(this.type === id){
          return;
        }
        this.type = id;
        this.queryData();
      }
      ,
      //暂停站点
      stop(id) {
        http.setPrivateSiteMaintain(id).then(rs => {
          if (!rs.code) {
            this.fetchData();
          }
        });
      },
      toBackstage(id, type ,siteName ,siteDomain) {
        this.$store.commit('setSite', {type: type, id: id, siteName: siteName, siteDomain: siteDomain});
        let destination = '';
        switch (type) {
          case 1:
            destination="/dashboard/site/lottery-basic-info";
            break;
          case 2:
            destination="/dashboard/site/blog-basic-info";
            break;
          case 3:
            destination="/dashboard/site/ns-basic-info";
            break;
          case 4:
            destination="/dashboard/site/nw-basic-info";
            break;
          case 5:
            destination="/dashboard/site/hk-basic-info";
            break;
          case 6:
            destination="/dashboard/site/trade-basic-info";
            break;
          case 7:
            destination="/dashboard/site/leaf-basic-info";
            break;
          case 9:
            destination = "/dashboard/site/cust-basic-info";
          case 10:
            destination = "/dashboard/site/company-basic-info";
            break;            
          default:
            destination="/dashboard/site";
        }
        this.$router.push(destination);
        
      },
      //激活站点
      activate(id) {
        http.activatePrivateSite(id).then(rs => {
          if (!rs.code) {
            this.fetchData();
          }
        });
      },
      //创建站点
      toCreate() {
        this.$router.push("/dashboard/my-group/create-site");
      },
      //站群的站点列表
      getPrivateSite() {
        let that = this;
        let params = {
          per_page: 12,
          page: that.cpage,
          state:'0,2'
        };
        if (that.type) {
          params['type'] = that.type;
        }
        if (that.search) {
          params['name_domain'] = that.search;
        }
        http.getPrivateSite(params).then(rs => {
          if (!rs.code) {
            that.siteList = rs.data;
            that.totalPage = Math.ceil(rs.total / 12);
          }
        });
      }
      ,
      //获取站点类型列表
      getSiteType() {
        http.getSiteType().then(rs => {
          if (!rs.code) {
            this.typeList = rs;
          }
        });
      }
      ,
      trimProtocol(url) {
        if (url) {
          if (url.substr(0, 7).toLowerCase() === "http://") {
            return url.substr(7);
          } else if (url.substr(0, 8).toLowerCase() === "https://") {
            return url.substr(8);
          } else {
            return url;
          }
        }
      }
    },
    mounted() {
      this.getSiteType();
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #private-site-manage {
    padding: 25px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    padding: 30px;
    background: #ffffff;
  }

  .item-title {
    height: 30px;
    line-height: 30px;
    /*margin: 0 auto;*/
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #bfbfbf;

    .title {
      margin-left: 10px;
    }

  }


  .input-div {

    input {
      width: 350px;
      height: 38px;
      border-radius: 5px;
      border: 1px solid #d2d2d2;
      background: #ffffff;
      margin-right: 20px;
      padding-left: 10px;
    }

    button {
      width: 100px;
      margin-right: 20px;
    }

    .btn-search {
      background: #2a94de;
      border: none;
      color: #ffffff;
    }

    .create-site {
      background: #01c36a;
      border: none;
      color: #ffffff;
    }

  }

  .data-board {
    margin: 0 auto;
    padding: 10px 0;
  }

  .mtb20 {
    margin: 20px auto;
  }

  .media {
    h5, p {
      text-align: left;
      font-size: 14px;

      .wait-audit, .to-backstage {
        line-height: 20px;
      }
    }
    .domain{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 240px;
      display: block;
      text-align: left;
      font-size: 14px;
      cursor: pointer;
    }

    span:nth-child(even) {
      float: right;
      cursor: pointer;
    }
  }

  .media .media-body{
    width: 100%;
  }
  .media .media-body .media {
    div:first-child {
      width: 167px;

      img {
        width: 100%;
        height: 114px;
      }
    }
  }

  .card {
    margin-bottom: 70px;
    background: #eeeeee;
    border-radius: 0;
  }

  .btn-danger {
    background: #e70012;
    width: 70px;
  }

  .create-info {
    line-height: 30px;

    button {
      line-height: 18px;
    }
  }

  .to-backstage {
    border-bottom: 1px solid #959595;
  }

  .append-member {
    color: #2a94de;
    float: right;
    cursor: pointer;
  }

  .site-kinds {
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
    line-height: 30px;

    ul {
      list-style: none;
      display: inline-flex;
      padding-left: 0;

      li {
        margin-right: 20px;
        cursor: pointer;
      }

      li.on, li:hover {
        color: #2a94de;
      }
    }

  }

  .glyphicon-question-sign:before {
    content: "\e085"
  }

  .glyphicon-question-sign:hover {
    color: #3cb5f1;
  }

  .glyphicon-note:before {
    content: '';
    background: url("../../../assets/imgs/note.png") no-repeat 100%;
    width: 24px;
    height: 22px;
    display: block;
  }

  .pending-review {
    line-height: 15px;
    color: #ffffff;
    background: #e60012;
    padding: 5px 10px;
    border-radius: 10px;
    z-index: 1;
    left: 25px;
    top: 10px;
    position: absolute;
  }

  #modal-append-member {
    .custom-control-inline {
      margin-right: 33px !important;
    }

    button {
      background: #3cb5f1;
      width: 100px;
      border: none;
      line-height: 25px;
      margin: 50px 20px;
    }
  }

  .tooltip-inner {
    background-color: #a9a7a8 !important;
  }
  /deep/ .card-body{
    padding-bottom: 10px;
  }
</style>
