describe("Product Details", () => {
  it("shows Add to Cart button", () => {
    cy.intercept("GET", "**/products/1").as("getProduct");

    cy.visit("/product/1");

    cy.wait("@getProduct");

    cy.contains("Add to Cart").should("be.visible");
  });
});