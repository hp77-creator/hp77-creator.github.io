import{C as q,S as V,i as j,s as L,k as v,q as M,a as z,l as b,m as k,r as w,h as f,c as N,n as d,D as O,b as P,E as _,F as oe,G as I,H as ie,o as ae,u as ce,I as ue,J as fe,p as _e,y as G,z as B,A as J,g as S,d as H,B as K,e as Q,v as me,f as he,K as le,L as ne,M as se,N as re,O as de,P as pe,Q as ve}from"../chunks/index.443e69e7.js";import{p as be}from"../chunks/stores.0557453b.js";const ke=!0,ye=async({url:o})=>({pathname:o.pathname}),Ce=Object.freeze(Object.defineProperty({__proto__:null,load:ye,prerender:ke},Symbol.toStringTag,{value:"Module"}));function ge(o){const e=o-1;return e*e*e+1}function W(o,{delay:e=0,duration:l=400,easing:n=ge,x:t=0,y:s=0,opacity:a=0}={}){const r=getComputedStyle(o),c=+r.opacity,g=r.transform==="none"?"":r.transform,E=c*(1-a),[i,u]=q(t),[y,h]=q(s);return{delay:e,duration:l,easing:n,css:(A,C)=>`
			transform: ${g} translate(${(1-A)*i}${u}, ${(1-A)*y}${h});
			opacity: ${c-E*C}`}}function X(o,e,l){const n=o.slice();return n[4]=e[l],n}function Y(o){let e,l,n,t,s;return{c(){e=v("span"),l=v("span"),n=M("—"),t=z(),s=M(o[1]),this.h()},l(a){e=b(a,"SPAN",{class:!0});var r=k(e);l=b(r,"SPAN",{class:!0});var c=k(l);n=w(c,"—"),c.forEach(f),t=N(r),s=w(r,o[1]),r.forEach(f),this.h()},h(){d(l,"class","text-neutral-400 separator svelte-1zoev6"),d(e,"class","page-title svelte-1zoev6")},m(a,r){P(a,e,r),_(e,l),_(l,n),_(e,t),_(e,s)},p(a,r){r&2&&ce(s,a[1])},d(a){a&&f(e)}}}function Z(o,e){let l,n=e[4].name+"",t,s;return{key:o,first:null,c(){l=v("a"),t=M(n),s=z(),this.h()},l(a){l=b(a,"A",{href:!0,class:!0});var r=k(l);t=w(r,n),s=N(r),r.forEach(f),this.h()},h(){d(l,"href",e[4].href),d(l,"class","nav-link svelte-1zoev6"),O(l,"active",e[0].url.pathname===e[4].href),this.first=l},m(a,r){P(a,l,r),_(l,t),_(l,s)},p(a,r){e=a,r&9&&O(l,"active",e[0].url.pathname===e[4].href)},d(a){a&&f(l)}}}function $e(o){let e,l,n,t,s,a,r,c,g,E,i,u=[],y=new Map,h=o[1]&&Y(o),A=o[3];const C=m=>m[4];for(let m=0;m<A.length;m+=1){let p=X(o,A,m),$=C(p);y.set($,u[m]=Z($,p))}return{c(){e=v("header"),l=v("h1"),n=v("a"),t=v("span"),s=M("Himanshu"),a=z(),r=v("span"),c=M("Pandey"),g=z(),h&&h.c(),E=z(),i=v("nav");for(let m=0;m<u.length;m+=1)u[m].c();this.h()},l(m){e=b(m,"HEADER",{class:!0,"data-sveltekit-noscroll":!0,"data-sveltekit-preload-code":!0});var p=k(e);l=b(p,"H1",{class:!0});var $=k(l);n=b($,"A",{href:!0,class:!0});var F=k(n);t=b(F,"SPAN",{class:!0});var D=k(t);s=w(D,"Himanshu"),D.forEach(f),a=N(F),r=b(F,"SPAN",{class:!0});var R=k(r);c=w(R,"Pandey"),R.forEach(f),F.forEach(f),g=N($),h&&h.l($),$.forEach(f),E=N(p),i=b(p,"NAV",{class:!0});var U=k(i);for(let T=0;T<u.length;T+=1)u[T].l(U);U.forEach(f),p.forEach(f),this.h()},h(){d(t,"class","name-text svelte-1zoev6"),d(r,"class","name-text svelte-1zoev6"),d(n,"href","/"),d(n,"class","name-link svelte-1zoev6"),d(l,"class","font-bold text-black text-2xl mb-6 name-container"),d(i,"class","nav-links svelte-1zoev6"),d(e,"class","layout-md flex justify-between items-start header-container svelte-1zoev6"),d(e,"data-sveltekit-noscroll",""),d(e,"data-sveltekit-preload-code","eager"),O(e,"mounted",o[2])},m(m,p){P(m,e,p),_(e,l),_(l,n),_(n,t),_(t,s),_(n,a),_(n,r),_(r,c),_(l,g),h&&h.m(l,null),_(e,E),_(e,i);for(let $=0;$<u.length;$+=1)u[$]&&u[$].m(i,null)},p(m,[p]){m[1]?h?h.p(m,p):(h=Y(m),h.c(),h.m(l,null)):h&&(h.d(1),h=null),p&9&&(A=m[3],u=oe(u,p,C,1,m,A,y,i,ue,Z,null,X)),p&4&&O(e,"mounted",m[2])},i:I,o:I,d(m){m&&f(e),h&&h.d();for(let p=0;p<u.length;p+=1)u[p].d()}}}function Ee(o,e,l){let n;ie(o,be,r=>l(0,n=r));const t=[{name:"blogs",href:"/blogs"},{name:"resume",href:"/resume"}];let s=null,a=!1;return ae(()=>{l(2,a=!0)}),o.$$.update=()=>{if(o.$$.dirty&1){const r=t.find(({href:c})=>c===n.url.pathname);r?l(1,s=r.name.charAt(0).toUpperCase()+r.name.slice(1)):l(1,s=null)}},[n,s,a,t]}class Ae extends V{constructor(e){super(),j(this,e,Ee,$e,L,{})}}function x(o,e,l){const n=o.slice();return n[2]=e[l],n[4]=l,n}function ee(o){let e,l,n=o[2].name+"",t,s,a,r,c,g=o[2].username+"",E,i;return{c(){e=v("div"),l=v("span"),t=M(n),s=z(),a=v("hr"),r=z(),c=v("a"),E=M(g),i=z(),this.h()},l(u){e=b(u,"DIV",{class:!0,style:!0});var y=k(e);l=b(y,"SPAN",{class:!0});var h=k(l);t=w(h,n),h.forEach(f),s=N(y),a=b(y,"HR",{class:!0}),r=N(y),c=b(y,"A",{class:!0,href:!0,target:!0,rel:!0});var A=k(c);E=w(A,g),A.forEach(f),i=N(y),y.forEach(f),this.h()},h(){d(l,"class","label svelte-1te7hpb"),d(a,"class","svelte-1te7hpb"),d(c,"class","link social-link svelte-1te7hpb"),d(c,"href",o[2].href),d(c,"target",o[2].name!=="Email"?"_blank":void 0),d(c,"rel",o[2].name!=="Email"?"noopener noreferrer":void 0),d(e,"class","row svelte-1te7hpb"),_e(e,"animation-delay",o[4]*100+"ms")},m(u,y){P(u,e,y),_(e,l),_(l,t),_(e,s),_(e,a),_(e,r),_(e,c),_(c,E),_(e,i)},p:I,d(u){u&&f(e)}}}function ze(o){let e,l=o[1],n=[];for(let t=0;t<l.length;t+=1)n[t]=ee(x(o,l,t));return{c(){e=v("footer");for(let t=0;t<n.length;t+=1)n[t].c();this.h()},l(t){e=b(t,"FOOTER",{class:!0});var s=k(e);for(let a=0;a<n.length;a+=1)n[a].l(s);s.forEach(f),this.h()},h(){d(e,"class","layout-md mt-20 text-lg flex flex-col space-y-4 footer-container svelte-1te7hpb"),O(e,"mounted",o[0])},m(t,s){P(t,e,s);for(let a=0;a<n.length;a+=1)n[a]&&n[a].m(e,null)},p(t,[s]){if(s&2){l=t[1];let a;for(a=0;a<l.length;a+=1){const r=x(t,l,a);n[a]?n[a].p(r,s):(n[a]=ee(r),n[a].c(),n[a].m(e,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=l.length}s&1&&O(e,"mounted",t[0])},i:I,o:I,d(t){t&&f(e),fe(n,t)}}}function Ne(o,e,l){let n=!1;return ae(()=>{l(0,n=!0)}),[n,[{name:"Twitter",href:"https://twitter.com/theboycalledhp",username:"@theboycalledhp"},{name:"GitHub",href:"https://github.com/hp77-creator",username:"@hp77-creator"},{name:"Email",href:"mailto:himanshu.dn.pandey@gmail.com",username:"himanshu.dn.pandey@gmail.com"}]]}class Pe extends V{constructor(e){super(),j(this,e,Ne,ze,L,{})}}function Se(o){let e=o[0].pathname,l,n,t=te(o);return{c(){t.c(),l=Q()},l(s){t.l(s),l=Q()},m(s,a){t.m(s,a),P(s,l,a),n=!0},p(s,a){a&1&&L(e,e=s[0].pathname)?(me(),H(t,1,1,I),he(),t=te(s),t.c(),S(t,1),t.m(l.parentNode,l)):t.p(s,a)},i(s){n||(S(t),n=!0)},o(s){H(t),n=!1},d(s){s&&f(l),t.d(s)}}}function He(o){let e,l;const n=o[4].default,t=le(n,o,o[3],null);return{c(){e=v("main"),t&&t.c()},l(s){e=b(s,"MAIN",{});var a=k(e);t&&t.l(a),a.forEach(f)},m(s,a){P(s,e,a),t&&t.m(e,null),l=!0},p(s,a){t&&t.p&&(!l||a&8)&&ne(t,n,s,s[3],l?re(n,s[3],a,null):se(s[3]),null)},i(s){l||(S(t,s),l=!0)},o(s){H(t,s),l=!1},d(s){s&&f(e),t&&t.d(s)}}}function te(o){let e,l,n,t;const s=o[4].default,a=le(s,o,o[3],null);return{c(){e=v("main"),a&&a.c()},l(r){e=b(r,"MAIN",{});var c=k(e);a&&a.l(c),c.forEach(f)},m(r,c){P(r,e,c),a&&a.m(e,null),t=!0},p(r,c){a&&a.p&&(!t||c&8)&&ne(a,s,r,r[3],t?re(s,r[3],c,null):se(r[3]),null)},i(r){t||(S(a,r),de(()=>{t&&(n&&n.end(1),l=pe(e,W,{x:-10,duration:350,delay:350}),l.start())}),t=!0)},o(r){H(a,r),l&&l.invalidate(),n=ve(e,W,{y:5,duration:350}),t=!1},d(r){r&&f(e),a&&a.d(r),r&&n&&n.end()}}}function Me(o){let e,l,n,t,s,a,r;e=new Ae({});const c=[He,Se],g=[];function E(i,u){return i[1]||i[2]?0:1}return n=E(o),t=g[n]=c[n](o),a=new Pe({}),{c(){G(e.$$.fragment),l=z(),t.c(),s=z(),G(a.$$.fragment)},l(i){B(e.$$.fragment,i),l=N(i),t.l(i),s=N(i),B(a.$$.fragment,i)},m(i,u){J(e,i,u),P(i,l,u),g[n].m(i,u),P(i,s,u),J(a,i,u),r=!0},p(i,[u]){t.p(i,u)},i(i){r||(S(e.$$.fragment,i),S(t),S(a.$$.fragment,i),r=!0)},o(i){H(e.$$.fragment,i),H(t),H(a.$$.fragment,i),r=!1},d(i){K(e,i),i&&f(l),g[n].d(i),i&&f(s),K(a,i)}}}function we(o,e,l){let{$$slots:n={},$$scope:t}=e,{data:s}=e;const a=/Android|iPhone/i.test(navigator.userAgent),r=matchMedia("(prefers-reduced-motion: reduce)").matches;return o.$$set=c=>{"data"in c&&l(0,s=c.data),"$$scope"in c&&l(3,t=c.$$scope)},[s,a,r,t,n]}class Fe extends V{constructor(e){super(),j(this,e,we,Me,L,{data:0})}}export{Fe as component,Ce as universal};
