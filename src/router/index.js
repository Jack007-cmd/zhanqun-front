import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const NotFound = () =>
    import ('@/components/NotFound.vue');
const PlatformIntroduce = () =>
    import ('@/components/paltform/PlatformIntroduce.vue');
const PlatformCase = () =>
    import ('@/components/paltform/PlatformCase.vue');
const PlatformHelp = () =>
    import ('@/components/paltform/PlatformHelp.vue');
const PlatformAboutUs = () =>
    import ('@/components/paltform/PlatformAboutUs.vue');
const RegisteMail = () =>
    import ('@/components/RegisteMail.vue');
const RegisteActivate = () =>
    import ('@/components/RegisteActivate.vue');
const ResetMail = () =>
    import ('@/components/ResetMail.vue');
const ResetActivate = () =>
    import ('@/components/ResetActivate.vue');
const Dashboard = () =>
    import ('@/components/Dashboard.vue');
const Info = () =>
    import ('@/components/dashboard/Info.vue');
const Home = () =>
    import ('@/components/dashboard/Home.vue');
const SiteRecord = () =>
    import ('@/components/dashboard/SiteRecord.vue');
const ApplicationRecord = () =>
    import ('@/components/dashboard/ApplicationRecord.vue');
const RecruitList = () =>
    import ('@/components/dashboard/recruit/RecruitList.vue');
const RecruitDetail = () =>
    import ('@/components/dashboard/recruit/RecruitDetail.vue');
const MyGroup = () =>
    import ('@/components/dashboard/MyGroup.vue');
const DataCenter = () =>
    import ('@/components/dashboard/mygroup/DataCenter.vue');
const DataStatistics = () =>
    import ('@/components/dashboard/mygroup/DataStatistics.vue');
const AuditCenter = () =>
    import ('@/components/dashboard/mygroup/AuditCenter.vue');
const MemberManage = () =>
    import ('@/components/dashboard/mygroup/MemberManage.vue');
const SiteManage = () =>
    import ('@/components/dashboard/mygroup/SiteManage.vue');
const synchroManage = () =>
    import ('@/components/dashboard/mygroup/synchroManage.vue');
const DomainNameManage = () =>
    import ('@/components/dashboard/mygroup/DomainNameManage.vue');
const CreateSite = () =>
    import ('@/components/dashboard/mygroup/CreateSite.vue');
const UpdateSite = () =>
    import ('@/components/dashboard/mygroup/UpdateSite.vue');
const CreateSiteSuccess = () =>
    import ('@/components/dashboard/mygroup/Success.vue');
const PrivateSiteManage = () =>
    import ('@/components/dashboard/mygroup/PrivateSiteManage.vue');
const PrivateDataCenter = () =>
    import ('@/components/dashboard/mygroup/PrivateDataCenter.vue');
const MessageManage = () =>
    import ('@/components/dashboard/mygroup/MessageManage.vue');
const OperationRecord = () =>
    import ('@/components/dashboard/mygroup/OperationRecord.vue');
const StationGroupConfig = () =>
    import ('@/components/dashboard/mygroup/StationGroupConfig.vue');
const RecycleBin = () =>
    import ('@/components/dashboard/mygroup/RecycleBin.vue');
const SideNav = () =>
    import ('@/components/dashboard/SideNav.vue');
/*访客分析*/
const VisitOfSource = () =>
    import ('@/components/dashboard/site/visitorAnalysis/VisitOfSource.vue');
const AccessData = () =>
    import ('@/components/dashboard/site/visitorAnalysis/AccessData.vue');
/*文章抓取*/
const articleCrawl = () =>
    import ('@/components/dashboard/site/articleCrawl/articleCrawl.vue');
/*导航网子栏目组件*/
const BasicInfoManage = () =>
    import ('@/components/dashboard/site/navwebsite/BasicInfoManage.vue');
const AdManage = () =>
    import ('@/components/dashboard/site/navwebsite/AdManage.vue');
const EditAd = () =>
    import ('@/components/dashboard/site/navwebsite/EditAd.vue');
const NavSortManage = () =>
    import ('@/components/dashboard/site/navwebsite/NavSortManage.vue');
const EditSort = () =>
    import ('@/components/dashboard/site/navwebsite/EditSort.vue');
const WebsiteList = () =>
    import ('@/components/dashboard/site/navwebsite/WebsiteList.vue');
const EditWebsite = () =>
    import ('@/components/dashboard/site/navwebsite/EditWebsite.vue');
const CustomerService = () =>
    import ('@/components/dashboard/site/navwebsite/CustomerService.vue');
const EditService = () =>
    import ('@/components/dashboard/site/navwebsite/EditService.vue');
const ChainManage = () =>
    import ('@/components/dashboard/site/navwebsite/ChainManage.vue');
const EditChain = () =>
    import ('@/components/dashboard/site/navwebsite/EditChain.vue');
const ArticleList = () =>
    import ('@/components/dashboard/site/navwebsite/ArticleList.vue');
const EditArticle = () =>
    import ('@/components/dashboard/site/navwebsite/EditArticle.vue');
const ColumnManage = () =>
    import ('@/components/dashboard/site/navwebsite/ColumnManage.vue');
const EditColumn = () =>
    import ('@/components/dashboard/site/navwebsite/EditColumn.vue');
const KeywordReplace = () =>
    import ('@/components/dashboard/site/navwebsite/KeywordReplace.vue');
const LabelManage = () =>
    import ('@/components/dashboard/site/navwebsite/LabelManage.vue');
const LeafManage = () =>
    import ('@/components/dashboard/site/navwebsite/LeafManage.vue');
const EditLeaf = () =>
    import ('@/components/dashboard/site/navwebsite/EditLeaf.vue');
/*博客子栏目组件*/
const BlogBasicInfoManage = () =>
    import ('@/components/dashboard/site/blog/BlogBasicInfoManage.vue');
const BlogNavManage = () =>
    import ('@/components/dashboard/site/blog/BlogNavManage.vue');
const BlogEditNav = () =>
    import ('@/components/dashboard/site/blog/BlogEditNav.vue');
const BlogArticleList = () =>
    import ('@/components/dashboard/site/blog/BlogArticleList.vue');
const BlogEditArticle = () =>
    import ('@/components/dashboard/site/blog/BlogEditArticle.vue');
const BlogColumnManage = () =>
    import ('@/components/dashboard/site/blog/BlogColumnManage.vue');
const BlogEditColumn = () =>
    import ('@/components/dashboard/site/blog/BlogEditColumn.vue');
const BlogKeywordReplace = () =>
    import ('@/components/dashboard/site/blog/BlogKeywordReplace.vue');
const BlogUserList = () =>
    import ('@/components/dashboard/site/blog/BlogUserList.vue');
const BlogUserArticle = () =>
    import ('@/components/dashboard/site/blog/BlogUserArticle.vue');
const BlogChainManage = () =>
    import ('@/components/dashboard/site/blog/BlogChainManage.vue');
const BlogEditChain = () =>
    import ('@/components/dashboard/site/blog/BlogEditChain.vue');
const BlogArticlePreview = () =>
    import ('@/components/dashboard/site/blog/BlogArticlePreview.vue');
const BlogLabelManage = () =>
    import ('@/components/dashboard/site/blog/BlogLabelManage.vue');
const BlogLeafManage = () =>
    import ('@/components/dashboard/site/blog/BlogLeafManage.vue');
const BlogSlidesEdit = () =>
    import ('@/components/dashboard/site/blog/BlogSlidesEdit.vue');
const BlogSlideshow = () =>
    import ('@/components/dashboard/site/blog/BlogSlideshow.vue');
const BlogEditLeaf = () =>
    import ('@/components/dashboard/site/blog/BlogEditLeaf.vue');
/*香港彩子栏目组件*/
const HkBasicInfo = () =>
    import ('@/components/dashboard/site/hkwebsite/HkBasicInfo.vue');
const HkNavManage = () =>
    import ('@/components/dashboard/site/hkwebsite/HkNavManage.vue');
const HkHfManage = () =>
    import ('@/components/dashboard/site/hkwebsite/HkHfManage.vue');
const HkNavAdd = () =>
    import ('@/components/dashboard/site/hkwebsite/HkNavAdd.vue');
const HkHfAdd = () =>
    import ('@/components/dashboard/site/hkwebsite/HkHfAdd.vue');
const HkArticleList = () =>
    import ('@/components/dashboard/site/hkwebsite/HkArticleList.vue');
const HkColumnManage = () =>
    import ('@/components/dashboard/site/hkwebsite/HkColumnManage.vue');
const HkColumnEdit = () =>
    import ('@/components/dashboard/site/hkwebsite/HkColumnEdit.vue');
const HkLabelManage = () =>
    import ('@/components/dashboard/site/hkwebsite/HkLabelManage.vue');
const HkAdManage = () =>
    import ('@/components/dashboard/site/hkwebsite/HkAdManage.vue');
const HkMessageBack = () =>
    import ('@/components/dashboard/site/hkwebsite/HkMessageBack.vue');
const HkArticleAdd = () =>
    import ('@/components/dashboard/site/hkwebsite/HkArticleAdd.vue');
const HkAdEdit = () =>
    import ('@/components/dashboard/site/hkwebsite/HkAdEdit.vue');
const HkSlideEdit = () =>
    import ('@/components/dashboard/site/hkwebsite/HkSlideEdit.vue');
const HkSlideShow = () =>
    import ('@/components/dashboard/site/hkwebsite/HkSlideShow.vue');
const HkLeafManage = () =>
    import ('@/components/dashboard/site/hkwebsite/HkLeafManage.vue');
const HkLeafEdit = () =>
    import ('@/components/dashboard/site/hkwebsite/HkLeafEdit.vue');
/*开奖网子栏目组件*/
const LotteryBasicInfo = () =>
    import ('@/components/dashboard/site/lottery/LotteryBasicInfo.vue');
const LotteryMainManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryMainManage.vue');
const LotteryTagManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryTagManage.vue');
//香港彩六合彩调试
const LotterySixColors = () =>
    import ('@/components/dashboard/site/lottery/LotterySixColors.vue');
const LotteryExpertConfig = () =>
    import ('@/components/dashboard/site/lottery/LotteryExpertConfig.vue');
const LotteryPlanConfig = () =>
    import ('@/components/dashboard/site/lottery/LotteryPlanConfig.vue');
const LotteryHeadManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryHeadManage.vue');
const LotteryFooterManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryFooterManage.vue');
const LotteryNavAdd = () =>
    import ('@/components/dashboard/site/lottery/LotteryNavAdd.vue');
const LotteryArticleList = () =>
    import ('@/components/dashboard/site/lottery/LotteryArticleList.vue');
const LotteryArticleAdd = () =>
    import ('@/components/dashboard/site/lottery/LotteryArticleAdd.vue');
const LotteryColumnManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryColumnManage.vue');
const LotteryColumnEdit = () =>
    import ('@/components/dashboard/site/lottery/LotteryColumnEdit.vue');
const LotteryLabelManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryLabelManage.vue');
const LotteryKeywordReplace = () =>
    import ('@/components/dashboard/site/lottery/LotteryKeywordReplace.vue');
const LotteryAdManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryAdManage.vue');
const LotterySlideshow = () =>
    import ('@/components/dashboard/site/lottery/LotterySlideshow.vue');
const LotteryChainManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryChainManage.vue');
const LotterySlidesEdit = () =>
    import ('@/components/dashboard/site/lottery/LotterySlidesEdit.vue');
const LotteryChainEdit = () =>
    import ('@/components/dashboard/site/lottery/LotteryChainEdit.vue');
const LotteryMessageBack = () =>
    import ('@/components/dashboard/site/lottery/LotteryMessageBack.vue');
const LotteryAdEdit = () =>
    import ('@/components/dashboard/site/lottery/LotteryAdEdit.vue');
const LotteryLeafManage = () =>
    import ('@/components/dashboard/site/lottery/LotteryLeafManage.vue');
const LotteryLeafEdit = () =>
    import ('@/components/dashboard/site/lottery/LotteryLeafEdit.vue');
const LotterySeoConfig = () =>
    import ('@/components/dashboard/site/lottery/LotterySeoConfig.vue');
const lotterySeoconfigAdd = () =>
    import ('@/components/dashboard/site/lottery/lotterySeoconfigAdd.vue');
/*资讯子栏目组件*/
const NewsBasicInfo = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsBasicInfo.vue');
const NewsNavManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsNavManage.vue');
const NewsCathetManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsCathetManage.vue');    
const NewsArticleList = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsArticleList.vue');
const NewsArticleAdd = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsArticleAdd.vue');
const NewsEditNav = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditNav.vue');
const NewsSortManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsSortManage.vue');
const NewsEditSort = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditSort.vue');
const NewsAdManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsAdManage.vue');
const NewsEditAd = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditAd.vue');
const NewsNavSortManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsNavSortManage.vue');
const NewsNavEditSort = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditNavSort.vue');
const NewsWebsiteList = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsWebsiteList.vue');
const NewsEditWebsite = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditWebsite.vue');
const NewsCustomerService = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsCustomerService.vue');
const NewsEditService = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditService.vue');
const NewsChainManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsChainManage.vue');
const NewsEditChain = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditChain.vue');
const NewsBrowserList = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsBrowserList.vue');
const NewsEditBrowser = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditBrowser.vue');
const NewsFeedback = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsFeedback.vue');
const NewsMessageManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsMessageManage.vue');
const NewsInclusion = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsInclusion.vue');
const NewsColumnManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsColumnManage.vue');
const NewsEditColumn = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditColumn.vue');
const NewsDividendList = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsDividendList.vue');
const NewsEditDividend = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsEditDividend.vue');
const NewsDividendSortManage = () =>
    import ('@/components/dashboard/site/newsWebsite/NewsDividendSortManage.vue');
/*行业新闻子栏目组件*/
const TradeBasicInfo = () =>
    import ('@/components/dashboard/site/tradeNews/TradeBasicInfo.vue');
const TradeHeadManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeHeadManage.vue');
const TradeFooterManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeFooterManage.vue');
const TradeCathetManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeCathetManage.vue');
const TradeNavAdd = () =>
    import ('@/components/dashboard/site/tradeNews/TradeNavAdd.vue');
const TradeArticleList = () =>
    import ('@/components/dashboard/site/tradeNews/TradeArticleList.vue');
const TradeArticleAdd = () =>
    import ('@/components/dashboard/site/tradeNews/TradeArticleAdd.vue');
const TradeColumnManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeColumnManage.vue');
const TradeColumnEdit = () =>
    import ('@/components/dashboard/site/tradeNews/TradeColumnEdit.vue');
const TradeLabelManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeLabelManage.vue');
const TradeKeywordReplace = () =>
    import ('@/components/dashboard/site/tradeNews/TradeKeywordReplace.vue');
const TradeLeafManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeLeafManage.vue');
const TradeLeafEdit = () =>
    import ('@/components/dashboard/site/tradeNews/TradeLeafEdit.vue');
const TradeAdManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeAdManage.vue');
const TradeChainManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeChainManage.vue');
const TradeChainEdit = () =>
    import ('@/components/dashboard/site/tradeNews/TradeChainEdit.vue');
const TradeMessageBack = () =>
    import ('@/components/dashboard/site/tradeNews/TradeMessageBack.vue');
const TradeAdEdit = () =>
    import ('@/components/dashboard/site/tradeNews/TradeAdEdit.vue');
const TradeCommentManage = () =>
    import ('@/components/dashboard/site/tradeNews/TradeCommentManage.vue');
/*登录口子栏目组件*/
const LeafBasicInfo = () =>
    import ('@/components/dashboard/site/leaf/LeafBasicInfo.vue');
const LeafArticleList = () =>
    import ('@/components/dashboard/site/leaf/LeafArticleList.vue');
const LeafEditArticle = () =>
    import ('@/components/dashboard/site/leaf/LeafEditArticle.vue');
const LeafChainManage = () =>
    import ('@/components/dashboard/site/leaf/LeafChainManage.vue');
const LeafEditChain = () =>
    import ('@/components/dashboard/site/leaf/LeafEditChain.vue');
const LeafKeywordReplace = () =>
    import ('@/components/dashboard/site/leaf/LeafKeywordReplace.vue');
const LeafLabelManage = () =>
    import ('@/components/dashboard/site/leaf/LeafLabelManage.vue');
const LeafColumnManage = () =>
    import ('@/components/dashboard/site/leaf/LeafColumnManage.vue');

/*自定义子栏目组件*/
const CustomBasicInfo = () =>
    import ('@/components/dashboard/site/custom/CustomBasicInfo.vue');
const CustomFileManage = () =>
    import ('@/components/dashboard/site/custom/CustomFileManage.vue');
const CustomFileUpdate = () =>
    import ('@/components/dashboard/site/custom/CustomFileUpdate.vue');

/*企业网子栏目组件*/
const CompanyBasicInfo = () =>
    import ('@/components/dashboard/site/company/CompanyBasicInfo.vue');
const CompanyNavManage = () =>
    import ('@/components/dashboard/site/company/CompanyNavManage.vue');
const CompanyFooterManage = () =>
    import ('@/components/dashboard/site/company/CompanyFooterManage.vue');
const CompanyNavAdd = () =>
    import ('@/components/dashboard/site/company/CompanyNavAdd.vue');
const CompanyProductList = () =>
    import ('@/components/dashboard/site/company/CompanyProductList.vue');
const CompanyCaseList = () =>
    import ('@/components/dashboard/site/company/CompanyCaseList.vue');
const CompanyCaseAdd = () =>
    import ('@/components/dashboard/site/company/CompanyCaseAdd.vue');
const CompanySortManage = () =>
    import ('@/components/dashboard/site/company/CompanySortManage.vue');
const CompanySortAdd = () =>
    import ('@/components/dashboard/site/company/CompanySortAdd.vue');
const CompanyArticleList = () =>
    import ('@/components/dashboard/site/company/CompanyArticleList.vue');
const CompanyArticleAdd = () =>
    import ('@/components/dashboard/site/company/CompanyArticleAdd.vue');
const CompanyColumnManage = () =>
    import ('@/components/dashboard/site/company/CompanyColumnManage.vue');
const CompanyLabelManage = () =>
    import ('@/components/dashboard/site/company/CompanyLabelManage.vue');
const CompanyKeywordReplace = () =>
    import ('@/components/dashboard/site/company/CompanyKeywordReplace.vue');
const CompanyLeafManage = () =>
    import ('@/components/dashboard/site/company/CompanyLeafManage.vue');
const CompanyLeafEdit = () =>
    import ('@/components/dashboard/site/company/CompanyLeafEdit.vue');
const CompanyAdManage = () =>
    import ('@/components/dashboard/site/company/CompanyAdManage.vue');
const CompanyAdEdit = () =>
    import ('@/components/dashboard/site/company/CompanyAdEdit.vue');
const CompanySlideshow = () =>
    import ('@/components/dashboard/site/company/CompanySlideshow.vue');
const CompanySlidesEdit = () =>
    import ('@/components/dashboard/site/company/CompanySlidesEdit.vue');
const CompanyChainManage = () =>
    import ('@/components/dashboard/site/company/CompanyChainManage.vue');
const CompanyChainEdit = () =>
    import ('@/components/dashboard/site/company/CompanyChainEdit.vue');
const CompanyProductAdd = () =>
    import ('@/components/dashboard/site/company/CompanyProductAdd.vue');
/*新闻站子栏目组件*/ 
const JournalismBasicInfo = () =>
    import ('@/components/dashboard/site/journalism/JournalismBasicInfo.vue');
const JournalismHeadManage = () =>
    import ('@/components/dashboard/site/journalism/JournalismHeadManage.vue');
const JournalismCathetManage = () =>
    import ('@/components/dashboard/site/journalism/JournalismCathetManage.vue');
const JournalismNavAdd = () =>
    import ('@/components/dashboard/site/journalism/JournalismNavAdd.vue');
const JournalismArticleList = () =>
    import ('@/components/dashboard/site/journalism/JournalismArticleList.vue');
const JournalismArticleAdd = () =>
    import ('@/components/dashboard/site/journalism/JournalismArticleAdd.vue');
const JournalismColumnManage = () =>
    import ('@/components/dashboard/site/journalism/JournalismColumnManage.vue');
const JournalismColumnEdit = () =>
    import ('@/components/dashboard/site/journalism/JournalismColumnEdit.vue');
const JournalismLabelManage = () =>
    import ('@/components/dashboard/site/journalism/JournalismLabelManage.vue');
const JournalismKeywordReplace = () =>
    import ('@/components/dashboard/site/journalism/JournalismKeywordReplace.vue');
const JournalismAtlasList = () =>
    import ('@/components/dashboard/site/journalism/JournalismAtlasList.vue');
const JournalismColumuRegulate = () =>
    import ('@/components/dashboard/site/journalism/JournalismColumuRegulate.vue');
const JournalismColumuRedact = () =>
    import ('@/components/dashboard/site/journalism/JournalismColumuRedact.vue');
const JournalismAtlasAdd = () =>
    import ('@/components/dashboard/site/journalism/JournalismAtlasAdd.vue');
const JournalismAdManage = () =>
    import ('@/components/dashboard/site/journalism/JournalismAdManage.vue');
const JournalismAdEdit = () =>
    import ('@/components/dashboard/site/journalism/JournalismAdEdit.vue');
const JournalismAtlasCrawl = () =>
    import ('@/components/dashboard/site/journalism/JournalismAtlasCrawl.vue');

export default new Router({
    mode: 'history',
    routes: [{
            path: '/platform-intro',
            component: PlatformIntroduce
        },
        {
            path: '/platform-case',
            component: PlatformCase
        },
        {
            path: '/platform-help',
            component: PlatformHelp
        },
        {
            path: '/platform-about-us',
            component: PlatformAboutUs
        },
        {
            path: '/register-mail',
            component: RegisteMail
        },
        {
            path: '/register-activate',
            component: RegisteActivate
        },
        {
            path: '/reset-mail',
            component: ResetMail,
        },
        {
            path: '/reset-activate',
            component: ResetActivate,
        },

        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                role: true
            },
            children: [{
                    path: 'info',
                    component: Info,
                    meta: {
                        role: true
                    },
                },
                {
                    path: 'home',
                    component: Home,
                    meta: {
                        role: true
                    },
                },
                {
                    path: 'site-record',
                    component: SiteRecord,
                    meta: {
                        role: true
                    },
                },
                {
                    path: 'app-record',
                    component: ApplicationRecord,
                    meta: {
                        role: true
                    },
                },

                {
                    path: 'recruit-list',
                    component: RecruitList,
                    meta: {
                        role: true
                    },
                },
                {
                    path: 'recruit-detail',
                    component: RecruitDetail,
                    meta: {
                        role: true
                    },
                },
                {
                    path: 'my-group',
                    component: MyGroup,
                    meta: {
                        role: true
                    },
                    children: [{
                            path: 'data-center',
                            component: DataCenter,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'data-statistics',
                            component: DataStatistics,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'audit-center',
                            component: AuditCenter,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'member-manage',
                            component: MemberManage,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'site-manage',
                            component: SiteManage,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'synchro-manage',
                            component: synchroManage,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'domain-name-manage',
                            component: DomainNameManage,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'create-site',
                            component: CreateSite,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'update-site',
                            component: UpdateSite,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'create-site-success',
                            component: CreateSiteSuccess,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'private-site-manage',
                            component: PrivateSiteManage,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'private-data-center',
                            component: PrivateDataCenter,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'message-manage',
                            component: MessageManage,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'operation-record',
                            component: OperationRecord,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'station-group-config',
                            component: StationGroupConfig,
                            meta: {
                                role: true
                            },
                        },
                        {
                            path: 'recycle-bin',
                            component: RecycleBin,
                            meta: {
                                role: true
                            },
                        },
                    ]
                },
                {
                    path: 'site',
                    component: SideNav,
                    meta: {
                        role: true
                    },
                    children: [{
                            path: 'article-crawl',
                            component: articleCrawl
                        },
                        {
                            path: 'visit-of-source',
                            component: VisitOfSource
                        },
                        {
                            path: 'access-data',
                            component: AccessData
                        },
                        {
                            path: 'nw-basic-info',
                            component: BasicInfoManage
                        },
                        {
                            path: 'nw-ad-manage',
                            component: AdManage
                        },
                        {
                            path: 'nw-edit-ad',
                            component: EditAd
                        },
                        {
                            path: 'nw-sort-manage',
                            component: NavSortManage
                        },
                        {
                            path: 'nw-edit-sort',
                            component: EditSort
                        },
                        {
                            path: 'nw-website-list',
                            component: WebsiteList
                        },
                        {
                            path: 'nw-edit-website',
                            component: EditWebsite
                        },
                        {
                            path: 'nw-customer-service',
                            component: CustomerService
                        },
                        {
                            path: 'nw-edit-service',
                            component: EditService
                        },
                        {
                            path: 'nw-chain-manage',
                            component: ChainManage
                        },
                        {
                            path: 'nw-edit-chain',
                            component: EditChain
                        },
                        {
                            path: 'nw-article-list',
                            component: ArticleList
                        },
                        {
                            path: 'nw-edit-article',
                            component: EditArticle
                        },

                        {
                            path: 'nw-column-manage',
                            component: ColumnManage
                        },
                        {
                            path: 'nw-edit-column',
                            component: EditColumn
                        },
                        {
                            path: 'nw-keyword-replace',
                            component: KeywordReplace
                        },
                        {
                            path: 'nw-label-manage',
                            component: LabelManage
                        },
                        {
                            path: 'nw-leaf-manage',
                            component: LeafManage
                        },
                        {
                            path: 'nw-edit-leaf',
                            component: EditLeaf
                        },
                        /*香港彩子栏目组件*/
                        {
                            path: 'hk-basic-info',
                            component: HkBasicInfo
                        },
                        {
                            path: 'hk-nav-manage',
                            component: HkNavManage
                        },
                        {
                            path: 'hk-hf-manage',
                            component: HkHfManage
                        },
                        {
                            path: 'hk-article-list',
                            component: HkArticleList
                        },
                        {
                            path: 'hk-column-manage',
                            component: HkColumnManage
                        },
                        {
                            path: 'hk-column-edit',
                            component: HkColumnEdit
                        },
                        {
                            path: 'hk-label-manage',
                            component: HkLabelManage
                        },
                        {
                            path: 'hk-ad-manage',
                            component: HkAdManage
                        },
                        {
                            path: 'hk-message-back',
                            component: HkMessageBack
                        },
                        {
                            path: 'hk-nav-add',
                            component: HkNavAdd
                        },
                        {
                            path: 'hk-hf-add',
                            component: HkHfAdd
                        },
                        {
                            path: 'hk-article-add',
                            component: HkArticleAdd
                        },
                        {
                            path: 'hk-ad-edit',
                            component: HkAdEdit
                        },
                        {
                            path: 'hk-leaf-manage',
                            component: HkLeafManage
                        },
                        {
                            path: 'hk-leaf-edit',
                            component: HkLeafEdit
                        },
                        {
                            path: 'hk-slide-show',
                            component: HkSlideShow
                        },
                        {
                            path: 'hk-slide-edit',
                            component: HkSlideEdit
                        },
                        /*博客子栏目组件*/
                        {
                            path: 'blog-basic-info',
                            component: BlogBasicInfoManage
                        },
                        {
                            path: 'blog-nav-manage',
                            component: BlogNavManage
                        },
                        {
                            path: 'blog-edit-nav',
                            component: BlogEditNav
                        },
                        {
                            path: 'blog-article-list',
                            component: BlogArticleList
                        },
                        {
                            path: 'blog-edit-article',
                            component: BlogEditArticle
                        },
                        {
                            path: 'blog-column-manage',
                            component: BlogColumnManage
                        },
                        {
                            path: 'blog-edit-column',
                            component: BlogEditColumn
                        },
                        {
                            path: 'blog-keyword-replace',
                            component: BlogKeywordReplace
                        },
                        {
                            path: 'blog-user-list',
                            component: BlogUserList
                        },
                        {
                            path: 'blog-user-article',
                            component: BlogUserArticle
                        },
                        {
                            path: 'blog-article-preview',
                            component: BlogArticlePreview
                        },
                        {
                            path: 'blog-chain-manage',
                            component: BlogChainManage
                        },
                        {
                            path: 'blog-edit-chain',
                            component: BlogEditChain
                        },
                        {
                            path: 'blog-label-manage',
                            component: BlogLabelManage
                        },
                        {
                            path: 'blog-leaf-manage',
                            component: BlogLeafManage
                        },
                        {
                            path: 'blog-edit-leaf',
                            component: BlogEditLeaf
                        },
                        {
                            path: 'blog-slide-edit',
                            component: BlogSlidesEdit
                        },
                        {
                            path: 'blog-slide-show',
                            component: BlogSlideshow
                        },
                        /*开奖网子栏目组件*/
                        {
                            path: 'lottery-basic-info',
                            component: LotteryBasicInfo
                        },
                        {
                            path: 'lottery-main-manage',
                            component: LotteryMainManage
                        },
                        {
                            path: 'lottery-tag-manage',
                            component: LotteryTagManage
                        },
                        //香港彩六合彩调试
                        {
                            path: 'lottery-six-colors',
                            component: LotterySixColors
                        },
                        {
                            path: 'lottery-expert-config',
                            component: LotteryExpertConfig
                        },
                        {
                            path: 'lottery-plan-config',
                            component: LotteryPlanConfig
                        },
                        {
                            path: 'lottery-head-manage',
                            component: LotteryHeadManage
                        },
                        {
                            path: 'lottery-footer-manage',
                            component: LotteryFooterManage
                        },
                        {
                            path: 'lottery-nav-add',
                            component: LotteryNavAdd
                        },
                        {
                            path: 'lottery-article-list',
                            component: LotteryArticleList
                        },
                        {
                            path: 'lottery-article-add',
                            component: LotteryArticleAdd
                        },
                        {
                            path: 'lottery-column-manage',
                            component: LotteryColumnManage
                        },
                        {
                            path: 'lottery-column-edit',
                            component: LotteryColumnEdit
                        },
                        {
                            path: 'lottery-label-manage',
                            component: LotteryLabelManage
                        },
                        {
                            path: 'lottery-keyword-replace',
                            component: LotteryKeywordReplace
                        },
                        {
                            path: 'lottery-ad-manage',
                            component: LotteryAdManage
                        },
                        {
                            path: 'lottery-slideshow',
                            component: LotterySlideshow
                        },
                        {
                            path: 'lottery-chain-manage',
                            component: LotteryChainManage
                        },
                        {
                            path: 'lottery-slides-edit',
                            component: LotterySlidesEdit
                        },
                        {
                            path: 'lottery-chain-edit',
                            component: LotteryChainEdit
                        },
                        {
                            path: 'lottery-message-back',
                            component: LotteryMessageBack
                        },
                        {
                            path: 'lottery-ad-edit',
                            component: LotteryAdEdit
                        },
                        {
                            path: 'lottery-leaf-manage',
                            component: LotteryLeafManage
                        },
                        {
                            path: 'lottery-leaf-edit',
                            component: LotteryLeafEdit
                        },
                        {
                            path: 'lottery-seo-config',
                            component: LotterySeoConfig
                        },
                        {
                            path: 'lottery-seoconfig-add',
                            component: lotterySeoconfigAdd
                        },
                        /*资讯网子栏目组件*/
                        {
                            path: 'ns-basic-info',
                            component: NewsBasicInfo
                        },
                        {
                            path: 'ns-nav-manage',
                            component: NewsNavManage
                        },
                        {
                            path: 'ns-cathet-manage',
                            component: NewsCathetManage
                        },
                        {
                            path: 'ns-article-list',
                            component: NewsArticleList
                        },
                        {
                            path: 'ns-article-add',
                            component: NewsArticleAdd
                        },
                        {
                            path: 'ns-edit-nav',
                            component: NewsEditNav
                        },
                        {
                            path: 'ns-sort-manage',
                            component: NewsSortManage
                        },
                        {
                            path: 'ns-edit-sort',
                            component: NewsEditSort
                        },
                        {
                            path: 'ns-ad-manage',
                            component: NewsAdManage
                        },
                        {
                            path: 'ns-edit-ad',
                            component: NewsEditAd
                        },
                        {
                            path: 'ns-nav-sort-manage',
                            component: NewsNavSortManage
                        },
                        {
                            path: 'ns-nav-edit-sort',
                            component: NewsNavEditSort
                        },
                        {
                            path: 'ns-website-list',
                            component: NewsWebsiteList
                        },
                        {
                            path: 'ns-edit-website',
                            component: NewsEditWebsite
                        },
                        {
                            path: 'ns-customer-service',
                            component: NewsCustomerService
                        },
                        {
                            path: 'ns-edit-service',
                            component: NewsEditService
                        },
                        {
                            path: 'ns-chain-manage',
                            component: NewsChainManage
                        },
                        {
                            path: 'ns-edit-chain',
                            component: NewsEditChain
                        },
                        {
                            path: 'ns-browser-list',
                            component: NewsBrowserList
                        },
                        {
                            path: 'ns-edit-browser',
                            component: NewsEditBrowser
                        },
                        {
                            path: 'ns-feedback',
                            component: NewsFeedback
                        },
                        {
                            path: 'ns-msg-manage',
                            component: NewsMessageManage

                        },
                        {
                            path: 'ns-inclusion',
                            component: NewsInclusion
                        },
                        {
                            path: 'ns-column-manage',
                            component: NewsColumnManage
                        },
                        {
                            path: 'ns-edit-column',
                            component: NewsEditColumn
                        },
                        {
                            path: 'ns-dividend-list',
                            component: NewsDividendList
                        },
                        {
                            path: 'ns-edit-dividend',
                            component: NewsEditDividend
                        },
                        {
                            path: 'ns-dividend-sort-manage',
                            component: NewsDividendSortManage
                        },
                        /*行业新闻子栏目组件*/
                        {
                            path: 'trade-basic-info',
                            component: TradeBasicInfo
                        },
                        {
                            path: 'trade-head-manage',
                            component: TradeHeadManage
                        },
                        {
                            path: 'trade-footer-manage',
                            component: TradeFooterManage
                        },
                        {
                            path: 'trade-cathet-manage',
                            component: TradeCathetManage
                        },
                        {
                            path: 'trade-nav-add',
                            component: TradeNavAdd
                        },
                        {
                            path: 'trade-article-list',
                            component: TradeArticleList
                        },
                        {
                            path: 'trade-article-add',
                            component: TradeArticleAdd
                        },
                        {
                            path: 'trade-column-manage',
                            component: TradeColumnManage
                        },
                        {
                            path: 'trade-column-edit',
                            component: TradeColumnEdit
                        },
                        {
                            path: 'trade-label-manage',
                            component: TradeLabelManage
                        },
                        {
                            path: 'trade-keyword-replace',
                            component: TradeKeywordReplace
                        },
                        {
                            path: 'trade-leaf-manage',
                            component: TradeLeafManage
                        },
                        {
                            path: 'trade-leaf-edit',
                            component: TradeLeafEdit
                        },
                        {
                            path: 'trade-ad-manage',
                            component: TradeAdManage
                        },
                        {
                            path: 'trade-chain-manage',
                            component: TradeChainManage
                        },
                        {
                            path: 'trade-chain-edit',
                            component: TradeChainEdit
                        },
                        {
                            path: 'trade-message-back',
                            component: TradeMessageBack
                        },
                        {
                            path: 'trade-ad-edit',
                            component: TradeAdEdit
                        },
                        {
                            path: 'trade-comment-manage',
                            component: TradeCommentManage
                        },
                        /*登录口子组件*/
                        {
                            path: 'leaf-basic-info',
                            component: LeafBasicInfo
                        },
                        {
                            path: 'leaf-article-list',
                            component: LeafArticleList
                        },
                        {
                            path: 'leaf-edit-article',
                            component: LeafEditArticle
                        },
                        {
                            path: 'leaf-chain-manage',
                            component: LeafChainManage
                        },
                        {
                            path: 'leaf-edit-chain',
                            component: LeafEditChain
                        },
                        {
                            path: 'leaf-keyword-replace',
                            component: LeafKeywordReplace
                        },
                        {
                            path: 'leaf-label-manage',
                            component: LeafLabelManage
                        },
                        {
                            path: 'leaf-column-manage',
                            component: LeafColumnManage
                        },
                        /*自定义子组件*/
                        {
                            path: 'cust-basic-info',
                            component: CustomBasicInfo
                        },
                        {
                            path: 'cust-file-manage',
                            component: CustomFileManage
                        },
                        {
                            path: 'cust-file-update',
                            component: CustomFileUpdate
                        },
                        /*企业网子栏目组件*/
                        {
                            path: 'company-basic-info',
                            component: CompanyBasicInfo
                        },
                        {
                            path: 'company-nav-manage',
                            component: CompanyNavManage
                        },
                        {
                            path: 'company-footer-manage',
                            component: CompanyFooterManage
                        },
                        {
                            path: 'company-nav-add',
                            component: CompanyNavAdd
                        },
                        {
                            path: 'company-product-list',
                            component: CompanyProductList
                        },
                        {
                            path: 'company-product-add',
                            component: CompanyProductAdd
                        },
                        {
                            path: 'company-case-list',
                            component: CompanyCaseList
                        },
                        {
                            path: 'company-case-add',
                            component: CompanyCaseAdd
                        },
                        {
                            path: 'company-sort-manage',
                            component: CompanySortManage
                        },
                        {
                            path: 'company-sort-add',
                            component: CompanySortAdd
                        },
                        {
                            path: 'company-article-list',
                            component: CompanyArticleList
                        },
                        {
                            path: 'company-article-add',
                            component: CompanyArticleAdd
                        },
                        {
                            path: 'company-column-manage',
                            component: CompanyColumnManage
                        },
                        {
                            path: 'company-label-manage',
                            component: CompanyLabelManage
                        },
                        {
                            path: 'company-keyword-replace',
                            component: CompanyKeywordReplace
                        },
                        {
                            path: 'company-leaf-manage',
                            component: CompanyLeafManage
                        },
                        {
                            path: 'company-leaf-edit',
                            component: CompanyLeafEdit
                        },
                        {
                            path: 'company-ad-manage',
                            component: CompanyAdManage
                        },
                        {
                            path: 'company-ad-edit',
                            component: CompanyAdEdit
                        },
                        {
                            path: 'company-slideshow',
                            component: CompanySlideshow
                        },
                        {
                            path: 'company-slides-edit',
                            component: CompanySlidesEdit
                        },
                        {
                            path: 'company-chain-manage',
                            component: CompanyChainManage
                        },
                        {
                            path: 'company-chain-edit',
                            component: CompanyChainEdit
                        },
                        /*新闻站子栏目组件*/
                        {
                            path: 'journal-basic-info',
                            component: JournalismBasicInfo
                        },
                        {
                            path: 'journal-head-manage',
                            component: JournalismHeadManage
                        },
                        {
                            path: 'journal-cathet-manage',
                            component: JournalismCathetManage
                        },
                        {
                            path: 'journal-nav-add',
                            component: JournalismNavAdd
                        },
                        {
                            path: 'journal-article-list',
                            component: JournalismArticleList
                        },
                        {
                            path: 'journal-article-add',
                            component: JournalismArticleAdd
                        },
                        {
                            path: 'journal-column-manage',
                            component: JournalismColumnManage
                        },
                        {
                            path: 'journal-column-edit',
                            component: JournalismColumnEdit
                        },

                        {
                            path: 'journal-label-manage',
                            component: JournalismLabelManage
                        },
                        {
                            path: 'journal-keyword-replace',
                            component: JournalismKeywordReplace
                        },
                        {
                            path: 'journal-atlas-list',
                            component: JournalismAtlasList
                        },
                        {
                            path: 'journal-columu-regulate',
                            component: JournalismColumuRegulate
                        },
                        {
                            path: 'journal-columu-redact',
                            component: JournalismColumuRedact
                        },
                        {
                            path: 'journal-atlas-add',
                            component: JournalismAtlasAdd
                        },
                        {
                            path: 'journal-ad-manage',
                            component: JournalismAdManage
                        },
                        {
                            path: 'journal-ad-edit',
                            component: JournalismAdEdit
                        },
                        {
                            path: 'journal-atlas-crawl',
                            component: JournalismAtlasCrawl
                        },
                    ]
                },
            ]
        },
        {
            path: '/',
            redirect: '/platform-intro'
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});