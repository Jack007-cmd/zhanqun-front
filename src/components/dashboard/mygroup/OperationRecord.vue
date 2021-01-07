<template>
  <div id="operate-record">
    <b-container fluid>
      <b-row>
        <b-col class="mtb20 div-search" cols="11">
          <input id="name" v-model="name" type="text" placeholder="成员昵称" @change="queryData">
          <input type="date" name="start" v-model="start" placeholder="开始时间">——
          <input type="date" name="end" v-model="end" placeholder="结束时间">
          <b-button @click="queryData">搜索</b-button>
        </b-col>
      </b-row>
      <b-row >
        <b-col class="recordList" cols="11">
          <b-row>
            <b-col cols="3">操作用户</b-col>
            <b-col cols="2">登陆IP</b-col>
            <b-col cols="5">操作</b-col>
            <b-col cols="2">时间</b-col>
          </b-row>

          <b-row v-for="(item,index) in recordItems" :key="item.id">
            <b-col cols="3"><template v-if="item.user">{{item.user.name}}</template></b-col>
            <b-col cols="2">{{item.ip}}</b-col>
            <b-col cols="5" :title="item.content" class="omitting-something">{{item.content}}</b-col>
            <b-col cols="2">{{item['created_at'].substring(0,16)}}</b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="overflow-auto" v-if="totalPage>1" style="margin-top: 30px;">
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
    name: "OperationRecord",
    data() {
      return {
        msg: '这里是操作记录',
        name: '',
        start: '',
        end: '',
        totalPage: 0,
        cpage: 1,
        recordItems: [],
        role:0
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      queryData() {
        this.$router.push(this.$route.path);
        this.fetchData();
      },
      //路由地址发生变化抓取数据
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getGoupLog();  // 向后台发数据请求
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      getGoupLog() {
        let params = {
          page:this.cpage,
          per_page: 24
        };
        if (this.name) {
          params['name'] = this.name;
        }
        if (this.start) {
          params['start_at'] = this.start;
        }
        if (this.end) {
          params['end_at'] = this.end;
        }
        if(this.role===0){
          http.getPrivateGoupLog(params).then(rs => {
            if (!rs.code) {
              this.recordItems = rs.data;
              this.totalPage = Math.ceil(rs.total / 24);
            }
          });
        }else{
          http.getGoupLog(params).then(rs => {
            if (!rs.code) {
              this.recordItems = rs.data;
              this.totalPage = Math.ceil(rs.total / 24);
            }
          });
        }

      },

    },
    mounted() {
      this.role = Number(this.$store.getters.role);
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #operate-record {
    padding: 25px;
    min-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 69px);
  }

  .container-fluid {
    padding: 0 30px 30px 30px;
    background: #ffffff;
    border-radius: 10px;
  }

  .item-title {
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #1183bf;

    .thick-line {
      height: 100%;
      border: 4px solid #1183bf;
      bottom: 2px;
      position: absolute;
    }

    .thin-line {
      height: 100%;
      border-left: 2px solid #1183bf;
      bottom: 2px;
      left: 10px;
      position: absolute;
    }

    .title {
      margin-left: 20px;
    }
  }

  .mtb20 {
    margin: 20px auto;
    padding: 0;
  }

  .recordList {
    margin: 0 auto;

    .row {
      font-size: 14px;
      line-height: 40px;
    }

    .row:first-child {
      font-size: 16px;
      line-height: 50px;
    }

    .row:nth-child(odd) {
      background: #eeeeee;
    }
  }

  .div-search {
    text-align: right;

    #search {
      width: 300px;
      height: 36px;
      border-radius: 5px;
      border: 1px solid #d2d2d2;
      padding-left: 10px;
    }

    input {
      border: 1px solid #a3a3a3;
      border-radius: 5px;
      height: 36px;
      padding-left: 10px;
      width: 165px;
    }

    button {
      background: #2a94de;
      border: none;
      width: 100px;
      margin-left: 10px;
      margin-top: -5px;
    }
  }
  .omitting-something {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
