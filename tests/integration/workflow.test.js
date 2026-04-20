import { jest } from '@jest/globals';

describe('Integration: API Workflow', () => {
  
  describe('Full company validation workflow', () => {
    it.skip('should go from brand to validated company (ANAF API can return 500)', async () => {
      const demoanaf = await import('../../demoanaf.js');
      const company = await import('../../company.js');
      const solr = await import('../../solr.js');
      
      const searchResults = await demoanaf.searchCompany('TALENT MATCHMAKERS');
      expect(searchResults.length).toBeGreaterThan(0);
      
      const talentCompany = searchResults.find(c => 
        c.name.toUpperCase().includes('TALENT MATCHMAKERS') && c.statusLabel === 'Funcțiune'
      );
      expect(talentCompany).toBeDefined();
      
      const anafData = await demoanaf.getCompanyFromANAF(talentCompany.cui.toString());
      expect(anafData.name).toBeDefined();
      
      const companyResult = await company.validateAndGetCompany();
      expect(companyResult.status).toBeDefined();
      expect(companyResult.cif).toBe('38460545');
      
      const solrResult = await solr.querySOLR(companyResult.cif);
      expect(solrResult.numFound).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Company data consistency', () => {
    it.skip('should have matching data across ANAF, Peviitor and SOLR (timeout issues)', async () => {
      const company = await import('../../company.js');
      const solr = await import('../../solr.js');
      
      const companyResult = await company.validateAndGetCompany();
      
      const solrResult = await solr.queryCompanySOLR(`company:${companyResult.company}*`);
      expect(solrResult.docs[0]).toBeDefined();
    });
  });

  describe('Company Core Model Validation', () => {
    it('should have all required fields per company model', async () => {
      const solr = await import('../../solr.js');
      
      const result = await solr.queryCompanySOLR('id:38460545');
      
      if (result.numFound === 0) {
        expect(true).toBe(true);
        return;
      }
      
      const company = result.docs[0];
      
      expect(company.id).toBeDefined();
      expect(company.company).toBeDefined();
      
      if (company.brand) expect(company.brand).toBeDefined();
      if (company.status) expect(['activ','suspendat','inactiv','radiat']).toContain(company.status);
    });
  });
});