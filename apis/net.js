import { getHttp, getHttpAuth, postHttp, postHttpAuth } from "./baseHttp";

/**
 * POST请求
 * 用户登录  获取身份令牌
 * email  :邮箱
 * password  ：密码
 * @returns {Promise}
 */
export function login(email, password) {
    let url = '/v1/user/token';
    let body = {
        'email': email,
        'password': password
    }
    return postHttp(url, body);
}

/**
 * POST请求
 * 用户注册  获取身份令牌
 * email  :邮箱
 * password  ：密码
 * @returns {Promise}
 */
export function register(nickName, email, password) {
    let url = '/v1/user/register';
    let body = {
        'name': nickName,
        'email': email,
        'password': password
    }
    return postHttp(url, body);
}

/**
 * POST
 * 发送用户激活邮件
 * @returns {Promise}
 */
export function sendActivateMail() {
    let url = '/v1/user/mail/sendActivate';
    return postHttpAuth(url);
}

/**
 * POST
 * 激活页面--激活邮箱账号
 * @returns {Promise}
 */
export function activate(token) {
    let url = '/v1/user/activate/fromMail';
    let body = {
        token: token
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 用户忘记密码发送重置密码邮件
 * @param email 邮件地址
 * @returns {Promise}
 */
export function sendResetMail(email) {
    let url = '/v1/user/mail/sendReset';
    let body = {
        email: email
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 验证链接是否失效
 * @param body
 * @returns {Promise}
 */
export function checkToken(body) {
    let url = '/v1/user/password/checkingToken';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 重置密码
 * @param body {token 重置密码令牌， password 新密码 ，confirm_password 确认新密码}
 * @returns {Promise}
 */
export function resetPwd(body) {
    let url = '/v1/user/password/resetFromToken';
    return postHttpAuth(url, body);
}

/**
 *GET请求
 * 获取个人资料
 * @returns {Promise}
 */
export function getProfile() {
    let url = '/v1/user/profile';
    return getHttpAuth(url);
}

/**
 *GET请求
 * 所有公开站群列表
 */
// export function publicGroup() {
//   let url = '/v1/user/group/public';
//   return getHttpAuth(url);
// }

/**
 * POST
 * 用户登录成功后，重置密码
 * @param body
 * @returns {Promise}
 */
export function updatePwd(body) {
    let url = '/v1/user/password/resetFromOld';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 更新用户个人信息
 * @param body
 * @returns {Promise}
 */
export function updateUserInfo(body) {
    let url = '/v1/user/update';
    return postHttpAuth(url, body);
}

/**
 * GET请求
 * 用户拥有的站群列表
 * @returns {Promise}
 */
export function getPrivateGroupList() {
    let url = '/v1/user/group/own';
    return getHttpAuth(url);
}

/**
 * 获取招募令列表
 * @returns {Promise}
 */
export function getRecruitList(params) {
    let url = '/v1/user/group/invite';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 获取站群招募令详情
 * @param ID 站群id
 * @returns {Promise}
 */
export function getGroupRecruitDetail(ID) {
    let url = '/v1/user/group/detail/fromId';
    let params = {
        id: ID
    };
    return getHttpAuth(url, params);
}

/**
 * POST
 * 创建站群提问（留言）
 * @param params{group_id 站群ID,content 提问（留言）内容}
 * @returns {Promise}
 */
export function leaveComments(body) {
    let url = '/v1/user/group/question/create';
    return postHttpAuth(url, body);
}

/**
 *  GET
 *  站群招募令详情留言回复列表
 * @param ID 站群Id
 * @returns {Promise}
 */
export function getAllComment(ID, page = 1) {
    let url = '/v1/user/group/question/fromId';
    let params = {
        group_id: ID,
        page: page
    };
    return getHttpAuth(url, params);
}

/**GET请求
 * 根据站群标志检索站群
 * @param identify  站群标志
 * @returns {Promise}
 */
export function queryGroup(identify) {
    let url = '/v1/user/group/fromIdentify';
    let params = {
        identify: identify
    };
    return getHttpAuth(url, params);
}


/**
 * POST请求
 * 申请创建站群
 * @returns {Promise}
 */
export function createGroup(formData) {
    let url = '/v1/user/group/create';
    return postHttpAuth(url, formData);
}
/**
 * POST
 * 根据站群id申请加入群组
 * @returns {Promise}
 */
export function joinGroup(body) {
    let url = '/v1/user/group/join/fromId';
    return postHttpAuth(url, body);
}

/**
 * 获取用户的通知消息
 * @returns {Promise}
 */
export function getUserNotice(params) {
    let url = '/v1/user/notice';
    return getHttpAuth(url, params);
}

/**GET
 * 获取站群审核通过的成员列表
 * @returns {Promise}
 */
export function getGroupMemberList(params = {}) {
    let url = '/v1/user/group/user/normal';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 已加入站点的站群成员
 * @param params
 * @returns {Promise}
 */
export function getSiteMembers(params) {
    let url = '/v1/user/group/web/user';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 批量添加站点成员
 * @param body
 * @returns {Promise}
 */
export function updateSiteMembers(body) {
    let url = '/v1/user/group/web/user/join/fromBatch';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 批量删除站点成员
 * @param body
 * @returns {Promise}
 */
export function removeSiteMembers(body) {
    let url = '/v1/user/group/web/user/remove/fromBatch';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 查看站群成员规则
 * @param body
 * @returns {Promise}
 */
export function getUserRuleDetail(body) {
    let url = '/v1/user/group/user/rule/detail';
    return getHttpAuth(url, body);
}

/**
 * GET
 * 站群成员资料详情
 * @param params
 * @returns {Promise}
 */
export function getUserInfoDetail(params) {
    let url = '/v1/user/group/user/detail';
    return getHttpAuth(url, params);
}
/**
 * POST
 * 设置站群成员规则
 * @param body
 * @returns {Promise}
 */
export function updateUserRuleDetail(body) {
    let url = '/v1/user/group/user/rule/update';
    return postHttpAuth(url, body);
}
/**
 * POST
 * 移出站群成员
 * @param user_id 成员id
 * @returns {Promise}
 */
export function removeMember(user_id) {
    let url = '/v1/user/group/user/remove';
    let body = {
        user_id: user_id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 转让站群群主
 * @param user_id 成员id
 * @returns {Promise}
 */
export function transferMaster(user_id) {
    let url = '/v1/user/group/user/transferMaster';
    let body = {
        user_id: user_id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 设置站群管理员
 * @param user_id 成员id
 * @returns {Promise}
 */
export function setAdmin(user_id) {
    let url = '/v1/user/group/user/role/setAdmin';
    let body = {
        user_id: user_id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 取消站群管理员权限
 * @param user_id  成员id
 * @returns {Promise}
 */
export function setUser(user_id) {
    let url = '/v1/user/group/user/role/setUser';
    let body = {
        user_id: user_id
    };
    return postHttpAuth(url, body);
}

/**
 * GET
 * 获取站群操作记录
 * @returns {Promise}
 */
export function getGoupLog(params) {
    let url = '/v1/user/group/log';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 成员的站群操作日志
 * @param params
 * @returns {Promise}
 */
export function getPrivateGoupLog(params) {
    let url = '/v1/user/group/user/log';
    return getHttpAuth(url, params);
}
/**GET
 * 站群配置  获取站群基本信息（根据token,用户已进入站群）
 * @returns {Promise}
 */
export function getGroupBaseInfo() {
    let url = '/v1/user/group/detail/fromToken';
    return getHttpAuth(url);
}

/**
 * POST
 * 站群信息更新
 * @param body
 * @returns {Promise}
 */
export function updateGroupBaseInfo(body) {
    let url = '/v1/user/group/update';
    return postHttpAuth(url, body)
}

/**GET
 * 获取站群规则配置信息
 * @returns {Promise}
 */
export function getGroupRule() {
    let url = '/v1/user/group/rule/detail';
    return getHttpAuth(url);
}

/**
 * POST
 * 站群规则修改
 * @param body
 * @returns {Promise}
 */
export function updataGroupRule(body) {
    let url = '/v1/user/group/rule/update';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 获取站群招募令信息
 * @returns {Promise}
 */
export function getGroupRecruit() {
    let url = '/v1/user/group/invite/detail';
    return getHttpAuth(url);
}

/**
 * POST
 * 更新站群招募令信息
 * @param body
 * @returns {Promise}
 */
export function updateGroupRecruit(body) {
    let url = '/v1/user/group/invite/update';
    return postHttpAuth(url, body)
}

/**
 * GET
 * 获取站群公告
 * @returns {Promise}
 */
export function getAnnunciateDetail() {
    let url = "/v1/user/group/annunciate/detail";
    return getHttpAuth(url);
}

/**
 * POST
 * 发布/更新站群公告
 * @param body
 * @returns {Promise}
 */
export function updateAnnunciate(body) {
    let url = '/v1/user/group/annunciate/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站群的站点列表
 * @returns {Promise}
 */
export function getGroupSiteList(params) {
    let url = '/v1/user/group/web';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 设置站群站点维护
 * @param id 站点ID
 * @returns {Promise}
 */
export function setSiteMaintain(id) {
    let url = '/v1/user/group/web/state/setMaintain';
    let body = {
        id: id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 取消站群站点维护（站群群主或管理员）
 * @param id 站点ID
 * @returns {Promise}
 */
export function activateSite(id) {
    let url = '/v1/user/group/web/state/setUnMaintain';
    let body = {
        id: id
    };
    return postHttpAuth(url, body);
}

/**GET
 * 获取站点类型列表
 * @returns {Promise}
 */
export function getSiteType() {
    let url = '/v1/user/web/type';
    return getHttpAuth(url);
}

/**
 * GET
 * 站群审核中的成员列表
 * @returns {Promise}
 */
export function getAuditMemberList(page = 1) {
    let url = '/v1/user/group/user/audit';
    let params = {
        page: page,
        per_page: 19
    };
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站群成员通过
 * @param body{user_id : 成员id，join_web:加入站点数组}
 * @returns {Promise}
 */
export function passMemberAudit(body) {
    let url = '/v1/user/group/user/state/setPass';
    return postHttpAuth(url, body);
}

/**POST
 *站群成员拒绝
 * @param body {user_id:成员id,reason_refuse	:拒绝理由}
 * @returns {Promise}
 */
export function refuseMemberJoin(body) {
    let url = '/v1/user/group/user/state/setRefuse';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站群审核中的站点列表
 * @param page
 * @returns {Promise}
 */
export function getAuditSiteList(page = 1) {
    let url = '/v1/user/group/web/audit';
    let params = {
        page: page,
        per_page: 19
    };
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点审核通过
 * @param id 站点ID
 * @returns {Promise}
 */
export function passSiteAudit(id) {
    let url = '/v1/user/group/web/state/setPass';
    let body = {
        id: id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 站点审核不通过
 * @param body {id:站点ID,reason_refuse	:拒绝理由}
 * @returns {Promise}
 */
export function refuseSiteAudit(body) {
    let url = '/v1/user/group/web/state/setRefuse';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站群通过的站点列表
 * @returns {Promise}
 */
export function getGroupNormalSite(params) {
    let url = '/v1/user/group/web/normal';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 站群留言管理
 * @returns {Promise}
 */
export function getGroupQuestionList(params) {
    let url = '/v1/user/group/question/fromToken';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 回答站群提问
 * @param body
 * @returns {Promise}
 */
export function replyGroupQuestion(body) {
    let url = '/v1/user/group/question/answer/create';
    return postHttpAuth(url, body);
}

/**
 * POST
 * 更新对站群提问的答复
 * @param body
 * @returns {Promise}
 */
export function updateReplyGroupQuestion(body) {
    let url = '/v1/user/group/question/answer/update';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站群成员管理的站点列表
 * @param params{name 站点名称 ,type 类型 1= 开奖网 2=部落 3=资讯网 4=导航网  ,state 状态 0=正常 1=待审 2=维护 3=拒绝}
 * @returns {Promise}
 */
export function getPrivateSite(params) {
    let url = '/v1/user/group/user/web/own';
    return getHttpAuth(url, params);
}
/**
 * POST
 * 设置站群站点维护（站点管理员）
 * @param id 站点ID
 * @returns {Promise}
 */
export function setPrivateSiteMaintain(id) {
    let url = '/v1/user/group/user/web/state/setMaintain';
    let body = {
        id: id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 取消站群站点维护（站点管理员）
 * @param id 站点ID
 * @returns {Promise}
 */
export function activatePrivateSite(id) {
    let url = '/v1/user/group/user/web/state/setUnMaintain';
    let body = {
        id: id
    };
    return postHttpAuth(url, body);
}

/**
 * POST
 * 申请创建站点
 * @param body 站点配置信息
 * @returns {Promise}
 */
export function createSite(body) {
    let url = '/v1/user/web/create';
    return postHttpAuth(url, body);
}
/**
 * GET
 * 获取用户建站记录
 * @returns {Promise}
 */
export function getUserSiteRecord(params) {
    let url = '/v1/user/group/user/web';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 加入站群申请列表
 * @returns {Promise}
 */
export function getJoinApplyingList() {
    let url = '/v1/user/applying/join';
    return getHttpAuth(url);
}

/**
 * GET
 * 创建站群申请列表
 * @returns {Promise}
 */
export function getGroupApplyingList() {
    let url = '/v1/user/applying/group';
    return getHttpAuth(url);
}

/**
 * GET
 * 获取站点类型模板
 * @param params
 * @returns {Promise}
 */
export function getTempletList(params) {
    let url = '/v1/user/web/template';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 站群站点PV统计
 * @param body
 * @returns {Promise}
 */
export function getTargetSiteStatistics(body) {
    let url = '/v1/user/group/web/pv/statistics';
    return getHttpAuth(url, body);
}

/**
 *  GET
 * 站群成员站点PV统计（成员端）
 * @param body
 * @returns {Promise}
 */
export function getPrivateTargetSiteStatistics(body) {
    let url = '/v1/user/group/user/web/pv/statistics';
    return getHttpAuth(url, body);
}

/**
 *  GET
 * 站群统计
 * @returns {Promise}
 */
export function getGroupSatistics() {
    let url = '/v1/user/group/statistics';
    return getHttpAuth(url);
}

/**
 * GET
 * 用户通知消息未读数量
 * @returns {Promise}
 */
export function getUnreadInfoCount() {
    let url = '/v1/user/notice/count/unread';
    return getHttpAuth(url);
}

/**
 * GET
 * 系统常见问题分类
 * @returns {Promise}
 */
export function getPlatformHelpColumn(params) {
    let url = '/v1/faq/category/all';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 系统所有常见问题
 * @param params
 * @returns {Promise}
 */
export function getPlatformHelpItems(params) {
    let url = '/v1/faq/all';
    return getHttpAuth(url, params);
}

/**
 * GET
 * 系统站点案例
 * @returns {Promise}
 */
export function getPlatformAllCase() {
    let url = '/v1/case';
    return getHttpAuth(url);
}

/**
 * GET
 * 站点基本信息--详情（站群页面操作）
 * @param params
 * @returns {Promise}
 */
export function getSiteDetail(params) {
    let url = '/v1/user/group/web/detail';
    return getHttpAuth(url, params);
}

/**
 * POST
 * 站点基本信息--更新(站群页面操作)
 * @param body
 * @returns {Promise}
 */
export function updateSiteDetail(body) {
    let url = '/v1/user/group/web/update';
    return postHttpAuth(url, body);
}

// /**
//  * GET
//  * 用户管理的所有站点
//  * @returns {Promise}
//  */
// export function getAllSiteList() {
//   let url = '/v1/user/web/own';
//   return getHttpAuth(url);
// }

/**
 * GET
 * 站群(管理员、群主)的站点列表(不分页)
 * @returns {Promise}
 */
export function getGroupAllSiteList() {
    let url = '/v1/user/group/web/all';
    return getHttpAuth(url);
}

/**
 * GET
 * 站群成员管理的站点列表(不分页)
 * @returns {Promise}
 */
export function getPrivateAllSiteList() {
    let url = '/v1/user/group/user/web/own/all';
    return getHttpAuth(url);
}

/**
 * POST
 * 刷新身份令牌（用旧Token换取新token）
 * @param params
 * @returns {Promise}
 */
export function refreshToken(params) {
    let url = '/v1/user/token/refresh';
    return postHttpAuth(url, params);
}

/**
 * GET
 * 邮箱服务登录地址
 * @param params
 * @returns {Promise}
 */
export function getMailUrl(params) {
    let url = '/v1/user/mail/service';
    return getHttpAuth(url, params);
}

/**GET
 * 获取可用站点类型列表
 * @returns {Promise}
 */
export function getUseSiteType() {
    let url = '/v1/user/group/site-type';
    return getHttpAuth(url);
}

/**
 * GET
 * 备用域名列表
 * /v1/user/group/web/domain
 * @param params
 * @returns {Promise}
 */
export function getDomainNameList(params) {
    let url = '/v1/user/group/web/domain';
    return getHttpAuth(url, params);
}

/**
* POST
* 友链创建
*备用域名创建
*  /v1/user/group/web/domain/create
* @param body
* @returns {Promise}
*/
export function createDomainName(body) {
    let url = '/v1/user/group/web/domain/create';
    return postHttpAuth(url, body);
}

/**
 * GET
 * 站群数据统计
 * /v1/user/group/web/pv/webs
 * @param params
 * @returns {Promise}
 */
export function getDataStatistics(params) {
    let url = '/v1/user/group/web/pv/webs';
    return getHttpAuth(url, params);
}

/**
* POST
* 友链创建
*备用域名修改
*  /v1/user/group/web/domain/update
* @param body
* @returns {Promise}
*/
export function createDomainNameUpdate(body) {
    let url = '/v1/user/group/web/domain/update';
    return postHttpAuth(url, body);
}

/**
* POST
*设置站群站点加入回收站
*  /v1/user/group/web/state/setRecycle
* @param body
* @returns {Promise}
*/
export function updateRecycle(body) {
    let url = '/v1/user/group/web/state/setRecycle';
    return postHttpAuth(url, body);
}

/**
* POST
*设置站群站点移除回收站
*  /v1/user/group/web/state/setUnRecycle
* @param body
* @returns {Promise}
*/
export function deleteRecycle(body) {
    let url = '/v1/user/group/web/state/setUnRecycle';
    return postHttpAuth(url, body);
}


/**
* GET
* 可选择作为主站的列表
* /v1/user/group/web/synchronization/mainWebs
* @returns {Promise}
*/
export function getSynchroMainWebs(params) {
    let url = '/v1/user/group/web/synchronization/mainWebs';
    return getHttpAuth(url, params);
}

/**
* GET
* 可选择作为主站的列表
* /v1/user/group/web/synchronization/mainWebs
* @returns {Promise}
*/
export function getSynchroSubsidiaryWebs(params) {
    let url = '/v1/user/group/web/synchronization/subsidiaryWebs';
    return getHttpAuth(url, params);
}

/**
* GET
*系统站点类型
* /v1/user/group/web/synchronization/mainWebs
* @returns {Promise}
*/
export function getWebsiteType(params) {
    let url = '/v1/type';
    return getHttpAuth(url, params);
}

/**
* POST
* 友链创建
*新增副站
*  /v1/user/group/web/domain/update
* @param body
* @returns {Promise}
*/
export function createSynchronization(body) {
    let url = '/v1/user/group/web/synchronization/update';
    return postHttpAuth(url, body);
}

/**
* GET
*主副站列表
* /v1/user/group/web/synchronization/mainWebs
* @returns {Promise}
*/
export function getWebSynchron(params) {
    let url = '/v1/user/group/web/synchronization';
    return getHttpAuth(url, params);
}


/**
* POST
* 移除副站
*新增副站
*  /v1/user/group/web/domain/update
* @param body
* @returns {Promise}
*/
export function removeSynchronization(body) {
    let url = '/v1/user/group/web/synchronization/remove';
    return postHttpAuth(url, body);
}
