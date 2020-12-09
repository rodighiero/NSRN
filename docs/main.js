(()=>{"use strict";var e={539:(e,t,n)=>{var i=n(119);const o=n.p+"nodes.json",a=n.p+"links.json",r=n.p+"triplets.json";var l=n(832),c=n(194),d=n.n(c),p=n(129),h=n.n(p),m=n(865),u=n(586);const w=()=>{const e=new l.Graphics;e.interactiveChildren=!1,e.alpha=.1,e.name="links",s.pixi.addChild(e),s.links.filter((e=>e.value>.1)).forEach((({source:t,target:n,value:i})=>{e.lineStyle(i,16777215),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y)}))};let f,g=[];var x=n(582);const y="&nbsp;",v="—————————————",b='<span class="block"></span>',C=16702720,k=13095362,S=()=>{const e=new l.Graphics;e.alpha=0,e.name="nodes",s.pixi.addChild(e),s.nodes.forEach((t=>{const n=t.docs;t.circle=new l.Graphics,t.circle.beginFill(k,1),t.circle.drawCircle(0,0,n),t.circle.endFill(),t.circle.tint=k,t.circle.position=new l.Point(t.x,t.y),t.circle.hitArea=new l.Circle(0,0,s.distance),t.circle.interactive=!0,e.addChild(t.circle);const[i,o]=(e=>{const t=Math.round(e.length/2);for(let n=t,i=t;n<e.length||i>=0;n++,i--){if(" "===e[n])return[e.substring(0,n),e.substring(n+1)];if(" "===e[i])return[e.substring(0,i),e.substring(i+1)]}return[e,""]})(t.name);t.text=new l.BitmapText(`${i}\n${o}`,{fontName:"Arial",fontSize:"21",fill:k,align:"center"}),t.text.scale.set(.2),t.text.position.set(t.x-t.text.width/2,t.y+n+2),e.addChild(t.text),t.circle.mouseover=e=>{!function(e){const t=(0,x.Z)("body").append("div").attr("id","focus");t.append("h2").html(e.name),t.append("h2").html(""+e.affiliation),t.append("h2").html(e.docs+" Publications"),t.append("p").html(y),t.append("h3").html("Tokens by tf-idf"),t.append("p").html(v),Object.entries(e.tokens).slice(0,20).forEach((([e,n])=>{const i=b.repeat(n);t.append("p").html(`${i} &nbsp; ${e}`)})),t.append("p").html(y),t.append("h3").html("Publication Years"),t.append("p").html(v),Object.entries(e.years).forEach((([e,n],i)=>{const o=b.repeat(4*n);t.append("p").html(`${o} &nbsp; ${e}`)}))}(t),s.nodes.filter((e=>t.peers.includes(e.id))).forEach((e=>{e.circle.tint=C,e.text.tint=C}))},t.circle.mouseout=e=>{(0,x.Z)("#focus").remove(),s.tokens=[],s.nodes.forEach((e=>{e.circle.tint=k,e.text.tint=k}))}}))};var z=n(475),E=n(476);const M=n.p+"arial.xml";window.s={distance:30,links:w,nodes:S,tokens:[]},Promise.all([(0,i.Z)(a),(0,i.Z)(o),(0,i.Z)(r)]).then((([e,t,n])=>{s.links=e,console.log("nodes",s.nodes.length),s.nodes=t,console.log("links",s.links.length),s.triplets=n,console.log("triplets",s.triplets.length),s.app=new l.Application({width:window.innerWidth,height:window.innerHeight,antialias:!0,transparent:!0,resolution:2,autoDensity:!0,autoResize:!0,resizeTo:window}),document.body.prepend(s.app.view),s.pixi=new z.l({screenWidth:window.innerWidth,screenHeight:window.innerHeight,interaction:s.app.renderer.plugins.interaction}),s.app.stage.addChild(s.pixi);const i=(0,m.Z)(s.nodes,(e=>e.x)),o=(0,m.Z)(s.nodes,(e=>e.y)),a=i[1]-i[0],r=o[1]-o[0],c=window.innerWidth/a,p=window.innerHeight/r;let x=c<p?c:p;x=x,s.zoomMin=.9*x,s.zoomMax=3,s.pixi.drag().pinch().wheel().decelerate().clampZoom({minScale:s.zoomMin,maxScale:s.zoomMax}).setTransform(window.innerWidth/2,window.innerHeight/2,x,x);const y=(0,E.Z)().domain([s.zoomMin,2]).range([1,0]),v=(0,E.Z)().domain([s.zoomMin,2]).range([0,1]);s.pixi.on("zoomed",(e=>{const t=e.viewport.lastViewport.scaleX;e.viewport.children.find((e=>"contours"==e.name)).alpha=y(t),e.viewport.children.find((e=>"nodes"==e.name)).alpha=v(t),e.viewport.children.find((e=>"keywords_close"==e.name)).alpha=v(t),e.viewport.children.find((e=>"keywords_distant"==e.name)).alpha=y(t)})),s.app.loader.add("Arial",M).load((()=>{(()=>{const e=5e3,t=document.createElement("canvas"),n=t.getContext("2d");t.width=e,t.height=e;const i=n.createRadialGradient(2500,2500,0,2500,2500,2500);i.addColorStop(1,"#000000"),i.addColorStop(0,"#333333"),n.fillStyle=i,n.fillRect(0,0,t.width,t.height);let o=l.Texture.from(t);const a=new l.Sprite(o);a.name="background",a.width=e,a.height=e,a.position=new l.Point(-2500,-2500),a.interactiveChildren=!1,s.pixi.addChild(a)})(),w(),(()=>{const e=new l.Graphics;e.name="contours",s.pixi.addChild(e),e.interactiveChildren=!1;const t=(0,m.Z)(s.nodes,(e=>e.x)),n=(0,m.Z)(s.nodes,(e=>e.y)),i=t[1]-t[0],o=n[1]-n[0],a=t[0],r=n[0],c=(0,u.Z)().x((e=>e.x-a)).y((e=>e.y-r)).weight((e=>e.relevancy)).size([i,o]).cellSize(5).bandwidth(30).thresholds(15)(s.nodes);c.forEach((e=>e.coordinates=e.coordinates.map((e=>e.map((e=>e.map((e=>[e[0]+a,e[1]+r]))))))));const d=1/c.length;let p=1;for(let t=c.length-1;t>=0;t--){const n=1-d*p;e.lineStyle(n,10066329),p+=1,c[t].coordinates.forEach((t=>{t.forEach((t=>{t.forEach((([t,n],i)=>{0==i&&e.moveTo(t,n),e.lineTo(t,n)}))})),e.closePath()}))}})(),S(),(()=>{const e=new l.Graphics;e.alpha=0,e.name="keywords_close",e.interactiveChildren=!1,s.pixi.addChild(e),s.triplets.forEach((t=>{const n=t.tokens.slice(0,3),i=5*n.length/2,o=t.position[0],s=t.position[1];n.forEach((([t,n],a)=>{const r=new l.BitmapText(t,{fontName:"Arial",fontSize:"28",tint:6710886,align:"center"});r.scale.set(.16),r.position.set(o-r.width/2,s-i+5*a),e.addChild(r)}))}))})(),(()=>{const e=new l.Graphics;e.interactiveChildren=!1,f=s.pixi.addChild(e),f.name="keywords_distant",s.triplets.forEach((e=>{const t=e.tokens.slice(0,1),n=e.position[0],i=e.position[1],o=new l.BitmapText(t[0][0],{fontName:"Arial",fontSize:"64",fill:16702720,align:"center"}),s=t[0][1];o.scale.set(.005*(s+30)),o.position.set(n-o.width/2,i-o.height/2);let a=!1;for(var r=0;r<g.length;r++){const e=g[r],t=o;if(!(t.x>e.x+e.width||t.x+t.width<e.x||t.y>e.y+e.height||t.y+t.height<e.y)){a=!0;break}}a||(f.addChild(o),g.push(o))}))})(),(()=>{const e=h()({every:1});setInterval((()=>{e.tick()}),1e3/60);const t=document.getElementById("fps");e.on("data",(function(e){t.innerHTML=Math.floor(parseInt(e))}))})(),new(d())({data:{src:async()=>s.nodes.reduce(((e,{name:t,x:n,y:i})=>(e.push({name:t,x:n,y:i}),e)),[]),key:["name"],cache:!1},sort:(e,t)=>e.match<t.match?-1:e.match>t.match?1:0,placeHolder:"Search",selector:"#autoComplete",threshold:0,debounce:0,searchEngine:"loose",highlight:!0,maxResults:10,resultsList:{render:!0,container:e=>{e.setAttribute("id","autoComplete_list")},destination:document.querySelector("#autoComplete"),position:"afterend",element:"ul"},resultItem:{content:(e,t)=>{t.innerHTML=e.match},element:"li"},noResults:()=>{const e=document.createElement("li");e.setAttribute("class","no_result"),e.setAttribute("tabindex","1"),e.innerHTML="No Results",document.querySelector("#autoComplete_list").appendChild(e)},onSelection:e=>{console.log(e),e.selection.key;const t=e.selection.value,{x:n,y:i,name:o}=t;document.querySelector("#autoComplete").value=o;const a=s.pixi.center.x,r=s.pixi.center.y;s.pixi.scale.x<(s.zoomMax-s.zoomMin)/2?s.pixi.animate({scale:s.zoomMax,position:new l.Point(n,i),time:2e3,ease:"easeInOutSine"}):s.pixi.animate({scale:s.zoomMin,position:new l.Point((n+a)/2,(i+r)/2),time:2e3,ease:"easeInOutSine",callbackOnComplete:()=>{s.pixi.animate({scale:s.zoomMax,position:new l.Point(n,i),time:2e3,ease:"easeInOutSine"})}})}})})),window.onresize=function(){s.pixi.resize()},window.addEventListener("wheel",(e=>{e.preventDefault()}),{passive:!1})}))}},t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={179:0},t=[[539,413]],i=()=>{};function o(){for(var i,o=0;o<t.length;o++){for(var s=t[o],a=!0,r=1;r<s.length;r++){var l=s[r];0!==e[l]&&(a=!1)}a&&(t.splice(o--,1),i=n(n.s=s[0]))}return 0===t.length&&(n.x(),n.x=()=>{}),i}n.x=()=>{n.x=()=>{},a=a.slice();for(var e=0;e<a.length;e++)s(a[e]);return(i=o)()};var s=o=>{for(var s,a,[l,c,d,p]=o,h=0,m=[];h<l.length;h++)a=l[h],n.o(e,a)&&e[a]&&m.push(e[a][0]),e[a]=0;for(s in c)n.o(c,s)&&(n.m[s]=c[s]);for(d&&d(n),r(o);m.length;)m.shift()();return p&&t.push.apply(t,p),i()},a=self.webpackChunkcartography_of_nasrn=self.webpackChunkcartography_of_nasrn||[],r=a.push.bind(a);a.push=s})(),n.x()})();