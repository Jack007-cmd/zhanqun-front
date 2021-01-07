<template>
  <div id="info">
    <b-container fluid>
      <b-row v-if="infoList.length>0" v-for="item in infoList" :key="item.id">
        <b-col><span @click="toNext(item.data)">●&nbsp;{{item.content}}</span> <span
          class="time"><template  v-if="item['created_at']">{{item['created_at'].substr(0,16)}}</template></span></b-col>
      </b-row>

      <b-row v-if="infoList.length===0">
        <b-col> 您暂时还没有收到消息 </b-col>
      </b-row>

    </b-container>
    <b-container fluid style="background: transparent!important;">
      <b-row>
        <b-col class="back-window" cols="2">
          <span class="btn-back" @click="back"><i class="iconfont icon-fanhui"></i> 返回</span>
        </b-col>
      </b-row>
    </b-container>
    <div class="overflow-auto" v-if="totalPage>1">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
    </div>
  </div>
</template>

<script>
  import * as http from '../../../apis/net'

  export default {
    name: "Info",
    data() {
      return {
        totalPage: 0,
        infoList: [],
        cpage:1
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      //路由地址发生变化抓取数据
      fetchData(){
        this.cpage= Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        this.getUserNotice();  // 向后台发数据请求
      },
      //分页获取消息
      getUserNotice() {
        let params={
          page:this.cpage,
          per_page:20
        };
        http.getUserNotice(params).then(rs => {
          if (!rs.code) {
            this.infoList = rs.data;
            this.totalPage = Math.ceil(rs.total / 20);
          }
        });
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`;
      },
      //  点击跳转
      toNext(data) {
        // apply_join_group:申请加入站群
        if (data.action === 'apply_join_group' || data.action === 'apply_create_web') {          //  处理申请
          this.$store.commit('setIdentify', data.target.id);
          this.$store.commit('setRole', 99);
          this.$router.push('/dashboard/my-group/audit-center');
        } else if (data.action === 'create_answer_question') {
          //  处理招募令回复信息
          this.$router.push('/dashboard/recruit-detail?id='+ data.target.id);
        } else {
          //  其他
        }
      }
    },
    mounted() {
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  #info {
    min-height: calc(100vh - 69px);
    background: #000000;
    padding: 30px 120px;

  }

  .container-fluid {
    padding: 40px 50px;
    background: #ffffff;
    margin-bottom: 30px;

    .row {
      width: 100%;
      padding: 0 10px;
      line-height: 50px;
      cursor: pointer;

      span:first-child {
        float: left;
      }

      span:last-child {
        float: right;
      }
    }

    .row:nth-child(odd) {
      background: #eeeeee;
    }
  }
</style>
