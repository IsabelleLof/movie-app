// Testa:

// - Testa att användaren kan söka efter en film.
// - Testa att användaren kan lägga till en film i sin favoriter-lista.

describe('Movie Search and Favorites', () => {

    // Testar att sökfunktionen fungerar
    it('should search for a movie and display results', () => {
      // Besök startsidan
      cy.visit('http://localhost:5173/'); 
  
      // Skriv in en sökfråga (t.ex. "Inception") i sökfältet
      cy.get('input[placeholder="Search for movies..."]').type('Inception');
      
      // Klicka på "Search"-knappen
      cy.get('button').contains('Search').click();
      
      // Kontrollera att en film med titeln "Inception" dyker upp i sökresultaten
      cy.contains('Inception').should('be.visible');
    });
  
    // Testar att lägga till en film i favoriter
    it('should add a movie to favorites', () => {
      // Besök startsidan
      cy.visit('http://localhost:5173/');
  
      // Skriv in en sökfråga (t.ex. "Inception") i sökfältet
      cy.get('input[placeholder="Search for movies..."]').type('Inception');
  
      // Klicka på "Search"-knappen
      cy.get('button').contains('Search').click();
      
      // Kontrollera att filmen "Inception" visas och klicka på den
      cy.contains('Inception').click();
  
      // Klicka på knappen för att lägga till i favoriter
      cy.get('button').contains('Add to Favorites').click();
  
      // Navigera till favoriter-sidan
      cy.get('nav').contains('Favorites').click();
  
      // Kontrollera att filmen finns i favoriter-listan
      cy.contains('Inception').should('be.visible');
    });
  });
  