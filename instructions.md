# Talent Matchmakers Scraper

## Setup
```bash
npm install
```

## Run Scraper
```bash
npm run scrape
```

## Run Tests
```bash
npm run test:unit      # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e       # E2E tests
npm run test           # All tests
```

## Files
- `index.js` - Main scraper
- `company.js` - Company validation
- `solr.js` - SOLR operations
- `demoanaf.js` - ANAF API

## Workflows
- `scrape.yml` - Scheduled scraping (2am daily)
- `test.yml` - Runs tests on push/PR
- `add_company.yml` - Adds company to company core