!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.EmailHunter=t():e.EmailHunter=t()}(global,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.w={},n(n.s=46)}([function(e,t,n){"use strict";var r=n(13),o=n(43),s=Object.prototype.toString;function i(e){return"[object Array]"===s.call(e)}function a(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===s.call(e)}function c(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},function(e,t,n){"use strict";var r=n(0),o=n(41),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,u={adapter:("undefined"!=typeof XMLHttpRequest?a=n(40):"undefined"!=typeof process&&(a=n(35)),a),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){u.headers[e]={}}),r.forEach(["post","put","patch"],function(e){u.headers[e]=r.merge(s)}),e.exports=u},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){function r(e){var n;function r(){if(r.enabled){var e=r,o=+new Date,s=o-(n||o);e.diff=s,e.prev=n,e.curr=o,n=o;for(var i=new Array(arguments.length),a=0;a<i.length;a++)i[a]=arguments[a];i[0]=t.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var u=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;u++;var o=t.formatters[r];if("function"==typeof o){var s=i[u];n=o.call(e,s),i.splice(u,1),u--}return n}),t.formatArgs.call(e,i),(r.log||t.log||console.log.bind(console)).apply(e,i)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var n,r=0;for(n in e)r=(r<<5)-r+e.charCodeAt(n),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),r.destroy=o,"function"==typeof t.init&&t.init(r),t.instances.push(r),r}function o(){var e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}(t=e.exports=r.debug=r.default=r).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){var n;t.save(e),t.names=[],t.skips=[];var r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&("-"===(e=r[n].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(n=0;n<t.instances.length;n++){var s=t.instances[n];s.enabled=t.enabled(s.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;var n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(30),t.instances=[],t.names=[],t.skips=[],t.formatters={}},function(e,t){e.exports=require("url")},function(e,t,n){var r=n(6),o=n(9),s=n(8),i=n(34),a=n(33).Writable,u=n(32)("follow-redirects"),c={GET:!0,HEAD:!0,OPTIONS:!0,TRACE:!0},f=Object.create(null);function p(e,t){a.call(this),e.headers=e.headers||{},this._options=e,this._redirectCount=0,this._requestBodyLength=0,this._requestBodyBuffers=[],t&&this.on("response",t);var n=this;if(this._onNativeResponse=function(e){n._processResponse(e)},!e.pathname&&e.path){var r=e.path.indexOf("?");r<0?e.pathname=e.path:(e.pathname=e.path.substring(0,r),e.search=e.path.substring(r))}this._performRequest()}function l(e){var t={maxRedirects:21,maxBodyLength:10485760},n={};return Object.keys(e).forEach(function(o){var s=o+":",a=n[s]=e[o],c=t[o]=Object.create(a);c.request=function(e,o){return"string"==typeof e?(e=r.parse(e)).maxRedirects=t.maxRedirects:e=Object.assign({protocol:s,maxRedirects:t.maxRedirects,maxBodyLength:t.maxBodyLength},e),e.nativeProtocols=n,i.equal(e.protocol,s,"protocol mismatch"),u("options",e),new p(e,o)},c.get=function(e,t){var n=c.request(e,t);return n.end(),n}}),t}["abort","aborted","error","socket","timeout"].forEach(function(e){f[e]=function(t){this._redirectable.emit(e,t)}}),p.prototype=Object.create(a.prototype),p.prototype.write=function(e,t,n){this._requestBodyLength+e.length<=this._options.maxBodyLength?(this._requestBodyLength+=e.length,this._requestBodyBuffers.push({data:e,encoding:t}),this._currentRequest.write(e,t,n)):(this.emit("error",new Error("Request body larger than maxBodyLength limit")),this.abort())},p.prototype.end=function(e,t,n){var r=this._currentRequest;e?this.write(e,t,function(){r.end(null,null,n)}):r.end(null,null,n)},p.prototype.setHeader=function(e,t){this._options.headers[e]=t,this._currentRequest.setHeader(e,t)},p.prototype.removeHeader=function(e){delete this._options.headers[e],this._currentRequest.removeHeader(e)},["abort","flushHeaders","getHeader","setNoDelay","setSocketKeepAlive","setTimeout"].forEach(function(e){p.prototype[e]=function(t,n){return this._currentRequest[e](t,n)}}),["aborted","connection","socket"].forEach(function(e){Object.defineProperty(p.prototype,e,{get:function(){return this._currentRequest[e]}})}),p.prototype._performRequest=function(){var e=this._options.protocol,t=this._options.nativeProtocols[e];if(this._options.agents){var n=e.substr(0,e.length-1);this._options.agent=this._options.agents[n]}var o=this._currentRequest=t.request(this._options,this._onNativeResponse);for(var s in this._currentUrl=r.format(this._options),o._redirectable=this,f)s&&o.on(s,f[s]);if(this._isRedirect){var i=this._requestBodyBuffers;!function e(){if(0!==i.length){var t=i.pop();o.write(t.data,t.encoding,e)}else o.end()}()}},p.prototype._processResponse=function(e){var t=e.headers.location;if(t&&!1!==this._options.followRedirects&&e.statusCode>=300&&e.statusCode<400){if(++this._redirectCount>this._options.maxRedirects)return void this.emit("error",new Error("Max redirects exceeded."));var n,o=this._options.headers;if(307!==e.statusCode&&!(this._options.method in c))for(n in this._options.method="GET",this._requestBodyBuffers=[],o)/^content-/i.test(n)&&delete o[n];if(!this._isRedirect)for(n in o)/^host$/i.test(n)&&delete o[n];var s=r.resolve(this._currentUrl,t);u("redirecting to",s),Object.assign(this._options,r.parse(s)),this._isRedirect=!0,this._performRequest()}else e.responseUrl=this._currentUrl,this.emit("response",e),this._requestBodyBuffers=[]},e.exports=l({http:o,https:s}),e.exports.wrap=l},function(e,t){e.exports=require("https")},function(e,t){e.exports=require("http")},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(r.isURLSearchParams(t))s=t.toString();else{var i=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(1);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t}return r(e,[{key:"list",value:function(e,t){return this.parent.run({type:"leads_lists",options:e,callback:t})}},{key:"retrieve",value:function(e,t){return this.parent.run({type:"leads_lists",id:e,callback:t})}},{key:"create",value:function(e,t){return this.parent.run({action:"POST",type:"leads_lists",options:e,callback:t})}},{key:"update",value:function(e,t,n){return this.parent.run({action:"PUT",type:"leads_lists",id:e,options:t,callback:n})}},{key:"delete",value:function(e,t){return this.parent.run({action:"DELETE",type:"leads_lists",id:e,callback:t})}}]),e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t}return r(e,[{key:"list",value:function(e,t){return this.parent.run({type:"leads",options:e,callback:t})}},{key:"retrieve",value:function(e,t){return this.parent.run({type:"leads",id:e,callback:t})}},{key:"create",value:function(e,t){return this.parent.run({action:"POST",type:"leads",options:e,callback:t})}},{key:"update",value:function(e,t,n){return this.parent.run({action:"PUT",type:"leads",id:e,options:t,callback:n})}},{key:"delete",value:function(e,t){return this.parent.run({action:"DELETE",type:"leads",id:e,callback:t})}}]),e}();t.default=o},function(e,t){e.exports=require("querystring")},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";var r=n(3);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";var r=n(0),o=n(21),s=n(4),i=n(2),a=n(20),u=n(19);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!a(e.url)&&(e.url=u(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||i.adapter)(e).then(function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e){e.exports={_args:[["axios@0.18.0","C:\\Users\\winflop\\Desktop\\gits\\node\\node-emailhunter"]],_from:"axios@0.18.0",_id:"axios@0.18.0",_inBundle:!1,_integrity:"sha1-MtU+SFHv3AoRmTts0AB4nXDAUQI=",_location:"/axios",_phantomChildren:{},_requested:{type:"version",registry:!0,raw:"axios@0.18.0",name:"axios",escapedName:"axios",rawSpec:"0.18.0",saveSpec:null,fetchSpec:"0.18.0"},_requiredBy:["/"],_resolved:"https://registry.npmjs.org/axios/-/axios-0.18.0.tgz",_spec:"0.18.0",_where:"C:\\Users\\winflop\\Desktop\\gits\\node\\node-emailhunter",author:{name:"Matt Zabriskie"},browser:{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},bugs:{url:"https://github.com/axios/axios/issues"},bundlesize:[{path:"./dist/axios.min.js",threshold:"5kB"}],dependencies:{"follow-redirects":"^1.3.0","is-buffer":"^1.1.5"},description:"Promise based HTTP client for the browser and node.js",devDependencies:{bundlesize:"^0.5.7",coveralls:"^2.11.9","es6-promise":"^4.0.5",grunt:"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",sinon:"^1.17.4",typescript:"^2.0.3","url-search-params":"^0.6.1",webpack:"^1.13.1","webpack-dev-server":"^1.14.1"},homepage:"https://github.com/axios/axios",keywords:["xhr","http","ajax","promise","node"],license:"MIT",main:"index.js",name:"axios",repository:{type:"git",url:"git+https://github.com/axios/axios.git"},scripts:{build:"NODE_ENV=production grunt build",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",examples:"node ./examples/server.js",postversion:"git push && git push --tags",preversion:"npm test",start:"node ./sandbox/server.js",test:"grunt test && bundlesize",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},typings:"./index.d.ts",version:"0.18.0"}},function(e,t){e.exports=require("zlib")},function(e,t,n){"use strict";var r=process.argv,o=r.indexOf("--"),s=function(e){e="--"+e;var t=r.indexOf(e);return-1!==t&&(-1===o||t<o)};e.exports="FORCE_COLOR"in process.env||!(s("no-color")||s("no-colors")||s("color=false"))&&(!!(s("color")||s("colors")||s("color=true")||s("color=always"))||!(process.stdout&&!process.stdout.isTTY)&&("win32"===process.platform||"COLORTERM"in process.env||"dumb"!==process.env.TERM&&!!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)))},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("tty")},function(e,t,n){var r=n(28),o=n(27);(t=e.exports=n(5)).init=function(e){e.inspectOpts={};for(var n=Object.keys(t.inspectOpts),r=0;r<n.length;r++)e.inspectOpts[n[r]]=t.inspectOpts[n[r]]},t.log=function(){return process.stderr.write(o.format.apply(o,arguments)+"\n")},t.formatArgs=function(e){var n=this.namespace;if(this.useColors){var r=this.color,o="[3"+(r<8?r:"8;5;"+r),s="  "+o+";1m"+n+" [0m";e[0]=s+e[0].split("\n").join("\n"+s),e.push(o+"m+"+t.humanize(this.diff)+"[0m")}else e[0]=(t.inspectOpts.hideDate?"":(new Date).toISOString()+" ")+n+" "+e[0]},t.save=function(e){null==e?delete process.env.DEBUG:process.env.DEBUG=e},t.load=i,t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):r.isatty(process.stderr.fd)},t.colors=[6,2,3,4,5,1];try{var s=n(26);s&&s.level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}function i(){return process.env.DEBUG}t.inspectOpts=Object.keys(process.env).filter(function(e){return/^debug_/i.test(e)}).reduce(function(e,t){var n=t.substring(6).toLowerCase().replace(/_([a-z])/g,function(e,t){return t.toUpperCase()}),r=process.env[t];return r=!!/^(yes|on|true|enabled)$/i.test(r)||!/^(no|off|false|disabled)$/i.test(r)&&("null"===r?null:Number(r)),e[n]=r,e},{}),t.formatters.o=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts).split("\n").map(function(e){return e.trim()}).join(" ")},t.formatters.O=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts)},t.enable(i())},function(e,t){var n=1e3,r=60*n,o=60*r,s=24*o,i=365.25*s;function a(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}e.exports=function(e,t){t=t||{};var u,c=typeof e;if("string"===c&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!t)return;var a=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*i;case"days":case"day":case"d":return a*s;case"hours":case"hour":case"hrs":case"hr":case"h":return a*o;case"minutes":case"minute":case"mins":case"min":case"m":return a*r;case"seconds":case"second":case"secs":case"sec":case"s":return a*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}(e);if("number"===c&&!1===isNaN(e))return t.long?a(u=e,s,"day")||a(u,o,"hour")||a(u,r,"minute")||a(u,n,"second")||u+" ms":function(e){if(e>=s)return Math.round(e/s)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=n)return Math.round(e/n)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},function(e,t,n){function r(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=n(5)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),!n)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,s=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&"%c"===e&&(s=++o)}),e.splice(s,0,r)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=r,t.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(r())},function(e,t,n){"undefined"==typeof process||"renderer"===process.type?e.exports=n(31):e.exports=n(29)},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("assert")},function(e,t,n){"use strict";var r=n(0),o=n(12),s=n(10),i=n(9),a=n(8),u=n(7).http,c=n(7).https,f=n(6),p=n(25),l=n(24),d=n(1),h=n(11);e.exports=function(e){return new Promise(function(t,n){var m,y=e.data,g=e.headers;if(g["User-Agent"]||g["user-agent"]||(g["User-Agent"]="axios/"+l.version),y&&!r.isStream(y)){if(Buffer.isBuffer(y));else if(r.isArrayBuffer(y))y=new Buffer(new Uint8Array(y));else{if(!r.isString(y))return n(d("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",e));y=new Buffer(y,"utf-8")}g["Content-Length"]=y.length}var v=void 0;e.auth&&(v=(e.auth.username||"")+":"+(e.auth.password||""));var C=f.parse(e.url),b=C.protocol||"http:";if(!v&&C.auth){var w=C.auth.split(":");v=(w[0]||"")+":"+(w[1]||"")}v&&delete g.Authorization;var x="https:"===b,k=x?e.httpsAgent:e.httpAgent,_={path:s(C.path,e.params,e.paramsSerializer).replace(/^\?/,""),method:e.method,headers:g,agent:k,auth:v};e.socketPath?_.socketPath=e.socketPath:(_.hostname=C.hostname,_.port=C.port);var F,E=e.proxy;if(!E&&!1!==E){var O=b.slice(0,-1)+"_proxy",R=process.env[O]||process.env[O.toUpperCase()];if(R){var j=f.parse(R);if(E={host:j.hostname,port:j.port},j.auth){var B=j.auth.split(":");E.auth={username:B[0],password:B[1]}}}}if(E&&(_.hostname=E.host,_.host=E.host,_.headers.host=C.hostname+(C.port?":"+C.port:""),_.port=E.port,_.path=b+"//"+C.hostname+(C.port?":"+C.port:"")+_.path,E.auth)){var A=new Buffer(E.auth.username+":"+E.auth.password,"utf8").toString("base64");_.headers["Proxy-Authorization"]="Basic "+A}e.transport?F=e.transport:0===e.maxRedirects?F=x?a:i:(e.maxRedirects&&(_.maxRedirects=e.maxRedirects),F=x?c:u),e.maxContentLength&&e.maxContentLength>-1&&(_.maxBodyLength=e.maxContentLength);var S=F.request(_,function(r){if(!S.aborted){clearTimeout(m),m=null;var s=r;switch(r.headers["content-encoding"]){case"gzip":case"compress":case"deflate":s=s.pipe(p.createUnzip()),delete r.headers["content-encoding"]}var i=r.req||S,a={status:r.statusCode,statusText:r.statusMessage,headers:r.headers,config:e,request:i};if("stream"===e.responseType)a.data=s,o(t,n,a);else{var u=[];s.on("data",function(t){u.push(t),e.maxContentLength>-1&&Buffer.concat(u).length>e.maxContentLength&&n(d("maxContentLength size of "+e.maxContentLength+" exceeded",e,null,i))}),s.on("error",function(t){S.aborted||n(h(t,e,null,i))}),s.on("end",function(){var r=Buffer.concat(u);"arraybuffer"!==e.responseType&&(r=r.toString("utf8")),a.data=r,o(t,n,a)})}}});S.on("error",function(t){S.aborted||n(h(t,e,null,S))}),e.timeout&&!m&&(m=setTimeout(function(){S.abort(),n(d("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",S))},e.timeout)),e.cancelToken&&e.cancelToken.promise.then(function(e){S.aborted||(S.abort(),n(e))}),r.isStream(y)?y.pipe(S):S.end(y)})}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,s=String(e),i="",a=0,u=r;s.charAt(0|a)||(u="=",a%1);i+=u.charAt(63&t>>8-a%1*8)){if((n=s.charCodeAt(a+=.75))>255)throw new o;t=t<<8|n}return i}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}}),i):i}},function(e,t,n){"use strict";var r=n(0),o=n(12),s=n(10),i=n(39),a=n(38),u=n(1),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(37);e.exports=function(e){return new Promise(function(t,f){var p=e.data,l=e.headers;r.isFormData(p)&&delete l["Content-Type"];var d=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in d||a(e.url)||(d=new window.XDomainRequest,h="onload",m=!0,d.onprogress=function(){},d.ontimeout=function(){}),e.auth){var y=e.auth.username||"",g=e.auth.password||"";l.Authorization="Basic "+c(y+":"+g)}if(d.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d[h]=function(){if(d&&(4===d.readyState||m)&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?i(d.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:1223===d.status?204:d.status,statusText:1223===d.status?"No Content":d.statusText,headers:n,config:e,request:d};o(t,f,r),d=null}},d.onerror=function(){f(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},r.isStandardBrowserEnv()){var v=n(36),C=(e.withCredentials||a(e.url))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;C&&(l[e.xsrfHeaderName]=C)}if("setRequestHeader"in d&&r.forEach(l,function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete l[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),f(e),d=null)}),void 0===p&&(p=null),d.send(p)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(0),s=n(23),i=n(22);function a(e){this.defaults=e,this.interceptors={request:new s,response:new s}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=a},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(0),o=n(13),s=n(42),i=n(2);function a(e){var t=new s(e),n=o(s.prototype.request,t);return r.extend(n,s.prototype,t),r.extend(n,t),n}var u=a(i);u.Axios=s,u.create=function(e){return a(r.merge(i,e))},u.Cancel=n(3),u.CancelToken=n(18),u.isCancel=n(4),u.all=function(e){return Promise.all(e)},u.spread=n(17),e.exports=u,e.exports.default=u},function(e,t,n){e.exports=n(44)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=c(n(45)),i=c(n(16)),a=c(n(15)),u=c(n(14));function c(e){return e&&e.__esModule?e:{default:e}}var f=function(){function e(t){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!t||""===t)throw new Error("You must enter the Hunter.io API key.");this.apiKey=t}return o(e,[{key:"run",value:function(e){var t,n=e.action,r=void 0===n?"GET":n,o=e.type,a=e.id,u=void 0===a?"":a,c=e.options,f=void 0===c?{}:c,p=e.callback,l=void 0===p?function(){}:p,d=i.default.stringify(f),h=i.default.stringify({api_key:this.apiKey}),m=null,y="https://api.hunter.io/v2/"+o;switch(u&&(y+="/"+u),y+="?"+h,t=f,f=Object.keys(t).reduce(function(e,n){return void 0!==t[n]&&null!==t[n]&&""!==t[n]&&(e[n]=t[n]),e},{}),r){case"POST":m=s.default.post(y,f);break;case"PUT":m=s.default.put(y,f);break;case"DELETE":m=s.default.delete(y);break;default:d&&(y+="&"+d),m=s.default.get(y)}return m.then(function(e){return l(null,e.data)}).catch(function(e){e=e.response?e.response.data:e,l(e)})}},{key:"emailFinder",value:function(e,t){return this.run({type:"email-finder",options:e,callback:t})}},{key:"emailVerifier",value:function(e,t){var n="object"===(void 0===e?"undefined":r(e))?e:{email:e};return this.run({type:"email-verifier",options:n,callback:t})}},{key:"emailCount",value:function(e,t){var n="object"===(void 0===e?"undefined":r(e))?e:{domain:e};return this.run({type:"email-count",options:n,callback:t})}},{key:"domainSearch",value:function(e,t){return this.run({type:"domain-search",options:e,callback:t})}},{key:"account",value:function(e){return this.run({type:"account",callback:e})}},{key:"leads",get:function(){return new a.default(this)}},{key:"leadsList",get:function(){return new u.default(this)}}]),e}();t.default=f}]).default});