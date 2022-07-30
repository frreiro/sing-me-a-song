/// <reference types="cypress" />

import * as factory from "../../factories/recommendations.factory.js"

beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.deleteaAllRecommendations();
});

// describe("Check voting recommendation", () => {
//     it("test voting a single recommendation, should increase number", () => {
//         cy.createUniqueRecommendation();
//         cy.get("#arrow-up").click();
//         cy.get("#arrow-up").should((arrow) => {
//             expect(arrow).to.contain(2);
//         });



//     });

describe("Check create recommendation", () => {
    it("test creating a recommendation", () => {
        const videoData = factory.generateCorrectNameAndLink();
        cy.get('[placeholder="Name"]').type(videoData.name);
        cy.get('[placeholder="https://youtu.be/..."]').type(videoData.youtubeLink);
        cy.intercept("POST", "/recommendations").as("createRecommendation")
        cy.intercept("GET", "/recommendations").as("listRecommendation")
        cy.get("Button").click();
        cy.wait("@createRecommendation");
        cy.wait("@listRecommendation");
        cy.get('article').contains(videoData.name).should("exist");
    })

});
