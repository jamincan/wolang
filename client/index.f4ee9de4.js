import{S as t,i as a,s as n,a as e,c as s,q as o,d as r,b as m,e as i,f as c,m as d,t as f,g as h,h as u}from"./client.9b81447a.js";import"./_commonjsHelpers.91583ccb.js";import{M as l}from"./Markdown.1669b747.js";function w(t){let a,n,w;return n=new l({props:{markdown:t[0]}}),{c(){a=e(),s(n.$$.fragment),this.h()},l(t){o('[data-svelte="svelte-1o9j07f"]',document.head).forEach(r),a=m(t),i(n.$$.fragment,t),this.h()},h(){document.title="Wolang"},m(t,e){c(t,a,e),d(n,t,e),w=!0},p(t,[a]){const e={};1&a&&(e.markdown=t[0]),n.$set(e)},i(t){w||(f(n.$$.fragment,t),w=!0)},o(t){h(n.$$.fragment,t),w=!1},d(t){t&&r(a),u(n,t)}}}async function p(t,a){const n=await this.fetch("https://raw.githubusercontent.com/jamincan/wolang/main/README.md"),e=await n.text();if(n.ok)return{markdown:e};this.error(502,"Unable to retrieve the documentation.")}function $(t,a,n){let{markdown:e}=a;return t.$$set=t=>{"markdown"in t&&n(0,e=t.markdown)},[e]}export default class extends t{constructor(t){super(),a(this,t,$,w,n,{markdown:0})}}export{p as preload};
