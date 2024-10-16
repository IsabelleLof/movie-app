// se om sidan laddas


describe('Homepage Tests', () => {
    it('should load the homepage successfully', () => {
      cy.visit('http://localhost:5173/'); // Ändra till din lokala server-URL
      cy.contains('Welcome to the best movie library ever!');
    });
  });
  