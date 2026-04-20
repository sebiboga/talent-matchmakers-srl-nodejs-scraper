# Talent Matchmakers Scraper

License: Copyright (c) 2026 BOGA SEBASTIAN-NICOLAE

## About

This project scrapes job listings from Talent Matchmakers careers page and imports them to [peviitor.ro](https://peviitor.ro).

## Company

- **Name**: TALENT MATCHMAKERS S.R.L.
- **CIF**: 38460545
- **Website**: https://talentmatchmakers.co
- **Careers**: https://jobs.talentmatchmakers.co/jobs

## Quick Start

```bash
# Install dependencies
npm install

# Run scraper
node index.js
```

## GitHub Actions

- **Scrape Jobs**: Runs daily at 2 AM or manually via workflow_dispatch
- **Automation Tests**: Runs on push/PR

## Requirements

- Node.js 20+
- SOLR credentials (set in GitHub Secrets)

## Documentation

- [Instructions](instructions.md) - Full documentation
- [Job Model](job-model.md) - Job schema
- [Company Model](company-model.md) - Company schema
- [Files](files.md) - Project file descriptions
