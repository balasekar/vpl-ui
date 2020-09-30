describe('Home page', () => {
  it('should visit  the VPL home page', () => {
    cy.visit('/');
  });
});

describe('Should go to the vehicles page', () => {
  it('Move to vehicles page from the VPL home page', () => {
    cy.visit('/');
    cy.contains('Get Started').click();
    cy.get('table');
    cy.get('a').filter('[href="/vehicle"]');
  });
});
