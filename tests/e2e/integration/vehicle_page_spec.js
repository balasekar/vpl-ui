describe('Vehicle page', () => {
  it('should visit  the Vehicle page', () => {
    cy.visit('/vehicle');
  });
});

describe('Should enter data into form', () => {

  beforeEach(() => {
    cy.visit('/vehicle');
  });

  it('It should enter data into fields', () => {
    cy.get('input').first().type('test');
  });

});

describe('Should validate data into form', () => {

  beforeEach(() => {
    cy.visit('/vehicle');
  });

  it('It should validate data into fields', () => {
    cy.get('input').first().type('@#4');
    cy.get('.error').contains('make must not contain special characters');
  });

  it('It should validate data into fields', () => {
    cy.contains('Submit').click();
    cy.get('.error').contains('Model is Required');
  });

});

describe('Should navigate', () => {

  beforeEach(() => {
    cy.visit('/vehicle');
  });

  it('It should validate data into fields', () => {
    cy.contains('Back').click();
    cy.url().should('include', '/vehicle');
  });

});
