(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e){e.exports={siteUrl:"https://zarcode.github.io/gitlab-ci-pwa",clientId:"134f639e5be587597c61a236573989ad112728cdb7c45b063ddbd327efb0a4d1"}},125:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(79),o=n.n(c),i=(n(94),n(19)),u=n(131),l=n(133),p=n(134),s=n(10),E=n(100),d=E.clientId,j=E.siteUrl;var b=function(e){var t=e.hash,n="https://gitlab.com/oauth/authorize?client_id=".concat(d,"&redirect_uri=").concat(j)+"&response_type=token&state=".concat(t);return a.a.createElement("div",null,a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("a",{href:n},"Login"))))},f=(n(82),function(e){return{type:"LOGIN_REQUESTED",token:e}}),O=function(){return{type:"LOGOUT"}},h=n(126),I=function(){return{type:"FETCH_PROJECTS"}};var m=Object(i.b)(function(e){return{projects:e.projects,auth:e.auth}},function(e){return{actions:Object(s.b)({fetchProjects:I},e)}})(function(e){var t=e.projects,n=e.auth,c=e.actions;return Object(r.useEffect)(function(){n.isAuthenticated&&!t.loading&&c.fetchProjects()},[]),a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Projects"),t.list.map(function(e){return a.a.createElement("h3",{key:e.id},a.a.createElement(h.a,{to:"/project/".concat(e.id)},e.name_with_namespace))}))}),S=n(83),_=n.n(S),g=n(58),v=n.n(g),C=n(84),y=n.n(C),T=(n(117),n(118),n(21)),P=n.n(T),F=n(60),L=n.n(F),k=n(85),w=n.n(k),H=(n(121),n(122),n(40)),U=[new H.b.Entity("pipeline")],N=function(e){return{type:"FETCH_PIPELINES",projectId:e}},A=n(20),R=n(9),J=n(86),G={byId:{},ids:[],loading:!1},D=function(e){return e.pipelines.loading},x=Object(J.a)([function(e){return e.pipelines.ids},function(e){return e.pipelines.byId}],function(e,t){return e.map(function(e){return t[e]})});var z=Object(i.b)(function(e){return{pipelines:x(e),loading:D(e)}},function(e){return{actions:Object(s.b)({fetchPipelines:N},e)}})(function(e){var t=e.pipelines,n=e.loading,c=e.actions,o=e.match;return e.history,Object(r.useEffect)(function(){n||P()(L()(c.fetchPipelines),w()(v()(y.a)),L()(parseInt),_()(["params","projectId"]))(o)},[]),a.a.createElement(a.a.Fragment,null,a.a.createElement(h.a,{to:"/"},"Projects"),a.a.createElement("h2",null,"Project"),t.map(function(e){return a.a.createElement("div",{key:e.id},a.a.createElement("h3",null,"#".concat(e.id)),a.a.createElement("div",null))}))});var B=Object(i.b)(function(e){return{stateHash:"hello",auth:e.auth}},function(e){return{actions:Object(s.b)({login:f,logout:O},e)}})(function(e){var t=e.stateHash,n=e.auth,c=e.actions,o=new URLSearchParams(window.location.hash),i=o.get("#access_token"),s=o.get("state");return Object(r.useEffect)(function(){!n.isAuthenticated&&i&&s===t&&c.login(i)},[]),a.a.createElement(a.a.Fragment,null,n.isAuthenticated?a.a.createElement(u.a,null,a.a.createElement("div",null,a.a.createElement("button",{onClick:c.logout},"Logout"),a.a.createElement(l.a,null,a.a.createElement(p.a,{exact:!0,path:"/",component:m}),a.a.createElement(p.a,{path:"/project/:projectId",component:z})))):a.a.createElement(b,{hash:t}))}),V=n(130),Q=n(135),W=n(39),X=n(78),M=n(127),$=n(128),q=n(132),K=n(129),Y=n(77),Z=n(32),ee=function(e){return e.then(function(e){if(!e.ok)throw Error(e.statusText);return e}).then(function(e){return e.json()})},te=function(e){var t=e.url,n=e.token;Object(Z.a)(e,["url","token"]);return fetch(t,{headers:{Authorization:"Bearer ".concat(n)}})},ne=P()(ee,te,function(e){return Object(R.a)({url:"https://gitlab.com/api/v4/user"},e)}),re=P()(function(e){return console.log(e),e},ee,te,function(e){var t=e.userId,n=Object(Z.a)(e,["userId"]);return Object(R.a)({url:"https://gitlab.com/api/v4/users/".concat(t,"/projects")},n)}),ae=P()(ee,te,function(e){var t=e.projectId,n=Object(Z.a)(e,["projectId"]);return Object(R.a)({url:"https://gitlab.com/api/v4/projects/".concat(t,"/pipelines")},n)}),ce=P()(ee,te,function(e){var t=e.projectId,n=e.pipelineId,r=Object(Z.a)(e,["projectId","pipelineId"]);return Object(R.a)({url:"https://gitlab.com/api/v4/projects/".concat(t,"/pipelines/").concat(n)},r)}),oe=(P()(ee,te,function(e){e.projectId;var t=Object(Z.a)(e,["projectId"]);return Object(R.a)({url:"https://gitlab.com/api/v4/projects/:id/pipelines/:pipeline_id/jobs"},t)}),function(e){try{!function(e){var t=JSON.stringify(e);localStorage.setItem("state",t)}(e)}catch(t){return{type:"NOT_SAVED"}}return{type:"SAVED"}}),ie=Object(Q.a)(function(e,t){return e.pipe(Object(M.a)(function(e){return"LOGIN_REQUESTED"===e.type}),Object($.a)(function(e){return Object(W.a)(ne({token:e.token})).pipe(Object($.a)(function(n){return Object(X.a)((r=n,{type:"FETCH_USER_SUCCESS",response:r})).pipe(Object(q.a)(Object(X.a)(oe({auth:t.value.auth,user:n})),Object(X.a)({type:"LOGIN_SUCCESS",token:e.token}),Object(X.a)(I())));var r}),Object(K.a)(function(e){return Object(X.a)({type:"FETCH_USER_FAIL",error:e.message})}))}))},function(e,t){return e.pipe(Object(M.a)(function(e){return"LOGOUT"===e.type}),Object(Y.a)(function(e){return oe({auth:t.value.auth,user:{}})}))},function(e,t){return e.ofType("FETCH_PROJECTS").pipe(Object($.a)(function(){return Object(W.a)(re({token:t.value.auth.token,userId:t.value.user.id})).pipe(Object(Y.a)(function(e){return{type:"FETCH_PROJECTS_SUCCESS",response:e}}),Object(K.a)(function(e){return Object(X.a)({type:"FETCH_PROJECTS_FAIL",error:e.message})}))}))},function(e,t){return e.ofType("FETCH_PIPELINES").pipe(Object($.a)(function(e){return Object(W.a)(ae({token:t.value.auth.token,projectId:e.projectId})).pipe(Object($.a)(function(t){return Object(X.a)((n=t,{type:"FETCH_PIPELINES_SUCCESS",response:Object(H.a)(n,U)})).pipe(q.a.apply(void 0,Object(A.a)(t.map(function(t){return Object(X.a)({type:"FETCH_PIPELINE",pipelineId:t.id,projectId:e.projectId})}))));var n}),Object(K.a)(function(e){return Object(X.a)({type:"FETCH_PIPELINES_FAIL",error:e.message})}))}))},function(e,t){return e.ofType("FETCH_PIPELINE").pipe(Object($.a)(function(e){return Object(W.a)(ce({token:t.value.auth.token,pipelineId:e.pipelineId,projectId:e.projectId})).pipe(Object(Y.a)(function(e){return{type:"FETCH_PIPELINE_SUCCESS",response:e}}),Object(K.a)(function(e){return Object(X.a)({type:"FETCH_PIPELINE_FAIL",error:e.message})}))}))}),ue={isAuthenticated:!1,token:null},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_SUCCESS":return{isAuthenticated:!0,token:t.token};case"LOGOUT":return ue;default:return e}},pe={list:[],loading:!1},se=Object(s.c)({auth:le,projects:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_PROJECTS":return Object(R.a)({},e,{loading:!0});case"FETCH_PROJECTS_SUCCESS":return{loading:!1,list:Object(A.a)(e.list).concat(Object(A.a)(t.response))};case"FETCH_PROJECTS_FAIL":return Object(R.a)({},e,{loading:!1});default:return e}},pipelines:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_PIPELINES":return Object(R.a)({},e,{loading:!0});case"FETCH_PIPELINES_SUCCESS":return{byId:Object(R.a)({},e.byId,t.response.entities.pipeline),ids:Object(A.a)(e.ids).concat(Object(A.a)(t.response.result)),loading:!1};case"FETCH_PIPELINES_FAIL":return Object(R.a)({},e,{loading:!1});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_USER_SUCCESS":return Object(R.a)({},e,t.response);case"FETCH_USER_FAIL":default:return e}}}),Ee=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return}}(),de=function(){var e=Object(V.a)(),t=[e],n=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d,r=Object(s.e)(se,Ee,n(s.a.apply(void 0,t)));return e.run(ie),r}(),je=function(){return a.a.createElement(i.a,{store:de},a.a.createElement(B,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(je,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},89:function(e,t,n){e.exports=n(125)},94:function(e,t,n){}},[[89,2,1]]]);
//# sourceMappingURL=main.eeb7614e.chunk.js.map