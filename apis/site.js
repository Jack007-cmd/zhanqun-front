import { getHttp, getHttpAuth, postHttp, postHttpAuth } from "./baseHttp";


/**
 * GET
 * 获取友链列表
 * @returns {Promise}
 */
export function getChainList() {
    let url = '/v1/user/web/friendly';
    return getHttpAuth(url);
}

/**
 * POST
 * 友链排序更新
 * @param body
 * @returns {Promise}
 */
export function updateChainSort(body) {
    let url = '/v1/user/web/friendly/sort/update';
    return postHttpAuth(url, body);
}

/**
 *  POST
 * 友链删除
 * @param body
 * @returns {Promise}
 */
export function deleteChain(body) {
    let url = '/v1/user/web/friendly/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 友链创建
 * @param body
 * @returns {Promise}
 */
export function createChain(body) {
    let url = '/v1/user/web/friendly/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 友链详情
 * @param params
 * @returns {Promise}
 */
export function getChainDetail(params) {
    let url = '/v1/user/web/friendly/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 友链更新
 * @param body
 * @returns {Promise}
 */
export function updateChain(body) {
    let url = '/v1/user/web/friendly/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 获取导航列表
 * @returns {Promise}
 */
export function getNavList(params) {
    let url = '/v1/user/web/menu';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 导航排序更新
 * @param body
 * @returns {Promise}
 */
export function updateNavSort(body) {
    let url = '/v1/user/web/menu/sort/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 导航创建
 * @param body
 * @returns {Promise}
 */
export function createNav(body) {
    let url = '/v1/user/web/menu/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 导航详情
 * @param params
 * @returns {Promise}
 */
export function getNavDetail(params) {
    let url = '/v1/user/web/menu/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 导航更新
 * @param body
 * @returns {Promise}
 */
export function updateNav(body) {
    let url = '/v1/user/web/menu/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 导航显示
 * @param body
 * @returns {Promise}
 */
export function setNavVisible(body) {
    let url = '/v1/user/web/menu/state/setVisible';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 导航隐藏
 * @param body
 * @returns {Promise}
 */
export function setNavHidden(body) {
    let url = '/v1/user/web/menu/state/setHidden';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 导航删除
 * @param body
 * @returns {Promise}
 */
export function deleteNav(body) {
    let url = '/v1/user/web/menu/delete';
    return postHttpAuth(url, body);
}

/**
 * GET
 *  站点文章列表
 * @returns {Promise}
 */
export function getArticleList(params) {
    let url = '/v1/user/web/article';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 设置文章置顶
 * @param body
 * @returns {Promise}
 */
export function setArticleTop(body) {
    let url = '/v1/user/web/article/top/setYes';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 文章取消置顶
 * @param params
 * @returns {Promise}
 */
export function cancelArticleTop(params) {
    let url = '/v1/user/web/article/top/setNo';
    return postHttpAuth(url, params);
}
/**
 * POST
 * 站点文章创建
 * @param body
 * @returns {Promise}
 */
export function createArticle(body) {
    let url = '/v1/user/web/article/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点文章详情
 * @param params
 * @returns {Promise}
 */
export function getArticleDetail(params) {
    let url = '/v1/user/web/article/detail/fromId';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点文章更新
 * @param body
 * @returns {Promise}
 */
export function updataArticle(body) {
    let url = '/v1/user/web/article/update';
    return postHttpAuth(url, body);

}

/**
 * POST
 * 站点文章删除
 * @param body
 * @returns {Promise}
 */
export function deleteArticle(body) {
    let url = '/v1/user/web/article/delete';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点文章分类(栏目)列表
 * @returns {Promise}
 */
export function getArticleCategoryList() {
    let url = '/v1/user/web/article/category';
    return getHttpAuth(url);
}

/**
 * POST
 * 站点文章分类显示
 * @param body
 * @returns {Promise}
 */
export function setArticleCategoryVisible(body) {
    let url = '/v1/user/web/article/category/state/setVisible';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点文章抓取发布
 * @param body
 * @returns {Promise}
 * /v1/user/web/article/release
 */
export function setArticleRelease(body) {
    let url = '/v1/user/web/article/release';
    return postHttpAuth(url, body);
}

/**
 *  POST
 * 站点文章分类隐藏
 * @param body
 * @returns {Promise}
 */
export function setArticleCategoryHidden(body) {
    let url = '/v1/user/web/article/category/state/setHidden';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 站点文章分类删除
 * @param body
 * @returns {Promise}
 */
export function deleteArticleCategory(body) {
    let url = '/v1/user/web/article/category/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点文章分类（栏目）创建
 * @param body
 * @returns {Promise}
 */
export function createArticleCategory(body) {
    let url = '/v1/user/web/article/category/create';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 站点文章分类详情
 * @param params
 * @returns {Promise}
 */
export function getArticleCategoryDetail(params) {
    let url = '/v1/user/web/article/category/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点文章分类更新
 * @param body
 * @returns {Promise}
 */
export function updateArticleCategory(body) {
    let url = '/v1/user/web/article/category/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 实用网站分类列表
 * @returns {Promise}
 */
export function getNavCategoryList() {
    let url = '/v1/user/web/nav/category';
    return getHttpAuth(url);
}

/**
 *  POST
 * 实用网站分类删除
 * @param body
 * @returns {Promise}
 */
export function deleteNavCategory(body) {
    let url = '/v1/user/web/nav/category/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 实用网站分类创建
 * @param body
 * @returns {Promise}
 */
export function createNavCategory(body) {
    let url = '/v1/user/web/nav/category/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 实用网站分类详情
 * @param params
 * @returns {Promise}
 */
export function getNavCategoryDetail(params) {
    let url = '/v1/user/web/nav/category/detail';
    return getHttpAuth(url, params);
}
/**
 *  POST
 *  实用网站分类更新
 * @param body
 * @returns {Promise}
 */
export function updateNavCategory(body) {
    let url = '/v1/user/web/nav/category/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 实用网站列表
 * @param params
 * @returns {Promise}
 */
export function getNavWebsiteList(params) {
    let url = '/v1/user/web/nav';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 实用网站排序更新
 * @param body
 * @returns {Promise}
 */
export function updateNavWebsiteSort(body) {
    let url = '/v1/user/web/nav/sort/update';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 实用网站删除
 * @param body
 * @returns {Promise}
 */
export function deleteNavWebsite(body) {
    let url = '/v1/user/web/nav/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * /v1/user/web/nav/create
 * @param body
 * @returns {Promise}
 */
export function createNavWebsite(body) {
    let url = '/v1/user/web/nav/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 实用网站详情
 * @param params
 * @returns {Promise}
 */
export function getNavWebsiteDetail(params) {
    let url = '/v1/user/web/nav/detail';
    return getHttpAuth(url, params);
}
/**
 * POST
 * 实用网站更新
 * @param body
 * @returns {Promise}
 */
export function updateNavWebsite(body) {
    let url = '/v1/user/web/nav/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点平台分类 - 列表（所有）
 * @returns {Promise}
 */
export function getPlatformCategoryAll() {
    let url = '/v1/user/web/platform/category/all';
    return getHttpAuth(url);
}
// v1/user/web/platform/category/sort/update
/**
 * POST
 * 站点平台管理--栏目管理
 * @returns {Promise}
 */
export function updatePlatformCategorySort(body) {
    let url = '/v1/user/web/platform/category/sort/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点平台分类（栏目）隐藏
 * @returns {Promise}
 */
export function setPlatformCategoryHidden(body) {
    let url = '/v1/user/web/platform/category/state/setHidden';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 站点平台分类（栏目）显示
 * @returns {Promise}
 */
export function setPlatformCategoryVisible(body) {
    let url = '/v1/user/web/platform/category/state/setVisible';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 获取站点平台分类列表
 * @returns {Promise}
 */
export function getPlatformCategory() {
    let url = '/v1/user/web/platform/category';
    return getHttpAuth(url);
}

/**
 * POST
 * 站点平台分类 - 删除
 * @param body
 * @returns {Promise}
 */
export function deletePlatformCategory(body) {
    let url = '/v1/user/web/platform/category/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 创建站点平台分类
 * @param body
 * @returns {Promise}
 */
export function createPlatformCategory(body) {
    let url = '/v1/user/web/platform/category/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点平台分类 - 详情
 * @param params
 * @returns {Promise}
 */
export function getPlatformCategoryDetail(params) {
    let url = '/v1/user/web/platform/category/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 更新站点平台分类
 * @param body
 * @returns {Promise}
 */
export function updatePlatformCategory(body) {
    let url = '/v1/user/web/platform/category/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点平台列表
 * @param params
 * @returns {Promise}
 */
export function getPlatformList(params) {
    let url = '/v1/user/web/platform/';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 平台排序 - 更新
 * @param body
 * @returns {Promise}
 */
export function updatePlatformSort(body) {
    let url = '/v1/user/web/platform/sort/update';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 站点平台 - 删除
 * @param body
 * @returns {Promise}
 */
export function deletePlarform(body) {
    let url = '/v1/user/web/platform/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点平台 - 创建
 * @param body
 * @returns {Promise}
 */
export function createPlatform(body) {
    let url = '/v1/user/web/platform/create';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点平台 - 详情
 * @param body
 * @returns {Promise}
 */
export function getPlatformDetail(body) {
    let url = '/v1/user/web/platform/detail';
    return getHttpAuth(url, body);
}

/**
 * POST
 * 站点平台 - 更新
 * @param body
 * @returns {Promise}
 */
export function updatePlatform(body) {
    let url = '/v1/user/web/platform/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点推荐浏览器列表
 * @returns {Promise}
 */
export function getBrowserList() {
    let url = '/v1/user/web/browser';
    return getHttpAuth(url);
}

/**
 * POST
 * 浏览器排序 - 更新
 * @param body
 * @returns {Promise}
 */
export function updateBrowserSort(body) {
    let url = '/v1/user/web/browser/sort/update';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 创建站点推荐浏览器
 * @param body
 * @returns {Promise}
 */
export function createBrowser(body) {
    let url = '/v1/user/web/browser/create';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点浏览器 - 删除
 * @param body
 * @returns {Promise}
 */
export function deleteBrowser(body) {
    let url = '/v1/user/web/browser/delete';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点浏览器 - 详情
 * @param params
 * @returns {Promise}
 */
export function getBrowserDetail(params) {
    let url = '/v1/user/web/browser/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 更新站点浏览器
 * @param body
 * @returns {Promise}
 */
export function updateBrowser(body) {
    let url = '/v1/user/web/browser/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点收录-列表
 * @returns {Promise}
 */
export function getRecruit(params) {
    let url = '/v1/user/web/recruit';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 站点留言反馈列表
 * @returns {Promise}
 */
export function getFeedback(params) {
    let url = '/v1/user/web/feedback';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 站点广告列表
 * @param params
 */
export function getAdList(params) {
    let url = '/v1/user/web/ad';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点广告 - 删除
 * @param body
 * @returns {Promise}
 */
export function deleteAd(body) {
    let url = '/v1/user/web/ad/delete';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点广告位置列表
 * @returns {Promise}
 */
export function getAdPositionList() {
    let url = '/v1/user/web/ad/position';
    return getHttpAuth(url);
}

/**
 * POST
 * 站点广告 - 添加
 * @param body
 * @returns {Promise}
 */
export function createAd(body) {
    let url = '/v1/user/web/ad/create';
    return postHttpAuth(url, body);
}

/**
 *  GET
 * 站点广告 - 详情
 * @param params
 * @returns {Promise}
 */
export function getAdDetail(params) {
    let url = '/v1/user/web/ad/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点广告 - 更新
 * @param body
 * @returns {Promise}
 */
export function updateAd(body) {
    let url = '/v1/user/web/ad/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 标签列表
 * @returns {Promise}
 */
export function getTagList(params) {
    let url = '/v1/user/web/tag';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 标签删除
 * @param body
 * @returns {Promise}
 */
export function deleteTag(body) {
    let url = '/v1/user/web/tag/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 标签创建
 * @param body
 * @returns {Promise}
 */
export function createTag(body) {
    let url = '/v1/user/web/tag/create';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 标签更新
 * @param body
 * @returns {Promise}
 */
export function updateTag(body) {
    let url = '/v1/user/web/tag/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 所有标签
 * @returns {Promise}
 */
export function getAllTag() {
    let url = '/v1/user/web/tag/all';
    return getHttpAuth(url);
}

/**
 * GET
 * 站点配置详情
 * @returns {Promise}
 */
export function getConfigDetail() {
    let url = '/v1/user/web/config/detail';
    return getHttpAuth(url);
}

/**
 * GET
 * 站点配置 - 更新
 * @param body
 * @returns {Promise}
 */
export function updateConfig(body) {
    let url = '/v1/user/web/config/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点线路 - 列表
 * @returns {Promise}
 */
export function getAllLines(body) {
    let url = '/v1/user/web/route/all';
    return getHttpAuth(url,body);
}
/**
 * POST
 * 站点线路 - 更新
 * @param body
 * @returns {Promise}
 */
export function updateLines(body) {
    let url = '/v1/user/web/route/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点基本信息--详情
 * @returns {Promise}
 */
export function getBasicInfo() {
    let url = '/v1/user/web/detail';
    return getHttpAuth(url);
}

/**
 * POST
 * 站点基本信息--更新
 * @param body
 * @returns {Promise}
 */
export function updateBasicInfo(body) {
    let url = '/v1/user/web/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * /v1/user/web/page
 * @param params
 * @returns {Promise}
 */
export function getLeafList(params) {
    let url = '/v1/user/web/page';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 单页删除
 * @param body
 * @returns {Promise}
 */
export function deleteLeaf(body) {
    let url = '/v1/user/web/page/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 单页创建
 * @param body
 * @returns {Promise}
 */
export function createLeaf(body) {
    let url = '/v1/user/web/page/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 单页详情
 * @param params
 * @returns {Promise}
 */
export function getLeafDetail(params) {
    let url = '/v1/user/web/page/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 单页更新
 * @param body
 * @returns {Promise}
 */
export function updateLeaf(body) {
    let url = '/v1/user/web/page/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 单页顶级列表
 * @returns {Promise}
 */
export function getParentList() {
    let url = '/v1/user/web/page/parent';
    return getHttpAuth(url);
}

/**
 * GET
 * 站点用户文章列表
 * @param params
 * @returns {Promise}
 */
export function getUserArticleList(params) {
    let url = '/v1/user/web/member/article';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 站点会员文章 -- 详情
 * @param params
 * @returns {Promise}
 */
export function getUserArticleDetail(params) {
    let url = '/v1/user/web/member/article/detail';
    return getHttpAuth(url, params);
}

/**
 *  POST
 * 站点会员文章 -- 通过
 * @param body
 * @returns {Promise}
 */
export function setUserArticlePass(body) {
    let url = '/v1/user/web/member/article/state/setPass';
    return postHttpAuth(url, body);
}

/**
 *  POST
 * 站点会员文章 -- 拒绝
 * @param body
 * @returns {Promise}
 */
export function setUserArticleRefuse(body) {
    let url = '/v1/user/web/member/article/state/setRefuse';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点文章关键词 - 列表
 * @returns {Promise}
 */
export function getKeywordsList(params) {
    let url = '/v1/user/web/article/keyword';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点文章关键词 - 删除
 * @param body
 * @returns {Promise}
 */
export function deleteKeyword(body) {
    let url = '/v1/user/web/article/keyword/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点文章关键词 - 添加
 * @param body
 * @returns {Promise}
 */
export function createKeyword(body) {
    let url = '/v1/user/web/article/keyword/create';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点文章关键词 - 更新
 * @param body
 * @returns {Promise}
 */
export function updateKeyword(body) {
    let url = '/v1/user/web/article/keyword/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点会员列表
 * @returns {Promise}
 */
export function getSiteUserList(params) {
    let url = '/v1/user/web/member';
    return getHttpAuth(url, params);
}
/**
 * 站点轮播图 - 列表
 * @returns {Promise}
 */
export function getSlideshowList(params) {
    let url = '/v1/user/web/slide';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点轮播图 - 删除
 * @param body
 * @returns {Promise}
 */
export function deleteSlide(body) {
    let url = '/v1/user/web/slide/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 轮播图显示
 * @param body
 * @returns {Promise}
 */
export function setSlideVisible(body) {
    let url = '/v1/user/web/slide/state/setVisible';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 轮播图隐藏
 * @param body
 * @returns {Promise}
 */
export function setSlideHidden(body) {
    let url = '/v1/user/web/slide/state/setHidden';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 站点轮播图 - 创建
 * @param body
 * @returns {Promise}
 */
export function createSlide(body) {
    let url = '/v1/user/web/slide/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 轮播图 - 详情
 * @param params
 * @returns {Promise}
 */
export function getSlideDetail(params) {
    let url = '/v1/user/web/slide/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点轮播图 - 更新
 * @param body
 * @returns {Promise}
 */
export function updataSlide(body) {
    let url = '/v1/user/web/slide/update';
    return postHttpAuth(url, body);
}

/**
 *  GET
 * 站点客服列表
 * @returns {Promise}
 */
export function getExecutiveList() {
    let url = '/v1/user/web/executive';
    return getHttpAuth(url);
}

/**
 * POST
 * 站点客服更新排序
 * @param body
 * @returns {Promise}
 */
export function updateExecutiveSort(body) {
    let url = '/v1/user/web/executive/sort/update';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 站点客服删除
 * @param body
 * @returns {Promise}
 */
export function deleteExecutive(body) {
    let url = '/v1/user/web/executive/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点客服创建
 * @param body
 * @returns {Promise}
 */
export function createExecutive(body) {
    let url = '/v1/user/web/executive/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点客服详情
 * @param params
 * @returns {Promise}
 */
export function getExecutiveDetail(params) {
    let url = '/v1/user/web/executive/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点客服更新
 * @param body
 * @returns {Promise}
 */
export function updateExecutive(body) {
    let url = '/v1/user/web/executive/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 *  彩种标签 - 列表
 * @returns {Promise}
 */
export function getLottagList() {
    let url = '/v1/user/web/lottery/tag';
    return getHttpAuth(url);
}

/**
 * POST
 * 彩种标签 - 更新
 * @param body
 * @returns {Promise}
 */
export function updateLottag(body) {
    let url = '/v1/user/web/lottery/tag/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 彩种标签 - 详情
 * @param params
 * @returns {Promise}
 */
export function getLottagDetail(params) {
    let url = '/v1/user/web/lottery/tag/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 彩种标签 - 创建
 * @param body
 * @returns {Promise}
 */
export function createLottag(body) {
    let url = '/v1/user/web/lottery/tag/create';
    return postHttpAuth(url, body);
}


/**
 * GET
 * 彩种列表 -所有
 * @returns {Promise}
 */
export function getLottagAll() {
    let url = '/v1/user/web/lottery/all';
    return getHttpAuth(url);
}

/**
 * POST
 * 彩种标签 - 删除
 * @param body
 * @returns {Promise}
 */
export function deleteLottag(body) {
    let url = '/v1/user/web/lottery/tag/delete';
    return postHttpAuth(url, body);
}


/**
 * GET
 *  文章评论 - 列表
 * @returns {Promise}
 */
export function getCommentList() {
    let url = '/v1/user/web/article/comment';
    return getHttpAuth(url);
}



/**
 * POST
 * 文章评论 - 删除
 * @param body
 * @returns {Promise}
 */
export function deleteComment(body) {
    let url = '/v1/user/web/article/comment/delete';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点文章分类列表（所有）
 * @returns {Promise}
 */
export function getAllArticleCategory() {
    let url = '/v1/user/web/article/category/all';
    return getHttpAuth(url);
}

/**
 * GET
 * 站点留言联系列表
 * @returns {Promise}
 */
export function getContact(params) {
    let url = '/v1/user/web/contact';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 分红分类列表（分页）
 * @returns {Promise}
 */
export function getBonusCategoryList(params) {
    let url = '/v1/user/web/bonus/category';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 分红分类删除
 * @param body
 * @returns {Promise}
 */
export function deleteBonusCategory(body) {
    let url = '/v1/user/web/bonus/category/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 分红分类排序更新
 * @param body
 * @returns {Promise}
 */
export function updateBonusCategorySort(body) {
    let url = '/v1/user/web/bonus/category/sort/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 分红分类创建
 * @param body
 * @returns {Promise}
 */
export function CreateBonusCategory(body) {
    let url = '/v1/user/web/bonus/category/create';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 分红分类更新
 * @param body
 * @returns {Promise}
 */
export function updateBonusCategory(body) {
    let url = '/v1/user/web/bonus/category/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 分红分类列表（不分页）
 * @returns {Promise}
 */
export function getAllBonusCategoryList() {
    let url = '/v1/user/web/bonus/category/all';
    return getHttpAuth(url);
}

/**
 * get
 * 分红列表
 * @param params
 * @returns {Promise}
 */
export function getBonusList(params) {
    let url = '/v1/user/web/bonus';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 分红删除
 * @param body
 * @returns {Promise}
 */
export function deleteBonus(body) {
    let url = '/v1/user/web/bonus/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 分红创建
 * @param body
 * @returns {Promise}
 */
export function createBonus(body) {
    let url = '/v1/user/web/bonus/create';
    return postHttpAuth(url, body);
}

/**
 * get
 * 分红详情
 * @param params
 * @returns {Promise}
 */
export function getBonusDetail(params) {
    let url = '/v1/user/web/bonus/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 分红更新
 * @param body
 * @returns {Promise}
 */
export function updateBonus(body) {
    let url = '/v1/user/web/bonus/update';
    return postHttpAuth(url, body);
}

/**
 * get
 * 站点留言列表
 * @param params
 * @returns {Promise}
 */
export function getGuestBookList(params) {
    let url = '/v1/user/web/guestbook';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点留言审核通过
 * @param body
 * @returns {Promise}
 */
export function setGuestBookPass(body) {
    let url = '/v1/user/web/guestbook/state/setYes';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点留言审核不通过
 * @param body
 * @returns {Promise}
 */
export function setGuestBookFail(body) {
    let url = '/v1/user/web/guestbook/state/setNo';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点留言显示（恢复）
 * @param body
 * @returns {Promise}
 */
export function setGuestbookVisible(body) {
    let url = '/v1/user/web/guestbook/state/setVisible';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点留言隐藏（假删除）
 * @param body
 * @returns {Promise}
 */
export function setGuestbookHidden(body) {
    let url = '/v1/user/web/guestbook/state/setHidden';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点清理缓存文件
 * @param body
 * @returns {Promise}
 */
export function setCustomFileClear(body) {
    let url = '/v1/user/web/website/cache/clear';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点删除文件
 * @param body
 * @returns {Promise}
 */
export function setCustomFileDelete(body) {
    let url = '/v1/user/web/website/file/delete';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点删除文件夹
 * @param body
 * @returns {Promise}
 */
export function setCustomFileDirDelete(body) {
    let url = '/v1/user/web/website/dir/delete';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点重命名文件
 * @param body
 * @returns {Promise}
 */
export function setCustomFileRename(body) {
    let url = '/v1/user/web/website/file/rename';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点重命名文件夹
 * @param body
 * @returns {Promise}
 */
export function setCustomFileDirRename(body) {
    let url = '/v1/user/web/website/dir/rename';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点上传文件
 * @param body
 * @returns {Promise}
 */
export function setCustomFileUpload(body) {
    let url = '/v1/user/web/website/file/upload';
    return postHttpAuth(url, body);
}

/**
 * get
 * 静态站点获取文件内容
 * @param body
 * @returns {Promise}
 */
export function getCustomFileContent(body) {
    let url = '/v1/user/web/website/file/content';
    return getHttpAuth(url, body);
}

/**
 * get
 * 静态站点文件列表
 * @param body
 * @returns {Promise}
 */
export function getCustomFileDir(body) {
    let url = '/v1/user/web/website/dir';
    return getHttpAuth(url, body);
}

/**
 * post
 * 静态站点创建文件夹
 * @param body
 * @returns {Promise}
 */
export function setCustomFileCreate(body) {
    let url = '/v1/user/web/website/dir/create';
    return postHttpAuth(url, body);
}


/**
 * post
 * 静态站点编辑文件内容
 * @param body
 * @returns {Promise}
 */
export function setCustomFileWrite(body) {
    let url = '/v1/user/web/website/file/write';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点移动文件
 * @param body
 * @returns {Promise}
 */
export function setCustomFileMove(body) {
    let url = '/v1/user/web/website/file/move';
    return postHttpAuth(url, body);
}

/**
 * post
 * 静态站点移动文件夹
 * @param body
 * @returns {Promise}
 */
export function setCustomFileDirMove(body) {
    let url = '/v1/user/web/website/dir/move';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点轮播图位置列表
 * @returns {Promise}
 */
export function getSlidePositionList() {
    let url = '/v1/user/web/slide/position';
    return getHttpAuth(url);
}

/**
 * GET
 * 站点产品/案例--列表  ====类型 1=产品 2= 案例(必填)
 * @returns {Promise}
 */
export function getCompanyProductList(params) {
    let url = '/v1/user/web/product';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 站点产品分类--列表（所有）  ====类型 1=产品 2= 案例(必填)
 * @returns {Promise}
 */
export function getProductCategoryAll() {
    let url = '/v1/user/web/product/category/all';
    return getHttpAuth(url);
}

/**
 * POST
 * 站点产品/案例--创建
 * @param body
 * @returns {Promise}
 */
export function createProduct(body) {
    let url = '/v1/user/web/product/create';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 站点产品/案例--详情
 * @param params
 * @returns {Promise}
 */
export function getProductDetail(params) {
    let url = '/v1/user/web/product/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点产品/案例--更新
 * @param body
 * @returns {Promise}
 */
export function updataProduct(body) {
    let url = '/v1/user/web/product/update';
    return postHttpAuth(url, body);

}
/**
 * POST
 * 站点产品/案例--删除
 * @param body
 * @returns {Promise}
 */
export function deleteProduct(body) {
    let url = '/v1/user/web/product/delete';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点产品/案例--置顶
 * @param body
 * @returns {Promise}
 */
export function setProductTop(body) {
    let url = '/v1/user/web/product/top/setYes';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 站点产品/案例--取消置顶
 * @param params
 * @returns {Promise}
 */
export function cancelProductTop(params) {
    let url = '/v1/user/web/product/top/setNo';
    return postHttpAuth(url, params);
}

/**
 * GET
 * 站点产品分类--列表
 * @returns {Promise}
 */
export function getProductCategoryList() {
    let url = '/v1/user/web/product/category';
    return getHttpAuth(url);
}
/**
 * POST
 * 站点产品分类--创建
 * @param body
 * @returns {Promise}
 */
export function CreateCategory(body) {
    let url = '/v1/user/web/product/category/create';
    return postHttpAuth(url, body);

}
/**
 * POST
 * 站点产品分类--更新
 * @param body
 * @returns {Promise}
 */
export function UpdateCategory(body) {
    let url = '/v1/user/web/product/category/update';
    return postHttpAuth(url, body);

}
/**
 * GET
 * 站点产品分类 -- 详情
 * @param params
 * @returns {Promise}
 */
export function getCategoryDetail(params) {
    let url = '/v1/user/web/product/category/detail';
    return getHttpAuth(url, params);
}
/**
 * POST
 * 站点产品分类--删除
 * @param body
 * @returns {Promise}
 */
export function deleteProductCategory(body) {
    let url = '/v1/user/web/product/category/delete';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 彩种标签 -- 排序更新
 * @param body
 * @returns {Promise}
 */
export function updateColorLabeSort(body) {
    let url = '/v1/user/web/lottery/tag/sort/update';
    return postHttpAuth(url, body);
}


/**
 * GET
 * 彩种精准计划 - 所有专家
 * @returns {Promise}
 */
export function getPlanExpertAll() {
    let url = '/v1/user/web/lottery/plan-expert/all';
    return getHttpAuth(url);
}

/**
 * POST
 * 彩种精准计划 - 专家排序修改
 * @param body
 * @returns {Promise}
 */
export function updatePlanExpertSort(body) {
    let url = '/v1/user/web/lottery/plan-expert/sort';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 彩种精准计划 - 专家详情
 * @param params
 * @returns {Promise}
 */
export function getPlanExpertDetail(params) {
    let url = '/v1/user/web/lottery/plan-expert/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 彩种精准计划 - 专家信息修改
 * @param body
 * @returns {Promise}
 */
export function updatePlanExpert(body) {
    let url = '/v1/user/web/lottery/plan-expert/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 彩种精准计划 - 所有计划种类
 * @returns {Promise}
 */
export function getAllPlanCategory() {
    let url = '/v1/user/web/lottery/plan-category/all';
    return getHttpAuth(url);
}

/**
 * GET
 *  彩种精准计划 - 计划列表（分页）
 * @returns {Promise}
 */
export function getPlanExpertList(params) {
    let url = '/v1/user/web/lottery/plan';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 彩种精准计划 - 计划创建
 * @param body
 * @returns {Promise}
 */
export function createPlanExpert(body) {
    let url = '/v1/user/web/lottery/plan/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 彩种精准计划 - 计划详情
 * @param params
 * @returns {Promise}
 */
export function getPlanDetail(params) {
    let url = '/v1/user/web/lottery/plan/detail';
    return getHttpAuth(url, params);
}
/**
 * POST
 * 彩种精准计划 - 计划编辑
 * @param body
 * @returns {Promise}
 */
export function updateLotPlan(body) {
    let url = '/v1/user/web/lottery/plan/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点文章删除
 * @param body
 * @returns {Promise}
 */
export function deleteLotPlan(body) {
    let url = '/v1/user/web/lottery/plan/delete';
    return postHttpAuth(url, body);
}

/**
 * 彩种Seo--列表
 * GET
 * /v1/user/web/lottery/seo
 * @param params
 * @returns {Promise}
 */
export function getLotterySeoList(params) {
    let url = '/v1/user/web/lottery/seo';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 彩种Seo--详情
 * /v1/user/web/lottery/seo/detail
 * @param params
 * @returns {Promise}
 */
export function getLotterySeoDetail(params) {
    let url = '/v1/user/web/lottery/seo/detail';
    return getHttpAuth(url, params);
}


/**
 * POST
 * 彩种Seo--更新
 * v1/user/web/lottery/seo/update
 * @param body
 * @returns {Promise}
 */
export function updateLotterySeoUpdate(body) {
    let url = '/v1/user/web/lottery/seo/update';
    return postHttpAuth(url, body);
}

/**
 * get
 * 站点访问来源统计
 * /v1/user/web/pv/forSource
 * @param body
 * @returns {Promise}
 */
export function getPvForSource(body) {
    let url = '/v1/user/web/pv/forSource';
    return getHttpAuth(url, body);
}

/**
 * GET
 * 站点访问数据统计
 * /v1/user/web/pv
 * @param params
 * @returns {Promise}
 */
export function getPvAccess(params) {
    let url = '/v1/user/web/pv';
    return getHttpAuth(url, params);
}


/**
 * GET
 * 系统文章(分页)
 * /v1/article
 * @param params
 * @returns {Promise}
 */
export function getArticle(params) {
    let url = '/v1/article';
    return getHttpAuth(url, params);
}

/**
 * GET
 *  站点图集--列表
 * @returns {Promise}
 */
export function getAtlasList(params) {
    let url = '/v1/user/web/atlas';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点图集--创建
 * @param body
 * @returns {Promise}
 */
export function createAtlas(body) {
    let url = '/v1/user/web/atlas/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站点图集--详情
 * @param params
 * @returns {Promise}
 */
export function getAtlasDetail(params) {
    let url = '/v1/user/web/atlas/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点图集--更新
 * @param body
 * @returns {Promise}
 */
export function updateAtlas(body) {
    let url = '/v1/user/web/atlas/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点图集-删除
 * @param body
 * @returns {Promise}
 */
export function deleteAltas(body) {
    let url = '/v1/user/web/atlas/delete';
    return postHttpAuth(url, body);
}


/**
 * POST
 * 站点图集--设置置顶
 * @param body
 * @returns {Promise}
 */
export function setAtlasTop(body) {
    let url = '/v1/user/web/atlas/top/setYes';
    return postHttpAuth(url, body);
}
    
/**
 * POST
 * 站点图集--取消置顶
 * @param params
 * @returns {Promise}
 */
export function cancelAtlasTop(params) {
    let url = '/v1/user/web/atlas/top/setNo';
    return postHttpAuth(url, params);
}

/**
 * GET
 * 系统图集(全部)
 * @returns {Promise}
 */
export function getAllAtlasCategory() {
    let url = '/v1/atlas/all';
    return getHttpAuth(url);
}

/**
 * GET
 * 系统图集(分页)
 * /v1/atlas
 * @param params
 * @returns {Promise}
 */
export function getAtlas(params) {
    let url = '/v1/atlas';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 系统图集抓取发布
 * @param body
 * @returns {Promise}
 * /v1/user/web/article/release
 */
export function setAtlasRelease(body) {
    let url = '/v1/user/web/atlas/release';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 系统图集抓取发布
 * @param body
 * @returns {Promise}
 * /v1/user/web/article/release
 */
export function materialUpload(body) {
    let url = '/v1/user/material/upload';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 系统图集分类列表（所有）
 * @returns {Promise}
 */
export function getAllAtlas() {
    let url = '/v1/user/web/atlas/category/all';
    return getHttpAuth(url);
}

/**
 * POST
 * 系统图集分类（栏目）创建
 * @param body
 * @returns {Promise}
 */
export function createAtlasCategory(body) {
    let url = '/v1/user/web/atlas/category/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 系统图集分类(栏目)列表
 * @returns {Promise}
 */
export function getAtlasCategoryDetail(params) {
    let url = '/v1/user/web/atlas/category/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 系统图集分类更新
 * @param body
 * @returns {Promise}
 */
export function updateAtlasCategory(body) {
    let url = '/v1/user/web/atlas/category/update';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点文章分类删除
 * @param body
 * @returns {Promise}
 */
export function deleteAtlasCategory(body) {
    let url = '/v1/user/web/atlas/category/delete';
    return postHttpAuth(url, body);
}