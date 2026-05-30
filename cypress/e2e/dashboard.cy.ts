describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads dashboard", () => {
    cy.contains(/View Exciting Offers/i).should("exist");
  });

  it("has navbar", () => {
    cy.get('[data-testid="navbar"]')
      .should("exist")
      .and("be.visible");
  });
});