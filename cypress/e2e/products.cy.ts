describe("Categories", () => {
  it("shows categories", () => {
    cy.visit("/products");

    cy.contains("Explore Categories").should("be.visible");

    cy.get('[data-testid="categories-card"]', { timeout: 10000 })
      .should("have.length.greaterThan", 0);
  });
});