import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";

const getApp = supertest(app);
const base_url = "/test";

beforeEach(async () => {
    await factory.deleteAllRecommendation();

});


describe("Check delete recommendations", () => {
    it("trying to remove all recommendations", async () => {
        await factory.createRecommendations(1);
        const response = await getApp.post(`${base_url}/reset`);
        expect(response.statusCode).toEqual(200);
    });

});