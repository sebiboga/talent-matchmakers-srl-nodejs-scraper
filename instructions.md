# Instructions

## Project Purpose

This scraper extracts job listings from Talent Matchmakers careers page and imports them to peviitor.ro.

Target: https://jobs.talentmatchmakers.co/jobs

## License

Copyright (c) 2026 BOGA SEBASTIAN-NICOLAE

## Model Schemas

The job and company models are defined in:
- `job-model.md` - Job model schema
- `company-model.md` - Company model schema

## Important

These models are **dynamic** and can change over time. They are based on the official Peviitor Core schemas which may be updated.

## How to Keep Models Updated

When working on this scraper:

1. **Check for updates** in the Peviitor Core repository:
   - Repository: https://github.com/peviitor-ro/peviitor_core
   - Main file: README.md (contains Job and Company model schemas)

2. **When to update**:
   - Before starting new development work
   - If field requirements or validations have changed
   - If new fields have been added

3. **How to update**:
   - Fetch the latest README.md from peviitor_core main branch
   - Compare with current job-model.md and company-model.md
   - Update local files if there are differences
   - Update index.js mapping logic if field requirements changed

## Technologies

- **Node.js & JavaScript** - For scraping and data extraction
- **Cheerio** - HTML parsing
- **Apache SOLR** - For data storage and indexing
- **OpenCode + Big Pickle** - For development

## Workflow Steps

1. **Start with brand** - We know the brand (e.g., "Talent Matchmakers")
2. **Search in DemoANAF** - Find company by brand, get CIF from search results
3. **Get company details from ANAF** - Using CIF, fetch full company data from ANAF
4. **Validate with Peviitor** - Verify company exists in Peviitor, get group/brand info
5. **Check existing jobs in SOLR** - Query SOLR by CIF to see what jobs already exist
6. **Check company status** - If ANAF status = "inactive" → DELETE existing jobs from SOLR and STOP
7. **Save company.json** - Save all ANAF + Peviitor data for backup
8. **Scrape new jobs** - Extract jobs from Talent Matchmakers careers page
9. **Transform for SOLR** - Validate and fix job data:
   - location: Only Romanian cities allowed
   - tags: lowercase, no diacritics
   - company: uppercase
10. **Upsert to SOLR** - Import/update jobs in SOLR

## Running the Scraper

```bash
# Install dependencies
npm install

# Set environment variables
export SOLR_AUTH=solr:SolrRocks

# Run the full scraper workflow
node index.js
```

## GitHub Actions

The scraper runs automatically via GitHub Actions:
- **Scrape Talent Matchmakers Jobs** - Scheduled daily at 2 AM or manual trigger
- **Automation Tests** - Runs on push/PR

## File Responsibilities

| File | Role |
|------|------|
| `index.js` | Main entry point - full workflow: validate company → scrape → transform → upsert |
| `company.js` | Validates company via ANAF + Peviitor, checks if company is active/inactive, saves company.json |
| `solr.js` | SOLR operations module - query, delete, upsert jobs + standalone commands |
| `demoanaf.js` | ANAF API module - searchCompany(brand) and getCompanyFromANAF(cif) |

## API Endpoints

- **DemoANAF Search**: `https://demoanaf.ro/api/search?q=BRAND` - Search companies by name/brand
- **DemoANAF Company**: `https://demoanaf.ro/api/company/:cui` - Get company details by CIF
- **Peviitor API**: `https://api.peviitor.ro/v1/company/`
- **Solr**: `https://solr.peviitor.ro/solr/job` (auth: via `SOLR_AUTH` environment variable)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SOLR_AUTH` | SOLR credentials in format `user:password` |

## Testing

This project requires multiple levels of testing:

1. **Unit Tests** - Test individual modules (solr.js, company.js) in isolation
2. **Integration Tests** - Test API interactions (ANAF, Peviitor, SOLR)
3. **E2E Tests** - Test full workflow

Run tests:
```bash
npm test           # All tests
npm run test:unit       # Unit tests only
npm run test:integration # Integration tests only
npm run test:e2e       # E2E tests only
```
