(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-tag/u-tag"],{"67e3":function(t,e,o){"use strict";o.r(e);var i=o("d4f6"),n=o.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},9743:function(t,e,o){"use strict";var i=o("a45c"),n=o.n(i);n.a},a45c:function(t,e,o){},d4f6:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-tag",props:{type:{type:String,default:"primary"},disabled:{type:[Boolean,String],default:!1},size:{type:String,default:"default"},shape:{type:String,default:"square"},text:{type:[String,Number],default:""},bgColor:{type:String,default:""},color:{type:String,default:""},borderColor:{type:String,default:""},closeColor:{type:String,default:""},index:{type:[Number,String],default:""},mode:{type:String,default:"light"},closeable:{type:Boolean,default:!1},show:{type:Boolean,default:!0}},data:function(){return{}},computed:{customStyle:function(){var t={};return this.color&&(t.color=this.color),this.bgColor&&(t.backgroundColor=this.bgColor),"plain"==this.mode&&this.color&&!this.borderColor?t.borderColor=this.color:t.borderColor=this.borderColor,t},iconStyle:function(){if(this.closeable){var t={};return"mini"==this.size?t.fontSize="20rpx":t.fontSize="22rpx","plain"==this.mode||"light"==this.mode?t.color=this.type:"dark"==this.mode&&(t.color="#ffffff"),this.closeColor&&(t.color=this.closeColor),t}},closeIconColor:function(){return this.closeColor?this.closeColor:this.color?this.color:"dark"==this.mode?"#ffffff":this.type}},methods:{clickTag:function(){this.disabled||this.$emit("click",this.index)},close:function(){this.$emit("close",this.index)}}};e.default=i},d6e9:function(t,e,o){"use strict";o.r(e);var i=o("f3f9"),n=o("67e3");for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o("9743");var l=o("828b"),u=Object(l["a"])(n["default"],i["b"],i["c"],!1,null,"48a4c226",null,!1,i["a"],void 0);e["default"]=u.exports},f3f9:function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return i}));var i={uIcon:function(){return o.e("uview-ui/components/u-icon/u-icon").then(o.bind(null,"32bb"))}},n=function(){var t=this,e=t.$createElement,o=(t._self._c,t.show?t.__get_style([t.customStyle]):null),i=t.show&&t.closeable?t.__get_style([t.iconStyle]):null;t.$mp.data=Object.assign({},{$root:{s0:o,s1:i}})},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-tag/u-tag-create-component',
    {
        'uview-ui/components/u-tag/u-tag-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("d6e9"))
        })
    },
    [['uview-ui/components/u-tag/u-tag-create-component']]
]);