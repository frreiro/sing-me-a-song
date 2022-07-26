import supertest from "supertest";
import app from "../src/app.js";
import * as factory from "./factories/recommendation.factory.js"

const getApp = supertest(app);
const base_url = "/recommendations"

beforeEach(async () => {
	await factory.deleteAllRecommendation()
});

//TODO: remove later
describe("tests dotenv", () => {
	it("test", () => {
		const database = process.env.DATABASE_URL;
		expect(database).not.toBeUndefined();
	});
});

describe("Check insert recommendation", () => {
	it("given a valid name and youtubelink, should create a recommendation", async () => {
		const musicData = factory.generateCorrectNameAndLink(true)
		const response = await getApp.post(`${base_url}/`).send(musicData);
		expect(response.statusCode).toEqual(201);
	});

	it("given a valid name and invalid youtubelink, should return 422", async () => {
		const musicData = factory.generateCorrectNameAndLink(false)
		const response = await getApp.post(`${base_url}/`).send(musicData);
		expect(response.statusCode).toEqual(422);
	});

});

describe("Check get recommendations", () => {
	it("trying to get all recommendations without any flags", async () => {
		const response = await getApp.get(`${base_url}/`);
		expect(response.statusCode).toEqual(200);
	});

	it("trying to get all recommendations randomly", async () => {
		const recommendationData = factory.generateCorrectNameAndLink(true)
		await factory.createRandomRecommendationsInDatabase(recommendationData);
		const response = await getApp.get(`${base_url}/random`)
		expect(response.statusCode).toEqual(200);
	});

	it("trying to get all recommendations randomly withou any data, shound return 404", async () => {
		const response = await getApp.get(`${base_url}/random`)
		expect(response.statusCode).toEqual(404);
	});

});




afterAll(async () => {
	await factory.deleteAllRecommendation()
})