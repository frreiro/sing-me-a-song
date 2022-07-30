/// <reference types="cypress" />

import * as factory from "../../factories/recommendations.factory.js"

beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.deleteaAllRecommendations();
    cy.createThreeRecommendations();
});

describe("Check NavBar recommendations", () => {
    it("test if the Top recommendation has more socre", () => {
        cy.get('div').contains("Top").click();
        cy.get("article").should(recommendation => {
            expect(recommendation[0]).to.contain(1);
            expect(recommendation[1]).to.contain(0);
            expect(recommendation[2]).to.contain(-1);
        })
    })

    it("test if the Random return a random recommendation", () => {
        cy.get('div').contains("Random").click();
        cy.get("article").should("be.visible")
    })
});

afterEach(() => {
    cy.deleteaAllRecommendations();
});