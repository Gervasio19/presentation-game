export type ChapterInfo = {
  chapter: number;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  knowledgeSummary: string[];
  keyConnection: string;
  flowDiagram?: string[];
};

export const chapters: ChapterInfo[] = [
  {
    chapter: 0,
    title: "Prologue: Induction",
    subtitle: "Orientation & Mechanics",
    period: "Briefing",
    description: "Learn how to balance the 4 economic pillars and navigate crisis dilemmas.",
    knowledgeSummary: [
      "Balance 4 Pillars: 💰 Economy, 👥 Public Trust, 🏛️ Policy Power, and 🏦 Banking Health.",
      "The 0% & 100% Rule: Extremes in either direction will collapse your government.",
      "Trade-offs: Every decision impacts multiple pillars with opposing forces.",
      "Survive all 6 chapters to enter the Top 3 Class Leaderboard!"
    ],
    keyConnection: "Balance 4 Pillars → Master Trade-offs → Survive 6 Crisis Chapters"
  },
  {
    chapter: 1,
    title: "The Calm Before the Storm",
    subtitle: "The Housing Bubble Forms",
    period: "2004-2006",
    description: "Experience the pre-crisis equilibrium where low interest rates and loose monetary policy created an unprecedented housing boom. You'll navigate the rise of risky lending practices and early warning signs.",
    knowledgeSummary: [
      "Financial System Basics: The financial system channels capital and distributes risk.",
      "Cheap Credit: Low interest rates encouraged borrowing and stimulated massive housing demand.",
      "Housing Bubble: Housing prices became increasingly disconnected from economic fundamentals.",
      "Subprime Lending: Risky mortgage products (ARMs, NINJA) expanded credit access while surging default risks."
    ],
    keyConnection: "Cheap credit → Risky lending → Housing bubble → Rising systemic risk"
  },
  {
    chapter: 2,
    title: "House of Cards",
    subtitle: "Securitization and Shadows",
    period: "2006-2007",
    description: "Dive into the complex financial engineering that hid massive risks. Navigate the originate-to-distribute model and watch the first cracks appear as housing prices plateau.",
    knowledgeSummary: [
      "Risk Transformation: Mortgages were pooled into MBS and restructured into complex CDOs.",
      "Originate-to-Distribute: Transferring loans reduced originators' direct credit exposure, weakening incentives to maintain rigorous underwriting standards.",
      "Hidden Interconnectedness: Risk was redistributed throughout the global financial system rather than eliminated.",
      "The Trigger: Falling housing prices and expiring ARM teaser rates exposed deep structural weaknesses."
    ],
    keyConnection: "Mortgages → MBS → CDO → Hidden & redistributed risk → Financial fragility"
  },
  {
    chapter: 3,
    title: "The Collapse",
    subtitle: "From Contagion to Panic",
    period: "2008",
    description: "The crisis reaches its breaking point from March to October 2008. Major financial institutions face bankruptcy, credit markets freeze completely, and global panic sets in as the dominos fall.",
    knowledgeSummary: [
      "Liquidity Crisis: Interbank lending froze as institutions feared exposure to toxic counterparties.",
      "Loss of Confidence: Bear Stearns and Lehman Brothers collapsed as wholesale funding evaporated.",
      "Systemic Risk: AIG's CDS exposure threatened to drag down banks worldwide in a cascading domino effect.",
      "Government Intervention: Historic emergency measures were deployed to prevent total systemic seizure."
    ],
    keyConnection: "Asset losses → Loss of confidence → Liquidity freeze → Systemic crisis"
  },
  {
    chapter: 4,
    title: "Global Contagion",
    subtitle: "The World Catches a Cold",
    period: "2008-2009",
    description: "Witness how interconnected the modern financial system truly is. The crisis spreads to Europe, devastates emerging markets, and draws comparisons to past regional crises.",
    knowledgeSummary: [
      "Financial Contagion: Problems in the US spread through interconnected cross-border banking networks.",
      "Global Trade Channel: Plummeting demand in the US and EU crushed export-driven economies like Vietnam.",
      "Flight to Safety: Global capital fled emerging markets toward perceived safe-haven US dollar assets.",
      "Domestic Slowdown: Vietnam's GDP growth fell from 8.5% to 5.3% as over 1 million workers faced layoffs."
    ],
    keyConnection: "Financial interconnectedness → International contagion → Global recession"
  },
  {
    chapter: 5,
    title: "The Human Cost",
    subtitle: "Main Street Bleeds",
    period: "2009-2010",
    description: "The financial crisis becomes a harsh economic reality for everyday people. Manage skyrocketing unemployment, a foreclosure epidemic, and the struggles of small businesses.",
    knowledgeSummary: [
      "Labor Market Shock: US unemployment hit a peak of 10.0%, with nearly 8.7 million jobs destroyed.",
      "Foreclosure Epidemic: Over 14 million households faced eviction as negative equity trapped homeowners.",
      "The Credit Paradox: Despite 0% policy rates, banks hoarded cash and refused to lend to Main Street.",
      "Wealth Destruction: Millions of families saw their 401(k) retirement savings lose up to 57%."
    ],
    keyConnection: "Credit contraction → Business difficulties → Unemployment → Lower living standards",
    flowDiagram: [
      "Financial crisis",
      "Credit ↓",
      "Business investment ↓",
      "Employment ↓",
      "Household income ↓",
      "Consumption ↓"
    ]
  },
  {
    chapter: 6,
    title: "Reform & Recovery",
    subtitle: "Rebuilding the System",
    period: "2010-2012",
    description: "Shape the future of global finance. Implement massive bailout programs, navigate unprecedented monetary policy, and draft regulations to prevent the next crisis.",
    knowledgeSummary: [
      "Crisis Response: Governments and central banks used TARP ($700B) and QE to stabilize liquidity.",
      "Regulatory Overhaul: Dodd-Frank Act introduced the Volcker Rule to ban proprietary trading by banks.",
      "Basel III Framework: Implemented higher Tier-1 capital requirements and liquidity ratios (LCR, NSFR).",
      "Consumer Protection: Established the CFPB to supervise financial institutions and curb deceptive or predatory consumer lending practices."
    ],
    keyConnection: "Crisis intervention → Stabilization → Regulatory reform → Financial resilience"
  }
];

export function getChapter(chapter: number): ChapterInfo | undefined {
  return chapters.find((c) => c.chapter === chapter);
}
