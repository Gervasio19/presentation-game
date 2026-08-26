# LAPSE — Survive the Crisis 🏛️⚠️

> A responsive, card-based crisis decision game prototype built with **Next.js (App Router)**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

---

## 📖 Overview

**LAPSE** is a survival strategy game where you navigate a fictional city through a 10-day escalating crisis. Every day presents a critical dilemma: swipe left or right (or click choice buttons) to make tough decisions. 

Each choice affects your **Progress meter**. If your progress drops to **0%**, the crisis collapses! Strategically reach checkpoint days to save your progress and survive all 10 days to achieve a high score.

---

## ✨ Key Features

- 🃏 **Tinder-style Swipe Mechanics**: Fluid, physics-based card dragging & swiping powered by Framer Motion.
- 📱 **Mobile & Desktop Friendly**: Fully responsive UI with on-screen action buttons as an alternative to swiping.
- 📊 **Dynamic Progress & Days**: Real-time progress bar tracking with color-coded feedback and day indicators.
- 💾 **Automatic Checkpoints**: Checkpoints created automatically at milestone days (**Day 3, Day 6, Day 9**).
- 🔄 **Checkpoint Recovery System**: Restore your state from saved checkpoints upon failure or face elimination if no checkpoints were saved.
- 🏆 **Results & Scoring**: Detailed end-game breakdown (Days survived, final progress, checkpoints collected, and score calculation).

---

## 🛠️ Prerequisites

Ensure you have the following installed on your computer:

- **Node.js**: `v18.18.0` or later (Node `v20+` recommended)
- **Package Manager**: `npm` (comes with Node.js), `pnpm`, `yarn`, or `bun`
- **Git**: For cloning the repository

---

## 🚀 Installation & Getting Started

Follow these simple steps to run the game locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/Gervasio19/presentation-game.git
cd presentation-game
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open in browser
Open [http://localhost:3000](http://localhost:3000) in your web browser (Google Chrome, Safari, Edge, or Firefox).

> **💡 Mobile Testing Tip**: Open Developer Tools (`F12` or `Cmd + Option + I`) and toggle device emulation mode (`Cmd + Shift + M` / `Ctrl + Shift + M`) to experience the mobile portrait swipe feel!

---

## 🧪 Feature Testing Guide (For Testers / Friends)

Here is a quick checklist of scenarios to test out the core features and mechanics:

### 1. Main Menu & Rules
- [ ] On the Home page (`/`), click **"How to Play"** to open the modal and check the rules explanation.
- [ ] Click **"Play"** to start a new game session.

### 2. Card Interaction & Choice Mechanics
- [ ] **Drag / Swipe**: Drag the card left or right. Notice the card tilt, rotation, and dynamic colored choice badge preview.
- [ ] **Choice Buttons**: Click the left or right buttons below the card to trigger programmatic swipe animations.
- [ ] **Progress Updates**: Verify that after making a choice, the progress bar updates smoothly with the corresponding effect.

### 3. Early Death & Elimination (No Checkpoints)
- [ ] Start a new run and intentionally make choices that reduce progress before Day 3 (e.g., Left on Day 1: `-8%`, Right on Day 2: `-5%`, Right on Day 3: `-12%`).
- [ ] Once progress reaches `0%` before saving any checkpoint, verify that the **"YOU WERE ELIMINATED"** screen appears.
- [ ] Click **"View Results"** to check the summary and try again.

### 4. Checkpoint Creation & Recovery
- [ ] Play through **Day 3** safely with progress $> 0\%$. The game will automatically snapshot Checkpoint 1.
- [ ] Continue playing into Days 4–6.
- [ ] If progress hits `0%` on or after Day 4, verify that the **"CRISIS COLLAPSED"** screen opens showing saved checkpoints.
- [ ] Click on a saved checkpoint (e.g. Day 03) to resume gameplay from that exact checkpoint state.

### 5. Winning the Game (Survive 10 Days)
- [ ] Balance your choices carefully to reach and finish **Day 10**.
- [ ] Verify that the **"CRISIS SURVIVED"** victory screen displays:
  - 🏆 Trophy icon & victory banner
  - Final Progress (%)
  - Days Survived (10)
  - Number of Checkpoints Reached
  - Computed Prototype Score
- [ ] Test the **"Play Again"** and **"Main Menu"** buttons to ensure smooth resets.

---

## 📂 Project Structure

```text
presentation-game/
├── public/                  # Static assets & icons
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css      # Global Tailwind styles & background theme
│   │   ├── layout.tsx       # Root Next.js layout
│   │   ├── page.tsx         # Main Menu & How-to-Play modal
│   │   └── game/
│   │       └── page.tsx     # Main Game loop & phase controller
│   ├── components/
│   │   └── game/
│   │       ├── CheckpointSelector.tsx  # Checkpoint recovery modal
│   │       ├── ChoiceButton.tsx        # Bottom action buttons
│   │       ├── DayIndicator.tsx        # Top day & milestone counter
│   │       ├── DeathScreen.tsx         # Elimination modal
│   │       ├── GameCard.tsx            # Interactive swipeable card
│   │       ├── ProgressBar.tsx         # Animated progress bar
│   │       └── ResultScreen.tsx        # Victory / Defeat score summary
│   ├── data/
│   │   └── cards.ts         # Card deck data (10 dilemmas & effects)
│   └── lib/
│       └── game/
│           ├── checkpointManager.ts    # Pure checkpoint logic
│           ├── gameEngine.ts           # Pure game state reducer
│           └── gameTypes.ts            # TypeScript definitions & constants
├── package.json
└── tsconfig.json
```

---

## 🔧 Build & Production Scripts

- `npm run dev` — Starts local development server on port 3000.
- `npm run build` — Builds the optimized production application.
- `npm run start` — Starts the production server.
- `npm run lint` — Runs ESLint to check for code quality and syntax errors.

---

## 📄 License

This project is created for presentation and prototype testing purposes. Feel free to explore, test, and provide feedback!
