// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.config.productionTip = false

import store from './stores/store'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/iconfont/iconfont.css'
// import 'jquery'
import storage from './storage'

import 'babel-polyfill';

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/imgs/error.jpg'),
    loading: require('./assets/imgs/loading.gif'),
    attempt: 3,
    // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
    listenEvents: ['scroll']
})
//颜色选择器
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

// import VueUeditorWrap from 'vue-ueditor-wrap'
// Vue.use(VueUeditorWrap)

// 引入富文本编辑器
import '../static/Ue/ueditor.config.js'
import '../static/Ue/ueditor.all.js'
import '../static/Ue/lang/zh-cn/zh-cn.js'
import '../static/Ue/ueditor.parse.min.js'

import 'vue2-toastr/dist/css/vue2-toastr.css'

import Toastr from 'vue2-toastr'
Vue.use(Toastr)
    // 全局配置对象
var toastrConfigs = {
    position: 'top right',
    showDuration: 3000
}
Vue.use(Toastr, toastrConfigs)

let t_toast = Vue.prototype.$toast;
router.beforeEach((to, from, next) => {
    const token = storage.get('token');
    const status = storage.get('status');

    if (token && status === 0) {
        next();
    } else {
        if (to.meta.role) {
            store.commit("logout");
            next({
                path: '/platform-intro',
                // query: {redirect: to.fullPath}
            })
        } else {
            next();
        }
    }
});
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

import * as http from '../apis/net'
Vue.http.options.timeout = 60000;
Vue.http.interceptors.push((request, next) => {
    let timeout;
    if (request.timeout) {
        timeout = setTimeout(() => {
            t_toast.success({
                message: "请求超时！",
                color: '#3cb5f1'
            });
            request.abort();
        }, request.timeout);
    }
    next((response) => { //在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        clearTimeout(timeout);
        // ok（布尔值）：当HTTP响应状态码在200~299区间时该值为true，表示响应成功。
        //
        // status(数值)： HTTP响应状态码。
        //     if (response.ok) {
        if (response.status === 200) {
            if (response.body.code) {
                let code = response.body.code;
                if (code === 1021) {
                    http.refreshToken({ token: storage.get("token") }).then(rs => {
                        if (!rs.code) {
                            store.commit("login", rs.token);
                            window.location.reload();
                        } else if (rs.code === 1022) {
                            store.commit("logout");
                            router.push("/platform-intro");
                        }
                    });
                } else if (code === 1020 || code === 1022 || code === 1023 || code === 1024) {
                    // 1020	TOKEN_MISS	默认分组	修改 删除
                    // 1021	Token expired	默认分组	修改 删除
                    // 1022	Token invalid	默认分组	修改 删除
                    // 1023	未找到TOKEN用户	默认分组	修改 删除

                    if (code === 1024) {
                        t_toast.success({
                            message: "您的账号在别处登录，您被迫下线。如非本人操作，请修改密码。",
                            color: '#3cb5f1'
                        });
                    }
                    store.commit("logout");
                    router.push("/platform-intro");
                } else {
                    if (response.body.error) {
                        t_toast.success({
                            message: response.body.error,
                            color: '#3cb5f1'
                        });
                    }
                }
            }
        } else {
            t_toast.success({
                message: response.body.error||"网络异常，请稍后再试",
                color: '#3cb5f1'
            });
        }
        return response;
    });
});

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});