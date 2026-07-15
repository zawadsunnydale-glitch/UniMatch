function renderRankTable(key){
  const body = document.getElementById("rankTableBody");
  if (!body || typeof UNIVERSITIES === "undefined") return;

  const sorted = [...UNIVERSITIES].filter(u => u[key]).sort((a,b) => a[key] - b[key]);
  body.innerHTML = sorted.map(u => `
    <tr>
      <td class="rank-num" style="font-family:var(--font-mono); color:var(--orange);">#${u[key]}</td>
      <td style="font-weight:600; color:var(--cream);">${u.name}</td>
      <td>${u.country}</td>
      <td class="tuition" style="font-family:var(--font-mono); text-align:right;">$${u.tuition.toLocaleString()}</td>
      <td class="tuition" style="font-family:var(--font-mono); text-align:center;">${u.employer}/100</td>
    </tr>`).join("");
}

function renderEmployerChart(){
  const chart = document.getElementById("employerChart");
  if (!chart || typeof UNIVERSITIES === "undefined") return;

  const top = [...UNIVERSITIES].sort((a,b) => b.employer - a.employer).slice(0,10);
  if (!top.length) return;
  const max = top[0].employer;

  chart.innerHTML = top.map(u => `
    <div class="bar-row" style="margin-bottom:12px;">
      <span class="bar-label" style="display:inline-block; width:160px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:0.85rem;">${u.name}</span>
      <div class="bar-track" style="background:var(--line); height:12px; display:inline-block; width:calc(100% - 220px); border-radius:4px; overflow:hidden; margin:0 10px; vertical-align:middle;">
        <div class="bar-fill" style="width:${(u.employer / max) * 100}%; background:var(--orange); height:100%;"></div>
      </div>
      <span class="bar-value" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--tan);">${u.employer}</span>
    </div>`).join("");
}

function renderBdTable(){
  const body = document.getElementById("bdTableBody");
  const chart = document.getElementById("bdChart");
  if (!body || typeof BD_UNIVERSITIES === "undefined") return;

  body.innerHTML = BD_UNIVERSITIES.map(u => `
    <tr>
      <td style="font-weight:600; color:var(--cream);">${u.name}</td>
      <td>${u.type}</td>
      <td>${u.city}</td>
      <td class="tuition" style="font-family:var(--font-mono); text-align:right;">৳${u.tuitionPerYearBDT.toLocaleString()}</td>
      <td class="tuition" style="font-family:var(--font-mono); text-align:center;">${u.employer}/100</td>
      <td>${u.admissionTest}</td>
    </tr>`).join("");

  if (!chart || !BD_UNIVERSITIES.length) return;
  const top = [...BD_UNIVERSITIES].sort((a,b) => b.employer - a.employer).slice(0,10);
  const max = top[0].employer;

  chart.innerHTML = top.map(u => `
    <div class="bar-row" style="margin-bottom:12px;">
      <span class="bar-label" style="display:inline-block; width:160px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:0.85rem;">${u.name}</span>
      <div class="bar-track" style="background:var(--line); height:12px; display:inline-block; width:calc(100% - 220px); border-radius:4px; overflow:hidden; margin:0 10px; vertical-align:middle;">
        <div class="bar-fill teal" style="width:${(u.employer / max) * 100}%; background:var(--tan); height:100%;"></div>
      </div>
      <span class="bar-value" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--cream);">${u.employer}</span>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderRankTable("qs");
  renderEmployerChart();
  renderBdTable();

  // Tab hooks for ranking systems switcher if present
  const rankTabs = document.getElementById("rankTabs");
  if (rankTabs) {
    rankTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".tool-tab");
      if (!btn) return;
      document.querySelectorAll("#rankTabs .tool-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      renderRankTable(btn.dataset.rank);
    });
  }
});
