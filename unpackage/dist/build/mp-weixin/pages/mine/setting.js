(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/setting"],{"0d6c":function(t,n,e){"use strict";e.r(n);var o=e("b7c3"),u=e.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=u.a},"28c1":function(t,n,e){},"305c":function(t,n,e){"use strict";var o=e("28c1"),u=e.n(o);u.a},8686:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){}));var o=function(){var t=this.$createElement;this._self._c},u=[]},b7c3:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{isBus:0,scrollTopH:80,titleColor:"transparent",userInfo:{userId:"",avatar:"",nickname:"",rate:0,remark:"您还没有填写自我介绍哦~"}}},onLoad:function(){},onShow:function(){},onPageScroll:function(t){var n=this.scrollTopH,e=t.scrollTop;this.titleColor=e>n?"#fff":"transparent"},methods:{initData:function(){t.navigateBack()},reloadData:function(){this.getUserInfo()},getUserInfo:function(){var t=this;this.$api.getUserInfo().then((function(n){t.userInfo=n.data,t.isBus=n.data.busId}))},goPage:function(t){},goApplyBusPage:function(){this.isBus?this.$u.toast("你已经是经销商"):this.$u.route("/pages/mine/applyBus")},goQrcodePage:function(){this.$u.route("/pages/mine/qrcode")},btnLoin:function(){this.$u.route("/pages/common/login")},btnLogout:function(){this.clearUserInfo(),this.$u.toast("已安全退出登录"),this.$u.route({type:"tab",url:"/pages/index/index"})},clearUserInfo:function(){this.$u.vuex("_token",""),this.$u.vuex("_userInfo",{userId:"",userName:"",nickName:"未登陆用户",userLevel:0,phone:"",avatar:"",gender:0,remark:"",code:""})}}};n.default=e}).call(this,e("df3c")["default"])},b97f:function(t,n,e){"use strict";(function(t,n){var o=e("47a9");e("4208"),e("e230");o(e("3240"));var u=o(e("d7c7"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(u.default)}).call(this,e("3223")["default"],e("df3c")["createPage"])},d7c7:function(t,n,e){"use strict";e.r(n);var o=e("8686"),u=e("0d6c");for(var a in u)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("305c");var i=e("828b"),r=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=r.exports}},[["b97f","common/runtime","common/vendor"]]]);