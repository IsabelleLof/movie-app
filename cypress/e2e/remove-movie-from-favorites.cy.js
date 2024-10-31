describe('Remove a Movie from Favorites', () => {
    it('should add and then remove a movie from favorites', () => {
      // Besök startsidan
      cy.visit('http://localhost:5173/');
  
      // Skriv in "Inception" i sökrutan
      cy.get('input[placeholder="Search for movies..."]').type('Inception');
  
      // Klicka på sökknappen
      cy.get('button').contains('Search').click();
  
      // Klicka på filmen "Inception" i sökresultaten
      cy.contains('Inception').click();
  
      // Klicka på "Add to Favorites" för att lägga till filmen i favoriter
      cy.get('button').contains('Add to Favorites').click();
  
      // Gå till favoriter-sidan
      cy.get('nav').contains('Favorites').click();
  
      // Kontrollera att filmen "Inception" finns i favoriter
      cy.contains('Inception').should('be.visible');
  
      // Klicka på "Remove from Favorites" för att ta bort filmen från favoriter
      cy.get('button').contains('Remove from Favorites').click();
  
      // Kontrollera att filmen inte längre finns i favoriter
      cy.contains('Inception').should('not.exist');
    });
  });
  