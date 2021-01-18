describe('Cryptoquote', () => {
  context('when entering ciphertext, assigning, and deleting letters', () => {
    it('the correct ciphertext and plaintext is displayed', () => {
      cy.visit('/');
      cy.get('#ciphertext-input').type('Ejwb zdbpwn psdh’r.');

      cy.get('#ciphertext-input').should('have.value', 'Ejwb zdbpwn psdh’r.');
      cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#plaintext').should('have.text', '____ ______ ____’_.');
      cy.get('#unused-letters').should(
        'have.text',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      );
      cy.get('#used-letters').should('have.text', '');

      cy.get('[data-ciphertext-char="D"]').first().click().type('a');
      cy.get('[data-ciphertext-char="B"]').first().click().type('b');
      cy.get('[data-ciphertext-char="E"]').first().click().type('C');

      cy.get('#ciphertext-input').should('have.value', 'Ejwb zdbpwn psdh’r.');
      cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#plaintext').should('have.text', 'C__B _AB___ __A_’_.');
      cy.get('#unused-letters').should('have.text', 'DEFGHIJKLMNOPQRSTUVWXYZ');
      cy.get('#used-letters').should('have.text', 'ABC');

      cy.get('[data-ciphertext-char="D"]').first().click().type('{backspace}');
      cy.get('[data-ciphertext-char="E"]').first().click().type('{del}');

      cy.get('#ciphertext-input').should('have.value', 'Ejwb zdbpwn psdh’r.');
      cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#plaintext').should('have.text', '___B __B___ ____’_.');
      cy.get('#unused-letters').should(
        'have.text',
        'ACDEFGHIJKLMNOPQRSTUVWXYZ'
      );
      cy.get('#used-letters').should('have.text', 'B');
    });
  });

  context('when resetting the game', () => {
    it('resets the ciphertext input, ciphertext, and plaintext', () => {
      cy.visit('/');
      cy.get('#ciphertext-input').type('Ejwb zdbpwn psdh’r.');
      cy.get('[data-ciphertext-char="D"]').first().click().type('a');
      cy.get('[data-ciphertext-char="B"]').first().click().type('b');
      cy.get('[data-ciphertext-char="E"]').first().click().type('C');
      cy.get('#reset').click();

      cy.get('#ciphertext-input').should('have.value', '');
      cy.get('#ciphertext').should('have.text', '');
      cy.get('#plaintext').should('have.text', '');
      cy.get('#unused-letters').should(
        'have.text',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      );
      cy.get('#used-letters').should('have.text', '');
    });
  });

  context('when clearing the translation map', () => {
    it('clears the plaintext', () => {
      cy.visit('/');
      cy.get('#ciphertext-input').type('Ejwb zdbpwn psdh’r.');
      cy.get('[data-ciphertext-char="D"]').first().click().type('a');
      cy.get('[data-ciphertext-char="B"]').first().click().type('b');
      cy.get('[data-ciphertext-char="E"]').first().click().type('C');
      cy.get('#clear').click();

      cy.get('#ciphertext-input').should('have.value', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#ciphertext').should('have.text', 'EJWB ZDBPWN PSDH’R.');
      cy.get('#plaintext').should('have.text', '____ ______ ____’_.');
      cy.get('#unused-letters').should(
        'have.text',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      );
      cy.get('#used-letters').should('have.text', '');
    });
  });

  context('when requesting a suggestion', () => {
    it('returns a list of clickable suggested words', () => {
      cy.visit('/');
      cy.get('#ciphertext-input').type("Ejwb zdbpwn rgdt'sd.");
      cy.get('summary').contains('Suggestions').click();
      cy.get('.word').contains("RGDT'SD").click();

      cy.get('#suggestions-list').should(
        'have.text',
        "Suggestions:they're, they've"
      );

      cy.get('.suggested-word').contains("they're").click();

      cy.get('#plaintext').should('have.text', "____ _E____ THEY'RE.");
      cy.get('#unused-letters').should('have.text', 'ABCDFGIJKLMNOPQSUVWXZ');
      cy.get('#used-letters').should('have.text', 'EHRTY');
    });
  });
});
