
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/roast/index","pages/hslj/index","pages/mine/index","pages/common/login","pages/index/partner","pages/admin/partner/add","pages/index/partnerInfo","pages/admin/partner/join","pages/index/partnerJoiner","pages/index/userProfile","pages/index/resource","pages/admin/resource/add","pages/index/resourceInfo","pages/index/project","pages/admin/project/add","pages/index/projectInfo","pages/index/projectProgress","pages/index/funder","pages/admin/funder/add","pages/index/funderInfo","pages/index/toolbox","pages/admin/toolbox/add","pages/index/toolboxInfo","pages/index/news","pages/admin/news/add","pages/admin/news/addEvent","pages/admin/news/addLecture","pages/index/newsInfo","pages/index/newsEventInfo","pages/admin/news/joinEvent","pages/index/newsLectureInfo","pages/roast/add","pages/roast/info","pages/hslj/topList","pages/hslj/add","pages/mine/starAuth","pages/mine/myProfile","pages/mine/editProfile","pages/mine/myCollect","pages/mine/myPublish","pages/mine/myJoin","pages/mine/projectDetail","pages/mine/projectStatus","pages/mine/setting","pages/mine/kefu","pages/mine/recharge","pages/mine/luckyWheel","pages/mine/starTask","pages/mine/wallet","pages/mine/walletRecord","pages/mine/help","pages/common/share","pages/index/webview","pages/mine/kefuInfo"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"地平线跳动","navigationBarBackgroundColor":"#48A5FE","backgroundColor":"#F7F8F7","backgroundColorTop":"#F7F8F7","backgroundColorBottom":"#F7F8F7"},"tabBar":{"color":"#666666","selectedColor":"#48A5FE","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabBar/home.png","selectedIconPath":"static/tabBar/home_fill.png","text":"首页"},{"pagePath":"pages/roast/index","iconPath":"static/tabBar/comment.png","selectedIconPath":"static/tabBar/comment_fill.png","text":"吐槽"},{"pagePath":"pages/hslj/index","iconPath":"static/tabBar/medal.png","selectedIconPath":"static/tabBar/medal_fill.png","text":"华山论剑"},{"pagePath":"pages/mine/index","iconPath":"static/tabBar/mine.png","selectedIconPath":"static/tabBar/mine_fill.png","text":"我的"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"地平线跳动","compilerVersion":"4.15","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"地平线","navigationStyle":"default","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff","enablePullDownRefresh":true}},{"path":"/pages/roast/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"吐槽","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/hslj/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"华山论剑","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","navigationStyle":"custom","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/common/login","meta":{},"window":{"navigationBarTitleText":"","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fff","backgroundColorTop":"#fff"}},{"path":"/pages/index/partner","meta":{},"window":{"navigationBarTitleText":"找合伙","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff","enablePullDownRefresh":true}},{"path":"/pages/admin/partner/add","meta":{},"window":{"navigationBarTitleText":"发布伙伴","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/partnerInfo","meta":{},"window":{"navigationBarTitleText":"合伙详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/partner/join","meta":{},"window":{"navigationBarTitleText":"想参加","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/partnerJoiner","meta":{},"window":{"navigationBarTitleText":"想参加的人","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/userProfile","meta":{},"window":{"navigationBarTitleText":"个人资料","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/resource","meta":{},"window":{"navigationBarTitleText":"找资源","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/resource/add","meta":{},"window":{"navigationBarTitleText":"资源发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/resourceInfo","meta":{},"window":{"navigationBarTitleText":"群详情介绍","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/project","meta":{},"window":{"navigationBarTitleText":"找项目","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/project/add","meta":{},"window":{"navigationBarTitleText":"项目发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/projectInfo","meta":{},"window":{"navigationBarTitleText":"项目详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/projectProgress","meta":{},"window":{"navigationBarTitleText":"项目进程","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/funder","meta":{},"window":{"navigationBarTitleText":"找资金","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff","enablePullDownRefresh":true}},{"path":"/pages/admin/funder/add","meta":{},"window":{"navigationBarTitleText":"资金发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/funderInfo","meta":{},"window":{"navigationBarTitleText":"资金详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/toolbox","meta":{},"window":{"navigationBarTitleText":"月光宝盒","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/toolbox/add","meta":{},"window":{"navigationBarTitleText":"月光宝盒发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/toolboxInfo","meta":{},"window":{"navigationBarTitleText":"创业资料","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/news","meta":{},"window":{"navigationBarTitleText":"消息","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/news/add","meta":{},"window":{"navigationBarTitleText":"消息发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/news/addEvent","meta":{},"window":{"navigationBarTitleText":"赛事发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/news/addLecture","meta":{},"window":{"navigationBarTitleText":"讲座发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/newsInfo","meta":{},"window":{"navigationBarTitleText":"消息详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/newsEventInfo","meta":{},"window":{"navigationBarTitleText":"赛事详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/admin/news/joinEvent","meta":{},"window":{"navigationBarTitleText":"赛事报名","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/index/newsLectureInfo","meta":{},"window":{"navigationBarTitleText":"讲座详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/roast/add","meta":{},"window":{"navigationBarTitleText":"吐槽发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/roast/info","meta":{},"window":{"navigationBarTitleText":"吐槽详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/hslj/topList","meta":{},"window":{"navigationBarTitleText":"精彩绽放","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/hslj/add","meta":{},"window":{"navigationBarTitleText":"赛事发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/starAuth","meta":{},"window":{"navigationBarTitleText":"星级认证","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/myProfile","meta":{},"window":{"navigationBarTitleText":"个人资料","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/editProfile","meta":{},"window":{"navigationBarTitleText":"修改资料","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/myCollect","meta":{},"window":{"navigationBarTitleText":"我的收藏","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/myPublish","meta":{},"window":{"navigationBarTitleText":"我的发布","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/myJoin","meta":{},"window":{"navigationBarTitleText":"我的参与","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/projectDetail","meta":{},"window":{"navigationBarTitleText":"项目需求","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/projectStatus","meta":{},"window":{"navigationBarTitleText":"项目进程","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/setting","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/kefu","meta":{},"window":{"navigationBarTitleText":"智能客服","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/recharge","meta":{},"window":{"navigationBarTitleText":"充值","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/luckyWheel","meta":{},"window":{"navigationBarTitleText":"幸运抽奖","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/starTask","meta":{},"window":{"navigationBarTitleText":"星级任务","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/wallet","meta":{},"window":{"navigationBarTitleText":"我的钱包","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/walletRecord","meta":{},"window":{"navigationBarTitleText":"历史记录","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/help","meta":{},"window":{"navigationBarTitleText":"帮助中心","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/common/share","meta":{},"window":{"navigationBarTitleText":"加载中","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fff","backgroundColorTop":"#fff"}},{"path":"/pages/index/webview","meta":{},"window":{"navigationBarTitleText":"官网详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}},{"path":"/pages/mine/kefuInfo","meta":{},"window":{"navigationBarTitleText":"详情","navigationBarTextStyle":"white","navigationBarBackgroundColor":"#48A5FE","backgroundColorTop":"#fff"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});