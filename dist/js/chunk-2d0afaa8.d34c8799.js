(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0afaa8"],{"0efc":function(e,t,c){"use strict";c.r(t);var a=c("7a23");const l={class:"single-page-header mb-5",style:{background:"url('/_assets/HeaderBack.jpeg')"}},n={class:"container"},o={class:"row"},r={class:"col-md-12"},s=Object(a["createElementVNode"])("h2",null,"Admin",-1),d={class:"breadcrumb header-bradcrumb justify-content-center"},i={class:"breadcrumb-item"},b=Object(a["createTextVNode"])("Ana Sayfa"),m=Object(a["createElementVNode"])("li",{class:"breadcrumb-item active","aria-current":"page"},"Admin",-1),j={key:0,class:"container"},O={class:"row"},p={class:"card p-2 text-center"},u={class:"d-flex flex-column"},k=Object(a["createTextVNode"])("Ekle"),y=Object(a["createTextVNode"])("Düzenle");function N(e,t,c,N,V,E){const v=Object(a["resolveComponent"])("router-link"),w=Object(a["resolveComponent"])("el-button");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[Object(a["createElementVNode"])("section",l,[Object(a["createElementVNode"])("div",n,[Object(a["createElementVNode"])("div",o,[Object(a["createElementVNode"])("div",r,[s,Object(a["createElementVNode"])("ol",d,[Object(a["createElementVNode"])("li",i,[Object(a["createVNode"])(v,{to:"/",class:"text-white"},{default:Object(a["withCtx"])(()=>[b]),_:1})]),m])])])])]),V.state?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",j,[Object(a["createElementVNode"])("div",O,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(V.tableData,e=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{class:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1",key:e},[Object(a["createElementVNode"])("div",p,[Object(a["createElementVNode"])("div",u,[Object(a["createElementVNode"])("h3",null,Object(a["toDisplayString"])(e.display),1),Object(a["createVNode"])(w,{class:"w-100 mb-2"},{default:Object(a["withCtx"])(()=>[k]),_:1}),Object(a["createVNode"])(w,{class:"w-100 mb-2 ml-0"},{default:Object(a["withCtx"])(()=>[y]),_:1})])])]))),128))])])):Object(a["createCommentVNode"])("",!0)])}var V=c("bc3a"),E=c.n(V),v={data(){return{tableData:[{display:"Slider",name:"Slider"},{display:"Hakkımızda",name:"About"},{display:"Organizasyonumuz",name:"Services"},{display:"Galeri",name:"Galery"},{display:"Etkinlikler",name:"Activity"},{display:"Blog",name:"Blog"},{display:"Sponsor",name:"Sponsor"},{display:"İletişim",name:"Contact"},{display:"Geri Dönütler",name:"Feedbacks"}],state:!1}},mounted(){this.getUserData()},methods:{getUserData(){E.a.post("/profile")}}},w=c("6b0d"),f=c.n(w);const g=f()(v,[["render",N]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-2d0afaa8.d34c8799.js.map