import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";



describe("Check recommendation downvote service", () => {

    it("Should give a downvote", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => true);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {
            return { score: 1 };
        });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => true);
        await recommendationService.downvote(1);
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("Given a -6 score, should delete the recommendation", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => true);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { return { score: -6 }; });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce(null);
        await recommendationService.downvote(1);
        expect(recommendationRepository.remove).toBeCalled();
    });

    it("Given a id that not exist, should throw not found", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => false);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { return { score: 1 }; });
        try {
            await recommendationService.downvote(1);
        } catch (e) {
            expect(e.type).toBe("not_found");
        }
    });

});