import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";

const getApp = supertest(app);
const base_url = "/recommendations";

beforeEach(async () => {
    await factory.deleteAllRecommendation();
});


describe("Check get recommendations", () => {
    it("trying to get a one recommendations by id, should return one recomendation", async () => {
        const recommendationData = factory.generateCorrectNameAndLink(true);
        const recommendation = await factory.createRandomRecommendationsInDatabase(recommendationData);
        const response = await getApp.get(`${base_url}/${recommendation.id}`);
        expect(response.body.id).toEqual(recommendation.id);
    });
});


afterAll(async () => {
    await factory.deleteAllRecommendation();
});