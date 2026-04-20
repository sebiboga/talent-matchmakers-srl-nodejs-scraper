# Talent Matchmakers Scraper

[![License: Copyright (c) 2026 BOGA SEBASTIAN-NICOLAE)](LICENSE)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

Automation project for scraping job data from Talent Matchmakers careers page and importing to [peviitor.ro](https://peviitor.ro).

## About

This scraper extracts job listings from Talent Matchmakers careers page and imports them to [peviitor.ro](https://peviitor.ro) - a free Romanian job search platform.

## Company Info

| Field | Value |
|-------|-------|
| **Name** | TALENT MATCHMAKERS S.R.L. |
| **CIF** | 38460545 |
| **Status** | Active |
| **Website** | https://talentmatchmakers.co |
| **Careers** | https://jobs.talentmatchmakers.co/jobs |

## Features

- **Automated Job Scraping** - Extract jobs from Talent Matchmakers Teamtailor careers
- **Solr Integration** - Push job data to peviitor.ro Solr search engine
- **ANAF Validation** - Verify company status via Romanian ANAF API
- **GitHub Actions** - Scheduled daily scraping (2 AM) or manual trigger

## Quick Start

### Prerequisites

- Node.js 20+
- SOLR credentials (set in GitHub Secrets)

### Local Setup

```bash
# Install dependencies
npm install

# Run the scraper
node index.js
```

### GitHub Actions

The scraper runs automatically via GitHub Actions:
- **Scrape Jobs** - Runs daily at 2 AM or manually via workflow_dispatch
- **Automation Tests** - Runs on push/PR

## Project Structure

```
talent-matchmakers-srl-nodejs-scraper/
├── index.js                  # Main scraper entry point
├── company.js               # Company validation (ANAF + Peviitor)
├── solr.js                 # SOLR operations module
├── demoanaf.js             # ANAF API integration
├── package.json             # Dependencies and scripts
├── README.md               # This file
├── instructions.md        # Full documentation
├── job-model.md           # Job schema
├── company-model.md       # Company schema
├── files.md              # File descriptions
├── .github/workflows/   # GitHub Actions
│   ├── scrape-jobs.yml  # Daily scraping
│   ├── test.yml         # Tests
│   └── add-talent-company.yml
└── tests/               # Test suites
    ├── unit/
    ├── integration/
    └── e2e/
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run scrape` | Run the scraper |
| `npm test` | Run all tests |
| `npm run test:unit` | Unit tests only |
| `npm run test:integration` | Integration tests |
| `npm run test:e2e` | E2E tests |

## Documentation

- [Instructions](instructions.md) - Full documentation
- [Job Model](job-model.md) - Job schema
- [Company Model](company-model.md) - Company schema
- [Files](files.md) - Project file descriptions

## API Endpoints

- **DemoANAF Search**: `https://demoanaf.ro/api/search?q=BRAND`
- **DemoANAF Company**: `https://demoanaf.ro/api/company/:cui`
- **Peviitor API**: `https://api.peviitor.ro/v1/company/`
- **Solr Jobs**: `https://solr.peviitor.ro/solr/job`
- **Solr Companies**: `https://solr.peviitor.ro/solr/company`

## License

Copyright (c) 2026 BOGA SEBASTIAN-NICOLAE

## Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.