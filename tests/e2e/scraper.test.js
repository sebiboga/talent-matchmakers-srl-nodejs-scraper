import { jest } from '@jest/globals';

describe('E2E: Full Scraping Workflow', () => {
  const TEST_CIF = '38460545';
  const TEST_BRAND = 'Talent Matchmakers';

  it.skip('should complete full workflow (ANAF API can be flaky)', async () => {
    const demoanaf = await import('../../demoanaf.js');
    const company = await import('../../company.js');
    const solr = await import('../../solr.js');
    
    const searchResults = await demoanaf.searchCompany(TEST_BRAND);
    expect(searchResults.length).toBeGreaterThan(0);
    
    const exactMatch = searchResults.find(c => 
      c.name.toUpperCase().includes('TALENT MATCHMAKERS') &&
      c.statusLabel === 'Funcțiune'
    );
    expect(exactMatch).toBeDefined();
    expect(exactMatch.cui.toString()).toBe(TEST_CIF);
    
    const anafData = await demoanaf.getCompanyFromANAF(TEST_CIF);
    expect(anafData).toBeDefined();
    
    const companyResult = await company.validateAndGetCompany();
    expect(companyResult.cif).toBe(TEST_CIF);
    
    const solrResult = await solr.querySOLR(TEST_CIF);
    expect(solrResult.numFound).toBeGreaterThanOrEqual(0);
  });

  it('should handle inactive company gracefully', async () => {
    const demoanaf = await import('../../demoanaf.js');
    
    const searchResults = await demoanaf.searchCompany('InactiveCompany');
    const inactiveCompany = searchResults.find(c => c.statusLabel !== 'Funcțiune');
    
    if (inactiveCompany) {
      const anafData = await demoanaf.getCompanyFromANAF(inactiveCompany.cui.toString());
      expect(anafData.inactive).toBe(true);
    }
  });
});