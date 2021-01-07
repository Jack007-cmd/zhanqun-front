<template>
  <div id="custom-file-manage" @click="hideOperator">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="plate-switch">
          <span class="pl-file">文件管理</span>
          <div class="ct-exhibit">
            <span :class="{on:plate==='a'}" @click="plate='a'">图标展示</span>
            <span :class="{on:plate==='b'}" @click="plate='b'">列表展示</span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="pt-nec">
          <div class="pt-nec-part">
            <span @click="createFile">新建文件夹</span>
            <span>上传
              <input @change ="uploadFile" type="file" class="upload-input" id="fileUpload" ref="uploadInput">
            </span>
            <span @click="clearFile">清理缓存</span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="pt-catalog">
          <div class="pt-cat-nav"> 
            <ul>
              <li>{{currentPath}}</li>
            </ul>
            <div class="pt-cat-rg" @click="upwardFile">  
                 <span class="iconfont icon-down-jiantou-up"></span>
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- 图标展示 -->
      <b-row v-if="plate==='a'">
        <b-col cols="12" class="pt-nav" style="height: auto;">
          <div class="vdAfKTP">
            <div class="cEefyz open-enable"  v-for="(item,index) in dirs" draggable="true" @dragover.prevent @drop="dropFile(e,item.name)"  @dragstart="dragFile(e,item.name,1)">
              <div class="yscevne iconfont icon-wenjianguanli1" @contextmenu.prevent="showOperator(index,1)" @dblclick="getIntoFile(item.name)">
                <img class="yjcJbWX" style="visibility: hidden;">
                <ul class="ys-file-list" :ref="`list${index}`">
                  <li @click="openDirFile(item.name)">打开</li>
                  <li @click="renameDirFile(index,1)">重命名</li>
                  <li @click="deleteDirFile(item.name,1)">删除</li>
                </ul>
              </div>
              <div class="file-name">
              <a  class="thuXQjW" href="javascript:void(0);" :ref="`thu${index}`">{{item.name}}</a>
              <input class="GadHyA" type="text" v-model="item.name" :ref="`gad${index}`" @focus="getFileVal(item.name)" @blur="setFileName(index,item.name,1)">
              </div>
            </div>
            <div class="cEefyz open-enable"  v-for="(item,index) in files" draggable="true"  @dragstart="dragFile(e,item.name,2)">
              <div class="yscevne" @contextmenu.prevent="showOperator(index,2)"> 
                <img v-if="item.type==='gif' || item.type==='jpg' || item.type==='jpeg' || item.type==='png' || item.type==='bmp'" class="yjcJbWX"  v-lazy="item.url" > 
                <div v-else-if="item.type==='html' || item.type==='css' || item.type==='js'" class="iconfont"  :class="item.type==='html'?'icon-html':(item.type==='css'?'icon-css':'icon-js')"></div> 
                <div v-else class="iconfont icon-weizhiwenjian"></div>
                <ul class="ys-file-list" :ref="`listfile${index}`">
                  <li @click="openFile(item.name,item.type,item.url)">打开</li>
                  <li @click="renameDirFile(index,2)">重命名</li>
                  <li @click="deleteDirFile(item.name,2)">删除</li>
                </ul>
              </div>
              <div class="file-name">
              <a  class="thuXQjW" href="javascript:void(0);" :ref="`thufile${index}`">{{item.name}}</a>
              <input class="GadHyA" type="text" v-model="item.name" :ref="`gadfile${index}`" @focus="getFileVal(item.name)" @blur="setFileName(index,item.name,2)">
              </div>
            </div>          
          </div>
        </b-col>
      </b-row> 
      <!-- 列表展示 -->
      <b-row v-if="plate==='b'">
        <b-col cols="12" class="pt-nav" style="height: auto;">
          <div class="QxJxtg">
            <ul>
              <li class="name">名称</li>
              <li class="type">类型</li>
              <li class="size">大小</li>
              <li class="date">修改日期</li>
              <li class="operation">操作</li>
            </ul>
          </div>

          <div class="vdAfKMb" style="height: auto;">
            <div class="AuPKyz" v-for="(item,index) in dirs" @dblclick="getIntoFile(item.name)" @contextmenu.prevent="showOperator(index,1)" draggable="true" @dragover.prevent @drop="dropFile(e,item.name)"  @dragstart="dragFile(e,item.name,1)">
              <div class="file-name">
                <div class="text">
                  <div class="yscevne iconfont icon-wenjianguanli1"></div>
                  <a href="javascript:void(0);" class="thuXQjW" :ref="`thu${index}`">{{item.name}}</a>
                  <input class="GadHyA" type="text" v-model="item.name" :ref="`gad${index}`" @focus="getFileVal(item.name)" @blur="setFileName(index,item.name,1)">
                </div>
              </div>  
              <div class="file-type">文件夹</div>
              <div class="file-size"></div>                
              <div class="file-date">{{item.updated_at}}</div>                
              <div class="file-operation">
                <div class="setup iconfont icon-caozuo" @contextmenu.prevent="showOperator(index,1)">
                  <ul class="ys-file-list" :ref="`list${index}`">
                    <li @click="openDirFile(item.name)">打开</li>
                    <li @click="renameDirFile(index,1)">重命名</li>
                    <li @click="deleteDirFile(item.name,1)">删除</li>
                  </ul>                   
                </div>
              </div>                

            </div>
            <div class="AuPKyz" v-for="(item,index) in files" @contextmenu.prevent="showOperator(index,2)" draggable="true"  @dragstart="dragFile(e,item.name,2)">
              <div class="file-name">
                <div class="text">
                  <div class="yscevne">
                    <img v-if="item.type==='gif' || item.type==='jpg' || item.type==='jpeg' || item.type==='png' || item.type==='bmp'" class="yjcJbWX"  v-lazy="item.url" > 
                    <div v-else-if="item.type=='html' || item.type=='css' || item.type=='js'" class="iconfont"  :class="item.type=='html'?'icon-html':(item.type=='css'?'icon-css':'icon-js')"></div> 
                    <div v-else class="iconfont icon-weizhiwenjian"></div>                   
                  </div>
                  <a  class="thuXQjW" href="javascript:void(0);" :ref="`thufile${index}`">{{item.name}}</a>
                  <input class="GadHyA" type="text" v-model="item.name" :ref="`gadfile${index}`" @focus="getFileVal(item.name)" @blur="setFileName(index,item.name,2)">
                </div>
              </div>  
              <div class="file-type">{{item.type}}</div>
              <div class="file-size">{{item.size}}</div>                
              <div class="file-date">{{item.updated_at}}</div>                
              <div class="file-operation">
                <div class="setup iconfont icon-caozuo" @contextmenu.prevent="showOperator(index,2)">
                  <ul class="ys-file-list" :ref="`listfile${index}`">
                    <li @click="openFile(item.name,item.type,item.url)">打开</li>
                    <li @click="renameDirFile(index,2)">重命名</li>
                    <li @click="deleteDirFile(item.name,2)">删除</li>
                  </ul>                 
                </div>              
              </div>                
            </div>

          </div>
        </b-col>
      </b-row> 
    </b-container>

    <b-modal id="modal-preview" size="xl" centered hide-header hide-footer>
      <img v-lazy="preview_img" style="width: 100%;"/>
    </b-modal>

  </div>
</template>

<script>
  import * as http from '../../../../../apis/site'
  import Vue from 'vue'
  // 工具栏配置
  export default {
    name: "CustomFileManage",
    components: {
    },
    created() {},
    data() {
      return {
        plate:'a',
        parameter:{
        },
        dirs:[],
        currentPath:'/',
        fileName:'',
        files:[],
        preview_img: '',
        dragPath:'',
        fileType:1
      }
    },
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      },
      dragFile(e,data,type){//拖拽事件
        this.dragPath = data;
        this.fileType = type;
      },
      dropFile(e,data){
        if(this.currentPath==="/"){
          this.parameter["path"] =this.currentPath + this.dragPath;
          this.parameter["new_path"] =this.currentPath + data + "/" + this.dragPath;
        }else{
          this.parameter["path"] = this.currentPath + "/" + this.dragPath;
          this.parameter["new_path"] = this.currentPath + "/" +data + "/" + this.dragPath;
        }
        if(this.fileType === 1){
           this.setCustomFileDirMove();
        }else{
          this.setCustomFileMove();
        }
       
      },
      allowDrop(e){
        e.preventDefault();
      },
      hideOperator(){
        $(".ys-file-list").hide();
      },
      getBasicInfo() {
        http.getBasicInfo().then(rs => {
          if (!rs.code) {
            this.parameter["group-identify"] = rs.group_id;
            this.parameter["web-identify"] = rs.id;
            $(".ys-file-list").hide();
            $(".file-name a").css("display","block");
            $(".file-name input").css("display","none");                 
            this.getCustomFileDir(this.parameter);
          }
        });
      },
      getCustomFileDir(data){//获取文件夹
        http.getCustomFileDir(data).then(rs => {
          if (!rs.code) {
            this.currentPath = rs.currentPath;
            this.dirs =rs.dirs;
            this.files = rs.files;
          }
        });
      },
      upwardFile(){//上级文件夹
          if(this.currentPath === "/"){
            return;
          }else{
            var end = this.currentPath.lastIndexOf("/");
            this.currentPath = this.currentPath.substring(0,end);
            if(this.currentPath === ""){
              this.currentPath = "/";
            }                
            this.parameter["path"] = this.currentPath;
            this.getBasicInfo(); 
          }

      },
      createFile(){//新建文件夹
        this.parameter["path"] = this.currentPath;
        this.parameter["dirname"] = this.judge();
        http.setCustomFileCreate(this.parameter).then(rs => {
          if (rs.success) {
              this.popupTips("新建文件夹成功!");
          }
        });
      },
      judge(){
        var arr = this.dirs;
        for(var i in arr){
          if(arr[i].name === "新建文件夹"){
            return "新建文件夹" + this.getNowDate();
          }
        }
        return "新建文件夹";
      },
      getNowDate(){
        var date=new Date();   
        var nowTime = "_" + String(date.getFullYear()) + (String(date.getMonth()+1)) + (String(date.getDate())) + "_" + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds());
        return nowTime;
      },
      clearFile(){//清理缓存
        http.setCustomFileClear(this.parameter).then(rs => {
          if (rs.success) {
            this.popupTips("清理缓存成功!");        
          }
        })
      },
      showOperator(index,type){
        $(".ys-file-list").hide();
        if(type === 1){
          this.$refs[`list${index}`][0].style.display="block";
        }else{
          this.$refs[`listfile${index}`][0].style.display="block";
        }
        $(".file-name a").css("display","block");
        $(".file-name input").css("display","none");        
      },
      getIntoFile(data){
        var path = "";
        if(this.currentPath ==="/"){
          path = "/" + data;
        }else{
          path = this.currentPath + "/" + data;
        }
        this.parameter["path"] = path;
        this.getBasicInfo();    
      },
      deleteDirFile(data,type){//删除
        this.parameter["path"] = this.currentPath + "/" + data;
        if(type === 1){//删除文件夹
           this.setCustomFileDirDelete();
        }else{//删除文件
           this.setCustomFileDelete();
        }
      },
      setCustomFileDirDelete(){//删除文件夹
        http.setCustomFileDirDelete(this.parameter).then(rs => {
          if (rs.success) {
            this.popupTips("文件夹删除成功!"); 
          }
        }) 
      },
      setCustomFileDelete(){
        http.setCustomFileDelete(this.parameter).then(rs => {
          if (rs.success) {
            this.popupTips("文件删除成功!");   
          }
        })         
      },
      renameDirFile(index,type){//重命名
          $(".ys-file-list").hide();
          $(".file-name a").css("display","block");
          $(".file-name input").css("display","none");
          if(type === 1){//重命名文件夹
            this.$refs[`thu${index}`][0].style.display="none";
            this.$refs[`gad${index}`][0].style.display="block";
            this.$refs[`gad${index}`][0].focus();
            
          }else{//重命名文件
            this.$refs[`thufile${index}`][0].style.display="none";
            this.$refs[`gadfile${index}`][0].style.display="block";
            this.$refs[`gadfile${index}`][0].focus();
          }
      },
      getFileVal(data){
        this.fileName = data;
      },
      setFileName(index,data,type){//重命名
        if(this.fileName === data){
          $(".file-name a").css("display","block");
          $(".file-name input").css("display","none");  
          return;
        }      
        this.parameter["path"] = this.currentPath + "/" + this.fileName;
        this.parameter["new_name"] = data;        
        if(type === 1){//重命名文件夹
          this.setCustomFileDirRename()
        }else{//重命名文件
          this.setCustomFileRename();
        }
      },
      setCustomFileDirRename(){//重命名文件夹
        http.setCustomFileDirRename(this.parameter).then(rs => {
          if (rs.success) {
            this.popupTips("文件夹名修改成功!");
          }
        })          
      },
      setCustomFileRename(){//重命名文件
        http.setCustomFileRename(this.parameter).then(rs => {
          if (rs.success) {
            this.popupTips("文件名修改成功!");
          }
        })  
      },
      popupTips(data){
              this.$toast.success({
                message: data,
                color:'#3cb5f1'
              });    
              this.parameter["path"] = this.currentPath;
              this.getBasicInfo();          
      },
      openDirFile(data){
          this.getIntoFile(data);
      },
      openFile(data,type,url){
        if(type==='gif' || type==='jpg' || type==='jpeg' || type==='png' || type==='bmp'){
          this.toPreview(url);
        }else{
          var path ="";
          if(this.currentPath === "/"){
            path = "/" + data;
          }else{
            path = this.currentPath + "/" + data
          }
            this.$router.push('/dashboard/site/cust-file-update?path='+ path + "&plate=" + this.plate);
        }
      },
      toPreview(preview) {//预览
        this.preview_img = preview;
        this.$bvModal.show('modal-preview');
      },      
      uploadFile(e){//上传文件
        let formData = new FormData();
        var files = this.$refs.uploadInput.files;
        var AllUpExt = ".html.js.css.gif.jpg.jpeg.png.bmp.GIF.JPG.JPEG.PNG.bmp";
        var extName = files[0].name.substring(files[0].name.lastIndexOf(".")).toLowerCase();
        if(AllUpExt.indexOf(extName) == "-1"){
          this.$toast.success({
            message: "请上传正确的文件",
            color: '#3cb5f1'
          });
          return;
        }
        var size = files[0].size;
        size = size/(1024*1024);
        if(size > 2){  // 2M
          this.$toast.success({
            message: "文件大小不能超过2M",
            color: '#3cb5f1'
          });
          return;
         }    
        this.parameter["path"] = this.currentPath;
        this.parameter["upload_file"] = $("#fileUpload")[0].files[0];
        Object.keys(this.parameter).forEach(v => {
          formData.append(v, this.parameter[v]);
        });
        http.setCustomFileUpload(formData).then(rs => {
          if (rs.success) {
            e.target.value="";
            this.popupTips("文件上传成功!");
          }
        })         
      },
      setCustomFileMove(){//静态站点移动文件
        http.setCustomFileMove(this.parameter).then(rs => {
          if(rs.success){
            this.popupTips("文件移动成功");
          }
        })  
      },
      setCustomFileDirMove(){//静态站点移动文件夹
        http.setCustomFileDirMove(this.parameter).then(rs => {
          if(rs.success){
            this.popupTips("文件夹移动成功");
          }
        })  
      }
    },
    mounted() {
      if(this.$route.query.plate){
        this.plate = this.$route.query.plate;
      }
      if(this.$route.query.path){
          this.currentPath = this.$route.query.path;
      }else{
          this.currentPath = "/";
      }
      this.parameter["path"] = this.currentPath;
      this.getBasicInfo();
      this.$route.query.path = ""
    },
    watch:{
    }
  }
</script>

<style lang="scss" scoped>
  #custom-file-manage {}

  .container-fluid {
    padding:20px 0 55px 0px;
    background: #ffffff;

    .row {
      margin: 0;

      .plate-switch {
        position: relative;
        text-align: left;
        border-bottom: 3px solid #626262;
        padding: 0;
        padding-bottom: 10.4px;
      
        .pl-file{
          cursor: pointer;
          padding: 0 50px;
          padding-bottom: 12px;
          color: #099ae6;
          border-bottom: 3px solid #099ae6;
        }
      }
    }
  }
.ct-exhibit{
  position: absolute;
  right: 30px;
  top: 5px;
  width: 145px;
  height: 24px;
  font-size:15px; 
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content:space-between;
}
.ct-exhibit span{
  width: 70px;
  height: 24px;
  text-align: center;
  border: 1px solid #959595;
  border-radius: 3px;
  cursor: pointer;
}

.ct-exhibit span.on{
  background: #546FB4;
  color: #ffffff;
  border: 1px solid #546FB4;
}
// iconfont参数修改
.icon-down-jiantou-up{
  font-size: 28px !important;
  color: #262626;
}
.vdAfKTP .cEefyz .icon-wenjianguanli1{
  color: #FFD201;
}
.vdAfKTP .cEefyz .icon-html,.vdAfKMb .AuPKyz .icon-html{
  color:#8183F1;
}
.vdAfKTP .cEefyz .icon-js,.vdAfKMb .AuPKyz .icon-js{
  color:#47CCAB;
}
.vdAfKTP .cEefyz .icon-css,.vdAfKMb .AuPKyz .icon-css{
  color:#5EC7FB;
}
.vdAfKTP .cEefyz .icon-weizhiwenjian,.vdAfKMb .AuPKyz .icon-weizhiwenjian{
  color:#B9C9D6;
}
.vdAfKTP .cEefyz .icon-wenjianguanli1,.vdAfKTP .cEefyz .icon-html,.vdAfKTP .cEefyz .icon-js,.vdAfKTP .cEefyz .icon-css,.vdAfKTP .cEefyz .icon-weizhiwenjian{
  font-size: 60px !important;
}
.vdAfKMb .icon-wenjianguanli1{
  color: #FFD201;
}
.vdAfKMb .AuPKyz .icon-wenjianguanli1,.vdAfKMb .AuPKyz .icon-html,.vdAfKMb .AuPKyz .icon-js,.vdAfKMb .AuPKyz .icon-css,.vdAfKMb .AuPKyz .icon-weizhiwenjian{
  font-size: 30px !important;
}
.vdAfKMb .AuPKyz .icon-caozuo{
  font-size: 28px !important;
}
.pt-nec{
  position: relative;
  height: 62px;
  .pt-nec-part{
    position: absolute;
    left: 35px;
    top: 20px;
    width: 390px;
    height: 35px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content:space-between;
  }
  .pt-nec-part span{
    background: #2A94DE;
    width: 122px;
    height: 35px;
    line-height: 35px;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .pt-nec-part .upload-input{
    position:absolute;
    top:0;
    left:0;
    margin:0;
    opacity:0;
    filter:alpha(opacity=0);
    cursor: pointer;    
    width: 100%;
    height: 100%;  
}
}
.pt-catalog{
  height: 42px;
  .pt-cat-nav{
      position: relative;
      border: 1px solid #E5E5E5;
      height: 42px;
  }
   ul{
     padding: 0;
     margin: 0 20px;
     li{
       line-height: 42px;
       float: left;
     }
   }
   .pt-cat-rg{
     position: absolute;
     right: 0;
     height: 100%;
     width: 100px;
     border-left: 1px solid #E5E5E5;
     span{
       display: inline-block;
       width: 50px;
       height: 42px;
       cursor: pointer;
     }
   }
  }
.pt-nav{
  min-height: 131px;
  .cEefyz{
    width: 120px;
    height: 127px;
    float: left;
    margin: 4px 0 0 0;
    text-align: center;
    border: 1px solid #ffffff;
    position: relative;  
  }
  .cEefyz .yscevne {
    position: relative;
    margin: 9px 16px 0px 16px;
    width: 84px;
    height: 84px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .vdAfKTP .cEefyz .yscevne .yjcJbWX {
    margin-top:10px; 
    width: 60px;
    height: 65px;
    vertical-align: middle;
  } 
  .cEefyz .file-name {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 6px 5px 5px;
  }
  .cEefyz .file-name a{
       cursor: pointer;
       display: inline-block;
       font-size:13px; 
       width: 108px;
       height: 24px;  
       line-height: 24px;      
      //  vertical-align: middle;
       border:1px solid #ffffff;
       white-space: nowrap;
       text-overflow: ellipsis;
       overflow: hidden;
  }
  .cEefyz .file-name a,a:active {
      color: #424e67;
      cursor: default;
      text-decoration: none;
  }
  .cEefyz .GadHyA {
    display: none;
    text-align: center;
    width: 108px;
    height: 24px;
    vertical-align: middle;
    border: 1px solid #E5E5E5;
    background: #fff;
    border-radius: 2px;
    z-index: 99;
    outline: none;
    font-size: 13px;
    color: #424e67;
}
.cEefyz .ys-file-list {
    display: none;
    border: 1px solid #dde0e4;
    border-radius: 5px;
    box-shadow: 0 0 8px #ccc;
    min-height: 23px;
    width: 100px;
    padding: 2px 5px;
    position: absolute;
    top: 65px;
    left: 11px;
    background-color: #FFF;
    color: #000;
    z-index: 100;
}
.cEefyz .ys-file-list li {
    display: list-item;
    cursor: default;
    width: 90px;
    height: 23px;
    line-height: 23px;
    white-space: nowrap;
    position: relative;
    z-index: 1;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 13px!important;
    color: #5b667b!important;
    border-bottom:1px solid #F0F0F0; 
    text-align: left;
    padding: 0 0 0 20px;
    
}
.cEefyz .ys-file-list li:hover {
    // background: #E5E5E5;
}
.QxJxtg{
  position: relative;
  height: 60px;
  overflow: hidden;
  .name{
    width: 17%;
    border-right: 1px solid #DFDFDF;
  }
  .type{
    width:9%;
    border-right:1px solid #DFDFDF;
  }
  .size{
    width:8%;
    border-right:1px solid #DFDFDF;
  }
  .date{
    width: 16%;
    border-right: 1px solid #DFDFDF;
  }
  .operation{
    width:42%;
  }
}
.QxJxtg ul{
  width: 100%;
  height: 42px;
  margin: 0;
  padding: 0;
  margin-top:9px; 
}
.QxJxtg  ul li{
  width: 100%;
  height: 42px;
  line-height: 42px;
  list-style: none;
  float: left;
  text-align: center;
  // padding: 0 0 0 40px;
}
.vdAfKMb{
  font: 12px/1.5 tahoma,arial;
}
.AuPKyz:hover{
  background: #BDE6F8;
  .file-name .text a{
    border: 1px solid #BDE6F8;
  }
}
.AuPKyz{
    cursor: pointer;
    position: relative;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #f2f6fd;
 .yscevne {
    cursor: default;
    height: 26px;
    width: 26px;
    margin: 0px 10px 0 10px;
    }    
    .yscevne .yjcJbWX {
      width: 30px;
      height: 32px;
      vertical-align: middle;
    }     
    .file-name,.file-type,.file-size,.file-date,.file-operation{
      float: left;
      height: 100%;
      text-align: center;
    }
    .file-name {
        position: relative;
        width: 17%;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }   
    .file-name .text {
        position: relative;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content:center;        
    }
    .file-name .text a{
        height: 24px;
        line-height: 24px;
        width: 85%;
        text-decoration: none;
        border: 1px solid #ffffff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;      
        text-align: left;
        margin: 9px 0;        
    }
    .file-name .text input{
        display: none;
        width: 85%;
        height: 24px;
        line-height: 24px;
        text-align: left;
        margin: 9px 0;
        border: 1px solid #E5E5E5;
        border-radius: 2px;
        outline: none;
        color: #424e67;        
    }
    .file-name .text a, .file-name .text a:active {
        color: #424e67;
        cursor: default;
    }
    .file-type{
      width:9%;
    }
    .file-size{
      width:8%;
    }
    .file-date{
      width: 16%;
    }
    .file-operation{
      width:42%;
      .setup{
        margin: 0 auto;
        position: relative;
        top: 0;
        width: 22px;
        height: 22px;
      }
    }    
   .ys-file-list {
      display: none;
      border: 1px solid #dde0e4;
      border-radius: 5px;
      box-shadow: 0 0 8px #ccc;
      min-height: 23px;
      width: 100px;
      padding: 2px 5px;
      position: absolute;
      top: 17px;
      left: 35px;
      background-color: #FFF;
      color: #000;
      z-index: 100;
  }
  .ys-file-list li {
      display: list-item;
      cursor: default;
      width: 90px;
      height: 23px;
      line-height: 23px;
      white-space: nowrap;
      position: relative;
      z-index: 1;
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 13px!important;
      color: #5b667b!important;
      border-bottom:1px solid #F0F0F0; 
      text-align: left;
      padding: 0 0 0 20px;
  } 

}


}

</style>
