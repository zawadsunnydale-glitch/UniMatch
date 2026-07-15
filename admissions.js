document.addEventListener("DOMContentLoaded", () => {
  const bdSection = document.getElementById("bd");
  const abroadSection = document.getElementById("abroad");
  const btnBd = document.getElementById("btnBd");
  const btnAbroad = document.getElementById("btnAbroad");

  if (bdSection && abroadSection && btnBd && btnAbroad) {
    function show(which){
      bdSection.style.display = which === "bd" ? "block" : "none";
      abroadSection.style.display = which === "abroad" ? "block" : "none";
      
      btnBd.classList.toggle("active", which === "bd");
      btnAbroad.classList.toggle("active", which === "abroad");
    }
    
    btnBd.addEventListener("click", () => { show("bd"); bdSection.scrollIntoView({behavior:"smooth"}); });
    btnAbroad.addEventListener("click", () => { show("abroad"); abroadSection.scrollIntoView({behavior:"smooth"}); });

    const hash = window.location.hash.replace("#","");
    show(hash === "abroad" ? "abroad" : "bd");
  }

  const select = document.getElementById("bdUniResourceSelect");
  const result = document.getElementById("bdResourceResult");
  
  if (select && result && typeof BD_UNIVERSITIES !== "undefined"){
    select.innerHTML = BD_UNIVERSITIES.map(u => `<option value="${u.name}">${u.name}</option>`).join("");
    
    function renderResources(){
      const u = BD_UNIVERSITIES.find(x => x.name === select.value) || BD_UNIVERSITIES[0];
      if (!u || !u.resources) {
        result.innerHTML = `<p style="color:var(--cream-45);">No local resources found for this institution track.</p>`;
        return;
      }
      
      result.innerHTML = `
        <h3 style="font-size:1.15rem;margin-bottom:14px;color:var(--cream);">${u.name} Preparation Resources</h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${u.resources.map(r => `
            <div class="uni-result-card" style="display:flex; justify-content:space-between; align-items:center; padding:14px; background:var(--card);">
              <div>
                <div class="uni-result-name" style="font-weight:600;"><a href="${r.url}" target="_blank" rel="noopener" style="color:var(--orange); text-decoration:none;">${r.name}</a></div>
                <div class="uni-result-meta" style="font-size:0.85rem; color:var(--cream-dim); margin-top:4px;">${r.note}</div>
              </div>
              <span class="badge" style="background:var(--line); color:var(--tan); font-size:0.75rem; padding:4px 8px; border-radius:4px;">${r.type}</span>
            </div>`).join("")}
        </div>
      `;
    }
    select.addEventListener("change", renderResources);
    renderResources();
  }
});
