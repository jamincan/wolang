function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}var r=n((function(e){var n=function(e){var n,r=Object.prototype,o=r.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new j(r||[]);return a._invoke=function(t,e,n){var r=h;return function(o,a){if(r===d)throw new Error("Generator is already running");if(r===v){if("throw"===o)throw a;return P()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=k(i,n);if(c){if(c===m)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var u=l(t,e,n);if("normal"===u.type){if(r=n.done?v:p,u.arg===m)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=v,n.method="throw",n.arg=u.arg)}}}(t,n,i),a}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var h="suspendedStart",p="suspendedYield",d="executing",v="completed",m={};function y(){}function g(){}function b(){}var $={};$[i]=function(){return this};var x=Object.getPrototypeOf,w=x&&x(x(O([])));w&&w!==r&&o.call(w,i)&&($=w);var _=b.prototype=y.prototype=Object.create($);function E(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function S(e,n){function r(a,i,c,u){var s=l(e[a],e,i);if("throw"!==s.type){var f=s.arg,h=f.value;return h&&"object"===t(h)&&o.call(h,"__await")?n.resolve(h.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(h).then((function(t){f.value=t,c(f)}),(function(t){return r("throw",t,c,u)}))}u(s.arg)}var a;this._invoke=function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return a=a?a.then(o,o):o()}}function k(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,k(t,e),"throw"===e.method))return m;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,m;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function O(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return a.next=a}}return{next:P}}function P(){return{value:n,done:!0}}return g.prototype=_.constructor=b,b.constructor=g,g.displayName=s(b,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,u,"GeneratorFunction")),t.prototype=Object.create(_),t},e.awrap=function(t){return{__await:t}},E(S.prototype),S.prototype[c]=function(){return this},e.AsyncIterator=S,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new S(f(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(_),s(_,u,"Generator"),_[i]=function(){return this},_.toString=function(){return"[object Generator]"},e.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(R),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return c.type="throw",c.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),s=o.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),R(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;R(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),m}},e}(e.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}}));function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}}(t,e)||a(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(e,n){return!n||"object"!==t(n)&&"function"!=typeof n?f(e):n}function h(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||a(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function v(t,e,n){return e&&d(t.prototype,e),n&&d(t,n),t}function m(){}function y(t,e){for(var n in e)t[n]=e[n];return t}function g(t){return t()}function b(){return Object.create(null)}function $(t){t.forEach(g)}function x(t){return"function"==typeof t}function w(e,n){return e!=e?n==n:e!==n||e&&"object"===t(e)||"function"==typeof e}function _(t,e,n,r){return t[1]&&r?y(n.ctx.slice(),t[1](r(e))):n.ctx}function E(e,n,r,o,a,i,c){var u=function(e,n,r,o){if(e[2]&&o){var a=e[2](o(r));if(void 0===n.dirty)return a;if("object"===t(a)){for(var i=[],c=Math.max(n.dirty.length,a.length),u=0;u<c;u+=1)i[u]=n.dirty[u]|a[u];return i}return n.dirty|a}return n.dirty}(n,o,a,i);if(u){var s=_(n,r,o,c);e.p(s,u)}}function S(t,e){t.appendChild(e)}function k(t,e,n){t.insertBefore(e,n||null)}function L(t){t.parentNode.removeChild(t)}function R(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function O(){return j(" ")}function P(){return j("")}function A(t,e,n,r){return t.addEventListener(e,n,r),function(){return t.removeEventListener(e,n,r)}}function N(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function I(t){return Array.from(t.childNodes)}function q(t,e,n,r){for(var o=0;o<t.length;o+=1){var a=t[o];if(a.nodeName===e){for(var i=0,c=[];i<a.attributes.length;){var u=a.attributes[i++];n[u.name]||c.push(u.name)}for(var s=0;s<c.length;s++)a.removeAttribute(c[s]);return t.splice(o,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):R(e)}function T(t,e){for(var n=0;n<t.length;n+=1){var r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return j(e)}function C(t){return T(t," ")}function D(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function U(t,e){t.value=null==e?"":e}function G(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function J(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;return Array.from(e.querySelectorAll(t))}var M,F=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;p(this,t),this.a=e,this.e=this.n=null}return v(t,[{key:"m",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.e||(this.e=R(e.nodeName),this.t=e,this.h(t)),this.i(n)}},{key:"h",value:function(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}},{key:"i",value:function(t){for(var e=0;e<this.n.length;e+=1)k(this.t,this.n[e],t)}},{key:"p",value:function(t){this.d(),this.h(t),this.i(this.a)}},{key:"d",value:function(){this.n.forEach(L)}}]),t}();function B(t){M=t}function H(){if(!M)throw new Error("Function called outside component initialization");return M}function K(t){H().$$.on_mount.push(t)}var V=[],Y=[],z=[],W=[],X=Promise.resolve(),Q=!1;function Z(t){z.push(t)}var tt=!1,et=new Set;function nt(){if(!tt){tt=!0;do{for(var t=0;t<V.length;t+=1){var e=V[t];B(e),rt(e.$$)}for(B(null),V.length=0;Y.length;)Y.pop()();for(var n=0;n<z.length;n+=1){var r=z[n];et.has(r)||(et.add(r),r())}z.length=0}while(V.length);for(;W.length;)W.pop()();Q=!1,tt=!1,et.clear()}}function rt(t){if(null!==t.fragment){t.update(),$(t.before_update);var e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Z)}}var ot,at=new Set;function it(){ot={r:0,c:[],p:ot}}function ct(){ot.r||$(ot.c),ot=ot.p}function ut(t,e){t&&t.i&&(at.delete(t),t.i(e))}function st(t,e,n,r){if(t&&t.o){if(at.has(t))return;at.add(t),ot.c.push((function(){at.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function ft(t,e){for(var n={},r={},o={$$scope:1},a=t.length;a--;){var i=t[a],c=e[a];if(c){for(var u in i)u in c||(r[u]=1);for(var s in c)o[s]||(n[s]=c[s],o[s]=1);t[a]=c}else for(var f in i)o[f]=1}for(var l in r)l in n||(n[l]=void 0);return n}function lt(e){return"object"===t(e)&&null!==e?e:{}}function ht(t){t&&t.c()}function pt(t,e){t&&t.l(e)}function dt(t,e,n){var r=t.$$,o=r.fragment,a=r.on_mount,i=r.on_destroy,c=r.after_update;o&&o.m(e,n),Z((function(){var e=a.map(g).filter(x);i?i.push.apply(i,h(e)):$(e),t.$$.on_mount=[]})),c.forEach(Z)}function vt(t,e){var n=t.$$;null!==n.fragment&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function mt(t,e){-1===t.$$.dirty[0]&&(V.push(t),Q||(Q=!0,X.then(nt)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function yt(t,e,n,r,o,a){var i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[-1],c=M;B(t);var u=e.props||{},s=t.$$={fragment:null,ctx:null,props:a,update:m,not_equal:o,bound:b(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:b(),dirty:i,skip_bound:!1},f=!1;if(s.ctx=n?n(t,u,(function(e,n){var r=!(arguments.length<=2)&&arguments.length-2?arguments.length<=2?void 0:arguments[2]:n;return s.ctx&&o(s.ctx[e],s.ctx[e]=r)&&(!s.skip_bound&&s.bound[e]&&s.bound[e](r),f&&mt(t,e)),n})):[],s.update(),f=!0,$(s.before_update),s.fragment=!!r&&r(s.ctx),e.target){if(e.hydrate){var l=I(e.target);s.fragment&&s.fragment.l(l),l.forEach(L)}else s.fragment&&s.fragment.c();e.intro&&ut(t.$$.fragment),dt(t,e.target,e.anchor),nt()}B(c)}var gt=function(){function t(){p(this,t)}return v(t,[{key:"$destroy",value:function(){vt(this,1),this.$destroy=m}},{key:"$on",value:function(t,e){var n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),function(){var t=n.indexOf(e);-1!==t&&n.splice(t,1)}}},{key:"$set",value:function(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}]),t}(),bt=[];function $t(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,r=[];function o(n){if(w(t,n)&&(t=n,e)){for(var o=!bt.length,a=0;a<r.length;a+=1){var i=r[a];i[1](),bt.push(i,t)}if(o){for(var c=0;c<bt.length;c+=2)bt[c][0](bt[c+1]);bt.length=0}}}function a(e){o(e(t))}function i(a){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,c=[a,i];return r.push(c),1===r.length&&(e=n(o)||m),a(t),function(){var t=r.indexOf(c);-1!==t&&r.splice(t,1),0===r.length&&(e(),e=null)}}return{set:o,update:a,subscribe:i}}var xt={};function wt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function _t(t){var e,n,r,o,a,c,u,s,f,l,h,p,d,v,y,g,b,$,x,w,_,E,P,A,D,U,G;return{c:function(){e=R("header"),n=R("h1"),r=R("strong"),o=j("wo"),a=j("lang"),c=O(),u=R("nav"),s=R("ul"),f=R("li"),l=R("a"),h=j("Main"),d=O(),v=R("li"),y=R("a"),g=j("Documentation"),$=O(),x=R("li"),w=R("a"),_=j("Specification"),P=O(),A=R("li"),D=R("a"),U=j("Demo"),this.h()},l:function(t){var i=I(e=q(t,"HEADER",{class:!0})),p=I(n=q(i,"H1",{class:!0})),m=I(r=q(p,"STRONG",{class:!0}));o=T(m,"wo"),m.forEach(L),a=T(p,"lang"),p.forEach(L),i.forEach(L),c=C(t);var b=I(u=q(t,"NAV",{class:!0})),E=I(s=q(b,"UL",{class:!0})),S=I(f=q(E,"LI",{class:!0})),k=I(l=q(S,"A",{rel:!0,"aria-current":!0,href:!0,class:!0}));h=T(k,"Main"),k.forEach(L),S.forEach(L),d=C(E);var R=I(v=q(E,"LI",{class:!0})),j=I(y=q(R,"A",{rel:!0,"aria-current":!0,href:!0,class:!0}));g=T(j,"Documentation"),j.forEach(L),R.forEach(L),$=C(E);var O=I(x=q(E,"LI",{class:!0})),N=I(w=q(O,"A",{rel:!0,"aria-current":!0,href:!0,class:!0}));_=T(N,"Specification"),N.forEach(L),O.forEach(L),P=C(E);var G=I(A=q(E,"LI",{class:!0})),J=I(D=q(G,"A",{"aria-current":!0,href:!0,class:!0}));U=T(J,"Demo"),J.forEach(L),G.forEach(L),E.forEach(L),b.forEach(L),this.h()},h:function(){N(r,"class","svelte-1xqd6nb"),N(n,"class","svelte-1xqd6nb"),N(e,"class","svelte-1xqd6nb"),N(l,"rel","prefetch"),N(l,"aria-current",p=void 0===t[0]?"page":void 0),N(l,"href","."),N(l,"class","svelte-1xqd6nb"),N(f,"class","svelte-1xqd6nb"),N(y,"rel","prefetch"),N(y,"aria-current",b="documentation"===t[0]?"page":void 0),N(y,"href","documentation"),N(y,"class","svelte-1xqd6nb"),N(v,"class","svelte-1xqd6nb"),N(w,"rel","prefetch"),N(w,"aria-current",E="specification"===t[0]?"page":void 0),N(w,"href","specification"),N(w,"class","svelte-1xqd6nb"),N(x,"class","svelte-1xqd6nb"),N(D,"aria-current",G="demo"===t[0]?"page":void 0),N(D,"href","demo"),N(D,"class","svelte-1xqd6nb"),N(A,"class","svelte-1xqd6nb"),N(s,"class","svelte-1xqd6nb"),N(u,"class","svelte-1xqd6nb")},m:function(t,i){k(t,e,i),S(e,n),S(n,r),S(r,o),S(n,a),k(t,c,i),k(t,u,i),S(u,s),S(s,f),S(f,l),S(l,h),S(s,d),S(s,v),S(v,y),S(y,g),S(s,$),S(s,x),S(x,w),S(w,_),S(s,P),S(s,A),S(A,D),S(D,U)},p:function(t,e){var n=i(e,1)[0];1&n&&p!==(p=void 0===t[0]?"page":void 0)&&N(l,"aria-current",p),1&n&&b!==(b="documentation"===t[0]?"page":void 0)&&N(y,"aria-current",b),1&n&&E!==(E="specification"===t[0]?"page":void 0)&&N(w,"aria-current",E),1&n&&G!==(G="demo"===t[0]?"page":void 0)&&N(D,"aria-current",G)},i:m,o:m,d:function(t){t&&L(e),t&&L(c),t&&L(u)}}}function Et(t,e,n){var r=e.segment;return t.$$set=function(t){"segment"in t&&n(0,r=t.segment)},[r]}var St=function(t){s(n,gt);var e=wt(n);function n(t){var r;return p(this,n),yt(f(r=e.call(this)),t,Et,_t,w,{segment:0}),r}return n}();function kt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function Lt(t){var e,n,r,o;e=new St({props:{segment:t[0]}});var a=t[2].default,c=function(t,e,n,r){if(t){var o=_(t,e,n,r);return t[0](o)}}(a,t,t[1],null);return{c:function(){ht(e.$$.fragment),n=O(),r=R("main"),c&&c.c(),this.h()},l:function(t){pt(e.$$.fragment,t),n=C(t);var o=I(r=q(t,"MAIN",{class:!0}));c&&c.l(o),o.forEach(L),this.h()},h:function(){N(r,"class","svelte-i85okc")},m:function(t,a){dt(e,t,a),k(t,n,a),k(t,r,a),c&&c.m(r,null),o=!0},p:function(t,n){var r=i(n,1)[0],o={};1&r&&(o.segment=t[0]),e.$set(o),c&&c.p&&2&r&&E(c,a,t,t[1],r,null,null)},i:function(t){o||(ut(e.$$.fragment,t),ut(c,t),o=!0)},o:function(t){st(e.$$.fragment,t),st(c,t),o=!1},d:function(t){vt(e,t),t&&L(n),t&&L(r),c&&c.d(t)}}}function Rt(t,e,n){var r=e.$$slots,o=void 0===r?{}:r,a=e.$$scope,i=e.segment;return t.$$set=function(t){"segment"in t&&n(0,i=t.segment),"$$scope"in t&&n(1,a=t.$$scope)},[i,a,o]}var jt=function(t){s(n,gt);var e=kt(n);function n(t){var r;return p(this,n),yt(f(r=e.call(this)),t,Rt,Lt,w,{segment:0}),r}return n}();function Ot(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function Pt(t){var e,n,r=t[1].stack+"";return{c:function(){e=R("pre"),n=j(r)},l:function(t){var o=I(e=q(t,"PRE",{}));n=T(o,r),o.forEach(L)},m:function(t,r){k(t,e,r),S(e,n)},p:function(t,e){2&e&&r!==(r=t[1].stack+"")&&D(n,r)},d:function(t){t&&L(e)}}}function At(t){var e,n,r,o,a,c,u,s,f,l=t[1].message+"";document.title=e=t[0];var h=t[2]&&t[1].stack&&Pt(t);return{c:function(){n=O(),r=R("h1"),o=j(t[0]),a=O(),c=R("p"),u=j(l),s=O(),h&&h.c(),f=P(),this.h()},l:function(e){J('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(L),n=C(e);var i=I(r=q(e,"H1",{class:!0}));o=T(i,t[0]),i.forEach(L),a=C(e);var p=I(c=q(e,"P",{class:!0}));u=T(p,l),p.forEach(L),s=C(e),h&&h.l(e),f=P(),this.h()},h:function(){N(r,"class","svelte-8od9u6"),N(c,"class","svelte-8od9u6")},m:function(t,e){k(t,n,e),k(t,r,e),S(r,o),k(t,a,e),k(t,c,e),S(c,u),k(t,s,e),h&&h.m(t,e),k(t,f,e)},p:function(t,n){var r=i(n,1)[0];1&r&&e!==(e=t[0])&&(document.title=e),1&r&&D(o,t[0]),2&r&&l!==(l=t[1].message+"")&&D(u,l),t[2]&&t[1].stack?h?h.p(t,r):((h=Pt(t)).c(),h.m(f.parentNode,f)):h&&(h.d(1),h=null)},i:m,o:m,d:function(t){t&&L(n),t&&L(r),t&&L(a),t&&L(c),t&&L(s),h&&h.d(t),t&&L(f)}}}function Nt(t,e,n){var r=e.status,o=e.error;return t.$$set=function(t){"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,false]}var It=function(t){s(n,gt);var e=Ot(n);function n(t){var r;return p(this,n),yt(f(r=e.call(this)),t,Nt,At,w,{status:0,error:1}),r}return n}();function qt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function Tt(t){var e,n,r,o=[t[4].props],a=t[4].component;function i(t){for(var e={},n=0;n<o.length;n+=1)e=y(e,o[n]);return{props:e}}return a&&(e=new a(i())),{c:function(){e&&ht(e.$$.fragment),n=P()},l:function(t){e&&pt(e.$$.fragment,t),n=P()},m:function(t,o){e&&dt(e,t,o),k(t,n,o),r=!0},p:function(t,r){var c=16&r?ft(o,[lt(t[4].props)]):{};if(a!==(a=t[4].component)){if(e){it();var u=e;st(u.$$.fragment,1,0,(function(){vt(u,1)})),ct()}a?(ht((e=new a(i())).$$.fragment),ut(e.$$.fragment,1),dt(e,n.parentNode,n)):e=null}else a&&e.$set(c)},i:function(t){r||(e&&ut(e.$$.fragment,t),r=!0)},o:function(t){e&&st(e.$$.fragment,t),r=!1},d:function(t){t&&L(n),e&&vt(e,t)}}}function Ct(t){var e,n;return e=new It({props:{error:t[0],status:t[1]}}),{c:function(){ht(e.$$.fragment)},l:function(t){pt(e.$$.fragment,t)},m:function(t,r){dt(e,t,r),n=!0},p:function(t,n){var r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i:function(t){n||(ut(e.$$.fragment,t),n=!0)},o:function(t){st(e.$$.fragment,t),n=!1},d:function(t){vt(e,t)}}}function Dt(t){var e,n,r,o,a=[Ct,Tt],i=[];function c(t,e){return t[0]?0:1}return e=c(t),n=i[e]=a[e](t),{c:function(){n.c(),r=P()},l:function(t){n.l(t),r=P()},m:function(t,n){i[e].m(t,n),k(t,r,n),o=!0},p:function(t,o){var u=e;(e=c(t))===u?i[e].p(t,o):(it(),st(i[u],1,1,(function(){i[u]=null})),ct(),(n=i[e])?n.p(t,o):(n=i[e]=a[e](t)).c(),ut(n,1),n.m(r.parentNode,r))},i:function(t){o||(ut(n),o=!0)},o:function(t){st(n),o=!1},d:function(t){i[e].d(t),t&&L(r)}}}function Ut(t){for(var e,n,r=[{segment:t[2][0]},t[3].props],o={$$slots:{default:[Dt]},$$scope:{ctx:t}},a=0;a<r.length;a+=1)o=y(o,r[a]);return e=new jt({props:o}),{c:function(){ht(e.$$.fragment)},l:function(t){pt(e.$$.fragment,t)},m:function(t,r){dt(e,t,r),n=!0},p:function(t,n){var o=i(n,1)[0],a=12&o?ft(r,[4&o&&{segment:t[2][0]},8&o&&lt(t[3].props)]):{};147&o&&(a.$$scope={dirty:o,ctx:t}),e.$set(a)},i:function(t){n||(ut(e.$$.fragment,t),n=!0)},o:function(t){st(e.$$.fragment,t),n=!1},d:function(t){vt(e,t)}}}function Gt(t,e,n){var r,o,a,i=e.stores,c=e.error,u=e.status,s=e.segments,f=e.level0,l=e.level1,h=void 0===l?null:l,p=e.notify;return r=p,H().$$.after_update.push(r),o=xt,a=i,H().$$.context.set(o,a),t.$$set=function(t){"stores"in t&&n(5,i=t.stores),"error"in t&&n(0,c=t.error),"status"in t&&n(1,u=t.status),"segments"in t&&n(2,s=t.segments),"level0"in t&&n(3,f=t.level0),"level1"in t&&n(4,h=t.level1),"notify"in t&&n(6,p=t.notify)},[c,u,s,f,h,i,p]}var Jt,Mt=function(t){s(n,gt);var e=qt(n);function n(t){var r;return p(this,n),yt(f(r=e.call(this)),t,Gt,Ut,w,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6}),r}return n}(),Ft=[],Bt=[{js:function(){return Promise.all([import("./index.aacbd486.js"),__inject_styles(["client-ddff8598.css"])]).then((function(t){return t[0]}))}},{js:function(){return Promise.all([import("./documentation.f031f8d9.js"),__inject_styles(["client-ddff8598.css"])]).then((function(t){return t[0]}))}},{js:function(){return Promise.all([import("./specification.cc1e10a2.js"),__inject_styles(["client-ddff8598.css"])]).then((function(t){return t[0]}))}},{js:function(){return Promise.all([import("./demo.2067a805.js"),__inject_styles(["client-ddff8598.css"])]).then((function(t){return t[0]}))}},{js:function(){return Promise.all([import("./[slug].md.ecb0a132.js"),__inject_styles(["client-ddff8598.css"])]).then((function(t){return t[0]}))}}],Ht=(Jt=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/documentation\/?$/,parts:[{i:1}]},{pattern:/^\/specification\/?$/,parts:[{i:2}]},{pattern:/^\/demo\/?$/,parts:[{i:3}]},{pattern:/^\/([^/]+?)\.md\/?$/,parts:[{i:4,params:function(t){return{slug:Jt(t[1])}}}]}]);
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
function Kt(t,e,n,r){return new(n||(n=Promise))((function(o,a){function i(t){try{u(r.next(t))}catch(t){a(t)}}function c(t){try{u(r.throw(t))}catch(t){a(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,c)}u((r=r.apply(t,e||[])).next())}))}function Vt(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}var Yt,zt=1;var Wt,Xt,Qt="undefined"!=typeof history?history:{pushState:function(){},replaceState:function(){},scrollRestoration:"auto"},Zt={};function te(e){var n=Object.create(null);return e.length>0&&e.slice(1).split("&").forEach((function(e){var r=i(/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(e.replace(/\+/g," "))),3),o=r[1],a=r[2],c=void 0===a?"":a;"string"==typeof n[o]&&(n[o]=[n[o]]),"object"===t(n[o])?n[o].push(c):n[o]=c})),n}function ee(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(Wt))return null;var e=t.pathname.slice(Wt.length);if(""===e&&(e="/"),!Ft.some((function(t){return t.test(e)})))for(var n=0;n<Ht.length;n+=1){var r=Ht[n],o=r.pattern.exec(e);if(o){var a=te(t.search),i=r.parts[r.parts.length-1],c=i.params?i.params(o):{},u={host:location.host,path:e,query:a,params:c};return{href:t.href,route:r,match:o,page:u}}}}function ne(e){if(1===function(t){return null===t.which?t.button:t.which}(e)&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.defaultPrevented)){var n=Vt(e.target);if(n&&n.href){var r="object"===t(n.href)&&"SVGAnimatedString"===n.href.constructor.name,o=String(r?n.href.baseVal:n.href);if(o!==location.href){if(!n.hasAttribute("download")&&"external"!==n.getAttribute("rel")&&!(r?n.target.baseVal:n.target)){var a=new URL(o);if(a.pathname!==location.pathname||a.search!==location.search){var i=ee(a);if(i)ae(i,null,n.hasAttribute("sapper:noscroll"),a.hash),e.preventDefault(),Qt.pushState({id:Yt},"",a.href)}}}else location.hash||e.preventDefault()}}}function re(){return{x:pageXOffset,y:pageYOffset}}function oe(t){if(Zt[Yt]=re(),t.state){var e=ee(new URL(location.href));e?ae(e,t.state.id):location.href=location.href}else(function(t){Yt=t})(zt=zt+1),Qt.replaceState({id:Yt},"",location.href)}function ae(t,e,n,o){return Kt(this,void 0,void 0,r.mark((function a(){var i,c,u,s;return r.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return(i=!!e)?Yt=e:(c=re(),Zt[Yt]=c,Yt=e=++zt,Zt[Yt]=n?c:{x:0,y:0}),r.next=4,Xt(t);case 4:document.activeElement&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),n||(u=Zt[e],o&&(s=document.getElementById(o.slice(1)))&&(u={x:0,y:s.getBoundingClientRect().top+scrollY}),Zt[Yt]=u,i||s?scrollTo(u.x,u.y):scrollTo(0,0));case 6:case"end":return r.stop()}}),a)})))}function ie(t){var e=t.baseURI;if(!e){var n=t.getElementsByTagName("base");e=n.length?n[0].href:t.URL}return e}var ce,ue=null;function se(t){return ue&&ue.href===t.href?ue.promise:Pe(t)}function fe(t){var e=Vt(t.target);e&&"prefetch"===e.rel&&function(t){var e=ee(new URL(t,ie(document)));if(e)ue&&t===ue.href||(ue={href:t,promise:Pe(e)}),ue.promise}(e.href)}function le(t){clearTimeout(ce),ce=setTimeout((function(){fe(t)}),20)}function he(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{noscroll:!1,replaceState:!1},n=ee(new URL(t,ie(document)));return n?(Qt[e.replaceState?"replaceState":"pushState"]({id:Yt},"",t),ae(n,null,e.noscroll)):(location.href=t,new Promise((function(){})))}var pe,de,ve,me,ye,ge,be,$e,xe,we="undefined"!=typeof __SAPPER__&&__SAPPER__,_e=!1,Ee=[],Se="{}",ke={page:function(t){var e=$t(t),n=!0;return{notify:function(){n=!0,e.update((function(t){return t}))},set:function(t){n=!1,e.set(t)},subscribe:function(t){var r;return e.subscribe((function(e){(void 0===r||n&&e!==r)&&t(r=e)}))}}}({}),preloading:$t(null),session:$t(we&&we.session)};function Le(t,e){var n=t.error;return Object.assign({error:n},e)}function Re(t){return Kt(this,void 0,void 0,r.mark((function e(){var n,o,a,i,c,u;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return pe&&ke.preloading.set(!0),n=se(t),o=de={},e.next=5,n;case 5:if(a=e.sent,i=a.redirect,o===de){e.next=9;break}return e.abrupt("return");case 9:if(!i){e.next=14;break}return e.next=12,he(i.location,{replaceState:!0});case 12:e.next=17;break;case 14:return c=a.props,u=a.branch,e.next=17,je(u,c,Le(c,t.page));case 17:case"end":return e.stop()}}),e)})))}function je(t,e,n){return Kt(this,void 0,void 0,r.mark((function o(){return r.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(ke.page.set(n),ke.preloading.set(!1),!pe){r.next=6;break}pe.$set(e),r.next=13;break;case 6:return e.stores={page:{subscribe:ke.page.subscribe},preloading:{subscribe:ke.preloading.subscribe},session:ke.session},r.next=9,ve;case 9:r.t0=r.sent,e.level0={props:r.t0},e.notify=ke.page.notify,pe=new Mt({target:ge,props:e,hydrate:!0});case 13:Ee=t,Se=JSON.stringify(n.query),_e=!0,ye=!1;case 17:case"end":return r.stop()}}),o)})))}function Oe(t,e,n,r){if(r!==Se)return!0;var o=Ee[t];return!!o&&(e!==o.segment||(!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0))}function Pe(t){return Kt(this,void 0,void 0,r.mark((function e(){var n,o,a,i,c,u,s,f,l,h,p,d,v=this;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.route,o=t.page,a=o.path.split("/").filter(Boolean),i=null,c={error:null,status:200,segments:[a[0]]},u={fetch:function(t){function e(e,n){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t,e){return fetch(t,e)})),redirect:function(t,e){if(i&&(i.statusCode!==t||i.location!==e))throw new Error("Conflicting redirects");i={statusCode:t,location:e}},error:function(t,e){c.error="string"==typeof e?new Error(e):e,c.status=t}},ve||(s=function(){return{}},ve=we.preloaded[0]||s.call(u,{host:o.host,path:o.path,query:o.query,params:{}},me)),l=1,e.prev=7,h=JSON.stringify(o.query),p=n.pattern.exec(o.path),d=!1,e.next=13,Promise.all(n.parts.map((function(e,n){return Kt(v,void 0,void 0,r.mark((function i(){var s,f,v,m,y,g;return r.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s=a[n],Oe(n,s,p,h)&&(d=!0),c.segments[l]=a[n+1],e){r.next=5;break}return r.abrupt("return",{segment:s});case 5:if(f=l++,ye||d||!Ee[n]||Ee[n].part!==e.i){r.next=8;break}return r.abrupt("return",Ee[n]);case 8:return d=!1,r.next=11,Bt[e.i].js();case 11:if(v=r.sent,m=v.default,y=v.preload,!_e&&we.preloaded[n+1]){r.next=25;break}if(!y){r.next=21;break}return r.next=18,y.call(u,{host:o.host,path:o.path,query:o.query,params:e.params?e.params(t.match):{}},me);case 18:r.t0=r.sent,r.next=22;break;case 21:r.t0={};case 22:g=r.t0,r.next=26;break;case 25:g=we.preloaded[n+1];case 26:return r.abrupt("return",c["level".concat(f)]={component:m,props:g,segment:s,match:p,part:e.i});case 27:case"end":return r.stop()}}),i)})))})));case 13:f=e.sent,e.next=21;break;case 16:e.prev=16,e.t0=e.catch(7),c.error=e.t0,c.status=500,f=[];case 21:return e.abrupt("return",{redirect:i,props:c,branch:f});case 22:case"end":return e.stop()}}),e,null,[[7,16]])})))}ke.session.subscribe((function(t){return Kt(void 0,void 0,void 0,r.mark((function e(){var n,o,a,i,c,u;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(me=t,_e){e.next=3;break}return e.abrupt("return");case 3:return ye=!0,n=ee(new URL(location.href)),o=de={},e.next=8,Pe(n);case 8:if(a=e.sent,i=a.redirect,c=a.props,u=a.branch,o===de){e.next=14;break}return e.abrupt("return");case 14:if(!i){e.next=19;break}return e.next=17,he(i.location,{replaceState:!0});case 17:e.next=21;break;case 19:return e.next=21,je(u,c,Le(c,n.page));case 21:case"end":return e.stop()}}),e)})))})),be={target:document.querySelector("#sapper")},$e=be.target,ge=$e,xe=we.baseUrl,Wt=xe,Xt=Re,"scrollRestoration"in Qt&&(Qt.scrollRestoration="manual"),addEventListener("beforeunload",(function(){Qt.scrollRestoration="auto"})),addEventListener("load",(function(){Qt.scrollRestoration="manual"})),addEventListener("click",ne),addEventListener("popstate",oe),addEventListener("touchstart",fe),addEventListener("mousemove",le),we.error?Promise.resolve().then((function(){return function(){var t=location,e=t.host,n=t.pathname,r=t.search,o=we.session,a=we.preloaded,i=we.status,c=we.error;ve||(ve=a&&a[0]);var u={error:c,status:i,session:o,level0:{props:ve},level1:{props:{status:i,error:c},component:It},segments:a},s=te(r);je([],u,{host:e,path:n,query:s,params:{},error:c})}()})):Promise.resolve().then((function(){var t=location,e=t.hash,n=t.href;Qt.replaceState({id:zt},"",n);var r=ee(new URL(location.href));if(r)return ae(r,zt,!0,e)}));export{I as A,u as B,v as C,h as D,t as E,N as F,G,F as H,S as I,U as J,A as K,j as L,T as M,D as N,he as O,gt as S,s as _,c as a,l as b,p as c,f as d,O as e,ht as f,L as g,C as h,yt as i,pt as j,k,i as l,dt as m,st as n,vt as o,n as p,J as q,r,w as s,ut as t,e as u,P as v,m as w,K as x,R as y,q as z};

import __inject_styles from './inject_styles.fe622066.js';