import supertest from "supertest";
import app from "../../src/app.js";
import * as factory from "../factories/recommendation.factory.js";

const getApp = supertest(app);
const base_url = "/recommendations";

beforeEach(async () => {
	await factory.deleteAllRecommendation();
});


describe("Check get recommendations", () => {
	it("trying to get all recommendations without any flags", async () => {
		await factory.createRecommendations(12);
		const response = await getApp.get(`${base_url}/`);
		expect(response.body.length).toEqual(10);
	});

});


afterAll(async () => {
	await factory.deleteAllRecommendation();
});