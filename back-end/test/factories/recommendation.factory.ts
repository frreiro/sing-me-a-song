import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export async function deleteAllRecommendation() {
    await prisma.recommendation.deleteMany();
}

export function generateCorrectNameAndLink(isCorrect: boolean) {
    const name = faker.lorem.words(3);
    let youtubeLink: string;
    if (isCorrect) {
        youtubeLink = `https://www.youtube.com/${faker.random.alpha()}`;
    } else {
        youtubeLink = faker.lorem.words(3);
    }
    return {
        name,
        youtubeLink,
    };
}

export async function createRandomRecommendationsInDatabase(randomLink: CreateRecommendationData) {
    const recommendation = await prisma.recommendation.create({
        data: randomLink
    });
    return recommendation;
}

export async function createNRecommendations() {
    const numberOfRecommendation = Math.floor(Math.random() * (20 - 1)) + 1;
    for (let i = 0; i < numberOfRecommendation + 1; i++) {
        const recommendationData = generateCorrectNameAndLink(true);
        await createRandomRecommendationsInDatabase(recommendationData);
    }
    return numberOfRecommendation;

}