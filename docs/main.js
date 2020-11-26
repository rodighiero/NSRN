(()=>{"use strict";var e={884:(e,t,n)=>{var i=n(119),o=n(354);const r=n.p+"nodes.json",a=n.p+"links.json",l=n.p+"triplets.json",c=n.p+"arial.xml";var d=n(244),p=n(194),h=n.n(p),u=n(475);const m=n.p+"arial.png";var f=n(476),w=n(865),g=n(129),x=n.n(g),y=n(586);const v=()=>{const e=new d.Graphics;e.interactiveChildren=!1,e.alpha=.05,s.pixi.addChild(e),s.links.forEach((({source:t,target:n,value:i})=>{e.lineStyle(i,16777215),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y)}))};d.BitmapFont.from("TripletFont",{fontFamily:"Arial",fontSize:24,fill:6516064});let b,C=[];d.BitmapFont.from("KeywordFont",{fontFamily:"Arial",fontSize:72,fill:13095362});var S=n(582);const k="&nbsp;",T="—————————————",E='<span class="block"></span>',F=16702720,P=13095362;d.BitmapFont.from("NodeFont",{fontFamily:"Arial",fontSize:21,fill:P});const Z=()=>{const e=new d.Graphics;e.alpha=0,s.pixi.addChild(e),s.nodes.forEach((t=>{const n=t.docs;t.circle=new d.Graphics,t.circle.beginFill(P,1),t.circle.drawCircle(0,0,n),t.circle.endFill(),t.circle.tint=P,t.circle.position=new d.Point(t.x,t.y),t.circle.hitArea=new d.Circle(0,0,s.distance),t.circle.interactive=!0,e.addChild(t.circle);const[i,o]=(e=>{const t=Math.round(e.length/2);for(let n=t,i=t;n<e.length||i>=0;n++,i--){if(" "===e[n])return[e.substring(0,n),e.substring(n+1)];if(" "===e[i])return[e.substring(0,i),e.substring(i+1)]}return[e,""]})(t.name);t.text=new d.BitmapText(`${i}\n${o}`,{fontName:"NodeFont"}),t.text.scale.set(.2),t.text.align="center",t.text.position.set(t.x-t.text.width/2,t.y+n+2),e.addChild(t.text),t.circle.mouseover=e=>{!function(e){const t=(0,S.Z)("body").append("div").attr("id","focus");t.append("h2").html(e.name),t.append("h3").html(e.docs+" Publications"),t.append("p").html(k),t.append("h3").html("Tokens by tf-idf"),t.append("p").html(T),Object.entries(e.tokens).slice(0,20).forEach((([e,n])=>{const i=E.repeat(n);t.append("p").html(`${i} &nbsp; ${e}`)})),t.append("p").html(k),t.append("h3").html("Publication Years"),t.append("p").html(T),Object.entries(e.years).forEach((([e,n],i)=>{const o=E.repeat(4*n);t.append("p").html(`${o} &nbsp; ${e}`)}))}(t),s.nodes.filter((e=>t.peers.includes(e.id))).forEach((e=>{e.circle.tint=F,e.text.tint=F}))},t.circle.mouseout=e=>{(0,S.Z)("#focus").remove(),s.tokens=[],s.nodes.forEach((e=>{e.circle.tint=P,e.text.tint=P}))}}))};window.s={distance:30,links:v,nodes:Z,tokens:[]},Promise.all([(0,i.Z)(r),(0,i.Z)(a),(0,i.Z)(l),(0,o.ZP)(c)]).then((([e,t,n,i])=>{s.links=t,s.nodes=e,s.triplets=n,console.log("nodes",s.nodes.length),console.log("links",s.links.length),console.log("triplets",s.triplets.length),(e=>{const t=new d.Application({width:window.innerWidth,height:window.innerHeight,antialias:!0,transparent:!0,resolution:2,autoDensity:!0,autoResize:!0,resizeTo:window});document.body.prepend(t.view),s.app=t;const n=d.Texture.from(m);d.BitmapFont.install(e,n),s.pixi=new u.l({screenWidth:window.innerWidth,screenHeight:window.innerHeight,interaction:t.renderer.plugins.interaction}),t.stage.addChild(s.pixi);const i=(0,w.Z)(s.nodes,(e=>e.x)),o=(0,w.Z)(s.nodes,(e=>e.y)),r=i[1]-i[0],a=o[1]-o[0],l=window.innerWidth/r,c=window.innerHeight/a;let p=l<c?l:c;p=p;const h=.9*p;s.pixi.drag().pinch().wheel().decelerate().clampZoom({minScale:h,maxScale:3}).setTransform(window.innerWidth/2,window.innerHeight/2,p,p);const g=(0,f.Z)().domain([h,2]).range([1,0]),x=(0,f.Z)().domain([h,2]).range([0,1]);s.pixi.on("zoomed",(e=>{const t=e.viewport.lastViewport.scaleX;e.viewport.children[2].alpha=g(t),e.viewport.children[3].alpha=x(t),e.viewport.children[4].alpha=x(t),e.viewport.children[5].alpha=g(t)})),window.addEventListener("wheel",(e=>{e.preventDefault()}),{passive:!1})})(i),(()=>{const e=5e3,t=document.createElement("canvas"),n=t.getContext("2d");t.width=e,t.height=e;const i=n.createRadialGradient(2500,2500,0,2500,2500,2500);i.addColorStop(1,"#000000"),i.addColorStop(0,"#333333"),n.fillStyle=i,n.fillRect(0,0,t.width,t.height);let o=d.Texture.from(t),r=new d.Sprite(o);r.width=e,r.height=e,r.position=new d.Point(-2500,-2500),r.interactiveChildren=!1,s.pixi.addChild(r)})(),v(),(()=>{const e=new d.Graphics;s.pixi.addChild(e),e.interactiveChildren=!1;const t=(0,w.Z)(s.nodes,(e=>e.x)),n=(0,w.Z)(s.nodes,(e=>e.y)),i=t[1]-t[0],o=n[1]-n[0],r=t[0],a=n[0],l=(0,y.Z)().x((e=>e.x-r)).y((e=>e.y-a)).weight((e=>e.relevancy)).size([i,o]).cellSize(5).bandwidth(30).thresholds(15)(s.nodes);l.forEach((e=>e.coordinates=e.coordinates.map((e=>e.map((e=>e.map((e=>[e[0]+r,e[1]+a]))))))));const c=1/l.length;let p=1;for(let t=l.length-1;t>=0;t--){const n=1-c*p;e.lineStyle(n,10066329),p+=1,l[t].coordinates.forEach((t=>{t.forEach((t=>{t.forEach((([t,n],i)=>{0==i&&e.moveTo(t,n),e.lineTo(t,n)}))})),e.closePath()}))}})(),Z(),(()=>{const e=new d.Graphics;e.alpha=0,e.interactiveChildren=!1,s.pixi.addChild(e),s.triplets.forEach((t=>{const n=t.tokens.slice(0,3),i=5*n.length/2,o=t.position[0],s=t.position[1];n.forEach((([t,n],r)=>{const a=new d.BitmapText(t,{fontName:"TripletFont"});a.align="center",a.scale.set(.16),a.position.set(o-a.width/2,s-i+5*r),e.addChild(a)}))}))})(),(()=>{const e=new d.Graphics;e.interactiveChildren=!1,b=s.pixi.addChild(e),s.triplets.forEach((e=>{const t=e.tokens.slice(0,1),n=e.position[0],i=e.position[1],o=new d.BitmapText(t[0][0],{fontName:"KeywordFont"});o.align="center";const s=t[0][1];o.scale.set(.007*(s+15)),o.position.set(n-o.width/2,i-o.height/2);let r=!1;for(var a=0;a<C.length;a++){const e=C[a],t=o;if(!(t.x>e.x+e.width||t.x+t.width<e.x||t.y>e.y+e.height||t.y+t.height<e.y)){r=!0;break}}r||(b.addChild(o),C.push(o))}))})(),(()=>{const e=x()({every:1});setInterval((()=>{e.tick()}),1e3/60);const t=document.getElementById("fps");e.on("data",(function(e){t.innerHTML=Math.floor(parseInt(e))}))})(),new(h())({data:{src:async()=>s.nodes.reduce(((e,{name:t,x:n,y:i})=>(e.push({name:t,x:n,y:i}),e)),[]),key:["name"],cache:!1},sort:(e,t)=>e.match<t.match?-1:e.match>t.match?1:0,placeHolder:"Search",selector:"#autoComplete",threshold:0,debounce:0,searchEngine:"loose",highlight:!0,maxResults:10,resultsList:{render:!0,container:e=>{e.setAttribute("id","autoComplete_list")},destination:document.querySelector("#autoComplete"),position:"afterend",element:"ul"},resultItem:{content:(e,t)=>{t.innerHTML=e.match},element:"li"},noResults:()=>{const e=document.createElement("li");e.setAttribute("class","no_result"),e.setAttribute("tabindex","1"),e.innerHTML="No Results",document.querySelector("#autoComplete_list").appendChild(e)},onSelection:e=>{console.log(e),e.selection.key;const t=e.selection.value,{x:n,y:i,name:o}=t;document.querySelector("#autoComplete").value=o;const r=s.pixi.center.x,a=s.pixi.center.y;s.pixi.scale.x<1?s.pixi.animate({scale:5,position:new d.Point(n,i),time:2e3,ease:"easeInOutSine"}):s.pixi.animate({scale:.3,position:new d.Point((n+r)/2,(i+a)/2),time:2e3,ease:"easeInOutSine",callbackOnComplete:()=>{s.pixi.animate({scale:5,position:new d.Point(n,i),time:2e3,ease:"easeInOutSine"})}})}}),window.onresize=function(){s.pixi.resize()}}))}},t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={id:i,loaded:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={179:0},t=[[884,785]],i=()=>{};function o(){for(var i,o=0;o<t.length;o++){for(var s=t[o],r=!0,a=1;a<s.length;a++){var l=s[a];0!==e[l]&&(r=!1)}r&&(t.splice(o--,1),i=n(n.s=s[0]))}return 0===t.length&&(n.x(),n.x=()=>{}),i}n.x=()=>{n.x=()=>{},r=r.slice();for(var e=0;e<r.length;e++)s(r[e]);return(i=o)()};var s=o=>{for(var s,r,[l,c,d,p]=o,h=0,u=[];h<l.length;h++)r=l[h],n.o(e,r)&&e[r]&&u.push(e[r][0]),e[r]=0;for(s in c)n.o(c,s)&&(n.m[s]=c[s]);for(d&&d(n),a(o);u.length;)u.shift()();return p&&t.push.apply(t,p),i()},r=self.webpackChunkcartography_of_nasrn=self.webpackChunkcartography_of_nasrn||[],a=r.push.bind(r);r.push=s})(),n.x()})();