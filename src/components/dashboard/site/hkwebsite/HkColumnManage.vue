 <template>
  <div id="messages">
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
            <b-col cols="3">栏目名称</b-col>
            <b-col cols="3">创建时间</b-col>
            <b-col cols="2">操作</b-col>
          </b-row>
          <b-row v-for="(item,index) in items" :key="item.id">
            <b-col cols="2">{{index+1}}</b-col>
            <b-col cols="2" v-if="mainLevel==1">主</b-col>
            <b-col cols="2" v-else-if="mainLevel==2 && item['copy_id']==0">副</b-col>
            <b-col cols="2" v-else-if="mainLevel==2 && item['copy_id']!=0">主</b-col>
            <b-col cols="2" v-else-if="mainLevel!=1 && mainLevel!=2">/</b-col>
            <b-col cols="3" :title="item['name']">{{item['name']}}</b-col>
            <b-col cols="3">{{item['created_at'].substr(0,16)}}</b-col>
            <b-col cols="2"><b-button v-if="mainLevel!=2" @click="update(item.id)">编辑</b-button></b-col>
          </b-row>
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
    name: "HkColumnManage",
    data(){
      return{
        items:[],
        mainLevel:''
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      update(id){
        this.$router.push("/dashboard/site/hk-column-edit?id=" + id);
      },
      // 站点文章分类（栏目）列表
      getCategoryList() {
        http.getArticleCategoryList().then(rs => {
          if(!rs.code) {
            this.items = rs.data;
          }
        });
      },
    },
    mounted() {
      this.mainLevel = this.$store.getters.site.mainLevel;
      this.getCategoryList();
    },
  }
</script>

<style lang="scss" scoped>
  #messages {}
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
          color:#099ae6;
          border-bottom: 3px solid #099ae6;
        }
        button{
          color: #099ae6;
          border: 1px solid #099ae6;;
          background: #ffffff;
          height: 30px;
          line-height: 12px;
          font-size: 12px;
          float: right;
          margin-right: 100px;
        }
      }
    }
  }
  .data-items{
    margin: 30px auto;
    .row:first-child{
      background: #dcdcdc;
      line-height: 50px;
    }
    .row{
      line-height: 50px;
      border: 1px solid #dcdcdc;
      border-top: none;
       color:#555;
      font-size: 14px;
      height: 50px;
      background: #eeeeee;
      div:nth-of-type(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    button{
      background: #01c36a;
      border: none;
      margin: 0 10px;
      height: 28px;
      line-height: 10px;
      font-size: 14px;
      width: 70px;
    }
  }
</style>
