(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/admin/news/joinEvent"],{1106:function(t,e,n){"use strict";n.r(e);var i=n("2ec5"),u=n("617d");for(var o in u)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("b2cc"),n("41ec");var a=n("828b"),c=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"536b065a",null,!1,i["a"],void 0);e["default"]=c.exports},"2ec5":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"e5eb"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"d9a88"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"6d0a"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"f124"))},uSelect:function(){return n.e("uview-ui/components/u-select/u-select").then(n.bind(null,"8d7e"))}},u=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.sex.show=!0})},o=[]},3627:function(t,e,n){},"41ec":function(t,e,n){"use strict";var i=n("3627"),u=n.n(i);u.a},5896:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("e86d"),u={data:function(){return{disabled:!1,showEndDate:!1,sex:{},model:{id:"",matchId:"",matchUserId:"",matchTitle:"",name:"",sex:"",idCard:"",teamName:"",schoolName:"",notes:"",phone:""}}},onLoad:function(t){this.model.matchId=t.id,this.model.matchUserId=t.uid||"",this.model.matchTitle=decodeURIComponent(t.title),this.initData()},methods:{initData:function(){this.sex=this.$u.deepClone(i.sexData)},btnSubmit:function(){var t=this;this.$u.test.idCard(this.model.idCard)?this.$api.saveMatchApplication(this.model).then((function(e){t.$u.toast("提交成功"),t.reloadData()})):this.$u.toast("无效的身份证号码")},changeSelect:function(t,e,n){var i=t[0];this[e].label=i.label,this.model[n]=i.value},reloadData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,i=getCurrentPages(),u=i[i.length-2];u.$vm.initData(),setTimeout((function(){t.navigateBack({delta:e})}),n)}}};e.default=u}).call(this,n("df3c")["default"])},"617d":function(t,e,n){"use strict";n.r(e);var i=n("5896"),u=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=u.a},6504:function(t,e,n){},b2cc:function(t,e,n){"use strict";var i=n("6504"),u=n.n(i);u.a},b2dd:function(t,e,n){"use strict";(function(t,e){var i=n("47a9");n("4208"),n("e230");i(n("3240"));var u=i(n("1106"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(u.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])}},[["b2dd","common/runtime","common/vendor"]]]);