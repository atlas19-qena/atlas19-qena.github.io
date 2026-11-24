(function(){
var D=window.DATA, L='ABCDE';
function seq(p,n,w){var a=[];for(var i=1;i<=n;i++)a.push(''+p+String(i).padStart(2,'0')+'.jpg');return a}
var SETS={
 micro:{id:'micro',title:'Practical Micro: Bacillus, Yersinia & Brucella',items:D.micro,key:true},
 atlas:{id:'atlas',title:'Hematology: Drugs of Anemias',items:D.atlas,key:true},
 physio:{id:'physio',title:'Practical Physiology: Hematology MCQs',items:D.physio,key:false},
 para:{id:'para',title:'Para slides MCQ',items:D.para,key:false,images:seq('pq',60)},
 patho:{id:'patho',title:'Patho Practical MCQ',items:D.patho,key:false,images:seq('pt_q',38)}
};
var SUBJECTS=[
 {id:'patho',name:'Patho',quizzes:['patho'],pages:[{id:'pt',title:'Patho practical slides',pages:seq('pt',5),note:'Reactive hyperplasia, TB lymphadenitis, Hodgkin lymphoma.'}]},
 {id:'micro',name:'Micro',quizzes:['micro'],pages:[]},
 {id:'para',name:'Para',quizzes:['para'],pages:[{id:'ps',title:'Practical slides Para',pages:seq('ps',7),note:'Department-approved slides with their facts.'},{id:'pc',title:'Para Practical Complete',pages:seq('pc',7),note:'Slide by slide worksheet.'}]},
 {id:'physio',name:'Physio',quizzes:['physio'],pages:[]},
 {id:'pharma',name:'Pharma',quizzes:['atlas'],pages:[]},
 {id:'histo',name:'Histo',quizzes:[],pages:[{id:'ph',title:'Histo slides (blood film and more)',pages:seq('ph',15),note:'All histology slide images with their notes.'}]},
 {id:'anat',name:'Anatomy',quizzes:[],pages:[],soon:true},
 {id:'bio',name:'Biochem',quizzes:[],pages:[],soon:true}
];
var app=document.getElementById('app');
var store={};
function load(id){try{return JSON.parse(localStorage.getItem('atlas.picks.'+id)||'{}')}catch(e){return store[id]||{}}}
function save(id,p){store[id]=p;try{localStorage.setItem('atlas.picks.'+id,JSON.stringify(p))}catch(e){}}
function h(tag,attrs,kids){var e=document.createElement(tag);for(var k in (attrs||{})){if(k==='class')e.className=attrs[k];else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),attrs[k]);else if(attrs[k]!==false&&attrs[k]!=null)e.setAttribute(k,attrs[k])}
 (kids||[]).forEach(function(c){if(c==null||c===false)return;e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
function top(title,sub,back){return h('div',{class:'atl-top'},[h('button',{type:'button',class:'atl-back','aria-label':'رجوع',onclick:back},['→']),h('div',{},[h('div',{class:'tt'},[title]),sub?h('div',{class:'ss'},[sub]):null])])}
var state={view:'home',pos:0,sec:'',wrong:false};
function go(v){state={view:v,pos:0,sec:'',wrong:false};render();window.scrollTo(0,0)}
function render(){app.innerHTML='';var v=state.view;
 if(v.indexOf('quiz:')===0)app.appendChild(quiz(SETS[v.slice(5)]));
 else if(v.indexOf('pg:')===0)app.appendChild(pages(v.slice(3)));
 else if(v.indexOf('sub:')===0)app.appendChild(subject(v.slice(4)));
 else app.appendChild(home())}
function subj(id){return SUBJECTS.filter(function(s){return s.id===id})[0]}
function ico(t){return h('span',{class:'atl-ico'},[t])}
function home(){
 var total=Object.keys(SETS).reduce(function(a,k){return a+SETS[k].items.length},0);
 var ready=SUBJECTS.filter(function(s){return !s.soon}).length;
 var hero=h('div',{class:'atl-hero'},[h('div',{class:'atl-brand'},[h('b',{},['Atlas'])]),h('p',{},['مراجعة العملي · موديول الهيماتولوجي'])]);
 var wrap=h('div',{class:'atl-wrap'},[
  h('div',{class:'atl-stats'},[h('div',{class:'atl-stat'},[h('b',{},[ready+' / '+SUBJECTS.length]),h('span',{},['مواد جاهزة'])]),h('div',{class:'atl-stat'},[h('b',{},[String(total)]),h('span',{},['سؤال عملي'])])]),
  h('h2',{},['المواد'])]);
 SUBJECTS.forEach(function(s){
  if(s.soon){wrap.appendChild(h('div',{class:'atl-card',style:'opacity:.6'},[ico(s.name.slice(0,3)),h('span',{class:'t'},[s.name]),h('span',{class:'atl-tag warn'},['Soon'])]));return}
  var q=s.quizzes.reduce(function(a,k){return a+SETS[k].items.length},0);
  var info=[q?q+' questions':'',s.pages.length?s.pages.length+' files':''].filter(Boolean).join(' · ');
  wrap.appendChild(h('button',{type:'button',class:'atl-card',onclick:function(){go('sub:'+s.id)}},[ico(s.name.slice(0,3)),h('span',{},[h('div',{class:'t'},[s.name]),h('div',{class:'s'},[info])])]))});
 wrap.appendChild(h('div',{class:'atl-foot'},['المحتوى كله من ملفات الدفعة. الأسئلة اللي ملفها فيه مفتاح إجابات بس هي اللي بتتصحح.']));
 var f=h('div');f.appendChild(hero);f.appendChild(wrap);return f}
function subject(id){var s=subj(id),w=h('div',{class:'atl-wrap'});
 if(s.quizzes.length)w.appendChild(h('h2',{},['أسئلة']));
 s.quizzes.forEach(function(k){var q=SETS[k],p=load(k),done=q.items.filter(function(i){return p[i.n]}).length;
  w.appendChild(h('button',{type:'button',class:'atl-card',onclick:function(){go('quiz:'+k)}},[ico('MCQ'),h('span',{style:'flex:1'},[h('div',{class:'t'},[q.title]),h('div',{class:'s'},[q.items.length+' questions · '+done+' answered']),h('div',{class:'atl-bar'},[h('i',{style:'width:'+(done/q.items.length*100)+'%'})])]),h('span',{class:'atl-tag'+(q.key?'':' warn')},[q.key?'بمفتاح إجابات':'بدون مفتاح'])]))});
 if(s.pages.length)w.appendChild(h('h2',{},['شرائح وملفات']));
 s.pages.forEach(function(g){w.appendChild(h('button',{type:'button',class:'atl-card',onclick:function(){go('pg:'+g.id)}},[ico('PDF'),h('span',{},[h('div',{class:'t'},[g.title]),h('div',{class:'s'},[g.pages.length+' pages'])])]))});
 var d=h('div');d.appendChild(top(s.name,null,function(){go('home')}));d.appendChild(w);return d}
function pages(id){var g,s;SUBJECTS.forEach(function(x){x.pages.forEach(function(y){if(y.id===id){g=y;s=x}})});
 var w=h('div',{class:'atl-wrap',style:'padding-top:14px'});
 g.pages.forEach(function(src,i){w.appendChild(h('div',{class:'atl-pgl'},['Page '+(i+1)+' of '+g.pages.length]));w.appendChild(h('img',{class:'atl-pg',loading:'lazy',src:src,alt:g.title+', page '+(i+1)}))});
 var d=h('div');d.appendChild(top(g.title,g.pages.length+' pages · '+g.note,function(){go('sub:'+s.id)}));d.appendChild(w);return d}
function quiz(set){var p=load(set.id),s=null;SUBJECTS.forEach(function(x){if(x.quizzes.indexOf(set.id)>=0)s=x});
 var secs=[];set.items.forEach(function(i){if(i.s&&secs.indexOf(i.s)<0)secs.push(i.s)});
 function wrong(q){return set.key&&p[q.n]&&p[q.n]!==q.a}
 var list=set.items.filter(function(q){return (!state.sec||q.s===state.sec)&&(!state.wrong||wrong(q))});
 var idx=Math.min(state.pos,Math.max(list.length-1,0)),cur=list[idx];
 var answered=set.items.filter(function(q){return p[q.n]}).length;
 var correct=set.items.filter(function(q){return set.key&&p[q.n]&&p[q.n]===q.a}).length;
 var w=h('div',{class:'atl-wrap'});
 if(!set.key)w.appendChild(h('div',{class:'atl-note warn',style:'margin-top:14px'},['الملف ده مفيهوش مفتاح إجابات، فبتختار بس ومفيش تصحيح.']));
 if(secs.length){var c=h('div',{class:'atl-chips'});[''].concat(secs).forEach(function(x){c.appendChild(h('button',{type:'button',class:'atl-chip','aria-pressed':String(state.sec===x),onclick:function(){state.sec=x;state.pos=0;render()}},[x||'All']))});w.appendChild(c)}
 if(set.key){w.appendChild(h('div',{class:'atl-chips'},[h('button',{type:'button',class:'atl-chip','aria-pressed':String(state.wrong),onclick:function(){state.wrong=!state.wrong;state.pos=0;render()}},['My mistakes only ('+set.items.filter(wrong).length+')'])]))}
 var g=h('div',{class:'atl-grid'});
 list.forEach(function(q,i){var sl=p[q.n],cls='atl-g'+(i===idx?' cur':'')+(sl?(set.key?(sl===q.a?' ok':' bad'):' pk'):'');g.appendChild(h('button',{type:'button',class:cls,onclick:function(){state.pos=i;render()}},[String(q.n)]))});
 w.appendChild(g);
 if(!cur)w.appendChild(h('div',{class:'atl-note warn'},['مفيش أسئلة هنا. اتصفّى الفلتر.']));
 else{var pk=p[cur.n];
  var card=h('div',{class:'atl-q'},[h('div',{class:'atl-qm'},[h('span',{},['Question '+cur.n+' of '+set.items.length]),cur.s?h('span',{},['· '+cur.s]):null]),
   set.images?h('img',{class:'atl-qi',src:set.images[cur.n-1],alt:'Image for question '+cur.n}):null,h('p',{class:'atl-qt'},[cur.q])]);
  cur.o.forEach(function(o,i){var l=L[i],cls='atl-o';
   if(set.key&&pk){if(l===cur.a)cls+=' ok';else if(l===pk)cls+=' bad'}else if(pk===l)cls+=' pk';
   card.appendChild(h('button',{type:'button',class:cls,onclick:function(){if(p[cur.n])return;p[cur.n]=l;save(set.id,p);render()}},[h('span',{class:'l'},[l]),h('span',{},[o])]))});
  if(set.key&&pk)card.appendChild(pk===cur.a?h('div',{class:'atl-note ok'},['إجابة صحيحة ('+cur.a+')']):h('div',{class:'atl-note bad'},['غلط. الإجابة الصحيحة: '+cur.a]));
  if(!set.key&&pk)card.appendChild(h('div',{class:'atl-note warn'},['اخترت '+pk+'. مفيش مفتاح إجابة في الملف.']));
  w.appendChild(card);
  w.appendChild(h('div',{class:'atl-nav'},[h('button',{type:'button',class:'atl-btn',disabled:idx===0?'':false,onclick:function(){state.pos=idx-1;render();window.scrollTo(0,0)}},['← Previous']),h('button',{type:'button',class:'atl-btn p',disabled:idx>=list.length-1?'':false,onclick:function(){state.pos=idx+1;render();window.scrollTo(0,0)}},['Next →'])]))}
 w.appendChild(h('div',{class:'atl-nav'},[h('button',{type:'button',class:'atl-btn',onclick:function(){if(confirm('تمسح كل اختياراتك في الأسئلة دي؟')){save(set.id,{});state.pos=0;state.wrong=false;render()}}},['ابدأ من الأول (يمسح اختياراتك)'])]));
 var d=h('div');d.appendChild(top(set.title,answered+' / '+set.items.length+' answered'+(set.key?' · '+correct+' correct':''),function(){go('sub:'+s.id)}));d.appendChild(w);return d}
render();
})();
