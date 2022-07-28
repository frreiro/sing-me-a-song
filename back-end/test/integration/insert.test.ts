import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";

const getApp = supertest(app);
const base_url = "/recommendations";

beforeEach(async () => {
    await factory.deleteAllRecommendation();
});

describe("Check insert recommendation", () => {
    it("given a valid name and youtubelink, should create a recommendation", async () => {
        const musicData = factory.generateCorrectNameAndLink(true);
        const response = await getApp.post(`${base_url}/`).send(musicData);
        expect(response.statusCode).toEqual(201);
    });

    it("given a valid name and invalid youtubelink, should return 422", async () => {
        const musicData = factory.generateCorrectNameAndLink(false);
        const response = await getApp.post(`${base_url}/`).send(musicData);
        expect(response.statusCode).toEqual(422);
    });

});

afterAll(async () => {
    await factory.deleteAllRecommendation();
});