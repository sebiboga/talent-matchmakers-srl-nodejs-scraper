import { jest } from '@jest/globals';

describe('demoanaf.js', () => {
  let demoanaf;
  
  beforeAll(async () => {
    demoanaf = await import('../../demoanaf.js');
  });

  describe('searchCompany', () => {
    it('should return search results', async () => {
      const results = await demoanaf.searchCompany('TALENT MATCHMAKERS');
      
      expect(Array.isArray(results)).toBe(true);
    });

    it('should find TALENT MATCHMAKERS SRL', async () => {
      const results = await demoanaf.searchCompany('TALENT MATCHMAKERS');
      
      const company = results.find(c => 
        c.name.toUpperCase().includes('TALENT MATCHMAKERS')
      );
      
      expect(company).toBeDefined();
      expect(company.cui).toBe('38460545');
    });
  });

  describe('getCompanyFromANAF', () => {
    it('should return company data for valid CIF', async () => {
      const data = await demoanaf.getCompanyFromANAF('38460545');
      
      expect(data).toBeDefined();
      expect(data.name).toBeDefined();
      expect(data.cui).toBe('38460545');
    });

    it('should have correct company name', async () => {
      const data = await demoanaf.getCompanyFromANAF('38460545');
      
      expect(data.name.toUpperCase()).toContain('TALENT MATCHMAKERS');
    });
  });
});