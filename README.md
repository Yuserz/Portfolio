# Portfolio

Welcome to my Portfolio project! This repository showcases my work, skills, and projects. Below you will find information about the structure of the project, how to set it up, and how to contribute.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Live GitHub data (Vercel env vars)](#live-github-data-vercel-env-vars)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This portfolio is a collection of my professional and personal projects. It highlights my skills in software development, design, and other areas of expertise. The goal of this portfolio is to provide a comprehensive overview of my work and to demonstrate my capabilities to potential employers, clients, and collaborators.

## Features

- Showcase of projects with descriptions and links
- Responsive design for optimal viewing on different devices
- Contact form for inquiries and collaborations
- Blog section for sharing insights and experiences

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/portfolio.git
   ```

2. Navigate to the project directory:

   ```sh
   cd portfolio
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

To start the development server, run:

```sh
yarn run dev
```

Open your browser and navigate to `http://localhost:3000` to view the portfolio.

## Live GitHub data (Vercel env vars)

Project cards and the stats row are generated at build time by
`scripts/fetch-github-projects.mjs`, which pulls your **pinned repos** from the
GitHub GraphQL API. It runs on every Vercel build (`npm run build`), so the
portfolio always reflects your current pins — but only if two env vars are set:

| Variable | Value | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | a classic PAT | Authenticates the GitHub API call (read-only) |
| `GITHUB_USERNAME` | `Yuserz` | Your GitHub username, case-sensitive |

### 1. Create the token (one-time)

1. Go to **https://github.com/settings/tokens** and click **Generate new token (classic)**.
2. Give it a name (e.g. `portfolio-read`), set an expiry.
3. Select the **`public_repo`** scope — that's all that's needed for reading public pinned repos.
4. Copy the generated token (it starts with `ghp_`; it's shown only once).

### 2. Add the env vars to Vercel

1. Open your project in the Vercel dashboard: **Project → Settings → Environment Variables**.
2. Add two variables for the **Production** (and Preview, if you like) environment:
   - `GITHUB_TOKEN` → your `ghp_...` token
   - `GITHUB_USERNAME` → `Yuserz`
3. Save, then trigger a redeploy (Settings → Git → Deployments → redeploy, or push to `main`).

> **Local dev:** drop a `.env.local` next to `.env.example` with the same two vars —
> the fetch script reads it as a fallback when `process.env` is empty.

### 3. Verify it worked

- The build log should show `[fetch-github-projects] Fetching pinned repos for @Yuserz…`
  (instead of *"not set — skipping fetch"*), and the generated
  `src/generated/github-projects.json` will contain your current pins.
- On the live site, `> ./projects` shows your pinned repos (max 4) and
  `> stats --summary` shows real star/contribution counts.

### What happens without the token

- The fetch is skipped and the site falls back to the curated `STATIC_PROJECTS`
  list in `src/constants/projects.ts` — the portfolio still works, it just won't
  auto-update with your pins.
- The **nightly GitHub Action** (`.github/workflows/refresh-portfolio-data.yml`)
  uses the repo's built-in token and refreshes `src/generated/*.json` every day
  regardless — so setting the Vercel vars mainly keeps each *deploy* fresh, while
  the action keeps the repo data fresh between deploys.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
