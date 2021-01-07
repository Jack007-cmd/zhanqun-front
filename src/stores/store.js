import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import storage from '../storage'

var state = {
  token: null,
  status:-1,
  user: null,
  identify:null,
  site:null,
  role:-1,
  amount:-1
}

var mutations = {
  login(state, data) {
    storage.set('token', data);
    state.token = data;
  },
  setProfile(state, user) {
    storage.set('user', user);
    state.user = user
  },
  logout(state) {
    storage.clear();
    state.token = null;
    state.user = null;
    state.status = -1;
    state.identify = null;
    state.role = -1;
    state.site = null;
  },
  setIdentify(state,identify){
    storage.set('identify', identify);
    state.identify = identify
  },
  setRole(state,role){
    storage.set('role', role);
    state.role = role
  },
  setStatus(state,status){
    storage.set('status', status);
    state.status = status
  },
  setSite(state,site){
    storage.set('site', site);
    state.site = site
  },
  setAmount(state,amount){
    storage.set('amount', amount);
    state.amount = amount  
  }
}

var getters = {
  user: (state) => {
    return state.user;
  },
  userName: (state) => {
    return state.user;
  },
  status: (state) => {
    return state.status;
  },
  identify:(state)=>{
    return state.identify ;
  },
  role:(state)=>{
    return state.role;
  },
  site:(state)=>{
    return state.site;
  },
  amount:(state)=>{
    return state.amount;
  }
}

var actions = {}

var store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});

export default store;
