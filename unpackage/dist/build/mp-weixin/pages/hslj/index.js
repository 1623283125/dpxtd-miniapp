(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hslj/index"],{"1fab":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={zPaging:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/z-paging/components/z-paging/z-paging")]).then(e.bind(null,"af78"))},uSearch:function(){return e.e("uview-ui/components/u-search/u-search").then(e.bind(null,"b5d7"))},uTabs:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-tabs/u-tabs")]).then(e.bind(null,"6960"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"32bb"))},uImage:function(){return e.e("uview-ui/components/u-image/u-image").then(e.bind(null,"e193"))},uLoading:function(){return e.e("uview-ui/components/u-loading/u-loading").then(e.bind(null,"5404"))},floatPublish:function(){return e.e("components/float-publish/float-publish").then(e.bind(null,"eae8"))},wxxyAgreePrivacy:function(){return Promise.all([e.e("common/vendor"),e.e("components/wxxy-agree-privacy/wxxy-agree-privacy")]).then(e.bind(null,"f836"))}},a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.topList.length);t._isMounted||(t.e0=function(n){return t.btnSearch(1)},t.e1=function(n){return t.btnSearch(2)}),t.$mp.data=Object.assign({},{$root:{g0:e}})},u=[]},3731:function(t,n,e){},ab90:function(t,n,e){"use strict";(function(t,n){var i=e("47a9");e("4208"),e("e230");i(e("3240"));var a=i(e("e213"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(a.default)}).call(this,e("3223")["default"],e("df3c")["createPage"])},b501:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default={data:function(){return{keyword:"",tabsIndex:0,tabsList:[{id:1,name:"全国赛事",type:"quanguo",info:"pages/index/newsEventInfo",publish:"pages/hslj/add"},{id:2,name:"省内赛事",type:"shengnei",info:"pages/index/newsEventInfo",publish:"pages/hslj/add"}],topList:[],dataList:[]}},onLoad:function(){},methods:{reloadData:function(){this.$refs.paging.reload()},queryList:function(t,n){var e=this,i={type:this.tabsList[this.tabsIndex].type};this.keyword&&(i.title=this.keyword),this.$api.getHsljList(i,t,n).then((function(t){var n=[];t.data.list&&(n=t.data.list.map((function(t){return{id:t.id,title:t.title}}))),e.$refs.paging.complete(n)})).finally((function(){e.$refs.paging.endRefresh()})),this.getHsljTopList(i.type)},getHsljTopList:function(t){var n=this;this.$api.getHsljTopList(t).then((function(t){var e=t.data.map((function(t){return{id:t.id,title:t.title,img:t.image}}));n.topList=e}))},changeTabs:function(t){this.tabsIndex=t,this.reloadData()},goTopListPage:function(){this.$u.route("pages/hslj/topList",{type:this.tabsList[this.tabsIndex].type})},goInfoPage:function(t){var n=this.tabsIndex;this.$u.route(this.tabsList[n].info,{id:t.id,type:"hslj"})},goPublishPage:function(){var t=this.tabsIndex;this.$u.route(this.tabsList[t].publish,{type:this.tabsIndex+1})},btnSearch:function(t){this.keyword?this.$refs.paging.reload():this.$u.toast("输入搜索关键字")}}}},c3be:function(t,n,e){"use strict";var i=e("3731"),a=e.n(i);a.a},e213:function(t,n,e){"use strict";e.r(n);var i=e("1fab"),a=e("e608");for(var u in a)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("c3be");var o=e("828b"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);n["default"]=s.exports},e608:function(t,n,e){"use strict";e.r(n);var i=e("b501"),a=e.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=a.a}},[["ab90","common/runtime","common/vendor"]]]);