<template>
  <div v-if="show" class="loading-container">
    <div class="loading-mask"></div>
    <div class="loading-content">
      <div class="loading-animate"></div>
      <div class="loading-text">{{ text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    show: Boolean
  },
  data() {
    return {
    	text: '数据加载中...'
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-container{
  position: relative;
  text-align: center;
  .loading-mask{
  }
  .loading-content{
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -22.5px;
    margin-left: -22.5px;
    z-index: 300;
    text-align: center;
    color:#fff;
    .loading-animate{
      display: inline-block;
      width:45px;
      height:45px;
      vertical-align: middle;
      background: url("../../assets/imgs/loading2.png");
      background-size:100%;
    }
    .loading-text{
      font-size: 14px;
      color: rgba(42,148,222,0.7);

    }
  }
}
@-webkit-keyframes cricleLoading {
  0% {
    transform: rotate3d(0,0,1,0deg);
  }
  100% {
    transform: rotate3d(0,0,1,360deg);
  }
}
@keyframes cricleLoading {
  0% {
    transform: rotate3d(0,0,1,0deg);
  }
  100% {
    transform: rotate3d(0,0,1,360deg);
  }
}
</style>