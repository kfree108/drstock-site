/* Orbit suite — "The whole team. Included free." Shared drop-in section.
   <link rel="stylesheet" href="/shared/orbit-suite.css">
   <div data-orbit-suite data-current="dr-ppc"></div>          (data-current: ava|dr-ppc|dr-stock|bruno|dr-shield|dr-dsp|none; optional data-theme="light")
   <script src="/shared/orbit-suite.js" defer></script>
   Self-contained: no host JS/CSS dependencies, no fixed UI, everything namespaced .os-*. All numbers are demo data. */
(function(){
'use strict';
if(window.OrbitSuite&&window.OrbitSuite.v)return;
var W=window,DOC=document;
var MQ=W.matchMedia?W.matchMedia('(prefers-reduced-motion: reduce)'):null;
function reduced(){return !!(MQ&&MQ.matches);}
var NS='http://www.w3.org/2000/svg';
var VID='/agents/';
var ORBIT_URL='https://fullcircleorbit.com/';
var AUTO_MS=5000,CO_MS=4600,SCROLL_STEP=420;

var LOGO='<svg viewBox="728 307 464 465" aria-hidden="true" focusable="false"><path fill="#fbbf24" d="M1089.54,350.04c-187.96-124.37-421.45,60.96-344.01,271.99,25.05,68.050,85.97,122.37,156.1,140.49,70.56,19.07,150.06,1.55,205.93-45.65,116.56-95.41,107.71-283-17.8-366.68l-.22-.15ZM1035.95,369c12.72.53,33.81,1.72,20.09,17.95-7.370,9.17-14.78,18.08-21.44,25.99-51.85,60.6-84.570,96.16-151.48,61.37-6.71-3.78-6.78-9.22-2.34-15.3,38.09-46.05,95.79-88.97,154.91-90.03h.26ZM864.76,489.66c3.88-.95,8.36,2.82,11.26,5.88,38.59,36.34,39.72,69.54,6.08,133.75-10.46,20.7-19.96,38.11-31.97,58.67-5.38,8.78-10.74,8.3-15.86-.34-3.9-6.34-7.04-13.63-9.38-21.69-14.05-55.84,2.89-112.95,29.93-165.64,2.19-4.15,5.68-9.74,9.78-10.6l.16-.04ZM860.14,704.04c-.87-2.96,2.69-8.18,5.38-11.4,14.16-17.43,25.63-31.36,40.3-47.57,48.53-56.04,81.6-64.78,132.22-38.69,2.97,1.87,4.79,4.18,4.86,6.97.2,3.79-3.27,8.57-6.09,11.83-28.04,32.13-58,56.19-93.33,72.27-22.16,9.89-49.66,17.18-73.79,12.44-4.07-.69-9.16-2.7-9.54-5.73l-.03-.14ZM1056,590.7c-3.88.95-8.36-2.82-11.26-5.88-38.59-36.34-39.72-69.54-6.08-133.75,10.46-20.7,19.96-38.11,31.97-58.67,5.38-8.78,10.74-8.3,15.86.34,3.9,6.34,7.04,13.63,9.38,21.69,14.05,55.840-2.89,112.95-29.93,165.64-2.19,4.15-5.68,9.74-9.78,10.6l-.16.04ZM798.99,430.45c37.35-54.77,100.75-86.8,164.25-86.58,3.31.17,4.93.76,4.34,1.84-.29,1.01-4.88,3.52-7.22,4.65-47.81,24.15-88.63,63.71-120.04,109.66-32.13,48-51.91,96.19-57.29,149.42-.19,2.66-.88,8.13-1.83,8.53-.82.68-1.98-.79-3.35-3.86-.74-1.64-1.52-3.71-2.29-5.88-21.07-59.06-12.6-125.79,23.27-177.54l.16-.23ZM1121.9,649.72c-35.28,52.150-94.88,84.57-157.85,86.85-3.06.01-11.31.73-11.21-1.61,0-1.01,4.9-3.67,7.32-4.83,39.95-20.35,72.56-48.79,102.5-85.73,41.1-51.72,69.65-112.84,75.24-175.3.58-5.41,1.51-10.04,4.79-2.99,23.62,58.48,16.91,128.91-20.63,183.39l-.15.23Z"/></svg>';

/* ---------- demo dataset (same as the Orbit site) ---------- */
var D={
days:["Aug 29","Aug 30","Aug 31","Sep 1","Sep 2","Sep 3","Sep 4","Sep 5","Sep 6","Sep 7","Sep 8","Sep 9","Sep 10","Sep 11","Sep 12","Sep 13","Sep 14","Sep 15","Sep 16","Sep 17","Sep 18","Sep 19","Sep 20","Sep 21","Sep 22","Sep 23","Sep 24","Sep 25","Sep 26","Sep 27"],
sales:[5270.92,4851.32,4947.57,4494.28,5004.91,4625.58,4926.44,5470.05,5637.59,4727.21,4642.32,5180.86,4920.74,5070.65,5124.83,7048.72,6378.11,5070.62,4886.49,5151.04,5285.63,5616.0,6076.89,4864.23,5246.3,5288.32,5053.25,5589.52,5470.7,6152.3],
orders:[196,182,178,161,182,167,177,203,207,174,170,187,182,182,183,253,230,187,183,185,198,208,216,180,194,197,187,207,194,220],
profit:[1145.08,1050.06,998.29,957.62,993.58,962.8,1026.78,1129.69,1188.28,1071.97,967.86,1062.49,996.26,1116.91,1019.22,1489.16,1316.52,1034.35,1060.44,1030.4,1095.34,1181.11,1228.12,1024.72,1124.54,1055.22,1089.19,1213.46,1113.21,1324.68],
tacos:[10.65,11.59,11.8,13.23,13.36,10.82,11.62,13.67,12.16,13.37,13.21,11.62,14.19,11.58,14.14,11.84,11.66,10.74,14.03,12.83,13.8,11.5,14.15,13.09,11.8,13.07,12.25,12.05,13.32,11.1],
acos:[29.13,30.53,32.37,31.13,32.71,29.15,28.49,32.18,31.45,32.93,32.28,31.85,32.79,28.38,32.81,32.09,30.74,28.82,32.69,32.24,33.45,29.15,33.36,33.46,28.39,32.65,32.88,31.82,33.54,28.41]
};

/* ---------- chart helpers (ported from the Orbit site) ---------- */
function r1(n){return Math.round(n*10)/10;}
function mono(p){var n=p.length,i;if(n<2)return '';var dx=[],m=[],t=[];
  for(i=0;i<n-1;i++){dx[i]=p[i+1][0]-p[i][0];m[i]=(p[i+1][1]-p[i][1])/dx[i];}
  t[0]=m[0];t[n-1]=m[n-2];for(i=1;i<n-1;i++){t[i]=m[i-1]*m[i]<=0?0:(m[i-1]+m[i])/2;}
  for(i=0;i<n-1;i++){if(m[i]===0){t[i]=0;t[i+1]=0;continue;}var a=t[i]/m[i],b=t[i+1]/m[i],s=a*a+b*b;if(s>9){var q=3/Math.sqrt(s);t[i]=q*a*m[i];t[i+1]=q*b*m[i];}}
  var d='M'+r1(p[0][0])+' '+r1(p[0][1]);
  for(i=0;i<n-1;i++){var h=dx[i]/3;d+='C'+r1(p[i][0]+h)+' '+r1(p[i][1]+t[i]*h)+' '+r1(p[i+1][0]-h)+' '+r1(p[i+1][1]-t[i+1]*h)+' '+r1(p[i+1][0])+' '+r1(p[i+1][1]);}
  return d;}
function lin(d0,d1,a,b){return function(v){return a+(v-d0)/(d1-d0)*(b-a);};}
function pts(arr,sx,sy){return arr.map(function(v,i){return [sx(i),sy(v)];});}
function line(d,col,w,cls,dl){return '<path class="'+(cls||'os-ln')+'" pathLength="1" d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" style="--dl:'+(dl||0)+'s"/>';}
function gridY(ticks,sy,x0,x1,fmt,side){var s='';ticks.forEach(function(t){var y=r1(sy(t));s+='<line x1="'+x0+'" x2="'+x1+'" y1="'+y+'" y2="'+y+'" stroke="rgba(75,85,99,.55)" stroke-width="1" stroke-dasharray="4 5"/>';
  if(fmt)s+='<text x="'+(side==='r'?x1+8:x0-8)+'" y="'+(y+4)+'" text-anchor="'+(side==='r'?'start':'end')+'">'+fmt(t)+'</text>';});return s;}
function xLabels(labels,sx,y,ev,off){var s='';for(var i=(off||0);i<labels.length;i+=ev){s+='<text x="'+r1(sx(i))+'" y="'+y+'" text-anchor="middle">'+labels[i]+'</text>';}return s;}
function areaGrad(id,col,o1){return '<linearGradient id="'+id+'" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="'+col+'" stop-opacity="'+(o1||.35)+'"/><stop offset="1" stop-color="'+col+'" stop-opacity="0"/></linearGradient>';}
function every(w,n,minPx){return Math.max(1,Math.ceil(n/Math.max(2,Math.floor(w/minPx))));}
var uid=0;

var CH={
  report:function(w,h){var n=D.orders.length,L=44,R=w<520?28:34,T=8,B=22,bw=(w-L-R)/n;
    var sx=function(i){return L+bw*(i+.5);},syL=lin(0,8000,h-B,T),syR=lin(0,300,h-B,T),id='os-g'+(uid++);
    var s='<defs>'+areaGrad(id,'#22c55e',.22)+'</defs>'+gridY([0,4000,8000],syL,L,w-R,function(v){return v?'$'+v/1000+'K':'$0';},'l');
    [0,150,300].forEach(function(t){s+='<text x="'+(w-R+6)+'" y="'+(syR(t)+4)+'">'+t+'</text>';});
    D.orders.forEach(function(v,i){var y=syR(v);s+='<rect class="os-br" style="--i:'+i+'" x="'+r1(sx(i)-bw*.36)+'" y="'+r1(y)+'" width="'+r1(bw*.72)+'" height="'+r1(h-B-y)+'" rx="2" fill="#fbbf24" fill-opacity=".45"/>';});
    var P=pts(D.sales,sx,syL);s+='<path class="os-ar" d="'+mono(P)+'L'+r1(sx(n-1))+' '+(h-B)+'L'+r1(sx(0))+' '+(h-B)+'Z" fill="url(#'+id+')"/>';
    s+=line(mono(pts(D.profit,sx,syL)),'#3b82f6',1.8,'os-ln',.3)+line(mono(P),'#22c55e',2.2,'os-ln',.2);
    s+=xLabels(D.days,sx,h-5,every(w-L-R,n,62));return s;},
  eff:function(w,h){var n=D.acos.length,L=36,R=w<420?74:86,T=12,B=20;var sx=lin(0,n-1,L+4,w-R),sy=lin(0,45,h-B,T);
    var s=gridY([0,15,30,45],sy,L,w-10,function(v){return v+'%';},'l');
    var ty=r1(sy(15));s+='<g class="os-fd"><line x1="'+L+'" x2="'+(w-10)+'" y1="'+ty+'" y2="'+ty+'" stroke="#e5e7eb" stroke-opacity=".75" stroke-width="1.4" stroke-dasharray="6 5"/><text x="'+(L+8)+'" y="'+(ty-6)+'" style="fill:#e5e7eb">TACOS target 15%</text></g>';
    s+=line(mono(pts(D.acos,sx,sy)),'#8b5cf6',2.4)+line(mono(pts(D.tacos,sx,sy)),'#f59e0b',2.4,'os-ln',.25);
    var la=D.acos[n-1],lt=D.tacos[n-1];
    s+='<g class="os-fd"><text x="'+(w-R+6)+'" y="'+(sy(la)+4)+'" style="fill:#c4b5fd;font-weight:600">ACOS '+la.toFixed(1)+'%</text><text x="'+(w-R+6)+'" y="'+(sy(lt)+14)+'" style="fill:#fcd34d;font-weight:600">TACOS '+lt.toFixed(1)+'%</text></g>';
    s+=xLabels(D.days,sx,h-3,every(w-L-R,n,70),2);return s;},
  cover:function(w,h){var N=95,L=38,R=8,T=26,B=20;var sx=lin(0,N,L,w-R),sy=lin(0,4000,h-B,T);
    var no=[],yes=[],d;for(d=0;d<=N;d++){no.push([sx(d),sy(Math.max(0,2480-41*d))]);var u=2480-41*d;if(d>=54)u+=3200;yes.push([sx(d),sy(Math.max(0,u))]);}
    var s=gridY([0,2000,4000],sy,L,w-R,function(v){return v?(v/1000)+'K':'0';},'l');
    var xa=r1(sx(16)),xb=r1(sx(54)),xc=r1(sx(60.5));
    s+='<rect class="os-fd" x="'+xa+'" y="'+T+'" width="'+r1(xb-xa)+'" height="'+(h-B-T)+'" fill="#ffb43d" fill-opacity=".08" style="--dl:.2s"/>';
    s+='<g class="os-fd" style="--dl:.4s"><line x1="'+xa+'" x2="'+xa+'" y1="'+(T-6)+'" y2="'+(h-B)+'" stroke="#fbbf24" stroke-dasharray="3 4"/><text x="'+(+xa+4)+'" y="'+(T-12)+'" style="fill:#fde68a;font-weight:600">PO leaves · Oct 14</text>';
    s+='<line x1="'+xb+'" x2="'+xb+'" y1="'+(T+14)+'" y2="'+(h-B)+'" stroke="#22c55e" stroke-dasharray="3 4"/>'+(w>420?'<text x="'+(+xb-4)+'" y="'+(T+8)+'" text-anchor="end" style="fill:#86efac">Arrives · Nov 21</text>':'')+'</g>';
    var dNo='M'+no.map(function(p){return r1(p[0])+' '+r1(p[1]);}).join('L'),dYes='M'+r1(yes[0][0])+' '+r1(yes[0][1]);
    for(d=1;d<=N;d++){if(d===54)dYes+='L'+r1(sx(54))+' '+r1(sy(2480-41*54));dYes+='L'+r1(yes[d][0])+' '+r1(yes[d][1]);}
    s+='<path class="os-fd" d="'+dNo+'" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 5" style="--dl:.9s"/>'+line(dYes,'#22c55e',2.4);
    s+='<g class="os-fd" style="--dl:1.2s"><circle cx="'+xc+'" cy="'+r1(sy(0))+'" r="4" fill="#ef4444"/>'+(w>380?'<text x="'+(+xc+6)+'" y="'+r1(sy(0)-8)+'" style="fill:#fca5a5">Without a PO · Nov 27</text>':'')+'</g>';
    [[0,'Sep 28'],[16,'Oct 14'],[34,'Nov 1'],[54,'Nov 21'],[78,'Dec 15']].forEach(function(l){if(w<420&&(l[0]===34||l[0]===78))return;s+='<text x="'+r1(sx(l[0]))+'" y="'+(h-3)+'" text-anchor="middle">'+l[1]+'</text>';});return s;},
  dsp:function(w,h){var atc=[1880,2150,2390,2610,2870,3050,3220,3450],ntb=[370,440,500,560,620,680,720,750],pct=[44,46,49,51,53,55,56,57],n=8,L=36,R=32,T=12,B=20,bw=(w-L-R)/n,i;
    var sx=function(k){return L+bw*(k+.5);},sy=lin(0,4000,h-B,T),sr=lin(0,60,h-B,T);
    var s=gridY([0,2000,4000],sy,L,w-R,function(v){return v?(v/1000)+'K':'0';},'l');
    [0,30,60].forEach(function(t){s+='<text x="'+(w-R+6)+'" y="'+(sr(t)+4)+'">'+t+'%</text>';});
    for(i=0;i<n;i++){var y1=sy(atc[i]),y2=sy(ntb[i]),x=sx(i);
      s+='<rect class="os-br" style="--i:'+(i*3)+'" x="'+r1(x-bw*.34)+'" y="'+r1(y1)+'" width="'+r1(bw*.32)+'" height="'+r1(h-B-y1)+'" rx="2" fill="#2dd4bf" fill-opacity=".5"/>';
      s+='<rect class="os-br" style="--i:'+(i*3+1)+'" x="'+r1(x+bw*.02)+'" y="'+r1(y2)+'" width="'+r1(bw*.32)+'" height="'+r1(h-B-y2)+'" rx="2" fill="#fbbf24"/>';}
    var P=pct.map(function(v,k){return [sx(k),sr(v)];});s+=line(mono(P),'#b97aff',2,'os-ln',.4);
    P.forEach(function(p){s+='<circle class="os-dot" cx="'+r1(p[0])+'" cy="'+r1(p[1])+'" r="3" fill="#1e2130" stroke="#b97aff" stroke-width="1.8"/>';});
    s+='<text class="os-dot" x="'+r1(P[n-1][0])+'" y="'+r1(P[n-1][1]-9)+'" text-anchor="end" style="fill:#fff;font-weight:600">NTB 57%</text>';
    for(i=0;i<n;i++){if(w<380&&i%2)continue;s+='<text x="'+r1(sx(i))+'" y="'+(h-3)+'" text-anchor="middle">Wk '+(i+1)+'</text>';}return s;},
  bb:function(w,h){var a=[100,100,100,100,100,100,100,100,100,100,82,71,66,64,63,65,64,64],sx=lin(0,a.length-1,2,w-2),sy=lin(50,104,h-3,3);
    return '<line x1="0" x2="'+w+'" y1="'+r1(sy(100))+'" y2="'+r1(sy(100))+'" stroke="rgba(75,85,99,.6)" stroke-dasharray="2 3"/>'+line(mono(pts(a,sx,sy)),'#5aa9ff',2);}
};

/* ---------- agents ---------- */
function bottle(tx,ty,sc){return '<g transform="translate('+tx+' '+ty+') scale('+sc+')"><rect x="40" y="14" width="20" height="12" rx="3" fill="#e5e7eb"/><rect x="44" y="8" width="12" height="8" rx="2" fill="#9ca3af"/><path d="M36 30 Q36 26 40 26 H60 Q64 26 64 30 V84 Q64 90 58 90 H42 Q36 90 36 84 Z" fill="#f59e0b"/><path d="M38 30 Q38 28 41 28 H46 V88 H42 Q38 88 38 84 Z" fill="#fde68a" opacity=".45"/><rect x="40" y="50" width="20" height="22" rx="2" fill="#fff" opacity=".92"/><rect x="43" y="55" width="14" height="2.5" rx="1" fill="#1a1d29" opacity=".7"/><rect x="43" y="60" width="10" height="2" rx="1" fill="#1a1d29" opacity=".4"/></g>';}
function demo(){return '<span class="os-demo">Demo data</span>';}
function head(t,s){return '<div class="os-card-h"><div><h4 class="os-card-t">'+t+'</h4>'+(s?'<p class="os-card-s">'+s+'</p>':'')+'</div>'+demo()+'</div>';}

var AGENTS=[
 {id:'ava',name:'Ava',role:'Brand manager',area:'Brand strategy',status:'Online',c:'#fbbf24',cl:'#fde68a',cd:'#8a6a12',
  line:'Sees the whole business at once — sales, profit and where you’re leaking — reds first, then the fix.',
  caps:['Profit & finance views','Finds where you’re leaking sales','Reds first, then the fix'],
  card:function(){return '<div class="os-card">'+head('Sales snapshot','Last 30 days vs last year')+
    '<div class="os-kpi"><div><small>Total sales</small><b>$158,073</b><span><em>+32.7%</em> vs LY</span></div><div><small>Orders</small><b>5,770</b><span><em>+29.1%</em> vs LY</span></div><div><small>Units</small><b>6,684</b><span><em>+27.0%</em> vs LY</span></div><div><small>Profit</small><b style="color:#34d399">$33,067</b><span>20.9% margin</span></div></div>'+
    '<div class="os-chart" data-c="report" style="height:150px;margin-top:10px"></div>'+
    '<div class="os-legend" style="margin-top:6px"><span><i style="--c:#22c55e"></i>Sales</span><span><i style="--c:#3b82f6"></i>Profit</span><span><i class="os-sq" style="--c:#fbbf24"></i>Orders</span></div></div>';},
  chat:{me:'Help me understand how my business is doing.',tools:['get_brand_snapshot · 30d','get_sales_report · vs prior'],
   bot:'Sales are up <span class="os-g">9.4%</span>, profit <span class="os-g">4.3%</span>. Reds first: net margin is down 1.0 pts, mostly from pricier clicks — CPC is up 4.0%. I’ve shared that with Dr. PPC.',acts:['Show the fix','Weekly brief']}},
 {id:'dr-ppc',name:'Dr. PPC',role:'Advertising specialist',area:'Advertising',status:'Working around the clock',c:'#34d399',cl:'#a7f3d0',cd:'#0f5e45',
  line:'Runs your advertising around the clock — every campaign, target and search term, every change with its evidence.',
  caps:['Every campaign, target & search term','A goal per product','Every change with its evidence'],
  card:function(){return '<div class="os-card"><div class="os-card-h"><h4 class="os-card-t">Efficiency · ACOS vs TACOS</h4>'+demo()+'</div>'+
    '<div class="os-legend" style="margin-top:6px"><span><i style="--c:#8b5cf6"></i>ACOS</span><span><i style="--c:#f59e0b"></i>TACOS</span></div>'+
    '<div class="os-chart" data-c="eff" style="height:150px;margin-top:6px"></div>'+
    '<div class="os-lane"><div class="os-score"><b>86</b><small>OF 100</small></div><div><div class="os-lab">Lane separation</div><h4>Branded and non-branded kept apart</h4><p>3 branded targets are ready to move into branded campaigns.</p></div><div class="os-acts" style="margin-top:0"><span class="os-p">Propose transition</span></div></div></div>';},
  chat:{me:'What would you change today?',tools:['get_search_terms · 30d','get_lane_separation'],
   bot:'3 bid changes are ready, each with its evidence. TACOS is <span class="os-g">11.1%</span> against a 15% target — room to grow. Approve them one by one, or let me run them inside your guardrails.',acts:['Review 3 changes','Show evidence']}},
 {id:'dr-stock',name:'Dr. Stock',role:'Inventory',area:'Inventory',status:'Watching every unit',c:'#ffb43d',cl:'#ffd999',cd:'#8a5a0c',
  line:'Watches every unit and tells you when to reorder — weeks before you’d notice.',
  caps:['Forecast per SKU vs real lead time','The date the PO has to leave','Days of cover per SKU'],
  card:function(){return '<div class="os-card">'+head('Projected units · Vitamin C Serum 1oz','41 units/day · lead time 38 days ± 6')+
    '<div class="os-chart" data-c="cover" style="height:170px;margin-top:10px"></div>'+
    '<div class="os-legend" style="margin-top:6px"><span><i style="--c:#22c55e"></i>With PO by Oct 14</span><span><i class="os-dsh" style="--c:#ef4444"></i>Without a PO</span></div>'+
    '<div class="os-skus"><div style="--c:#ef4444">Vitamin C Serum 1oz<b>60 days</b><span class="os-bar"><i style="width:40%"></i></span></div><div style="--c:#fbbf24">Night Cream 1.7oz<b>74 days</b><span class="os-bar"><i style="width:55%"></i></span></div><div style="--c:#22c55e">Serum 2-pack<b>118 days</b><span class="os-bar"><i style="width:88%"></i></span></div></div></div>';},
  chat:{me:'When do I need to reorder the vitamin C serum?',tools:['get_inventory_forecast','get_lead_times'],
   bot:'The PO has to leave your supplier by <span class="os-g">Oct 14</span>. A draft for 3,200 units is ready for your approval — and I’ve asked Dr. PPC to ease spend on it until then.',acts:['Draft PO','Remind me Oct 10']}},
 {id:'bruno',name:'Bruno',role:'Creative director',area:'Listings & creative',status:'In the Listing Lab',c:'#e879f9',cl:'#f5d0fe',cd:'#86198f',
  line:'Builds the whole listing — copy, images, the full stack — scored against evidence, not taste.',
  caps:['Scores every image against evidence','Main-image compliance','Same-day scored image stack'],
  card:function(){var S=[['Main',41,'os-bad','#f3f4f6'],['Benefits',88,'','#1e3a5f'],['Ingredients',74,'os-mid','#3b2f1a'],['How to use',69,'os-mid','#1f2937'],['Texture',86,'','#3a2a12'],['In hand',81,'','#243447'],['Brand',63,'os-mid','#2a1f3d']];
    var st=S.map(function(s,i){var bg=i===0?'<rect width="100" height="100" fill="#f9fafb"/>':'<rect width="100" height="100" fill="'+s[3]+'"/><circle cx="'+(20+i*9)+'" cy="24" r="30" fill="#e879f9" opacity=".14"/>';
      var prop=i===0?'<g opacity=".95"><circle cx="76" cy="74" r="10" fill="#22c55e"/><rect x="72" y="62" width="3" height="10" fill="#15803d"/></g>':'';
      return '<div class="os-bimg '+s[2]+'" style="--i:'+i+'"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">'+bg+(i===0?bottle(0,4,1):bottle(i%2?6:0,4,.84))+prop+'</svg><span class="os-sl">'+(i===0?'Main':i+1)+'</span><span class="os-sc">'+s[1]+'</span></div>';}).join('');
    return '<div class="os-card os-bruno">'+head('Listing Lab · Vitamin C Serum 1oz','Image stack scored against evidence · stack score 72')+'<div class="os-bstack">'+st+'</div>'+
    '<div class="os-bmeta"><span class="os-x">Main image · prop in frame</span><span>Text too small on mobile · slot 3</span><span>Brief drafted · 3 images</span></div></div>';},
  chat:{me:'Score our image stack.',tools:['score_image_stack','check_main_image'],
   bot:'The main image fails compliance — there’s a prop in frame. I’ve drafted the brief for a compliant main and two rewrites.',acts:['Create images','Apply to listing']}},
 {id:'dr-shield',name:'Dr. Shield',role:'Account & brand protection',area:'Account & brand protection',status:'On watch',c:'#5aa9ff',cl:'#b5d8ff',cd:'#1d4f8c',
  line:'Watches every ASIN every hour, 24/7, for hijackers, Buy Box changes and compliance issues. Found, built and filed for you — our team handles the Amazon side, same day.',
  caps:['Every ASIN, every hour, 24/7','Hijacker, Buy Box & compliance watch','Cases filed by our team, same day'],
  card:function(){return '<div class="os-card">'+head('Account watch · last 24 hours','3 signals · 1 to review today')+
    '<div class="os-alerts"><div class="os-al"><span class="os-sev os-hi">Act today</span><span><b>New seller on your hero ASIN</b><small>Joined 06:12 · evidence collected</small></span><span></span></div>'+
    '<div class="os-al"><span class="os-sev os-md">Watch</span><span><b>Title changed on Night Cream 1.7oz</b><small>Catalog contribution · previous version saved</small></span><span></span></div>'+
    '<div class="os-al"><span class="os-sev os-ok">Steady</span><span><b>No new policy warnings</b><small>Account health checked 07:00</small></span><span></span></div></div>'+
    '<div class="os-bbx"><small>Buy Box share · hero ASIN</small><b>64%<span>from 100% · 18 hours</span></b><div class="os-chart" data-c="bb"></div></div></div>';},
  chat:{me:'Anything I should know about this morning?',tools:['get_offer_changes','get_buy_box_share'],
   bot:'A <strong>new seller joined your hero ASIN</strong> at 06:12 and your Buy Box share is at 64%. Evidence is collected and the case is built — our team files it with Amazon today.',acts:['Review evidence','See the case']}},
 {id:'dr-dsp',name:'Dr. DSP',role:'Audience network',area:'Audience network',status:'Mapping audiences',c:'#b97aff',cl:'#e0c8ff',cd:'#53298c',
  line:'Finds new-to-brand shoppers across Amazon’s audience network — and shows which touches actually earned the sale.',
  caps:['Amazon’s audience network','Multi-touch attribution','New-to-brand growth'],
  card:function(){return '<div class="os-card">'+head('Path to purchase · multi-touch','Last 8 weeks · 3.4 touches before a purchase')+
    '<div class="os-path"><span class="os-pline" aria-hidden="true"><i></i><i></i><i></i></span><div class="os-pn"><span class="os-pi">TV</span><b>Streaming TV</b><small>18% credit</small></div><div class="os-pn"><span class="os-pi">◧</span><b>Display</b><small>29% credit</small></div><div class="os-pn"><span class="os-pi">⌕</span><b>Sponsored ads</b><small>53% credit</small></div><div class="os-pn os-end"><span class="os-pi">✓</span><b>Purchase</b><small>52% new-to-brand</small></div></div>'+
    '<div class="os-chart" data-c="dsp" style="height:130px;margin-top:12px"></div>'+
    '<div class="os-legend" style="margin-top:6px"><span><i class="os-sq" style="--c:#2dd4bf"></i>Add-to-carts</span><span><i class="os-sq" style="--c:#fbbf24"></i>New-to-brand buyers</span><span><i style="--c:#b97aff"></i>NTB %</span></div></div>';},
  chat:{me:'Which touches are actually creating new customers?',tools:['get_path_to_purchase · 8w','get_audience_sizes'],
   bot:'Streaming TV opens <span class="os-g">34%</span> of the paths that end in a purchase — last-click reporting gives it none. <strong>52% of those buyers are new-to-brand.</strong>',acts:['Review audience plan','See every path']}}
];
var BY={};AGENTS.forEach(function(a){var h=a.c.replace('#','');a.cr=parseInt(h.slice(0,2),16)+','+parseInt(h.slice(2,4),16)+','+parseInt(h.slice(4,6),16);BY[a.id]=a;});
function vars(a){return '--c:'+a.c+';--cl:'+a.cl+';--cd:'+a.cd+';--cr:'+a.cr;}

var HANDOFFS=[
 {f:'dr-stock',t:'dr-ppc',tool:'share_signal · days_of_cover',msg:'Vitamin C Serum 1oz has 60 days of cover and the PO leaves Oct 14. Ease spend on it so stock lasts until the new units land.'},
 {f:'dr-ppc',t:'bruno',tool:'share_signal · search_term_cvr',msg:'“vitamin c serum for face” converts below account average — and the main image fails compliance on that search. Over to you for a compliant main.'},
 {f:'bruno',t:'dr-ppc',tool:'share_signal · listing_update',msg:'Compliant main image is drafted for approval. Once it’s live, bids on “vitamin c serum for face” can come back up.'},
 {f:'dr-shield',t:'dr-ppc',tool:'share_signal · buy_box_share',msg:'A new seller joined the hero ASIN and Buy Box share is at 64%. Hold bid increases there while I work on it.'},
 {f:'dr-dsp',t:'ava',tool:'share_signal · new_to_brand',msg:'52% of buyers on DSP-assisted paths are new-to-brand. Adding that to this week’s brand snapshot.'},
 {f:'ava',t:'dr-stock',tool:'share_signal · sales_trend',msg:'Sales are up 9.4% on last month. Worth re-checking the Night Cream forecast before the holiday lift.'}
];

/* ---------- small utils ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function qa(sel,ctx){return Array.prototype.slice.call(ctx.querySelectorAll(sel));}
function img(a,cls){return '<img'+(cls?' class="'+cls+'"':'')+' src="'+VID+a.id+'.jpg" alt="" loading="lazy" decoding="async" width="96" height="96">';}
function vid(a){return '<video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" data-src="'+VID+a.id+'.mp4"></video>';}
var ICON={
 cost:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 1.8v12.4M11 4.3H6.6a2 2 0 0 0 0 4h2.8a2 2 0 0 1 0 4H4.8"/></svg>',
 doc:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 1.8h5.5L12.5 5v9.2H4z"/><path d="M6.3 9.3l1.4 1.4 2.6-2.8"/></svg>',
 key:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="5.5" cy="10.5" r="3"/><path d="M7.7 8.3l6-6M11.5 4.5l1.6 1.6"/></svg>',
 link:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="3.5" cy="8" r="2"/><circle cx="12.5" cy="3.5" r="2"/><circle cx="12.5" cy="12.5" r="2"/><path d="M5.3 7.1l5.4-2.7M5.3 8.9l5.4 2.7"/></svg>',
 pause:'<svg viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1.5" width="2.8" height="9" rx="1"/><rect x="7.2" y="1.5" width="2.8" height="9" rx="1"/></svg>',
 play:'<svg viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5l7.5 4.5L3 10.5z"/></svg>'
};

/* ---------- instance ---------- */
var instances=[],nextId=0;

function Suite(host){
  var self=this;this.host=host;this.id='os'+(nextId++);
  var cur=(host.getAttribute('data-current')||'').toLowerCase().trim();if(cur==='drppc')cur='dr-ppc';
  this.cur=BY[cur]?cur:null;
  var order=AGENTS.slice();if(this.cur){order.sort(function(a,b){return (a.id===self.cur?-1:0)-(b.id===self.cur?-1:0);});}
  this.ag=order;this.n=order.length;
  this.theme=(host.getAttribute('data-theme')||'dark').toLowerCase()==='light'?'light':'dark';
  this.active=0;this.rot=0;this.target=0;this.t=0;this.inView=false;this.near=false;this.vis=0;
  this.hold=false;this.paused=false;this.elapsed=0;this.scrollAcc=0;this.coI=0;this.coElapsed=0;this.coHold=false;
  this.build();
  this.cache();
  this.measure();this.renderCharts();
  this.setActive(0,true);
  this.setHandoff(0,true);
  this.bind();
  this.frame(0);
}
var P=Suite.prototype;

P.build=function(){
  var id=this.id,ag=this.ag,cur=this.cur,self=this;
  var here='<span class="os-here">You are here</span>';
  var h='';
  h+='<div class="os-root" role="region" aria-labelledby="'+id+'-t" data-theme="'+this.theme+'">';
  h+='<svg width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>'+
     '<linearGradient id="'+id+'-rg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#f59e0b" stop-opacity=".04"/><stop offset=".3" stop-color="#fde047" stop-opacity=".75"/><stop offset=".55" stop-color="#c9a227" stop-opacity=".45"/><stop offset=".8" stop-color="#fbbf24" stop-opacity=".7"/><stop offset="1" stop-color="#f59e0b" stop-opacity=".04"/></linearGradient>'+
     '<linearGradient id="'+id+'-ag" gradientUnits="userSpaceOnUse" x1="0" x2="100" y1="0" y2="0"><stop class="os-ag0" offset="0" stop-color="#fbbf24"/><stop class="os-ag1" offset="1" stop-color="#fbbf24"/></linearGradient>'+
     '</defs></svg>';
  h+='<div class="os-panel">';
  // head
  h+='<div class="os-head"><div><span class="os-kick">'+LOGO+'The whole team · Included free</span>'+
     '<h2 class="os-h2" id="'+id+'-t">'+(cur==='bruno'?'Hire Bruno.<br><span class="os-gt">Get the whole Orbit team, free.</span>':(cur==='ava'?'Meet Ava.<br><span class="os-gt">Get the whole Orbit team.</span>':'Hire one Doctor.<br><span class="os-gt">Get the whole hospital.</span>'))+'</h2></div>'+
     '<div><p class="os-sub">'+(cur==='bruno'?'Bruno comes with':'Every Doctor comes with')+' <b>all of Orbit</b> — the operating system for your Amazon account, and six AI agents working together on every part of it, every day. <b>Included free.</b></p>'+
     '<ul class="os-cov" aria-label="What the team covers">'+AGENTS.map(function(a){return '<li style="'+vars(a)+'">'+esc(a.area)+' · <b>'+esc(a.name)+'</b></li>';}).join('')+'</ul></div></div>';
  // included strip
  h+='<div class="os-incl"><div class="os-incl-t"><small>What “included” means</small><b>Six agents. One account. One login. <em>Zero extra cost.</em></b></div>'+
     '<div class="os-ii"><i>'+ICON.cost+'</i><div><b>No extra cost</b><span>All six agents and the full Orbit workspace come with your Doctor.</span></div></div>'+
     '<div class="os-ii"><i>'+ICON.doc+'</i><div><b>No extra contract</b><span>One subscription. Nothing new to sign.</span></div></div>'+
     '<div class="os-ii"><i>'+ICON.key+'</i><div><b>Same login</b><span>One sign-in. The whole team is already there.</span></div></div>'+
     '<div class="os-ii"><i>'+ICON.link+'</i><div><b>One shared view</b><span>They read the same account, so they work together — not in silos.</span></div></div></div>';
  // stage
  h+='<div class="os-stage"><div class="os-left">';
  h+='<div class="os-wheel" aria-hidden="true"><div class="os-glow"></div>'+
     '<svg class="os-ring os-ring-b"><defs><clipPath id="'+id+'-cb"><rect class="os-cb" x="-4000" y="-4000" width="9000" height="4000"/></clipPath></defs><g clip-path="url(#'+id+'-cb)"></g></svg>'+
     '<div class="os-core"><div class="os-halo"></div><div class="os-pulse"></div><div class="os-pulse os-b"></div><div class="os-sph"></div><span class="os-logo">'+LOGO+'</span><span class="os-cl">Orbit</span></div>'+
     '<svg class="os-ring os-ring-f"><defs><clipPath id="'+id+'-cf"><rect class="os-cf" x="-4000" y="0" width="9000" height="5000"/></clipPath></defs><g clip-path="url(#'+id+'-cf)"></g></svg>';
  ag.forEach(function(a,i){h+='<button class="os-node" type="button" tabindex="-1" data-i="'+i+'" style="'+vars(a)+'"><span class="os-av">'+img(a)+vid(a)+'</span><span class="os-tag">'+esc(a.name)+'<i>'+esc(a.role)+'</i></span>'+(a.id===cur?here:'')+'</button>';});
  h+='</div>';
  h+='<div class="os-chips"><div class="os-strip" role="tablist" aria-label="Orbit agents">';
  ag.forEach(function(a,i){h+='<button class="os-chip" type="button" role="tab" id="'+id+'-tab'+i+'" aria-controls="'+id+'-pw'+i+'" aria-selected="false" tabindex="-1" data-i="'+i+'" title="'+esc(a.name)+'" aria-label="'+esc(a.name+(a.id===cur?' (you are here)':''))+'" style="'+vars(a)+'">'+img(a)+'<span>'+esc(a.name)+'</span>'+(a.id===cur?'<span class="os-hd" aria-hidden="true"></span>':'')+'</button>';});
  h+='</div><button class="os-pp" type="button" aria-label="Pause auto-rotation">'+ICON.pause+'</button></div>';
  h+='<div class="os-info">';
  ag.forEach(function(a,i){
    h+='<div class="os-pi" data-i="'+i+'" style="'+vars(a)+'"><div class="os-ph"><div class="os-vis" aria-hidden="true"><svg class="os-vr" viewBox="0 0 400 400"><g class="os-rr os-rr1"><circle cx="200" cy="200" r="196" fill="none" stroke="'+a.c+'" stroke-opacity=".3" stroke-dasharray="2 7"/><circle cx="200" cy="4" r="7" fill="'+a.cl+'"/></g><g class="os-rr os-rr2"><circle cx="200" cy="200" r="180" fill="none" stroke="'+a.c+'" stroke-opacity=".45"/><circle cx="380" cy="200" r="5" fill="#fff"/></g></svg><div class="os-vav">'+img(a)+vid(a)+'</div></div>'+
       '<div><div class="os-role">'+esc(a.role)+'</div><h3 class="os-name">'+esc(a.name)+(a.id===cur?here:'')+'</h3><div class="os-stat"><i></i>0'+(i+1)+' / 0'+ag.length+' · '+esc(a.status)+'</div></div></div>'+
       '<p class="os-line">'+esc(a.line)+'</p><ul class="os-caps">'+a.caps.map(function(c){return '<li>'+esc(c)+'</li>';}).join('')+'</ul></div>';});
  h+='</div></div><div class="os-right">';
  ag.forEach(function(a,i){var c=a.chat;
    h+='<div class="os-pw" role="tabpanel" id="'+id+'-pw'+i+'" aria-labelledby="'+id+'-tab'+i+'" data-i="'+i+'" style="'+vars(a)+'">'+a.card()+
       '<div class="os-chat"><div class="os-chat-h">'+img(a)+'<b>'+esc(a.name)+'</b><span class="os-live">Live in Orbit</span>'+demo()+'</div><div class="os-chat-b">'+
       '<div class="os-m os-me os-s" data-s="me"><div class="os-bb">'+esc(c.me)+'</div></div>'+
       '<div class="os-tools os-s" data-s="tools">'+c.tools.map(function(t){return '<span class="os-tool">'+esc(t)+'</span>';}).join('')+'</div>'+
       '<div class="os-m os-bot os-s" data-s="bot"><span class="os-ma">'+img(a)+'</span><div class="os-bb">'+c.bot+'<div class="os-acts">'+c.acts.map(function(t,k){return '<span'+(k?'':' class="os-p"')+'>'+esc(t)+'</span>';}).join('')+'</div></div></div>'+
       '</div></div></div>';});
  h+='</div></div>';
  // coordination
  var net=AGENTS.slice();if(cur){net=ag.slice();}
  this.net=net;
  h+='<div class="os-co"><div class="os-co-h"><div><h3>They work as one team.</h3><p>One shared view of your account — so a signal one agent finds becomes the next move for another. Demo handoffs:</p></div></div>'+
     '<div class="os-co-body"><div class="os-net"><svg aria-hidden="true" focusable="false"><g class="os-arcs"></g><path class="os-arc" stroke="url(#'+id+'-ag)" pathLength="1" d="M0 0" style="stroke-dasharray:1;stroke-dashoffset:1"/><circle class="os-orb" r="4.5" cx="-20" cy="-20" opacity="0"/></svg>';
  net.forEach(function(a,k){h+='<div class="os-nn" data-id="'+a.id+'" style="left:'+((k+.5)/net.length*100).toFixed(3)+'%;'+vars(a)+'"><span>'+img(a)+'</span><b>'+esc(a.name)+'</b></div>';});
  h+='</div><div><div class="os-msgs" aria-live="off">';
  HANDOFFS.forEach(function(x,j){var f=BY[x.f],t=BY[x.t];
    h+='<div class="os-msg" data-j="'+j+'" style="--cf:'+f.c+';--ct:'+t.c+'"><div class="os-msg-h">'+img(f)+'<b class="os-f">'+esc(f.name)+'</b><span class="os-arw" aria-label="to">→</span>'+img(t)+'<b class="os-t">'+esc(t.name)+'</b></div><p>'+esc(x.msg)+'</p><span class="os-tool">'+esc(x.tool)+'</span></div>';});
  h+='</div><div class="os-dots">';
  HANDOFFS.forEach(function(x,j){h+='<button type="button" data-j="'+j+'" aria-pressed="false" aria-label="Handoff '+(j+1)+': '+esc(BY[x.f].name)+' to '+esc(BY[x.t].name)+'"></button>';});
  h+='</div></div></div></div>';
  // footer
  h+='<div class="os-foot"><p><b>Included with Dr. PPC, Dr. Stock, Dr. DSP, Dr. Shield and Bruno</b> · Orbit on its own: $1 first month, then $299/mo <span class="os-pw5">· Powered by Opus 5.5</span></p><a class="os-cta" href="'+ORBIT_URL+'">See Orbit <span aria-hidden="true">→</span></a></div>';
  h+='</div></div>';
  this.host.innerHTML=h;
};

P.cache=function(){var r=this.root=this.host.querySelector('.os-root');var self=this;
  this.wheel=r.querySelector('.os-wheel');this.nodes=qa('.os-node',r).map(function(el){return {el:el,av:el.querySelector('.os-av')};});
  this.gB=r.querySelector('.os-ring-b g');this.gF=r.querySelector('.os-ring-f g');this.cb=r.querySelector('.os-cb');this.cf=r.querySelector('.os-cf');
  this.core=r.querySelector('.os-core');this.glow=r.querySelector('.os-glow');
  this.chips=qa('.os-chip',r);this.strip=r.querySelector('.os-strip');this.pp=r.querySelector('.os-pp');
  this.pis=qa('.os-pi',r);this.pws=qa('.os-pw',r);this.stage=r.querySelector('.os-stage');
  this.netEl=r.querySelector('.os-net');this.netSvg=this.netEl.querySelector('svg');this.arc=this.netEl.querySelector('.os-arc');this.orb=this.netEl.querySelector('.os-orb');this.arcs=this.netEl.querySelector('.os-arcs');
  this.nns=qa('.os-nn',r);this.msgs=qa('.os-msg',r);this.dots=qa('.os-dots button',r);this.co=r.querySelector('.os-co');
  this.ag0=r.querySelector('.os-ag0');this.ag1=r.querySelector('.os-ag1');this.agGrad=this.ag0.parentNode;
  // rings
  var RF=[.5,.75,1],NSs=function(t){return DOC.createElementNS(NS,t);};this.RF=RF;this.ell=[];
  RF.forEach(function(rf,i){['b','f'].forEach(function(k){var g=k==='b'?self.gB:self.gF;
    var e=NSs('ellipse');e.setAttribute('stroke','url(#'+self.id+'-rg)');e.setAttribute('stroke-width',k==='b'?'1.2':(i===2?'2':'1.6'));e.setAttribute('opacity',k==='b'?'.5':'1');g.appendChild(e);
    var d=NSs('ellipse');d.setAttribute('stroke','rgba(253,224,71,.35)');d.setAttribute('stroke-width','1');d.setAttribute('stroke-dasharray','1 9');d.setAttribute('opacity',k==='b'?'.35':'.7');g.appendChild(d);
    var s=NSs('ellipse');s.setAttribute('class','os-sweep'+(i===1?' os-s2':''));s.setAttribute('pathLength','100');s.setAttribute('stroke','#fff4c2');s.setAttribute('stroke-width',k==='b'?'1.4':'2.4');s.setAttribute('stroke-linecap','round');s.setAttribute('stroke-dasharray',k==='b'?'4 96':'7 93');s.setAttribute('stroke-dashoffset',String(-i*33));s.setAttribute('opacity',k==='b'?'.45':'.95');g.appendChild(s);
    self.ell.push({rf:rf,els:[e,d,s]});});});
  // orbs travelling the inner rings (drawn in both halves; clip decides which shows)
  this.orbs=[{rf:.5,sp:.55,a:0},{rf:.75,sp:-.34,a:2.2},{rf:.5,sp:.55,a:3.14}].map(function(o){o.c=[];[self.gB,self.gF].forEach(function(g){var c=NSs('circle');c.setAttribute('r','3.2');c.setAttribute('class','os-orb');g.appendChild(c);o.c.push(c);});return o;});
};

P.measure=function(){var w=this.wheel;this.layoutNet();this.W=w.clientWidth;this.H=w.clientHeight;if(!this.W)return;
  this.cx=this.W/2;this.cy=this.H*.46;this.R=Math.min(this.W*.41,300);this.tilt=this.W<520?.36:.32;
  var self=this;this.ell.forEach(function(o){var rx=self.R*o.rf,ry=rx*self.tilt;o.els.forEach(function(e){e.setAttribute('cx',self.cx);e.setAttribute('cy',self.cy);e.setAttribute('rx',rx);e.setAttribute('ry',ry);});});
  this.cb.setAttribute('y',this.cy-4000);this.cb.setAttribute('height',4000);this.cf.setAttribute('y',this.cy);
  this.core.style.top=this.cy+'px';this.glow.style.top=this.cy+'px';
  this.nodeS=this.W<520?78:92;this.nodes.forEach(function(n){n.el.style.setProperty('--s',self.nodeS+'px');n.w=n.el.offsetWidth;});
};

P.renderCharts=function(scope){qa('.os-chart[data-c]',scope||this.root).forEach(function(el){var w=Math.round(el.clientWidth),h=Math.round(el.clientHeight)||40;if(w<20)return;
  if(el._w===w&&el._h===h)return;el._w=w;el._h=h;var fn=CH[el.getAttribute('data-c')];if(!fn)return;
  try{el.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" aria-hidden="true" focusable="false">'+fn(w,h)+'</svg>';}catch(e){}});};

/* ---- active agent ---- */
P.setActive=function(i,instant,user){var n=this.n,self=this;i=((i%n)+n)%n;var prev=this.active;this.active=i;this.elapsed=0;
  // rotate the shortest way
  var diff=i-(((Math.round(this.target)%n)+n)%n);if(diff>n/2)diff-=n;if(diff<-n/2)diff+=n;this.target=Math.round(this.target)+diff;if(instant||reduced()){this.rot=this.target;}
  this.nodes.forEach(function(nd,k){nd.el.classList.toggle('os-on',k===i);});
  this.chips.forEach(function(c,k){var on=k===i;c.setAttribute('aria-selected',on?'true':'false');c.tabIndex=on?0:-1;});
  // restart chip progress animation
  var ch=this.chips[i];
  this.pis.forEach(function(p,k){p.classList.toggle('os-act',k===i);p.setAttribute('aria-hidden',k===i?'false':'true');});
  this.pws.forEach(function(p,k){var on=k===i;p.classList.toggle('os-act',on);p.setAttribute('aria-hidden',on?'false':'true');if('inert' in p)p.inert=!on;});
  var pw=this.pws[i];this.renderCharts(pw);
  qa('.os-chart',pw).forEach(function(c){c.classList.remove('os-in');});
  if(reduced()){qa('.os-chart',pw).forEach(function(c){c.classList.add('os-in');});}
  else{void pw.offsetWidth;requestAnimationFrame(function(){requestAnimationFrame(function(){if(self.active===i)qa('.os-chart',pw).forEach(function(c){c.classList.add('os-in');});});});}
  this.playChat(pw);
  if(!instant&&this.strip&&this.strip.scrollWidth>this.strip.clientWidth+4&&ch){var l=ch.offsetLeft-this.strip.offsetLeft-12;try{this.strip.scrollTo({left:Math.max(0,l),behavior:reduced()?'auto':'smooth'});}catch(e){this.strip.scrollLeft=l;}}
  this.syncVideos();
  if(prev!==i||instant)this.kick();
};
P.playChat=function(pw){var steps=qa('[data-s]',pw),tok={};this.chatTok=tok;var self=this;
  qa('.os-tool',pw).forEach(function(t){t.classList.remove('os-run');});
  if(reduced()||!this.inView){steps.forEach(function(s){s.classList.remove('os-hid');});this.chatPending=!reduced()&&!this.inView?pw:null;return;}
  this.chatPending=null;
  steps.forEach(function(s){s.classList.add('os-hid');});
  var seq=[[260,function(){steps[0].classList.remove('os-hid');}],[900,function(){steps[1].classList.remove('os-hid');qa('.os-tool',steps[1]).forEach(function(t){t.classList.add('os-run');});}],
    [1800,function(){qa('.os-tool',steps[1]).forEach(function(t){t.classList.remove('os-run');});}],[2050,function(){steps[2].classList.remove('os-hid');}]];
  seq.forEach(function(s){setTimeout(function(){if(self.chatTok===tok)s[1]();},s[0]);});
};

/* ---- videos: only the focused agent, only in view ---- */
P.syncVideos=function(){var want=this.inView&&!reduced()&&!DOC.hidden,self=this,i=this.active;
  qa('video',this.root).forEach(function(v){var own=+((v.closest('[data-i]')||{}).getAttribute?v.closest('[data-i]').getAttribute('data-i'):-1);
    var target=own===i&&v.offsetParent!==null;
    if(target&&(want||self.near)&&!reduced()&&!v.getAttribute('src')){v.preload=want?'auto':'metadata';v.src=v.getAttribute('data-src');
      if(!v._os){v._os=1;v.addEventListener('playing',function(){v.classList.add('os-playing');});v.addEventListener('error',function(){v.classList.remove('os-playing');});}}
    if(target&&want){if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});}}
    else if(!v.paused){v.pause();v.classList.remove('os-playing');}
    else if(!target){v.classList.remove('os-playing');}
  });
};

/* ---- coordination strip ---- */
P.layoutNet=function(){var net=this.netEl,W=net.clientWidth,H=net.clientHeight;if(!W)return;var self=this;
  this.netSvg.setAttribute('viewBox','0 0 '+W+' '+H);
  var nr=net.getBoundingClientRect();this.pos={};
  this.nns.forEach(function(el){var s=el.querySelector('span').getBoundingClientRect();self.pos[el.getAttribute('data-id')]={x:s.left-nr.left+s.width/2,y:s.top-nr.top,r:s.width/2};});
  var faint='';HANDOFFS.forEach(function(x){faint+='<path class="os-arcf" d="'+self.arcD(x)+'"/>';});this.arcs.innerHTML=faint;
  if(this.coI!=null)this.drawArc(this.coI,true);
};
P.arcD=function(x){var a=this.pos[x.f],b=this.pos[x.t];if(!a||!b)return 'M0 0';var ax=a.x,ay=a.y-3,bx=b.x,by=b.y-3,dx=Math.abs(bx-ax);
  var hgt=Math.min(ay-6,26+dx*.32);return 'M'+r1(ax)+' '+r1(ay)+'Q'+r1((ax+bx)/2)+' '+r1(ay-hgt*2)+' '+r1(bx)+' '+r1(by);};
P.drawArc=function(j,instant){var x=HANDOFFS[j],self=this;if(!this.pos)return;var d=this.arcD(x);this.arc.setAttribute('d',d);
  var a=this.pos[x.f],b=this.pos[x.t];if(a&&b){this.agGrad.setAttribute('x1',a.x);this.agGrad.setAttribute('x2',b.x);this.ag0.setAttribute('stop-color',BY[x.f].c);this.ag1.setAttribute('stop-color',BY[x.t].c);}
  this.nns.forEach(function(el){var id=el.getAttribute('data-id');el.classList.toggle('os-from',id===x.f);el.classList.remove('os-to');});
  var tok=this.arcTok={};
  if(instant||reduced()||!this.inView){this.arc.style.strokeDashoffset='0';this.orb.setAttribute('opacity','0');this.nns.forEach(function(el){if(el.getAttribute('data-id')===x.t)el.classList.add('os-to');});return;}
  var len=0;try{len=this.arc.getTotalLength();}catch(e){}
  var t0=performance.now(),dur=1100,arc=this.arc,orb=this.orb;
  function step(now){if(self.arcTok!==tok)return;var p=Math.min(1,(now-t0)/dur),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
    arc.style.strokeDashoffset=String(1-e);
    if(len){var pt=arc.getPointAtLength(e*len);orb.setAttribute('cx',r1(pt.x));orb.setAttribute('cy',r1(pt.y));orb.setAttribute('opacity',p<1?'1':'0');}
    if(p<1)requestAnimationFrame(step);else self.nns.forEach(function(el){if(el.getAttribute('data-id')===x.t)el.classList.add('os-to');});}
  arc.style.strokeDashoffset='1';requestAnimationFrame(step);
};
P.setHandoff=function(j,instant){j=((j%HANDOFFS.length)+HANDOFFS.length)%HANDOFFS.length;this.coI=j;this.coElapsed=0;
  this.msgs.forEach(function(m,k){m.classList.toggle('os-act',k===j);m.setAttribute('aria-hidden',k===j?'false':'true');});
  this.dots.forEach(function(d,k){d.setAttribute('aria-pressed',k===j?'true':'false');});
  this.drawArc(j,instant);
};

/* ---- wheel frame ---- */
P.frame=function(dt){if(!this.W)return;var n=this.n,self=this;this.t+=dt;
  var k=reduced()?1:Math.min(1,dt*5.5);this.rot+=(this.target-this.rot)*k;if(Math.abs(this.target-this.rot)<.0005)this.rot=this.target;
  var wob=reduced()?0:Math.sin(this.t*.45)*.035;
  var R=this.R,tilt=this.tilt,cx=this.cx,cy=this.cy,S=this.nodeS;
  for(var i=0;i<n;i++){var nd=this.nodes[i];var ang=Math.PI/2+(i-this.rot)*(2*Math.PI/n)+wob;
    var x=cx+Math.cos(ang)*R,y=cy+Math.sin(ang)*R*tilt,d=Math.sin(ang),sc=.56+.56*(d+1)/2;
    nd.el.style.transform='translate3d('+(x-nd.w/2).toFixed(1)+'px,'+(y-S/2).toFixed(1)+'px,0) scale('+sc.toFixed(3)+')';
    nd.el.style.zIndex=d>0?(30+Math.round(d*9)):(5+Math.round((d+1)*4));
    nd.el.style.opacity=(.42+.58*(d+1)/2).toFixed(3);
    var bk=d<-.25;if(nd.bk!==bk){nd.bk=bk;nd.el.classList.toggle('os-bk',bk);}}
  if(!reduced()){this.orbs.forEach(function(o){o.a+=dt*o.sp;var rx=R*o.rf,ry=rx*tilt,ox=cx+Math.cos(o.a)*rx,oy=cy+Math.sin(o.a)*ry;o.c.forEach(function(c){c.setAttribute('cx',ox.toFixed(1));c.setAttribute('cy',oy.toFixed(1));});});}
  else{this.orbs.forEach(function(o){o.c.forEach(function(c){c.setAttribute('opacity','0');});});}
};
P.kick=function(){ensureLoop();};

/* ---- events ---- */
P.bind=function(){var self=this,r=this.root;
  function pick(i){self.setActive(i,false,true);self.elapsed=0;self.scrollAcc=0;}
  this.nodes.forEach(function(nd,k){nd.el.addEventListener('click',function(){pick(k);});});
  this.chips.forEach(function(c,k){c.addEventListener('click',function(){pick(k);});
    c.addEventListener('keydown',function(e){var t=null;if(e.key==='ArrowRight'||e.key==='ArrowDown')t=k+1;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')t=k-1;else if(e.key==='Home')t=0;else if(e.key==='End')t=self.n-1;
      if(t===null)return;e.preventDefault();t=(t+self.n)%self.n;pick(t);self.chips[t].focus({preventScroll:true});});});
  this.pp.addEventListener('click',function(){self.paused=!self.paused;self.pp.innerHTML=self.paused?ICON.play:ICON.pause;self.pp.setAttribute('aria-label',self.paused?'Resume auto-rotation':'Pause auto-rotation');self.updHold();});
  this.stage.addEventListener('mouseenter',function(){self.hover=true;self.updHold();});
  this.stage.addEventListener('mouseleave',function(){self.hover=false;self.updHold();});
  this.stage.addEventListener('focusin',function(){self.focus=true;self.updHold();});
  this.stage.addEventListener('focusout',function(e){if(!self.stage.contains(e.relatedTarget)){self.focus=false;self.updHold();}});
  this.dots.forEach(function(d,k){d.addEventListener('click',function(){self.setHandoff(k);});});
  this.co.addEventListener('mouseenter',function(){self.coHold=true;});this.co.addEventListener('mouseleave',function(){self.coHold=false;});
  // swipe on the stacked panel (mobile)
  var sx=null,sy=null;var right=r.querySelector('.os-right');
  right.addEventListener('touchstart',function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;},{passive:true});
  right.addEventListener('touchend',function(e){if(sx===null)return;var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;sx=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)pick(self.active+(dx<0?1:-1));},{passive:true});
  if('IntersectionObserver' in W){
    new IntersectionObserver(function(en){var e=en[en.length-1];self.inView=e.isIntersecting;self.vis=e.intersectionRatio;r.classList.toggle('os-off',!e.isIntersecting);
      if(self.inView&&self.chatPending){var p=self.chatPending;self.chatPending=null;self.playChat(p);}
      if(self.inView&&!self._arcShown){self._arcShown=1;self.setHandoff(self.coI);}
      self.updHold();self.syncVideos();ensureLoop();},{threshold:[0,.2,.4]}).observe(r);
    new IntersectionObserver(function(en){self.near=en[en.length-1].isIntersecting;self.syncVideos();},{rootMargin:'600px 0px'}).observe(r);
  }else{this.inView=true;this.near=true;this.syncVideos();}
  this.updHold();
};
P.updHold=function(){var h=this.hover||this.focus||this.paused||reduced();this.hold=h;this.root.classList.toggle('os-hold',!!h);this.root.classList.toggle('os-static',reduced());};
P.tick=function(ms){if(reduced()||DOC.hidden||!this.inView)return;
  if(!this.hold&&this.vis>.15){this.elapsed+=ms;if(this.elapsed>=AUTO_MS){this.setActive(this.active+1);}}
  if(!this.coHold&&!this.paused){this.coElapsed+=ms;if(this.coElapsed>=CO_MS)this.setHandoff(this.coI+1);}
};
P.onScroll=function(dy){if(reduced()||!this.inView||this.vis<.2||this.paused)return;this.scrollAcc+=dy;
  if(Math.abs(this.scrollAcc)>=SCROLL_STEP){var s=this.scrollAcc>0?1:-1;this.scrollAcc=0;this.setActive(this.active+s);}};
P.onResize=function(){this.measure();this.renderCharts();this.frame(0);this.syncVideos();};

/* ---------- shared loop / listeners ---------- */
var looping=false,last=0;
function ensureLoop(){if(looping)return;looping=true;last=performance.now();requestAnimationFrame(loop);}
function loop(now){var dt=Math.min(.05,(now-last)/1000);last=now;var any=false;
  for(var i=0;i<instances.length;i++){var s=instances[i];
    if(s.inView&&!DOC.hidden){try{s.frame(dt);}catch(e){}any=true;if(reduced()&&s.rot===s.target)any=any&&false;}}
  if(any)requestAnimationFrame(loop);else looping=false;}
var lastY=W.pageYOffset||0;
W.addEventListener('scroll',function(){var y=W.pageYOffset||0,dy=y-lastY;lastY=y;for(var i=0;i<instances.length;i++){try{instances[i].onScroll(dy);}catch(e){}}},{passive:true});
var rsT;W.addEventListener('resize',function(){clearTimeout(rsT);rsT=setTimeout(function(){instances.forEach(function(s){try{s.onResize();}catch(e){}});},160);});
setInterval(function(){for(var i=0;i<instances.length;i++){try{instances[i].tick(250);}catch(e){}}},250);
DOC.addEventListener('visibilitychange',function(){instances.forEach(function(s){try{s.syncVideos();}catch(e){}});if(!DOC.hidden)ensureLoop();});
if(MQ){var onMQ=function(){instances.forEach(function(s){try{s.updHold();s.setActive(s.active,true);s.syncVideos();}catch(e){}});ensureLoop();};
  if(MQ.addEventListener)MQ.addEventListener('change',onMQ);else if(MQ.addListener)MQ.addListener(onMQ);}

function initAll(){var els=DOC.querySelectorAll('[data-orbit-suite]');
  for(var i=0;i<els.length;i++){var el=els[i];if(el.__os)continue;el.__os=1;
    try{instances.push(new Suite(el));}catch(e){try{el.setAttribute('data-orbit-suite-error','1');}catch(_){}}}
  if(W.ResizeObserver&&!initAll._ro){initAll._ro=new ResizeObserver(function(){clearTimeout(rsT);rsT=setTimeout(function(){instances.forEach(function(s){try{s.onResize();}catch(e){}});},120);});}
  instances.forEach(function(s){if(initAll._ro&&!s._ro){s._ro=1;initAll._ro.observe(s.root);}});
  ensureLoop();}
W.OrbitSuite={v:1,init:initAll};
if(DOC.readyState==='loading')DOC.addEventListener('DOMContentLoaded',initAll);else initAll();
if(DOC.fonts&&DOC.fonts.ready)DOC.fonts.ready.then(function(){instances.forEach(function(s){try{s.onResize();}catch(e){}});});
})();
