<template>
  <div id="edit-dividend">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-title">
          <span :class="{on:plate==='a'}">新增</span>
          <span :class="{on:plate==='b'}">编辑</span>
        </b-col>
      </b-row>
      <b-row v-if="plate==='a'" class="create-info">
        <b-col cols="12">
          <b-row>
            <b-col cols="12" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;分类&nbsp;&nbsp;&nbsp;&nbsp;<b-form-select
              class="mb-2 mr-sm-2 mb-sm-0" v-model="create['category_id']" :options="options"
              style="width:150px;"></b-form-select>
            </b-col>
            <b-col cols="12" style="height: 15px;"></b-col>
            <b-col cols="12" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;年份&nbsp;&nbsp;&nbsp;&nbsp;<b-form-select
              class="mb-2 mr-sm-2 mb-sm-0" v-model="create.year" :options="yearOptions"
              style="width:150px;"></b-form-select>
            </b-col>
            <b-col cols="12" style="height: 15px;"></b-col>
            <b-col id="dividend-items" cols="10">
              <b-row>
                <b-col cols="2">期数</b-col>
                <b-col cols="5">期数日期范围</b-col>
                <b-col cols="5">分红金额</b-col>
              </b-row>
              <b-row v-for="(item,index) in create.data" :key="index">
                <b-col cols="2">第{{(index<9?'0':'')+(index+1)}}期</b-col>
                <b-col cols="5">
                  <input type="text" name="start" v-model="item['start_at']">~
                  <input type="text" name="end" v-model="item['end_at']">
                </b-col>
                <!-- :value="item.amount" @input="oninput($event,item)" -->
                <b-col cols="5"><input type="number" min="0" v-model="item['amount']">
                  <span v-if="index===0" class="pm-span" @click="plus(create.data)">+</span>
                  <span v-if="index!==0" class="pm-span" @click="minus(create.data,index)">&nbsp;-</span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <div style="padding-left: 15%;">
            <b-button @click="createBonus">保存</b-button>
            <b-button @click="back">返回</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="plate==='b'" class="update-info">
        <b-col cols="12">
          <b-row>
            <b-col cols="12" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;分类&nbsp;&nbsp;&nbsp;&nbsp;<b-form-select
              class="mb-2 mr-sm-2 mb-sm-0" v-model="update['category_id']" :options="options"
              style="width:150px;"></b-form-select>
            </b-col>
            <b-col cols="12" style="height: 15px;"></b-col>
            <b-col cols="12" style="text-align: left;">&nbsp;&nbsp;&nbsp;&nbsp;年份&nbsp;&nbsp;&nbsp;&nbsp;<b-form-select
              class="mb-2 mr-sm-2 mb-sm-0" v-model="update.year" :options="yearOptions"
              style="width:150px;"></b-form-select>
            </b-col>
            <b-col cols="12" style="height: 15px;"></b-col>
            <b-col id="dividend-items" cols="10">
              <b-row>
                <b-col cols="2">期数</b-col>
                <b-col cols="5">期数日期范围</b-col>
                <b-col cols="5">分红金额</b-col>
              </b-row>
              <b-row v-for="(item,index) in update.data" :key="index">
                <b-col cols="2">第{{(index<9?'0':'')+(index+1)}}期</b-col>
                <b-col cols="5">
                  <input type="text" name="start" v-model="item['start_at']">~
                  <input type="text" name="end" v-model="item['end_at']">
                </b-col>
                <b-col cols="5"><input type="number" min="0" v-model="item['amount']">
                  <span v-if="index===0" class="pm-span" @click="plus(update.data)">&nbsp;&nbsp;+</span>
                  <span v-if="index!==0" class="pm-span" @click="minus(update.data,index)">&nbsp;&nbsp;-</span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <div style="padding-left: 15%;">
            <b-button @click="updateBonus">保存</b-button>
            <b-button @click="back">返回</b-button>
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
  import Vue from 'vue'

  export default {
    name: "EditBrowser",
    data() {
      return {
        plate: 'a',
        options: [
          {value: null, text: '请选择分类'},
        ],
        yearOptions: [
          {value: null, text: '请选择年份'},
        ],
        update: {
          id: '',
          category_id: null,
          year: null,
          rows: [
            {start_at: '', end_at: '', amount: ''},
          ]
        },
        create: {
          category_id: null,
          year: null,
          data: [
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
            {start_at: '', end_at: '', amount: ''},
          ]
        }
      }
    },
    methods: {

      back() {
        this.$router.go(-1);//返回上一层
      },
      // oninput(e,item) {
      //   // 通过正则过滤小数点后两位
      //   e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      //   item.amount = e.target.value;
      // },
      plus(temp) {
        temp.push({start_at: '', end_at: '', amount: ''},);
      },
      minus(temp, index) {
        Vue.delete(temp, index);
      },
      getAllBonusCategoryList() {
        http.getAllBonusCategoryList().then(rs => {
          if (!rs.code) {
            rs.forEach(v => {
              this.options.push({value: v.id, text: v.name});
            })
          }
        });
      },
      createBonus() {
        if (!this.create['category_id']) {
          this.$toast.success({
            message: "请选择分类",
            color: '#3cb5f1'
          });
          return;
        }
        if (!this.create['year']) {
          this.$toast.success({
            message: "请选择年份",
            color: '#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("category_id", this.create['category_id']);
        formData.append("year", this.create['year']);
        for (let i = 0; i < this.create.data.length; i++) {
          formData.append("data[" + i + "][num]", (i < 9 ? '0' : '') + (i + 1));
          formData.append("data[" + i + "][start_at]", this.create.data[i]['start_at']);
          formData.append("data[" + i + "][end_at]", this.create.data[i]['end_at']);
          formData.append("data[" + i + "][amount]", this.create.data[i]['amount']);
        }
        http.createBonus(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
            this.back();
          }
        });
      },
      updateBonus() {
        if (!this.update['category_id']) {
          this.$toast.success({
            message: "请选择分类",
            color: '#3cb5f1'
          });
          return;
        }
        if (!this.update['year']) {
          this.$toast.success({
            message: "请选择年份",
            color: '#3cb5f1'
          });
          return;
        }
        let formData = new FormData();
        formData.append("id", this.update['id']);
        formData.append("category_id", this.update['category_id']);
        formData.append("year", this.update['year']);
        for (let i = 0; i < this.update.data.length; i++) {
          formData.append("data[" + i + "][num]", (i < 9 ? '0' : '') + (i + 1));
          formData.append("data[" + i + "][start_at]", this.update.data[i]['start_at']);
          formData.append("data[" + i + "][end_at]", this.update.data[i]['end_at']);
          formData.append("data[" + i + "][amount]", this.update.data[i]['amount']);
        }
        http.updateBonus(formData).then(rs => {
          if (!rs.code) {
            this.$toast.success({
              message: "保存成功！",
              color: '#3cb5f1'
            });
            this.back();
          }
        });
      },
      getBonusDetail(id) {
        http.getBonusDetail({id: id}).then(rs => {
          if (!rs.code) {
            this.update = rs;
          }
        });
      },
      getYears(){
        let currentYear = new Date().getFullYear();
        for(let i=currentYear+10;i>currentYear-10;i--){
          this.yearOptions.push({value:i,text:i});
        }
      }
    },
    mounted() {
      this.getAllBonusCategoryList();
      this.getYears();
      this.plate = Number(this.$route.query.type || 1) === 1 ? 'a' : 'b';
      if (this.$route.query.id) {
        this.getBonusDetail(this.$route.query.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #edit-dividend {}

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

  .create-info, .update-info {
    padding-top: 30px;

    table {
      width: 50%;
      margin-left: 50px;

      tr {
        td:first-child {
          text-align: right;
          width: 130px;
        }

        td:last-child {
          text-align: left;
          font-size: 14px
        }
      }
    }

    input {
      width: 100%;
    }

    button {
      float: left;
      margin: 30px;
      background: #099ae6;
      border: none;
      width: 100px;
    }
  }

  #dividend-items {
    .row {
      color: #555;
      font-size: 14px;
      line-height: 40px;

      input {
        width: 260px;
        border: 1px solid #a9a9a9;
        height: 30px;
        line-height: 40px;
      }

      .pm-span {
        font-size: 24px;
        cursor: pointer;
      }
    }

    .row:first-child {
      font-size: 16px;
      background: #dcdcdc;
    }
  }
</style>
