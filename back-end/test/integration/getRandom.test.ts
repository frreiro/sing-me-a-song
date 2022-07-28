import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";
import * as randomFactory from "../factories/randomRecommendation.factory.js";

const getApp = supertest(app);
const base_url = "/recommendations";

beforeEach(async () => {
    await factory.deleteAllRecommendation();
});


describe("Check get recommendations", () => {


    it("Call endpoint /random 100 times, 70% of this time should return a song with score over 10", async () => {
        //setup
        const recommendationData = factory.generateCorrectNameAndLink(true);
        await factory.createRandomRecommendationsInDatabase(recommendationData);
        await randomFactory.voteOver10Recommendation(recommendationData);
        const response = await getApp.get(`${base_url}/random`);
        expect(response.body.score).toBeGreaterThan(10);
    });

    it("Call endpoint /random, 30% of time should return a song with score between -5 and 10", async () => {
        //setup
        const recommendationData = factory.generateCorrectNameAndLink(true);
        await factory.createRandomRecommendationsInDatabase(recommendationData);
        await randomFactory.voteBetweenMinus5And10TARecommendation(recommendationData);
        //test
        const response = await getApp.get(`${base_url}/random`);
        expect(response.body.score).toBeGreaterThan(-5);
        expect(response.body.score).toBeLessThanOrEqual(10);

    });

    it("trying to get all recommendations randomly without any data, shound return 404", async () => {
        const response = await getApp.get(`${base_url}/random`);
        expect(response.statusCode).toEqual(404);
    });

});


afterAll(async () => {
    await factory.deleteAllRecommendation();
});