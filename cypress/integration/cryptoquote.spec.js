describe('Cryptoquote', () => {
  context('when entering new ciphertext', () => {
    it('the correct ciphertext and plaintext is displayed', () => {
      cy.visit('http://localhost:3000');

      cy.get('#ciphertext-input').type('Ejwb zdbpwn psdh’r.');

      cy.get('#ciphertext-input').should('have.value', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#plaintext').should('have.text', '____ ______ ____’_.');
    });

    context('when assigning and deleting letters', () => {
      it('the letters are filled in correctly', () => {
        cy.visit('http://localhost:3000');

        cy.get('#ciphertext-input').type('Ejwb zdbpwn psdh’r.');
        cy.get('[data-ciphertext-char="D"]').first().click().type('a');
        cy.get('[data-ciphertext-char="B"]').first().click().type('b');

        cy.get('#ciphertext-input').should('have.value', 'EJWB ZDBPWN PSDH’R.');
        cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
        cy.get('#plaintext').should('have.text', '___B _AB___ __A_’_.');

        cy.get('[data-ciphertext-char="D"]')
          .first()
          .click()
          .type('{Backspace}');

        cy.get('#ciphertext-input').should('have.value', 'EJWB ZDBPWN PSDH’R.');
        cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
        cy.get('#plaintext').should('have.text', '___B __B___ ____’_.');
      });
    });
  });
});
