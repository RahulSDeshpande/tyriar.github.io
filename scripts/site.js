!function(a){function b(){e=document.querySelector("#search-term"),document.querySelector("#search-form").addEventListener("submit",c),window.addEventListener("load",d)}function c(b){var c=e.value.toLowerCase();if(""!==c){for(var d,g=!1,h=0;h<f.length&&(d=f[h],!(g=d.toLowerCase()==c));h++);window.location=g?a+"/p/explore.html?t="+encodeURIComponent(d):"http://www.google.com/search?q=site:"+window.location.hostname+"+"+encodeURIComponent(c)}return b.preventDefault(),b.stopPropagation(),!1}function d(){for(var a=document.querySelectorAll("#label-list option"),b=0;b<a.length;b++)f.push(a[b].getAttribute("value"))}var e,f=[];b()}(home),function(){for(var a=document.querySelectorAll(".share-icons a"),b=0;b<a.length;b++)a[b].href=a[b].href.replace("{url}",window.location.href)}(),function(){for(var a=document.querySelectorAll("table"),b=0;b<a.length;b++){var c=a[b],d=c.parentNode;d.removeChild(c);var e=document.createElement("div");e.className="wide-table",e.appendChild(c),d.appendChild(e)}}();var IN_GLOBAL_SCOPE=!0;window.PR_SHOULD_USE_CONTINUATION=!0;var prettyPrintOne,prettyPrint;!function(){function a(a){function b(a){var b=a.charCodeAt(0);if(92!==b)return b;var c=a.charAt(1);return b=l[c],b?b:c>="0"&&"7">=c?parseInt(a.substring(1),8):"u"===c||"x"===c?parseInt(a.substring(2),16):a.charCodeAt(1)}function c(a){if(32>a)return(16>a?"\\x0":"\\x")+a.toString(16);var b=String.fromCharCode(a);return"\\"===b||"-"===b||"]"===b||"^"===b?"\\"+b:b}function d(a){var d=a.substring(1,a.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),e=[],f="^"===d[0],g=["["];f&&g.push("^");for(var h=f?1:0,i=d.length;i>h;++h){var j=d[h];if(/\\[bdsw]/i.test(j))g.push(j);else{var k,l=b(j);i>h+2&&"-"===d[h+1]?(k=b(d[h+2]),h+=2):k=l,e.push([l,k]),65>k||l>122||(65>k||l>90||e.push([32|Math.max(65,l),32|Math.min(k,90)]),97>k||l>122||e.push([-33&Math.max(97,l),-33&Math.min(k,122)]))}}e.sort(function(a,b){return a[0]-b[0]||b[1]-a[1]});for(var m=[],n=[],h=0;h<e.length;++h){var o=e[h];o[0]<=n[1]+1?n[1]=Math.max(n[1],o[1]):m.push(n=o)}for(var h=0;h<m.length;++h){var o=m[h];g.push(c(o[0])),o[1]>o[0]&&(o[1]+1>o[0]&&g.push("-"),g.push(c(o[1])))}return g.push("]"),g.join("")}function e(a){for(var b=a.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),e=b.length,h=[],i=0,j=0;e>i;++i){var k=b[i];if("("===k)++j;else if("\\"===k.charAt(0)){var l=+k.substring(1);l&&(j>=l?h[l]=-1:b[i]=c(l))}}for(var i=1;i<h.length;++i)-1===h[i]&&(h[i]=++f);for(var i=0,j=0;e>i;++i){var k=b[i];if("("===k)++j,h[j]||(b[i]="(?:");else if("\\"===k.charAt(0)){var l=+k.substring(1);l&&j>=l&&(b[i]="\\"+h[l])}}for(var i=0;e>i;++i)"^"===b[i]&&"^"!==b[i+1]&&(b[i]="");if(a.ignoreCase&&g)for(var i=0;e>i;++i){var k=b[i],m=k.charAt(0);k.length>=2&&"["===m?b[i]=d(k):"\\"!==m&&(b[i]=k.replace(/[a-zA-Z]/g,function(a){var b=a.charCodeAt(0);return"["+String.fromCharCode(-33&b,32|b)+"]"}))}return b.join("")}for(var f=0,g=!1,h=!1,i=0,j=a.length;j>i;++i){var k=a[i];if(k.ignoreCase)h=!0;else if(/[a-z]/i.test(k.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){g=!0,h=!1;break}}for(var l={b:8,t:9,n:10,v:11,f:12,r:13},m=[],i=0,j=a.length;j>i;++i){var k=a[i];if(k.global||k.multiline)throw new Error(""+k);m.push("(?:"+e(k)+")")}return new RegExp(m.join("|"),h?"gi":"g")}function b(a,b){function c(a){var i=a.nodeType;if(1==i){if(d.test(a.className))return;for(var j=a.firstChild;j;j=j.nextSibling)c(j);var k=a.nodeName.toLowerCase();("br"===k||"li"===k)&&(e[h]="\n",g[h<<1]=f++,g[h++<<1|1]=a)}else if(3==i||4==i){var l=a.nodeValue;l.length&&(l=b?l.replace(/\r\n?/g,"\n"):l.replace(/[ \t\r\n]+/g," "),e[h]=l,g[h<<1]=f,f+=l.length,g[h++<<1|1]=a)}}var d=/(?:^|\s)nocode(?:\s|$)/,e=[],f=0,g=[],h=0;return c(a),{sourceCode:e.join("").replace(/\n$/,""),spans:g}}function c(a,b,c,d){if(b){var e={sourceCode:b,basePos:a};c(e),d.push.apply(d,e.decorations)}}function d(a){for(var b=void 0,c=a.firstChild;c;c=c.nextSibling){var d=c.nodeType;b=1===d?b?a:c:3===d?R.test(c.nodeValue)?a:b:b}return b===a?void 0:b}function e(b,d){var e,f={};!function(){for(var c=b.concat(d),g=[],h={},i=0,j=c.length;j>i;++i){var k=c[i],l=k[3];if(l)for(var m=l.length;--m>=0;)f[l.charAt(m)]=k;var n=k[1],o=""+n;h.hasOwnProperty(o)||(g.push(n),h[o]=null)}g.push(/[\0-\uffff]/),e=a(g)}();var g=d.length,h=function(a){for(var b=a.sourceCode,i=a.basePos,k=[i,J],l=0,m=b.match(e)||[],n={},o=0,p=m.length;p>o;++o){var q,r=m[o],s=n[r],t=void 0;if("string"==typeof s)q=!1;else{var u=f[r.charAt(0)];if(u)t=r.match(u[1]),s=u[0];else{for(var v=0;g>v;++v)if(u=d[v],t=r.match(u[1])){s=u[0];break}t||(s=J)}q=s.length>=5&&"lang-"===s.substring(0,5),!q||t&&"string"==typeof t[1]||(q=!1,s=M),q||(n[r]=s)}var w=l;if(l+=r.length,q){var x=t[1],y=r.indexOf(x),z=y+x.length;t[2]&&(z=r.length-t[2].length,y=z-x.length);var A=s.substring(5);c(i+w,r.substring(0,y),h,k),c(i+w+y,x,j(A,x),k),c(i+w+z,r.substring(z),h,k)}else k.push(i+w,s)}a.decorations=k};return h}function f(a){var b=[],c=[];b.push(a.tripleQuotedStrings?[D,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]:a.multiLineStrings?[D,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]:[D,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),a.verbatimStrings&&c.push([D,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var d=a.hashComments;d&&(a.cStyleComments?(b.push(d>1?[F,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]:[F,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),c.push([D,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):b.push([F,/^#[^\r\n]*/,null,"#"])),a.cStyleComments&&(c.push([F,/^\/\/[^\r\n]*/,null]),c.push([F,/^\/\*[\s\S]*?(?:\*\/|$)/,null]));var f=a.regexLiterals;if(f){var g=f>1?"":"\n\r",h=g?".":"[\\S\\s]",i="/(?=[^/*"+g+"])(?:[^/\\x5B\\x5C"+g+"]|\\x5C"+h+"|\\x5B(?:[^\\x5C\\x5D"+g+"]|\\x5C"+h+")*(?:\\x5D|$))+/";c.push(["lang-regex",RegExp("^"+Q+"("+i+")")])}var j=a.types;j&&c.push([G,j]);var k=(""+a.keywords).replace(/^ | $/g,"");k.length&&c.push([E,new RegExp("^(?:"+k.replace(/[\s,]+/g,"|")+")\\b"),null]),b.push([J,/^\s+/,null," \r\n	 "]);var l="^.[^\\s\\w.$@'\"`/\\\\]*";return a.regexLiterals&&(l+="(?!s*/)"),c.push([H,/^@[a-z_$][a-z_$@0-9]*/i,null],[G,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[J,/^[a-z_$][a-z_$@0-9]*/i,null],[H,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[J,/^\\[\s\S]?/,null],[I,new RegExp(l),null]),e(b,c)}function g(a,b,c){function d(a){var b=a.nodeType;if(1!=b||f.test(a.className)){if((3==b||4==b)&&c){var i=a.nodeValue,j=i.match(g);if(j){var k=i.substring(0,j.index);a.nodeValue=k;var l=i.substring(j.index+j[0].length);if(l){var m=a.parentNode;m.insertBefore(h.createTextNode(l),a.nextSibling)}e(a),k||a.parentNode.removeChild(a)}}}else if("br"===a.nodeName)e(a),a.parentNode&&a.parentNode.removeChild(a);else for(var n=a.firstChild;n;n=n.nextSibling)d(n)}function e(a){function b(a,c){var d=c?a.cloneNode(!1):a,e=a.parentNode;if(e){var f=b(e,1),g=a.nextSibling;f.appendChild(d);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var c,d=b(a.nextSibling,0);(c=d.parentNode)&&1===c.nodeType;)d=c;j.push(d)}for(var f=/(?:^|\s)nocode(?:\s|$)/,g=/\r\n?|\n/,h=a.ownerDocument,i=h.createElement("li");a.firstChild;)i.appendChild(a.firstChild);for(var j=[i],k=0;k<j.length;++k)d(j[k]);b===(0|b)&&j[0].setAttribute("value",b);var l=h.createElement("ol");l.className="linenums";for(var m=Math.max(0,b-1|0)||0,k=0,n=j.length;n>k;++k)i=j[k],i.className="L"+(k+m)%10,i.firstChild||i.appendChild(h.createTextNode(" ")),l.appendChild(i);a.appendChild(l)}function h(a){var b=/\bMSIE\s(\d+)/.exec(navigator.userAgent);b=b&&+b[1]<=8;var c=/\n/g,d=a.sourceCode,e=d.length,f=0,g=a.spans,h=g.length,i=0,j=a.decorations,k=j.length,l=0;j[k]=e;var m,n;for(n=m=0;k>n;)j[n]!==j[n+2]?(j[m++]=j[n++],j[m++]=j[n++]):n+=2;for(k=m,n=m=0;k>n;){for(var o=j[n],p=j[n+1],q=n+2;k>=q+2&&j[q+1]===p;)q+=2;j[m++]=o,j[m++]=p,n=q}k=j.length=m;var r,s=a.sourceNode;s&&(r=s.style.display,s.style.display="none");try{for(;h>i;){var t,u=(g[i],g[i+2]||e),v=j[l+2]||e,q=Math.min(u,v),w=g[i+1];if(1!==w.nodeType&&(t=d.substring(f,q))){b&&(t=t.replace(c,"\r")),w.nodeValue=t;var x=w.ownerDocument,y=x.createElement("span");y.className=j[l+1];var z=w.parentNode;z.replaceChild(y,w),y.appendChild(w),u>f&&(g[i+1]=w=x.createTextNode(d.substring(q,u)),z.insertBefore(w,y.nextSibling))}f=q,f>=u&&(i+=2),f>=v&&(l+=2)}}finally{s&&(s.style.display=r)}}function i(a,b){for(var c=b.length;--c>=0;){var d=b[c];T.hasOwnProperty(d)?n.console&&console.warn("cannot override language handler %s",d):T[d]=a}}function j(a,b){return a&&T.hasOwnProperty(a)||(a=/^\s*</.test(b)?"default-markup":"default-code"),T[a]}function k(a){var c=a.langExtension;try{var d=b(a.sourceNode,a.pre),e=d.sourceCode;a.sourceCode=e,a.spans=d.spans,a.basePos=0,j(c,e)(a),h(a)}catch(f){n.console&&console.log(f&&f.stack||f)}}function l(a,b,c){var d=document.createElement("div");d.innerHTML="<pre>"+a+"</pre>",d=d.firstChild,c&&g(d,c,!0);var e={langExtension:b,numberLines:c,sourceNode:d,pre:1};return k(e),d.innerHTML}function m(a,b){function c(a){return f.getElementsByTagName(a)}function e(){for(var b=n.PR_SHOULD_USE_CONTINUATION?p.now()+250:1/0;r<j.length&&p.now()<b;r++){for(var c=j[r],f=y,i=c;i=i.previousSibling;){var l=i.nodeType,m=(7===l||8===l)&&i.nodeValue;if(m?!/^\??prettify\b/.test(m):3!==l||/\S/.test(i.nodeValue))break;if(m){f={},m.replace(/\b(\w+)=([\w:.%+-]+)/g,function(a,b,c){f[b]=c});break}}var o=c.className;if((f!==y||t.test(o))&&!u.test(o)){for(var z=!1,A=c.parentNode;A;A=A.parentNode){var B=A.tagName;if(x.test(B)&&A.className&&t.test(A.className)){z=!0;break}}if(!z){c.className+=" prettyprinted";var C=f.lang;if(!C){C=o.match(s);var D;!C&&(D=d(c))&&w.test(D.tagName)&&(C=D.className.match(s)),C&&(C=C[1])}var E;if(v.test(c.tagName))E=1;else{var F=c.currentStyle,G=h.defaultView,H=F?F.whiteSpace:G&&G.getComputedStyle?G.getComputedStyle(c,null).getPropertyValue("white-space"):0;E=H&&"pre"===H.substring(0,3)}var I=f.linenums;(I="true"===I||+I)||(I=o.match(/\blinenums\b(?::(\d+))?/),I=I?I[1]&&I[1].length?+I[1]:!0:!1),I&&g(c,I,E),q={langExtension:C,sourceNode:c,numberLines:I,pre:E},k(q)}}}r<j.length?setTimeout(e,250):"function"==typeof a&&a()}for(var f=b||document.body,h=f.ownerDocument||document,i=[c("pre"),c("code"),c("xmp")],j=[],l=0;l<i.length;++l)for(var m=0,o=i[l].length;o>m;++m)j.push(i[l][m]);i=null;var p=Date;p.now||(p={now:function(){return+new Date}});var q,r=0,s=/\blang(?:uage)?-([\w.]+)(?!\S)/,t=/\bprettyprint\b/,u=/\bprettyprinted\b/,v=/pre|xmp/i,w=/^code$/i,x=/^(?:pre|code|xmp)$/i,y={};e()}var n=window,o=["break,continue,do,else,for,if,return,while"],p=[o,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],q=[p,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],r=[q,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],s=[q,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],t=[s,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],u="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",v=[q,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],w="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",x=[o,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],y=[o,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],z=[o,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],A=[o,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],B=[r,t,v,w,x,y,A],C=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,D="str",E="kwd",F="com",G="typ",H="lit",I="pun",J="pln",K="tag",L="dec",M="src",N="atn",O="atv",P="nocode",Q="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",R=/\S/,S=f({keywords:B,hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),T={};i(S,["default-code"]),i(e([],[[J,/^[^<?]+/],[L,/^<!\w[^>]*(?:>|$)/],[F,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[I,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),i(e([[J,/^[\s]+/,null," 	\r\n"],[O,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[K,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[N,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[I,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),i(e([],[[O,/^[\s\S]+/]]),["uq.val"]),i(f({keywords:r,hashComments:!0,cStyleComments:!0,types:C}),["c","cc","cpp","cxx","cyc","m"]),i(f({keywords:"null,true,false"}),["json"]),i(f({keywords:t,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:C}),["cs"]),i(f({keywords:s,cStyleComments:!0}),["java"]),i(f({keywords:A,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]),i(f({keywords:x,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]),i(f({keywords:w,hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]),i(f({keywords:y,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]),i(f({keywords:v,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]),i(f({keywords:u,hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),i(f({keywords:z,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]),i(e([],[[D,/^[\s\S]+/]]),["regex"]);var U=n.PR={createSimpleLexer:e,registerLangHandler:i,sourceDecorator:f,PR_ATTRIB_NAME:N,PR_ATTRIB_VALUE:O,PR_COMMENT:F,PR_DECLARATION:L,PR_KEYWORD:E,PR_LITERAL:H,PR_NOCODE:P,PR_PLAIN:J,PR_PUNCTUATION:I,PR_SOURCE:M,PR_STRING:D,PR_TAG:K,PR_TYPE:G,prettyPrintOne:IN_GLOBAL_SCOPE?n.prettyPrintOne=l:prettyPrintOne=l,prettyPrint:prettyPrint=IN_GLOBAL_SCOPE?n.prettyPrint=m:prettyPrint=m};"function"==typeof define&&define.amd&&define("google-code-prettify",[],function(){return U})}(),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[ \t\r\n\f]+/,null," 	\r\n\f"]],[[PR.PR_STRING,/^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,null],[PR.PR_STRING,/^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,null],["lang-css-str",/^url\(([^\)\"\']+)\)/i],[PR.PR_KEYWORD,/^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_COMMENT,/^(?:<!--|-->)/],[PR.PR_LITERAL,/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],[PR.PR_LITERAL,/^#(?:[0-9a-f]{3}){1,2}\b/i],[PR.PR_PLAIN,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],[PR.PR_PUNCTUATION,/^[^\s\w\'\"]+/]]),["css"]),PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_KEYWORD,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),["css-kw"]),PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_STRING,/^[^\)\"\']+/]]),["css-str"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "]],[[PR.PR_COMMENT,/^#!(?:.*)/],[PR.PR_KEYWORD,/^\b(?:import|library|part of|part|as|show|hide)\b/i],[PR.PR_COMMENT,/^\/\/(?:.*)/],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_KEYWORD,/^\b(?:class|interface)\b/i],[PR.PR_KEYWORD,/^\b(?:assert|break|case|catch|continue|default|do|else|finally|for|if|in|is|new|return|super|switch|this|throw|try|while)\b/i],[PR.PR_KEYWORD,/^\b(?:abstract|const|extends|factory|final|get|implements|native|operator|set|static|typedef|var)\b/i],[PR.PR_TYPE,/^\b(?:bool|double|Dynamic|int|num|Object|String|void)\b/i],[PR.PR_KEYWORD,/^\b(?:false|null|true)\b/i],[PR.PR_STRING,/^r?[\']{3}[\s|\S]*?[^\\][\']{3}/],[PR.PR_STRING,/^r?[\"]{3}[\s|\S]*?[^\\][\"]{3}/],[PR.PR_STRING,/^r?\'(\'|(?:[^\n\r\f])*?[^\\]\')/],[PR.PR_STRING,/^r?\"(\"|(?:[^\n\r\f])*?[^\\]\")/],[PR.PR_PLAIN,/^[a-z_$][a-z0-9_]*/i],[PR.PR_PUNCTUATION,/^[~!%^&*+=|?:<>/-]/],[PR.PR_LITERAL,/^\b0x[0-9a-f]+/i],[PR.PR_LITERAL,/^\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i],[PR.PR_LITERAL,/^\b\.\d+(?:e[+-]?\d+)?/i],[PR.PR_PUNCTUATION,/^[(){}\[\],.;]/]]),["dart"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/,null,"\"'"]],[[PR.PR_COMMENT,/^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],[PR.PR_KEYWORD,/^(?:ADD|ALL|ALTER|AND|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONNECT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOLLOWING|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|MATCH|MATCHED|MERGE|NATURAL|NATIONAL|NOCHECK|NONCLUSTERED|NOCYCLE|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PARTITION|PERCENT|PIVOT|PLAN|PRECEDING|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|ROWS?|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|START|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNBOUNDED|UNION|UNIQUE|UNPIVOT|UPDATE|UPDATETEXT|USE|USER|USING|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WITHIN|WRITETEXT|XML)(?=[^\w-]|$)/i,null],[PR.PR_LITERAL,/^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^[a-z_][\w-]*/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]]),["sql"]),function(){for(var a=document.querySelectorAll("pre code"),b=0;b<a.length;b++)a[b].parentNode.classList.add("prettyprint");prettyPrint()}(),function(){function a(a){return(a.innerText||a.textContent).toLowerCase()}var b=document.querySelector(".related-posts ul");if(b){var c=Array.prototype.slice.call(b.children);c.sort(function(b,c){return a(b)<a(c)?-1:a(b)>a(c)?1:0});for(var d=0;d<c.length;d++)b.appendChild(c[d])}}();