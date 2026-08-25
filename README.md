# Turbo FPL ⚽

**Turbo FPL** is a modern Fantasy Premier League analytics and prediction platform. It provides a fast, interactive experience for FPL managers to track player stats, predict points, and optimize their teams with data-driven insights.

---

## Features

- **Landing Page** – A sleek introduction to Turbo FPL with quick navigation to all tools.
- **My Team** – View your squad, monitor live points, and analyze player performance.
- **Opta Stats** – Browse detailed stats for all 800+ Premier League players using real FPL data.
- **Price Predictor** – Predict upcoming price changes based on player performance trends.
- **Points Predictor** – AI-powered prediction model built with `RandomForestRegressor` to estimate future FPL points using key features like goals, assists, minutes, and fixture difficulty.

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Machine Learning:** Python (`scikit-learn`) for model training
- **Data:** Official [FPL API](https://fantasy.premierleague.com/api/)

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/velinovjovan/Turbo-FPL.git
   cd Turbo-FPL
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to see Turbo FPL live.

---

## Future Plans

- Add captaincy and transfer recommendations
- Implement visual charts for player projections
- Upgrade ML model with ensemble and xG-based prediction improvements
- Build a live chat and community section for FPL discussions

---
