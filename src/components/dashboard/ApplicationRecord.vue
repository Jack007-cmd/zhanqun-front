<template>
  <div id="app-record">
    <b-container>
      <b-row>
        <b-col class="item-title" cols="12">
          <span :class="{title:plate==='a'}" @click="queryData('a')">创建站群申请</span>
          <span :class="{title:plate==='b'}" @click="queryData('b')">加入站群申请</span>
        </b-col>
      </b-row>

      <b-row v-if="plate==='a'">
        <b-col cols="12" class="create-list">
          <b-row v-for="item in createItems" :key="item.id">
            <b-col @click="showCreateDetail(item)"><span class="point">●</span>您的{{item.name}}站群，系统{{item.state===0?'已通过':item.state===1?'审核中':'未通过'}}>>
              <span
                class="time">{{item['audit_at']?item['audit_at'].substr(0,16):item['created_at'].substr(0,16)}}</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'">
        <b-col cols="12" class="join-list">
          <b-row v-for="item in joinItems" :key="item.id">
            <!--state	申请状态 0=正常 1=待审 2=拒绝 3=移除	是	[int]	查看-->
            <b-col @click="showJoinDetail(item)">
              您的加入{{item.name}}站群申请，站群{{item.state===0?'已通过':(item.state===1?'审核中':'未通过')}}>> <span
              class="time">{{item['audit_at']?item['audit_at'].substr(0,16):item['created_at'].substr(0,16)}}</span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </b-container>
    <b-modal id="modal-create-unreview" size="lg" centered hide-header hide-footer>
      <div class="div-create-unreview">
        <p><span class="under-review">{{tempItem.state===1?'审核中':'未通过'}}</span></p>
        <p><img v-lazy="tempItem.logo" :key="tempItem.logo" alt=""><span class="group-name">{{tempItem.name}}</span></p>
        <p class="p-desc"><span class="group-desc">站群介绍：</span>{{tempItem.description}}</p>
        <template v-if="tempItem.state===2">
          <p><span class="fail-reason">未通过原因</span></p>
          <p class="p-fail-reason">{{tempItem['reason_refuse']}}</p>
        </template>
      </div>
    </b-modal>
    <b-modal id="modal-create-pass-review" size="lg" centered hide-header hide-footer>
      <div class="div-create-pass-review">
        <p><span class="under-review">已通过</span></p>
        <p><img v-lazy="tempItem.logo" :key="tempItem.logo" alt="">
          <span class="group-name">{{tempItem.name}}</span>
          <span class="group-ID">ID：{{tempItem.identify}}</span>
        </p>
        <p class="p-desc"><span class="group-desc">站群介绍：</span>{{tempItem.description}}</p>

      </div>
    </b-modal>
    <b-modal id="modal-join-review" size="lg" centered hide-header hide-footer>
      <div class="div-create-pass-review">
        <p><span class="under-review">{{tempItem.state===0?'已通过':tempItem.state===1?'审核中':'未通过'}}</span></p>
        <p><img v-lazy="tempItem.logo" :key="tempItem.logo" alt="">
          <span class="group-name">{{tempItem.name}}</span>
          <span class="group-ID">ID：{{tempItem.identify}}</span>
        </p>
        <p class="p-desc"><span class="group-desc">站群介绍：</span>{{tempItem.description}}</p>
        <template v-if="tempItem.state===2">
          <p><span class="fail-reason">未通过原因</span></p>
          <p class="p-fail-reason">{{tempItem['reason_refuse']}}</p>
        </template>
        <template v-if="tempItem.state===1">
          <p><span class="fail-reason">加入理由</span></p>
          <p class="p-fail-reason">{{tempItem['reason_apply']}}</p>
        </template>
      </div>
    </b-modal>

    <div v-if="totalPage>1" style="margin-top: 50px;">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPage" use-router
                        align="center"></b-pagination-nav>
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
  import * as http from '../../../apis/net'

  export default {
    name: "ApplicationRecord",
    data() {
      return {
        plate: 'a',
        errorImg:'this.src="' + require('../../assets/imgs/default.png') + '"',
        createItems: [
          // id	创建记录id	是	[int]	查看
          // 4	 group_id	站群id(站群通过审核有才有)	是	[int]	查看
          // 5	 name	站群名称	是	[string]	查看
          // 6	 description	站群描述	是	[string]	查看
          // 7	 logo	站群logo	是	[string]	查看
          // 8	 state	审核状态 0=正常 1=待审 2=拒绝	是	[int]	查看
          // 9	 reason_refuse	拒绝理由	是	[string]
          // 10	 audit_at	审核时间	是	[string]	查看
          // 11	 created_at	申请创建时间
        ],
        joinItems: [
          // group_id	站群id	是	[int]	查看
          // 4	 name	站群名称	是	[string]	查看
          // 5	 identify	站群标识	是	[string]	查看
          // 6	 logo	站群logo	是	[string]	查看
          // 7	 description	站群描述	是	[string]	查看
          // 8	 id	申请记录id	是	[int]	查看
          // 9	 state	申请状态 0=正常 1=待审 2=拒绝 3=移除	是	[int]	查看
          // 10	 reason_apply	申请理由	是	[string]	查看
          // 11	 reason_refuse	拒绝理由	是	[string]	查看
          // 12	 audit_at	审核时间	是	[string]	查看
          // 13	 created_at	申请时间
        ],
        tempItem: {},
        totalPage: 1,
        cpage: 1
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      fetchData() {
        this.cpage = Number(this.$route.query.page) || 1;   // 这个就是当前要请求的页数
        if (this.plate === 'a') {
          this.getGroupApplyingList();
        } else {
          this.getJoinApplyingList();
        }
      },
      queryData(temp) {
        if (this.plate === temp) return;
        this.plate = temp;
        this.$router.push(this.$route.path);
        this.fetchData();
      },
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      showCreateDetail(item) {
        this.tempItem = item;
        if (item.state === 0) {
          this.$bvModal.show('modal-create-pass-review');
        } else {
          this.$bvModal.show('modal-create-unreview');
        }
      },
      showJoinDetail(item) {
        this.tempItem = item;
        this.$bvModal.show('modal-join-review');
      },
      getGroupApplyingList() {
        http.getGroupApplyingList().then(rs => {
          if (!rs.code) {
            this.createItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      },
      getJoinApplyingList() {
        http.getJoinApplyingList().then(rs => {
          if (!rs.code) {
            this.joinItems = rs.data;
            this.totalPage = Math.ceil(rs.total / 15);
          }
        });
      }
    },
    mounted() {
      this.getGroupApplyingList();
      // this.getJoinApplyingList();
    }
  }
</script>
<style lang="scss" scoped>
  #app-record {
    height: calc(100vh - 69px);
    background: url("../../assets/imgs/home-bg.png") no-repeat #000000;
    background-position: top;
    background-size: cover;
    width: 100%;
    padding-top: 25px;
  }

  .container {
    width: 1200px !important;
    background: #ffffff;
    min-height: 288px;
    border-radius: 5px;
    padding: 20px;

    .row {
      margin: 0;
    }
  }

  .item-title {
    height: 30px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    border-bottom: 1px solid #dcdcdc;

    .title {
      border-bottom: 1px solid #3cb5f1;
    }

    span {
      padding-left: 10px;
      padding-right: 20px;
      font-size: 16px;
      padding-bottom: 7px;
      cursor: pointer;
    }
  }

  .create-list, .join-list {
    padding-top: 20px;

    .row {
      line-height: 36px;
      background: #eeeeee;
      margin-bottom: 10px;
      font-size: 14px;

      .col {
        text-align: left;
        cursor: pointer;

        .point {
          color: #2a94de;
          margin-right: 10px;
        }

        .time {
          float: right;
          margin-right: 10px;
        }
      }
    }
  }

  .modal-body {
    padding: 0 !important;
  }

  .div-create-unreview, .div-create-pass-review, .div-create-fail-review {
    padding: 15px 25px 25px 50px;
    font-size: 14px;

    .under-review {
      float: right;
      background: #e60012;
      color: #ffffff;
      border-radius: 5px;
      padding: 4px 15px;
    }

    img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      display: inline-block;
    }

    .group-name {
      position: absolute;
      top: 100px;
      padding-left: 15px;
    }

    .p-fail-reason, .p-desc {
      line-height: 28px;
    }

    .group-about, .fail-reason, .group-desc {
      font-size: 18px !important;
    }

    .group-member-count, .group-site-count {
      padding-left: 40px;
      line-height: 28px;
    }
  }

  .div-create-pass-review {
    .group-name {
      position: absolute;
      top: 50px;
      padding-left: 15px;
    }

    .group-ID {
      position: absolute;
      top: 100px;
      padding-left: 15px;
    }
  }
</style>
