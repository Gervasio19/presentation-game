// ============================================================
// LAPSE — Knowledge Check Conceptual Milestones
// Placed at key milestones throughout Chapters 1-6
// ============================================================

export type KnowledgeCheck = {
  id: string;
  chapter: number;
  afterCardIndex: number; // 1-based card index after which this KC triggers
  milestoneTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const KNOWLEDGE_CHECKS: KnowledgeCheck[] = [
  // ── CHAPTER 1: The Calm Before the Storm ──────────────────────
  {
    id: "kc-1-1",
    chapter: 1,
    afterCardIndex: 2, // After Greenspan (Card 1) + Subprime (Card 2)
    milestoneTitle: "Milestone 1 — Credit & The Bubble",
    question: "Why did sustained low interest rates contribute to systemic financial fragility?",
    options: [
      "They directly increased commercial bank capital adequacy ratios",
      "They lowered borrowing costs, fueled speculative housing demand, and encouraged search-for-yield through high leverage",
      "They eliminated counterparty default risks in secondary mortgage markets",
      "They reduced investor demand for high-yielding structured credit products",
    ],
    correctIndex: 1, // B
    explanation:
      "Prolonged low policy rates suppressed yields on safe assets, creating a search-for-yield that incentivized financial institutions to expand leverage and channel credit into speculative real estate.",
  },
  {
    id: "kc-1-2",
    chapter: 1,
    afterCardIndex: 6, // End of Chapter 1
    milestoneTitle: "Milestone 2 — Mortgage Risk Dynamics",
    question: "How did deteriorating mortgage underwriting standards (e.g., ARMs, NINJA loans) heighten systemic vulnerability?",
    options: [
      "By stabilizing long-term household debt service burdens against economic shocks",
      "By eliminating refinancing frictions across the primary mortgage market",
      "By extending credit to borrowers whose solvency depended on continuous house price appreciation to refinance",
      "By guaranteeing fixed low interest payments regardless of macroeconomic fluctuations",
    ],
    correctIndex: 2, // C
    explanation:
      "Subprime borrowing structures relied on perpetual home price appreciation to enable refinancing before teaser rates reset. Once housing prices plateaued, default rates surged rapidly.",
  },

  // ── CHAPTER 2: House of Cards ─────────────────────────────────
  {
    id: "kc-2-1",
    chapter: 2,
    afterCardIndex: 2, // After MBS (Card 1) & CDO (Card 2)
    milestoneTitle: "Milestone 1 — Securitization Mechanics",
    question: "Why did the 'Originate-to-Distribute' model weaken risk management across the mortgage pipeline?",
    options: [
      "Originators were legally required to retain 100% of mortgage default risks on their balance sheets",
      "Securitization completely eliminated the underlying credit default risk of subprime borrowers",
      "Credit rating agencies conducted independent on-site audits of every single borrower application",
      "Originators earned upfront fees from loan volume while transferring downstream credit default risk to external investors",
    ],
    correctIndex: 3, // D
    explanation:
      "Decoupling loan origination from long-term credit risk created moral hazard: originators maximized fee income through loan volume rather than vetting borrower creditworthiness.",
  },
  {
    id: "kc-2-2",
    chapter: 2,
    afterCardIndex: 6, // End of Chapter 2 (LIBOR freeze)
    milestoneTitle: "Milestone 2 — The Housing Trigger",
    question: "How did declining home prices trigger a systemic chain reaction through structured securities (MBS & CDOs)?",
    options: [
      "Falling home equity prevented refinancing, causing mortgage defaults that eroded cash flows across securitized tranches",
      "It automatically increased the secondary market liquidity of senior AAA debt tranches",
      "It prompted credit rating agencies to upgrade subprime CDOs to sovereign debt status",
      "It converted risky non-prime mortgages directly into liquid short-term US Treasury bills",
    ],
    correctIndex: 0, // A
    explanation:
      "As housing prices dropped, borrower negative equity drove default rates up, eroding the cash flows supporting subprime tranches and revealing that supposedly safe AAA securities were vulnerable to catastrophic losses.",
  },

  // ── CHAPTER 3: The Collapse ───────────────────────────────────
  {
    id: "kc-3-1",
    chapter: 3,
    afterCardIndex: 2, // After Bear Stearns (Card 1) & Fannie/Freddie (Card 2)
    milestoneTitle: "Milestone 1 — Liquidity & The Interbank Freeze",
    question: "Why did the interbank lending market (LIBOR) freeze during the initial phase of the collapse?",
    options: [
      "Central banks mandated that interbank overnight interest rates remain strictly negative",
      "Asymmetric information and asset opacity made banks fear their counterparties held fatal toxic exposures",
      "Major financial institutions held excess capital reserves with zero counterparty credit risk",
      "The housing market had fully stabilized, eliminating the need for short-term wholesale funding",
    ],
    correctIndex: 1, // B
    explanation:
      "Because toxic mortgage exposures were buried in off-balance-sheet vehicles and complex derivatives, banks could not evaluate the solvency of their peers, leading to a breakdown of counterparty trust and cash hoarding.",
  },
  {
    id: "kc-3-2",
    chapter: 3,
    afterCardIndex: 4, // After Lehman (Card 3) & AIG (Card 4)
    milestoneTitle: "Milestone 2 — Systemic Interconnectedness",
    question: "Why did the failure of Lehman Brothers trigger an immediate worldwide liquidity seizure?",
    options: [
      "Lehman held all foreign exchange reserves of the US Department of the Treasury",
      "Lehman had zero repo funding or derivative counterparties across Wall Street",
      "Its bankruptcy shattered market confidence, froze commercial paper, and sparked runs on wholesale short-term funding",
      "It immediately generated an abundant surplus of credit for small and medium-sized enterprises",
    ],
    correctIndex: 2, // C
    explanation:
      "Lehman was a pivotal counterparty in wholesale repo and commercial paper markets. Its failure broke the $1 net asset value in the Reserve Primary Fund, sparking panic runs across the entire shadow banking architecture.",
  },

  // ── CHAPTER 4: Global Contagion ───────────────────────────────
  {
    id: "kc-4-1",
    chapter: 4,
    afterCardIndex: 3, // After European contagion, Iceland & Asian comparison
    milestoneTitle: "Milestone 1 — Cross-Border Contagion Channels",
    question: "Through which primary transmission channels did the US financial crisis spread globally?",
    options: [
      "Solely through international tourism expenditures and diplomatic ties",
      "Direct balance sheet asset exposures, frozen cross-border dollar funding, and contraction in international trade",
      "Exclusively through fluctuations in local emerging market agricultural commodities",
      "Sovereign wealth fund direct purchases of overseas commercial real estate",
    ],
    correctIndex: 1, // B
    explanation:
      "Contagion transmitted across borders via three main channels: European banks holding toxic US structured credit, international dollar funding freezes (requiring central bank swap lines), and sharp drops in global trade demand.",
  },

  // ── CHAPTER 5: The Human Cost ─────────────────────────────────
  {
    id: "kc-5-1",
    chapter: 5,
    afterCardIndex: 3, // After unemployment, foreclosures & credit paradox
    milestoneTitle: "Milestone 1 — The Real Economy Transmission",
    question: "How does a banking sector balance sheet impairment transmit distress into the real economy (employment and output)?",
    options: [
      "Banks immediately expand corporate lending to offset internal trading portfolio losses",
      "Falling equity prices automatically boost business capital expenditure and hiring",
      "Credit conditions have no measurable relationship with real business cash flows or employment",
      "Banks contract credit supply to rebuild capital buffers, starving firms of working capital and forcing retrenchment",
    ],
    correctIndex: 3, // D
    explanation:
      "Capital losses force banks to deleverage and tighten lending standards (the credit crunch). Solvent businesses cannot secure credit for operations and payroll, translating financial distress into layoffs and lower output.",
  },

  // ── CHAPTER 6: Reform & Recovery ──────────────────────────────
  {
    id: "kc-6-1",
    chapter: 6,
    afterCardIndex: 2, // After TARP (Card 1) & QE (Card 2)
    milestoneTitle: "Milestone 1 — State & Central Bank Intervention",
    question: "Why are central banks and governments compelled to act as 'lenders and spenders of last resort' during a systemic panic?",
    options: [
      "To arrest self-fulfilling liquidity runs, restore market confidence, and prevent debt-deflation spirals",
      "To permanently eliminate private commercial banks in favor of state monopolies",
      "To intentionally drive mortgage foreclosure rates higher to clear markets faster",
      "To guarantee that real estate asset price inflation permanently outpaces productivity growth",
    ],
    correctIndex: 0, // A
    explanation:
      "During a systemic crisis, private markets suffer coordination failure and liquidity hoarding. Public balance sheets must provide liquidity and capital backstops (TARP, QE, discount window) to avoid a 1930s-style depression.",
  },
  {
    id: "kc-6-2",
    chapter: 6,
    afterCardIndex: 6, // End of Chapter 6 (Final Milestone)
    milestoneTitle: "Milestone 2 — Long-Term Financial Resilience",
    question: "What is the core macroprudential objective of Basel III and post-crisis regulatory frameworks?",
    options: [
      "Permitting unrestricted leverage ratios for non-bank financial intermediaries",
      "Eliminating all counterparty disclosure requirements across OTC derivatives markets",
      "Enforcing countercyclical capital buffers and robust liquidity ratios (LCR, NSFR) to absorb systemic shocks",
      "Prohibiting commercial banks from maintaining liquid sovereign debt reserves",
    ],
    correctIndex: 2, // C
    explanation:
      "Basel III shifted regulation from purely microprudential bank-level solvency to macroprudential systemic resilience, requiring higher-quality common equity, conservation buffers, and explicit liquidity buffers (LCR and NSFR).",
  },
];

export function getKnowledgeCheckForCard(
  chapter: number,
  cardIndex: number
): KnowledgeCheck | undefined {
  return KNOWLEDGE_CHECKS.find(
    (kc) => kc.chapter === chapter && kc.afterCardIndex === cardIndex
  );
}
