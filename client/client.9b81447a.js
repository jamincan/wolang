function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function a(t,e,n,r,o,s,c){const a=function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(e,r,o,s);if(a){const o=i(e,n,r,c);t.p(o,a)}}function l(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function d(){return h(" ")}function m(){return h("")}function g(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t){return Array.from(t.childNodes)}function y(t,e,n,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===e){let e=0;const s=[];for(;e<o.attributes.length;){const t=o.attributes[e++];n[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):p(e)}function _(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return h(e)}function b(t){return _(t," ")}function E(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function S(t,e){t.value=null==e?"":e}function x(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function w(t,e=document.body){return Array.from(e.querySelectorAll(t))}class N{constructor(t=null){this.a=t,this.e=this.n=null}m(t,e,n=null){this.e||(this.e=p(e.nodeName),this.t=e,this.h(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)u(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(f)}}let P;function A(t){P=t}function R(){if(!P)throw new Error("Function called outside component initialization");return P}function L(t){R().$$.on_mount.push(t)}const j=[],I=[],C=[],O=[],T=Promise.resolve();let z=!1;function k(t){C.push(t)}let U=!1;const q=new Set;function J(){if(!U){U=!0;do{for(let t=0;t<j.length;t+=1){const e=j[t];A(e),D(e.$$)}for(A(null),j.length=0;I.length;)I.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];q.has(e)||(q.add(e),e())}C.length=0}while(j.length);for(;O.length;)O.pop()();z=!1,U=!1,q.clear()}}function D(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const M=new Set;let B;function H(){B={r:0,c:[],p:B}}function V(){B.r||o(B.c),B=B.p}function K(t,e){t&&t.i&&(M.delete(t),t.i(e))}function G(t,e,n,r){if(t&&t.o){if(M.has(t))return;M.add(t),B.c.push((()=>{M.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function Y(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const c=t[s],i=e[s];if(i){for(const t in c)t in i||(r[t]=1);for(const t in i)o[t]||(n[t]=i[t],o[t]=1);t[s]=i}else for(const t in c)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function F(t){return"object"==typeof t&&null!==t?t:{}}function W(t){t&&t.c()}function X(t,e){t&&t.l(e)}function Q(t,e,r){const{fragment:c,on_mount:i,on_destroy:a,after_update:l}=t.$$;c&&c.m(e,r),k((()=>{const e=i.map(n).filter(s);a?a.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(k)}function Z(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function tt(t,e){-1===t.$$.dirty[0]&&(j.push(t),z||(z=!0,T.then(J)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function et(e,n,s,c,i,a,l=[-1]){const u=P;A(e);const p=n.props||{},h=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:r(),dirty:l,skip_bound:!1};let d=!1;if(h.ctx=s?s(e,p,((t,n,...r)=>{const o=r.length?r[0]:n;return h.ctx&&i(h.ctx[t],h.ctx[t]=o)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](o),d&&tt(e,t)),n})):[],h.update(),d=!0,o(h.before_update),h.fragment=!!c&&c(h.ctx),n.target){if(n.hydrate){const t=v(n.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();n.intro&&K(e.$$.fragment),Q(e,n.target,n.anchor),J()}A(u)}class nt{$destroy(){Z(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const rt=[];function ot(e,n=t){let r;const o=[];function s(t){if(c(e,t)&&(e=t,r)){const t=!rt.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),rt.push(n,e)}if(t){for(let t=0;t<rt.length;t+=2)rt[t][0](rt[t+1]);rt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,i=t){const a=[c,i];return o.push(a),1===o.length&&(r=n(s)||t),c(e),()=>{const t=o.indexOf(a);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}const st={};function ct(e){let n,r,o,s,c,i,a,m,g,E,S,x,w,N,P,A,R,L,j,I,C,O,T,z,k,U,q;return{c(){n=p("nav"),r=p("div"),o=p("h1"),s=p("strong"),c=h("wo"),i=h("lang"),a=d(),m=p("ul"),g=p("li"),E=p("a"),S=h("Main"),w=d(),N=p("li"),P=p("a"),A=h("Documentation"),L=d(),j=p("li"),I=p("a"),C=h("Specification"),T=d(),z=p("li"),k=p("a"),U=h("Demo"),this.h()},l(t){n=y(t,"NAV",{class:!0});var e=v(n);r=y(e,"DIV",{class:!0});var l=v(r);o=y(l,"H1",{class:!0});var u=v(o);s=y(u,"STRONG",{class:!0});var p=v(s);c=_(p,"wo"),p.forEach(f),i=_(u,"lang"),u.forEach(f),a=b(l),m=y(l,"UL",{class:!0});var h=v(m);g=y(h,"LI",{class:!0});var d=v(g);E=y(d,"A",{"aria-current":!0,href:!0,class:!0});var $=v(E);S=_($,"Main"),$.forEach(f),d.forEach(f),w=b(h),N=y(h,"LI",{class:!0});var x=v(N);P=y(x,"A",{"aria-current":!0,href:!0,class:!0});var R=v(P);A=_(R,"Documentation"),R.forEach(f),x.forEach(f),L=b(h),j=y(h,"LI",{class:!0});var O=v(j);I=y(O,"A",{"aria-current":!0,href:!0,class:!0});var q=v(I);C=_(q,"Specification"),q.forEach(f),O.forEach(f),T=b(h),z=y(h,"LI",{class:!0});var J=v(z);k=y(J,"A",{"aria-current":!0,href:!0,class:!0});var D=v(k);U=_(D,"Demo"),D.forEach(f),J.forEach(f),h.forEach(f),l.forEach(f),e.forEach(f),this.h()},h(){$(s,"class","svelte-sci1iz"),$(o,"class","svelte-sci1iz"),$(E,"aria-current",x=void 0===e[0]?"page":void 0),$(E,"href","."),$(E,"class","svelte-sci1iz"),$(g,"class","svelte-sci1iz"),$(P,"aria-current",R="documentation"===e[0]?"page":void 0),$(P,"href","documentation"),$(P,"class","svelte-sci1iz"),$(N,"class","svelte-sci1iz"),$(I,"aria-current",O="specification"===e[0]?"page":void 0),$(I,"href","specification"),$(I,"class","svelte-sci1iz"),$(j,"class","svelte-sci1iz"),$(k,"aria-current",q="demo"===e[0]?"page":void 0),$(k,"href","demo"),$(k,"class","svelte-sci1iz"),$(z,"class","svelte-sci1iz"),$(m,"class","svelte-sci1iz"),$(r,"class","svelte-sci1iz"),$(n,"class","svelte-sci1iz")},m(t,e){u(t,n,e),l(n,r),l(r,o),l(o,s),l(s,c),l(o,i),l(r,a),l(r,m),l(m,g),l(g,E),l(E,S),l(m,w),l(m,N),l(N,P),l(P,A),l(m,L),l(m,j),l(j,I),l(I,C),l(m,T),l(m,z),l(z,k),l(k,U)},p(t,[e]){1&e&&x!==(x=void 0===t[0]?"page":void 0)&&$(E,"aria-current",x),1&e&&R!==(R="documentation"===t[0]?"page":void 0)&&$(P,"aria-current",R),1&e&&O!==(O="specification"===t[0]?"page":void 0)&&$(I,"aria-current",O),1&e&&q!==(q="demo"===t[0]?"page":void 0)&&$(k,"aria-current",q)},i:t,o:t,d(t){t&&f(n)}}}function it(t,e,n){let{segment:r}=e;return t.$$set=t=>{"segment"in t&&n(0,r=t.segment)},[r]}class at extends nt{constructor(t){super(),et(this,t,it,ct,c,{segment:0})}}function lt(t){let e,n,r,o;e=new at({props:{segment:t[0]}});const s=t[2].default,c=function(t,e,n,r){if(t){const o=i(t,e,n,r);return t[0](o)}}(s,t,t[1],null);return{c(){W(e.$$.fragment),n=d(),r=p("main"),c&&c.c(),this.h()},l(t){X(e.$$.fragment,t),n=b(t),r=y(t,"MAIN",{class:!0});var o=v(r);c&&c.l(o),o.forEach(f),this.h()},h(){$(r,"class","svelte-2ra37r")},m(t,s){Q(e,t,s),u(t,n,s),u(t,r,s),c&&c.m(r,null),o=!0},p(t,[n]){const r={};1&n&&(r.segment=t[0]),e.$set(r),c&&c.p&&2&n&&a(c,s,t,t[1],n,null,null)},i(t){o||(K(e.$$.fragment,t),K(c,t),o=!0)},o(t){G(e.$$.fragment,t),G(c,t),o=!1},d(t){Z(e,t),t&&f(n),t&&f(r),c&&c.d(t)}}}function ut(t,e,n){let{$$slots:r={},$$scope:o}=e,{segment:s}=e;return t.$$set=t=>{"segment"in t&&n(0,s=t.segment),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,r]}class ft extends nt{constructor(t){super(),et(this,t,ut,lt,c,{segment:0})}}function pt(t){let e,n,r=t[1].stack+"";return{c(){e=p("pre"),n=h(r)},l(t){e=y(t,"PRE",{});var o=v(e);n=_(o,r),o.forEach(f)},m(t,r){u(t,e,r),l(e,n)},p(t,e){2&e&&r!==(r=t[1].stack+"")&&E(n,r)},d(t){t&&f(e)}}}function ht(e){let n,r,o,s,c,i,a,g,S,x=e[1].message+"";document.title=n=e[0];let N=e[2]&&e[1].stack&&pt(e);return{c(){r=d(),o=p("h1"),s=h(e[0]),c=d(),i=p("p"),a=h(x),g=d(),N&&N.c(),S=m(),this.h()},l(t){w('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(f),r=b(t),o=y(t,"H1",{class:!0});var n=v(o);s=_(n,e[0]),n.forEach(f),c=b(t),i=y(t,"P",{class:!0});var l=v(i);a=_(l,x),l.forEach(f),g=b(t),N&&N.l(t),S=m(),this.h()},h(){$(o,"class","svelte-8od9u6"),$(i,"class","svelte-8od9u6")},m(t,e){u(t,r,e),u(t,o,e),l(o,s),u(t,c,e),u(t,i,e),l(i,a),u(t,g,e),N&&N.m(t,e),u(t,S,e)},p(t,[e]){1&e&&n!==(n=t[0])&&(document.title=n),1&e&&E(s,t[0]),2&e&&x!==(x=t[1].message+"")&&E(a,x),t[2]&&t[1].stack?N?N.p(t,e):(N=pt(t),N.c(),N.m(S.parentNode,S)):N&&(N.d(1),N=null)},i:t,o:t,d(t){t&&f(r),t&&f(o),t&&f(c),t&&f(i),t&&f(g),N&&N.d(t),t&&f(S)}}}function dt(t,e,n){let{status:r}=e,{error:o}=e;return t.$$set=t=>{"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,false]}class mt extends nt{constructor(t){super(),et(this,t,dt,ht,c,{status:0,error:1})}}function gt(t){let n,r,o;const s=[t[4].props];var c=t[4].component;function i(t){let n={};for(let t=0;t<s.length;t+=1)n=e(n,s[t]);return{props:n}}return c&&(n=new c(i())),{c(){n&&W(n.$$.fragment),r=m()},l(t){n&&X(n.$$.fragment,t),r=m()},m(t,e){n&&Q(n,t,e),u(t,r,e),o=!0},p(t,e){const o=16&e?Y(s,[F(t[4].props)]):{};if(c!==(c=t[4].component)){if(n){H();const t=n;G(t.$$.fragment,1,0,(()=>{Z(t,1)})),V()}c?(n=new c(i()),W(n.$$.fragment),K(n.$$.fragment,1),Q(n,r.parentNode,r)):n=null}else c&&n.$set(o)},i(t){o||(n&&K(n.$$.fragment,t),o=!0)},o(t){n&&G(n.$$.fragment,t),o=!1},d(t){t&&f(r),n&&Z(n,t)}}}function $t(t){let e,n;return e=new mt({props:{error:t[0],status:t[1]}}),{c(){W(e.$$.fragment)},l(t){X(e.$$.fragment,t)},m(t,r){Q(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i(t){n||(K(e.$$.fragment,t),n=!0)},o(t){G(e.$$.fragment,t),n=!1},d(t){Z(e,t)}}}function vt(t){let e,n,r,o;const s=[$t,gt],c=[];function i(t,e){return t[0]?0:1}return e=i(t),n=c[e]=s[e](t),{c(){n.c(),r=m()},l(t){n.l(t),r=m()},m(t,n){c[e].m(t,n),u(t,r,n),o=!0},p(t,o){let a=e;e=i(t),e===a?c[e].p(t,o):(H(),G(c[a],1,1,(()=>{c[a]=null})),V(),n=c[e],n?n.p(t,o):(n=c[e]=s[e](t),n.c()),K(n,1),n.m(r.parentNode,r))},i(t){o||(K(n),o=!0)},o(t){G(n),o=!1},d(t){c[e].d(t),t&&f(r)}}}function yt(t){let n,r;const o=[{segment:t[2][0]},t[3].props];let s={$$slots:{default:[vt]},$$scope:{ctx:t}};for(let t=0;t<o.length;t+=1)s=e(s,o[t]);return n=new ft({props:s}),{c(){W(n.$$.fragment)},l(t){X(n.$$.fragment,t)},m(t,e){Q(n,t,e),r=!0},p(t,[e]){const r=12&e?Y(o,[4&e&&{segment:t[2][0]},8&e&&F(t[3].props)]):{};147&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){r||(K(n.$$.fragment,t),r=!0)},o(t){G(n.$$.fragment,t),r=!1},d(t){Z(n,t)}}}function _t(t,e,n){let{stores:r}=e,{error:o}=e,{status:s}=e,{segments:c}=e,{level0:i}=e,{level1:a=null}=e,{notify:l}=e;var u,f,p;return u=l,R().$$.after_update.push(u),f=st,p=r,R().$$.context.set(f,p),t.$$set=t=>{"stores"in t&&n(5,r=t.stores),"error"in t&&n(0,o=t.error),"status"in t&&n(1,s=t.status),"segments"in t&&n(2,c=t.segments),"level0"in t&&n(3,i=t.level0),"level1"in t&&n(4,a=t.level1),"notify"in t&&n(6,l=t.notify)},[o,s,c,i,a,r,l]}class bt extends nt{constructor(t){super(),et(this,t,_t,yt,c,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6})}}const Et=[],St=[{js:()=>Promise.all([import("./index.f4ee9de4.js"),__inject_styles(["client-266e5d2b.css"])]).then((function(t){return t[0]}))},{js:()=>Promise.all([import("./documentation.b0b623f4.js"),__inject_styles(["client-266e5d2b.css"])]).then((function(t){return t[0]}))},{js:()=>Promise.all([import("./specification.34261fed.js"),__inject_styles(["client-266e5d2b.css"])]).then((function(t){return t[0]}))},{js:()=>Promise.all([import("./demo.ec5294d4.js"),__inject_styles(["client-266e5d2b.css"])]).then((function(t){return t[0]}))},{js:()=>Promise.all([import("./[slug].md.fd58339b.js"),__inject_styles(["client-266e5d2b.css"])]).then((function(t){return t[0]}))}],xt=(wt=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/documentation\/?$/,parts:[{i:1}]},{pattern:/^\/specification\/?$/,parts:[{i:2}]},{pattern:/^\/demo\/?$/,parts:[{i:3}]},{pattern:/^\/([^/]+?)\.md\/?$/,parts:[{i:4,params:t=>({slug:wt(t[1])})}]}]);var wt;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function Nt(t,e,n,r){return new(n||(n=Promise))((function(o,s){function c(t){try{a(r.next(t))}catch(t){s(t)}}function i(t){try{a(r.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,i)}a((r=r.apply(t,e||[])).next())}))}function Pt(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}let At,Rt=1;const Lt="undefined"!=typeof history?history:{pushState:()=>{},replaceState:()=>{},scrollRestoration:"auto"},jt={};let It,Ct;function Ot(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach((t=>{const[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(r):e[n]=r})),e}function Tt(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(It))return null;let e=t.pathname.slice(It.length);if(""===e&&(e="/"),!Et.some((t=>t.test(e))))for(let n=0;n<xt.length;n+=1){const r=xt[n],o=r.pattern.exec(e);if(o){const n=Ot(t.search),s=r.parts[r.parts.length-1],c=s.params?s.params(o):{},i={host:location.host,path:e,query:n,params:c};return{href:t.href,route:r,match:o,page:i}}}}function zt(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey||t.altKey)return;if(t.defaultPrevented)return;const e=Pt(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,r=String(n?e.href.baseVal:e.href);if(r===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const o=new URL(r);if(o.pathname===location.pathname&&o.search===location.search)return;const s=Tt(o);if(s){qt(s,null,e.hasAttribute("sapper:noscroll"),o.hash),t.preventDefault(),Lt.pushState({id:At},"",o.href)}}function kt(){return{x:pageXOffset,y:pageYOffset}}function Ut(t){if(jt[At]=kt(),t.state){const e=Tt(new URL(location.href));e?qt(e,t.state.id):location.href=location.href}else Rt=Rt+1,function(t){At=t}(Rt),Lt.replaceState({id:At},"",location.href)}function qt(t,e,n,r){return Nt(this,void 0,void 0,(function*(){const o=!!e;if(o)At=e;else{const t=kt();jt[At]=t,At=e=++Rt,jt[At]=n?t:{x:0,y:0}}if(yield Ct(t),document.activeElement&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),!n){let t,n=jt[e];r&&(t=document.getElementById(r.slice(1)),t&&(n={x:0,y:t.getBoundingClientRect().top+scrollY})),jt[At]=n,o||t?scrollTo(n.x,n.y):scrollTo(0,0)}}))}function Jt(t){let e=t.baseURI;if(!e){const n=t.getElementsByTagName("base");e=n.length?n[0].href:t.URL}return e}let Dt,Mt=null;function Bt(t){const e=Pt(t.target);e&&"prefetch"===e.rel&&function(t){const e=Tt(new URL(t,Jt(document)));if(e)Mt&&t===Mt.href||(Mt={href:t,promise:ce(e)}),Mt.promise}(e.href)}function Ht(t){clearTimeout(Dt),Dt=setTimeout((()=>{Bt(t)}),20)}function Vt(t,e={noscroll:!1,replaceState:!1}){const n=Tt(new URL(t,Jt(document)));return n?(Lt[e.replaceState?"replaceState":"pushState"]({id:At},"",t),qt(n,null,e.noscroll)):(location.href=t,new Promise((()=>{})))}const Kt="undefined"!=typeof __SAPPER__&&__SAPPER__;let Gt,Yt,Ft,Wt=!1,Xt=[],Qt="{}";const Zt={page:function(t){const e=ot(t);let n=!0;return{notify:function(){n=!0,e.update((t=>t))},set:function(t){n=!1,e.set(t)},subscribe:function(t){let r;return e.subscribe((e=>{(void 0===r||n&&e!==r)&&t(r=e)}))}}}({}),preloading:ot(null),session:ot(Kt&&Kt.session)};let te,ee,ne;function re(t,e){const{error:n}=t;return Object.assign({error:n},e)}function oe(t){return Nt(this,void 0,void 0,(function*(){Gt&&Zt.preloading.set(!0);const e=function(t){return Mt&&Mt.href===t.href?Mt.promise:ce(t)}(t),n=Yt={},r=yield e,{redirect:o}=r;if(n===Yt)if(o)yield Vt(o.location,{replaceState:!0});else{const{props:e,branch:n}=r;yield se(n,e,re(e,t.page))}}))}function se(t,e,n){return Nt(this,void 0,void 0,(function*(){Zt.page.set(n),Zt.preloading.set(!1),Gt?Gt.$set(e):(e.stores={page:{subscribe:Zt.page.subscribe},preloading:{subscribe:Zt.preloading.subscribe},session:Zt.session},e.level0={props:yield Ft},e.notify=Zt.page.notify,Gt=new bt({target:ne,props:e,hydrate:!0})),Xt=t,Qt=JSON.stringify(n.query),Wt=!0,ee=!1}))}function ce(t){return Nt(this,void 0,void 0,(function*(){const{route:e,page:n}=t,r=n.path.split("/").filter(Boolean);let o=null;const s={error:null,status:200,segments:[r[0]]},c={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(o&&(o.statusCode!==t||o.location!==e))throw new Error("Conflicting redirects");o={statusCode:t,location:e}},error:(t,e)=>{s.error="string"==typeof e?new Error(e):e,s.status=t}};if(!Ft){const t=()=>({});Ft=Kt.preloaded[0]||t.call(c,{host:n.host,path:n.path,query:n.query,params:{}},te)}let i,a=1;try{const o=JSON.stringify(n.query),l=e.pattern.exec(n.path);let u=!1;i=yield Promise.all(e.parts.map(((e,i)=>Nt(this,void 0,void 0,(function*(){const f=r[i];if(function(t,e,n,r){if(r!==Qt)return!0;const o=Xt[t];return!!o&&(e!==o.segment||!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0)}(i,f,l,o)&&(u=!0),s.segments[a]=r[i+1],!e)return{segment:f};const p=a++;if(!ee&&!u&&Xt[i]&&Xt[i].part===e.i)return Xt[i];u=!1;const{default:h,preload:d}=yield St[e.i].js();let m;return m=Wt||!Kt.preloaded[i+1]?d?yield d.call(c,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},te):{}:Kt.preloaded[i+1],s[`level${p}`]={component:h,props:m,segment:f,match:l,part:e.i}})))))}catch(t){s.error=t,s.status=500,i=[]}return{redirect:o,props:s,branch:i}}))}var ie,ae,le;Zt.session.subscribe((t=>Nt(void 0,void 0,void 0,(function*(){if(te=t,!Wt)return;ee=!0;const e=Tt(new URL(location.href)),n=Yt={},{redirect:r,props:o,branch:s}=yield ce(e);n===Yt&&(r?yield Vt(r.location,{replaceState:!0}):yield se(s,o,re(o,e.page)))})))),ie={target:document.querySelector("#sapper")},ae=ie.target,ne=ae,le=Kt.baseUrl,It=le,Ct=oe,"scrollRestoration"in Lt&&(Lt.scrollRestoration="manual"),addEventListener("beforeunload",(()=>{Lt.scrollRestoration="auto"})),addEventListener("load",(()=>{Lt.scrollRestoration="manual"})),addEventListener("click",zt),addEventListener("popstate",Ut),addEventListener("touchstart",Bt),addEventListener("mousemove",Ht),Kt.error?Promise.resolve().then((()=>function(){const{host:t,pathname:e,search:n}=location,{session:r,preloaded:o,status:s,error:c}=Kt;Ft||(Ft=o&&o[0]);const i={error:c,status:s,session:r,level0:{props:Ft},level1:{props:{status:s,error:c},component:mt},segments:o},a=Ot(n);se([],i,{host:t,path:e,query:a,params:{},error:c})}())):Promise.resolve().then((()=>{const{hash:t,href:e}=location;Lt.replaceState({id:Rt},"",e);const n=Tt(new URL(location.href));if(n)return qt(n,Rt,!0,t)}));export{E as A,Vt as B,N as H,nt as S,d as a,b,W as c,f as d,X as e,u as f,G as g,Z as h,et as i,m as j,p as k,y as l,Q as m,t as n,L as o,v as p,w as q,$ as r,c as s,K as t,x as u,l as v,S as w,g as x,h as y,_ as z};

import __inject_styles from './inject_styles.5607aec6.js';