import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

describe("Check recommendation random service", () => {

    it("getTop should call getAmountByScore", async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce(null);
        await recommendationService.getTop(1);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

    it("getRandom should return a single score", async () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.6);
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { return [{ score: 1 }]; });
        const response = await recommendationService.getRandom();
        expect(response.score).toEqual(1);
    });

    it("Returnin zero recommendation, getRandom should throw an error", async () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.8);
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { return []; });
        try {
            await recommendationService.getRandom();
        } catch (e) {
            expect(e.type).toBe("not_found");
        }
    });
});