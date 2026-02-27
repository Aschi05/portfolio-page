// Theme (dark/light) with persistence
(function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved === "light" || saved === "dark"){
    document.documentElement.dataset.theme = saved;
  }
})();

function toggleTheme(){
  const cur = document.documentElement.dataset.theme;
  const next = (cur === "light") ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
}

// Active nav link based on current page
(function markActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });
})();

// Scroll progress + to-top button
(function scrollUX(){
  const bar = document.getElementById("progress");
  const btn = document.getElementById("toTop");

  function onScroll(){
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if(bar) bar.style.width = p + "%";
    if(btn){
      if(scrollTop > 500) btn.classList.add("show");
      else btn.classList.remove("show");
    }
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  if(btn){
    btn.addEventListener("click", ()=> window.scrollTo({ top:0, behavior:"smooth" }));
  }
})();


// Career page: load & filter timeline from JSON
async function loadCareer(){
  const root = document.getElementById("careerRoot");
  if(!root) return;

  const q = document.getElementById("q");
  const type = document.getElementById("type");
  const sort = document.getElementById("sort");
  const out = document.getElementById("timeline");

  let data = [];
  try{
    data = await fetchCareerData();
  }catch(e){
    out.innerHTML = `<div class="entry"><strong>Fehler</strong><p>Konnte career.json nicht laden.</p></div>`;
    return;
  }

  function render(){
    const query = (q.value || "").trim().toLowerCase();
    const t = type.value;
    const s = sort.value;

    let filtered = data.filter(x=>{
      const inType = (t === "all") ? true : x.type === t;
      const hay = `${x.title} ${x.org} ${x.location} ${(x.tags||[]).join(" ")} ${(x.details||"")}`.toLowerCase();
      const inQuery = query ? hay.includes(query) : true;
      return inType && inQuery;
    });

    filtered.sort((a,b)=>{
      const da = new Date(a.start || "1970-01-01").getTime();
      const db = new Date(b.start || "1970-01-01").getTime();
      return (s === "newest") ? (db - da) : (da - db);
    });

    out.innerHTML = filtered.map(x=>`
      <div class="entry">
        <div class="meta">
          <span class="pill">${x.type}</span>
          <span>${fmtRange(x.start, x.end)}</span>
          <span>• ${escapeHtml(x.location || "")}</span>
        </div>
        <h3 style="margin:.55rem 0 .35rem;">${escapeHtml(x.title)}</h3>
        <div style="color:var(--muted); font-weight:600;">${escapeHtml(x.org)}</div>
        <p style="margin:.55rem 0 0;">${escapeHtml(x.details || "")}</p>
        <div class="badges" style="margin-top:12px;">
          ${(x.tags||[]).map(t=>`<span class="badge">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    `).join("") || `<div class="entry"><strong>Keine Treffer</strong><p>Versuch einen anderen Suchbegriff.</p></div>`;
    renderChart(filtered);
  }

  function fmtRange(start, end){
    const s = start ? new Date(start).toLocaleDateString("de-CH",{year:"numeric",month:"short"}) : "";
    const e = end ? new Date(end).toLocaleDateString("de-CH",{year:"numeric",month:"short"}) : "heute";
    return `${s} – ${e}`;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  [q,type,sort].forEach(el=> el.addEventListener("input", render));
  render();
}
document.addEventListener("DOMContentLoaded", loadCareer);

// simple fetch with 1‑day cache
async function fetchCareerData(){
  const KEY = "careerCache";
  const MAX_AGE = 1000*60*60*24;
  const now = Date.now();
  const cached = JSON.parse(localStorage.getItem(KEY) || "null");
  if(cached && now - cached.ts < MAX_AGE){
    return cached.data;
  }
  const resp = await fetch("assets/career.json");
  const data = await resp.json();
  localStorage.setItem(KEY, JSON.stringify({ts:now,data}));
  return data;
}

// chart rendering
function renderChart(items){
  const counts = items.reduce((acc,x)=>{
    acc[x.type] = (acc[x.type]||0)+1;
    return acc;
  },{});
  const ctx = document.getElementById("careerChart");
  if(!ctx) return;
  if(ctx.chart) ctx.chart.destroy();
  ctx.chart = new Chart(ctx.getContext("2d"), {
    type:'bar',
    data:{labels:Object.keys(counts),datasets:[{label:'Einträge nach Typ',data:Object.values(counts),backgroundColor:'rgba(124,92,255,0.6)'}]},
    options:{responsive:true,maintainAspectRatio:false}
  });
}
