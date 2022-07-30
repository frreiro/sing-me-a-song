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

Cypress.Commands.add("createThreeRecommendations", () => {
    const rec1 = factory.generateCorrectNameAndLink()
    const rec2 = factory.generateCorrectNameAndLink()
    const rec3 = factory.generateCorrectNameAndLink()
    cy.request("POST", `http://localhost:5000/recommendations`, rec1).then(res => {
        cy.request("POST", `http://localhost:5000/recommendations`, rec2).then(res => {
            cy.request("POST", `http://localhost:5000/recommendations`, rec3).then(res => {
                cy.request("GET", `http://localhost:5000/recommendations`).then(({ body }) => {
                    const rec1Id = body.at(0).id;
                    const rec2Id = body.at(1).id;
                    cy.request("POST", `http://localhost:5000/recommendations/${rec1Id}/upvote`).then(res => {
                        cy.request("POST", `http://localhost:5000/recommendations/${rec2Id}/downvote`);
                    })
                })
            });
        })
    })
})
