/* ─────────────────────────────────────────────────────────
   NPRo | Dr. Lupita Roy-Rasheed
   script.js — All interactive logic for the microsite

   Sections:
   1. Navigation Controller
   2. 501(c)(3) Decision Tree — Data
   3. 501(c)(3) Decision Tree — Engine
   4. Capacity Pillars Builder
   5. Contact Form Handler
   ───────────────────────────────────────────────────────── */


/* ══════════════════════════════════════════════════════════
   1. NAVIGATION CONTROLLER
   Controls which page is visible and keeps the nav pill
   in sync with the active page.
══════════════════════════════════════════════════════════ */

function showPage(id, btn) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Deactivate all nav buttons
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  // Show the target page
  document.getElementById(id).classList.add('active');
  // Mark the clicked nav button as active (if passed in)
  if (btn) btn.classList.add('active');
  // Scroll to top on page change
  window.scrollTo(0, 0);
}


/* ══════════════════════════════════════════════════════════
   2. 501(c)(3) DECISION TREE — DATA

   Decision flow map:
   Step 1 → Has 501c3?
            yes → Step 100 (already established)
            no  → Step 2
   Step 2 → Church / religious org?
            yes → RESULT: church-exempt
            no  → Step 3
   Step 3 → Public charity or private foundation?
            charity   → Step 4
            foundation → RESULT: private-foundation
   Step 4 → Formally incorporated?
            yes → Step 5
            no  → RESULT: need-incorporate
   Step 5 → Receipts < $50k AND assets < $250k?
            yes → Step 6 (EZ path check)
            no  → RESULT: 1023-full
   Step 6 → Meets all 1023-EZ exclusions?
            yes → RESULT: 1023-ez
            no  → RESULT: 1023-full
   Step 100 → RESULT: established
══════════════════════════════════════════════════════════ */

const STEPS = {
  1: {
    step: 'Question 1 of 6',
    text: 'Does your organization currently hold 501(c)(3) tax-exempt status from the IRS?',
    sub: 'This is the federal tax exemption for charitable, religious, and educational organizations.',
    choices: [
      { label: 'Yes, we do', val: 'yes' },
      { label: 'No, not yet', val: 'no', cls: 'secondary' },
    ],
    next: { yes: 100, no: 2 },
    progress: 14,
  },
  2: {
    step: 'Question 2 of 6',
    text: 'Is your organization a church, integrated auxiliary, or convention of churches?',
    sub: 'Certain religious organizations are automatically exempt and do not need to apply.',
    choices: [
      { label: 'Yes', val: 'yes' },
      { label: 'No', val: 'no', cls: 'secondary' },
    ],
    next: { yes: 'church-exempt', no: 3 },
    progress: 28,
  },
  3: {
    step: 'Question 3 of 6',
    text: 'Will your organization operate as a public charity or a private foundation?',
    sub: 'Public charities receive broad public support. Private foundations are typically funded by a single source (family, corporation, etc.).',
    choices: [
      { label: 'Public Charity', val: 'yes' },
      { label: 'Private Foundation', val: 'no' },
    ],
    next: { yes: 4, no: 'private-foundation' },
    progress: 42,
  },
  4: {
    step: 'Question 4 of 6',
    text: 'Has your organization been formally incorporated or established as a legal entity in your state?',
    sub: 'You must be a legal entity (incorporated nonprofit, trust, or unincorporated association) before applying for 501(c)(3).',
    choices: [
      { label: 'Yes', val: 'yes' },
      { label: 'No, not yet', val: 'no', cls: 'secondary' },
    ],
    next: { yes: 5, no: 'need-incorporate' },
    progress: 56,
  },
  5: {
    step: 'Question 5 of 6',
    text: 'Are your projected annual gross receipts under $50,000 AND total assets under $250,000?',
    sub: 'This determines eligibility for the shorter, streamlined Form 1023-EZ vs. the full Form 1023.',
    choices: [
      { label: 'Yes (Small org)', val: 'yes' },
      { label: 'No (Larger org)', val: 'no', cls: 'secondary' },
    ],
    next: { yes: 6, no: '1023-full' },
    progress: 70,
  },
  6: {
    step: 'Question 6 of 6',
    text: 'Does your organization meet ALL of these conditions?',
    sub: '• Not a successor to a for-profit entity\n• Not organized or operated outside the US\n• Not a Type III supporting organization\n• Not a Limited Liability Company (LLC)',
    choices: [
      { label: 'Yes, all apply', val: 'yes' },
      { label: 'No / Unsure', val: 'no', cls: 'secondary' },
    ],
    next: { yes: '1023-ez', no: '1023-full' },
    progress: 85,
  },
};

const RESULTS = {
  // Already has 501(c)(3)
  100: {
    cls: 'established',
    icon: '✓',
    tag: 'Status: Established',
    title: "You're Already 501(c)(3) Exempt",
    body: `<p>Your organization has its tax-exempt status. The next step is ensuring you're maintaining compliance and maximizing your impact.</p>
           <ul>
             <li>File your Form 990 annually (990-N, 990-EZ, or 990)</li>
             <li>Maintain proper board governance records</li>
             <li>Consider a capacity audit to identify growth gaps</li>
           </ul>`,
    cta: 'Explore Capacity Assessment',
    ctaPage: 'assessment',
    progress: 100,
  },

  // Church / religious org — auto-exempt
  'church-exempt': {
    cls: 'established',
    icon: '⛪',
    tag: 'Status: Auto-Exempt',
    title: 'Your Organization May Be Automatically Exempt',
    body: `<p>Churches and integrated auxiliaries are generally automatically recognized as 501(c)(3) organizations and are not required to apply. However, many choose to apply to receive an official IRS determination letter, which can be useful for donors and grants.</p>
           <ul>
             <li>Filing is optional but often beneficial</li>
             <li>Consult Dr. Roy-Rasheed to determine if filing makes sense for your org</li>
           </ul>`,
    cta: 'Connect with NPRo',
    ctaPage: 'contact',
    progress: 100,
  },

  // Private foundation — always needs full 1023
  'private-foundation': {
    cls: 'long',
    icon: '🏛',
    tag: 'Path: Private Foundation',
    title: 'File Form 1023 — Full Version',
    body: `<p>Private foundations must file the full <strong>Form 1023</strong>. There is no streamlined option for private foundations.</p>
           <ul>
             <li>Application fee: $600</li>
             <li>Processing time: 3–6 months</li>
             <li>Additional reporting requirements apply to private foundations (excise taxes, distribution requirements)</li>
             <li>Consider whether a donor-advised fund or public charity structure may better serve your goals</li>
           </ul>`,
    cta: 'Get Help Filing — Contact NPRo',
    ctaPage: 'contact',
    progress: 100,
  },

  // Not yet incorporated — must form entity first
  'need-incorporate': {
    cls: 'no-need',
    icon: '📋',
    tag: 'Action Needed: Incorporate First',
    title: 'You Must Incorporate Before Applying',
    body: `<p>Before filing for 501(c)(3) status, your organization must be legally formed as a nonprofit corporation, trust, or unincorporated association in your state.</p>
           <ul>
             <li>File Articles of Incorporation with your state's Secretary of State</li>
             <li>Draft bylaws and conduct your first board meeting</li>
             <li>Obtain an EIN (Employer Identification Number) from the IRS</li>
             <li>Then return to apply for 501(c)(3)</li>
           </ul>
           <p style="margin-top:12px">NPRo can walk you through every step of this process.</p>`,
    cta: 'Get Guidance from NPRo',
    ctaPage: 'contact',
    progress: 100,
  },

  // Qualifies for the short form
  '1023-ez': {
    cls: 'short',
    icon: '⚡',
    tag: 'Recommended Form: 1023-EZ',
    title: 'Form 1023-EZ — Streamlined Application',
    body: `<p>Good news — your organization qualifies for the <strong>short-form 1023-EZ</strong>, the streamlined path to 501(c)(3) status.</p>
           <ul>
             <li>Filed entirely online at Pay.gov</li>
             <li>Application fee: $275</li>
             <li>Average approval time: 1–3 months</li>
             <li>Requires a brief eligibility attestation (no narrative required)</li>
           </ul>
           <p style="margin-top:12px">NPRo recommends having a consultant review your eligibility before submitting.</p>`,
    cta: 'Connect with Dr. Roy-Rasheed',
    ctaPage: 'contact',
    progress: 100,
  },

  // Requires the full long form
  '1023-full': {
    cls: 'long',
    icon: '📄',
    tag: 'Recommended Form: Full 1023',
    title: 'Form 1023 — Standard Application',
    body: `<p>Your organization should file the <strong>full Form 1023</strong>, the standard IRS application for 501(c)(3) status.</p>
           <ul>
             <li>Requires detailed narrative descriptions of activities</li>
             <li>Application fee: $600</li>
             <li>Processing time: 3–6 months (sometimes longer)</li>
             <li>Includes financial data, governance policies, and program descriptions</li>
           </ul>
           <p style="margin-top:12px">This process benefits significantly from professional guidance. NPRo has helped dozens of organizations navigate it successfully.</p>`,
    cta: 'Get Filing Support from NPRo',
    ctaPage: 'contact',
    progress: 100,
  },
};


/* ══════════════════════════════════════════════════════════
   3. 501(c)(3) DECISION TREE — ENGINE
   Handles step traversal, rendering, animation, and reset.
══════════════════════════════════════════════════════════ */

let currentStepId = 1;

/**
 * Called when the user clicks Yes or No.
 * Looks up the next step or result from STEPS data.
 */
function decide(choice) {
  const step = STEPS[currentStepId];
  if (!step) return;
  const next = step.next[choice];
  // If next is a number, it's another step; otherwise it's a result key
  if (typeof next === 'number') {
    currentStepId = next;
    renderStep(STEPS[next]);
  } else {
    renderResult(RESULTS[next]);
  }
}

/**
 * Renders a question step into the card UI.
 */
function renderStep(step) {
  document.getElementById('q-step').textContent = step.step;
  document.getElementById('q-text').textContent = step.text;

  const sub = document.getElementById('q-sub');
  sub.style.whiteSpace = 'pre-line'; // Supports bullet-style sub text via \n
  sub.textContent = step.sub;

  // Rebuild choice buttons dynamically
  const choices = document.getElementById('q-choices');
  choices.innerHTML = '';
  step.choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'q-btn' + (c.cls ? ' ' + c.cls : '');
    btn.textContent = c.label;
    btn.onclick = () => decide(c.val);
    choices.appendChild(btn);
  });

  // Update progress bar
  document.getElementById('progress-fill').style.width = step.progress + '%';
  document.getElementById('progress-label').textContent = step.step;

  // Hide reset button during active questions
  document.getElementById('tool-reset').style.display = 'none';

  animateCard();
}

/**
 * Renders a final result card, replacing the question UI.
 */
function renderResult(result) {
  const card = document.getElementById('q-card');
  card.className = 'q-card';

  // Map ctaPage to its nav button index for showPage() call
  const navIndex = result.ctaPage === 'contact' ? 3
                 : result.ctaPage === 'assessment' ? 2
                 : 0;

  card.innerHTML = `
    <div class="result-card ${result.cls}">
      <div class="result-icon">${result.icon}</div>
      <div class="result-tag">${result.tag}</div>
      <div class="result-title">${result.title}</div>
      <div class="result-body">${result.body}</div>
      <button class="result-cta"
        onclick="showPage('${result.ctaPage}', document.querySelectorAll('.nav-btn')[${navIndex}])">
        ${result.cta}
      </button>
    </div>`;

  // Complete the progress bar
  document.getElementById('progress-fill').style.width = '100%';
  document.getElementById('progress-label').textContent = 'Complete';

  // Show the reset button now that we've reached a result
  document.getElementById('tool-reset').style.display = 'flex';

  animateCard();
}

/**
 * Smooth fade + slide animation on card content transitions.
 * Uses double rAF to allow the browser to register the initial state.
 */
function animateCard() {
  const card = document.getElementById('q-card');
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.style.transition = 'opacity .4s ease, transform .4s ease';
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  });
}

/**
 * Resets the tool back to question 1.
 */
function resetTool() {
  currentStepId = 1;
  const card = document.getElementById('q-card');
  card.className = 'q-card';
  card.innerHTML = `
    <div class="q-step" id="q-step">Question 1 of 6</div>
    <div class="q-text" id="q-text">Does your organization currently hold 501(c)(3) tax-exempt status from the IRS?</div>
    <div class="q-sub" id="q-sub">This is the federal tax exemption for charitable, religious, and educational organizations.</div>
    <div class="q-choices" id="q-choices">
      <button class="q-btn" onclick="decide('yes')">Yes, we do</button>
      <button class="q-btn secondary" onclick="decide('no')">No, not yet</button>
    </div>`;
  document.getElementById('progress-fill').style.width = '14%';
  document.getElementById('progress-label').textContent = 'Step 1 of 6';
  document.getElementById('tool-reset').style.display = 'none';
  animateCard();
}


/* ══════════════════════════════════════════════════════════
   4. CAPACITY PILLARS BUILDER
   Dynamically renders the six accordion pillar cards
   on the Capacity Assessment page.
══════════════════════════════════════════════════════════ */

const PILLARS = [
  {
    num: '01', icon: '🏛', title: 'Board Governance',
    summary: 'Strengthen the leadership team that steers your mission.',
    gap: 'Disengaged or "rubber stamp" boards that fail to provide strategic oversight.',
    fix: 'Board policy restructuring, role clarity workshops, and targeted recruitment strategy for high-impact members.',
  },
  {
    num: '02', icon: '🗺', title: 'Strategic Planning',
    summary: "Define where you're going and build a roadmap to get there.",
    gap: 'Absence of a 3–5 year impact roadmap, leading to reactive decision-making.',
    fix: 'Facilitated visioning sessions, KPI development, and annual strategic review cycles.',
  },
  {
    num: '03', icon: '💵', title: 'Financial Health',
    summary: 'Build a sustainable, diversified funding engine.',
    gap: 'Over-reliance on a single grant source or donor, creating critical vulnerability.',
    fix: 'Diversified funding models, donor retention systems, and reserve fund strategies.',
  },
  {
    num: '04', icon: '📢', title: 'Program Effectiveness',
    summary: 'Ensure your programs deliver and demonstrate measurable impact.',
    gap: 'Programs designed around funding availability rather than community need.',
    fix: 'Logic model development, outcome measurement frameworks, and impact reporting.',
  },
  {
    num: '05', icon: '👥', title: 'Human Capital',
    summary: 'Recruit, retain, and develop the talent that powers your mission.',
    gap: 'High staff turnover due to unclear roles, burnout, and lack of professional pathways.',
    fix: 'HR policy review, onboarding redesign, compensation benchmarking, and staff development planning.',
  },
  {
    num: '06', icon: '📡', title: 'Community Presence',
    summary: 'Build visibility and trust with the people you serve.',
    gap: 'Low brand awareness in the community and among potential funders.',
    fix: 'Communications strategy, stakeholder engagement plan, and digital presence audit.',
  },
];

/**
 * Injects all pillar cards into the #cap-grid container.
 * Each card is clickable and toggles an 'open' class
 * that CSS uses to expand/collapse the detail panel.
 */
function buildPillars() {
  const grid = document.getElementById('cap-grid');
  PILLARS.forEach(p => {
    grid.innerHTML += `
      <div class="pillar" onclick="this.classList.toggle('open')">
        <div class="pillar-header">
          <span class="pillar-num">${p.num}</span>
          <div class="pillar-icon">${p.icon}</div>
        </div>
        <div class="pillar-title">${p.title}</div>
        <div class="pillar-body">${p.summary}</div>
        <div class="pillar-expand">
          <div class="pillar-detail">
            <p><strong>Common Gap:</strong> ${p.gap}</p>
            <p style="margin-top:10px"><strong>NPRo Solution:</strong> ${p.fix}</p>
          </div>
        </div>
        <svg class="pillar-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>`;
  });
}

// Run on load
buildPillars();


/* ══════════════════════════════════════════════════════════
   5. CONTACT FORM HANDLER
══════════════════════════════════════════════════════════ */

/**
 * Toggles the 'selected' highlight on service interest chips.
 * Called directly via onclick in the HTML.
 */
function toggleService(el) {
  el.classList.toggle('selected');
}

/**
 * Validates the inquiry form and shows a success state.
 * Org name and email are required; everything else is optional.
 */
function handleSubmit() {
  const org   = document.getElementById('f-org').value.trim();
  const email = document.getElementById('f-email').value.trim();

  if (!org || !email) {
    alert('Please fill in your organization name and email.');
    return;
  }

  // Hide the form and reveal the success confirmation
  document.getElementById('contact-form-wrap').style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
}