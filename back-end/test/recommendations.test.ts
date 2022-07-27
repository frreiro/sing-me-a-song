import supertest from "supertest";
import app from "../src/app.js";
import * as factory from "./factories/recommendation.factory.js";

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

describe("Check get recommendations", () => {
	it("trying to get all recommendations without any flags", async () => {
		const response = await getApp.get(`${base_url}/`);
		expect(response.statusCode).toEqual(200);
	});
	it("trying to get a one recommendations by id, should return one recomendation", async () => {
		const recommendationData = factory.generateCorrectNameAndLink(true);
		const recommendation = await factory.createRandomRecommendationsInDatabase(recommendationData);
		const response = await getApp.get(`${base_url}/${recommendation.id}`);
		expect(response.body.id).toEqual(recommendation.id);
	});

	it("trying to get all recommendations randomly", async () => {
		const recommendationData = factory.generateCorrectNameAndLink(true);
		await factory.createRandomRecommendationsInDatabase(recommendationData);
		const response = await getApp.get(`${base_url}/random`);
		expect(response.statusCode).toEqual(200);
	});

	it("trying to get all recommendations randomly withou any data, shound return 404", async () => {
		const response = await getApp.get(`${base_url}/random`);
		expect(response.statusCode).toEqual(404);
	});

	it("trying to get at maximum 'n' recommendations, should return 'n' recommendations", async () => {
		const numberOfRecommendation = await factory.createNRecommendations();
		const response = await getApp.get(`${base_url}/top/${numberOfRecommendation}`);
		expect(response.body.length).toEqual(numberOfRecommendation);
	});
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

});


afterAll(async () => {
	await factory.deleteAllRecommendation();
});