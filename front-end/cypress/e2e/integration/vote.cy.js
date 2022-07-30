/// <reference types="cypress" />

import * as factory from "../../factories/recommendations.factory.js"

beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.deleteaAllRecommendations();
    cy.createRecommendation();
});

describe("Check vote recommendation", () => {
    it("test up voting a recommendation", () => {
        const videoData = factory.generateCorrectNameAndLink();
        cy.getRecommendation().then(({ body }) => {
            const id = body.at(0).id
            const votes = body.at(0).score
            cy.intercept("POST", `/recommendations/${id}/upvote`).as("upvoteARecommendation")
            cy.get('#arrow-up').click();
            cy.wait("@upvoteARecommendation");
            cy.get('#votes').should("have.text", votes + 1)

        })
    })

    it("test down voting a recommendation", () => {
        const videoData = factory.generateCorrectNameAndLink();
        cy.getRecommendation().then(({ body }) => {
            const id = body.at(0).id
            const votes = body.at(0).score
            cy.intercept("POST", `/recommendations/${id}/downvote`).as("downvoteARecommendation")
            cy.get('#arrow-down').click();
            cy.wait("@downvoteARecommendation");
            cy.get('#votes').should("have.text", votes - 1)
        })
    })

});

afterEach(() => {
    cy.deleteaAllRecommendations();
});