(this.webpackJsonpgraphpainter=this.webpackJsonpgraphpainter||[]).push([[0],{26:function(t,e,n){},34:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=n(11),c=n.n(i),a=(n(26),n(3)),h=function(t){return t.reduce((function(t,e,n){var r=e.split(" "),o=Object(a.a)(r,3),i=o[0],c=o[1],h=o[2];return""===i?t:(t[i]=t[i]||[],void 0===c&&void 0===h||""===c||t[i].push([c,h]),t)}),{})},u=n(5),s=n(2),f="SETSHORTESTPATH",d={from:"",to:"",path:{}},j=function(t){return{type:f,payload:t}};var l="SETGRAPHINFO",b={graph:{vertexCount:"0",edgeCount:"",graph:{}}},g=function(t){return{type:l,payload:t}};var p=n(1),v=function(){var t=Object(u.b)(),e=Object(r.useState)("6\n1 2 2\n2 3 8\n3 4 1\n1 4 9\n4 5 7\n5 6 2\n4 6 6\n3 6 9"),n=Object(a.a)(e,2),o=n[0],i=n[1];Object(r.useEffect)((function(){var e=o.split("\n"),n=h(e.splice(1));t(g({vertexCount:"6",edgeCount:"",graph:n}))}),[o,t]);return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)("textarea",{style:{resize:"none"},value:o,onChange:function(e){var n=function(t){var e=t.target.value.split("\n"),n=e[0].split(" "),r=Object(a.a)(n,2),o=r[0],i=r[1];if(!0!==isNaN(Number(o))||!0!==isNaN(Number(i)))return{vertexCount:o,edgeCount:i,graph:h(e.splice(1))}}(e);void 0!==n&&(t(g(n)),t(j(d))),i((function(t){return e.target.value}))}})})},O=function(t){var e=t.onChange;return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("label",{className:"direct-button",children:[Object(p.jsx)("input",{type:"checkbox",onChange:e}),Object(p.jsx)("span",{className:"onoff-switch"})]})})},x=function(t){var e=t.text,n=t.name,r=t.onChange,o=t.value;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("label",{style:{fontSize:"13px"},children:[" ",e," "]}),Object(p.jsx)("input",{type:"text",name:n,onChange:r,value:o,style:{width:"40px",height:"25px"}})]})},m="SETDIRECT",y={directed:!1};var k=n(6),C=n(8),w=n(18),T=n.n(w),I=Math.floor(Number.MAX_SAFE_INTEGER/987),M=function(){function t(e){Object(k.a)(this,t),this.initGraph=void 0,this.from=void 0,this.to=void 0,this.graph={},this.vertexCount=0,this.initGraph=e.getGraphInfo(),this.from=e.getFromVertex(),this.to=e.getToVertex(),this.vertexCount=Number(this.initGraph.vertexCount)}return Object(C.a)(t,[{key:"run",value:function(){return this.mapping(),!1!==this.isExistVertex()&&this.backtracking(this.dijkstra())}},{key:"mapping",value:function(){var t=this;Object.entries(this.initGraph.graph).forEach((function(e){var n=Object(a.a)(e,2),r=n[0],o=n[1];t.isExceedVertexCount(t.graph)&&o.length<=0||(t.graph[r]=t.graph[r]||{},o.forEach((function(e){var n=Object(a.a)(e,2),o=n[0],i=n[1];void 0===o&&void 0===i||t.isExceedVertexCount(t.graph)&&!t.graph[o]||(t.graph[o]=t.graph[o]||{},!1===Object.keys(t.graph[r]).includes(o)&&(t.graph[r][o]=i),!1===Object.keys(t.graph[o]).includes(r)&&(t.graph[o][r]=i))})))}))}},{key:"dijkstra",value:function(){var t=this,e={},n={};Object.keys(this.graph).forEach((function(t){e[t]=e[t]||I,n[t]=n[t]||t})),e[this.from]=0;var r=new T.a({comparator:function(t,e){return t[0]-e[0]}});r.queue([0,this.from]);for(var o=function(){var o=r.peek(),i=Object(a.a)(o,2),c=i[0],h=i[1];if(r.dequeue(),e[h]<c)return"continue";Object.entries(t.graph[h]).forEach((function(t){var o=Object(a.a)(t,2),i=o[0],u=o[1],s=Number(u)+c;s<e[i]&&(n[i]=h,e[i]=s,r.queue([s,i]))}))};r.length;)o();return n}},{key:"backtracking",value:function(t){for(var e={},n=this.to;n!==t[n];)e[n]=e[n]||!1,n=t[n];return e[n]=e[n]||!1,e[this.to]=!0,e[this.from]=!0,e}},{key:"isExistVertex",value:function(){return Object.keys(this.graph).includes(this.from)&&Object.keys(this.graph).includes(this.to)}},{key:"isExceedVertexCount",value:function(t){return Object.keys(this.graph).length>=this.vertexCount}}]),t}(),S=function(){function t(){Object(k.a)(this,t),this.graphInfo=void 0,this.from=void 0,this.to=void 0}return Object(C.a)(t,[{key:"setGraphInfo",value:function(t){return this.graphInfo=t,this}},{key:"setFromVertex",value:function(t){return this.from=t,this}},{key:"setToVertex",value:function(t){return this.to=t,this}},{key:"getGraphInfo",value:function(){return this.graphInfo}},{key:"getFromVertex",value:function(){return this.from}},{key:"getToVertex",value:function(){return this.to}},{key:"build",value:function(){return new M(this)}}]),t}(),E={margin:"12px",fontSize:"15px"},P=function(){var t=Object(u.b)(),e=Object(r.useState)({from:"",to:""}),n=Object(a.a)(e,2),o=n[0],i=n[1],c=Object(u.c)((function(t){return{graphInfo:t.graph.graph}})).graphInfo,h=function(t){var e=t.target,n=e.name,r=e.value;i("path-from"===n?function(t){return Object(s.a)(Object(s.a)({},t),{},{from:r})}:function(t){return Object(s.a)(Object(s.a)({},t),{},{to:r})})};return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"config",children:[Object(p.jsx)("label",{style:E,children:"Undirected : Directed"}),Object(p.jsx)(O,{onChange:function(e){return t((n=e.target.checked,{type:m,payload:n}));var n}}),Object(p.jsx)("label",{style:E,children:"Shortest Path Find"}),Object(p.jsxs)("div",{children:[Object(p.jsx)(x,{text:"from",name:"path-from",onChange:h,value:o.from}),Object(p.jsx)(x,{text:"to",name:"path-to",onChange:h,value:o.to})]}),Object(p.jsx)("button",{onClick:function(){var e=(new S).setGraphInfo(c).setFromVertex(o.from).setToVertex(o.to).build().run();!1!==e&&t(j({from:o.from,to:o.to,path:e}))},children:"Find"}),Object(p.jsx)("img",{onClick:function(){return window.open("https://github.com/dkpark10/graphpainter","_blank")},style:{width:"45px",height:"45px",cursor:"pointer"},alt:"my github",src:"https://media.cdnandroid.com/item_images/1097581/imagen-github-0thumb.jpeg"})]})})},N=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("aside",{children:[Object(p.jsx)(v,{}),Object(p.jsx)(P,{})]})})},F=function(){return Object(p.jsx)("header",{children:Object(p.jsx)("h1",{children:"Graph Painter"})})},B=n(12),A=n(21),G=function(t){var e=t.size,n=t.value,o=t.onPointerDown,i=t.onPointerUp,c=t.onPointerMove,a=t.isDraged,h=t.color,u=void 0===h?"#cfcfcf":h,s=e.y,f=e.x,d=Object(r.useRef)(null),j=Object(r.useRef)(null),l=a.dragActive&&a.currentNode===d.current;Object(r.useEffect)((function(){return function(){d.current=null,j.current=null}}),[]);return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("g",{style:{cursor:"pointer"},children:[Object(p.jsx)("circle",{ref:d,cy:f,cx:s,r:"22",fill:l?"#ebe534":"#16afc0",stroke:u,strokeWidth:"2.5",onPointerDown:o,onPointerUp:i,onPointerMove:c,onMouseOver:function(t){t.currentTarget.setAttribute("fill","#ebe534"),j.current.setAttribute("fill","black")},onMouseOut:function(t){t.currentTarget.setAttribute("fill","#16afc0"),j.current.setAttribute("fill","white")}}),Object(p.jsx)("text",{ref:j,style:{fontWeight:"bold"},y:f,x:s,dy:".35em",fontSize:"17",fill:l?"black":"white",textAnchor:"middle",children:n})]})})},L=o.a.memo(G),V=function(t){var e=t.from,n=t.to,r=t.cost,o=t.color,i=void 0===o?"#cfcfcf":o,c=Object(u.c)((function(t){return{direct:t.direct.directed}})).direct,h=Object(a.a)(e,2),s=h[0],f=h[1],d=Object(a.a)(n,2),j=d[0],l=d[1],b=function(t,e){var n=Math.max(t[0],e[0]),r=Math.max(t[1],e[1]),o=Math.min(t[0],e[0]),i=Math.min(t[1],e[1]),c=0;return e[0]>t[0]&&e[1]>t[1]?c+=15:e[0]<t[0]&&e[1]<t[1]&&(c+=12),[(n-o)/2+o-c,(r-i)/2+i+c]}(e,n),g=Object(a.a)(b,2),v=g[0],O=g[1],x="M ".concat(s," ").concat(f," L ").concat(j," ").concat(l),m=!0===c?"url(#arrow)":"";return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("g",{children:[Object(p.jsx)("defs",{children:Object(p.jsx)("marker",{id:"arrow",viewBox:"0 0 10 10",refX:"23",refY:"5",markerWidth:"8",markerHeight:"8",orient:"auto-start-reverse",children:Object(p.jsx)("path",{d:"M 0 0 L 10 5 L 0 10 z",fill:"#cfcfcf"})})}),Object(p.jsx)("path",{d:x,strokeWidth:"2",stroke:i,markerEnd:m}),Object(p.jsx)("text",{y:O,x:v,dx:".3em",dy:".9em",fontSize:"17",fill:i,textAnchor:"right",children:r})]})})},R=function t(e,n){Object(k.a)(this,t),this.y=void 0,this.x=void 0,this.y=e,this.x=n},D=function(){function t(e){Object(k.a)(this,t),this.graphInfo=void 0,this.vertexCount=0,this.leftTop=void 0,this.rightBottom=void 0,this.nodeCoord=[],this.graphInfo=e.getGraphInfo(),this.leftTop=e.getLeftTop(),this.rightBottom=e.getRightBottom(),this.vertexCount=Number(this.graphInfo.vertexCount)}return Object(C.a)(t,[{key:"run",value:function(){return this.BinarySpacePartitioning(Object(s.a)({},this.leftTop),Object(s.a)({},this.rightBottom),0),this.extractNodeCoordList(),this.extractVertex()}},{key:"BinarySpacePartitioning",value:function(t,e,n){if(Math.pow(2,n)>=this.vertexCount){var r=Math.floor(Math.random()*(e.y-t.y)+t.y),o=Math.floor(Math.random()*(e.x-t.x)+t.x);this.nodeCoord.push(new R(r,o))}else{var i=Math.floor(Math.floor(2*Math.random())),c=Math.floor(3*Math.random()+4);if(0===i){var a=(e.y-t.y)*c/10+t.y;this.BinarySpacePartitioning(Object(s.a)({},t),new R(a,e.x),n+1),this.BinarySpacePartitioning(new R(a+1,t.x),Object(s.a)({},e),n+1)}else{var h=(e.x-t.x)*c/10+t.x;this.BinarySpacePartitioning(Object(s.a)({},t),new R(e.y,h),n+1),this.BinarySpacePartitioning(new R(t.y,h+1),Object(s.a)({},e),n+1)}}}},{key:"extractNodeCoordList",value:function(){for(var t=this.nodeCoord.length-this.vertexCount;t;){var e=this.nodeCoord.length,n=Math.floor(Math.random()*e);this.nodeCoord.splice(n,1),t--}}},{key:"extractVertex",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{connectedList:[],coord:void 0},n={};return Object.entries(this.graphInfo.graph).forEach((function(r,o){var i=Object(a.a)(r,2),c=i[0],h=i[1];Object.keys(n).length>=t.vertexCount&&!1===Object.keys(n).includes(c)||(n[c]=n[c]||Object(s.a)({},e),n[c].coord||(n[c].coord=t.nodeCoord[0],t.nodeCoord.shift()),n[c].connectedList=t.connect(n,h))})),n}},{key:"connect",value:function(t,e){var n=this,r=[];return e.forEach((function(e){""!==e[0]&&void 0!==e[0]&&(Object.keys(t).length>=n.vertexCount&&void 0===t[e[0]]||(r.push(e),t[e[0]]=t[e[0]]||{connectedList:[],coord:void 0},t[e[0]].coord||(t[e[0]].coord=n.nodeCoord[0],n.nodeCoord.shift())))})),r}}]),t}(),z=function(){function t(){Object(k.a)(this,t),this.graphInfo=void 0,this.leftTop=void 0,this.rightBottom=void 0}return Object(C.a)(t,[{key:"setGraphInfo",value:function(t){return this.graphInfo=t,this}},{key:"setLeftTop",value:function(t){return this.leftTop=t,this}},{key:"setRightBottom",value:function(t){return this.rightBottom=t,this}},{key:"getGraphInfo",value:function(){return this.graphInfo}},{key:"getLeftTop",value:function(){return this.leftTop}},{key:"getRightBottom",value:function(){return this.rightBottom}},{key:"build",value:function(){return new D(this)}}]),t}(),H=20,W=function(t,e){return t<=H&&(t=40),t>=e.height-H&&(t=e.height-40),t},U=function(){var t=Object(r.useRef)(null),e=Object(r.useState)({width:0,height:0}),n=Object(a.a)(e,2),o=n[0],i=n[1],c=Object(r.useState)({}),h=Object(a.a)(c,2),f=h[0],d=h[1],j=Object(r.useState)({dragActive:!1,currentNode:null}),l=Object(a.a)(j,2),b=l[0],g=l[1],v=Object(r.useState)([0,0]),O=Object(a.a)(v,2),x=O[0],m=O[1],y=Object(u.c)((function(t){return{graphInfo:t.graph.graph,shortestPath:t.path}})),k=y.graphInfo,C=y.shortestPath;Object(r.useEffect)((function(){i((function(e){return Object(s.a)(Object(s.a)({},e),{},{width:t.current.offsetWidth,height:t.current.offsetHeight})}));var e=(new z).setGraphInfo(k).setLeftTop(new R(40,40)).setRightBottom(new R(o.width-40,o.height-40)).build();d((function(t){return Object(s.a)({},e.run())}))}),[t,k,o.width,o.height]);var w=function(t){var e=t.currentTarget.getBoundingClientRect(),n=t.clientX-e.left,r=t.clientY-e.top;t.currentTarget.setPointerCapture(t.pointerId),m((function(t){return[n,r]})),g(Object(s.a)(Object(s.a)({},b),{},{dragActive:!0,currentNode:t.currentTarget}))},T=function(){g((function(t){return Object(s.a)(Object(s.a)({},t),{},{dragActive:!1,currentNode:null})}))},I=Object.entries(f).map((function(t,e){var n=Object(a.a)(t,2),r=n[0],i=n[1];return Object(p.jsx)(L,{size:{y:i.coord.y,x:i.coord.x},value:r,onPointerMove:function(e){return function(t,e){t.preventDefault();var n=Object(a.a)(e,2),r=n[0],i=n[1],c=t.movementX+x[1],h=t.movementY+x[0];if(b.dragActive){var u=Object(A.a)(x),j=W(i.coord.y-(u[1]-c),o),l=W(i.coord.x-(u[0]-h),o);d((function(t){return Object(s.a)(Object(s.a)({},t),{},Object(B.a)({},r,Object(s.a)(Object(s.a)({},f[r]),{},{coord:new R(j,l)})))}))}}(e,t)},onPointerDown:w,onPointerUp:T,isDraged:b},e)})),M=Object.entries(f).map((function(t,e,n){var r=Object(a.a)(t,2),o=r[0],i=r[1],c=i.coord;return i.connectedList.map((function(t,r){var i=Object(a.a)(t,2),h=i[0],u=i[1],s=f[h].coord,d=function(t,e,n){var r=Object.keys(t);if(0===r.length)return!1;var o=r.indexOf(e),i=r.indexOf(n);return-1!==o&&-1!==i&&Math.abs(o-i)<=1}(C.path,o,h)?"#ebe534":void 0;return Object(p.jsx)(V,{from:[c.y,c.x],to:[s.y,s.x],cost:u,color:d},e*n.length+r)}))}));return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)("main",{ref:t,children:Object(p.jsxs)("svg",{style:{width:o.width,height:o.height},children:[M,I]})})})},X=function(){return console.log("App render"),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(F,{}),Object(p.jsxs)("div",{className:"container",children:[Object(p.jsx)(N,{}),Object(p.jsx)(U,{})]})]})},_=n(9),q=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(e){var n=e.getCLS,r=e.getFID,o=e.getFCP,i=e.getLCP,c=e.getTTFB;n(t),r(t),o(t),i(t),c(t)}))},Y=n(19),J=n.n(Y),K=n(20),Q=Object(_.combineReducers)({graph:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1?arguments[1]:void 0;return e.type===l?Object(s.a)(Object(s.a)({},t),{},{graph:e.payload}):t},direct:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=arguments.length>1?arguments[1]:void 0;return e.type===m?Object(s.a)(Object(s.a)({},t),{},{directed:e.payload}):t},path:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,e=arguments.length>1?arguments[1]:void 0;return e.type===f?Object(s.a)(Object(s.a)({},t),{},{from:e.payload.from,to:e.payload.to,path:e.payload.path}):t}}),Z=Object(_.createStore)(Q,J.a);c.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(K.a,{children:Object(p.jsx)(u.a,{store:Z,children:Object(p.jsx)(X,{})})})}),document.getElementById("root")),q()}},[[34,1,2]]]);
//# sourceMappingURL=main.b59de5c0.chunk.js.map