<template>
  <div id="site">
    <nav class="sider-bar small-bar">
      <div class="title-div">
        <span class="title-span">网站管理</span>
      </div>
      <!--导航网侧边栏路由配置-->
      <ul v-if="site.type===4">
        <li @click="classRemove">
          <router-link to="/dashboard/site/nw-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/nw-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">
              实用网站管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/nw-sort-manage">
                <span class="nav-text">分类管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/nw-website-list">
                <span class="nav-text">网站列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/nw-customer-service">
                <span class="nav-text">客服服务</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/nw-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/nw-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/nw-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/nw-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/nw-leaf-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dingdanye"></i>
            <span class="nav-text">单页管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/nw-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>   
      </ul>
      <!-- 香港彩侧边栏路由配置 -->
      <ul v-if="site.type===5">
        <li @click="classRemove">
          <router-link to="/dashboard/site/hk-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">
              导航管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/hk-nav-manage">
                <span class="nav-text">头部导航 (pc)</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/hk-hf-manage">
                <span class="nav-text">头部导航 (h5)</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/hk-article-list">文章列表</router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/hk-column-manage">栏目管理</router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/hk-label-manage">标签管理</router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/hk-slide-show">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-carousel"></i>
            <span class="nav-text">轮播图</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/hk-leaf-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dingdanye"></i>
            <span class="nav-text">单页管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/hk-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/hk-message-back">
            <i class="nav_icon iconfont icon-icon-"></i>
            <span class="nav-text">留言反馈</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
      </ul>
      <!--博客子侧边栏路由配置-->
      <ul v-if="site.type===2">
        <li @click="classRemove">
          <router-link to="/dashboard/site/blog-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/blog-nav-manage">
            <i class="nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">导航管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/blog-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/blog-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/blog-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/blog-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/blog-slide-show">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-carousel"></i>
            <span class="nav-text">轮播图</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/blog-leaf-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dingdanye"></i>
            <span class="nav-text">单页管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-yonghuguanli"></i>
            <span class="nav-text">
              用户管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/blog-user-list">
                <span class="nav-text">用户列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/blog-user-article">
                <span class="nav-text">用户文章</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/blog-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>   
      </ul>

      <!--开奖网侧边栏路由配置 -->
      <ul v-if="site.type===1">
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息配置</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-ziliao"></i>
            <span class="nav-text">
              首页彩票配置
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/lottery-main-manage">
                <span class="nav-text">彩票配置</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-tag-manage">
                <span class="nav-text">彩票标签配置</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-six-colors">
                <span class="nav-text">香港彩配置</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-gouxuan"></i>
            <span class="nav-text">
              精准计划
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/lottery-expert-config">
                <span class="nav-text">专家配置</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-plan-config">
                <span class="nav-text">计划配置</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">
              导航管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/lottery-head-manage">
                <span class="nav-text">头部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-footer-manage">
                <span class="nav-text">底部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/lottery-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/lottery-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-leaf-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dingdanye"></i>
            <span class="nav-text">单页管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-slideshow">
            <i class="nav_icon iconfont icon-carousel"></i>
            <span class="nav-text">轮播图</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-message-back">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-icon-"></i>
            <span class="nav-text">留言反馈</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/lottery-seo-config">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-caozuo"></i>
            <span class="nav-text">彩种seo配置</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
      </ul>

      <!--资讯网侧边栏路由配置-->
      <ul v-if="site.type===3">
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-nav-manage">
            <i class="nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">导航管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-article-list">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">文章管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-pingtaiguanli"></i>
            <span class="nav-text">
              平台管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/ns-sort-manage">
                <span class="nav-text">平台列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/ns-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-kongbaiye"></i>
            <span class="nav-text">
              导航页管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/ns-nav-sort-manage">
                <span class="nav-text">分类管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/ns-website-list">
                <span class="nav-text">网站列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/ns-customer-service">
                <span class="nav-text">客服列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-browser-list">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-liulanqi"></i>
            <span class="nav-text">浏览器下载</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-msg-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-icon-"></i>
            <span class="nav-text">反馈管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-feedback">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-icon-"></i>
            <span class="nav-text">留言管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/ns-inclusion">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-jiemushoulu"></i>
            <span class="nav-text">收录管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-kongbaiye"></i>
            <span class="nav-text">
              分红管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/ns-dividend-list">
                <span class="nav-text">分红列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/ns-dividend-sort-manage">
                <span class="nav-text">分类管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>   
      </ul>
      <!-- 行业新闻侧边栏路由配置 -->
      <ul v-if="site.type===6">
        <li @click="classRemove">
          <router-link to="/dashboard/site/trade-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">
              导航管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/trade-head-manage">
                <span class="nav-text">头部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/trade-footer-manage">
                <span class="nav-text">底部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/trade-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/trade-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/trade-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/trade-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/trade-leaf-manage">
            <i class="nav_icon iconfont icon-dingdanye"></i>
            <span class="nav-text">单页管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/trade-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/trade-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-icon-"></i>
            <span class="nav-text">
              消息管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/trade-comment-manage">
                <span class="nav-text">用户评论</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/trade-message-back">
                <span class="nav-text">用户留言</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li> 
      </ul>
      <!--登录口侧边栏路由配置-->
      <ul v-if="site.type===7">
        <li @click="classRemove">
          <router-link to="/dashboard/site/leaf-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/leaf-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/leaf-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/leaf-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/leaf-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/leaf-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li> 
      </ul>

      <!-- 自定义侧边栏路由配置 -->
      <ul v-if="site.type===9">
        <li @click="classRemove">
          <router-link to="/dashboard/site/cust-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/cust-file-manage">
            <i class="nav_icon iconfont icon-wenjianguanli1"></i>
            <span class="nav-text">文件管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>

      <!-- 企业站侧边栏路由配置 -->
      <ul v-if="site.type===10">
        <li @click="classRemove">
          <router-link to="/dashboard/site/company-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息配置</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <!-- <li @click="classRemove">
          <router-link to="/dashboard/site/company-nav-manage">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">导航管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li> -->
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">
              导航管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/company-nav-manage">
                <span class="nav-text">头部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/company-footer-manage">
                <span class="nav-text">底部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-chanpin"></i>
            <span class="nav-text">
              产品管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/company-product-list">
                <span class="nav-text">产品列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/company-case-list">
                <span class="nav-text">案例列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/company-sort-manage">
                <span class="nav-text">分类管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/company-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/company-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/company-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/company-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/company-leaf-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dingdanye"></i>
            <span class="nav-text">单页管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/company-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/company-slideshow">
            <i class="nav_icon iconfont icon-carousel"></i>
            <span class="nav-text">轮播图</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/company-chain-manage">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-dashujukeshihuaico-"></i>
            <span class="nav-text">友链管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
      </ul>

      <!-- 新闻站侧边栏路由配置 -->
      <ul v-if="site.type===11">
         <li @click="classRemove">
          <router-link to="/dashboard/site/journal-basic-info">
            <i class="nav_icon iconfont icon-jibenxinxi"></i>
            <span class="nav-text">基本信息管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-cogs nav_icon iconfont icon-icon-test"></i>
            <span class="nav-text">
              导航管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/journal-head-manage">
                <span class="nav-text">头部导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/journal-cathet-manage">
                <span class="nav-text">站外导航</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-navicon-wzgl"></i>
            <span class="nav-text">
              文章管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/journal-article-list">
                <span class="nav-text">文章列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/journal-column-manage">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/journal-label-manage">
                <span class="nav-text">标签管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/journal-keyword-replace">
                <span class="nav-text">关键字替换</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tuji"></i>
            <span class="nav-text">
              图集管理
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/journal-atlas-list">
                <span class="nav-text">图集列表</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/journal-columu-regulate">
                <span class="nav-text">栏目管理</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/journal-ad-manage">
            <i class="nav_icon iconfont icon-gggl"></i>
            <span class="nav-text">广告管理</span>
            <i class="arrow-right">></i>
          </router-link>
        </li>
        <li class="drop-show" @click="dropdown($event)">
          <a href="javascript:;">
            <i class="fa fa-info-circle nav_icon iconfont icon-tubiao"></i>
            <span class="nav-text">
              访客分析
              <i class="fa fa-angle-right nav_icon"></i>
            </span>
            <i class="arrow-right">></i>
          </a>
          <ul class="drop-list" @click="$event.cancelBubble=true">
            <li>
              <router-link to="/dashboard/site/visit-of-source">
                <span class="nav-text">访问来源统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/site/access-data">
                <span class="nav-text">访问数据统计</span>
                <i class="arrow-right">></i>
              </router-link>
            </li>
          </ul>
        </li>
        <li @click="classRemove">
          <router-link to="/dashboard/site/article-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wenzhang"></i>
            <span class="nav-text">文章抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li> 
        <li @click="classRemove">
          <router-link to="/dashboard/site/journal-atlas-crawl">
            <i class="fa fa-dashboard (alias) nav_icon iconfont icon-wangyezhuaqu"></i>
            <span class="nav-text">图集抓取</span>
            <i class="arrow-right">></i>
          </router-link>
        </li> 
      </ul>
    </nav>
    <div>
      <div id="content" :key="activeDate">
        <div class="site-title">当前站点：{{site.siteName+"【"+ site.siteDomain +"】"}}</div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      site: -1,
      activeDate: new Date().getTime(),
      currentSite:{}
    };
  },
  computed: {
    isFollow() {
      return this.$store.getters.site; //需要监听的数据
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.site = this.$store.getters.site;
      }
    },
    isFollow(newVal, oldVal) {
      this.site = newVal;
      this.activeDate = new Date().getTime();
    }
  },
  methods: {
    dropdown(evt) {
      let temp = evt.currentTarget;
      $(".router-link-active").removeClass("router-link-active");
      $(temp)
        .siblings()
        .removeClass("on");
      $(temp)
        .siblings("li")
        .children(".drop-list")
        .slideUp();
      $(temp)
        .siblings()
        .children()
        .find("li")
        .removeClass("on");
      $(temp)
        .children()
        .find("li")
        .removeClass("on");
      if (
        $(temp)
          .children(".drop-list")
          .css("display") === "none"
      ) {
        $(temp)
          .children(".drop-list")
          .slideToggle();
      } else {
        $(temp)
          .children(".drop-list")
          .slideUp();
      }
      $(temp).addClass("on");
    },
    classRemove() {
      $(".on").removeClass("on");
      $(".drop-list").slideUp();
    }
  },
  mounted() {
    $(".sider-bar").toggleClass("small-bar");
    if ($(".sider-bar").hasClass("small-bar")) {
      $(".drop-list").slideUp();
    }
    this.site = this.$store.getters.site;
  }
};
</script>

<style lang="scss" scoped>
.title-div {
  border-bottom: 1px solid rgb(32, 32, 32);

  .title-span {
    color: #ffffff;
    line-height: 50px;
  }
}

.site-title {
  position: absolute;
  top: 0;
  height: 50px;
  line-height: 50px;
  width: 100%;
  color: #ffffff;
  text-align: left;
}
#content {
  height: calc(100vh - 66px);
  left: 235px;
  position: absolute;
  right: 0;
  top: 66px;
  bottom: 0;
  overflow: hidden;
  color: #555555;
  background: #333333;
  z-index: -1;
  padding: 50px 25px 25px 25px;
  overflow-y: scroll;
  overflow-x: hidden;
}

li,
ol,
ul {
  list-style: none;
}

a {
  text-decoration: none;
  outline: 0;
}

a:hover,
a:link {
  text-decoration: none;
}

.sider-bar {
  float: left;
  height: calc(100vh - 69px);
  z-index: 99;
  overflow: hidden;
  background: #333333;
  width: 235px;
  max-height: 100%;
  position: absolute;
  box-shadow: 5px 2px 10px #000;
}

.sider-bar ul {
  width: 100%;
  float: left;
  padding-left: 0;
}

.sider-bar ul li {
  width: 100%;
  float: left;
  font-size: 14px;
  border-bottom: 1px solid #202020;
}

.sider-bar ul li a {
  padding: 8px 0;
  display: block;
  color: #ffffff;
  text-align: left;
}

.sider-bar ul li.home_btn {
  background: #282d2d;
  text-align: center;
}

.sider-bar ul li.home_btn:hover {
  background: #282d2d;
}

.sider-bar ul li a:hover {
  background: #202020;
  /*color: #099ae6;*/
  /*border-left: 2px solid #099ae6;*/
}

.sider-bar ul li.on {
  a {
    background: #202020;
    color: #099ae6;
    border-left: 2px solid #099ae6;
  }

  .drop-list {
    li {
      a {
        color: #ffffff;
      }
    }

    li.on {
      a {
        background: #202020;
        color: #099ae6;
        border-left: 2px solid #099ae6;
      }
    }
  }
}

.router-link-active {
  background: #202020;
  color: #099ae6 !important;
  border-left: 2px solid #099ae6;
}

.sider-bar ul li .nav_icon {
  font-size: 18px;
  margin: 0 20px;
}

.small-bar {
  width: 50px;
}

.small-bar li {
  text-align: center;
}

.small-bar li a {
  display: block;
  text-align: center;
}

.small-bar li span {
  display: none;
}

.small-bar ul li .nav_icon {
  font-size: 24px;
  margin: 0;
}

ul.drop-list {
  display: none;
  /*margin-left: 30px;*/
  /*width: 190px;*/
  /*padding-left: 32px;*/
  li {
    border: none;

    a {
      padding-left: 62px;
    }
  }
}

.fa-angle-right {
  float: right;
}

.arrow-right {
  font-style: normal;
  float: right;
  line-height: 28px;
  margin-right: 20px;
}
</style>
