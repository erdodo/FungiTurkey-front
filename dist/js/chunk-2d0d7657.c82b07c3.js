(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7657"],{7745:function(e,t,l){"use strict";l.r(t);var o=l("7a23");const c={class:"mt-5 pt-5 row"},a={class:"col-12 mt-5"},r={class:"card"},n={class:"card-body"},p={class:"mt-3"},d=["placeholder"],m=["onUpdate:modelValue","placeholder"],s=["onUpdate:modelValue","placeholder"],i=["onUpdate:modelValue","placeholder"],b=["onUpdate:modelValue","placeholder"],u=["onUpdate:modelValue","placeholder"],j=["onUpdate:modelValue","placeholder"];function O(e,t,l,O,f,h){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["createElementVNode"])("div",a,[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("div",n,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(f.columns,(e,t)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],{key:t},[Object(o["createElementVNode"])("label",p,Object(o["toDisplayString"])(e.display)+": ",1),"file"==e.type?(Object(o["openBlock"])(),Object(o["createElementBlock"])("input",{key:0,type:"file",ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,d)):"varchar"==e.type?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createElementBlock"])("input",{key:1,"onUpdate:modelValue":e=>f.prm[t]=e,type:"text",ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,m)),[[o["vModelText"],f.prm[t]]]):Object(o["createCommentVNode"])("",!0),"int"==e.type?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createElementBlock"])("input",{key:2,type:"number","onUpdate:modelValue":e=>f.prm[t]=e,ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,s)),[[o["vModelText"],f.prm[t]]]):Object(o["createCommentVNode"])("",!0),"bit"==e.type?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createElementBlock"])("input",{key:3,type:"checkbox","onUpdate:modelValue":e=>f.prm[t]=e,ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,i)),[[o["vModelCheckbox"],f.prm[t]]]):Object(o["createCommentVNode"])("",!0),"datetime"==e.type?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createElementBlock"])("input",{key:4,type:"datetime-local","onUpdate:modelValue":e=>f.prm[t]=e,ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,b)),[[o["vModelText"],f.prm[t]]]):Object(o["createCommentVNode"])("",!0),"text"==e.type?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createElementBlock"])("textarea",{key:5,"onUpdate:modelValue":e=>f.prm[t]=e,ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,u)),[[o["vModelText"],f.prm[t]]]):Object(o["createCommentVNode"])("",!0),"tinyint"==e.type?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createElementBlock"])("input",{key:6,type:"checkbox","onUpdate:modelValue":e=>f.prm[t]=e,ref_for:!0,ref:t,placeholder:e.display,class:"form-control"},null,8,j)),[[o["vModelCheckbox"],f.prm[t]]]):Object(o["createCommentVNode"])("",!0)],64))),128)),Object(o["createElementVNode"])("button",{class:"btn btn-primary",onClick:t[0]||(t[0]=e=>h.onSubmit())},"Gönder")])])])])}var f=l("bc3a"),h=l.n(f),k={data(){return{image:null,title:null,columns:[],prm:{}}},mounted(){this.getColumns()},methods:{getColumns(){h.a.post(this.$route.params.database+"/"+this.$route.params.table_name+"/create").then(e=>{this.columns=e.data.columns})},async onSubmit(){const e=new FormData;for(const[o,c]of Object.entries(this.columns)){var t,l;if("file"==c.type)e.append("image",null===(t=this.$refs.image)||void 0===t||null===(l=t[0])||void 0===l?void 0:l.files[0]);else e.append(o,void 0==this.prm[o]?"":this.prm[o])}await h.a.post(this.$route.params.database+"/"+this.$route.params.table_name+"/store",e)}}},y=l("6b0d"),v=l.n(y);const V=v()(k,[["render",O]]);t["default"]=V}}]);
//# sourceMappingURL=chunk-2d0d7657.c82b07c3.js.map