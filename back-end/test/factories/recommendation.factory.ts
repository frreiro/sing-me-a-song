import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker"
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export async function deleteAllRecommendation() {
    await prisma.recommendation.deleteMany();
}

export function generateCorrectNameAndLink(isCorrect: boolean) {
    let name = faker.lorem.words(3);
    let youtubeLink: string;
    if (isCorrect) {
        youtubeLink = `https://www.youtube.com/${faker.random.alpha()}`
    } else {
        youtubeLink = faker.lorem.words(3);
    }
    return {
        name,
        youtubeLink,
    }
}

export async function createRandomRecommendationsInDatabase(randomLink: CreateRecommendationData) {
    await prisma.recommendation.create({
        data: randomLink
    });
}