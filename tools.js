function initTabs(){
  const tabs = document.querySelectorAll(".tool-tab");
  const panels = document.querySelectorAll(".tool-panel");
  if (!tabs.length || !panels.length) return;

  function activate(name){
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
  }

  tabs.forEach(t => t.addEventListener("click", () => {
    activate(t.dataset.tab);
    history.replaceState(null, "", "#" + t.dataset.tab);
  }));

  const hash = window.location.hash.replace("#","");
  if (hash && document.getElementById("panel-" + hash)) activate(hash);
}

function runAiSearch(q){
  const box = document.getElementById("aiSearchResults");
  if (!box) return;

  if (!q.trim()){
    box.innerHTML = `<div class="result-empty" style="padding:20px; text-align:center; color:var(--cream-45);">Type a natural English description above (e.g., 'affordable engineering in Canada') to search.</div>`;
    return;
  }

  if (typeof parseQuery === "undefined" || typeof UNIVERSITIES === "undefined") {
    box.innerHTML = `<div class="result-empty" style="padding:20px; text-align:center; color:var(--cream-45);">Institutional matching system loading...</div>`;
    return;
  }

  const parsed = parseQuery(q);
  const filtered = UNIVERSITIES.filter(u => {
    const matchesField = !parsed.field || u.fields.includes(parsed.field);
    const matchesBudget = !parsed.maxBudget || u.tuition <= parsed.maxBudget;
    const matchesCountry = !parsed.countries.length || parsed.countries.some(c => u.country.toLowerCase().includes(c.toLowerCase()));
    return matchesField && matchesBudget && matchesCountry;
  });

  if(!filtered.length) {
    box.innerHTML = `<div class="result-empty" style="padding:20px; text-align:center; color:var(--cream-45);">No explicit matching parameters found. Try broadening budget or keyword criteria.</div>`;
    return;
  }

  box.innerHTML = filtered.map(u => `
    <div class="uni-result-card" style="padding:16px; margin-bottom:12px; background:var(--card); border:1px solid var(--line);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div class="uni-result-name" style="font-size:1.1rem; font-weight:600; color:var(--cream);">${u.name}</div>
          <div class="uni-result-meta" style="font-size:0.88rem; color:var(--cream-dim); margin-top:4px;">${u.city}, ${u.country} · Tuition: $${u.tuition.toLocaleString()}/year</div>
        </div>
        <span style="font-family:var(--font-mono); color:var(--orange);">QS #${u.qs}</span>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();

  const searchBtn = document.getElementById("aiSearchBtn");
  const searchInput = document.getElementById("aiSearchInput");
  
  if (searchBtn && searchInput) {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQ = urlParams.get("q");
    
    searchBtn.addEventListener("click", () => runAiSearch(searchInput.value));
    searchInput.addEventListener("keydown", e => { if (e.key === "Enter") runAiSearch(e.target.value); });
    
    if (initialQ){
      searchInput.value = initialQ;
      runAiSearch(initialQ);
    }
  }

  // Safely fire internal database-reliant engine setups inside data.js if they are active on this view
  if (typeof initQuiz === "function" && document.getElementById("quizFieldSelect")) initQuiz();
  if (typeof initPlanner === "function" && document.getElementById("plannerStreamSelect")) initPlanner();
  if (typeof initEligibility === "function" && document.getElementById("eligibilityBoardSelect")) initEligibility();
});
