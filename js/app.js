/* AMANA Blueprint – application logic extracted from index.html */

// ── SEARCH ───────────────────────────────────────────────────────────────────
let currentFilter = 'all';

function doSearch(q){
  q = q.trim().toLowerCase();
  const results = document.getElementById('search-results');
  const count   = document.getElementById('search-count');
  const clear   = document.getElementById('search-clear');
  const wrap    = document.getElementById('feat-areas-wrap');

  if(!q || q.length < 2){
    results.style.display='none'; count.textContent=''; clear.style.display='none';
    wrap.style.display='block'; return;
  }
  clear.style.display='inline-block';
  wrap.style.display='none';

  let hits = SEARCH_INDEX.filter(item =>
    item.feat.toLowerCase().includes(q) ||
    item.main.toLowerCase().includes(q) ||
    item.area.toLowerCase().includes(q)
  );
  if(currentFilter==='exklusiv') hits=hits.filter(h=>h.hi);
  if(currentFilter==='standard') hits=hits.filter(h=>!h.hi);

  count.textContent = hits.length + ' Ergebnisse';
  if(hits.length===0){
    results.innerHTML='<div class="no-results">Keine Ergebnisse für "'+q+'"</div>';
    results.style.display='block'; return;
  }
  function hl(text,q){
    const i=text.toLowerCase().indexOf(q);
    if(i<0) return text;
    return text.slice(0,i)+'<mark>'+text.slice(i,i+q.length)+'</mark>'+text.slice(i+q.length);
  }
  results.innerHTML = hits.map(item=>{
    const badge = item.hi ? '<span class="sr-hi">✦ Exklusiv</span>':'' ;
    return '<div class="sr-item" onclick="jumpTo('+item.ai+','+item.mi+')">'
      +'<span class="sr-area" style="background:'+item.fg+';">'+item.area+'</span>'
      +'<span class="sr-main">› '+item.main+'</span>'
      +'<span class="sr-feat">'+hl(item.feat,q)+'</span>'
      +badge+'</div>';
  }).join('');
  results.style.display='block';
}

function jumpTo(ai,mi){
  clearSearch();
  setTimeout(()=>{
    const area=document.getElementById('area'+ai);
    const body=document.getElementById('abd'+ai);
    const mfbd=document.getElementById('mfbd'+ai+'-'+mi);
    const aarr=document.getElementById('aarr'+ai);
    const mfarr=document.getElementById('mfarr'+ai+'-'+mi);
    if(body&&body.style.display==='none'){ body.style.display='block'; if(aarr)aarr.classList.add('open'); }
    if(mfbd&&mfbd.style.display==='none'){ mfbd.style.display='block'; if(mfarr)mfarr.classList.add('open'); }
    if(area){
      window.scrollTo({top:area.getBoundingClientRect().top+window.scrollY-130,behavior:'smooth'});
      area.style.outline='2px solid #0F4C4C';
      setTimeout(()=>area.style.outline='',2500);
    }
  },60);
}

function clearSearch(){
  document.getElementById('search-input').value='';
  document.getElementById('search-results').style.display='none';
  document.getElementById('search-count').textContent='';
  document.getElementById('search-clear').style.display='none';
  document.getElementById('feat-areas-wrap').style.display='block';
}

// ── FILTER ───────────────────────────────────────────────────────────────────
function setFilter(f, btn){
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');

  document.querySelectorAll('.sf-item').forEach(item=>{
    const isHi = item.querySelector('.sf-badge') !== null;
    if(f==='all') item.style.display='flex';
    else if(f==='exklusiv') item.style.display = isHi ? 'flex':'none';
    else item.style.display = isHi ? 'none':'flex';
  });

  // Hide empty main-feats
  document.querySelectorAll('.main-feat').forEach(mf=>{
    const visible = [...mf.querySelectorAll('.sf-item')].some(i=>i.style.display!=='none');
    mf.style.display = visible ? 'block':'none';
  });

  // Re-run search if active
  const q = document.getElementById('search-input').value;
  if(q.length>=2) doSearch(q);
}

// ── TOGGLE ───────────────────────────────────────────────────────────────────
function togSub(a,s){const b=document.getElementById("scbd"+a+"-"+s);const r=document.getElementById("scarr"+a+"-"+s);const o=b.style.display==="none";b.style.display=o?"block":"none";if(r)r.classList.toggle("open",o);}
function togArea(i){
  const b=document.getElementById('abd'+i);
  const a=document.getElementById('aarr'+i);
  const open=b.style.display!=='none';
  b.style.display=open?'none':'block';
  a.classList.toggle('open',!open);
}
function togMF(ai,mi){
  const b=document.getElementById('mfbd'+ai+'-'+mi);
  const a=document.getElementById('mfarr'+ai+'-'+mi);
  const open=b.style.display!=='none';
  b.style.display=open?'none':'block';
  a.classList.toggle('open',!open);
}

// ── NAV SCROLL ───────────────────────────────────────────────────────────────
window.addEventListener('scroll',()=>{
  const ids=['vision','plattform','prinzipien','features','prozesse','expansion','wettbewerb'];
  let cur='vision';
  ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<100)cur=id;});
  document.querySelectorAll('.nav-a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));
});

// ── FLOW TOGGLE ──────────────────────────────────────────────────────────────
function togFlow(key){
  const body = document.getElementById('flow-'+key);
  const arr  = document.getElementById('farr-'+key);
  if(!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  arr.classList.toggle('open', !open);
}
function allFlows(open){
  document.querySelectorAll('.flow-body').forEach(b => b.style.display = open ? 'block' : 'none');
  document.querySelectorAll('.flow-arr').forEach(a => a.classList.toggle('open', open));
}


/* ══ IMPLEMENTIERUNGS-TRACKER · 3 Zustände ══════════════════════════════════
   Zustände:     '' → offen   |   'wip' → in Arbeit   |   'done' → implementiert
   localStorage: amana_blueprint_v1
   HTML-IDs:     tracker-prog-fill (grün/done), tracker-wip-fill (orange/wip)
                 tracker-label, tracker-wip-label, tracker-total
                 btn-all, btn-open, btn-wip, btn-done
   CSS-Klassen:  .sf-item.wip, .sf-item.done  (auf &lt;li&gt;-Elemente)
                 .mf-impl-fill (Balken in jedem Hauptbereich-Header)
                 .mf-impl-pct  (Zähler-Text im Header)
   ══════════════════════════════════════════════════════════════════════════ */

const BP_KEY    = 'amana_blueprint_v1';
const BP_TOTAL  = 1049;
const BP_LABELS = {
  '':    'Offen — klicken für: In Arbeit',
  'wip': 'In Arbeit — klicken für: Implementiert',
  'done':'Implementiert — klicken für: Offen'
};
let bpData   = {};   /* { 'data-feat-key': 'wip'|'done' } */
let bpFilter = 'all';

/* ── Laden / Speichern ── */
function bpLoad(){
  try{ bpData = JSON.parse(localStorage.getItem(BP_KEY) || '{}'); }
  catch(e){ bpData = {}; }
}
function bpSave(){
  try{ localStorage.setItem(BP_KEY, JSON.stringify(bpData)); }
  catch(e){}
}

/* ── Zustand rotieren: offen → wip → done → offen ── */
function togImpl(e, btn){
  e.stopPropagation();
  var li  = btn.parentElement;
  while(li && !li.classList.contains('sf-item')){ li = li.parentElement; }
  if(!li) return;
  var key = li.getAttribute('data-feat');
  if(!key) return;
  var cur  = bpData[key] || '';
  var next = cur === '' ? 'wip' : cur === 'wip' ? 'done' : '';
  li.classList.remove('wip','done');
  if(next !== '') li.classList.add(next);
  if(next === '') delete bpData[key];
  else            bpData[key] = next;
  btn.title = BP_LABELS[next];
  bpSave();
  bpUpdate();
  bpApplyFilter();
}

/* ── Gespeicherten Zustand wiederherstellen ── */
function bpRestore(){
  bpLoad();
  document.querySelectorAll('.sf-item').forEach(function(li){
    var key = li.getAttribute('data-feat');
    var st  = key ? (bpData[key] || '') : '';
    li.classList.remove('wip','done');
    if(st) li.classList.add(st);
    var btn = li.querySelector('.impl-chk');
    if(btn) btn.title = BP_LABELS[st];
  });
}

/* ── Tracker-Anzeige aktualisieren ── */
function bpUpdate(){
  var nDone = document.querySelectorAll('.sf-item.done').length;
  var nWip  = document.querySelectorAll('.sf-item.wip').length;
  var pD    = Math.round(nDone / BP_TOTAL * 100);
  var pW    = Math.round(nWip  / BP_TOTAL * 100);

  /* Globale Leiste */
  var fD  = document.getElementById('tracker-prog-fill');
  var fW  = document.getElementById('tracker-wip-fill');
  var lD  = document.getElementById('tracker-label');
  var lW  = document.getElementById('tracker-wip-label');
  var tot = document.getElementById('tracker-total');
  if(fD)  fD.style.width  = pD + '%';
  if(fW)  fW.style.width  = pW + '%';
  if(lD)  lD.textContent  = nDone + ' / ' + BP_TOTAL + ' implementiert';
  if(lW)  lW.textContent  = nWip  + ' in Arbeit';
  if(tot) tot.textContent = pD + '% fertig';

  /* Pro Hauptbereich */
  document.querySelectorAll('.main-feat').forEach(function(mf){
    var items = mf.querySelectorAll('.sf-item');
    var nD    = mf.querySelectorAll('.sf-item.done').length;
    var nW    = mf.querySelectorAll('.sf-item.wip').length;
    var t     = items.length || 1;
    var pct   = Math.round(nD / t * 100);

    var bar   = mf.querySelector('.mf-impl-fill');
    var label = mf.querySelector('.mf-impl-pct');
    if(bar){
      bar.style.width      = pct + '%';
      bar.style.background = pct === 100 ? '#2E7D32' : '#2E7D32';
    }
    if(label){
      var parts = [];
      if(nD) parts.push('\u2713' + nD);
      if(nW) parts.push('\u25D1' + nW);
      label.textContent = (parts.length ? parts.join(' ') : '0') + '/' + items.length;
    }
  });
}

/* ── Filter setzen ── */
function bpSetFilter(mode){
  bpFilter = mode;
  ['all','open','wip','done'].forEach(function(m){
    var btn = document.getElementById('btn-' + m);
    if(!btn) return;
    btn.classList.toggle('active', m === mode);
    if(m === 'wip') btn.style.cssText = m === mode
      ? 'background:#F57C00;border-color:#F57C00;color:#fff;'
      : '';
  });
  bpApplyFilter();
}

/* ── Filter anwenden ── */
function bpApplyFilter(){
  document.querySelectorAll('.sf-item').forEach(function(li){
    var isDone = li.classList.contains('done');
    var isWip  = li.classList.contains('wip');
    var show   = true;
    if(bpFilter === 'open') show = !isDone && !isWip;
    else if(bpFilter === 'wip')  show = isWip;
    else if(bpFilter === 'done') show = isDone;
    li.style.display = show ? '' : 'none';
  });
  /* Hauptbereiche: ausblenden wenn alle Items verborgen; bei Filter aufklappen */
  document.querySelectorAll('.main-feat').forEach(function(mf){
    if(bpFilter === 'all'){ mf.style.display = ''; return; }
    var items    = mf.querySelectorAll('.sf-item');
    var hasShown = false;
    for(var i = 0; i < items.length; i++){
      if(items[i].style.display !== 'none'){ hasShown = true; break; }
    }
    mf.style.display = hasShown ? '' : 'none';
    if(hasShown){
      var body = document.getElementById(mf.id.replace('main-feat','mfbd').replace('mf','mfbd'));
      var body2 = mf.querySelector('.mf-body');
      if(body2) body2.style.display = 'block';
      var arr = mf.querySelector('.mf-arr');
      if(arr) arr.classList.add('open');
    }
  });
}

/* ── Alle zurücksetzen ── */
function resetTracker(){
  if(!confirm('Alle Markierungen zurücksetzen?\n(Offen / In Arbeit / Implementiert)')) return;
  bpData = {};
  bpSave();
  document.querySelectorAll('.sf-item').forEach(function(li){
    li.classList.remove('wip','done');
    var btn = li.querySelector('.impl-chk');
    if(btn) btn.title = BP_LABELS[''];
  });
  bpUpdate();
}

/* ── Initialisierung ── */
bpRestore();
bpUpdate();


/* ── PWA registration ───────────────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(function (err) {
      console.warn('AMANA PWA: Service Worker konnte nicht registriert werden.', err);
    });
  });
}
