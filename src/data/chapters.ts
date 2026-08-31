export type ChapterInfo = {
  chapter: number;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  knowledgeSummary: string[];
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
    ]
  },
  {
    chapter: 1,
    title: "The Calm Before the Storm",
    subtitle: "The Housing Bubble Forms",
    period: "2004-2006",
    description: "Experience the pre-crisis equilibrium where low interest rates and loose monetary policy created an unprecedented housing boom. You'll navigate the rise of risky lending practices and early warning signs.",
    knowledgeSummary: [
      "Financial System Basics: The core functions of the financial system in distributing capital and risk.",
      "Pre-Crisis Equilibrium: The period of low interest rates (the Greenspan put) that fueled cheap borrowing.",
      "The Housing Bubble: Real estate prices decoupled from income fundamentals, driven by speculative demand.",
      "Subprime Lending: The emergence of ARMs and NINJA loans targeting borrowers with poor credit histories."
    ]
  },
  {
    chapter: 2,
    title: "House of Cards",
    subtitle: "Securitization and Shadows",
    period: "2006-2007",
    description: "Dive into the complex financial engineering that hid massive risks. Navigate the originate-to-distribute model and watch the first cracks appear as housing prices plateau.",
    knowledgeSummary: [
      "Securitization Mechanics: How mortgages were pooled into MBS and sliced into complex CDO tranches.",
      "Originate-to-Distribute: A model causing moral hazard, as lenders sold off bad loans and held no risk.",
      "Shadow Banking: The rise of highly leveraged institutions operating outside traditional depository regulations.",
      "Credit Rating Failures: Agencies wrongly assigned AAA ratings to toxic subprime assets, misleading investors."
    ]
  },
  {
    chapter: 3,
    title: "The Collapse",
    subtitle: "When the Giants Fell",
    period: "September 2008",
    description: "The crisis reaches its breaking point. Major financial institutions face bankruptcy, credit markets freeze completely, and global panic sets in as the dominos fall.",
    knowledgeSummary: [
      "Institutional Collapses: The dramatic fall of Bear Stearns, Lehman Brothers, and the bailout of AIG.",
      "GSE Crisis: The insolvency and government takeover of Fannie Mae and Freddie Mac.",
      "Credit Freeze: The total halt of interbank lending as institutions feared exposure to toxic assets.",
      "Global Panic: Stock markets plunged over 50% as the financial system stood on the brink of total failure."
    ]
  },
  {
    chapter: 4,
    title: "Global Contagion",
    subtitle: "The World Catches a Cold",
    period: "2008-2009",
    description: "Witness how interconnected the modern financial system truly is. The crisis spreads to Europe, devastates emerging markets, and draws comparisons to past regional crises.",
    knowledgeSummary: [
      "Cross-Border Contagion: European banks suffered immense losses from holding toxic US assets.",
      "Historical Comparisons: Contrasts with the 1997 Asian Financial Crisis and varying crisis management strategies.",
      "Trade Shock: Developing economies were hit hard; e.g., Vietnam's GDP growth fell from 8.5% to 5.3%.",
      "Capital Flight: Emerging markets faced severe currency depreciations as foreign investors withdrew funds."
    ]
  },
  {
    chapter: 5,
    title: "The Human Cost",
    subtitle: "Main Street Bleeds",
    period: "2009-2010",
    description: "The financial crisis becomes a harsh economic reality for everyday people. Manage skyrocketing unemployment, a foreclosure epidemic, and the struggles of small businesses.",
    knowledgeSummary: [
      "Labor Market Devastation: US unemployment hit 10%, leading to what some called a 'Lost Generation'.",
      "Foreclosure Epidemic: 14 million households faced foreclosure; HAMP failed to save most, with a 72% rejection rate.",
      "Credit Accessibility Paradox: Despite near 0% rates, banks hoarded cash and refused to lend to consumers.",
      "Wealth Destruction: Average retirement accounts lost up to 57%, wiping out decades of savings."
    ]
  },
  {
    chapter: 6,
    title: "Reform & Recovery",
    subtitle: "Rebuilding the System",
    period: "2010-2012",
    description: "Shape the future of global finance. Implement massive bailout programs, navigate unprecedented monetary policy, and draft regulations to prevent the next crisis.",
    knowledgeSummary: [
      "TARP & Bailouts: The $700 billion program designed to stabilize the financial system and inject capital.",
      "Unconventional Monetary Policy: The use of ZIRP (Zero Interest-Rate Policy) and Quantitative Easing (QE).",
      "Dodd-Frank Act: Comprehensive US reform, notably introducing the Volcker Rule to limit speculative trading by banks.",
      "Basel III & Macroprudential Lessons: New global standards requiring higher capital ratios (LCR, NSFR) to ensure bank resilience."
    ]
  }
];

export function getChapter(chapter: number): ChapterInfo | undefined {
  return chapters.find((c) => c.chapter === chapter);
}
