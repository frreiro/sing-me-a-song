import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";

const getApp = supertest(app);
const base_url = "/recommendations";

beforeEach(async () => {
    await factory.deleteAllRecommendation();
});

describe("Check votes recommendations", () => {
    it("given an upvote, should return 200", async () => {
        const recommendationData = factory.generateCorrectNameAndLink(true);
        const recommendation = await factory.createRandomRecommendationsInDatabase(recommendationData);
        const response = await getApp.post(`${base_url}/${recommendation.id}/upvote`);
        expect(response.statusCode).toEqual(200);
    });
    it("given an downvote, should return 200", async () => {
        const recommendationData = factory.generateCorrectNameAndLink(true);
        const recommendation = await factory.createRandomRecommendationsInDatabase(recommendationData);
        const response = await getApp.post(`${base_url}/${recommendation.id}/downvote`);
        expect(response.statusCode).toEqual(200);
    });

    it("given an 5+ downvote, should delete recommendation", async () => {
        const recommendationData = factory.generateCorrectNameAndLink(true);
        const recommendation = await factory.createRandomRecommendationsInDatabase(recommendationData);
        for (let i = 0; i <= 5; i++) {
            await getApp.post(`${base_url}/${recommendation.id}/downvote`);
        }
        const result = await factory.getRecommendationById(recommendation.id);
        expect(result).toBeNull();
    });

});


afterAll(async () => {
    await factory.deleteAllRecommendation();
});