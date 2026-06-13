/* ============================================================
   De-AirTech · Fabric Filter Solutions — engine
   Renders the SLIDES data, scales the 16:9 stage to any ratio,
   and drives elegant GSAP entrance animations per slide.
   ============================================================ */
(function () {
  "use strict";
  if (window.SplitText) gsap.registerPlugin(SplitText);
  if (window.CustomEase) gsap.registerPlugin(CustomEase);
  if (window.CustomEase) CustomEase.create("lux", "M0,0 C0.16,1 0.3,1 1,1");

  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DUR = REDUCE ? 0.001 : 1;

  /* ---------- inline SVG diagrams (on-brand, vector) ---------- */
  var DIAGRAMS = {
    // Multi-layer filtration mechanism: dirty gas → dust cake → media layers → clean gas
    filtration: function(){
      var dots="";
      for(var i=0;i<26;i++){
        var cy=44+((i*53)%430), cx=70+((i*37)%150), r=2+(i%3);
        dots+='<circle class="dg-dust" cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#c8a265" opacity="'+(0.5+(i%4)*0.12)+'"/>';
      }
      var arrowsIn="", arrowsOut="";
      for(var a=0;a<5;a++){ var y=70+a*92;
        arrowsIn +='<g class="dg-arrow-in" opacity="0.9"><line x1="30" y1="'+y+'" x2="250" y2="'+y+'" stroke="#8e99a4" stroke-width="2"/><path d="M250 '+(y-5)+' L262 '+y+' L250 '+(y+5)+'" fill="#8e99a4"/></g>';
        arrowsOut+='<g class="dg-arrow-out"><line x1="470" y1="'+y+'" x2="612" y2="'+y+'" stroke="#7fb98a" stroke-width="2.4"/><path d="M612 '+(y-5)+' L624 '+y+' L612 '+(y+5)+'" fill="#7fb98a"/></g>';
      }
      return '<svg viewBox="0 0 640 470" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Multi-layer filtration mechanism">'
        + '<defs>'
        +   '<linearGradient id="dgCake" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8a265" stop-opacity=".55"/><stop offset="1" stop-color="#c8a265" stop-opacity=".15"/></linearGradient>'
        +   '<linearGradient id="dgClean" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7fb98a" stop-opacity=".05"/><stop offset="1" stop-color="#7fb98a" stop-opacity=".22"/></linearGradient>'
        + '</defs>'
        + '<rect x="0" y="0" width="640" height="470" fill="#14171b"/>'
        // zones
        + '<rect x="0" y="0" width="290" height="470" fill="#1d2228"/>'
        + '<rect x="470" y="0" width="170" height="470" fill="url(#dgClean)"/>'
        + arrowsIn + dots
        // dust cake
        + '<rect class="dg-layer" x="290" y="0" width="40" height="470" fill="url(#dgCake)"/>'
        // filter media multi-layers
        + '<rect class="dg-layer" x="330" y="0" width="46" height="470" fill="#e0e2e5" opacity=".92"/>'
        + '<rect class="dg-layer" x="376" y="0" width="46" height="470" fill="#cdd2d8" opacity=".92"/>'
        + '<rect class="dg-layer" x="422" y="0" width="48" height="470" fill="#aeb6bf" opacity=".92"/>'
        // fiber texture
        + (function(){var f="";for(var k=0;k<60;k++){var x=332+(k*7)%134, y=10+(k*61)%450, len=14+(k%3)*8, rot=(k%2?20:-24);f+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+len*Math.cos(rot*Math.PI/180)).toFixed(1)+'" y2="'+(y+len*Math.sin(rot*Math.PI/180)).toFixed(1)+'" stroke="#8e99a4" stroke-width="1" opacity=".5"/>';}return f;})()
        + arrowsOut
        // labels
        + '<g font-family="Sora,sans-serif" font-weight="600">'
        +   '<text x="20" y="450" fill="#8e99a4" font-size="17">Dirty gas + dust</text>'
        +   '<text x="300" y="28" fill="#c8a265" font-size="15" transform="rotate(90 300 28)">Dust cake</text>'
        +   '<text x="352" y="30" fill="#4a5c6a" font-size="14" transform="rotate(90 352 30)">Filter media layers</text>'
        +   '<text x="498" y="450" fill="#7fb98a" font-size="17">Clean gas</text>'
        + '</g>'
        + '</svg>';
    }
  };

  /* ---------- helpers ---------- */
  function escA(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function fmt(v, dec, comma){
    var s = dec>0 ? v.toFixed(dec) : Math.round(v).toString();
    if(comma){ var p=s.split("."); p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,","); s=p.join("."); }
    return s;
  }

  /* ---------- block renderers (return HTML string) ---------- */
  function bLabel(t){ return '<div class="lead r"><div class="lh">'+t+'</div></div>'; }

  function bLead(a){
    var h=a[0], ps=a[1]||[];
    var html='<div class="lead r">';
    if(h) html+='<div class="lh">'+h+'</div>';
    ps.forEach(function(p){ html+='<p>'+p+'</p>'; });
    return html+'</div>';
  }

  function bStats(items, cls){
    var html='<div class="stats '+(cls||"")+'">';
    items.forEach(function(s){
      var isNum=/^[\d.,]+$/.test(s.n);
      var pre = s.p ? '<span class="pre">'+escA(s.p)+'</span>' : '';
      var unit= s.u ? '<span class="u">'+escA(s.u)+'</span>' : '';
      var num = isNum ? '<span class="cv" data-num="'+s.n+'">'+s.n+'</span>' : '<span class="cv">'+s.n+'</span>';
      html+='<div class="stat r"><div class="v">'+pre+num+unit+'</div><div class="l">'+s.l+'</div></div>';
    });
    return html+'</div>';
  }

  function bCards(items, cls){
    var html='<div class="cards '+(cls||"")+'">';
    items.forEach(function(c){
      var n = (typeof c[0]==="string" && /^\d+\.$/.test("")) ? "" : "";
      html+='<div class="card r"><div class="ch">'+c[0]+'</div><p>'+c[1]+'</p>';
      if(c[2]&&c[2].length){ html+='<div class="tags">'; c[2].forEach(function(t){ html+='<span>'+t+'</span>'; }); html+='</div>'; }
      html+='</div>';
    });
    return html+'</div>';
  }

  function bList(items){
    var html='<ul class="list">';
    items.forEach(function(i){ html+='<li class="r">'+i+'</li>'; });
    return html+'</ul>';
  }

  function bSpecs(items){
    var html='<div class="specs">';
    items.forEach(function(s){ html+='<div class="spec r"><span class="k">'+s[0]+'</span><span class="v">'+s[1]+'</span></div>'; });
    return html+'</div>';
  }

  function bSteps(items){
    var html='<div class="steps"><span class="line"></span>';
    items.forEach(function(s){
      html+='<div class="step r"><div class="n">'+s[0]+'</div><div class="st">'+s[1]+'</div><p>'+s[2]+'</p></div>';
    });
    return html+'</div>';
  }

  function bNote(a){ return '<div class="note r"><div class="nh">'+a[0]+'</div><p>'+a[1]+'</p></div>'; }

  function bBadges(items){
    var html='<div class="badges">';
    items.forEach(function(b){ html+='<span class="badge r">'+b+'</span>'; });
    return html+'</div>';
  }

  function bBars(items){
    var html='<div class="bars">';
    items.forEach(function(b){
      html+='<div class="bar r"><div class="bt"><b>'+b[0]+'</b><span>'+b[1]+'%</span></div>'
          +'<div class="track"><div class="fill" data-pct="'+b[1]+'" style="width:'+b[1]+'%"></div></div></div>';
    });
    return html+'</div>';
  }

  function bFigure(a){ return '<figure class="figure r"><img src="'+a[0]+'" alt=""/>'+(a[1]?'<figcaption>'+a[1]+'</figcaption>':'')+'</figure>'; }
  function bFigGrid(items){
    var html='<div class="figs c2">';
    items.forEach(function(s){ html+='<figure class="figure r" style="aspect-ratio:4/3"><img src="'+s+'" alt=""/></figure>'; });
    return html+'</div>';
  }
  function bFig(o){
    var cls = "figure r" + (o.mode==="contain" ? " contain" : "");
    var ar = o.ar || (o.mode==="contain" ? "4/3" : "16/10");
    return '<figure class="'+cls+'" style="aspect-ratio:'+ar+'"><img src="'+o.src+'" alt=""/>'
         + (o.cap?'<figcaption>'+o.cap+'</figcaption>':'') + '</figure>';
  }
  function bFigs(o){
    var ar=o.ar||"3/2", fc="figure r"+(o.mode==="contain"?" contain":"");
    var html='<div class="figs c'+(o.cols||2)+'">';
    o.srcs.forEach(function(s){ html+='<figure class="'+fc+'" style="aspect-ratio:'+ar+'"><img src="'+s+'" alt=""/></figure>'; });
    return html+'</div>';
  }
  function bSplit(o){
    var ratio=o.ratio||"r5050";
    return '<div class="cols '+ratio+'" style="gap:'+(o.gap||"38px")+'">'
      + '<div class="col">'+o.cols[0].map(renderBlock).join("")+'</div>'
      + '<div class="col">'+o.cols[1].map(renderBlock).join("")+'</div></div>';
  }
  function bDiagram(kind, cap){
    var svg = DIAGRAMS[kind] ? DIAGRAMS[kind]() : "";
    return '<figure class="figure diagram r" style="aspect-ratio:'+(kind==="filtration"?"16/11":"16/10")+'">'
         + svg + (cap?'<figcaption>'+cap+'</figcaption>':'') + '</figure>';
  }
  function bBeforeAfter(o){
    return '<div class="bafter">'
      + '<figure class="figure r" style="aspect-ratio:4/3"><img src="'+o.before+'" alt=""/>'
      +   '<span class="batag old">'+(o.bl||"Before")+'</span></figure>'
      + '<div class="baarrow r"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>'
      + '<figure class="figure r" style="aspect-ratio:4/3"><img src="'+o.after+'" alt=""/>'
      +   '<span class="batag new">'+(o.al||"After")+'</span></figure>'
      + '</div>';
  }

  function renderBlock(b){
    if(b.lead)        return bLead(b.lead);
    if(b.label)       return bLabel(b.label);
    if(b.cardsTitle)  return bLabel(b.cardsTitle);
    if(b.listTitle)   return bLabel(b.listTitle);
    if(b.specsTitle)  return bLabel(b.specsTitle);
    if(b.badgesTitle) return bLabel(b.badgesTitle);
    if(b.stats)       return bStats(b.stats, b.cls);
    if(b.cards)       return bCards(b.cards, b.cls);
    if(b.list)        return bList(b.list);
    if(b.specs)       return bSpecs(b.specs);
    if(b.steps)       return bSteps(b.steps);
    if(b.note)        return bNote(b.note);
    if(b.badges)      return bBadges(b.badges);
    if(b.bars)        return bBars(b.bars);
    if(b.figure)      return bFigure(b.figure);
    if(b.figGrid)     return bFigGrid(b.figGrid);
    if(b.fig)         return bFig(b.fig);
    if(b.figs)        return bFigs(b.figs);
    if(b.split)       return bSplit(b);
    if(b.diagram)     return bDiagram(b.diagram, b.cap);
    if(b.beforeAfter) return bBeforeAfter(b.beforeAfter);
    return "";
  }

  function head(s){
    return '<div class="s-head"><div class="kicker r">'+s.kicker+'</div>'
         + '<h2 class="s-title r">'+s.title+'</h2><div class="s-rule r"></div></div>';
  }

  /* ---------- slide renderers ---------- */
  function renderSlide(s){
    switch(s.type){
      case "cover": return renderCover(s);
      case "toc": return renderTOC(s);
      case "chapter": return renderChapter(s);
      case "content": return renderContent(s);
      case "map": return renderMap(s);
      case "partners": return renderPartners(s);
      case "contact": return renderContact(s);
    }
    return "";
  }

  function renderCover(s){
    return '<div class="cbg"><img src="'+s.bg+'" alt=""/></div>'
      + (s.corp?'<div class="corp"><img src="'+s.corp+'" alt="De-AirTech 艾霆环保"/></div>':'')
      + '<div class="inner">'
      +   '<div class="brandline"><img src="assets/img/image2.png" alt=""/><span class="bw">De‑<b>AirTech</b></span></div>'
      +   '<div class="ckick">'+s.kicker+'</div>'
      +   '<h1><span class="l1 split">'+s.l1+'</span><span class="l2 split">'+s.l2+'</span></h1>'
      +   '<div class="csub">'+s.sub+'</div>'
      +   '<div class="ctag">'+s.tag+'</div>'
      + '</div>';
  }

  function renderTOC(s){
    var html=head(s)+'<div class="body"><div class="tgrid">';
    s.items.forEach(function(it,i){
      html+='<div class="titem r" data-go="'+i+'"><div class="tn">'+it[0]+'</div>'
          +'<div class="tt"><b>'+it[1]+'</b><span>'+it[2]+'</span></div></div>';
    });
    return html+'</div></div>';
  }

  function renderChapter(s){
    return '<div class="cbg"><img src="'+s.bg+'" alt=""/></div>'
      + '<div class="inner"><div class="bignum">'+s.n+'</div>'
      + '<div class="ctext"><div class="ck r">'+s.kicker+'</div>'
      + '<h2 class="split">'+s.title+'</h2>'
      + '<div class="cs r">'+s.sub+'</div><div class="crule r"></div></div></div>';
  }

  function renderContent(s){
    var html=head(s)+'<div class="body">';
    if(s.layout==="rows"){
      html+='<div class="rows">';
      s.rows.forEach(function(b){ html+=renderBlock(b); });
      html+='</div>';
    } else {
      html+='<div class="cols '+s.layout+'"><div class="col">';
      s.main.forEach(function(b){ html+=renderBlock(b); });
      html+='</div><div class="col">';
      s.side.forEach(function(b){ html+=renderBlock(b); });
      html+='</div></div>';
    }
    return html+'</div>';
  }

  function renderMap(s){
    var html=head(s)+'<div class="body"><div class="mwrap"><div class="frame r">'
        +'<img src="'+s.img+'" alt="De-AirTech global project map"/>';
    s.markers.forEach(function(m){ html+='<span class="marker" style="left:'+m[0]+'%;top:'+m[1]+'%"></span>'; });
    html+='</div><div class="mside">'+bStats(s.stats,"c1");
    html+='<div class="badges">';
    s.legend.forEach(function(l){ html+='<span class="badge r"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:'+l[1]+';margin-right:8px"></span>'+l[0]+'</span>'; });
    html+='</div></div></div></div>';
    return html;
  }

  function renderPartners(s){
    var html=head(s)+'<div class="body"><div class="cols r5545"><div class="col">'
        + bLead(s.lead)
        + '<div class="pgrid">';
    s.logos.forEach(function(l){ html+='<div class="plogo r"><img src="assets/img/'+l+'" alt=""/></div>'; });
    html+='</div></div><div class="col">'
        + bLabel("Partnership Benefits")
        + bList(s.benefits)
        + bStats([s.stat],"c1")
        + '</div></div></div>';
    return html;
  }

  function renderContact(s){
    var html='<div class="cbg"><img src="'+s.bg+'" alt=""/></div><div class="inner">'
        + (s.corp?'<div class="corp center r"><img src="'+s.corp+'" alt="De-AirTech 艾霆环保"/></div>':'')
        + '<div class="ck r">'+s.kicker+'</div><h2 class="split">'+s.title+'</h2>'
        + '<div class="cmsg r">'+s.msg+'</div><div class="cinfo">';
    s.info.forEach(function(c){ html+='<div class="ci r"><div class="cl">'+c[0]+'</div><div class="cv">'+c[1]+'</div></div>'; });
    html+='</div><div class="cfoot r"><b>'+s.foot+'</b></div></div>';
    return html;
  }

  /* ---------- mount ---------- */
  var stage=document.getElementById("stage");
  var els=[];
  SLIDES.forEach(function(s){
    var sec=document.createElement("section");
    sec.className="slide "+s.type;
    sec.dataset.type=s.type;
    sec.innerHTML=renderSlide(s);
    stage.appendChild(sec);
    els.push(sec);
  });
  document.getElementById("ctot").textContent=String(SLIDES.length).padStart(2,"0");
  document.getElementById("brandlogo").src="assets/img/image2.png";

  var chapters=[]; SLIDES.forEach(function(s,i){ if(s.type==="chapter") chapters.push(i); });

  /* ---------- scale to fit (any aspect ratio) ---------- */
  function fit(){
    var s=Math.min(window.innerWidth/1920, window.innerHeight/1080);
    stage.style.setProperty("--s", s);
  }
  window.addEventListener("resize", fit); fit();

  /* ---------- ambient particles ---------- */
  (function(){
    var cv=document.getElementById("fx"), ctx=cv.getContext("2d"), W,H,ps=[];
    function rs(){ W=cv.width=window.innerWidth; H=cv.height=window.innerHeight; }
    window.addEventListener("resize", rs); rs();
    var N = REDUCE ? 0 : Math.min(46, Math.round(W*H/46000));
    for(var i=0;i<N;i++) ps.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+0.4,
      s:Math.random()*0.25+0.05,d:Math.random()*Math.PI*2,a:Math.random()*0.35+0.08});
    function loop(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<ps.length;i++){ var p=ps[i];
        p.y-=p.s; p.x+=Math.sin(p.d+=0.01)*0.18;
        if(p.y<-6){ p.y=H+6; p.x=Math.random()*W; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283);
        ctx.fillStyle="rgba(200,162,101,"+p.a+")"; ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    if(!REDUCE) loop();
  })();

  /* ---------- entrance animations ---------- */
  function countUp(slide, tl, pos){
    slide.querySelectorAll(".stat .v .cv[data-num]").forEach(function(cv){
      var raw=cv.dataset.num; if(!/^[\d.,]+$/.test(raw)) return;
      var target=parseFloat(raw.replace(/,/g,"")); if(isNaN(target)) return;
      var dec=(raw.split(".")[1]||"").length, comma=/,/.test(raw), o={v:0};
      cv.textContent=fmt(0,dec,comma);
      tl.to(o,{v:target,duration:1.1*DUR,ease:"power2.out",
        onUpdate:function(){ cv.textContent=fmt(o.v,dec,comma); }}, pos);
    });
  }

  function splitReveal(tl, el, pos){
    if(!el) return;
    if(!window.SplitText){ tl.from(el,{autoAlpha:0,y:30,duration:0.7*DUR},pos); return; }
    try{
      if(el._st && el._st.revert) el._st.revert();   // clean prior split on revisit
      var sp=new SplitText(el,{type:"chars,words"});
      el._st=sp;
      tl.from(sp.chars,{yPercent:120,autoAlpha:0,rotateX:-40,duration:0.7*DUR,ease:"power3.out",
        stagger:0.024},pos);
    }catch(e){ tl.from(el,{autoAlpha:0,y:30,duration:0.7*DUR},pos); }
  }

  function reveal(tl, nodes, pos, fromVars){
    if(!nodes.length) return;
    tl.fromTo(nodes, Object.assign({autoAlpha:0,y:26}, fromVars||{}),
      {autoAlpha:1,y:0,x:0,scale:1,duration:0.6*DUR,ease:"power3.out",
       stagger:{each:0.05, from:"start"}}, pos);
  }

  function enter(slide, dir){
    var type=slide.dataset.type;
    var tl=gsap.timeline({defaults:{ease:"power3.out"}});
    gsap.set(slide,{autoAlpha:1});

    if(type==="cover"){
      tl.fromTo(slide.querySelector(".cbg img"),{scale:1.14,xPercent:2},
        {scale:1,xPercent:0,duration:2.6*DUR,ease:"power2.out"},0);
      tl.from(slide.querySelector(".brandline"),{autoAlpha:0,y:24,duration:0.7*DUR},0.2);
      tl.from(slide.querySelector(".ckick"),{autoAlpha:0,y:20,duration:0.6*DUR},0.35);
      slide.querySelectorAll(".split").forEach(function(el,i){ splitReveal(tl,el,0.5+i*0.18); });
      tl.from(slide.querySelector(".csub"),{autoAlpha:0,y:24,duration:0.7*DUR},0.95);
      tl.from(slide.querySelector(".ctag"),{autoAlpha:0,x:-20,duration:0.7*DUR},1.1);
      return tl;
    }
    if(type==="chapter"){
      tl.fromTo(slide.querySelector(".cbg img"),{scale:1.16,xPercent:(dir<0?-3:3)},
        {scale:1,xPercent:0,duration:2.2*DUR,ease:"power2.out"},0);
      tl.fromTo(slide.querySelector(".bignum"),{autoAlpha:0,scale:0.82,xPercent:-6},
        {autoAlpha:1,scale:1,xPercent:0,duration:1.2*DUR,ease:"lux"},0.15);
      tl.from(slide.querySelector(".ck"),{autoAlpha:0,y:20,duration:0.6*DUR},0.4);
      splitReveal(tl, slide.querySelector(".split"),0.55);
      tl.from(slide.querySelector(".cs"),{autoAlpha:0,y:22,duration:0.7*DUR},0.9);
      tl.fromTo(slide.querySelector(".crule"),{scaleX:0,transformOrigin:"left"},
        {scaleX:1,duration:0.7*DUR},1.0);
      return tl;
    }
    if(type==="contact"){
      tl.fromTo(slide.querySelector(".cbg img"),{scale:1.12},{scale:1,duration:2.4*DUR,ease:"power2.out"},0);
      tl.from(slide.querySelector(".ck"),{autoAlpha:0,y:18,duration:0.6*DUR},0.2);
      splitReveal(tl, slide.querySelector(".split"),0.35);
      tl.from(slide.querySelector(".cmsg"),{autoAlpha:0,y:22,duration:0.7*DUR},0.8);
      reveal(tl, slide.querySelectorAll(".ci"),0.95);
      tl.from(slide.querySelector(".cfoot"),{autoAlpha:0,duration:0.7*DUR},1.2);
      return tl;
    }

    /* generic content / toc / map / partners */
    tl.fromTo(slide,{xPercent:dir<0?-4:4},{xPercent:0,duration:0.6*DUR,ease:"power2.out"},0);
    // header
    var k=slide.querySelector(".kicker.r"), t=slide.querySelector(".s-title.r"), ru=slide.querySelector(".s-rule.r");
    if(k) tl.from(k,{autoAlpha:0,x:-22,duration:0.6*DUR},0.05);
    if(t) tl.from(t,{autoAlpha:0,y:26,duration:0.7*DUR},0.14);
    if(ru) tl.fromTo(ru,{scaleX:0,transformOrigin:"left"},{scaleX:1,autoAlpha:1,duration:0.6*DUR},0.28);

    // body items (exclude header .r already handled)
    var items=[].slice.call(slide.querySelectorAll(".body .r, .inner .r"));
    reveal(tl, items, 0.34);

    // steps connector
    var line=slide.querySelector(".steps .line");
    if(line) tl.fromTo(line,{scaleX:0},{scaleX:1,duration:0.9*DUR,ease:"power2.inOut"},0.5);

    // bars
    slide.querySelectorAll(".bar .fill").forEach(function(f,i){
      tl.fromTo(f,{scaleX:0,transformOrigin:"left"},{scaleX:1,duration:0.9*DUR,ease:"power3.out"},0.6+i*0.08);
    });

    // count-ups
    countUp(slide, tl, 0.6);

    // map markers pulse
    var mk=slide.querySelectorAll(".marker");
    if(mk.length){
      tl.fromTo(mk,{scale:0,autoAlpha:0},{scale:1,autoAlpha:1,duration:0.5*DUR,stagger:0.08,ease:"back.out(2)"},0.7);
      if(!REDUCE) mk.forEach(function(m){
        gsap.to(m,{boxShadow:"0 0 0 14px rgba(200,162,101,0)",repeat:-1,duration:1.8,ease:"power2.out"});
      });
    }
    return tl;
  }

  /* ---------- controller ---------- */
  var idx=0, busy=false, started=false, curTL=null, deck=document.getElementById("deck");
  function clamp(n){ return Math.max(0, Math.min(els.length-1, n)); }

  function updateHUD(){
    var s=SLIDES[idx];
    deck.dataset.type=s.type;
    document.getElementById("cnum").textContent=String(idx+1).padStart(2,"0");
    document.getElementById("chiptag").textContent=s.chip||"De‑AirTech";
    document.getElementById("pbar").style.width=(idx/(els.length-1)*100)+"%";
  }

  function go(n){
    if(!started) return;
    n=clamp(n); if(n===idx||busy) return;
    for(var k=0;k<els.length;k++){ if(k!==idx && els[k].classList.contains("active")){ els[k].classList.remove("active"); gsap.set(els[k],{clearProps:"all"}); } }
    var dir=n>idx?1:-1, prev=els[idx], next=els[n]; idx=n; busy=true; updateHUD();
    if(curTL) curTL.kill();
    gsap.killTweensOf(prev);
    gsap.to(prev,{autoAlpha:0,xPercent:-5*dir,duration:0.4*DUR,ease:"power2.in",
      onComplete:function(){ prev.classList.remove("active"); gsap.set(prev,{xPercent:0,clearProps:"visibility"}); }});
    next.classList.add("active");
    gsap.set(next,{autoAlpha:1,xPercent:0});
    curTL=enter(next,dir);
    curTL.eventCallback("onComplete",function(){ busy=false; });
    gsap.delayedCall(0.85,function(){ busy=false; });
  }
  function next(){ go(idx+1); }
  function prev(){ go(idx-1); }

  /* show starts immediately; F toggles fullscreen */
  started=true;
  function showInstant(n){
    n=clamp(n);
    for(var k=0;k<els.length;k++){ if(k!==n) els[k].classList.remove("active"); }
    idx=n; els[n].classList.add("active"); gsap.set(els[n],{autoAlpha:1,xPercent:0});
    updateHUD(); if(curTL) curTL.kill(); curTL=enter(els[n],1);
  }
  function requestFS(){
    var el=document.documentElement, rq=el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen;
    if(!rq) return;
    try{ var p=rq.call(el); if(p&&p.catch) p.catch(function(){}); }catch(e){}
  }

  /* ---------- input ---------- */
  document.getElementById("next").addEventListener("click",function(e){ e.stopPropagation(); next(); });
  document.getElementById("prev").addEventListener("click",function(e){ e.stopPropagation(); prev(); });

  window.addEventListener("keydown",function(e){
    switch(e.key){
      case "ArrowRight": case "PageDown": case " ": case "Spacebar": e.preventDefault(); next(); break;
      case "ArrowDown": e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp": e.preventDefault(); prev(); break;
      case "ArrowUp": e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); go(0); break;
      case "End": e.preventDefault(); go(els.length-1); break;
      case "f": case "F":
        if(!document.fullscreenElement) requestFS();
        else if(document.exitFullscreen) try{ document.exitFullscreen(); }catch(err){}
        break;
    }
  });

  // click left/right to navigate (ignore HUD buttons & TOC items)
  deck.addEventListener("click",function(e){
    if(e.target.closest(".nav")||e.target.closest(".titem")) return;
    var x=e.clientX/window.innerWidth;
    if(x>0.5) next(); else prev();
  });

  // TOC jump
  deck.addEventListener("click",function(e){
    var it=e.target.closest(".titem"); if(!it) return;
    e.stopPropagation(); var c=+it.dataset.go;
    if(chapters[c]!=null) go(chapters[c]);
  });

  // touch swipe
  var tx=0,ty=0;
  deck.addEventListener("touchstart",function(e){ tx=e.touches[0].clientX; ty=e.touches[0].clientY; },{passive:true});
  deck.addEventListener("touchend",function(e){
    var dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){ dx<0?next():prev(); }
  },{passive:true});

  // fade the hint after a few seconds
  gsap.to(".hint",{autoAlpha:0,duration:1,delay:6});

  // deep-linking: #12 jumps to slide 12 (1-based); also expose for tooling
  function fromHash(){
    var n=parseInt((location.hash||"").replace("#",""),10); if(!isNaN(n)) go(n-1);
  }
  window.addEventListener("hashchange", fromHash);
  // initial render — respect a deep-link hash (#12), else the cover
  (function(){ var n=parseInt((location.hash||"").replace("#",""),10); showInstant(isNaN(n)?0:n-1); })();
  window.__deck={ go:go, next:next, prev:prev, get index(){return idx;} };
})();
