import { Recommendation } from "@prisma/client";
import { prisma } from "../../src/database.js";


type CreateRecommendationData = Omit<Recommendation, "id" | "score">

export async function voteOver10Recommendation(recommendation: CreateRecommendationData) {
    await prisma.recommendation.update({
        where: {
            name: recommendation.name
        },
        data: {
            score: 11
        }
    });
}

export async function voteBetweenMinus5And10TARecommendation(recommendation: CreateRecommendationData) {
    const valor = Math.floor(Math.random() * (10 - (-5)) - 5);
    await prisma.recommendation.update({
        where: {
            name: recommendation.name
        },
        data: {
            score: valor
        }
    });
}

export async function voteMinus5ARecommendation(recommendation: CreateRecommendationData) {

    await prisma.recommendation.update({
        where: {
            name: recommendation.name
        },
        data: {
            score: -5
        }
    });
}