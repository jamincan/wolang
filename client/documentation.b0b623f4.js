import{S as t,i as a,s as n,a as s,k as e,c as o,q as r,d as m,b as c,l as i,p as d,e as f,f as h,m as l,t as u,g as w,h as p}from"./client.9b81447a.js";import"./_commonjsHelpers.91583ccb.js";import{M as $}from"./Markdown.1669b747.js";function k(t){let a,n,k,g;return k=new $({props:{markdown:t[0]}}),{c(){a=s(),n=e("section"),o(k.$$.fragment),this.h()},l(t){r('[data-svelte="svelte-stfr3o"]',document.head).forEach(m),a=c(t),n=i(t,"SECTION",{});var s=d(n);f(k.$$.fragment,s),s.forEach(m),this.h()},h(){document.title="Wolang - Documentation"},m(t,s){h(t,a,s),h(t,n,s),l(k,n,null),g=!0},p(t,[a]){const n={};1&a&&(n.markdown=t[0]),k.$set(n)},i(t){g||(u(k.$$.fragment,t),g=!0)},o(t){w(k.$$.fragment,t),g=!1},d(t){t&&m(a),t&&m(n),p(k)}}}async function g(t,a){const n=await this.fetch("https://raw.githubusercontent.com/jamincan/wolang/main/DOCUMENTATION.md"),s=await n.text();if(n.ok)return{markdown:s};this.error(502,"Unable to retrieve the documentation.")}function b(t,a,n){let{markdown:s}=a;return t.$$set=t=>{"markdown"in t&&n(0,s=t.markdown)},[s]}export default class extends t{constructor(t){super(),a(this,t,b,k,n,{markdown:0})}}export{g as preload};
