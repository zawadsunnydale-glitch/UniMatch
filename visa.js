function renderVisaCards(){
  const grid = document.getElementById("visaGrid");
  if (!grid || typeof VISA_DESTINATIONS === "undefined") return;
  grid.innerHTML = VISA_DESTINATIONS.map(v => `
    <div class="visa-card reveal">
      <h3>${v.country}</h3>
      <p>${v.note}</p>
    </div>
  `).join("");
}

function renderSponsorCalc(){
  const select = document.getElementById("sponsorCountrySelect");
  const result = document.getElementById("sponsorResult");
  if (!select || !result || typeof SPONSOR_DETAIL === "undefined") return;
  const details = SPONSOR_DETAIL[select.value];
  if (!details) return;
  result.innerHTML = `
    <h3>Sponsor Requirement Summary</h3>
    <p><strong>Required Proof Target:</strong> ${details.amountLabel}</p>
    <p><strong>Minimum Account Seasoning:</strong> ${details.seasoningMonths} Months</p>
    <p style="font-size: 0.88rem; color: var(--cream-dim); margin-top: 10px;">${details.note}</p>
  `;
}

function renderRunway(){
  const select = document.getElementById("runwayCountrySelect");
  const result = document.getElementById("runwayResult");
  if (!select || !result || typeof WORK_VISA_RUNWAY === "undefined") return;
  const runway = WORK_VISA_RUNWAY[select.value];
  if (!runway) return;
  result.innerHTML = `<p style="font-size: 1.1rem; line-height: 1.6;">${runway}</p>`;
}

let interviewIndex = 0;
function renderInterviewCard(){
  const box = document.getElementById("interviewCard");
  const counter = document.getElementById("interviewCounter");
  if (!box || typeof VISA_INTERVIEW_QUESTIONS === "undefined") return;
  const q = VISA_INTERVIEW_QUESTIONS[interviewIndex];
  if (!q) return;
  box.innerHTML = `
    <div>
      <span class="eyebrow">Question Framework</span>
      <h3>"${q.q}"</h3>
      <p style="margin-top: 14px; font-weight: 500; color: var(--tan);"><strong>Intent:</strong> ${q.intent}</p>
      <p style="font-size: .92rem; color: var(--cream-dim); line-height: 1.6; margin-top: 8px;">${q.flag}</p>
    </div>
  `;
  if (counter) counter.textContent = `${interviewIndex+1} / ${VISA_INTERVIEW_QUESTIONS.length}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderVisaCards();
  const select = document.getElementById("sponsorCountrySelect");
  if (select && typeof SPONSOR_DETAIL === "undefined") {
    select.innerHTML = Object.keys(SPONSOR_DETAIL).map(c=>`<option value="${c}">${c}</option>`).join("");
    select.addEventListener("change", renderSponsorCalc);
    const dateInput = document.getElementById("sponsorDate");
    if (dateInput) dateInput.addEventListener("change", renderSponsorCalc);
    renderSponsorCalc();
  }

  const runwaySelect = document.getElementById("runwayCountrySelect");
  if (runwaySelect && typeof WORK_VISA_RUNWAY !== "undefined") {
    runwaySelect.innerHTML = Object.keys(WORK_VISA_RUNWAY).map(c=>`<option value="${c}">${c}</option>`).join("");
    runwaySelect.addEventListener("change", renderRunway);
    renderRunway();
  }

  if (document.getElementById("interviewCard")) {
    renderInterviewCard();
    const prevBtn = document.getElementById("interviewPrevBtn");
    const nextBtn = document.getElementById("interviewNextBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => { if (interviewIndex>0){ interviewIndex--; renderInterviewCard(); } });
    if (nextBtn) nextBtn.addEventListener("click", () => {
      if (typeof VISA_INTERVIEW_QUESTIONS !== "undefined") {
        interviewIndex = (interviewIndex+1) % VISA_INTERVIEW_QUESTIONS.length;
        renderInterviewCard();
      }
    });
  }
});
