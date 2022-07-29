import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

describe("Check recommendation random service", () => {
    it("get should call findAll", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(null);
        await recommendationService.get();
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("deleteAll should call removeAll", async () => {
        jest.spyOn(recommendationRepository, "removeAll").mockImplementationOnce(null);
        await recommendationService.deleteAll();
        expect(recommendationRepository.removeAll).toBeCalled();
    });
});
