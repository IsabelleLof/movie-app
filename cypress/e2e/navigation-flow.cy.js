// 🧪 Flödestest: navigation + favoriter

describe('Navigation and Favorites flow', () => {
    // Vi utgår från att appen körs på Vite-porten 5173
    const baseUrl = 'http://localhost:5173/';
  
    it('ska kunna navigera från startsidan till favoritsidan och tillbaka', () => {
      // Besök startsidan
      cy.visit(baseUrl);
  
      // Klicka på länken/knappen till favoritsidan i navigationen
      cy.get('nav').contains(/favorites|favoriter/i).click();
  
      // Kolla att URL:en ändras till /favorites (eller vad din route heter)
      cy.url().should('include', '/favorites');
  
      // Verifiera att vi faktiskt är på favoritsidan
      // Ändra texten nedan till något som säkert finns på sidan,
      // t.ex. rubriken på favoritsidan.
      cy.contains(/favorite movies|favoritfilmer/i).should('be.visible');
  
      // Navigera tillbaka till startsidan
      cy.get('nav').contains(/home|start/i).click();
  
      // Kolla att vi är på startsidan igen
      cy.url().should('eq', baseUrl);
      cy.contains(/search for movies|sök efter filmer/i).should('be.visible');
    });
  
    it('ska kunna söka upp en film, lägga till den som favorit och se den på favoritsidan', () => {
      cy.visit(baseUrl);
  
      // 1) Sök efter en film
      cy.get('input[placeholder="Search for movies..."]').type('Inception');
      cy.get('button').contains(/search|sök/i).click();
  
      // Kontrollera att filmen dyker upp i sökresultatet
      cy.contains('Inception').should('be.visible');
  
      // 2) Lägg till filmen som favorit
      // För att göra detta stabilt är det bra om du har data-testid på kortet:
      // <article data-testid="movie-card"> ... </article>
      cy.contains('Inception')
        .closest('[data-testid="movie-card"]')
        .within(() => {
          cy.contains(/add to favorites|lägg till favorit/i).click();
        });
  
      // 3) Navigera till favoritsidan via navigationen
      cy.get('nav').contains(/favorites|favoriter/i).click();
      cy.url().should('include', '/favorites');
  
      // 4) Verifiera att filmen finns i favoritlistan
      cy.contains('Inception').should('be.visible');
    });
  });
  