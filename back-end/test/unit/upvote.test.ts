import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";



describe("Check recommendation upvote service", () => {

    it("Should give a upvote", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => true);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce(null);
        await recommendationService.upvote(1);
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("Given a id that not exist, should throw not found", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => false);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce(null);
        try {
            await recommendationService.upvote(1);
        } catch (e) {
            expect(e.type).toBe("not_found");
        }
    });
});