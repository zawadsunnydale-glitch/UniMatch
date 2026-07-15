let interviewIndex = 0;

function renderVisaCards(){
  const grid = document.getElementById("visaGrid");
  if (!grid || typeof VISA_DESTINATIONS === "undefined") return;
  
  // Basic structures if you have them, otherwise fallback
  if(typeof UNIVERSITIES !== "undefined" && grid.children.length === 0) {
    const countries = [...new Set(UNIVERSITIES.map(u => u.country))];
    grid.innerHTML = countries.map(c => `
      <div class="visa-card card-hi">
        <h3>${c} Student Visa</h3>
        <p>Verified processing parameters for global admission intake rounds.</p>
      </div>
    `).join("");
  }
}

function renderSponsorCalc(){
  const select = document.getElementById("sponsorCountrySelect");
  const result = document.getElementById("sponsorResult");
  const SPONSOR_DATA = typeof SPONSOR_DETAIL !== 'undefined' ? SPONSOR_DETAIL : {
    USA: { amountLabel: "$25,000+", seasoningMonths: 2, note: "2 months of stability looks strongest." },
    UK: { amountLabel: "£12,000–£16,650+", seasoningMonths: 1, note: "Held for a consecutive 28-day period." },
    Canada: { amountLabel: "CA$20,635+", seasoningMonths: 4, note: "GIC funds take 2-4 weeks to clear." },
    Germany: { amountLabel: "€11,904", seasoningMonths: 3, note: "Blocked account must be funded before appointment." },
    Australia: { amountLabel: "AU$29,710+", seasoningMonths: 3, note: "Sudden large cash deposits spark scrutiny." }
  };

  if (!select || !result) return;

  if (select.children.length === 0) {
    select.innerHTML = Object.keys(SPONSOR_DATA).map(c => `<option value="${c}">${c}</option>`).join("");
  }

  const details = SPONSOR_DATA[select.value];
  if (!details) return;

  result.innerHTML = `
    <h3 style="margin-top:0;">Sponsor Requirement Summary</h3>
    <p style="font-size:1.75rem; font-weight:700; color:var(--orange); margin:10px 0;">${details.amountLabel}</p>
    <p><strong>Minimum Account Seasoning:</strong> ${details.seasoningMonths} Months</p>
    <p style="font-size: 0.88rem; color: var(--cream-dim); margin-top: 10px; line-height:1.5;">${details.note}</p>
  `;
}

function renderRunway(){
  const select = document.getElementById("runwayCountrySelect");
  const result = document.getElementById("runwayResult");
  const RUNWAY_DATA = typeof WORK_VISA_RUNWAY !== 'undefined' ? WORK_VISA_RUNWAY : {
    USA: "24-Month STEM OPT Extension available for technical graduates, plus 12 months standard OPT.",
    UK: "Graduate Route Visa allows up to 2 years of work status post-completion without sponsorship.",
    Canada: "Post-Graduation Work Permit (PGWP) matches your degree duration up to a maximum of 3 years.",
    Germany: "18-Month Job Seeking visa granted automatically to absolute degree holders from local universities.",
    Australia: "Temporary Graduate Visa (Subclass 485) grants 2 to 4 years based on stream and target regional codes."
  };

  if (!select || !result) return;

  if (select.children.length === 0) {
    select.innerHTML = Object.keys(RUNWAY_DATA).map(c => `<option value="${c}">${c}</option>`).join("");
  }

  const text = RUNWAY_DATA[select.value];
  result.innerHTML = `<p style="font-size: 1.05rem; line-height: 1.6; margin:0; color:var(--cream);">${text}</p>`;
}

function renderInterviewCard(){
  const box = document.getElementById("interviewCard");
  const counter = document.getElementById("interviewCounter");
  const QUESTIONS = typeof VISA_INTERVIEW_QUESTIONS !== 'undefined' ? VISA_INTERVIEW_QUESTIONS : [
    { q: "Why did you choose this specific university?", intent: "Checks if you read the curriculum syllabus or just bought an offer letter.", flag: "Avoid answering: 'Because it's highly ranked and beautiful'." },
    { q: "Who is sponsoring your education and what do they do?", intent: "Validates legitimate financial capability to sustain tuition obligations.", flag: "Flagged if sponsor income doesn't mathematically align with regular wire transfers." },
    { q: "What are your plans after graduation?", intent: "Assesses strong non-immigrant intent to return to Bangladesh.", flag: "Saying 'I want to live, look for jobs, and settle down there permanent' is an instant refusal." }
  ];

  if (!box) return;

  const q = QUESTIONS[interviewIndex];
  box.innerHTML = `
    <div style="min-height:160px;">
      <span class="eyebrow" style="color:var(--orange);">Question Framework</span>
      <h3 style="margin:10px 0; font-size:1.35rem; line-height:1.4;">"${q.q}"</h3>
      <p style="margin-top: 14px; font-weight: 500; color: var(--tan);"><strong>Intent:</strong> ${q.intent}</p>
      <p style="font-size: .92rem; color: var(--cream-dim); line-height: 1.5; margin-top: 8px;">💡 ${q.flag}</p>
    </div>
  `;

  if (counter) counter.textContent = `${interviewIndex + 1} / ${QUESTIONS.length}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderVisaCards();
  
  const sponsorSelect = document.getElementById("sponsorCountrySelect");
  if (sponsorSelect) {
    sponsorSelect.addEventListener("change", renderSponsorCalc);
    renderSponsorCalc();
  }

  const runwaySelect = document.getElementById("runwayCountrySelect");
  if (runwaySelect) {
    runwaySelect.addEventListener("change", renderRunway);
    renderRunway();
  }

  if (document.getElementById("interviewCard")) {
    renderInterviewCard();
    const prevBtn = document.getElementById("interviewPrevBtn");
    const nextBtn = document.getElementById("interviewNextBtn");
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (interviewIndex > 0) { interviewIndex--; renderInterviewCard(); }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const QUESTIONS_LEN = typeof VISA_INTERVIEW_QUESTIONS !== 'undefined' ? VISA_INTERVIEW_QUESTIONS.length : 3;
        interviewIndex = (interviewIndex + 1) % QUESTIONS_LEN;
        renderInterviewCard();
      });
    }
  }
});
