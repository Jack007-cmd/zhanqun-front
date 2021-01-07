<template>
  <div id="app" style="overflow-y: hidden;">
    <!--<nav-bar></nav-bar>-->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

  import * as http from '../apis/net'
  import storage from './storage'
  export default {
    name: 'App',
    components: {
      // 'nav-bar': Navbar
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    provide () {
      return {
        reload: this.reload()
      }
    },
  mounted() {
    },
    methods: {
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
    },
    created(){
      this.$store.commit('setIdentify', storage.get('identify'));
      this.$store.commit('setRole',  storage.get('role'));
      this.$store.commit('setStatus',  storage.get('status'));
      this.$store.commit('setProfile',  storage.get('user'));
      this.$store.commit('setSite',  storage.get('site'));
    }
  }
</script>

<style>
  @import "./assets/css/common.css";
</style>
