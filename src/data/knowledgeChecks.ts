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
    question: "Why did low interest rates contribute to the housing bubble?",
    options: [
      "They made borrowing cheaper and encouraged housing demand",
      "They reduced the supply of houses",
      "They prevented banks from lending",
      "They increased mortgage repayment costs",
    ],
    correctIndex: 0,
    explanation:
      "Low interest rates lowered the cost of borrowing, fueling massive mortgage demand and speculative buying that drove house prices far beyond fundamental income levels.",
  },
  {
    id: "kc-1-2",
    chapter: 1,
    afterCardIndex: 6, // End of Chapter 1
    milestoneTitle: "Milestone 2 — Mortgage Risk Dynamics",
    question: "What made the growing mortgage market increasingly risky?",
    options: [
      "Lending expanded to increasingly risky borrowers",
      "Borrowing became more expensive",
      "Banks stopped issuing mortgages",
      "House prices became fixed",
    ],
    correctIndex: 0,
    explanation:
      "Lending standards deteriorated through ARMs and NINJA loans, expanding credit to subprime borrowers who were vulnerable to default as soon as teaser rates expired.",
  },

  // ── CHAPTER 2: House of Cards ─────────────────────────────────
  {
    id: "kc-2-1",
    chapter: 2,
    afterCardIndex: 2, // After MBS (Card 1) & CDO (Card 2)
    milestoneTitle: "Milestone 1 — Securitization Mechanics",
    question: "What happened to mortgage risk after securitization?",
    options: [
      "It was transferred and redistributed across financial institutions and investors",
      "It disappeared completely",
      "It was guaranteed 100% by borrowers",
      "It became unrelated to housing prices",
    ],
    correctIndex: 0,
    explanation:
      "Securitization packaged and redistributed mortgage risk worldwide via MBS and CDOs, obscuring where toxic debts were hidden rather than eliminating the risk.",
  },
  {
    id: "kc-2-2",
    chapter: 2,
    afterCardIndex: 6, // End of Chapter 2 (LIBOR freeze)
    milestoneTitle: "Milestone 2 — The Housing Trigger",
    question: "Why did falling house prices create problems for borrowers with ARM mortgages?",
    options: [
      "Refinancing became more difficult while payments could increase",
      "Mortgage rates automatically dropped to zero",
      "Borrowers received higher house values from banks",
      "Banks stopped collecting monthly payments",
    ],
    correctIndex: 0,
    explanation:
      "When housing prices plateaued and fell, homeowners with negative equity could no longer refinance, triggering widespread defaults when their adjustable rates reset.",
  },

  // ── CHAPTER 3: The Collapse ───────────────────────────────────
  {
    id: "kc-3-1",
    chapter: 3,
    afterCardIndex: 2, // After Bear Stearns (Card 1) & Fannie/Freddie (Card 2)
    milestoneTitle: "Milestone 1 — Liquidity & The Interbank Freeze",
    question: "Why did banks become reluctant to lend to one another?",
    options: [
      "They were uncertain about the losses and risks held by other institutions",
      "They expected interest rates to disappear",
      "They had too much surplus cash in vaults",
      "The housing market had fully recovered",
    ],
    correctIndex: 0,
    explanation:
      "A total breakdown of counterparty trust occurred: because banks did not know which peers held toxic mortgage assets, interbank lending (LIBOR) froze completely.",
  },
  {
    id: "kc-3-2",
    chapter: 3,
    afterCardIndex: 4, // After Lehman (Card 3) & AIG (Card 4)
    milestoneTitle: "Milestone 2 — Systemic Interconnectedness",
    question: "Why could the failure of a major financial institution threaten the entire financial system?",
    options: [
      "Financial institutions were highly interconnected",
      "Large firms cannot legally go bankrupt",
      "Lehman controlled the Federal Reserve",
      "Bankruptcy automatically increases house prices",
    ],
    correctIndex: 0,
    explanation:
      "Major investment banks were tightly interconnected nodes in the global financial web through repo loans, CDS contracts, and derivatives; one node's collapse cascaded across the entire system.",
  },

  // ── CHAPTER 4: Global Contagion ───────────────────────────────
  {
    id: "kc-4-1",
    chapter: 4,
    afterCardIndex: 3, // After European contagion, Iceland & Asian comparison
    milestoneTitle: "Milestone 1 — Cross-Border Contagion Channels",
    question: "How can a financial crisis spread from one country to another?",
    options: [
      "Through financial exposure, funding markets and international trade",
      "Only through international tourism",
      "Exclusively through exchange rate fluctuations",
      "It cannot spread internationally",
    ],
    correctIndex: 0,
    explanation:
      "Cross-border contagion transmits through three primary channels: foreign asset exposures on bank balance sheets, global interbank funding freezes, and collapsing trade demand.",
  },

  // ── CHAPTER 5: The Human Cost ─────────────────────────────────
  {
    id: "kc-5-1",
    chapter: 5,
    afterCardIndex: 3, // After unemployment, foreclosures & credit paradox
    milestoneTitle: "Milestone 1 — The Real Economy Transmission",
    question: "How can a banking crisis affect employment?",
    options: [
      "Credit contraction can reduce business investment and hiring",
      "Banks directly create jobs for every household",
      "Unemployment always falls during a crisis",
      "Credit conditions have no effect on firms",
    ],
    correctIndex: 0,
    explanation:
      "When the banking sector contracts credit, businesses cannot obtain working capital for payroll and investment, translating financial distress directly into mass layoffs in the real economy.",
  },

  // ── CHAPTER 6: Reform & Recovery ──────────────────────────────
  {
    id: "kc-6-1",
    chapter: 6,
    afterCardIndex: 2, // After TARP (Card 1) & QE (Card 2)
    milestoneTitle: "Milestone 1 — State & Central Bank Intervention",
    question: "Why did governments and central banks intervene during the crisis?",
    options: [
      "To stabilize financial markets and prevent a deeper economic collapse",
      "To eliminate all private commercial banks",
      "To encourage higher mortgage default rates",
      "To make housing prices permanently rise forever",
    ],
    correctIndex: 0,
    explanation:
      "Governments and central banks acted as lenders and spenders of last resort to fix systemic market failure, inject liquidity, and prevent a prolonged 1930s-style Great Depression.",
  },
  {
    id: "kc-6-2",
    chapter: 6,
    afterCardIndex: 6, // End of Chapter 6 (Final Milestone)
    milestoneTitle: "Milestone 2 — Long-Term Financial Resilience",
    question: "Which approach can make the financial system more resilient to future crises?",
    options: [
      "Higher capital and liquidity requirements",
      "Unlimited leverage ratios",
      "Weaker risk management models",
      "Less disclosure and transparency",
    ],
    correctIndex: 0,
    explanation:
      "Regulatory frameworks like Basel III (LCR, NSFR) and Dodd-Frank enforce higher tier-1 capital buffers, robust liquidity reserves, and strict oversight to absorb future financial shocks.",
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
