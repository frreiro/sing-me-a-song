import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import * as factory from "../factories/recommendation.factory.js";

const recommendation = factory.generateCorrectNameAndLink(true);

describe("Check recommendation service", () => {
    it("Should insert a recommendation", async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(null);
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(null);
        await recommendationService.insert(recommendation);
        expect(recommendationRepository.create).toBeCalled();
    });
    it("Given a recommendation that exist, should not create", async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => true);
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(null);
        try {
            await recommendationService.insert(recommendation);
        } catch (e) {
            expect(e.type).toBe("conflict");
        }
    });
});