# Commit Obituaries

> Every merged PR gets a memorial page, a grief score, and maybe a murder mystery.

A GitHub web app that turns closed pull requests into tiny obituary pages with code churn, reviewer kindness, and last commit epitaphs. It flags PRs merged without review as suspected murders, forcing the author to post an apology commit. One weird twist is that highly churned files become hauntings that comment on future PRs in the same directory.

## Features
- Create a public memorial page for each closed PR with a Grief Score calculated from churn, review speed, and rebase count.
- Detect no-review merges and mark the PR as a suspected murder until an apology commit is posted.
- Generate epitaphs from commit messages using local heuristics, not a cloud LLM.
- Send a Slack digest when a file reaches haunted status after too many churned PRs.

## Stack
- Next.js
- TypeScript
- GitHub App
- Postgres

## Getting started
```
Set GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, DATABASE_URL, and SLACK_WEBHOOK_URL, then run npm install, npm run db:migrate, and npm run dev.
```

---
*Farmed 🚜 by [Appshaker](https://github.com/buberlo) — shaken into existence.*
