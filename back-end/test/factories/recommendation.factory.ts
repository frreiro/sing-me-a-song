import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export async function deleteAllRecommendation() {
    await recommendationRepository.removeAll();
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


export async function getTwoRandomRecommendentation() {
    const recommendation = await prisma.recommendation.findMany();
    return { recommendation1: recommendation[0], recommendation2: recommendation[1] };
}


export async function createRecommendations(quantity: number) {
    for (let i = 0; i < quantity; i++) {
        const recommendationData = generateCorrectNameAndLink(true);
        await createRandomRecommendationsInDatabase(recommendationData);
    }
}

export async function getRecommendationById(id: number) {
    return await recommendationRepository.find(id);
}
