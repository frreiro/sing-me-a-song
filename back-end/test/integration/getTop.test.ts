import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";

const getApp = supertest(app);
const base_url = "/recommendations";

beforeEach(async () => {
    await factory.deleteAllRecommendation();
});


describe("Check get recommendations", () => {

    it("trying to get at maximum 'n' recommendations, should return n recommendations with higher score", async () => {
        //setup
        const numberOfRecommendation = Math.floor(Math.random() * (10 - 2)) + 2;
        await factory.createRecommendations(numberOfRecommendation + 5);
        const { recommendation1, recommendation2 } = await factory.getTwoRandomRecommendentation();
        for (let i = 0; i < 3; i++) {
            await getApp.post(`${base_url}/${recommendation1.id}/upvote`);
        }
        for (let i = 0; i < 2; i++) {
            await getApp.post(`${base_url}/${recommendation2.id}/upvote`);
        }
        //test
        const response = await getApp.get(`${base_url}/top/${numberOfRecommendation}`);
        expect(response.body[0].id).toEqual(recommendation1.id);
        expect(response.body[1].id).toEqual(recommendation2.id);

    });
});


afterAll(async () => {
    await factory.deleteAllRecommendation();
});