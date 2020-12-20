describe('Cryptoquote', () => {
  context('when entering new ciphertext', () => {
    it('the correct ciphertext and plaintext is displayed', () => {
      cy.visit('http://localhost:3000');

      cy.get('#ciphertext-input').type('Ejwb zdbpwn psdh’r.');

      cy.get('#ciphertext-input').should('have.value', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#plaintext').should('have.text', '____ ______ ____’_.');
    });
  });
});
