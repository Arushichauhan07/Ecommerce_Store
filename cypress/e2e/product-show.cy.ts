describe("Shop Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/products**").as("getProducts");
    cy.visit("/shop");
  });

  it("shows products", () => {
    cy.wait("@getProducts");

    cy.contains("Explore Products").should("be.visible");

    cy.get('[data-testid="product-cards"]')
      .should("have.length.greaterThan", 0);
  });

  it("opens product details page", () => {
    cy.wait("@getProducts");

    cy.get('[data-testid="product-cards"]')
      .first()
      .click();

    cy.url().should("include", "/product/");
  });
});