webpackJsonp([1],{"5CwG":function(t,a){},ESaR:function(t,a){},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("7+uW"),i=e("//Fk"),r=e.n(i),o=e("Dd8w"),n=e.n(o),l=e("NYxO"),c={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"star"},[a("div",{staticClass:"score_star",style:{width:10*this.score+"%"}})])},staticRenderFns:[]};var u=e("VU/8")({props:["score"]},c,!1,function(t){e("ZE2M")},"data-v-b6bccf9a",null).exports,v={computed:n()({},Object(l.b)(["isHome","showSearchResult"])),components:{Star:u},data:function(){return{searchResult:[],searchValue:"",startNum:0,loading:!1,allLoad:!1,loadError:!1}},methods:{goHome:function(){this.$store.commit("setisHome",!0),this.$router.push({path:"/"})},submit:function(){var t=this;this.startNum=0,""!==this.$refs.searchInput.value.trim()&&(this.searchResult=[],this.loading=!0,this.searchValue=this.$refs.searchInput.value,this.$refs.searchInput.value="",this.getSearchData(this.searchValue,this.startNum).then(function(a){t.searchResult=t.searchResult.concat(a.data.subjects),t.$store.commit("setshowSearchResult",!0),t.loading=!1}))},closeResult:function(){this.$store.commit("setshowSearchResult",!1)},getSearchData:function(t,a){var e=this;return new r.a(function(s,i){e.axios.get("https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/search?count=12&q="+t+"&start="+a).then(function(t){e.loadError=!1,s(t)}).catch(function(){e.loading=!1,e.loadError=!0})})},goDetail:function(t){this.$store.commit("setisHome",!1),this.$store.commit("setshowSearchResult",!1),this.$router.push({name:"Detail",params:{movieId:t.currentTarget.dataset.id}})},loadMore:function(){var t=this;if(!this.allLoad){this.loading=!0,this.startNum+=12;var a,e=(a=2500,new r.a(function(t,e){setTimeout(function(){t(!0)},a)}));r.a.all([e,this.getSearchData(this.searchValue,this.startNum)]).then(function(a){!0===a[0]&&(t.searchResult=t.searchResult.concat(a[1].data.subjects),t.loading=!1)})}}}},h={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"search"},[e("div",{staticClass:"btn"},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.isHome,expression:"isHome"}]},[e("a",{attrs:{href:"#"}},[t._v("豆瓣电影")])]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:!t.isHome,expression:"!isHome"}],staticClass:"icon-back",on:{click:t.goHome}})]),t._v(" "),e("div",{staticClass:"searchbox"},[e("span",{staticClass:"icon-search"}),t._v(" "),e("input",{ref:"searchInput",attrs:{type:"text",placeholder:"搜索电影、演员、导演"},on:{keyup:function(a){return"button"in a||!t._k(a.keyCode,"enter",13,a.key,"Enter")?t.submit(a):null}}}),t._v(" "),e("button",{on:{click:t.submit}},[t._v("搜索")])]),t._v(" "),e("transition",{attrs:{name:"searchresult"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.showSearchResult,expression:"showSearchResult"}],staticClass:"searchresult"},[e("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"resultlist",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"100","infinite-scroll-immediate-check":"false"}},[e("li",{directives:[{name:"show",rawName:"v-show",value:!t.searchResult.length&&!t.loading,expression:"!searchResult.length && !loading"}],staticClass:"noSearchResult"},[t._v("无搜索结果")]),t._v(" "),e("li",{directives:[{name:"show",rawName:"v-show",value:t.searchResult.length,expression:"searchResult.length"}],staticClass:"resultTitle"},[t._v("搜索"+t._s(t.searchValue)+"的结果")]),t._v(" "),t._l(t.searchResult,function(a,s){return e("li",{key:s,staticClass:"resultitem",attrs:{"data-id":a.id,"data-imageurl":a.images.small},on:{click:t.goDetail}},[e("img",{attrs:{src:a.images.small,alt:""}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:a.rating.average,expression:"item.rating.average"}],staticClass:"score"},[e("Star",{attrs:{score:a.rating.average}}),t._v(" "),e("div",{staticClass:"score_num"},[t._v("\n              "+t._s(a.rating.average)+"\n            ")])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!a.rating.average,expression:"!item.rating.average"}],staticClass:"noscore"},[t._v("\n              暂无评分\n          ")]),t._v(" "),e("p",{staticClass:"item_title"},[t._v("\n            "+t._s(a.title)+"\n          ")])])}),t._v(" "),e("li",{staticClass:"more_loading"},[e("mt-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading&&!t.allLoad,expression:"loading&&!allLoad"}],attrs:{type:"snake",color:"#26A2FF",size:20}}),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.loadError,expression:"loadError"}]},[t._v("加载失败，请重新加载")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.allLoad,expression:"allLoad"}]},[t._v("已全部加载")])],1)],2),t._v(" "),e("div",{staticClass:"closeresult",on:{click:t.closeResult}},[t._v("\n        关闭\n      ")])])])],1)},staticRenderFns:[]};var d=e("VU/8")(v,h,!1,function(t){e("5CwG")},"data-v-3eb19af2",null).exports,m={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"linkdiv"},[a("router-link",{staticClass:"link",attrs:{to:"/home/hot"}},[this._v("正在热映")]),this._v(" "),a("router-link",{staticClass:"link",attrs:{to:"/home/assortment"}},[this._v("分类")])],1),this._v(" "),a("keep-alive",[a("router-view")],1)],1)},staticRenderFns:[]};var g=e("VU/8")({},m,!1,function(t){e("spmN")},"data-v-f8e46650",null).exports,p=e("BO1k"),f=e.n(p),_={data:function(){return{isHome:!1,getError:!1,loading:!1,movieData:{show:!1,imageurl:"",title:"",directors:"",casts:"",abs:""}}},beforeRouteEnter:function(t,a,e){e(function(t){if(t.movieData={show:!1,imageurl:"",title:"",directors:"",casts:"",abs:""},!t.$route.params.movieId)return t.loading=!1,void(t.getError=!0);t.loading=!0;new r.a(function(a,e){t.axios.get("https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/subject/"+t.$route.params.movieId).then(function(t){a(t)}).catch(function(a){console.log(a),t.loading=!1,t.getError=!0})}).then(function(a){t.movieData.show=!0,t.movieData.imageurl=a.data.images.large,t.movieData.title=a.data.original_title;var e=!0,s=!1,i=void 0;try{for(var r,o=f()(a.data.directors);!(e=(r=o.next()).done);e=!0){var n=r.value;0===a.data.directors.indexOf(n)?t.movieData.directors=n.name:t.movieData.directors=t.movieData.directors+"/"+n.name}}catch(t){s=!0,i=t}finally{try{!e&&o.return&&o.return()}finally{if(s)throw i}}var l=!0,c=!1,u=void 0;try{for(var v,h=f()(a.data.casts);!(l=(v=h.next()).done);l=!0){var d=v.value;0===a.data.casts.indexOf(d)?t.movieData.casts=d.name:t.movieData.casts=t.movieData.casts+"/"+d.name}}catch(t){c=!0,u=t}finally{try{!l&&h.return&&h.return()}finally{if(c)throw u}}t.movieData.abs=a.data.summary,t.loading=!1})})},beforeRouteUpdate:function(t,a,e){},created:function(){},methods:{goHome:function(){this.getError=!1,this.loading=!1,this.$store.commit("setisHome",!0),this.$router.push({path:"/"})}}},w={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"detail"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"more_loading"},[e("mt-spinner",{attrs:{type:"snake",color:"#26A2FF",size:20}})],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.getError,expression:"getError"}],staticClass:"error"},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.getError,expression:"getError"}]},[t._v("数据加载失败")]),t._v(" "),e("mt-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:t.goHome}},[t._v("请点击请返回首页")])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.movieData.show,expression:"movieData.show"}],staticClass:"detailinfo"},[e("div",{staticClass:"movieimg"},[e("img",{attrs:{src:t.movieData.imageurl,alt:""}})]),t._v(" "),e("div",{staticClass:"detailtitle"},[t._v("\n      "+t._s(t.movieData.title)+"\n    ")]),t._v(" "),e("div",{staticClass:"detaildirector"},[e("span",[t._v(" 导演：")]),t._v("\n    "+t._s(t.movieData.directors)+"\n    ")]),t._v(" "),e("div",{staticClass:"detailcasts"},[e("span",[t._v(" 演员：")]),t._v("\n      "+t._s(t.movieData.casts)+"\n    ")]),t._v(" "),e("div",{staticClass:"detailabstract"},[e("span",[t._v(" 简介：")]),t._v("\n      "+t._s(t.movieData.abs)+"\n    ")])])])},staticRenderFns:[]};var C=e("VU/8")(_,w,!1,function(t){e("gtg6")},"data-v-6b186929",null).exports,k={name:"App",components:{Search:d,Home:g,Detail:C}},x={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"app"}},[a("Search"),this._v(" "),a("keep-alive",[a("router-view")],1)],1)},staticRenderFns:[]};var N=e("VU/8")(k,x,!1,function(t){e("UjD8")},null,null).exports,y=e("/ocq"),D={components:{Star:u},created:function(){var t=this;this.getHotData(this.startNum).then(function(a){t.hotTitle=a.data.title,t.showHotlist=t.showHotlist.concat(a.data.subjects)})},data:function(){return{showHotlist:[],hotTitle:"",loading:!1,startNum:0,allLoad:!1,loadError:!1}},methods:{getHotData:function(t){var a=this;return new r.a(function(e,s){a.axios.get("https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/in_theaters?count=12&start="+t).then(function(t){a.loadError=!1,e(t)}).catch(function(t){console.log(t),a.loadError=!0})})},goDetail:function(t){this.$store.commit("setisHome",!1),this.$store.commit("setshowSearchResult",!1),this.$router.push({name:"Detail",params:{movieId:t.currentTarget.dataset.id}})},loadMore:function(){var t=this;this.allLoad||(this.loading=!0,this.startNum+=12,this.startNum>=36?this.allLoad=!0:this.getHotData(this.startNum).then(function(a){t.showHotlist=t.showHotlist.concat(a.data.subjects),t.loading=!1}))}}},T={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"hot"},[e("div",{staticClass:"title"},[t._v("\n    "+t._s(t.hotTitle)+"\n  ")]),t._v(" "),e("div",{staticClass:"scroll"},[e("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"hotlist",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"200","infinite-scroll-immediate-check":"true"}},t._l(t.showHotlist,function(a,s){return e("li",{key:s,staticClass:"hotitem",attrs:{"data-id":a.id,"data-imageurl":a.images.small},on:{click:t.goDetail}},[e("img",{attrs:{src:a.images.small,alt:""}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:a.rating.average,expression:"item.rating.average"}],staticClass:"score"},[e("Star",{attrs:{score:a.rating.average}}),t._v(" "),e("div",{staticClass:"score_num"},[t._v("\n            "+t._s(a.rating.average)+"\n          ")])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!a.rating.average,expression:"!item.rating.average"}],staticClass:"noscore"},[t._v("\n            暂无评分\n        ")]),t._v(" "),e("p",{staticClass:"item_title"},[t._v("\n          "+t._s(a.title)+"\n        ")])])})),t._v(" "),e("div",{staticClass:"more_loading"},[e("mt-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading&&!t.allLoad,expression:"loading&&!allLoad"}],attrs:{type:"snake",color:"#26A2FF",size:20}}),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.loadError,expression:"loadError"}]},[t._v("加载失败，请重新加载")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.allLoad,expression:"allLoad"}]},[t._v("已全部加载")])],1)])])},staticRenderFns:[]};var b=e("VU/8")(D,T,!1,function(t){e("ESaR")},"data-v-7e664cc1",null).exports,E={components:{Star:u},data:function(){return{typeTags:["剧情","喜剧","动作","爱情","科幻","悬疑","惊悚","恐怖","犯罪","音乐","奇幻","冒险","灾难"],areaTags:["中国","美国","香港","日本","韩国","英国","法国","德国","意大利"],featureTags:["经典","青春","文艺","搞笑","励志","魔幻","感人","女性"],typeTag:"剧情",areaTag:"中国",featureTag:"经典",tagValue:"剧情,中国,经典",showassoprtmentlist:[],loading:!1,startNum:0,allLoad:!1,loadError:!1}},created:function(){var t=this;this.getAssortData(this.tagValue,this.startNum).then(function(a){console.log(a.data.subjects),t.showassoprtmentlist=a.data.subjects})},methods:{getAssortData:function(t,a){var e=this;return new r.a(function(s,i){e.axios.get("https://cors-anywhere.herokuapp.com/http://api.douban.com/v2/movie/search?count=12&tag="+t+"&start="+a).then(function(t){e.loadError=!1,s(t)}).catch(function(t){console.log(t),e.loadError=!0})})},goDetail:function(t){this.$store.commit("setisHome",!1),this.$router.push({name:"Detail",params:{movieId:t.currentTarget.dataset.id}})},changeTypeTag:function(t){this.typeTag=t.currentTarget.dataset.tag,this.changeTagValue()},changeAreaTag:function(t){this.areaTag=t.currentTarget.dataset.tag,this.changeTagValue()},changeFeatureTag:function(t){this.featureTag=t.currentTarget.dataset.tag,this.changeTagValue()},changeTagValue:function(){this.tagValue=",,"},loadMore:function(){var t=this;if(!this.allLoad){this.loading=!0,this.startNum+=12;var a,e=(a=2500,new r.a(function(t,e){setTimeout(function(){t(!0)},a)}));r.a.all([e,this.getAssortData(this.tagValue,this.startNum)]).then(function(a){!0===a[0]&&(t.showassoprtmentlist=t.showassoprtmentlist.concat(a[1].data.subjects),t.loading=!1)})}}}},R={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"assoprtment"},[e("div",{staticClass:"title"},[t._v("\n    选影视\n  ")]),t._v(" "),e("div",{staticClass:"tags"},[e("ul",{staticClass:"typetags"},t._l(t.typeTags,function(a,s){return e("li",{key:s,class:[t.typeTag===a?"activetag":""],attrs:{"data-tag":a},on:{click:t.changeTypeTag}},[t._v(t._s(a))])})),t._v(" "),e("ul",{staticClass:"areatags"},t._l(t.areaTags,function(a,s){return e("li",{key:s,class:[t.areaTag===a?"activetag":""],attrs:{"data-tag":a},on:{click:t.changeAreaTag}},[t._v(t._s(a))])})),t._v(" "),e("ul",{staticClass:"featuretags"},t._l(t.featureTags,function(a,s){return e("li",{key:s,class:[t.featureTag===a?"activetag":""],attrs:{"data-tag":a},on:{click:t.changeFeatureTag}},[t._v(t._s(a))])}))]),t._v(" "),e("div",{staticClass:"scroll"},[e("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"assoprtmentlist",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"100","infinite-scroll-immediate-check":"false"}},t._l(t.showassoprtmentlist,function(a,s){return e("li",{key:s,staticClass:"assoprtmentitem",attrs:{"data-id":a.id,"data-imageurl":a.images.small},on:{click:t.goDetail}},[e("img",{attrs:{src:a.images.small,alt:""}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:a.rating.average,expression:"item.rating.average"}],staticClass:"score"},[e("Star",{attrs:{score:a.rating.average}}),t._v(" "),e("div",{staticClass:"score_num"},[t._v("\n            "+t._s(a.rating.average)+"\n          ")])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!a.rating.average,expression:"!item.rating.average"}],staticClass:"noscore"},[t._v("\n            暂无评分\n        ")]),t._v(" "),e("p",{staticClass:"item_title"},[t._v("\n          "+t._s(a.title)+"\n        ")])])})),t._v(" "),e("div",{staticClass:"more_loading"},[e("mt-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading&&!t.allLoad,expression:"loading&&!allLoad"}],attrs:{type:"snake",color:"#26A2FF",size:20}}),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.loadError,expression:"loadError"}]},[t._v("加载失败，请重新加载")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.allLoad,expression:"allLoad"}]},[t._v("已全部加载")])],1)])])},staticRenderFns:[]};var H=e("VU/8")(E,R,!1,function(t){e("S8I1")},"data-v-304856d7",null).exports;s.default.use(y.a);var S=new y.a({routes:[{path:"/",redirect:"/home"},{path:"/home",component:g,meta:{keepAlive:!0},children:[{path:"",redirect:"hot"},{path:"hot",name:"Hot",component:b,meta:{keepAlive:!0}},{path:"assortment",name:"Assortment",component:H,meta:{keepAlive:!0}}]},{path:"/detail",name:"Detail",component:C,meta:{keepAlive:!1}}]}),$=e("Au9i"),A=e.n($),V=(e("d8/S"),e("mtWM")),L=e.n(V);s.default.use(l.a);var F=new l.a.Store({state:{isHome:!0,showSearchResult:!1},mutations:{setisHome:function(t,a){t.isHome=a},setshowSearchResult:function(t,a){t.showSearchResult=a}}});e("zy+7"),e("zrzA");s.default.use(A.a),s.default.use(l.a),s.default.prototype.axios=L.a,s.default.config.productionTip=!1,new s.default({el:"#app",router:S,store:F,components:{App:N},template:"<App/>"})},S8I1:function(t,a){},UjD8:function(t,a){},ZE2M:function(t,a){},"d8/S":function(t,a){},gtg6:function(t,a){},spmN:function(t,a){},zrzA:function(t,a){},"zy+7":function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.dfc22b6d004c403806d2.js.map