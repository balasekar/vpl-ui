describe('Vehicles page', () => {
  it('should visit  the Vehicles page', () => {
    cy.visit('/vehicles');
  });
});

describe('Should display data in Table', () => {

  beforeEach(() => {
    cy.visit('/vehicles');
  });

  it('It should show the table', () => {
    cy.get('table');
  });

  it('It should show the table data', () => {
    cy.get('table').get('tr').get('td');
    cy.get('table').get('tr').get('td').should($td => {
      expect($td.get(0).innerText).to.eq('test');
    });
  });

});

describe('Should navigate to add and edit Vehicle', () => {

  beforeEach(() => {
    cy.visit('/vehicles');
  });

  it('It should navigate to /vehicle', () => {
    cy.contains('Add vehicle').click();
    cy.get('label').contains('Make');
    cy.url().should('include', '/vehicle');
  });

  it('It should navigate to /vehicle', () => {
    cy.get('table').get('tr').get('td').get('a').contains('Edit').click();
    cy.get('label').contains('Make');
    cy.url().should('include', '/vehicle/');
  });
});
