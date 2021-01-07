<template>
  <div id="recruit-list">

    <b-container fluid>
      <b-row>
        <b-col class="mtb20" cols="11">
          <div class="div-search">
            <input type="text" v-model="identify" @change="queryData"
                   placeholder="请输入站群ID搜索站群" autocomplete="off">
            <b-button @click="queryData">搜索</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mtb20" cols="9">
          <b-row>
            <b-col v-if="recruitItems.length>0" cols="4" v-for="item in recruitItems" :key="item.id">
              <b-card>
                <b-media @click="toDetail(item)">
                  <b-img slot="aside" v-lazy="item.logo" :key="item.logo" width="50%"
                         alt="站群logo"></b-img>
                  <p v-if="item.description" style="height: 96px;">
                    <span>{{item.name}}</span> <br>
                    <span>ID：</span> <span class="group-ID-detail">{{item.identify}}</span> <br>
                    <span>站群介绍：</span>
                    <span class="group-detail">
                    {{item.description.trim().substring(0,16)}}...
                      </span>
                  </p>
                </b-media>
                <div class="recruit-info">
                  <p v-if="item.content"><span>招募介绍:</span>
                    <span class="recruit-detail">
                    {{item.content.trim().substring(0,30)}}...
                      </span>
                  </p>
                  <b-button @click="toDetail(item)">了解更多</b-button>
                </div>
              </b-card>
            </b-col>


            <b-col v-if="recruitItems.length===0" offset="4" cols="4">
              <b-card>
                <div class="recruit-info">
                  <p>真抱歉，没有找到对应的站群信息</p>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </b-container>
    <div v-if="totalPage>1">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router align="center"></b-pagination-nav>
    </div>
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
    name: "RecruitList",
    data() {
      return {
        identify: '',
        totalPage: 0,
        cpage: 1,
        recruitItems: []
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      toDetail(item) {
        this.$router.push('/dashboard/recruit-detail?id=' + item['group_id']);
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
        this.getRecruitList();
      },
      getRecruitList() {
        let params = {
          per_page: 6,
          page: this.cpage
        };
        if (this.identify.trim()) {
          params['identify'] = this.identify.trim();
        }
        http.getRecruitList(params).then(rs => {
          if (!rs.code) {
            this.recruitItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 6);
          }

        });
      }
    },
    mounted() {
      this.getRecruitList();
    }
  }
</script>

<style lang="scss" scoped>
  #recruit-list {
    height: 100vh;
    background: url("../../../assets/imgs/home-bg.png") no-repeat #000000;
    background-position: top;
    background-size: cover;
    width: 100%;
  }

  .container-fluid {
    padding-top: 30px;
    color: #555555;
  }

  .mtb20 {
    margin: 20px auto;
  }

  .card {
    margin-bottom: 20px;
    border-radius: 0;
  }

  .group-ID-detail, .group-detail, .recruit-detail {
    font-size: 14px;
  }

  .media {
    padding-bottom: 10px;
    border-bottom: 1px solid #dcdcdc;

    div:first-child {
      width: 121px;

      img {
        border-radius: 5px;
        width: 100%;
        height: 101px;
      }
    }

    .media-body {
      p {
        text-align: left;
      }
    }
  }

  .div-search {
    text-align: center;
    margin-top: 5%;
    height: 41px;
    display: inline-flex;

    input {
      padding-left: 10px;
      font-size: 14px;
      position: relative;
      z-index: 2;
      width: 565px;
      height: 41px;
      font-size: 14px;
      color: #ffffff ;
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid #D2D2D2;
      border-radius: 5px;
      outline: none;
    }

    input::placeholder {
      color: #ffffff;
    }

    button {
      margin-top:0;
      margin-left: 15px;
      background: #01c36a;
      border: none;
      width: 108px;
      height: 41px;
      font-size: 16px;
      outline: none;
    }
  }

  .recruit-info {
    margin-top: 10px;

    p {
      text-align: left;
      height: 45px;
    }

    button {
      font-size: 14px;
      float: right;
      width: 80px;
      background: #2a94de;
      border: none;
    }
  }
</style>
