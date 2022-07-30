import * as factory from "../factories/recommendations.factory.js"

Cypress.Commands.add("deleteaAllRecommendations", () => {
    cy.request("POST", `http://localhost:5000/test/reset`)
})

Cypress.Commands.add("createRecommendation", () => {
    const videoData = factory.generateCorrectNameAndLink();
    cy.get('[placeholder="Name"]').type(videoData.name);
    cy.get('[placeholder="https://youtu.be/..."]').type(videoData.youtubeLink);
    cy.intercept("POST", "/recommendations").as("createRecommendation")
    cy.intercept("GET", "/recommendations").as("listRecommendation")
    cy.get("Button").click();
    cy.wait("@createRecommendation");
    cy.wait("@listRecommendation");
})


Cypress.Commands.add("getRecommendation", () => {
    cy.request("GET", `http://localhost:5000/recommendations`)
})

