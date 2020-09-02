describe("Vistors can see specific listing", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/listings",
      response: "fixture:listings_index.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/listings/2",
      response: "fixture:listing_show.json",
    });

    cy.visit("/rent-space");
    cy.get('[data-cy=listing-2]').click()
  });
  it("displays the content of the article", () => {
    cy.get('[data-cy=listing-2]').within(() => {
      cy.get('[data-cy=lead]').should("contain", "Great parking spot in central of Stockholm.");
      cy.get('[data-cy=scene]').should("contain", "indoor");
      cy.get('[data-cy=price]').should("contain", "200")
      cy.get('[data-cy=adress]').should("contain", "Sibyllegatan 18, 11442 Stockholm")
      cy.get('[data-cy=description]').should(
        "contain",
        "Heated garage in the middle of Stockholm that fits one big SUV."
      );
    });
    cy.get("#listing-1").should("not.exist");
    cy.get("#listing-3").should("not.exist");
  });
});